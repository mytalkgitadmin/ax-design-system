import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

export const thumbnailVars = {
  iconColor: createVar(),
  bgColor: createVar(),
};

// 기본 스타일
const baseThumbnail = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: 'auto',
  aspectRatio: 1,
  backgroundColor: thumbnailVars.bgColor,
  objectFit: 'cover',

  // Icon 색상 제어
  color: thumbnailVars.iconColor,
});

export const thumbnailStyle = recipe({
  base: baseThumbnail,

  variants: {
    // 색상
    color: {
      brand: {
        backgroundColor: thumbnailVars.bgColor,
        color: thumbnailVars.iconColor,
      },
      gray: {
        backgroundColor: color.gray[150],
        color: color.gray[600],
      },
    },
    // 둥근 모서리
    rounded: {
      none: { borderRadius: toRem(rounded.none) },
      xs: { borderRadius: toRem(rounded.xs) },
      sm: { borderRadius: toRem(rounded.sm) },
      md: { borderRadius: toRem(rounded.md) },
      lg: { borderRadius: toRem(rounded.lg) },
      xl: { borderRadius: toRem(rounded.xl) },
      full: { borderRadius: toRem(rounded.full) },
    },
    // 이미지 비율
    ratio: {
      '1': {
        height: 'auto',
        aspectRatio: '1',
      },
      '1.618:1': { height: 'auto', aspectRatio: '1618/1000' },
      '16:9': { height: 'auto', aspectRatio: '16/9' },
    },
  },
});
