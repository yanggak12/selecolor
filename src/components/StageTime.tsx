interface Props {
  stage: number;
  time: number;
  score: number;
}
const StageTime: React.FC<Props> = ({ stage, time, score = 0 }) => {
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
        <div className="item">
          <h2>Time</h2>
          <h2 className="time">{time}</h2>
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
        .time {
          color: ${time < 10 ? "rgba(243, 7, 31, 0.8)" : "#000"};
        }
      `}</style>
    </div>
  );
};

export default StageTime;
