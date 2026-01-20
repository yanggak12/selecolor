interface Props {
  isTarget: boolean;
  stage: number;
  setStage: (arg: number) => void;
  boxColor: string;
  time: number;
  score: number;
  setScore: (arg: number) => void;
  setTime: (arg: number) => void;
  setIsWrongAnswer: (arg: boolean) => void;
}

const BoxItem: React.FC<Props> = ({
  isTarget,
  stage,
  setStage,
  boxColor,
  time,
  score,
  setScore,
  setTime,
  setIsWrongAnswer,
}) => {
  return (
    <>
      <button
        onClick={() => {
          if (isTarget) {
            setScore(score + Math.pow(stage, 3) * time);
            setStage(stage + 1);
          } else {
            // 틀렸을 때 흔들림 애니메이션 트리거
            setIsWrongAnswer(true);
            setTimeout(() => setIsWrongAnswer(false), 800);
            time <= 3 ? setTime(0) : setTime(time - 3);
          }
        }}
      ></button>
      <style jsx>{`
        button {
          width: 100%;
          height: 100%;
          border-radius: 10%;
          background-color: rgb(${boxColor});
          border: 0;
          cursor: pointer;
        }
        button:hover {
          transform: translateY(-0.1em);
        }
      `}</style>
    </>
  );
};

export default BoxItem;
