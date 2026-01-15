import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '../../tokens';

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
      '4': { gap: spacing[4] },
      '8': { gap: spacing[8] },
      '12': { gap: spacing[12] },
      '16': { gap: spacing[16] },
      '24': { gap: spacing[24] },
      '32': { gap: spacing[32] },
      '48': { gap: spacing[48] },
      '64': { gap: spacing[64] },
    },
    columnGap: {
      '0': { columnGap: 0 },
      '4': { columnGap: spacing[4] },
      '8': { columnGap: spacing[8] },
      '12': { columnGap: spacing[12] },
      '16': { columnGap: spacing[16] },
      '24': { columnGap: spacing[24] },
      '32': { columnGap: spacing[32] },
      '48': { columnGap: spacing[48] },
      '64': { columnGap: spacing[64] },
    },
    rowGap: {
      '0': { rowGap: 0 },
      '4': { rowGap: spacing[4] },
      '8': { rowGap: spacing[8] },
      '12': { rowGap: spacing[12] },
      '16': { rowGap: spacing[16] },
      '24': { rowGap: spacing[24] },
      '32': { rowGap: spacing[32] },
      '48': { rowGap: spacing[48] },
      '64': { rowGap: spacing[64] },
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
