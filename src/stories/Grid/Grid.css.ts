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
      // 반응형 columns용 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        gridTemplateColumns: 'var(--_gc-base, repeat(1, 1fr))',
        '@media': {
          'screen and (min-width: 640px)': {
            gridTemplateColumns:
              'var(--_gc-sm, var(--_gc-base, repeat(1, 1fr)))',
          },
          'screen and (min-width: 768px)': {
            gridTemplateColumns:
              'var(--_gc-md, var(--_gc-sm, var(--_gc-base, repeat(1, 1fr))))',
          },
          'screen and (min-width: 1024px)': {
            gridTemplateColumns:
              'var(--_gc-lg, var(--_gc-md, var(--_gc-sm, var(--_gc-base, repeat(1, 1fr)))))',
          },
          'screen and (min-width: 1280px)': {
            gridTemplateColumns:
              'var(--_gc-xl, var(--_gc-lg, var(--_gc-md, var(--_gc-sm, var(--_gc-base, repeat(1, 1fr))))))',
          },
        },
      },
    },
    rows: {
      '1': { gridTemplateRows: 'repeat(1, 1fr)' },
      '2': { gridTemplateRows: 'repeat(2, 1fr)' },
      '3': { gridTemplateRows: 'repeat(3, 1fr)' },
      '4': { gridTemplateRows: 'repeat(4, 1fr)' },
      '5': { gridTemplateRows: 'repeat(5, 1fr)' },
      '6': { gridTemplateRows: 'repeat(6, 1fr)' },
      auto: { gridTemplateRows: 'auto' },
      // 반응형 rows 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        gridTemplateRows: 'var(--_gr-base, auto)',
        '@media': {
          'screen and (min-width: 640px)': {
            gridTemplateRows: 'var(--_gr-sm, var(--_gr-base, auto))',
          },
          'screen and (min-width: 768px)': {
            gridTemplateRows:
              'var(--_gr-md, var(--_gr-sm, var(--_gr-base, auto)))',
          },
          'screen and (min-width: 1024px)': {
            gridTemplateRows:
              'var(--_gr-lg, var(--_gr-md, var(--_gr-sm, var(--_gr-base, auto))))',
          },
          'screen and (min-width: 1280px)': {
            gridTemplateRows:
              'var(--_gr-xl, var(--_gr-lg, var(--_gr-md, var(--_gr-sm, var(--_gr-base, auto)))))',
          },
        },
      },
    },
    gap: {
      '0': { gap: 0 },
      '4': { gap: spacing[4] },
      '8': { gap: spacing[8] },
      '12': { gap: spacing[12] },
      '16': { gap: spacing[16] },
      '20': { gap: spacing[20] },
      '24': { gap: spacing[24] },
      '32': { gap: spacing[32] },
      '48': { gap: spacing[48] },
      '64': { gap: spacing[64] },
      // 반응형 gap 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        gap: 'var(--_gg-base, 0)' as unknown as number,
        '@media': {
          'screen and (min-width: 640px)': {
            gap: 'var(--_gg-sm, var(--_gg-base, 0))' as unknown as number,
          },
          'screen and (min-width: 768px)': {
            gap: 'var(--_gg-md, var(--_gg-sm, var(--_gg-base, 0)))' as unknown as number,
          },
          'screen and (min-width: 1024px)': {
            gap: 'var(--_gg-lg, var(--_gg-md, var(--_gg-sm, var(--_gg-base, 0))))' as unknown as number,
          },
          'screen and (min-width: 1280px)': {
            gap: 'var(--_gg-xl, var(--_gg-lg, var(--_gg-md, var(--_gg-sm, var(--_gg-base, 0)))))' as unknown as number,
          },
        },
      },
    },
    columnGap: {
      '0': { columnGap: 0 },
      '4': { columnGap: spacing[4] },
      '8': { columnGap: spacing[8] },
      '12': { columnGap: spacing[12] },
      '16': { columnGap: spacing[16] },
      '20': { columnGap: spacing[20] },
      '24': { columnGap: spacing[24] },
      '32': { columnGap: spacing[32] },
      '48': { columnGap: spacing[48] },
      '64': { columnGap: spacing[64] },
      // 반응형 columnGap 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        columnGap: 'var(--_gcg-base, 0)' as unknown as number,
        '@media': {
          'screen and (min-width: 640px)': {
            columnGap:
              'var(--_gcg-sm, var(--_gcg-base, 0))' as unknown as number,
          },
          'screen and (min-width: 768px)': {
            columnGap:
              'var(--_gcg-md, var(--_gcg-sm, var(--_gcg-base, 0)))' as unknown as number,
          },
          'screen and (min-width: 1024px)': {
            columnGap:
              'var(--_gcg-lg, var(--_gcg-md, var(--_gcg-sm, var(--_gcg-base, 0))))' as unknown as number,
          },
          'screen and (min-width: 1280px)': {
            columnGap:
              'var(--_gcg-xl, var(--_gcg-lg, var(--_gcg-md, var(--_gcg-sm, var(--_gcg-base, 0)))))' as unknown as number,
          },
        },
      },
    },
    rowGap: {
      '0': { rowGap: 0 },
      '4': { rowGap: spacing[4] },
      '8': { rowGap: spacing[8] },
      '12': { rowGap: spacing[12] },
      '16': { rowGap: spacing[16] },
      '20': { rowGap: spacing[20] },
      '24': { rowGap: spacing[24] },
      '32': { rowGap: spacing[32] },
      '48': { rowGap: spacing[48] },
      '64': { rowGap: spacing[64] },
      // 반응형 rowGap 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        rowGap: 'var(--_grg-base, 0)' as unknown as number,
        '@media': {
          'screen and (min-width: 640px)': {
            rowGap: 'var(--_grg-sm, var(--_grg-base, 0))' as unknown as number,
          },
          'screen and (min-width: 768px)': {
            rowGap:
              'var(--_grg-md, var(--_grg-sm, var(--_grg-base, 0)))' as unknown as number,
          },
          'screen and (min-width: 1024px)': {
            rowGap:
              'var(--_grg-lg, var(--_grg-md, var(--_grg-sm, var(--_grg-base, 0))))' as unknown as number,
          },
          'screen and (min-width: 1280px)': {
            rowGap:
              'var(--_grg-xl, var(--_grg-lg, var(--_grg-md, var(--_grg-sm, var(--_grg-base, 0)))))' as unknown as number,
          },
        },
      },
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
    align: 'stretch',
    justify: 'start',
    autoFlow: 'row',
  },
});
