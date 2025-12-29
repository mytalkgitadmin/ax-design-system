import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentSize, spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

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

// 타이포그래피
const fontWeightVar = createVar();

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
  gap: toRem(spacing[8]),
  width: 'fit-content',
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

  // 외형
  borderRadius: borderRadiusVar,
  border: `1px solid ${borderColorVar}`,
  backgroundColor: bgColorVar,
  transition: 'all 0.2s ease',

  // 상태별 스타일
  selectors: {
    // Hover: disabled나 focus가 아닐 때만
    '&:hover:not(:has(input:disabled)):not(:has(input:focus))': {
      borderColor: hoverBorderColorVar,
    },

    // Focus: input이 focus 상태일 때
    '&:has(input:focus)': {
      borderColor: focusBorderColorVar,
      boxShadow: `0 0 10px 0 ${focusShadowColorVar}`,
    },

    // Disabled: input이 disabled 상태일 때
    '&:has(input:disabled)': {
      backgroundColor: disabledBgColorVar,
      borderColor: disabledBgColorVar,
    },
  },
});

// Input Container Recipe (variant 지원)
export const inputContainerStyle = recipe({
  base: baseInputContainer,

  variants: {
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
  fontWeight: fontWeightVar,
  color: textColorVar,

  // 레이아웃
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 1em',
  boxSizing: 'border-box',

  // 외형 (Container가 border를 담당하므로 투명)
  backgroundColor: 'transparent',
  border: 0,
  outline: 'none',
  verticalAlign: 'top',

  // 인터랙션
  cursor: 'text',

  // Placeholder
  '::placeholder': {
    color: placeholderColorVar,
  },

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
  // Firefox용
  selectors: {
    '&[type="number"]': {
      MozAppearance: 'textfield',
    },
  },
});

// Input Recipe (size, full, icon padding)
export const inputStyle = recipe({
  base: baseInput,

  variants: {
    size: {
      xl: {
        height: `calc(${toRem(componentSize.xl.height)} - 2px)`,
        fontSize: `${toRem(componentSize.xl.fontSize)}`,
      },
      lg: {
        height: `calc(${toRem(componentSize.lg.height)} - 2px)`,
        fontSize: `${toRem(componentSize.lg.fontSize)}`,
      },
      md: {
        height: `calc(${toRem(componentSize.md.height)} - 2px)`,
        fontSize: `${toRem(componentSize.md.fontSize)}`,
      },
      sm: {
        height: `calc(${toRem(componentSize.sm.height)} - 2px)`,
        fontSize: `${toRem(componentSize.sm.fontSize)}`,
      },
      xs: {
        height: `calc(${toRem(componentSize.xs.height)} - 2px)`,
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

  compoundVariants: [
    // Left Icon Padding (size별)
    {
      variants: { size: 'xs', leftIcon: true },
      style: {
        paddingLeft: toRem(
          Number(componentSize.xs.iconSize) + Number(spacing[12]) * 2
        ), // iconSize + 좌우 spacing
      },
    },
    {
      variants: { size: 'sm', leftIcon: true },
      style: {
        paddingLeft: toRem(
          Number(componentSize.sm.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'md', leftIcon: true },
      style: {
        paddingLeft: toRem(
          Number(componentSize.md.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'lg', leftIcon: true },
      style: {
        paddingLeft: toRem(
          Number(componentSize.lg.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'xl', leftIcon: true },
      style: {
        paddingLeft: toRem(
          Number(componentSize.xl.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    // Right Icon Padding (size별)
    {
      variants: { size: 'xs', rightIcon: true },
      style: {
        paddingRight: toRem(
          Number(componentSize.xs.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'sm', rightIcon: true },
      style: {
        paddingRight: toRem(
          Number(componentSize.sm.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'md', rightIcon: true },
      style: {
        paddingRight: toRem(
          Number(componentSize.md.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'lg', rightIcon: true },
      style: {
        paddingRight: toRem(
          Number(componentSize.lg.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
    {
      variants: { size: 'xl', rightIcon: true },
      style: {
        paddingRight: toRem(
          Number(componentSize.xl.iconSize) + Number(spacing[12]) * 2
        ),
      },
    },
  ],
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
  color: textColorVar,
});

export const leftIconContainer = style({
  left: toRem(spacing[12]),
});

export const rightIconContainer = style({
  right: toRem(spacing[12]),
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

  // 타이포그래피
  fontWeight: fontWeightVar,

  // 레이아웃
  borderRadius: borderRadiusVar,
};
