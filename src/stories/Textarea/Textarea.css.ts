import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { componentSize, spacing, toRem } from '../../tokens';

/**
 * ========================================
 * CSS 변수 정의 (Textarea 전용)
 * ========================================
 * Textarea 컴포넌트에서만 사용하는 CSS 변수들
 * Label, Helper Text는 FormField에서 관리
 */

// Container & Textarea 색상
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
const fontFamilyVar = createVar();

// 레이아웃
const borderRadiusVar = createVar();

/**
 * ========================================
 * 1. Wrapper 스타일
 * ========================================
 * 전체 Textarea 컴포넌트를 감싸는 최상위 컨테이너
 * (Label + TextareaContainer + HelperText)
 */

export const textareaWrapper = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: '100%',
});

/**
 * ========================================
 * 2. Textarea Container 스타일
 * ========================================
 * Textarea 요소를 감싸는 컨테이너
 * Border, Background, 상태 변화를 담당
 */

const baseTextareaContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'flex-start', // Textarea는 상단 정렬

  // 외형
  borderRadius: borderRadiusVar,
  border: `1px solid ${borderColorVar}`,
  backgroundColor: bgColorVar,
  transition: 'all 0.2s ease',

  // 상태별 스타일
  selectors: {
    // Hover: disabled나 focus가 아닐 때만
    '&:hover:not(:has(textarea:disabled)):not(:has(textarea:focus-visible))': {
      borderColor: hoverBorderColorVar,
    },

    // Focus: textarea가 focus 상태일 때
    '&:has(textarea:focus-visible)': {
      borderColor: focusBorderColorVar,
      boxShadow: `0 0 10px 0 ${focusShadowColorVar}`,
    },

    // Disabled: textarea가 disabled 상태일 때
    '&:has(textarea:disabled)': {
      backgroundColor: disabledBgColorVar,
      borderColor: disabledBgColorVar,
    },
  },
});

// Textarea Container Recipe (variant 지원)
export const textareaContainerStyle = recipe({
  base: baseTextareaContainer,

  variants: {
    error: {
      true: {
        borderColor: errorBorderColorVar,
        selectors: {
          '&:hover:not(:has(textarea:disabled))': {
            borderColor: focusBorderColorVar,
          },
          '&:has(textarea:focus-visible)': {
            borderColor: focusBorderColorVar,
          },
        },
      },
    },
  },
});

/**
 * ========================================
 * 3. Textarea 요소 스타일
 * ========================================
 * 실제 텍스트 입력을 담당하는 textarea 요소
 * Border는 없고, Container가 border를 담당
 */

const baseTextarea = style({
  // 타이포그래피
  fontWeight: fontWeightVar,
  fontFamily: fontFamilyVar,
  color: textColorVar,
  lineHeight: 1.5,

  // 레이아웃
  display: 'block', // inline-flex → block 변경 (rows 속성 정상 작동)
  padding: `${spacing[12]} ${spacing[16]}`, // 상하 12px, 좌우 16px (em → 고정값)
  boxSizing: 'border-box',
  width: '100%', // 기본 너비: 100% (부모 컨테이너에 맞춤)
  resize: 'none',

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
});

// Textarea Recipe (size)
export const textareaStyle = recipe({
  base: baseTextarea,

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
  },
});

/**
 * ========================================
 * 4. Character Counter 스타일
 * ========================================
 * 글자수 카운터 표시 영역
 */

// 내부 카운터 (inside-left, inside-right)
export const characterCountInside = style({
  position: 'absolute',
  bottom: spacing[8],
  fontSize: '0.875em', // 부모 폰트 크기의 87.5%
  color: textColorVar,
  opacity: 0.8,
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 1,

  // 배경 추가 (텍스트와 겹칠 때 가독성 확보)
  backgroundColor: bgColorVar,
  padding: `${spacing[4]} ${spacing[8]}`,
  borderRadius: toRem(4),
  backdropFilter: 'blur(4px)',
});

export const characterCountInsideLeft = style([
  characterCountInside,
  {
    left: spacing[12],
  },
]);

export const characterCountInsideRight = style([
  characterCountInside,
  {
    right: spacing[12],
  },
]);

// 외부 카운터 (left, right)
export const characterCountWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  fontSize: '0.875em',
  color: textColorVar,
  opacity: 0.7,
});

export const characterCountLeft = style({
  justifyContent: 'flex-start',
});

export const characterCountRight = style({
  justifyContent: 'flex-end',
});

/**
 * ========================================
 * CSS 변수 Export
 * ========================================
 * Theme에서 런타임에 주입할 CSS 변수들
 */

export const textareaVars = {
  // Container & Textarea 색상
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
  fontFamily: fontFamilyVar,

  // 레이아웃
  borderRadius: borderRadiusVar,
};
