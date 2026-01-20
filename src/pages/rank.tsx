import type {NextPage} from 'next';
import {useEffect, useState} from 'react';
import RankSkeleton from '../components/RankSkeleton';
import Seo from '../components/Seo';
import getRank from '../container/getRank';
import {StoreParams} from '../container/storeRank';
import {medalColor} from '../utils/medalColors';

const Rank: NextPage = () => {
  const [data, setData] = useState<StoreParams[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRankData = async () => {
    setIsLoading(true);
    const res = await getRank();
    if (res) setData(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRankData();

    // 페이지 포커스 시 데이터 새로고침
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchRankData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
          <h4>RANK</h4>
          <h3>NAME</h3>
          <h3>SCORE</h3>
        </div>
        <br />
        {isLoading ? (
          <RankSkeleton />
        ) : (
          data.map((val, idx) => (
            <div
              className={
                (idx + 1) % 10 === 0 && idx + 1 !== 100
                  ? 'rank_item sep'
                  : 'rank_item'
              }
              key={idx}>
              <h4>
                {idx < 3 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width={20}
                    height={20}
                    fill={medalColor[idx]}>
                    <path d="M223.7 130.8 149.1 7.77c-2-4.821-7.2-7.77-12.8-7.77H16.03C3.08 0-4.5 14.58 2.93 25.18l111.3 158.9C143.9 156.4 181.7 137.3 223.7 130.8zM256 160c-97.25 0-176 78.75-176 176s78.8 176 176 176 176-78.75 176-176-78.7-176-176-176zm92.5 157.3-37.88 37 8.875 52.25c1.625 9.25-8.25 16.5-16.63 12l-46.88-24.62L209.1 418.5c-8.375 4.5-18.25-2.75-16.63-12l8.875-52.25-37.88-37C156.6 310.6 160.5 299 169.9 297.6l52.38-7.625L245.7 242.5c2-4.25 6.125-6.375 10.25-6.375s8.25 2.175 10.25 6.375l23.5 47.5 52.38 7.625C351.6 299 355.4 310.6 348.5 317.3zM495.1 0H375.7a15.995 15.995 0 0 0-13.72 7.77l-73.76 122.1c42 6.5 79.88 25.62 109.5 53.38l111.3-158.9C516.5 14.58 508.9 0 495.1 0z" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </h4>
              <h3>{val.nickname}</h3>
              <h3 className={idx < 3 ? 'medal' : ''}>
                {val.score && val.score.toLocaleString()}
              </h3>
            </div>
          ))
        )}
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
        .sep {
          margin-bottom: 20px;
          border-bottom: 2px solid #c7c7c7;
        }
        .rank_item > h3 {
          display: flex;
          width: 8em;
          justify-content: center;
        }
        .rank_item > h4 {
          display: flex;
          justify-content: center;
          width: 5em;
        }
        .rank_item > .medal {
          color: #900;
        }
      `}</style>
    </div>
  );
};

export default Rank;
