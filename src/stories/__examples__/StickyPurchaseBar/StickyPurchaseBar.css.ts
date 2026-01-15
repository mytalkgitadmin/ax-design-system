import { style } from '@vanilla-extract/css';

import { color, mqConditions, shadow, spacing, zIndex } from '../../../tokens';

export const stickyBar = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: color.bg.default,
  borderTop: `1px solid ${color.divider.default}`,
  padding: spacing[16],
  zIndex: Number(zIndex.sticky),
  boxShadow: shadow.overlay,
  display: 'none',

  '@media': {
    [`not all and ${mqConditions.tablet}`]: {
      display: 'flex',
    },
  },
});

export const stickyContent = style({
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
});

export const buttonRow = style({
  display: 'flex',
  gap: spacing[8],
  width: '100%',
});
