import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, componentSize, spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

// CSS 변수 정의 - 런타임에 Theme에서 주입됨
const defaultColorVar = createVar();
const hoverColorVar = createVar();
const activeColorVar = createVar();
const textColorVar = createVar();
const disabledColorVar = createVar();
const fontFamilyVar = createVar();
const fontWeightVar = createVar();
const borderRadiusVar = createVar();
const disabledBgColorVar = createVar();
const disabledTextColorVar = createVar();
const focusShadowColorVar = createVar();
const focusOutlineColorVar = createVar();
const ghostDefaultColorVar = createVar();
const ghostHoverColorVar = createVar();
const ghostActiveColorVar = createVar();
const ghostHoverBgColorVar = createVar();
const ghostActiveBgColorVar = createVar();

const baseButton = style({
  borderRadius: borderRadiusVar,
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.2s ease',
  gap: toRem(spacing['8']),
  textDecoration: 'none',

  boxSizing: 'border-box',
  ':disabled': {
    cursor: 'not-allowed',
  },
});

export const buttonStyle = recipe({
  base: baseButton,

  variants: {
    variant: {
      solid: {
        backgroundColor: defaultColorVar,
        color: textColorVar,
        border: 'none',

        '&:hover:not(:disabled)': {
          backgroundColor: hoverColorVar,
        },
        '&:active:not(:disabled)': {
          backgroundColor: activeColorVar,
        },
        '&:focus-visible': {
          outline: `1px solid ${color.alpha.white100}`,
          boxShadow: `0 0 0 2px ${focusOutlineColorVar}, 0 0 5px 2px ${focusShadowColorVar}`,
        },
        '&:disabled': {
          backgroundColor: disabledBgColorVar,
          color: disabledTextColorVar,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: defaultColorVar,
        border: `1px solid ${defaultColorVar}`,

        '&:hover:not(:disabled)': {
          color: hoverColorVar,
          borderColor: hoverColorVar,
        },
        '&:active:not(:disabled)': {
          color: activeColorVar,
          borderColor: activeColorVar,
        },
        '&:focus-visible': {
          outline: `1px solid ${color.alpha.white100}`,
          boxShadow: `0 0 0 2px ${focusOutlineColorVar}, 0 0 5px 2px ${focusShadowColorVar}`,
        },
        '&:disabled': {
          border: 'none',
          backgroundColor: disabledBgColorVar,
          color: disabledTextColorVar,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: ghostDefaultColorVar,
        border: 'none',

        '&:hover:not(:disabled)': {
          backgroundColor: ghostHoverBgColorVar,
          color: ghostHoverColorVar,
        },
        '&:active:not(:disabled)': {
          backgroundColor: ghostActiveBgColorVar,
          color: ghostActiveColorVar,
        },
        '&:focus-visible': {
          outline: `1px solid ${color.alpha.white100}`,
          boxShadow: `0 0 0 2px ${focusOutlineColorVar}, 0 0 5px 2px ${focusShadowColorVar}`,
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          color: disabledTextColorVar,
        },
      },
    },
    color: {
      primary: {},
      secondary: {},
      tertiary: {},
    },
    size: {
      xl: {
        height: `${toRem(componentSize.xl.height)}`,
        fontSize: `${toRem(componentSize.xl.fontSize)}`,
        padding: `0 ${toRem(spacing[32])}`,
      },
      lg: {
        height: `${toRem(componentSize.lg.height)}`,
        fontSize: `${toRem(componentSize.lg.fontSize)}`,
        padding: `0 ${toRem(spacing[24])}`,
      },
      md: {
        height: `${toRem(componentSize.md.height)}`,
        fontSize: `${toRem(componentSize.md.fontSize)}`,
        padding: `0 ${toRem(spacing[20])}`,
      },
      sm: {
        height: `${toRem(componentSize.sm.height)}`,
        fontSize: `${toRem(componentSize.sm.fontSize)}`,
        padding: `0 ${toRem(spacing[12])}`,
      },
      xs: {
        height: `${toRem(componentSize.xs.height)}`,
        fontSize: `${toRem(componentSize.xs.fontSize)}`,
        padding: `0 ${toRem(spacing[8])}`,
      },
    },
    full: {
      true: {
        width: '100%',
      },
    },
    leftIcon: {
      true: {},
    },
    rightIcon: { true: {} },
    icon: {
      true: {
        padding: 0,
        width: 'auto',
        aspectRatio: '1/1',
      },
    },
  },

  compoundVariants: [
    {
      variants: { variant: 'solid', color: 'tertiary' },
      style: {
        color: color.text.secondary,
        selectors: {
          '&:active:not(:disabled)': {
            color: color.text.primary,
          },
        },
      },
    },
    {
      variants: { variant: 'outline', color: 'tertiary' },
      style: {
        color: color.text.muted,
        borderColor: color.bg.gray,
        selectors: {
          '&:hover:not(:disabled)': {
            color: color.text.tertiary,
            borderColor: color.bg.grayStrong,
          },
          '&:active:not(:disabled)': {
            color: color.text.tertiary,
            borderColor: color.bg.grayStrongest,
          },
          '&:disabled': {
            backgroundColor: color.bg.muted,
          },
        },
      },
    },
  ],
});

export const buttonVars = {
  defaultColor: defaultColorVar,
  hoverColor: hoverColorVar,
  activeColor: activeColorVar,
  textColor: textColorVar,
  disabledColor: disabledColorVar,
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  borderRadius: borderRadiusVar,
  disabledBgColor: disabledBgColorVar,
  disabledTextColor: disabledTextColorVar,
  focusShadowColor: focusShadowColorVar,
  focusOutlineColor: focusOutlineColorVar,
  ghostDefaultColor: ghostDefaultColorVar,
  ghostHoverColor: ghostHoverColorVar,
  ghostActiveColor: ghostActiveColorVar,
  ghostHoverBgColor: ghostHoverBgColorVar,
  ghostActiveBgColor: ghostActiveBgColorVar,
};
