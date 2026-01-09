import { breakpoint } from '../tokens';

/**
 * 미디어 쿼리 헬퍼 유틸리티
 *
 * @example
 * const styles = {
 *   [media.down('md')]: {
 *     flexDirection: 'column',
 *   },
 * };
 */
export const media = {
  /**
   * 지정된 breakpoint 이하일 때 적용
   * @param bp - 'sm' | 'md' | 'lg' | 'xl'
   */
  down: (bp: keyof typeof breakpoint) =>
    `@media (max-width: ${parseInt(breakpoint[bp]) - 1}px)`,

  /**
   * 지정된 breakpoint 이상일 때 적용
   * @param bp - 'sm' | 'md' | 'lg' | 'xl'
   */
  up: (bp: keyof typeof breakpoint) =>
    `@media (min-width: ${breakpoint[bp]}px)`,

  /**
   * 두 breakpoint 사이일 때 적용
   * @param minBp - 최소 breakpoint
   * @param maxBp - 최대 breakpoint
   */
  between: (minBp: keyof typeof breakpoint, maxBp: keyof typeof breakpoint) =>
    `@media (min-width: ${breakpoint[minBp]}px) and (max-width: ${parseInt(breakpoint[maxBp]) - 1}px)`,
};

/**
 * useMediaQuery hook을 위한 헬퍼
 */
export const mediaQuery = {
  down: (bp: keyof typeof breakpoint) =>
    `(max-width: ${parseInt(breakpoint[bp]) - 1}px)`,
  up: (bp: keyof typeof breakpoint) => `(min-width: ${breakpoint[bp]}px)`,
};
