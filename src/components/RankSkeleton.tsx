import React from "react";

const RankSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <div className="skeleton-item" key={idx}>
          <div className="skeleton-rank skeleton-shimmer" />
          <div className="skeleton-name skeleton-shimmer" />
          <div className="skeleton-score skeleton-shimmer" />
        </div>
      ))}
      <style jsx>{`
        .skeleton-item {
          display: flex;
          width: 80vw;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #e0e0e0 50%,
            #f0f0f0 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
        }

        .skeleton-rank {
          width: 5em;
          height: 24px;
        }

        .skeleton-name {
          width: 8em;
          height: 24px;
        }

        .skeleton-score {
          width: 8em;
          height: 24px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
};

export default RankSkeleton;
