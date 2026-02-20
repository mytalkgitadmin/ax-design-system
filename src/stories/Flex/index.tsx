import React, { ElementType } from 'react';

import type { FlexProps } from './types';

import { flexStyle } from './Flex.css';

export type { FlexProps };

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
  const flexClass = flexStyle({
    direction,
    justify,
    align,
    gap,
    wrap,
  });

  const inlineStyles: React.CSSProperties = {
    ...style,
    ...(flex !== undefined && { flex }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

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
