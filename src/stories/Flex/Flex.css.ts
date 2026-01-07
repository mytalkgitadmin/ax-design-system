import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

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
      '4': { gap: toRem(spacing['4']) }, // 0.4rem
      '8': { gap: toRem(spacing['8']) }, // 0.8rem
      '12': { gap: toRem(spacing['12']) }, // 1.2rem
      '16': { gap: toRem(spacing['16']) }, // 1.6rem
      '20': { gap: toRem(spacing['20']) }, // 2.0rem
      '24': { gap: toRem(spacing['24']) }, // 2.4rem
      '32': { gap: toRem(spacing['32']) }, // 3.2rem
      '48': { gap: toRem(spacing['48']) }, // 4.8rem
      '64': { gap: toRem(spacing['64']) }, // 6.4rem
    },
  },

  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
  },
});
