/**
 * Pagination 컴포넌트 유틸리티 함수
 */

import React from 'react';

import {
  ACTIVE_TEXT_COLOR,
  DEFAULT_BORDER_RADIUS,
  DISABLED_BG_COLOR,
  DISABLED_TEXT_COLOR,
  FALLBACK_HOVER_BG_COLOR,
  PAGINATION_CONFIG,
} from './constants';

import { paginationVars } from './Pagination.css';

/**
 * 색상 스킴 가져오기 헬퍼
 */
export const getColorScheme = (
  buttonTheme: {
    colorSchemes: Record<
      string,
      {
        default: string;
        hover: string;
        active: string;
        text: string;
        bgHover?: string;
      }
    >;
  },
  colorProp: string
) => {
  const colorScheme = buttonTheme.colorSchemes[colorProp];
  return (
    colorScheme ?? {
      default: colorProp,
      hover: colorProp,
      active: colorProp,
      text: colorProp,
    }
  );
};

/**
 * Pagination CSS 변수 생성 헬퍼
 */
export const createPaginationVars = ({
  buttonTheme,
  colorScheme,
  textColor,
}: {
  buttonTheme: { radius?: number };
  colorScheme: {
    default: string;
    hover: string;
    active: string;
    bgHover?: string;
  };
  textColor: string;
}) => ({
  [paginationVars.borderRadius]:
    buttonTheme.radius !== undefined
      ? `${buttonTheme.radius}px`
      : DEFAULT_BORDER_RADIUS,
  [paginationVars.defaultColor]: colorScheme.default,
  [paginationVars.hoverColor]: colorScheme.hover,
  [paginationVars.hoverBgColor]: colorScheme.bgHover || FALLBACK_HOVER_BG_COLOR,
  [paginationVars.activeColor]: colorScheme.active,
  [paginationVars.textColor]: textColor,
  [paginationVars.activeBgColor]: colorScheme.default,
  [paginationVars.activeTextColor]: ACTIVE_TEXT_COLOR,
  [paginationVars.disabledColor]: DISABLED_TEXT_COLOR,
  [paginationVars.disabledBgColor]: DISABLED_BG_COLOR,
});

/**
 * 페이지 범위 계산 유틸리티
 */
const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * 표시할 페이지 번호 배열 계산
 */
export const usePagination = ({
  totalPages,
  currentPage,
  siblingCount = PAGINATION_CONFIG.DEFAULT_SIBLING_COUNT,
}: {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
}): (number | 'ellipsis')[] => {
  return React.useMemo(() => {
    const ELLIPSIS = 'ellipsis' as const;

    // 전체 페이지가 ELLIPSIS_THRESHOLD개 이하면 모두 표시
    if (totalPages <= PAGINATION_CONFIG.ELLIPSIS_THRESHOLD) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // 오른쪽 ellipsis만 표시
    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, ELLIPSIS, totalPages];
    }

    // 왼쪽 ellipsis만 표시
    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, ELLIPSIS, ...rightRange];
    }

    // 양쪽 ellipsis 모두 표시
    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        firstPageIndex,
        ELLIPSIS,
        ...middleRange,
        ELLIPSIS,
        lastPageIndex,
      ];
    }

    return range(1, totalPages);
  }, [totalPages, currentPage, siblingCount]);
};
