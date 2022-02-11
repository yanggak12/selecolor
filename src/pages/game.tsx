import type { NextPage } from "next";
import Seo from "../components/Seo";
import { useState } from "react";
import ColorBox from "../components/ColorBox";
import getBoxCnt from "../container/getBoxCnt";
import getBoxRange from "../container/getBoxRange";
import getTargetIndex from "../container/getTargetIndex";

const Game: NextPage = () => {
  const [stage, setStage] = useState(1);
  const boxCnt = getBoxCnt(stage);
  const boxRange = getBoxRange(boxCnt);
  const targetIndex = getTargetIndex(boxCnt);
  console.log(targetIndex);
  return (
    <div>
      <Seo title="Game" />
      <h1>Game</h1>
      <div className="boxContainer">
        {boxRange.map((val, idx) => (
          <div key={idx} className="box">
            <ColorBox color="#fff" isTarget={val === targetIndex} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .boxContainer {
          display: flex;
        }
        .box {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default Game;
