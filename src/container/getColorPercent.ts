const getColorPercent = (stage: number) => {
  return 0.3 * (stage / 2) > 0.85 ? 0.85 : 0.3 * (stage / 2);
};

export default getColorPercent;
