/**
 * 단위 변환 헬퍼 함수
 *
 * 프로젝트 설정:
 * - html { font-size: 10px }
 * - body { font-size: 1.6rem } = 16px
 */

/**
 * px 값을 rem으로 변환
 * @param px - 픽셀 값 (숫자 또는 문자열)
 * @returns rem 단위 문자열 (예: "0.8rem")
 *
 * @example
 * toRem(8) // "0.8rem"
 * toRem(16) // "1.6rem"
 * toRem('12') // "1.2rem"
 */
export const toRem = (px: number | string): string => {
  const value = typeof px === 'string' ? Number(px) : px;
  return `${value / 10}rem`;
};

/**
 * px 값을 em으로 변환 (부모 fontSize 기준)
 * @param px - 픽셀 값
 * @param baseFontSize - 기준 폰트 크기 (기본값: 16px)
 * @returns em 단위 문자열
 *
 * @example
 * toEm(8, 16) // "0.5em"
 * toEm(12, 14) // "0.857em"
 */
export const toEm = ({
  px,
  baseFontSize = 16,
}: {
  px: number | string;
  baseFontSize: number;
}): string => {
  const value = typeof px === 'string' ? Number(px) : px;
  return `${value / baseFontSize}em`;
};

/**
 * rem 값을 px로 변환 (html font-size: 10px 기준)
 * @param rem - rem 값
 * @returns 픽셀 값
 *
 * @example
 * toPx(0.8) // 8
 * toPx(1.6) // 16
 */
export const toPx = (rem: number): number => {
  return rem * 10;
};
