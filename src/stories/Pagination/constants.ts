/**
 * Pagination 컴포넌트 상수 정의
 */

import { color } from '../../tokens';

/**
 * Pagination 설정 상수
 */
export const PAGINATION_CONFIG = {
  /** 네비게이션 버튼을 표시하기 위한 최소 페이지 수 (이 값 이하면 버튼 숨김) */
  NAV_BUTTON_THRESHOLD: 5,
  /** Ellipsis를 표시하기 위한 최소 페이지 수 */
  ELLIPSIS_THRESHOLD: 7,
  /** 기본 sibling count (현재 페이지 양옆에 표시할 페이지 수) */
  DEFAULT_SIBLING_COUNT: 1,
} as const;

/**
 * 색상 상수
 */
export const DEFAULT_BORDER_RADIUS = '8px';
export const INACTIVE_TEXT_COLOR = color.text.tertiary; // #888e9c
export const ACTIVE_TEXT_COLOR = color.base.white;
export const ICON_COLOR = color.icon.primary; // #4b5465
export const DISABLED_TEXT_COLOR = color.text.disabled;
export const DISABLED_BG_COLOR = color.bg.muted;
export const FALLBACK_HOVER_BG_COLOR = color.bg.gray;
