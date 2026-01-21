import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export interface RankData {
  nickname: string;
  score: number;
}

// Rate limiting을 위한 간단한 in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting: IP당 분당 최대 요청 수
const RATE_LIMIT_WINDOW = 60 * 1000; // 1분
const MAX_REQUESTS_PER_WINDOW = 10;

// 입력값 검증 상수
const MAX_NICKNAME_LENGTH = 20;
const MIN_NICKNAME_LENGTH = 2;
const MAX_SCORE = 1000000;
const MIN_SCORE = 0;

// IP 주소 추출 헬퍼 함수
function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string"
    ? forwarded.split(",")[0]
    : req.socket.remoteAddress || "unknown";
  return ip;
}

// Rate limiting 체크 함수
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count++;
  return true;
}

// 주기적으로 만료된 레코드 정리 (메모리 누수 방지)
setInterval(() => {
  const now = Date.now();
  const ipsToDelete: string[] = [];
  rateLimitStore.forEach((record, ip) => {
    if (now > record.resetTime) {
      ipsToDelete.push(ip);
    }
  });
  ipsToDelete.forEach(ip => rateLimitStore.delete(ip));
}, RATE_LIMIT_WINDOW);

// 닉네임 검증 함수 (XSS 방지)
function validateNickname(nickname: any): { valid: boolean; error?: string } {
  if (typeof nickname !== "string") {
    return { valid: false, error: "Nickname must be a string" };
  }

  const trimmed = nickname.trim();

  if (trimmed.length < MIN_NICKNAME_LENGTH) {
    return { valid: false, error: `Nickname must be at least ${MIN_NICKNAME_LENGTH} characters` };
  }

  if (trimmed.length > MAX_NICKNAME_LENGTH) {
    return { valid: false, error: `Nickname must be at most ${MAX_NICKNAME_LENGTH} characters` };
  }

  // XSS 방지: HTML 태그 및 특수문자 차단
  const dangerousPattern = /[<>"'&]/;
  if (dangerousPattern.test(trimmed)) {
    return { valid: false, error: "Nickname contains invalid characters" };
  }

  return { valid: true };
}

// 점수 검증 함수
function validateScore(score: any): { valid: boolean; error?: string } {
  if (typeof score !== "number" || !Number.isFinite(score)) {
    return { valid: false, error: "Score must be a valid number" };
  }

  if (score < MIN_SCORE || score > MAX_SCORE) {
    return { valid: false, error: `Score must be between ${MIN_SCORE} and ${MAX_SCORE}` };
  }

  if (!Number.isInteger(score)) {
    return { valid: false, error: "Score must be an integer" };
  }

  return { valid: true };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS 설정 (프로덕션 도메인만 허용)
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight 요청 처리
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Rate limiting 체크
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later."
    });
  }

  // 환경 변수 확인
  if (!process.env.NOTION_PRIVATE_KEY || !process.env.NOTION_PAGE_ID) {
    console.error("Missing environment variables");
    return res.status(500).json({
      error: "Server configuration error"
    });
  }

  // handler 함수 내부에서 Notion Client 초기화
  const notion = new Client({
    auth: process.env.NOTION_PRIVATE_KEY,
  });

  const DATABASE_ID = process.env.NOTION_PAGE_ID;

  if (req.method === "GET") {
    // 랭킹 조회
    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        sorts: [
          {
            property: "Score",
            direction: "descending",
          },
        ],
        page_size: 100,
      });

      const arr: RankData[] = response.results.map((page: any) => {
        const nickname =
          page.properties.Nickname?.title?.[0]?.text?.content || "";
        const score = page.properties.Score?.number || 0;

        return {
          nickname,
          score,
        };
      });

      res.status(200).json(arr);
    } catch (error: any) {
      console.error("Error getting rank:", error);
      res.status(500).json({
        error: "Failed to fetch rankings"
      });
    }
  } else if (req.method === "POST") {
    // 랭킹 등록/업데이트 (최고 점수만 기록)
    try {
      const { nickname, score } = req.body;

      // 닉네임 검증
      const nicknameValidation = validateNickname(nickname);
      if (!nicknameValidation.valid) {
        return res.status(400).json({ error: nicknameValidation.error });
      }

      // 점수 검증
      const scoreValidation = validateScore(score);
      if (!scoreValidation.valid) {
        return res.status(400).json({ error: scoreValidation.error });
      }

      // XSS 방지를 위해 닉네임 트림
      const sanitizedNickname = nickname.trim();

      // 1. 동일한 닉네임이 있는지 검색
      const searchResponse = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: "Nickname",
          title: {
            equals: sanitizedNickname,
          },
        },
      });

      // 2. 기존 레코드가 있는 경우
      if (searchResponse.results.length > 0) {
        const existingPage: any = searchResponse.results[0];
        const existingScore = existingPage.properties.Score?.number || 0;

        // 새 점수가 더 높은 경우에만 업데이트
        if (score > existingScore) {
          await notion.pages.update({
            page_id: existingPage.id,
            properties: {
              Score: {
                number: score,
              },
            },
          });
          return res.status(200).json({
            success: true,
            updated: true,
            message: "New high score!"
          });
        } else {
          // 기존 점수가 더 높거나 같으면 업데이트하지 않음
          return res.status(200).json({
            success: true,
            updated: false,
            message: "Previous score was higher",
            existingScore
          });
        }
      } else {
        // 3. 없으면 새로 생성
        await notion.pages.create({
          parent: {
            database_id: DATABASE_ID,
          },
          properties: {
            Nickname: {
              title: [
                {
                  text: {
                    content: sanitizedNickname,
                  },
                },
              ],
            },
            Score: {
              number: score,
            },
          },
        });
      return res.status(200).json({
        success: true,
        updated: true,
        message: "New record created!"
      });
      }
    } catch (error: any) {
      console.error("Error storing rank:", error);
      res.status(500).json({ error: "Failed to store ranking" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
