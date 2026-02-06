import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  color,
  componentSize,
  font,
  rounded,
  spacing,
  toRem,
} from '../../tokens';

// Badge CSS Variables
export const badgeVars = {
  brandDefault: createVar(),
  brandSubtle: createVar(),
  brandSoft: createVar(),
  brandBorderSoft: createVar(),
  borderRadius: createVar(),
};

// 기본 스타일
const baseBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[4],
  padding: `0 ${spacing[8]}`,
  fontWeight: font.weight.semibold,
  height: toRem(componentSize.xs.height),
  minWidth: toRem(componentSize.xs.height),
  fontSize: toRem(componentSize.xs.fontSize),
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease',
  border: '1px solid transparent',
  boxSizing: 'border-box',
});

export const badgeStyle = recipe({
  base: baseBadge,

  variants: {
    color: {
      primary: {},
      green: {},
      red: {},
      yellow: {},
      blue: {},
      muted: {},
      'neutral-emphasis': {},
      'neutral-disabled': {},
    },

    // 스타일 변형
    variant: {
      solid: {},
      outline: {},
      soft: {},
    },

    // 둥근 모서리
    rounded: {
      none: { borderRadius: toRem(rounded.none) },
      xs: { borderRadius: badgeVars.borderRadius },
      md: { borderRadius: toRem(rounded.md) },
      full: { borderRadius: toRem(rounded.full) },
    },
  },

  // 복합 변형 (color + variant 조합)
  compoundVariants: [
    // PRIMARY 색상
    {
      variants: { color: 'primary', variant: 'solid' },
      style: {
        backgroundColor: badgeVars.brandSubtle,
        color: color.base.white,
        borderColor: 'transparent',
      },
    },
    {
      variants: { color: 'primary', variant: 'outline' },
      style: {
        backgroundColor: 'transparent',
        color: badgeVars.brandSubtle,
        borderColor: badgeVars.brandBorderSoft, // 연한 테두리 색상 사용
      },
    },
    {
      variants: { color: 'primary', variant: 'soft' },
      style: {
        backgroundColor: badgeVars.brandSoft,
        color: badgeVars.brandDefault,
        borderColor: 'transparent',
      },
    },

    // GREEN 색상
    {
      variants: { color: 'green', variant: 'solid' },
      style: {
        backgroundColor: color.green[500],
        color: color.base.white,
        borderColor: 'transparent',
      },
    },
    {
      variants: { color: 'green', variant: 'outline' },
      style: {
        borderColor: color.border.positiveSoft,
        color: color.green[500],
        backgroundColor: 'transparent',
      },
    },
    {
      variants: { color: 'green', variant: 'soft' },
      style: {
        backgroundColor: color.bg.positive,
        color: color.green[500],
        borderColor: 'transparent',
      },
    },

    // RED 색상
    {
      variants: { color: 'red', variant: 'solid' },
      style: {
        backgroundColor: color.red[500],
        color: color.base.white,
        borderColor: 'transparent',
      },
    },
    {
      variants: { color: 'red', variant: 'outline' },
      style: {
        borderColor: color.border.negativeSoft,
        color: color.red[500],
        backgroundColor: 'transparent',
      },
    },
    {
      variants: { color: 'red', variant: 'soft' },
      style: {
        backgroundColor: color.bg.negative,
        color: color.red[500],
        borderColor: 'transparent',
      },
    },

    // YELLOW 색상
    {
      variants: { color: 'yellow', variant: 'solid' },
      style: {
        backgroundColor: color.yellow[500],
        color: color.gray[900],
        borderColor: 'transparent',
      },
    },
    {
      variants: { color: 'yellow', variant: 'outline' },
      style: {
        backgroundColor: 'transparent',
        color: color.yellow[500],
        borderColor: color.border.warningSoft,
      },
    },
    {
      variants: { color: 'yellow', variant: 'soft' },
      style: {
        backgroundColor: color.bg.warning,
        color: color.yellow[500],
        borderColor: 'transparent',
      },
    },

    // BLUE 색상 (고정 색상, 테마와 무관)
    {
      variants: { color: 'blue', variant: 'solid' },
      style: {
        backgroundColor: color.blue[500],
        color: color.base.white,
        borderColor: 'transparent',
      },
    },
    {
      variants: { color: 'blue', variant: 'outline' },
      style: {
        backgroundColor: 'transparent',
        color: color.blue[700], // #355fea
        borderColor: color.blue[300], // #aec3ff
      },
    },
    {
      variants: { color: 'blue', variant: 'soft' },
      style: {
        backgroundColor: color.blue[100], // #eef3ff (brandA soft와 동일하지만 고정)
        color: color.blue[700], // #355fea
        borderColor: 'transparent',
      },
    },

    // MUTED 색상 (solid variant만 사용)
    {
      variants: { color: 'muted', variant: 'solid' },
      style: {
        backgroundColor: color.bg.muted,
        color: color.text.muted,
        borderColor: 'transparent',
      },
    },

    // NEUTRAL-EMPHASIS 색상 (solid variant만 사용)
    {
      variants: { color: 'neutral-emphasis', variant: 'solid' },
      style: {
        background: color.bg.gray,
        color: color.text.secondary,
        borderColor: 'transparent',
      },
    },

    // NEUTRAL-DISABLED 색상 (solid variant만 사용)
    {
      variants: { color: 'neutral-disabled', variant: 'solid' },
      style: {
        backgroundColor: color.bg.disabled,
        color: color.text.disabled,
        borderColor: 'transparent',
      },
    },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    rounded: 'full',
  },
});
