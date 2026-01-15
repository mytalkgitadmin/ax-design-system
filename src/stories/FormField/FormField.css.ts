import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { spacing, toRem, typography } from '../../tokens';
import { fontWeight } from '../../tokens/dev/helpers/typography';

/**
 * ========================================
 * FormField 공통 CSS Variables
 * ========================================
 * Input, Textarea 등에서 공통으로 사용하는 CSS 변수들
 */

// 텍스트 색상
export const labelColorVar = createVar();
export const helperTextColorVar = createVar();
export const successTextColorVar = createVar();
export const errorTextColorVar = createVar();
export const warnTextColorVar = createVar();

// 타이포그래피
export const fontFamilyVar = createVar();

// Label 폰트 크기 (size별)
export const labelFontSizeXsVar = createVar();
export const labelFontSizeSmVar = createVar();
export const labelFontSizeMdVar = createVar();
export const labelFontSizeLgVar = createVar();
export const labelFontSizeXlVar = createVar();

/**
 * ========================================
 * Label 스타일
 * ========================================
 */

// Label 기본 스타일
const baseLabel = style({
  fontFamily: fontFamilyVar,
  fontWeight: fontWeight.semibold,
  color: labelColorVar,
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
});

// Label Recipe (size에 따라 fontSize 변경)
export const labelStyle = recipe({
  base: baseLabel,

  variants: {
    size: {
      xs: {
        fontSize: labelFontSizeXsVar,
      },
      sm: {
        fontSize: labelFontSizeSmVar,
      },
      md: {
        fontSize: labelFontSizeMdVar,
      },
      lg: {
        fontSize: labelFontSizeLgVar,
      },
      xl: {
        fontSize: labelFontSizeXlVar,
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

// 필수 입력 표시 (*)
export const requiredMark = style({
  color: errorTextColorVar,
});

// 접근성: 시각적으로 숨김, 스크린 리더에서는 읽힘
export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
});

/**
 * ========================================
 * Helper Text (Status Message) 스타일
 * ========================================
 */

export const helperTextStyle = style({
  fontFamily: fontFamilyVar,
  fontSize: toRem(typography.fontSize[12]),
  color: helperTextColorVar,
});

export const successTextStyle = style({
  fontFamily: fontFamilyVar,
  fontSize: toRem(typography.fontSize[12]),
  color: successTextColorVar,
});

export const errorTextStyle = style({
  fontFamily: fontFamilyVar,
  fontSize: toRem(typography.fontSize[12]),
  color: errorTextColorVar,
});

export const warnTextStyle = style({
  fontFamily: fontFamilyVar,
  fontSize: toRem(typography.fontSize[12]),
  color: warnTextColorVar,
});

/**
 * ========================================
 * CSS 변수 Export
 * ========================================
 */

export const formFieldVars = {
  // 텍스트 색상
  labelColor: labelColorVar,
  helperTextColor: helperTextColorVar,
  successTextColor: successTextColorVar,
  errorTextColor: errorTextColorVar,
  warnTextColor: warnTextColorVar,

  // 타이포그래피
  fontFamily: fontFamilyVar,

  // Label 폰트 크기 (size별)
  labelFontSizeXs: labelFontSizeXsVar,
  labelFontSizeSm: labelFontSizeSmVar,
  labelFontSizeMd: labelFontSizeMdVar,
  labelFontSizeLg: labelFontSizeLgVar,
  labelFontSizeXl: labelFontSizeXlVar,
};
