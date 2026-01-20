import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import getRandomColor from "../container/getRandomColor";

interface Props {
  isVisible: boolean;
}

const LoadingProgress: React.FC<Props> = ({ isVisible }) => {
  const [color, setColor] = useState("rgba(0,0,0,0.8)");

  useInterval(
    () => {
      setColor("rgba(" + getRandomColor() + ",0.8)");
    },
    isVisible ? 1000 : null
  );

  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="spinner" />
        <p>Saving your rank...</p>
      </div>
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top-color: ${color};
          border-radius: 50%;
          animation: spin 1.2s ease-in-out infinite;
          transition: border-top-color 0.8s ease;
        }

        p {
          color: #fff;
          font-size: 18px;
          font-weight: 500;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingProgress;
