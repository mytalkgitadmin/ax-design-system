/**
 * Radius 전역 테마
 * border-radius 값을 정의
 */

export type RadiusTheme = {
  none: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
};

export const radiusTheme: RadiusTheme = {
  none: 0,
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};
