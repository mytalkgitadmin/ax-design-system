/**
 * Pagination Navigation Button 컴포넌트
 */

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme/ThemeProvider';
import { componentSize } from '../../tokens';
import { Icon } from '../Icon';
import { ICON_COLOR } from './constants';
import { PaginationNavButtonProps } from './types';
import { createPaginationVars, getColorScheme } from './utils';

import { paginationNavStyle } from './Pagination.css';

export const PaginationNavButton = ({
  type,
  disabled = false,
  onClick,
  color: colorProp = 'primary',
  size = 'md',
  className = '',
}: PaginationNavButtonProps) => {
  const { components } = useTheme();
  const buttonTheme = components.Button;
  const iconSize = Number(componentSize[size].iconSize);

  const isPrevious = type === 'previous';
  const label = isPrevious ? '이전 페이지' : '다음 페이지';

  const finalColorScheme = getColorScheme(buttonTheme, colorProp);

  return (
    <a
      href='#'
      className={`${paginationNavStyle({ size, color: colorProp })} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          onClick?.();
        }
      }}
      aria-label={label}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      style={assignInlineVars(
        createPaginationVars({
          buttonTheme,
          colorScheme: finalColorScheme,
          textColor: ICON_COLOR,
        })
      )}
    >
      <Icon
        name={isPrevious ? 'ChevronLeft' : 'ChevronRight'}
        size={iconSize}
      />
    </a>
  );
};
