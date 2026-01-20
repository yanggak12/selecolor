/**
 * 완전 랜덤 RGB 색상을 생성합니다.
 * 너무 어두운 색상(평균 밝기 60 미만)은 제외합니다.
 */
const getRandomColor = () => {
  let r, g, b, avgBrightness;

  // 너무 어두운 색상이 나오지 않도록 반복
  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    avgBrightness = (r + g + b) / 3;
  } while (avgBrightness < 60); // 평균 밝기가 60 미만이면 재생성

  return `${r}, ${g}, ${b}`;
};

export default getRandomColor;
