import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentSize, spacing, typography } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

// CSS 변수 정의 - 런타임에 Theme에서 주입됨
const fontFamilyVar = createVar();
const fontWeightVar = createVar();
const borderRadiusVar = createVar();

// 색상 변수
const primaryColorVar = createVar();
const borderDefaultVar = createVar();
const borderStrongVar = createVar();
const bgDisabledVar = createVar();
const textPrimaryVar = createVar();
const textTertiaryVar = createVar();
const textDisabledVar = createVar();
const iconDisabledVar = createVar();

// 체크박스 컨테이너
export const checkboxContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: toRem(spacing['12']),
  position: 'relative',
});

// 체크박스 input (숨김)
export const checkboxInput = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

// 체크박스 박스 스타일
const baseCheckboxBox = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: borderRadiusVar,
  border: '1px solid',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  position: 'relative',
});

export const checkboxBox = recipe({
  base: baseCheckboxBox,

  variants: {
    size: {
      lg: {
        width: toRem(componentSize.lg.iconSize),
        height: toRem(componentSize.lg.iconSize),
      },
      md: {
        width: toRem(componentSize.md.iconSize),
        height: toRem(componentSize.md.iconSize),
      },
    },
    checked: {
      true: {
        backgroundColor: primaryColorVar,
        borderColor: primaryColorVar,
      },
      false: {
        backgroundColor: 'transparent',
        borderColor: borderDefaultVar,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        backgroundColor: bgDisabledVar,
        borderColor: bgDisabledVar,
      },
      false: {},
    },
  },

  compoundVariants: [
    // hover 상태 (disabled가 아닐 때만)
    {
      variants: {
        disabled: false,
      },
      style: {
        selectors: {
          '&:hover': {
            borderColor: primaryColorVar,
          },
        },
      },
    },
    // checked + disabled
    {
      variants: {
        checked: true,
        disabled: true,
      },
      style: {
        backgroundColor: bgDisabledVar,
        borderColor: bgDisabledVar,
      },
    },
  ],
});

// 체크 아이콘
export const checkIcon = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
  },

  variants: {
    checked: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
    disabled: {
      true: {
        color: iconDisabledVar,
      },
      false: {
        color: '#ffffff',
      },
    },
  },
});

// SVG 체크 아이콘
export const checkSvg = style({
  width: '60%',
  height: '60%',
  fill: 'currentColor',
});

// 텍스트 컨테이너
export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: toRem(spacing['4']),
  flex: 1,
});

// 레이블 스타일
export const label = recipe({
  base: {
    fontFamily: fontFamilyVar,
    fontWeight: fontWeightVar,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },

  variants: {
    size: {
      lg: {
        fontSize: toRem(componentSize.lg.fontSize),
        lineHeight: 1.5,
      },
      md: {
        fontSize: toRem(componentSize.md.fontSize),
        lineHeight: 1.4,
        letterSpacing: '0.14px',
      },
    },
    disabled: {
      true: {
        color: textDisabledVar,
        cursor: 'not-allowed',
      },
      false: {
        color: textPrimaryVar,
      },
    },
  },
});

// 도움말 텍스트
export const helpText = recipe({
  base: {
    fontFamily: fontFamilyVar,
    fontSize: toRem(typography.fontSize[13]),
    lineHeight: 1.4,
    fontWeight: 400,
  },

  variants: {
    disabled: {
      true: {
        color: textDisabledVar,
      },
      false: {
        color: textTertiaryVar,
      },
    },
  },
});

// vars 객체 export
export const checkboxVars = {
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  borderRadius: borderRadiusVar,
  primaryColor: primaryColorVar,
  borderDefault: borderDefaultVar,
  borderStrong: borderStrongVar,
  bgDisabled: bgDisabledVar,
  textPrimary: textPrimaryVar,
  textTertiary: textTertiaryVar,
  textDisabled: textDisabledVar,
  iconDisabled: iconDisabledVar,
};
