import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, componentSize, font, spacing, toRem } from '../../tokens';

// CSS 변수 정의
const textColorVar = createVar();
const borderColorVar = createVar();
const bgColorVar = createVar();
const focusShadowColorVar = createVar(); // focus 시 그림자 색상
const focusOutlineColorVar = createVar(); // focus 시 outline 색상
const fontFamilyVar = createVar(); // fontFamily

// Accordion 컨테이너
export const accordionContainer = style({
  backgroundColor: bgColorVar,
  transition: 'border-color 0.2s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      borderColor: color.divider.default,
    },
  },
});

// Accordion 아이템
export const accordionItem = style({
  borderBottom: `1px solid ${color.divider.soft}`,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
});

// Header 기본 스타일
const baseHeader = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  color: textColorVar,
  fontFamily: fontFamilyVar,
  transition: 'all 0.2s ease',
  padding: 0,
  textAlign: 'left',
  boxSizing: 'border-box',

  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: color.bg.subtle,
      borderColor: color.divider.default,
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 1px ${focusOutlineColorVar}, 0 0 5px 1px ${focusShadowColorVar}`,
      borderRadius: spacing[4],
      position: 'relative',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

// Header Recipe
export const accordionHeader = recipe({
  base: baseHeader,

  variants: {
    size: {
      sm: {
        height: toRem(componentSize.sm.height),
        fontSize: toRem(componentSize.sm.fontSize),
        gap: spacing[8],
        padding: '0 0.5em',
      },
      md: {
        height: toRem(componentSize.md.height),
        fontSize: toRem(componentSize.md.fontSize),
        gap: spacing[8],
        padding: '0 0.5em',
      },
      lg: {
        height: toRem(componentSize.lg.height),
        fontSize: toRem(componentSize.lg.fontSize),
        gap: spacing[12],
        padding: '0 0.5em',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

// 왼쪽 아이콘 영역
export const leftIconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

// 텍스트 영역
export const textArea = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: spacing[32],
  minWidth: 0, // text overflow 방지
});

// 카테고리
export const category = style({
  color: color.text.primary,
  fontWeight: font.weight.semibold,
});

// 타이틀
export const title = style({
  color: textColorVar,
  fontWeight: font.weight.regular,
});

// 오른쪽 chevron 영역
export const chevronWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  transition: 'transform 0.2s ease',
});

export const chevronExpanded = style({
  transform: 'rotate(180deg)',
});

// Content 영역
const baseContent = style({
  overflow: 'hidden',
  transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
  color: textColorVar,
  fontFamily: fontFamilyVar,
});

export const accordionContent = recipe({
  base: baseContent,

  variants: {
    size: {
      sm: {
        fontSize: toRem(componentSize.sm.fontSize),
      },
      md: {
        fontSize: toRem(componentSize.md.fontSize),
      },
      lg: {
        fontSize: toRem(componentSize.lg.fontSize),
      },
    },
    expanded: {
      true: {
        opacity: 1,
        padding: `1em`,
        borderTop: `1px solid ${color.divider.soft}`,
      },
      false: {
        maxHeight: 0,
        padding: `0 1em`,
        opacity: 0,
      },
    },
  },

  defaultVariants: {
    size: 'md',
    expanded: false,
  },
});

// vars 객체 export
export const accordionVars = {
  textColor: textColorVar,
  borderColor: borderColorVar,
  bgColor: bgColorVar,
  focusShadowColor: focusShadowColorVar,
  focusOutlineColor: focusOutlineColorVar,
  fontFamily: fontFamilyVar,
};
