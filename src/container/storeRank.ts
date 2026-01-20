export interface StoreParams {
  score: number;
  nickname: string;
}

export interface StoreRankResponse {
  success: boolean;
  updated: boolean;
  message?: string;
  existingScore?: number;
}

const storeRank = async ({ score, nickname }: StoreParams): Promise<StoreRankResponse> => {
  try {
    const response = await fetch("/api/rank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, score }),
    });

    if (!response.ok) {
      throw new Error("Failed to store ranking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error storing rank:", error);
    throw error;
  }
};

export default storeRank;
