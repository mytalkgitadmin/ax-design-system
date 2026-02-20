/**
 * Pagination Item 컴포넌트
 */

import React, { ElementType } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme/ThemeProvider';
import { INACTIVE_TEXT_COLOR } from './constants';
import { PaginationItemProps } from './types';
import { createPaginationVars, getColorScheme } from './utils';

import { paginationItemStyle } from './Pagination.css';

export const PaginationItem = <T extends ElementType = 'a'>({
  as,
  page,
  isActive = false,
  disabled = false,
  onClick,
  color: colorProp = 'primary',
  size = 'md',
  className = '',
  ...props
}: PaginationItemProps<T>) => {
  const { components } = useTheme();
  const buttonTheme = components.Button;

  const finalColorScheme = getColorScheme(buttonTheme, colorProp);

  const Component = as || 'a';

  return React.createElement(
    Component,
    {
      href:
        Component === 'a' && !(props as Record<string, unknown>).href
          ? '#'
          : undefined,
      className:
        `${paginationItemStyle({ size, color: colorProp, isActive })} ${className}`.trim(),
      onClick: (e: React.MouseEvent) => {
        if (Component === 'a' && !(props as Record<string, unknown>).href) {
          e.preventDefault();
        }
        if (!disabled && !isActive) {
          onClick?.();
        }
      },
      'aria-current': isActive ? 'page' : undefined,
      'aria-label': `페이지 ${page}`,
      'aria-disabled': disabled,
      tabIndex: isActive || disabled ? -1 : 0,
      style: assignInlineVars(
        createPaginationVars({
          buttonTheme,
          colorScheme: finalColorScheme,
          textColor: INACTIVE_TEXT_COLOR,
        })
      ),
      ...props,
    },
    page
  );
};
