import React, { ElementType, useMemo } from 'react';

import { GRID_COLUMNS } from './types';

import type {
  GridColumns,
  GridGap,
  GridItemProps,
  GridProps,
  GridRows,
  Responsive,
} from './types';

import { gridStyle } from './Grid.css';

export type { GridItemProps, GridProps };

const GRID_GAP_VALUES: Record<GridGap, string> = {
  '0': '0px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '16': '16px',
  '20': '20px',
  '24': '24px',
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

// GridColumns 값 → CSS grid-template-columns 문자열 변환
function resolveColumns(col: GridColumns): string {
  if ((GRID_COLUMNS as readonly string[]).includes(col)) {
    return `repeat(${col}, 1fr)`;
  }
  return col; // '3fr 1fr', 'auto-fill' 같은 커스텀 값 그대로
}

// GridRows 값 → CSS grid-template-rows 문자열 변환
function resolveRows(row: GridRows): string {
  if (row === 'auto') return 'auto';
  return `repeat(${row}, 1fr)`;
}

// minColumnWidth 값 → 문자열 변환
function resolveMinWidth(width: string | number): string {
  return typeof width === 'number' ? `${width}px` : width;
}

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

  const isResponsiveColumns =
    columns !== undefined && isResponsiveObject(columns);
  const isResponsiveRows = rows !== undefined && isResponsiveObject(rows);
  const isResponsiveGap = gap !== undefined && isResponsiveObject(gap);
  const isResponsiveColumnGap =
    columnGap !== undefined && isResponsiveObject(columnGap);
  const isResponsiveRowGap = rowGap !== undefined && isResponsiveObject(rowGap);
  const isResponsiveMinWidth =
    minColumnWidth !== undefined && isResponsiveObject(minColumnWidth);

  // columns가 predefined 숫자인지 확인
  const isPredefinedColumn =
    columns &&
    !isResponsiveColumns &&
    (GRID_COLUMNS as readonly string[]).includes(columns as string);

  const gridClass = gridStyle({
    // 반응형 columns 사용 시 __responsive 내부 variant 활성화
    columns: isResponsiveColumns
      ? '__responsive'
      : isPredefinedColumn
        ? (columns as (typeof GRID_COLUMNS)[number])
        : undefined,
    rows: isResponsiveRows
      ? '__responsive'
      : rows
        ? (rows as GridRows)
        : undefined,
    gap: isResponsiveGap
      ? '__responsive'
      : !isResponsiveGap && gap
        ? (gap as GridGap)
        : undefined,
    columnGap: isResponsiveColumnGap
      ? '__responsive'
      : !isResponsiveColumnGap && columnGap
        ? (columnGap as GridGap)
        : undefined,
    rowGap: isResponsiveRowGap
      ? '__responsive'
      : !isResponsiveRowGap && rowGap
        ? (rowGap as GridGap)
        : undefined,
    autoFlow,
    align,
    justify,
  });

  const inlineStyles = useMemo((): React.CSSProperties => {
    // 반응형 columns CSS 변수 주입 (--_gc-*)
    const responsiveColumnsVars = isResponsiveColumns
      ? ({
          ...((columns as Record<string, GridColumns>).base && {
            '--_gc-base': resolveColumns(
              (columns as Record<string, GridColumns>).base
            ),
          }),
          ...((columns as Record<string, GridColumns>).sm && {
            '--_gc-sm': resolveColumns(
              (columns as Record<string, GridColumns>).sm
            ),
          }),
          ...((columns as Record<string, GridColumns>).md && {
            '--_gc-md': resolveColumns(
              (columns as Record<string, GridColumns>).md
            ),
          }),
          ...((columns as Record<string, GridColumns>).lg && {
            '--_gc-lg': resolveColumns(
              (columns as Record<string, GridColumns>).lg
            ),
          }),
          ...((columns as Record<string, GridColumns>).xl && {
            '--_gc-xl': resolveColumns(
              (columns as Record<string, GridColumns>).xl
            ),
          }),
        } as React.CSSProperties)
      : {};

    // 반응형 rows CSS 변수 주입 (--_gr-*)
    const responsiveRowsVars = isResponsiveRows
      ? ({
          ...((rows as Record<string, GridRows>).base && {
            '--_gr-base': resolveRows((rows as Record<string, GridRows>).base),
          }),
          ...((rows as Record<string, GridRows>).sm && {
            '--_gr-sm': resolveRows((rows as Record<string, GridRows>).sm),
          }),
          ...((rows as Record<string, GridRows>).md && {
            '--_gr-md': resolveRows((rows as Record<string, GridRows>).md),
          }),
          ...((rows as Record<string, GridRows>).lg && {
            '--_gr-lg': resolveRows((rows as Record<string, GridRows>).lg),
          }),
          ...((rows as Record<string, GridRows>).xl && {
            '--_gr-xl': resolveRows((rows as Record<string, GridRows>).xl),
          }),
        } as React.CSSProperties)
      : {};

    // 반응형 gap CSS 변수 주입 (--_gg-*)
    const responsiveGapVars = isResponsiveGap
      ? ({
          ...((gap as Record<string, GridGap>).base && {
            '--_gg-base':
              GRID_GAP_VALUES[(gap as Record<string, GridGap>).base],
          }),
          ...((gap as Record<string, GridGap>).sm && {
            '--_gg-sm': GRID_GAP_VALUES[(gap as Record<string, GridGap>).sm],
          }),
          ...((gap as Record<string, GridGap>).md && {
            '--_gg-md': GRID_GAP_VALUES[(gap as Record<string, GridGap>).md],
          }),
          ...((gap as Record<string, GridGap>).lg && {
            '--_gg-lg': GRID_GAP_VALUES[(gap as Record<string, GridGap>).lg],
          }),
          ...((gap as Record<string, GridGap>).xl && {
            '--_gg-xl': GRID_GAP_VALUES[(gap as Record<string, GridGap>).xl],
          }),
        } as React.CSSProperties)
      : {};

    // 반응형 columnGap CSS 변수 주입 (--_gcg-*)
    const responsiveColumnGapVars = isResponsiveColumnGap
      ? ({
          ...((columnGap as Record<string, GridGap>).base && {
            '--_gcg-base':
              GRID_GAP_VALUES[(columnGap as Record<string, GridGap>).base],
          }),
          ...((columnGap as Record<string, GridGap>).sm && {
            '--_gcg-sm':
              GRID_GAP_VALUES[(columnGap as Record<string, GridGap>).sm],
          }),
          ...((columnGap as Record<string, GridGap>).md && {
            '--_gcg-md':
              GRID_GAP_VALUES[(columnGap as Record<string, GridGap>).md],
          }),
          ...((columnGap as Record<string, GridGap>).lg && {
            '--_gcg-lg':
              GRID_GAP_VALUES[(columnGap as Record<string, GridGap>).lg],
          }),
          ...((columnGap as Record<string, GridGap>).xl && {
            '--_gcg-xl':
              GRID_GAP_VALUES[(columnGap as Record<string, GridGap>).xl],
          }),
        } as React.CSSProperties)
      : {};

    // 반응형 rowGap CSS 변수 주입 (--_grg-*)
    const responsiveRowGapVars = isResponsiveRowGap
      ? ({
          ...((rowGap as Record<string, GridGap>).base && {
            '--_grg-base':
              GRID_GAP_VALUES[(rowGap as Record<string, GridGap>).base],
          }),
          ...((rowGap as Record<string, GridGap>).sm && {
            '--_grg-sm':
              GRID_GAP_VALUES[(rowGap as Record<string, GridGap>).sm],
          }),
          ...((rowGap as Record<string, GridGap>).md && {
            '--_grg-md':
              GRID_GAP_VALUES[(rowGap as Record<string, GridGap>).md],
          }),
          ...((rowGap as Record<string, GridGap>).lg && {
            '--_grg-lg':
              GRID_GAP_VALUES[(rowGap as Record<string, GridGap>).lg],
          }),
          ...((rowGap as Record<string, GridGap>).xl && {
            '--_grg-xl':
              GRID_GAP_VALUES[(rowGap as Record<string, GridGap>).xl],
          }),
        } as React.CSSProperties)
      : {};

    // 기존 columns prop 처리 (auto-fill/auto-fit + 커스텀 값)
    let gridTemplateColumns: string | undefined;
    if (!isResponsiveColumns) {
      const col = columns as GridColumns | undefined;
      if (col === 'auto-fill' || col === 'auto-fit') {
        // 반응형 minColumnWidth 처리
        if (isResponsiveMinWidth) {
          // CSS 변수로 처리
          gridTemplateColumns = `repeat(${col}, minmax(var(--_gmw, 200px), 1fr))`;
        } else {
          const minWidth = resolveMinWidth(minColumnWidth as string | number);
          gridTemplateColumns = `repeat(${col}, minmax(${minWidth}, 1fr))`;
        }
      } else if (col && !isPredefinedColumn) {
        gridTemplateColumns = col;
      }
    } else {
      // 반응형 columns + auto-fill/fit 처리는 복잡하므로 커스텀 문자열 사용 권장
      // 필요시 미디어 쿼리에서 직접 처리
    }

    // 반응형 minColumnWidth CSS 변수 주입 (--_gmw)
    const responsiveMinWidthVars = isResponsiveMinWidth
      ? ({
          ...((minColumnWidth as Record<string, string | number>).base && {
            '--_gmw': resolveMinWidth(
              (minColumnWidth as Record<string, string | number>).base
            ),
          }),
        } as React.CSSProperties)
      : {};

    // grid-template-areas 처리
    const gridTemplateAreas = areas
      ? areas.map((row) => `"${row}"`).join(' ')
      : undefined;

    return {
      ...responsiveColumnsVars,
      ...responsiveRowsVars,
      ...responsiveGapVars,
      ...responsiveColumnGapVars,
      ...responsiveRowGapVars,
      ...responsiveMinWidthVars,
      ...style,
      ...(width !== undefined && { width }),
      ...(height !== undefined && { height }),
      ...(gridTemplateColumns && { gridTemplateColumns }),
      ...(gridTemplateAreas && { gridTemplateAreas }),
      ...(placeContent && { placeContent }),
    };
  }, [
    columns,
    rows,
    gap,
    columnGap,
    rowGap,
    minColumnWidth,
    isPredefinedColumn,
    areas,
    placeContent,
    style,
    width,
    height,
    isResponsiveColumns,
    isResponsiveRows,
    isResponsiveGap,
    isResponsiveColumnGap,
    isResponsiveRowGap,
    isResponsiveMinWidth,
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
export const GridItem = <T extends React.ElementType = 'div'>({
  as,
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
  ...props
}: GridItemProps<T>) => {
  const Component = as || 'div';

  const isResponsiveColSpan =
    colSpan !== undefined && isResponsiveObject(colSpan);
  const isResponsiveRowSpan =
    rowSpan !== undefined && isResponsiveObject(rowSpan);

  const itemStyles = useMemo((): React.CSSProperties => {
    // 반응형 colSpan/rowSpan은 inline style의 한계로 base 값만 적용
    // TODO: 완전한 반응형을 위해서는 CSS 클래스 또는 useMediaQuery hook 필요

    let gridColumn: string | undefined;
    if (isResponsiveColSpan) {
      const colSpanObj = colSpan as Record<string, number | string>;
      if (colSpanObj.base) {
        gridColumn =
          typeof colSpanObj.base === 'number'
            ? `span ${colSpanObj.base}`
            : colSpanObj.base;
      }
    } else if (colSpan) {
      gridColumn = typeof colSpan === 'number' ? `span ${colSpan}` : colSpan;
    }

    let gridRow: string | undefined;
    if (isResponsiveRowSpan) {
      const rowSpanObj = rowSpan as Record<string, number | string>;
      if (rowSpanObj.base) {
        gridRow =
          typeof rowSpanObj.base === 'number'
            ? `span ${rowSpanObj.base}`
            : rowSpanObj.base;
      }
    } else if (rowSpan) {
      gridRow = typeof rowSpan === 'number' ? `span ${rowSpan}` : rowSpan;
    }

    return {
      ...style,
      ...(area && { gridArea: area }),
      ...(gridColumn && { gridColumn }),
      ...(gridRow && { gridRow }),
      ...(colStart && { gridColumnStart: colStart }),
      ...(colEnd && { gridColumnEnd: colEnd }),
      ...(rowStart && { gridRowStart: rowStart }),
      ...(rowEnd && { gridRowEnd: rowEnd }),
    };
  }, [
    style,
    area,
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    isResponsiveColSpan,
    isResponsiveRowSpan,
  ]);

  return React.createElement(
    Component,
    { className, style: itemStyles, ...props },
    children
  );
};
