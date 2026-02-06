import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, spacing } from '../../../../../tokens';

import { motionVars } from '../../ExecutiveDemo.css';

// Local Vars
export const cardBgVar = createVar();
export const cardRadiusVar = createVar();
export const cardShadowVar = createVar();

export const productCard = recipe({
  base: {
    display: 'flex',
    backgroundColor: cardBgVar,
    borderRadius: cardRadiusVar,

    transition: 'all 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    vars: {
      [cardBgVar]: color.bg.default,
      [cardRadiusVar]: '8px', // Default fallback
    },
    ':active': {
      transform: motionVars.click,
    },
  },
  variants: {
    layout: {
      vertical: {
        flexDirection: 'column',
        width: '100%',
      },
      horizontal: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        // padding: spacing[16],
        gap: spacing[16],
      },
      compact: {
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export const imageWrapper = recipe({
  base: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: color.bg.subtle,
  },
  variants: {
    layout: {
      vertical: {
        width: '100%',
        aspectRatio: '1 / 1',
      },
      horizontal: {
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        flexShrink: 0,
      },
      compact: {
        width: '100%',
        aspectRatio: '3 / 1',
        borderRadius: '8px',
      },
    },
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

export const content = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
  },
  variants: {
    layout: {
      vertical: {
        padding: `${spacing[8]} 0`,
        gap: spacing[4],
      },
      horizontal: {
        flex: 1,
        gap: spacing[4],
      },
      compact: {
        paddingTop: spacing[8],
        gap: spacing[4],
      },
    },
  },
});

export const brand = style({
  fontSize: '0.75rem',
  color: color.text.tertiary,
  fontWeight: 500,
  marginBottom: spacing[2],
});

export const title = recipe({
  base: {
    fontWeight: 600,
    color: color.text.primary,
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  variants: {
    layout: {
      vertical: {
        fontSize: '0.875rem',
        letterSpacing: '-0.03em',
        WebkitLineClamp: 2,
        wordBreak: 'break-all',
      },
      horizontal: {
        fontSize: '1rem',
        WebkitLineClamp: 2,
      },
      compact: {
        fontSize: '0.875rem',
        WebkitLineClamp: 1,
      },
    },
  },
});

export const priceRow = style({
  display: 'flex',
  alignItems: 'baseline',
  gap: spacing[8],
  marginTop: 'auto',
});

export const discount = style({
  color: color.text.negative,
  fontWeight: 700,
  fontSize: '1rem',
});

export const price = style({
  color: color.text.primary,
  fontWeight: 700,
  fontSize: '1rem',
});

export const originalPrice = style({
  color: color.text.tertiary,
  textDecoration: 'line-through',
  fontSize: '0.875rem',
});
