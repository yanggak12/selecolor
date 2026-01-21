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
import AlertModal from "../components/AlertModal";
import RankModal from "../components/RankModal";

const Game: NextPage = () => {
  const [stage, setStage] = useState(1);
  const [readyTime, setReadyTime] = useState(3);
  const [time, setTime] = useState(15);
  const [boxColor, setBoxColor] = useState("");
  const [targetIndex, setTargetIndex] = useState(getTargetIndex(4));
  const [score, setScore] = useState(0);
  const [AlertVisible, setAlertVisible] = useState(false);
  const [RankVisible, setRankVisible] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [stageStartTime, setStageStartTime] = useState(Date.now());
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
    setStageStartTime(Date.now());
  }, [stage, boxCnt]);

  useEffect(() => {
    const handleMouseMove = () => {
      setHasMouseMoved(true);
    };

    const handleTouchStart = () => {
      setHasMouseMoved(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  useInterval(() => {
    if (readyTime) setReadyTime(readyTime - 1);
    else if (time) setTime(time - 1);
  }, 1000);

  return (
    <>
      <Seo title="Game" />
      {readyTime ? (
        <div className="center-div">
          <h1>Select a differnt color box!</h1>
          <h1>{readyTime}</h1>
          <h3>If you select quickly, your score will be go up more.</h3>
          <h3>
            But if you select the wrong box, the time will be reduced by 3
            seconds.
          </h3>
        </div>
      ) : (
        <>
          <StageTime stage={stage} time={time} score={score} isShaking={isWrongAnswer} />
          <BoxContainer
            score={score}
            time={time}
            setTime={setTime}
            stage={stage}
            setStage={setStage}
            boxRange={boxRange}
            gridCnt={gridCnt}
            targetIndex={targetIndex}
            color={boxColor}
            setScore={setScore}
            setIsWrongAnswer={setIsWrongAnswer}
            hasMouseMoved={hasMouseMoved}
            stageStartTime={stageStartTime}
          />
          <AlertModal
            rankHandler={() => setRankVisible(true)}
            isVisible={AlertVisible}
            setVisible={setAlertVisible}
            time={time}
            title={"Time Out!"}
            score={score}
            newGameHandler={() => {
              setScore(0);
              setTime(15);
              setStage(1);
              setReadyTime(3);
            }}
          />
          <RankModal
            isVisible={RankVisible}
            score={score}
            setVisible={setRankVisible}
          />
        </>
      )}
    </>
  );
};

export default Game;
