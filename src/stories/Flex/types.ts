import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react';

// --------------------------------------------------
// Flex Component Types
// --------------------------------------------------

export type FlexElement =
  | 'div'
  | 'section'
  | 'article'
  | 'span'
  | 'header'
  | 'footer'
  | 'nav'
  | 'main'
  | 'aside'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ul'
  | 'ol'
  | 'li'
  | 'form'
  | 'label';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexGap =
  | '0'
  | '4'
  | '8'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '48'
  | '64';
export type FlexWrap = 'wrap' | 'nowrap';

// --------------------------------------------------
// Responsive Types
// --------------------------------------------------

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl';

/** breakpoint별 값 지정 (반응형 props용) */
export type Responsive<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };

// --------------------------------------------------
// Arrays for Storybook Options
// --------------------------------------------------

export const FLEX_ELEMENTS: FlexElement[] = [
  'div',
  'section',
  'article',
  'span',
  'header',
  'footer',
  'nav',
  'main',
  'aside',
  'ul',
  'ol',
  'li',
  'form',
  'label',
];
export const FLEX_DIRECTIONS: FlexDirection[] = [
  'row',
  'column',
  'row-reverse',
  'column-reverse',
];
export const FLEX_JUSTIFIES: FlexJustify[] = [
  'start',
  'center',
  'end',
  'between',
  'around',
  'evenly',
];
export const FLEX_ALIGNS: FlexAlign[] = ['start', 'center', 'end', 'stretch'];
export const FLEX_GAPS: FlexGap[] = [
  '0',
  '4',
  '8',
  '12',
  '16',
  '20',
  '24',
  '28',
  '32',
  '48',
  '64',
];
export const FLEX_WRAPS: FlexWrap[] = ['wrap', 'nowrap'];

// --------------------------------------------------
// Component Props
// --------------------------------------------------

export type FlexProps<T extends ElementType = 'div'> = {
  as?: T;
  /** flex-direction. 반응형 객체 사용 가능: { base: 'column', md: 'row' } */
  direction?: Responsive<FlexDirection>;
  justify?: FlexJustify;
  align?: FlexAlign;
  /** gap. 반응형 객체 사용 가능: { base: '16', md: '32' } */
  gap?: Responsive<FlexGap>;
  wrap?: FlexWrap;
  flex?: CSSProperties['flex'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  | 'as'
  | 'direction'
  | 'justify'
  | 'align'
  | 'gap'
  | 'wrap'
  | 'flex'
  | 'width'
  | 'height'
>;
