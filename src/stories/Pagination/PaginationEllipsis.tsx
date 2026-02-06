/**
 * Pagination Ellipsis 컴포넌트
 */

import { PaginationEllipsisProps } from './types';

import { paginationEllipsisStyle } from './Pagination.css';

export const PaginationEllipsis = ({
  size = 'md',
  className = '',
}: PaginationEllipsisProps) => (
  <div
    className={`${paginationEllipsisStyle({ size })} ${className}`}
    aria-hidden='true'
    role='presentation'
  >
    ⋯
  </div>
);
