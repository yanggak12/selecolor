import { getDatabase, ref, get, child } from "firebase/database";
import { StoreParams } from "./storeRank";

const getRank = async () => {
  const dbRef = ref(getDatabase());

  return await get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const arr: StoreParams[] = Object.values(snapshot.val());
        arr.sort((a, b) => b.score - a.score);
        return arr.slice(0, 100);
      } else {
        console.log("No data");
      }
    })
    .catch((e) => console.log(e));
};

export default getRank;
