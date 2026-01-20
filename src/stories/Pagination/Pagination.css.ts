import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, componentSize, spacing, toRem } from '../../tokens';

// CSS 변수 정의 - 런타임에 Theme에서 주입됨
const defaultColorVar = createVar();
const hoverColorVar = createVar();
const hoverBgColorVar = createVar(); // Hover 배경색 (테마별)
const activeColorVar = createVar();
const textColorVar = createVar();
const activeBgColorVar = createVar();
const activeTextColorVar = createVar();
const disabledColorVar = createVar();
const disabledBgColorVar = createVar();
const borderRadiusVar = createVar(); // 테마별 border-radius

// Container 스타일
export const paginationContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[4],
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

// 기본 아이템 스타일
const baseItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  border: `1px solid ${color.border.default}`,
  transition: 'all 0.2s ease',
  fontWeight: 400,
  backgroundColor: color.base.white,
  color: textColorVar,
  boxSizing: 'border-box',
  userSelect: 'none',
  textDecoration: 'none', // For anchor tags

  selectors: {
    '&:hover:not(:disabled):not([aria-disabled="true"])': {
      backgroundColor: hoverBgColorVar, // 테마별 hover 배경색 (primary: brand.soft, secondary: gray)
      borderColor: hoverColorVar,
      color: hoverColorVar,
    },

    '&:disabled, &[aria-disabled="true"]': {
      cursor: 'not-allowed',
      backgroundColor: disabledBgColorVar,
      borderColor: color.border.disabled,
      color: disabledColorVar,
    },
  },
});

// Pagination Item Recipe
export const paginationItemStyle = recipe({
  base: baseItem,

  variants: {
    size: {
      sm: {
        height: toRem(36), // Mobile size
        minWidth: toRem(36),
        fontSize: toRem(componentSize.sm.fontSize),
        borderRadius: borderRadiusVar, // 테마별 radius
        padding: `0 ${spacing[8]}`,
      },
      md: {
        height: toRem(40), // PC size (default)
        minWidth: toRem(40),
        fontSize: toRem(componentSize.md.fontSize),
        borderRadius: borderRadiusVar, // 테마별 radius
        padding: `0 ${spacing[12]}`,
      },
    },

    color: {
      primary: {},
      secondary: {},
      tertiary: {},
    },

    isActive: {
      true: {
        backgroundColor: activeBgColorVar,
        borderColor: activeBgColorVar,
        color: activeTextColorVar,
        fontWeight: 600,
        cursor: 'default',
        pointerEvents: 'none', // Disable clicking on active page

        ':hover:not(:disabled)': {
          backgroundColor: activeBgColorVar,
          borderColor: activeBgColorVar,
          color: activeTextColorVar,
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
    isActive: false,
  },
});

// Navigation Button (Previous/Next) Recipe
export const paginationNavStyle = recipe({
  base: baseItem,

  variants: {
    size: {
      sm: {
        height: toRem(36), // Mobile size
        width: toRem(36),
        fontSize: toRem(componentSize.sm.fontSize),
        borderRadius: borderRadiusVar, // 테마별 radius
      },
      md: {
        height: toRem(40), // PC size (default)
        width: toRem(40),
        fontSize: toRem(componentSize.md.fontSize),
        borderRadius: borderRadiusVar, // 테마별 radius
      },
    },

    color: {
      primary: {},
      secondary: {},
      tertiary: {},
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

// Ellipsis 스타일
export const paginationEllipsisStyle = recipe({
  base: style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: color.text.muted,
    fontWeight: 400,
    cursor: 'default',
    userSelect: 'none',
  }),

  variants: {
    size: {
      sm: {
        height: toRem(36), // Mobile size
        minWidth: toRem(36),
        fontSize: toRem(componentSize.sm.fontSize),
      },
      md: {
        height: toRem(40), // PC size (default)
        minWidth: toRem(40),
        fontSize: toRem(componentSize.md.fontSize),
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

// CSS 변수 export
export const paginationVars = {
  defaultColor: defaultColorVar,
  hoverColor: hoverColorVar,
  hoverBgColor: hoverBgColorVar, // Hover 배경색
  activeColor: activeColorVar,
  textColor: textColorVar,
  activeBgColor: activeBgColorVar,
  activeTextColor: activeTextColorVar,
  disabledColor: disabledColorVar,
  disabledBgColor: disabledBgColorVar,
  borderRadius: borderRadiusVar, // 테마별 border-radius
};
