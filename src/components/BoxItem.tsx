import getColorPercent from "../container/getColorPercent";
import getRGBA from "../container/getRGBA";
import setColorByStage from "../container/setColorByStage";

interface Props {
  isTarget: boolean;
  stage: number;
  setStage: (arg: number) => void;
  color: string;
  time: number;
  score: number;
  setScore: (arg: number) => void;
  setTime: (arg: number) => void;
}

const BoxItem: React.FC<Props> = ({
  isTarget,
  stage,
  setStage,
  color,
  time,
  score,
  setScore,
  setTime,
}) => {
  const colorPercent = getColorPercent(stage);
  setColorByStage(color, stage);
  return (
    <>
      <button
        className={isTarget ? "target" : ""}
        onClick={() => {
          if (isTarget) {
            setScore(score + Math.pow(stage, 3) * time);
            setStage(stage + 1);
          } else {
            time <= 3 ? setTime(0) : setTime(time - 3);
          }
        }}
      ></button>
      <style jsx>{`
        button {
          width: 100%;
          height: 100%;
          border-radius: 10%;
          background-color: ${getRGBA(color, 1)};
          border: 0;
          cursor: pointer;
        }
        button:hover {
          transform: translateY(-0.1em);
        }
        .target {
          background-color: ${getRGBA(
            setColorByStage(color, stage),
            colorPercent
          )};
        }
      `}</style>
    </>
  );
};

export default BoxItem;
