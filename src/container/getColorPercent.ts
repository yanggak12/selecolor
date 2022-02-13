const getColorPercent = (stage: number) => {
  return 0.1 * stage > 0.8 ? 0.8 : 0.1 * stage;
};

export default getColorPercent;
