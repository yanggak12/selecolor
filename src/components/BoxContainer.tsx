interface Props {
  stage: number;
  setStage: (arg: number) => void;
  boxRange: number[];
  gridCnt: number;
  targetIndex: number;
}
const BoxContainer: React.FC<Props> = ({
  stage,
  boxRange,
  gridCnt,
  targetIndex,
  setStage,
}) => {
  return (
    <>
      <div className="boxContainer">
        {boxRange.map((val, idx) => (
          <button
            key={idx}
            className={targetIndex === val ? "target" : ""}
            onClick={() =>
              targetIndex === val ? setStage(stage + 1) : alert("no")
            }
          ></button>
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
        button {
          border: 1px solid #000;
          width: 100%;
          height: 100%;
          border-radius: 10%;
        }
        button:hover {
          transform: translateY(-0.05em);
        }
        .target {
          background-color: antiquewhite;
        }
      `}</style>
    </>
  );
};

export default BoxContainer;
