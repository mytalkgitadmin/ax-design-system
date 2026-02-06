/**
 * 단위 변환 헬퍼 함수
 *
 * html { font-size: 100%; } 설정을 따릅니다.
 */

/**
 * px 값을 rem으로 변환 (16px 기준)
 * @param px - 픽셀 값 (숫자 또는 문자열)
 * @returns rem 단위 문자열
 *
 * @example
 * toRem(8) // "0.5rem"
 * toRem(16) // "1rem"
 * toRem('24') // "1.5rem"
 * toRem(32) // "2rem"
 */
export const toRem = (px: number | string): string => {
  const value = typeof px === 'string' ? Number(px) : px;
  return `${value / 16}rem`;
};

/**
 * rem 값을 px로 변환 (16px 기준)
 * @param rem - rem 값
 * @returns 픽셀 값
 *
 * @example
 * toPx(0.5) // 8
 * toPx(1) // 16
 * toPx(1.5) // 24
 */
export const toPx = (rem: number): number => {
  return rem * 16;
};

// ===== 공통 유틸리티 =====

/**
 * px 값을 em으로 변환 (부모 fontSize 기준)
 * @param px - 픽셀 값
 * @param baseFontSize - 기준 폰트 크기 (기본값: 16px)
 * @returns em 단위 문자열
 *
 * @example
 * toEm({ px: 8, baseFontSize: 16 }) // "0.5em"
 * toEm({ px: 12, baseFontSize: 14 }) // "0.857em"
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
 * 📊 빠른 변환표 (16px 기준):
 * | Figma | toRem()   |
 * |-------|-----------|
 * | 2px   | 0.125rem  |
 * | 4px   | 0.25rem   |
 * | 8px   | 0.5rem    |
 * | 12px  | 0.75rem   |
 * | 16px  | 1rem      |
 * | 20px  | 1.25rem   |
 * | 24px  | 1.5rem    |
 * | 32px  | 2rem      |
 * | 48px  | 3rem      |
 * | 64px  | 4rem      |
 */
