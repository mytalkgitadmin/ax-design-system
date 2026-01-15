import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

export const gridStyle = recipe({
  base: {
    display: 'grid',
  },

  variants: {
    columns: {
      '1': { gridTemplateColumns: 'repeat(1, 1fr)' },
      '2': { gridTemplateColumns: 'repeat(2, 1fr)' },
      '3': { gridTemplateColumns: 'repeat(3, 1fr)' },
      '4': { gridTemplateColumns: 'repeat(4, 1fr)' },
      '5': { gridTemplateColumns: 'repeat(5, 1fr)' },
      '6': { gridTemplateColumns: 'repeat(6, 1fr)' },
      '8': { gridTemplateColumns: 'repeat(8, 1fr)' },
      '12': { gridTemplateColumns: 'repeat(12, 1fr)' },
      // auto-fill과 auto-fit은 동적으로 처리 (index.tsx에서)
      'auto-fill': {},
      'auto-fit': {},
    },
    rows: {
      '1': { gridTemplateRows: 'repeat(1, 1fr)' },
      '2': { gridTemplateRows: 'repeat(2, 1fr)' },
      '3': { gridTemplateRows: 'repeat(3, 1fr)' },
      '4': { gridTemplateRows: 'repeat(4, 1fr)' },
      '5': { gridTemplateRows: 'repeat(5, 1fr)' },
      '6': { gridTemplateRows: 'repeat(6, 1fr)' },
      auto: { gridTemplateRows: 'auto' },
    },
    gap: {
      '0': { gap: 0 },
      '4': { gap: toRem(spacing['4']) },
      '8': { gap: toRem(spacing['8']) },
      '12': { gap: toRem(spacing['12']) },
      '16': { gap: toRem(spacing['16']) },
      '24': { gap: toRem(spacing['24']) },
      '32': { gap: toRem(spacing['32']) },
      '48': { gap: toRem(spacing['48']) },
      '64': { gap: toRem(spacing['64']) },
    },
    columnGap: {
      '0': { columnGap: 0 },
      '4': { columnGap: toRem(spacing['4']) },
      '8': { columnGap: toRem(spacing['8']) },
      '12': { columnGap: toRem(spacing['12']) },
      '16': { columnGap: toRem(spacing['16']) },
      '24': { columnGap: toRem(spacing['24']) },
      '32': { columnGap: toRem(spacing['32']) },
      '48': { columnGap: toRem(spacing['48']) },
      '64': { columnGap: toRem(spacing['64']) },
    },
    rowGap: {
      '0': { rowGap: 0 },
      '4': { rowGap: toRem(spacing['4']) },
      '8': { rowGap: toRem(spacing['8']) },
      '12': { rowGap: toRem(spacing['12']) },
      '16': { rowGap: toRem(spacing['16']) },
      '24': { rowGap: toRem(spacing['24']) },
      '32': { rowGap: toRem(spacing['32']) },
      '48': { rowGap: toRem(spacing['48']) },
      '64': { rowGap: toRem(spacing['64']) },
    },
    autoFlow: {
      row: { gridAutoFlow: 'row' },
      column: { gridAutoFlow: 'column' },
      'row-dense': { gridAutoFlow: 'row dense' },
      'column-dense': { gridAutoFlow: 'column dense' },
    },
    align: {
      start: { alignItems: 'start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      start: { justifyContent: 'start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'end' },
      stretch: { justifyContent: 'stretch' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
  },

  defaultVariants: {
    columns: '1',
    align: 'stretch',
    justify: 'start',
    autoFlow: 'row',
  },
});
