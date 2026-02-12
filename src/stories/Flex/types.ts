import type React from 'react';

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
export type FlexGap = '0' | '4' | '8' | '12' | '16' | '24' | '32' | '48' | '64';
export type FlexWrap = 'wrap' | 'nowrap';

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
  '24',
  '32',
  '48',
  '64',
];
export const FLEX_WRAPS: FlexWrap[] = ['wrap', 'nowrap'];

// --------------------------------------------------
// Component Props
// --------------------------------------------------

export type FlexProps = {
  as?: FlexElement;
  direction?: FlexDirection;
  justify?: FlexJustify;
  align?: FlexAlign;
  gap?: FlexGap;
  wrap?: FlexWrap;
  flex?: React.CSSProperties['flex'];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};
