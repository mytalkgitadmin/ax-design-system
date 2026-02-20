import type { ComponentPropsWithoutRef, ElementType } from 'react';

// --------------------------------------------------
// Grid Component Types
// --------------------------------------------------

export type GridElement =
  | 'div'
  | 'section'
  | 'article'
  | 'ul'
  | 'ol'
  | 'li'
  | 'nav'
  | 'main'
  | 'aside'
  | 'header'
  | 'footer'
  | 'form';
export type GridColumns =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '12'
  | 'auto-fill'
  | 'auto-fit'
  | (string & {});
export type GridRows = '1' | '2' | '3' | '4' | '5' | '6' | 'auto';
export type GridGap = '0' | '4' | '8' | '12' | '16' | '24' | '32' | '48' | '64';
export type GridAutoFlow = 'row' | 'column' | 'row-dense' | 'column-dense';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'between'
  | 'around'
  | 'evenly';
export type GridPlaceContent =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start start'
  | 'start center'
  | 'start end'
  | 'center start'
  | 'center center'
  | 'center end'
  | 'end start'
  | 'end center'
  | 'end end';

// --------------------------------------------------
// Arrays for Storybook Options
// --------------------------------------------------

export const GRID_ELEMENTS: GridElement[] = [
  'div',
  'section',
  'article',
  'ul',
  'ol',
  'li',
  'nav',
  'main',
  'aside',
  'header',
  'footer',
  'form',
];
export const GRID_COLUMNS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '12',
  'auto-fill',
  'auto-fit',
] as const;
export const GRID_ROWS: GridRows[] = ['1', '2', '3', '4', '5', '6', 'auto'];
export const GRID_GAPS: GridGap[] = [
  '0',
  '4',
  '8',
  '12',
  '16',
  '24',
  '32',
  '48',
  '64',
];
export const GRID_AUTO_FLOWS: GridAutoFlow[] = [
  'row',
  'column',
  'row-dense',
  'column-dense',
];
export const GRID_ALIGNS: GridAlign[] = ['start', 'center', 'end', 'stretch'];
export const GRID_JUSTIFIES: GridJustify[] = [
  'start',
  'center',
  'end',
  'stretch',
  'between',
  'around',
  'evenly',
];

export const GRID_PLACE_CONTENTS: GridPlaceContent[] = [
  'start',
  'center',
  'end',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
  'center center',
  'start center',
  'end center',
  'center start',
  'center end',
];

// --------------------------------------------------
// Component Props
// --------------------------------------------------

export type GridProps<T extends ElementType = 'div'> = {
  as?: T;
  columns?: GridColumns;
  rows?: GridRows;
  gap?: GridGap;
  columnGap?: GridGap;
  rowGap?: GridGap;
  autoFlow?: GridAutoFlow;
  align?: GridAlign;
  justify?: GridJustify;
  /** place-content 속성 (align-content + justify-content의 shorthand) */
  placeContent?: GridPlaceContent;
  /** auto-fill/auto-fit 사용 시 최소 열 너비 (기본값: 200px) */
  minColumnWidth?: string | number;
  /** grid-template-areas를 위한 레이아웃 문자열 배열 */
  areas?: string[];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  | 'as'
  | 'columns'
  | 'rows'
  | 'gap'
  | 'columnGap'
  | 'rowGap'
  | 'autoFlow'
  | 'align'
  | 'justify'
  | 'placeContent'
  | 'minColumnWidth'
  | 'areas'
  | 'width'
  | 'height'
>;

// --------------------------------------------------
// GridItem Component Props
// --------------------------------------------------

export type GridItemProps = {
  /** grid-area 이름 (grid-template-areas와 함께 사용) */
  area?: string;
  /** grid-column 시작/끝 또는 span */
  colSpan?: number | string;
  /** grid-row 시작/끝 또는 span */
  rowSpan?: number | string;
  /** grid-column-start */
  colStart?: number;
  /** grid-column-end */
  colEnd?: number;
  /** grid-row-start */
  rowStart?: number;
  /** grid-row-end */
  rowEnd?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};
