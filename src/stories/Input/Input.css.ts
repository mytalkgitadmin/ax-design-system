import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentSize, spacing, toRem } from '../../tokens';

/**
 * ========================================
 * CSS 변수 정의 (Input 전용)
 * ========================================
 * Input 컴포넌트에서만 사용하는 CSS 변수들
 * Label, Helper Text는 FormField에서 관리
 */

// Container & Input 색상
const borderColorVar = createVar(); // 기본 border 색상
const hoverBorderColorVar = createVar(); // hover 시 border 색상
const focusBorderColorVar = createVar(); // focus 시 border 색상
const focusShadowColorVar = createVar(); // focus 시 그림자 색상
const errorBorderColorVar = createVar(); // error 상태 border 색상

const bgColorVar = createVar(); // 배경 색상
const disabledBgColorVar = createVar(); // disabled 배경 색상

// 텍스트 색상
const textColorVar = createVar(); // 입력 텍스트 색상
const placeholderColorVar = createVar(); // placeholder 색상
const disabledTextColorVar = createVar(); // disabled 텍스트 색상
const disabledIconColorVar = createVar(); // disabled 아이콘 색상

// 타이포그래피
const fontWeightVar = createVar();
const fontFamilyVar = createVar();

// 레이아웃
const borderRadiusVar = createVar();

/**
 * ========================================
 * 1. Wrapper 스타일
 * ========================================
 * 전체 Input 컴포넌트를 감싸는 최상위 컨테이너
 * (Label + InputContainer + HelperText)
 */

export const inputWrapper = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: 'fit-content',
  verticalAlign: 'middle',
});

export const inputWrapperFull = style({
  width: '100%',
});

/**
 * ========================================
 * 2. Input Container 스타일
 * ========================================
 * Input 요소와 아이콘을 감싸는 컨테이너
 * Border, Background, 상태 변화를 담당
 */

const baseInputContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',

  // Icon 색상 상속을 위해 추가
  color: textColorVar,

  // 외형
  borderRadius: borderRadiusVar,
  border: `1px solid ${borderColorVar}`,
  backgroundColor: bgColorVar,
  transition: 'all 0.2s ease',

  // 상태별 스타일
  selectors: {
    // Hover: disabled나 focus가 아닐 때만
    '&:hover:not(:has(input:disabled)):not(:has(input:focus-visible))': {
      borderColor: hoverBorderColorVar,
    },

    // Focus: Mouse click or Keyboard (Border Color Only)
    '&:has(input:focus)': {
      borderColor: focusBorderColorVar,
    },

    // Focus Visible: Keyboard mainly (Add Shadow)
    '&:has(input:focus-visible)': {
      boxShadow: `0 0 10px 0 ${focusShadowColorVar}`,
    },

    // Disabled: input이 disabled 상태일 때
    '&:has(input:disabled)': {
      backgroundColor: disabledBgColorVar,
      borderColor: disabledBgColorVar,
      color: disabledIconColorVar, // Disabled Icon Color
    },
  },
});

// Input Container Recipe (variant 지원)
export const inputContainerStyle = recipe({
  base: baseInputContainer,

  variants: {
    size: {
      xl: {
        height: toRem(componentSize.xl.height),
      },
      lg: {
        height: toRem(componentSize.lg.height),
      },
      md: {
        height: toRem(componentSize.md.height),
      },
      sm: {
        height: toRem(componentSize.sm.height),
      },
      xs: {
        height: toRem(componentSize.xs.height),
      },
    },
    variant: {
      outline: {
        // 기본 스타일 (전체 테두리)
      },
      underline: {
        // 하단 테두리만
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: 0,
        backgroundColor: 'transparent',

        selectors: {
          '&:has(input:focus)': {
            boxShadow: `0 1px 0 0 ${focusBorderColorVar}`,
          },
        },
      },
      none: {
        border: 'none',
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:has(input:disabled)):not(:has(input:focus-visible))': {
            borderColor: 'transparent',
          },
          '&:has(input:focus)': {
            borderColor: 'transparent',
            boxShadow: 'none',
          },
          '&:has(input:focus-visible)': {
            boxShadow: 'none',
          },
        },
      },
    },
    error: {
      true: {
        borderColor: errorBorderColorVar,
        selectors: {
          '&:hover:not(:has(input:disabled))': {
            borderColor: focusBorderColorVar,
          },
          '&:has(input:focus)': {
            borderColor: focusBorderColorVar,
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
  },
});

/**
 * ========================================
 * 3. Input 요소 스타일
 * ========================================
 * 실제 텍스트 입력을 담당하는 input 요소
 * Border는 없고, Container가 border를 담당
 */

const baseInput = style({
  // 타이포그래피
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  color: textColorVar,

  // 레이아웃
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 1em',
  boxSizing: 'border-box',
  height: '100%',

  // 외형 (Container가 border를 담당하므로 투명)
  backgroundColor: 'transparent',
  border: 0,
  outline: 'none',
  verticalAlign: 'top',
  borderRadius: borderRadiusVar, // Container의 border-radius 상속

  // 인터랙션
  cursor: 'text',

  // Placeholder
  '::placeholder': {
    color: placeholderColorVar,
    textOverflow: 'ellipsis', // Firefox might partial support
  },

  // Ellipsis & Overflow
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  // Disabled 상태
  ':disabled': {
    cursor: 'not-allowed',
    color: disabledTextColorVar,
  },

  // type='number'일 때 기본 스핀 버튼 제거
  '::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  // type='search'일 때 기본 cancel 버튼 숨기기 (커스텀 Icon 컴포넌트 사용)
  '::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
    appearance: 'none',
    display: 'none',
  },

  // Firefox용
  selectors: {
    '&:focus::placeholder': {
      color: 'transparent',
    },
    '&[type="number"]': {
      MozAppearance: 'textfield',
    },
    // 자동완성 스타일 (브라우저 기본 스타일 덮어쓰기)
    // Container가 border를 담당하므로, input 요소에는 배경색과 텍스트 색상만 처리
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 30px ${bgColorVar} inset !important`,
      WebkitTextFillColor: `${textColorVar} !important`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
    '&:-webkit-autofill:hover': {
      WebkitBoxShadow: `0 0 0 30px ${bgColorVar} inset !important`,
      WebkitTextFillColor: `${textColorVar} !important`,
    },
    '&:-webkit-autofill:focus': {
      WebkitBoxShadow: `0 0 0 30px ${bgColorVar} inset !important`,
      WebkitTextFillColor: `${textColorVar} !important`,
    },
    '&:-webkit-autofill:active': {
      WebkitBoxShadow: `0 0 0 30px ${bgColorVar} inset !important`,
      WebkitTextFillColor: `${textColorVar} !important`,
    },
  },
});

// Input Recipe (size, full, icon padding)
export const inputStyle = recipe({
  base: baseInput,

  variants: {
    size: {
      xl: {
        fontSize: `${toRem(componentSize.xl.fontSize)}`,
      },
      lg: {
        fontSize: `${toRem(componentSize.lg.fontSize)}`,
      },
      md: {
        fontSize: `${toRem(componentSize.md.fontSize)}`,
      },
      sm: {
        fontSize: `${toRem(componentSize.sm.fontSize)}`,
      },
      xs: {
        fontSize: `${toRem(componentSize.xs.fontSize)}`,
      },
    },
    full: {
      true: {
        width: '100%',
      },
    },
    // 아이콘이 있을 때 padding 조정 (iconSize + spacing 기준)
    leftIcon: {
      true: {},
    },
    rightIcon: {
      true: {},
    },
  },

  compoundVariants: Object.entries(componentSize).flatMap(([key, value]) => [
    // Left Icon Padding
    {
      variants: { size: key as keyof typeof componentSize, leftIcon: true },
      style: {
        paddingLeft: `calc(${toRem(Number(value.iconSize))} + 1.6em)`,
      },
    },
    // Right Icon Padding
    {
      variants: { size: key as keyof typeof componentSize, rightIcon: true },
      style: {
        paddingRight: `calc(${toRem(Number(value.iconSize))} + 1.6em)`,
      },
    },
  ]),
});

/**
 * ========================================
 * 4. Icon Container 스타일
 * ========================================
 * Input 내부에 표시되는 아이콘 컨테이너
 */

export const iconContainer = style({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none', // 기본적으로 클릭 불가 (onRightIconClick이 있으면 'auto'로 변경)
  color: 'inherit',
});

export const leftIconContainer = style({
  left: '1em',
});

// Clear 버튼 전용 (search 타입에서 텍스트 바로 옆)
export const clearButtonContainer = style({
  right: '1em',
});

// Search 버튼 전용 (맨 오른쪽, clear 버튼이 있을 때는 더 오른쪽)
export const searchButtonContainer = style({
  right: '1em',
});

/**
 * ========================================
 * CSS 변수 Export
 * ========================================
 * Theme에서 런타임에 주입할 CSS 변수들
 */

export const inputVars = {
  // Container & Input 색상
  borderColor: borderColorVar,
  hoverBorderColor: hoverBorderColorVar,
  focusBorderColor: focusBorderColorVar,
  focusShadowColor: focusShadowColorVar,
  errorBorderColor: errorBorderColorVar,
  bgColor: bgColorVar,
  disabledBgColor: disabledBgColorVar,

  // 텍스트 색상
  textColor: textColorVar,
  placeholderColor: placeholderColorVar,
  disabledTextColor: disabledTextColorVar,
  disabledIconColor: disabledIconColorVar,

  // 타이포그래피
  fontWeight: fontWeightVar,
  fontFamily: fontFamilyVar,

  // 레이아웃
  borderRadius: borderRadiusVar,
};
