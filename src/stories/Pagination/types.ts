// Pagination types
import {
  COMPONENT_COLOR_PRESETS,
  ComponentColorPreset,
} from '../../types/component';

export type PaginationColor = Exclude<ComponentColorPreset, 'tertiary'>;
export type PaginationSize = 'sm' | 'md';

export type PaginationProps = {
  /** 전체 페이지 수 */
  totalPages?: number;

  /** 현재 활성 페이지 (1부터 시작) */
  currentPage?: number;

  /** 페이지 변경 시 호출되는 콜백 */
  onPageChange?: (page: number) => void;

  /** 색상 변형 */
  color?: PaginationColor;

  /** 크기 변형 */
  size?: PaginationSize;

  /** 이전/다음 버튼 표시 여부 */
  showNavButtons?: boolean;

  /** 현재 페이지 주변에 표시할 페이지 버튼 수 */
  siblingCount?: number;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 추가 CSS 클래스 */
  className?: string;

  /** 추가 스타일 */
  style?: React.CSSProperties;
};

export type PaginationItemProps = {
  /** 페이지 번호 */
  page: number;

  /** 활성 상태 */
  isActive?: boolean;

  /** 비활성화 상태 */
  disabled?: boolean;

  /** 클릭 핸들러 */
  onClick?: () => void;

  /** 색상 변형 */
  color?: PaginationColor;

  /** 크기 변형 */
  size?: PaginationSize;

  /** 추가 CSS 클래스 */
  className?: string;
};

export type PaginationNavButtonProps = {
  /** 버튼 타입 */
  type: 'previous' | 'next';

  /** 비활성화 상태 */
  disabled?: boolean;

  /** 클릭 핸들러 */
  onClick?: () => void;

  /** 색상 변형 */
  color?: PaginationColor;

  /** 크기 변형 */
  size?: PaginationSize;

  /** 추가 CSS 클래스 */
  className?: string;
};

export type PaginationEllipsisProps = {
  /** 크기 변형 */
  size?: PaginationSize;

  /** 추가 CSS 클래스 */
  className?: string;
};

// Storybook을 위한 options 배열
export const PAGINATION_COLORS: PaginationColor[] =
  COMPONENT_COLOR_PRESETS.filter(
    (color) => color !== 'tertiary'
  ) as PaginationColor[];
export const PAGINATION_SIZES: PaginationSize[] = ['sm', 'md'];
