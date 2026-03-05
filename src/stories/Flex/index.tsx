import React, { ElementType, useMemo } from 'react';

import type {
  Breakpoint,
  FlexDirection,
  FlexGap,
  FlexProps,
  Responsive,
} from './types';

import { flexStyle } from './Flex.css';

export type { Breakpoint, FlexProps, Responsive };

const FLEX_GAP_VALUES: Record<FlexGap, string> = {
  '0': '0px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '16': '16px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '32': '32px',
  '48': '48px',
  '64': '64px',
};

/** Responsive<T>가 객체 형태인지 확인 */
function isResponsiveObject<T>(
  value: Responsive<T>
): value is Record<string, T> {
  return typeof value === 'object' && value !== null;
}

export const Flex = <T extends ElementType = 'div'>({
  as,
  direction = 'row',
  justify = 'start',
  align = 'stretch',
  gap,
  wrap = 'nowrap',
  flex,
  width,
  height,
  style,
  className,
  children,
  ...props
}: FlexProps<T>) => {
  const Component = as || 'div';

  const isResponsiveDirection = isResponsiveObject(direction);
  const isResponsiveGap = gap !== undefined && isResponsiveObject(gap);

  const flexClass = flexStyle({
    direction: isResponsiveDirection
      ? '__responsive'
      : (direction as FlexDirection),
    justify,
    align,
    gap: isResponsiveGap ? '__responsive' : (gap as FlexGap | undefined),
    wrap,
  });

  const inlineStyles = useMemo((): React.CSSProperties => {
    // 반응형 direction CSS 변수 주입
    const directionVars = isResponsiveDirection
      ? ({
          ...(direction.base && { '--_fd-base': direction.base }),
          ...(direction.sm && { '--_fd-sm': direction.sm }),
          ...(direction.md && { '--_fd-md': direction.md }),
          ...(direction.lg && { '--_fd-lg': direction.lg }),
          ...(direction.xl && { '--_fd-xl': direction.xl }),
        } as React.CSSProperties)
      : {};

    // 반응형 gap CSS 변수 주입
    const gapVars = isResponsiveGap
      ? ({
          ...((gap as Record<string, FlexGap>).base && {
            '--_fg-base':
              FLEX_GAP_VALUES[(gap as Record<string, FlexGap>).base],
          }),
          ...((gap as Record<string, FlexGap>).sm && {
            '--_fg-sm': FLEX_GAP_VALUES[(gap as Record<string, FlexGap>).sm],
          }),
          ...((gap as Record<string, FlexGap>).md && {
            '--_fg-md': FLEX_GAP_VALUES[(gap as Record<string, FlexGap>).md],
          }),
          ...((gap as Record<string, FlexGap>).lg && {
            '--_fg-lg': FLEX_GAP_VALUES[(gap as Record<string, FlexGap>).lg],
          }),
          ...((gap as Record<string, FlexGap>).xl && {
            '--_fg-xl': FLEX_GAP_VALUES[(gap as Record<string, FlexGap>).xl],
          }),
        } as React.CSSProperties)
      : {};

    return {
      ...directionVars,
      ...gapVars,
      ...style,
      ...(flex !== undefined && { flex }),
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
    };
  }, [
    direction,
    gap,
    flex,
    width,
    height,
    style,
    isResponsiveDirection,
    isResponsiveGap,
  ]);

  return React.createElement(
    Component,
    {
      className: `${flexClass} ${className || ''}`.trim(),
      style: inlineStyles,
      ...props,
    },
    children
  );
};
