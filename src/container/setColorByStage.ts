const setColorByStage = (color: string, stage: number) => {
  const numberByStage = 100 / stage;
  const rgbArr = color
    .split(",")
    .map((c) =>
      Number(c) > numberByStage
        ? Number(c) - numberByStage
        : Number(c) + numberByStage
    );
  return `${rgbArr[0] + "," + rgbArr[1] + "," + rgbArr[2]}`;
};

export default setColorByStage;
