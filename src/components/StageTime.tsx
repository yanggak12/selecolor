interface Props {
  stage: number;
  time: number;
  score: number;
  isShaking?: boolean;
}
const StageTime: React.FC<Props> = ({ stage, time, score = 0, isShaking = false }) => {
  return (
    <div>
      <header>
        <h1>Stage {stage}</h1>
      </header>
      <section className="score-time">
        <div className="item">
          <h2>Score</h2>
          <h2>{score.toLocaleString()}</h2>
        </div>
        <div className="item time-container">
          <h2>Time</h2>
          <div className="time-wrapper">
            <h2 className={`time ${isShaking ? "shake" : ""}`}>{time}</h2>
            {isShaking && <span className="penalty">-3</span>}
          </div>
        </div>
      </section>

      <style jsx>{`
        .score-time {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .item {
          width: 50%;
          justify-content: center;
        }
        .time-container {
          position: relative;
        }
        .time-wrapper {
          position: relative;
          display: inline-block;
        }
        .time {
          color: ${time < 10 ? "rgba(243, 7, 31, 0.8)" : "#000"};
          transition: color 0.3s ease;
        }
        .shake {
          animation: shake 0.2s ease-in-out;
          color: rgba(243, 7, 31, 0.8);
        }
        .penalty {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-weight: bold;
          color: rgba(243, 7, 31, 0.9);
          animation: fadeUpOut 0.8s ease-out forwards;
          pointer-events: none;
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        @keyframes fadeUpOut {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
};

export default StageTime;
