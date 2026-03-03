import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  color,
  componentSize,
  shadow,
  spacing,
  toRem,
  zIndex,
} from '../../tokens';

/**
 * ========================================
 * CSS 변수 정의 (Select 전용)
 * ========================================
 */

// Container & Select 색상
const borderColorVar = createVar();
const hoverBorderColorVar = createVar();
const focusBorderColorVar = createVar();
const focusShadowColorVar = createVar();
const errorBorderColorVar = createVar();

const bgColorVar = createVar();
const disabledBgColorVar = createVar();

// 텍스트 색상
const textColorVar = createVar();
const placeholderColorVar = createVar();
const disabledTextColorVar = createVar();

// 아이콘 색상
const iconColorVar = createVar();
const iconColorExpandedVar = createVar();
const iconColorDisabledVar = createVar();

// 선택된 옵션 색상
const selectedOptionTextColorVar = createVar();

// 타이포그래피
const fontWeightVar = createVar();
const fontFamilyVar = createVar();

// 레이아웃
const borderRadiusVar = createVar();

// 옵션 구분선 색상
const optionDividerColorVar = createVar();

/**
 * ========================================
 * Animations
 * ========================================
 */
const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeInUp = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

/**
 * ========================================
 * 1. Wrapper 스타일
 * ========================================
 */
export const selectWrapper = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: spacing[8],
  width: '100%',
  position: 'relative',
});

export const selectWrapperFull = style({
  width: '100%',
});

/**
 * ========================================
 * 2. Select Container (Trigger + Dropdown를 감싸는 컨테이너)
 * ========================================
 */
export const selectContainer = style({
  position: 'relative',
  width: '100%',
});

/**
 * ========================================
 * 3. Select Trigger (Button) 스타일
 * ========================================
 */
const baseSelectTrigger = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  // 외형
  borderRadius: borderRadiusVar,
  border: `1px solid ${borderColorVar}`,
  backgroundColor: bgColorVar,
  transition: 'all 0.2s ease',

  // 타이포그래피
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  color: textColorVar,
  textAlign: 'left',

  // 인터랙션
  cursor: 'pointer',

  ':hover': {
    borderColor: hoverBorderColorVar,
  },

  ':focus-visible': {
    outline: 'none',
    borderColor: focusBorderColorVar,
    boxShadow: `0 0 10px 0 ${focusShadowColorVar}`,
  },

  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: disabledBgColorVar,
    borderColor: disabledBgColorVar,
    color: disabledTextColorVar,
  },
});

export const selectTriggerStyle = recipe({
  base: baseSelectTrigger,

  variants: {
    size: {
      xs: {
        height: toRem(componentSize.xs.height),
        fontSize: toRem(componentSize.xs.fontSize),
        padding: `0 ${spacing[8]}`,
        gap: spacing[4],
      },
      sm: {
        height: toRem(componentSize.sm.height),
        fontSize: toRem(componentSize.sm.fontSize),
        padding: `0 ${spacing[12]}`,
        gap: spacing[4],
      },
      md: {
        height: toRem(componentSize.md.height),
        fontSize: toRem(componentSize.md.fontSize),
        padding: `0 ${spacing[12]}`,
        gap: spacing[8],
      },
      lg: {
        height: toRem(componentSize.lg.height),
        fontSize: toRem(componentSize.lg.fontSize),
        padding: `0 ${spacing[16]}`,
        gap: spacing[8],
      },
      xl: {
        height: toRem(componentSize.xl.height),
        fontSize: toRem(componentSize.xl.fontSize),
        padding: `0 ${spacing[16]}`,
        gap: spacing[8],
      },
    },
    full: {
      true: {
        width: '100%',
      },
    },
    error: {
      true: {
        borderColor: errorBorderColorVar,
      },
    },
    expanded: {
      true: {
        borderColor: focusBorderColorVar,
      },
    },
  },
});

/**
 * ========================================
 * 3. Select Content (Trigger 내부 텍스트)
 * ========================================
 */
export const selectContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
  flex: 1,
  overflow: 'hidden',
});

export const selectText = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: textColorVar,
  transition: 'color 0.2s ease',
});

export const selectPlaceholder = style({
  color: placeholderColorVar,
});

/**
 * ========================================
 * 4. Icon Container 스타일
 * ========================================
 */
export const iconContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: iconColorVar,
  transition: 'color 0.2s ease',
});

// 확장 상태의 아이콘 컨테이너
export const iconContainerExpanded = style({
  color: iconColorExpandedVar,
});

// 비활성화 상태의 아이콘 컨테이너
export const iconContainerDisabled = style({
  color: iconColorDisabledVar,
});

export const caretIcon = style({
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.2s ease, color 0.2s ease',
  color: iconColorVar,
});

export const caretIconRotated = style({
  transform: 'rotate(180deg)',
});

/**
 * ========================================
 * 5. Dropdown (옵션 목록) 스타일
 * ========================================
 */
const baseDropdown = style({
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: Number(zIndex.dropdown),

  // 외형
  backgroundColor: bgColorVar,
  borderRadius: borderRadiusVar,
  border: `1px solid ${borderColorVar}`,
  boxShadow: shadow.raised,

  // 스크롤 설정
  maxHeight: toRem(240),
  overflowY: 'auto',
  overflowX: 'hidden',
  overscrollBehavior: 'contain',
});

export const dropdownStyle = recipe({
  base: baseDropdown,

  variants: {
    placement: {
      bottom: {
        top: `calc(100% + ${spacing[4]})`,
        animation: `${fadeIn} 0.15s ease-out`,
      },
      top: {
        bottom: `calc(100% + ${spacing[4]})`,
        animation: `${fadeInUp} 0.15s ease-out`,
      },
    },
  },

  defaultVariants: {
    placement: 'bottom',
  },
});

/**
 * ========================================
 * 6. Option (개별 옵션) 스타일
 * ========================================
 */
const baseOption = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],

  padding: `${spacing[8]} ${spacing[12]}`,
  borderRadius: toRem(4),

  cursor: 'pointer',
  transition: 'all 0.15s ease',

  fontFamily: fontFamilyVar,
  color: textColorVar,
  fontSize: toRem(componentSize.md.fontSize),

  selectors: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${optionDividerColorVar}`,
    },
    '&:hover': {
      backgroundColor: color.bg.subtle,
    },
    '&:active': {
      backgroundColor: color.bg.subtle,
    },
  },
});

export const optionStyle = recipe({
  base: baseOption,

  variants: {
    size: {
      xs: {
        fontSize: toRem(componentSize.xs.fontSize),
        padding: `${spacing[4]} ${spacing[8]}`,
      },
      sm: {
        fontSize: toRem(componentSize.sm.fontSize),
        padding: `${spacing[4]} ${spacing[12]}`,
      },
      md: {
        fontSize: toRem(componentSize.md.fontSize),
        padding: `${spacing[8]} ${spacing[12]}`,
      },
      lg: {
        fontSize: toRem(componentSize.lg.fontSize),
        padding: `${spacing[12]} ${spacing[16]}`,
      },
      xl: {
        fontSize: toRem(componentSize.xl.fontSize),
        padding: `${spacing[12]} ${spacing[16]}`,
      },
    },
    selected: {
      true: {
        backgroundColor: color.bg.subtle,
        color: selectedOptionTextColorVar,
        fontWeight: 600,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

/**
 * ========================================
 * 7. Trailing Icons Container
 * ========================================
 */
export const trailingIconsContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: spacing[8],
});

/**
 * ========================================
 * 8. Option Label & Checkmark
 * ========================================
 */
export const optionLabel = style({
  flex: 1,
});

export const optionCheckmark = style({
  color: 'inherit',
});

/**
 * ========================================
 * 9. Description 스타일
 * ========================================
 */
export const descriptionStyle = style({
  fontSize: toRem(12),
  color: color.text.tertiary,
  marginTop: spacing[4],
});

/**
 * ========================================
 * CSS 변수 Export
 * ========================================
 */
export const selectVars = {
  // Container & Select 색상
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

  // 아이콘 색상
  iconColor: iconColorVar,
  iconColorExpanded: iconColorExpandedVar,
  iconColorDisabled: iconColorDisabledVar,

  // 선택된 옵션 색상
  selectedOptionTextColor: selectedOptionTextColorVar,

  // 타이포그래피
  fontWeight: fontWeightVar,
  fontFamily: fontFamilyVar,

  // 레이아웃
  borderRadius: borderRadiusVar,

  // 옵션 구분선
  optionDividerColor: optionDividerColorVar,
};
