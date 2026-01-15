import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '../../tokens';

export const flexStyle = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      'row-reverse': {
        flexDirection: 'row-reverse',
      },
      'column-reverse': {
        flexDirection: 'column-reverse',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
      evenly: {
        justifyContent: 'space-evenly',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
    wrap: {
      wrap: {
        flexWrap: 'wrap',
      },
      nowrap: {
        flexWrap: 'nowrap',
      },
    },
    gap: {
      '0': { gap: 0 },
      '4': { gap: spacing[4] },
      '8': { gap: spacing[8] },
      '12': { gap: spacing[12] },
      '16': { gap: spacing[16] },
      '24': { gap: spacing[24] },
      '32': { gap: spacing[32] },
      '48': { gap: spacing[48] },
      '64': { gap: spacing[64] },
    },
  },

  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
  },
});
