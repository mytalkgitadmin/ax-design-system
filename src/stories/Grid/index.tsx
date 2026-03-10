import React, { ElementType, useMemo } from 'react';

import { GRID_COLUMNS } from './types';

import type {
  Breakpoint,
  GridColumns,
  GridGap,
  GridItemProps,
  GridProps,
  GridRows,
  Responsive,
} from './types';

import {
  autoFillMinWidthResponsiveStyle,
  autoFitMinWidthResponsiveStyle,
  gridItemStyle,
  gridStyle,
} from './Grid.css';

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
function resolveColumns(
  col: GridColumns,
  breakpoint: Breakpoint = 'base'
): string {
  if (col === 'auto-fill' || col === 'auto-fit') {
    const minWidthVar =
      breakpoint === 'base'
        ? 'var(--_gmw-base, 200px)'
        : `var(--_gmw-${breakpoint}, var(--_gmw-base, 200px))`;
    return `repeat(${col}, minmax(${minWidthVar}, 1fr))`;
  }
  if ((GRID_COLUMNS as readonly string[]).includes(col)) {
    return `repeat(${col}, 1fr)`;
  }
  return col; // '3fr 1fr' 같은 커스텀 값 그대로
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
      ? {
          '--_gc-base': resolveColumns(
            (columns as Record<string, GridColumns>).base,
            'base'
          ),
          '--_gc-sm': resolveColumns(
            (columns as Record<string, GridColumns>).sm,
            'sm'
          ),
          '--_gc-md': resolveColumns(
            (columns as Record<string, GridColumns>).md,
            'md'
          ),
          '--_gc-lg': resolveColumns(
            (columns as Record<string, GridColumns>).lg,
            'lg'
          ),
          '--_gc-xl': resolveColumns(
            (columns as Record<string, GridColumns>).xl,
            'xl'
          ),
        }
      : {};

    // 반응형 rows CSS 변수 주입 (--_gr-*)
    const responsiveRowsVars = isResponsiveRows
      ? generateResponsiveVars(rows, '--_gr', resolveRows)
      : {};

    // 반응형 gap CSS 변수 주입 (--_gg-*)
    const responsiveGapVars = isResponsiveGap
      ? generateResponsiveVars(gap, '--_gg', (val) => GRID_GAP_VALUES[val])
      : {};

    // 반응형 columnGap CSS 변수 주입 (--_gcg-*)
    const responsiveColumnGapVars = isResponsiveColumnGap
      ? generateResponsiveVars(
          columnGap,
          '--_gcg',
          (val) => GRID_GAP_VALUES[val]
        )
      : {};

    // 반응형 rowGap CSS 변수 주입 (--_grg-*)
    const responsiveRowGapVars = isResponsiveRowGap
      ? generateResponsiveVars(rowGap, '--_grg', (val) => GRID_GAP_VALUES[val])
      : {};

    // 기존 columns prop 처리 (auto-fill/auto-fit + 커스텀 값)
    let gridTemplateColumns: string | undefined;
    if (!isResponsiveColumns) {
      const col = columns as GridColumns | undefined;
      if (col === 'auto-fill' || col === 'auto-fit') {
        // 반응형 minColumnWidth는 CSS class로 처리 (inline style은 미디어 쿼리 불가)
        if (!isResponsiveMinWidth) {
          const minWidth = resolveMinWidth(minColumnWidth as string | number);
          gridTemplateColumns = `repeat(${col}, minmax(${minWidth}, 1fr))`;
        }
        // isResponsiveMinWidth인 경우 autoFill/FitMinWidthResponsiveStyle 클래스가 담당
      } else if (col && !isPredefinedColumn) {
        gridTemplateColumns = col;
      }
    } else {
      // 반응형 columns + auto-fill/fit 처리는 복잡하므로 커스텀 문자열 사용 권장
      // 필요시 미디어 쿼리에서 직접 처리
    }

    // 반응형 minColumnWidth CSS 변수 주입 (--_gmw-base, --_gmw-sm, ...)
    // responsive columns에 auto-fill/auto-fit이 포함된 경우 정적 minColumnWidth도 --_gmw-base에 주입
    const responsiveColumnsHasAutoFill =
      isResponsiveColumns &&
      Object.values(columns as Record<string, GridColumns>).some(
        (v) => v === 'auto-fill' || v === 'auto-fit'
      );
    const responsiveMinWidthVars = isResponsiveMinWidth
      ? generateResponsiveVars(minColumnWidth, '--_gmw', resolveMinWidth)
      : responsiveColumnsHasAutoFill
        ? ({
            '--_gmw-base': resolveMinWidth(minColumnWidth as string | number),
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

  // auto-fill/auto-fit + 반응형 minColumnWidth 조합 시 별도 CSS class 추가
  const col = !isResponsiveColumns
    ? (columns as GridColumns | undefined)
    : undefined;
  const responsiveMinWidthClass =
    isResponsiveMinWidth && (col === 'auto-fill' || col === 'auto-fit')
      ? col === 'auto-fill'
        ? autoFillMinWidthResponsiveStyle
        : autoFitMinWidthResponsiveStyle
      : '';

  return React.createElement(
    Component,
    {
      className: [gridClass, responsiveMinWidthClass, className]
        .filter(Boolean)
        .join(' '),
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
  const isResponsiveColStart =
    colStart !== undefined && isResponsiveObject(colStart);
  const isResponsiveColEnd = colEnd !== undefined && isResponsiveObject(colEnd);
  const isResponsiveRowStart =
    rowStart !== undefined && isResponsiveObject(rowStart);
  const isResponsiveRowEnd = rowEnd !== undefined && isResponsiveObject(rowEnd);

  const gridItemClass = gridItemStyle({
    colSpan: isResponsiveColSpan ? '__responsive' : undefined,
    rowSpan: isResponsiveRowSpan ? '__responsive' : undefined,
    colStart: isResponsiveColStart ? '__responsive' : undefined,
    colEnd: isResponsiveColEnd ? '__responsive' : undefined,
    rowStart: isResponsiveRowStart ? '__responsive' : undefined,
    rowEnd: isResponsiveRowEnd ? '__responsive' : undefined,
  });

  const itemStyles = useMemo((): React.CSSProperties => {
    // 반응형 colSpan CSS 변수 주입 (--_gic-*)
    const responsiveColSpanVars = isResponsiveColSpan
      ? generateResponsiveVars(colSpan, '--_gic', resolveSpan)
      : {};

    // 반응형 rowSpan CSS 변수 주입 (--_gir-*)
    const responsiveRowSpanVars = isResponsiveRowSpan
      ? generateResponsiveVars(rowSpan, '--_gir', resolveSpan)
      : {};

    // 반응형 colStart CSS 변수 주입 (--_gics-*)
    const responsiveColStartVars = isResponsiveColStart
      ? generateResponsiveVars(colStart, '--_gics', String)
      : {};

    // 반응형 colEnd CSS 변수 주입 (--_gice-*)
    const responsiveColEndVars = isResponsiveColEnd
      ? generateResponsiveVars(colEnd, '--_gice', String)
      : {};

    // 반응형 rowStart CSS 변수 주입 (--_girs-*)
    const responsiveRowStartVars = isResponsiveRowStart
      ? generateResponsiveVars(rowStart, '--_girs', String)
      : {};

    // 반응형 rowEnd CSS 변수 주입 (--_gire-*)
    const responsiveRowEndVars = isResponsiveRowEnd
      ? generateResponsiveVars(rowEnd, '--_gire', String)
      : {};

    let gridColumn: string | undefined;
    if (!isResponsiveColSpan && colSpan) {
      gridColumn = resolveSpan(colSpan as number | string);
    }

    let gridRow: string | undefined;
    if (!isResponsiveRowSpan && rowSpan) {
      gridRow = resolveSpan(rowSpan as number | string);
    }

    let gridColumnStart: string | number | undefined;
    if (!isResponsiveColStart && colStart) {
      gridColumnStart = colStart as string | number;
    }

    let gridColumnEnd: string | number | undefined;
    if (!isResponsiveColEnd && colEnd) {
      gridColumnEnd = colEnd as string | number;
    }

    let gridRowStart: string | number | undefined;
    if (!isResponsiveRowStart && rowStart) {
      gridRowStart = rowStart as string | number;
    }

    let gridRowEnd: string | number | undefined;
    if (!isResponsiveRowEnd && rowEnd) {
      gridRowEnd = rowEnd as string | number;
    }

    return {
      ...responsiveColSpanVars,
      ...responsiveRowSpanVars,
      ...responsiveColStartVars,
      ...responsiveColEndVars,
      ...responsiveRowStartVars,
      ...responsiveRowEndVars,
      ...style,
      ...(area && { gridArea: area }),
      ...(gridColumn && { gridColumn }),
      ...(gridRow && { gridRow }),
      ...(gridColumnStart && { gridColumnStart }),
      ...(gridColumnEnd && { gridColumnEnd }),
      ...(gridRowStart && { gridRowStart }),
      ...(gridRowEnd && { gridRowEnd }),
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
    isResponsiveColStart,
    isResponsiveColEnd,
    isResponsiveRowStart,
    isResponsiveRowEnd,
  ]);

  return React.createElement(
    Component,
    {
      className: `${gridItemClass} ${className || ''}`.trim(),
      style: itemStyles,
      ...props,
    },
    children
  );
};

// span 값 → CSS grid-column/row 문자열 변환
function resolveSpan(span: number | string): string {
  return typeof span === 'number' ? `span ${span}` : span;
}

// 반응형 객체 → CSS 변수 객체 변환 헬퍼
function generateResponsiveVars<T>(
  data: Responsive<T>,
  prefix: string,
  resolver: (val: T) => string | number
): React.CSSProperties {
  if (!isResponsiveObject(data)) return {};
  const obj = data as Record<string, T>;
  return {
    ...(obj.base !== undefined && { [`${prefix}-base`]: resolver(obj.base) }),
    ...(obj.sm !== undefined && { [`${prefix}-sm`]: resolver(obj.sm) }),
    ...(obj.md !== undefined && { [`${prefix}-md`]: resolver(obj.md) }),
    ...(obj.lg !== undefined && { [`${prefix}-lg`]: resolver(obj.lg) }),
    ...(obj.xl !== undefined && { [`${prefix}-xl`]: resolver(obj.xl) }),
  } as React.CSSProperties;
}
