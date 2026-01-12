import { style } from '@vanilla-extract/css';

import { color, font } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

export const avatarGroupContainer = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const avatarGroupItem = style({
  position: 'relative',
  borderRadius: '50%',
  boxSizing: 'border-box', // box-shadow/border를 크기에 포함

  selectors: {
    '&:not(:first-child)': {
      marginLeft: toRem(-8),
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
  borderRadius: '50%',
  position: 'relative',

  selectors: {
    '&:not(:first-child)': {
      marginLeft: '-8px',
    },
  },
});
