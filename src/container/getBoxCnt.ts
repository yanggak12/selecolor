const getBoxCnt = (stage: number) => {
  return Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
};

export default getBoxCnt;
