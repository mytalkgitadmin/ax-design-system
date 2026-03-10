import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { CSSProperties } from 'react';

// --------------------------------------------------
// Responsive Types (from Flex)
// --------------------------------------------------

/** breakpoint 타입 */
export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

/** breakpoint별 값 지정 (반응형 props용) */
export type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

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
export type GridGap =
  | '0'
  | '4'
  | '8'
  | '12'
  | '16'
  | '20'
  | '24'
  | '32'
  | '48'
  | '64';
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
  '__responsive', // 내부 전용 — responsiveColumns prop 사용 시 활성화
] as const;
export const GRID_ROWS: GridRows[] = ['1', '2', '3', '4', '5', '6', 'auto'];
export const GRID_GAPS: GridGap[] = [
  '0',
  '4',
  '8',
  '12',
  '16',
  '20',
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
  /** grid-template-columns. 반응형 객체 사용 가능: { base: '2', md: '4' } */
  columns?: Responsive<GridColumns>;
  /** grid-template-rows. 반응형 객체 사용 가능: { base: 'auto', md: '3' } */
  rows?: Responsive<GridRows>;
  /** gap. 반응형 객체 사용 가능: { base: '16', md: '32' } */
  gap?: Responsive<GridGap>;
  /** column-gap. 반응형 객체 사용 가능 */
  columnGap?: Responsive<GridGap>;
  /** row-gap. 반응형 객체 사용 가능 */
  rowGap?: Responsive<GridGap>;
  autoFlow?: GridAutoFlow;
  align?: GridAlign;
  justify?: GridJustify;
  /** place-content 속성 (align-content + justify-content의 shorthand) */
  placeContent?: GridPlaceContent;
  /** auto-fill/auto-fit 사용 시 최소 열 너비 (기본값: 200px). 반응형 객체 사용 가능: { base: '150px', md: '250px' } */
  minColumnWidth?: Responsive<string | number>;
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

export type GridItemProps<T extends ElementType = 'div'> = {
  /** 렌더링할 HTML 요소 또는 컴포넌트 (기본값: div) */
  as?: T;
  /** grid-area 이름 (grid-template-areas와 함께 사용) */
  area?: string;
  /** grid-column 시작/끝 또는 span. 반응형 객체 사용 가능: { base: 1, md: 2 } */
  colSpan?: Responsive<number | string>;
  /** grid-row 시작/끝 또는 span. 반응형 객체 사용 가능: { base: 1, lg: 2 } */
  rowSpan?: Responsive<number | string>;
  /** grid-column-start. 반응형 객체 사용 가능 */
  colStart?: Responsive<number | string>;
  /** grid-column-end. 반응형 객체 사용 가능 */
  colEnd?: Responsive<number | string>;
  /** grid-row-start. 반응형 객체 사용 가능 */
  rowStart?: Responsive<number | string>;
  /** grid-row-end. 반응형 객체 사용 가능 */
  rowEnd?: Responsive<number | string>;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'style' | 'className' | 'children'
>;
