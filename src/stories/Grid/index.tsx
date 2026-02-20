import React, { ElementType, useMemo } from 'react';

import { GRID_COLUMNS } from './types';

import type { GridItemProps, GridProps } from './types';

import { gridStyle } from './Grid.css';

export type { GridItemProps, GridProps };

export const Grid = <T extends ElementType = 'div'>({
  as,
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
  ...props
}: GridProps<T>) => {
  const Component = as || 'div';
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

  const inlineStyles = useMemo((): React.CSSProperties => {
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

    return {
      ...style,
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(gridTemplateColumns && { gridTemplateColumns }),
      ...(gridTemplateAreas && { gridTemplateAreas }),
      ...(placeContent && { placeContent }),
    };
  }, [
    style,
    width,
    height,
    columns,
    minColumnWidth,
    isPredefinedColumn,
    areas,
    placeContent,
  ]);

  return React.createElement(
    Component,
    {
      className: `${gridClass} ${className || ''}`.trim(),
      style: inlineStyles,
      ...props,
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
  const itemStyles = useMemo(
    (): React.CSSProperties => ({
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
    }),
    [style, area, colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd]
  );

  return (
    <div className={className} style={itemStyles}>
      {children}
    </div>
  );
};
