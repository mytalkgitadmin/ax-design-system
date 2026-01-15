import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentSize, font, toRem } from '../../tokens';

/**
 * ========================================
 * CSS 변수 정의 (Stepper 전용)
 * ========================================
 */

// Container & Input 색상
const borderColorVar = createVar();
const hoverBorderColorVar = createVar();
const focusBorderColorVar = createVar();
const focusShadowColorVar = createVar();
const bgColorVar = createVar();
const disabledBgColorVar = createVar();

// 텍스트 & 아이콘 색상
const textColorVar = createVar();
const disabledTextColorVar = createVar();
const iconColorVar = createVar();
const iconHoverColorVar = createVar();
const iconActiveColorVar = createVar();
const iconDisabledColorVar = createVar();

// 버튼 배경 색상
const buttonHoverBgColorVar = createVar();
const buttonActiveBgColorVar = createVar();
const buttonDisabledBgColorVar = createVar();

// 레이아웃
const borderRadiusVar = createVar();
const buttonBorderRadiusVar = createVar();
const fontWeightVar = createVar();

/**
 * ========================================
 * Base Styles
 * ========================================
 */

const baseWrapper = style({
  display: 'inline-flex',
  border: `1px solid ${borderColorVar}`,
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  overflow: 'hidden',
  padding: toRem(3),
  verticalAlign: 'middle',
  backgroundColor: bgColorVar,
  borderRadius: borderRadiusVar,
  selectors: {
    '&:has(input:focus-visible)': {
      borderColor: focusBorderColorVar,
      boxShadow: `0 0 10px 0 ${focusShadowColorVar}`,
    },
  },
});

const baseInput = style({
  height: '100%',
  padding: 0,
  textAlign: 'center',
  border: 'none',
  background: 'transparent',
  outline: 'none',
  color: textColorVar,
  fontFamily: font.family.Pretendard,
  fontWeight: fontWeightVar,
  appearance: 'textfield',
  '::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  ':disabled': {
    cursor: 'not-allowed',
    color: disabledTextColorVar,
  },
});

const baseButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  color: iconColorVar,
  transition: 'all 0.2s ease',
  padding: 0,
  flexShrink: 0,
  aspectRatio: '1',
  background: 'transparent',
  borderRadius: buttonBorderRadiusVar,
  ':hover': {
    color: iconHoverColorVar,
    background: buttonHoverBgColorVar,
  },
  ':active': {
    color: iconActiveColorVar,
    background: buttonActiveBgColorVar,
  },
  ':disabled': {
    cursor: 'not-allowed',
    color: iconDisabledColorVar,
    backgroundColor: buttonDisabledBgColorVar,
  },
});

/**
 * ========================================
 * Wrapper Recipe
 * ========================================
 */

export const wrapperStyle = recipe({
  base: baseWrapper,
  variants: {
    size: {
      xs: {
        height: toRem(componentSize.xs.height),
      },
      sm: {
        height: toRem(componentSize.sm.height),
      },
      md: {
        height: toRem(componentSize.md.height),
      },
      lg: {
        height: toRem(componentSize.lg.height),
      },
      xl: {
        height: toRem(componentSize.xl.height),
      },
    },
    disabled: {
      true: {
        backgroundColor: disabledBgColorVar,
        borderColor: borderColorVar,
        cursor: 'not-allowed',
        opacity: 0.6,
        selectors: {
          '&:hover': {
            borderColor: borderColorVar,
          },
          '&:has(input:focus-visible)': {
            borderColor: borderColorVar,
            boxShadow: 'none',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * ========================================
 * Input Recipe
 * ========================================
 */

export const inputStyle = recipe({
  base: baseInput,
  variants: {
    size: {
      xs: {
        fontSize: toRem(componentSize.xs.fontSize),
        width: toRem(Number(componentSize.xs.height) - 8),
      },
      sm: {
        fontSize: toRem(componentSize.sm.fontSize),
        width: toRem(Number(componentSize.sm.height) - 8),
      },
      md: {
        fontSize: toRem(componentSize.md.fontSize),
        width: toRem(Number(componentSize.md.height) - 8),
      },
      lg: {
        fontSize: toRem(componentSize.lg.fontSize),
        width: toRem(Number(componentSize.lg.height) - 8),
      },
      xl: {
        fontSize: toRem(componentSize.xl.fontSize),
        width: toRem(Number(componentSize.xl.height) - 8),
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * ========================================
 * Button Recipe
 * ========================================
 */

export const buttonStyle = recipe({
  base: baseButton,
  variants: {
    size: {
      xs: {
        height: '100%',
        fontSize: toRem(12),
      },
      sm: {
        height: '100%',
        fontSize: toRem(14),
      },
      md: {
        height: '100%',
        fontSize: toRem(16),
      },
      lg: {
        height: '100%',
        fontSize: toRem(18),
      },
      xl: {
        height: '100%',
        fontSize: toRem(20),
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * ========================================
 * CSS 변수 Export
 * ========================================
 */

export const stepperVars = {
  // Container & Input 색상
  borderColor: borderColorVar,
  hoverBorderColor: hoverBorderColorVar,
  focusBorderColor: focusBorderColorVar,
  focusShadowColor: focusShadowColorVar,
  bgColor: bgColorVar,
  disabledBgColor: disabledBgColorVar,

  // 텍스트 & 아이콘 색상
  textColor: textColorVar,
  disabledTextColor: disabledTextColorVar,
  iconColor: iconColorVar,
  iconHoverColor: iconHoverColorVar,
  iconActiveColor: iconActiveColorVar,
  iconDisabledColor: iconDisabledColorVar,

  // 버튼 배경 색상
  buttonHoverBgColor: buttonHoverBgColorVar,
  buttonActiveBgColor: buttonActiveBgColorVar,
  buttonDisabledBgColor: buttonDisabledBgColorVar,

  // 레이아웃
  borderRadius: borderRadiusVar,
  buttonBorderRadius: buttonBorderRadiusVar,
  fontWeight: fontWeightVar,
};
