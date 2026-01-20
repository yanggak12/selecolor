import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export interface RankData {
  nickname: string;
  score: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 환경 변수 확인
  if (!process.env.NOTION_PRIVATE_KEY || !process.env.NOTION_PAGE_ID) {
    console.error("Missing environment variables:", {
      hasPrivateKey: !!process.env.NOTION_PRIVATE_KEY,
      hasPageId: !!process.env.NOTION_PAGE_ID,
    });
    return res.status(500).json({
      error: "Server configuration error: Missing Notion credentials"
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
      console.error("Error getting rank:", {
        message: error.message,
        code: error.code,
        status: error.status,
        body: error.body,
      });
      res.status(500).json({
        error: "Failed to fetch rankings",
        details: error.message
      });
    }
  } else if (req.method === "POST") {
    // 랭킹 등록/업데이트
    try {
      const { nickname, score } = req.body;

      if (!nickname || typeof score !== "number") {
        return res.status(400).json({ error: "Invalid request body" });
      }

      // 1. 먼저 동일한 닉네임이 있는지 검색
      const searchResponse = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: "Nickname",
          title: {
            equals: nickname,
          },
        },
      });

      // 2. 기존 레코드가 있으면 업데이트
      if (searchResponse.results.length > 0) {
        const pageId = searchResponse.results[0].id;
        await notion.pages.update({
          page_id: pageId,
          properties: {
            Score: {
              number: score,
            },
          },
        });
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
                    content: nickname,
                  },
                },
              ],
            },
            Score: {
              number: score,
            },
          },
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error storing rank:", error);
      res.status(500).json({ error: "Failed to store ranking" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
