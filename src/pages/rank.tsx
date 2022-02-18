import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import getRank from "../container/getRank";
import { StoreParams } from "../container/storeRank";

const Rank: NextPage = () => {
  const [data, setData] = useState<StoreParams[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getRank();
      if (res) setData(res);
    })();
  }, []);

  console.log(data);
  return (
    <div>
      <Seo title="Rank" />
      <header>
        <h2>Selecolor</h2>
        <h1>Hall of Fame</h1>
        <br />
      </header>
      <section>
        <div className="rank_item outer">
          <h3>RANK</h3>
          <h3>NAME</h3>
          <h3>SCORE</h3>
        </div>
        <br />
        {data.map((val, idx) => (
          <div className="rank_item" key={idx}>
            <h3>{idx + 1}</h3>
            <h3>{val.nickname}</h3>
            <h3>{val.score.toLocaleString()}</h3>
          </div>
        ))}
      </section>
      <style jsx>{`
        .rank_item {
          display: flex;
          width: 80vw;
          justify-content: space-between;
        }
        .outer {
          margin-top: 5em;
          border-bottom: 3px solid #000;
        }

        .rank_item > h3 {
          display: flex;
          width: 10em;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Rank;
