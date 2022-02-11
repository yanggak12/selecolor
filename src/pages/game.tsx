import type { NextPage } from "next";
import Seo from "../components/Seo";
import { useState } from "react";
import ColorBox from "../components/ColorBox";
import getBoxCnt from "../container/getBoxCnt";
import getBoxRange from "../container/getBoxRange";
import getTargetIndex from "../container/getTargetIndex";
import getGridCnt from "../container/getGridCnt";

const Game: NextPage = () => {
  const [stage, setStage] = useState(1);
  const boxCnt = getBoxCnt(stage);
  const gridCnt = getGridCnt(boxCnt);
  const boxRange = getBoxRange(boxCnt);
  const targetIndex = getTargetIndex(boxCnt);
  return (
    <>
      <Seo title="Game" />
      <h1>Game</h1>
      <div className="boxContainer">
        {boxRange.map((val, idx) => (
          <ColorBox
            key={idx}
            color="#fff"
            isTarget={val === targetIndex}
            onClickHandler={() => setStage(stage + 1)}
          />
        ))}
      </div>
      <style jsx>{`
        .boxContainer {
          display: grid;
          grid-template-columns: repeat(${gridCnt}, 110px);
        }
      `}</style>
    </>
  );
};

export default Game;
