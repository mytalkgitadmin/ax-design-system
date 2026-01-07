import React from 'react';

import type { FlexProps } from './types';

import { flexStyle } from './Flex.css';

export type { FlexProps };

export const Flex = ({
  as = 'div',
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
}: FlexProps) => {
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
    as,
    {
      className: `${flexClass} ${className || ''}`.trim(),
      style: inlineStyles,
    },
    children
  );
};
