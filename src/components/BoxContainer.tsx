import BoxItem from "./BoxItem";
import setColorByStage from "../container/setColorByStage";

interface Props {
  stage: number;
  setStage: (arg: number) => void;
  boxRange: number[];
  gridCnt: number;
  targetIndex: number;
  color: string;
  time: number;
  score: number;
  setScore: (arg: number) => void;
  setTime: (arg: number) => void;
  setIsWrongAnswer: (arg: boolean) => void;
  hasMouseMoved: boolean;
  stageStartTime: number;
}
const BoxContainer: React.FC<Props> = ({
  stage,
  boxRange,
  gridCnt,
  targetIndex,
  setStage,
  color,
  time,
  score,
  setScore,
  setTime,
  setIsWrongAnswer,
  hasMouseMoved,
  stageStartTime,
}) => {
  return (
    <>
      <div className="boxContainer">
        {boxRange.map((val, idx) => {
          // 각 박스의 실제 색상을 여기서 결정 (CSS 클래스로 구분 불가능하게)
          const isTarget = val === targetIndex;
          const boxColor = isTarget ? setColorByStage(color, stage) : color;

          return (
            <BoxItem
              key={idx}
              isTarget={isTarget}
              stage={stage}
              score={score}
              time={time}
              setTime={setTime}
              setScore={setScore}
              setStage={setStage}
              boxColor={boxColor}
              setIsWrongAnswer={setIsWrongAnswer}
              hasMouseMoved={hasMouseMoved}
              stageStartTime={stageStartTime}
            />
          );
        })}
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
        @media (max-width: 700px) {
          .boxContainer {
            width: 90vw;
            height: 90vw;
          }
        }
      `}</style>
    </>
  );
};

export default BoxContainer;
