/**
 * Pagination 컴포넌트
 * 페이지네이션 UI를 제공하는 메인 컴포넌트
 */

import { useCallback } from 'react';

import { PAGINATION_CONFIG } from './constants';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationItem } from './PaginationItem';
import { PaginationNavButton } from './PaginationNavButton';
import { PaginationProps } from './types';
import { usePagination } from './utils';

import { paginationContainer } from './Pagination.css';

// Export types
export type {
  PaginationEllipsisProps,
  PaginationItemProps,
  PaginationNavButtonProps,
  PaginationProps,
} from './types';

// Export sub-components
export { PaginationEllipsis } from './PaginationEllipsis';
export { PaginationItem } from './PaginationItem';
export { PaginationNavButton } from './PaginationNavButton';

/**
 * Pagination 메인 컴포넌트
 */
export const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  color: colorProp = 'secondary',
  size = 'md',
  showNavButtons = true,
  siblingCount = 1,
  disabled = false,
  className = '',
  itemAs,
  getItemProps,
  style,
}: PaginationProps) => {
  const pages = usePagination({ totalPages, currentPage, siblingCount });

  const handlePageChange = useCallback(
    (page: number) => {
      if (disabled) return;
      if (page < 1 || page > totalPages) return;
      if (page === currentPage) return;
      onPageChange?.(page);
    },
    [disabled, totalPages, currentPage, onPageChange]
  );

  const handlePrevious = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [handlePageChange, currentPage]);

  const handleNext = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [handlePageChange, currentPage]);

  // NAV_BUTTON_THRESHOLD 페이지 이하일 때는 navigation button을 숨김
  const shouldShowNavButtons =
    showNavButtons && totalPages > PAGINATION_CONFIG.NAV_BUTTON_THRESHOLD;

  // 첫 페이지일 때 이전 버튼, 마지막 페이지일 때 다음 버튼 숨김
  const showPrevious = shouldShowNavButtons && currentPage > 1;
  const showNext = shouldShowNavButtons && currentPage < totalPages;

  return (
    <nav role='navigation' aria-label='페이지네이션' style={style}>
      <ul className={`${paginationContainer} ${className}`}>
        {showPrevious && (
          <li>
            <PaginationNavButton
              as={itemAs}
              type='previous'
              onClick={handlePrevious}
              disabled={disabled}
              color={colorProp}
              size={size}
              {...(getItemProps
                ? getItemProps('previous', currentPage - 1)
                : {})}
            />
          </li>
        )}

        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`}>
                <PaginationEllipsis size={size} />
              </li>
            );
          }

          return (
            <li key={page}>
              <PaginationItem
                as={itemAs}
                page={page}
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                color={colorProp}
                size={size}
                {...(getItemProps ? getItemProps('page', page) : {})}
              />
            </li>
          );
        })}

        {showNext && (
          <li>
            <PaginationNavButton
              as={itemAs}
              type='next'
              onClick={handleNext}
              disabled={disabled}
              color={colorProp}
              size={size}
              {...(getItemProps ? getItemProps('next', currentPage + 1) : {})}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};
