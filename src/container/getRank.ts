import { StoreParams } from "./storeRank";

const getRank = async (): Promise<StoreParams[] | undefined> => {
  try {
    const response = await fetch("/api/rank", {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rankings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting rank:", error);
    return undefined;
  }
};

export default getRank;
