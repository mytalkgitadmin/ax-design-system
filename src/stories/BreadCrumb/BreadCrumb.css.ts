import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, font, spacing, toRem, typography } from '../../tokens';

// CSS Variables for theme colors
const brandDefaultVar = createVar();
const focusShadowColorVar = createVar();
const focusOutlineColorVar = createVar();
const focusBorderRadiusVar = createVar();

export const breadCrumbVars = {
  brandDefault: brandDefaultVar,
  focusShadowColor: focusShadowColorVar,
  focusOutlineColor: focusOutlineColorVar,
  focusBorderRadius: focusBorderRadiusVar,
};

// BreadCrumb 컨테이너 스타일
export const breadCrumbContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: toRem(typography.fontSize[14]),
  listStyle: 'none',
  gap: spacing[4],
  padding: 0,
});

// BreadCrumb 아이템 기본 스타일
const baseBreadCrumbItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing[4],
  padding: `${spacing[4]} ${spacing[8]}`,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderRadius: focusBorderRadiusVar,
  color: color.text.secondary,

  // Hover 상태 - 테마 컬러 적용
  ':hover': {
    color: brandDefaultVar,
  },

  // Active 상태 (클릭)
  ':active': {
    color: color.text.primary,
  },

  // Focus 상태 (Button 패턴 참고)
  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 1px ${focusOutlineColorVar}, 0 0 5px 1px ${focusShadowColorVar}`,
  },

  // 비활성화된 링크 (마지막 아이템)
  selectors: {
    '&[aria-current="page"]': {
      color: color.text.primary,
      fontWeight: font.weight.semibold,
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
});

// 링크 내부 텍스트 span 스타일
export const breadCrumbLabelStyle = style({
  paddingTop: '0.1em',
});

// BreadCrumb 아이템 Recipe
export const breadCrumbItemStyle = recipe({
  base: baseBreadCrumbItem,

  variants: {
    isLast: {
      true: {
        color: color.text.primary,
        fontWeight: font.weight.semibold,
        cursor: 'default',
      },
      false: {},
    },
    isEllipsis: {
      true: {
        cursor: 'default',
        pointerEvents: 'none',
        ':hover': {
          color: color.text.secondary, // hover 시에도 색상 유지
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    isLast: false,
    isEllipsis: false,
  },
});

// 구분자 스타일
export const separatorStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  color: color.text.tertiary,
  userSelect: 'none',
});
