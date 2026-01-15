/**
 * Spacing Scale
 * CSS 레벨에서 관리하는 공간 스케일
 *
 * ✅ 표준 16px 기준 (100%)
 * toRem 함수를 사용하여 자동 변환합니다.
 */
import { toRem } from './units';

export const spacing = {
  0: toRem(0), // 0px
  4: toRem(4), // 4px - 최소 단위
  8: toRem(8), // 8px - 기본 단위
  12: toRem(12), // 12px
  16: toRem(16), // 16px
  24: toRem(24), // 24px
  32: toRem(32), // 32px
  48: toRem(48), // 48px
  64: toRem(64), // 64px
} as const;

// 타입 export
export type Spacing = keyof typeof spacing;

/**
 * Storybook을 위한 options 배열
 */
export const spacingOptions = Object.keys(spacing).map(Number) as Spacing[];
