import { boxColors } from "../utils/boxColors";
import BoxItem from "./BoxItem";

interface Props {
  stage: number;
  setStage: (arg: number) => void;
  boxRange: number[];
  gridCnt: number;
  targetIndex: number;
  color: string;
  time: number;
  setScore: (arg: number) => void;
  setTime: (arg: number) => void;
}
const BoxContainer: React.FC<Props> = ({
  stage,
  boxRange,
  gridCnt,
  targetIndex,
  setStage,
  color,
  time,
  setScore,
  setTime,
}) => {
  return (
    <>
      <div className="boxContainer">
        {boxRange.map((val, idx) => (
          <BoxItem
            key={idx}
            isTarget={val === targetIndex}
            stage={stage}
            time={time}
            setTime={setTime}
            setScore={setScore}
            setStage={setStage}
            color={color}
          />
        ))}
      </div>
      <style jsx>{`
        .boxContainer {
          width: 600px;
          height: 600px;
          align-items: stretch;
          justify-content: stretch;
          justify-content: space-between;
          display: grid;
          grid-template-columns: repeat(${gridCnt}, 1fr);
          row-gap: 5px;
          column-gap: 5px;
        }
      `}</style>
    </>
  );
};

export default BoxContainer;
