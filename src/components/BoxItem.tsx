interface Props {
  isTarget: boolean;
  stage: number;
  setStage: (arg: number) => void;
  color: string;
}

const BoxItem: React.FC<Props> = ({ isTarget, stage, setStage, color }) => {
  const colorPercent = 0.3 * (stage / 2) > 0.85 ? 0.85 : 0.3 * (stage / 2);
  console.log(colorPercent);
  return (
    <>
      <button
        className={isTarget ? "target" : ""}
        onClick={() => {
          isTarget ? setStage(stage + 1) : alert("no");
        }}
      ></button>
      <style jsx>{`
        button {
          width: 100%;
          height: 100%;
          border-radius: 10%;
          background-color: ${color + 1 + ")"};
        }
        button:hover {
          transform: translateY(-0.05em);
        }
        .target {
          background-color: ${color + colorPercent + ")"};
        }
      `}</style>
    </>
  );
};

export default BoxItem;
