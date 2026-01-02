import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, number, spacing, typography } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

// CSS 변수 정의 - 런타임에 Theme에서 주입됨
const fontFamilyVar = createVar();
const fontWeightVar = createVar();

// 색상 변수
const primaryColorVar = createVar();
const focusShadowColorVar = createVar(); // focus 시 그림자 색상
const focusOutlineColorVar = createVar(); // focus 시 그림자 색상
const borderDefaultVar = createVar();
const borderStrongVar = createVar();
const bgDisabledVar = createVar();
const textPrimaryVar = createVar();
const textTertiaryVar = createVar();
const textDisabledVar = createVar();
const iconDisabledVar = createVar();

// 라디오 컨테이너
const baseRadioContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: toRem(spacing[12]),
  position: 'relative',
  cursor: 'pointer',
});

export const radioContainer = recipe({
  base: baseRadioContainer,

  variants: {
    labelPlacement: {
      start: {
        flexDirection: 'row',
      },
      end: {
        flexDirection: 'row-reverse',
      },
    },
  },

  defaultVariants: {
    labelPlacement: 'start',
  },
});

// 라디오 input (숨김)
export const radioInput = style({
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

// 라디오 박스 스타일 (원형)
const baseRadioBox = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '50%', // 원형으로 만들기
  border: '1px solid',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  position: 'relative',
});

export const radioBox = recipe({
  base: baseRadioBox,

  variants: {
    size: {
      lg: {
        width: toRem(number[24]),
        height: toRem(number[24]),
      },
      md: {
        width: toRem(number[20]),
        height: toRem(number[20]),
      },
    },
    checked: {
      true: {
        borderColor: primaryColorVar,
        backgroundColor: primaryColorVar,
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
          [`${baseRadioContainer}:hover &`]: {
            borderColor: primaryColorVar,
          },
          [`${radioInput}:focus-visible + &`]: {
            borderColor: primaryColorVar,
            outline: `1px solid ${color.alpha.white100}`,
            boxShadow: `0 0 0 2px ${focusOutlineColorVar}, 0 0 5px 2px ${focusShadowColorVar}`,
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

// 라디오 내부 점 (dot)
export const radioDot = recipe({
  base: {
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    opacity: 0,
    transform: 'scale(0)',
  },

  variants: {
    size: {
      lg: {
        width: toRem(number[8]),
        height: toRem(number[8]),
      },
      md: {
        width: toRem(6), // 토큰에 6이 없어서 하드코딩
        height: toRem(6), // 토큰에 6이 없어서 하드코딩
      },
    },
    checked: {
      true: {
        opacity: 1,
        transform: 'scale(1)',
      },
      false: {
        opacity: 0,
        transform: 'scale(0)',
      },
    },
    disabled: {
      true: {
        backgroundColor: iconDisabledVar,
      },
      false: {
        backgroundColor: color.alpha.white100,
      },
    },
  },
});

// 텍스트 컨테이너
export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: toRem(spacing[4]),
  flex: 1,
});

// 레이블 스타일
export const label = recipe({
  base: {
    fontFamily: fontFamilyVar,
    fontWeight: fontWeightVar,
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: toRem(spacing[4]),
  },

  variants: {
    size: {
      lg: {
        fontSize: toRem(typography.fontSize[16]),
        lineHeight: 1.5,
      },
      md: {
        fontSize: toRem(typography.fontSize[14]),
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

// Required 표시 (*)
export const requiredMark = style({
  color: color.red[600],
  fontSize: 'inherit',
  lineHeight: 'inherit',
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
export const radioVars = {
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  primaryColor: primaryColorVar,
  focusShadowColor: focusShadowColorVar,
  focusOutlineColor: focusOutlineColorVar,
  borderDefault: borderDefaultVar,
  borderStrong: borderStrongVar,
  bgDisabled: bgDisabledVar,
  textPrimary: textPrimaryVar,
  textTertiary: textTertiaryVar,
  textDisabled: textDisabledVar,
  iconDisabled: iconDisabledVar,
};

// ========================================
// RadioGroup 스타일
// ========================================

// RadioGroup 컨테이너
export const radioGroupContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: toRem(spacing[8]),
});

// RadioGroup 레이블
export const radioGroupLabel = style({
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  fontSize: toRem(typography.fontSize[14]),
  lineHeight: 1.4,
  color: textPrimaryVar,
  marginBottom: toRem(spacing[4]),
  display: 'inline-flex',
  alignItems: 'center',
  gap: toRem(spacing[4]),
});

// RadioGroup 아이템 래퍼 (direction에 따라 변경)
export const radioGroupItems = recipe({
  base: {
    display: 'flex',
    gap: `${toRem(spacing[12])} ${toRem(spacing[32])}`,
  },
  variants: {
    direction: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
  },
  defaultVariants: {
    direction: 'vertical',
  },
});
