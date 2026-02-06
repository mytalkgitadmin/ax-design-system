import { style } from '@vanilla-extract/css';

import { color, font, toRem } from '../../tokens';

export const avatarGroupContainer = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const avatarGroupItem = style({
  position: 'relative',

  boxSizing: 'border-box', // box-shadow/border를 크기에 포함

  selectors: {
    '&:not(:first-child)': {
      marginLeft: toRem(-8),
    },
    '&:hover': {
      zIndex: 10,
    },
  },
});

// +N 표시용 스타일
export const avatarGroupMore = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.gray[200],
  color: color.text.secondary,
  fontWeight: font.weight.semibold,

  position: 'relative',
  userSelect: 'none',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: '-8px',
    },
  },
});
