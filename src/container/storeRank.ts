export interface StoreParams {
  score: number;
  nickname: string;
}

const storeRank = async ({ score, nickname }: StoreParams) => {
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
