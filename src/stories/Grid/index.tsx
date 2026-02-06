import React from 'react';

import { GRID_COLUMNS } from './types';

import type { GridItemProps, GridProps } from './types';

import { gridStyle } from './Grid.css';

export type { GridItemProps, GridProps };

export const Grid = ({
  as = 'div',
  columns,
  rows,
  gap,
  columnGap,
  rowGap,
  autoFlow = 'row',
  align = 'stretch',
  justify = 'start',
  placeContent,
  minColumnWidth = '200px',
  areas,
  width,
  height,
  style,
  className,
  children,
}: GridProps) => {
  const isPredefinedColumn =
    columns && (GRID_COLUMNS as readonly string[]).includes(columns);

  const gridClass = gridStyle({
    columns: isPredefinedColumn
      ? (columns as (typeof GRID_COLUMNS)[number])
      : undefined,
    rows,
    gap,
    columnGap,
    rowGap,
    autoFlow,
    align,
    justify,
  });

  // auto-fill/auto-fit 및 커스텀 columns 처리
  let gridTemplateColumns: string | undefined;
  if (columns === 'auto-fill' || columns === 'auto-fit') {
    const minWidth =
      typeof minColumnWidth === 'number'
        ? `${minColumnWidth}px`
        : minColumnWidth;
    gridTemplateColumns = `repeat(${columns}, minmax(${minWidth}, 1fr))`;
  } else if (columns && !isPredefinedColumn) {
    gridTemplateColumns = columns;
  }

  // grid-template-areas 처리
  const gridTemplateAreas = areas
    ? areas.map((row) => `"${row}"`).join(' ')
    : undefined;

  const inlineStyles: React.CSSProperties = {
    ...style,
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...(gridTemplateColumns && { gridTemplateColumns }),
    ...(gridTemplateAreas && { gridTemplateAreas }),
    ...(placeContent && { placeContent }),
  };

  return React.createElement(
    as,
    {
      className: `${gridClass} ${className || ''}`.trim(),
      style: inlineStyles,
    },
    children
  );
};

/**
 * GridItem 컴포넌트
 * Grid의 자식 요소로 사용하여 개별 아이템의 위치와 크기를 제어합니다.
 */
export const GridItem = ({
  area,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  style,
  className,
  children,
}: GridItemProps) => {
  const itemStyles: React.CSSProperties = {
    ...style,
    ...(area && { gridArea: area }),
    ...(colSpan && {
      gridColumn: typeof colSpan === 'number' ? `span ${colSpan}` : colSpan,
    }),
    ...(rowSpan && {
      gridRow: typeof rowSpan === 'number' ? `span ${rowSpan}` : rowSpan,
    }),
    ...(colStart && { gridColumnStart: colStart }),
    ...(colEnd && { gridColumnEnd: colEnd }),
    ...(rowStart && { gridRowStart: rowStart }),
    ...(rowEnd && { gridRowEnd: rowEnd }),
  };

  return (
    <div className={className} style={itemStyles}>
      {children}
    </div>
  );
};
