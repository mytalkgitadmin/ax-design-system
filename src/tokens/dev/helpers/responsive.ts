/**
 * Responsive Utilities
 * clamp, media query, container query 등을 제공합니다.
 *
 * ✅ 표준 16px 기준 (100%)
 */
import { toRem } from './units';

export const MAX_WIDTH = 1200; // 최대 컨테이너 너비 (px)

/**
 * CSS clamp()를 사용한 반응형 크기 생성
 * @param min - 최소 크기 (px)
 * @param max - 최대 크기 (px)
 * @returns clamp CSS 값
 *
 * @example
 * clampSize(16, 24)
 * // "clamp(1rem, 2vw, 1.5rem)"
 *
 * @description
 * - min: 최소 크기 (작은 화면에서 유지)
 * - max: 최대 크기 (큰 화면에서 유지)
 * - 중간값: 뷰포트 너비에 비례하여 유동적으로 변화
 * - fontSize, gap, padding 등 모든 크기 속성에 사용 가능
 */
export const clampSize = (min: number, max: number): string => {
  const minRem = toRem(min);
  const maxRem = toRem(max);
  const slope = (max / MAX_WIDTH) * 100;

  return `clamp(${minRem}, ${slope}vw, ${maxRem})`;
};

/**
 * Breakpoints 정의
 */
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
  max: MAX_WIDTH,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * 미디어 쿼리 헬퍼 (globalStyle용)
 * @example
 * globalStyle('body', {
 *   [mq.tablet]: { fontSize: '1.2rem' }
 * })
 */
export const mq = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  wide: `@media (min-width: ${breakpoints.wide}px)`,
  max: `@media (max-width: ${breakpoints.max}px)`,
} as const;

/**
 * vanilla-extract style() 함수용 미디어 쿼리 조건
 * @media 키워드 없이 조건만 포함
 *
 * @example
 * export const container = style({
 *   padding: '1rem',
 *   '@media': {
 *     [mqConditions.tablet]: { padding: '2rem' },
 *   },
 * });
 */
export const mqConditions = {
  mobile: `screen and (min-width: ${breakpoints.mobile}px)`,
  tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
  wide: `screen and (min-width: ${breakpoints.wide}px)`,
  max: `screen and (max-width: ${breakpoints.max}px)`,
} as const;

/**
 * 반응형 Typography Presets
 * clampSize를 활용한 디자인 시스템 프리셋
 */
export const clampTypography = {
  // Display - 대형 제목 (더 극적인 변화)
  display1: clampSize(32, 72), // 모바일 32px → 데스크톱 72px
  display2: clampSize(28, 56), // 모바일 28px → 데스크톱 56px

  // Title - 중형 제목
  title1: clampSize(24, 48), // 모바일 24px → 데스크톱 48px
  title2: clampSize(20, 36), // 모바일 20px → 데스크톱 36px
  title3: clampSize(18, 28), // 모바일 18px → 데스크톱 28px

  // Body - 본문
  body1: clampSize(14, 20), // 모바일 14px → 데스크톱 20px
  body2: clampSize(12, 16), // 모바일 12px → 데스크톱 16px
} as const;

/**
 * 반응형 Spacing Presets
 * 자주 사용하는 여백 크기 프리셋
 */
export const clampSpacing = {
  sectionGap: clampSize(32, 64), // 섹션 간격
  componentGap: clampSize(16, 24), // 컴포넌트 간격
  elementGap: clampSize(8, 12), // 요소 간격
} as const;

/**
 * Container Query 설정
 */
export const containerQueries = {
  sm: '(min-width: 400px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
} as const;

export type ContainerQuery = keyof typeof containerQueries;
