import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import getBoxCnt from "../container/getBoxCnt";
import getBoxRange from "../container/getBoxRange";
import getGridCnt from "../container/getGridCnt";
import getTargetIndex from "../container/getTargetIndex";
import Seo from "../components/Seo";
import BoxContainer from "../components/BoxContainer";
import getRandomColor from "../container/getRandomColor";
import StageTime from "../components/StageTime";

const Game: NextPage = () => {
  const [stage, setStage] = useState(1);
  const [time, setTime] = useState(15);
  const [boxColor, setBoxColor] = useState("");
  const [targetIndex, setTargetIndex] = useState(getTargetIndex(4));
  const [score, setScore] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const boxCnt = getBoxCnt(stage);
  const boxRange = getBoxRange(boxCnt);
  const gridCnt = getGridCnt(boxCnt);
  const router = useRouter();
  useEffect(() => {
    if (!router.query.prev) router.replace("/");
  }, [router]);
  useEffect(() => {
    setBoxColor(getRandomColor());
    setTime(15);
    setTargetIndex(getTargetIndex(boxCnt));
  }, [stage, boxCnt]);
  useInterval(() => {
    time && setTime(time - 1);
  }, 1000);

  return (
    <>
      <Seo title="Game" />
      <StageTime stage={stage} time={time} score={score} />
      <BoxContainer
        time={time}
        setTime={setTime}
        stage={stage}
        setStage={setStage}
        boxRange={boxRange}
        gridCnt={gridCnt}
        targetIndex={targetIndex}
        color={boxColor}
        setScore={setScore}
      />
    </>
  );
};

export default Game;
