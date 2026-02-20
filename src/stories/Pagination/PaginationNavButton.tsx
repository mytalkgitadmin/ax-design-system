/**
 * Pagination Navigation Button 컴포넌트
 */

import React, { ElementType } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme/ThemeProvider';
import { componentSize } from '../../tokens';
import { Icon } from '../Icon';
import { ICON_COLOR } from './constants';
import { PaginationNavButtonProps } from './types';
import { createPaginationVars, getColorScheme } from './utils';

import { paginationNavStyle } from './Pagination.css';

export const PaginationNavButton = <T extends ElementType = 'a'>({
  as,
  type,
  disabled = false,
  onClick,
  color: colorProp = 'primary',
  size = 'md',
  className = '',
  ...props
}: PaginationNavButtonProps<T>) => {
  const { components } = useTheme();
  const buttonTheme = components.Button;
  const iconSize = Number(componentSize[size].iconSize);

  const isPrevious = type === 'previous';
  const label = isPrevious ? '이전 페이지' : '다음 페이지';

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
        `${paginationNavStyle({ size, color: colorProp })} ${className}`.trim(),
      onClick: (e: React.MouseEvent) => {
        if (Component === 'a' && !(props as Record<string, unknown>).href) {
          e.preventDefault();
        }
        if (!disabled) {
          onClick?.();
        }
      },
      'aria-label': label,
      'aria-disabled': disabled,
      tabIndex: disabled ? -1 : 0,
      style: assignInlineVars(
        createPaginationVars({
          buttonTheme,
          colorScheme: finalColorScheme,
          textColor: ICON_COLOR,
        })
      ),
      ...props,
    },
    <Icon name={isPrevious ? 'ChevronLeft' : 'ChevronRight'} size={iconSize} />
  );
};
