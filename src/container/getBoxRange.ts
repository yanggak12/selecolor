const getBoxRange = (boxCnt: number) => {
  const res: number[] = [];
  for (let i = 0; i < boxCnt; i++) {
    res.push(i);
  }
  return res;
};

export default getBoxRange;
