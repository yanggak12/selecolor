/**
 * 스테이지에 따라 RGB 값을 직접 조정하여 미묘한 색상 차이를 만듭니다.
 * 모든 RGB 채널을 같은 방향으로 조정하여 색 계열을 유지합니다.
 *
 * @param color - RGB 문자열 (예: "255, 100, 50")
 * @param stage - 현재 스테이지 (1부터 시작)
 * @returns 조정된 RGB 문자열
 */
const setColorByStage = (color: string, stage: number) => {
  // 스테이지에 따른 RGB 차이 계산
  // stage 1: 50 차이 (쉬움), stage 5: 20 차이, stage 10: 10 차이
  const diff = Math.max(10, Math.floor(100 / stage));

  const rgbArr = color.split(",").map((c) => {
    const val = Number(c.trim());

    // 평균 밝기 계산을 위해 임시로 모든 값 파싱
    return val;
  });

  // 평균 밝기 계산 (0-255)
  const avgBrightness = (rgbArr[0] + rgbArr[1] + rgbArr[2]) / 3;

  // 밝은 색(평균 127 이상)은 어둡게, 어두운 색은 밝게 조정
  const adjustedArr = rgbArr.map((val) => {
    if (avgBrightness > 127) {
      // 밝은 색 → 어둡게
      return Math.max(0, val - diff);
    } else {
      // 어두운 색 → 밝게
      return Math.min(255, val + diff);
    }
  });

  return `${adjustedArr[0]}, ${adjustedArr[1]}, ${adjustedArr[2]}`;
};

export default setColorByStage;
