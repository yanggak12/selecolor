import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getBoxCnt from "../container/getBoxCnt";
import getBoxRange from "../container/getBoxRange";
import getGridCnt from "../container/getGridCnt";
import getTargetIndex from "../container/getTargetIndex";
import Seo from "../components/Seo";
import BoxContainer from "../components/BoxContainer";

const Game: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.query.prev) router.replace("/");
  }, [router]);
  const [stage, setStage] = useState(1);
  const boxCnt = getBoxCnt(stage);
  const boxRange = getBoxRange(boxCnt);
  const gridCnt = getGridCnt(boxCnt);
  const targetIndex = getTargetIndex(boxCnt);
  return (
    <>
      <Seo title="Game" />
      <h1>Game</h1>
      <BoxContainer
        stage={stage}
        setStage={setStage}
        boxRange={boxRange}
        gridCnt={gridCnt}
        targetIndex={targetIndex}
      />
    </>
  );
};

export default Game;
