import { boxColors } from "../utils/boxColors";

const getRandomColor = () => {
  const color = boxColors[Math.floor(Math.random() * boxColors.length)];
  return color;
};

export default getRandomColor;
