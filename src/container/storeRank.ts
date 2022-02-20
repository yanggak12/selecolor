import { getDatabase, ref, set } from "firebase/database";
export interface StoreParams {
  score: number;
  nickname: string;
}

const storeRank = ({ score, nickname }: StoreParams) => {
  const db = getDatabase();
  set(ref(db, "users/" + nickname), {
    nickname: nickname,
    score: score,
    time: Date(),
  });
};

export default storeRank;
