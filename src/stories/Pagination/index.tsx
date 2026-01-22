/**
 * Pagination 컴포넌트
 * 페이지네이션 UI를 제공하는 메인 컴포넌트
 */

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
  style,
}: PaginationProps) => {
  const pages = usePagination({ totalPages, currentPage, siblingCount });

  const handlePageChange = (page: number) => {
    if (disabled) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

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
              type='previous'
              onClick={handlePrevious}
              disabled={disabled}
              color={colorProp}
              size={size}
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
                page={page}
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                color={colorProp}
                size={size}
              />
            </li>
          );
        })}

        {showNext && (
          <li>
            <PaginationNavButton
              type='next'
              onClick={handleNext}
              disabled={disabled}
              color={colorProp}
              size={size}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};
