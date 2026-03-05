import { recipe } from '@vanilla-extract/recipes';

import { spacing } from '../../tokens';

export const flexStyle = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      'row-reverse': { flexDirection: 'row-reverse' },
      'column-reverse': { flexDirection: 'column-reverse' },
      // 반응형 direction 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        flexDirection: 'var(--_fd-base, row)' as 'row',
        '@media': {
          'screen and (min-width: 640px)': {
            flexDirection: 'var(--_fd-sm, var(--_fd-base, row))' as 'row',
          },
          'screen and (min-width: 768px)': {
            flexDirection:
              'var(--_fd-md, var(--_fd-sm, var(--_fd-base, row)))' as 'row',
          },
          'screen and (min-width: 1024px)': {
            flexDirection:
              'var(--_fd-lg, var(--_fd-md, var(--_fd-sm, var(--_fd-base, row))))' as 'row',
          },
          'screen and (min-width: 1280px)': {
            flexDirection:
              'var(--_fd-xl, var(--_fd-lg, var(--_fd-md, var(--_fd-sm, var(--_fd-base, row)))))' as 'row',
          },
        },
      },
    },
    justify: {
      start: { justifyContent: 'start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    align: {
      start: { alignItems: 'start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'end' },
      stretch: { alignItems: 'stretch' },
    },
    wrap: {
      wrap: { flexWrap: 'wrap' },
      nowrap: { flexWrap: 'nowrap' },
    },
    gap: {
      '0': { gap: 0 },
      '4': { gap: spacing[4] },
      '8': { gap: spacing[8] },
      '12': { gap: spacing[12] },
      '16': { gap: spacing[16] },
      '20': { gap: spacing[20] },
      '24': { gap: spacing[24] },
      '28': { gap: spacing[28] },
      '32': { gap: spacing[32] },
      '48': { gap: spacing[48] },
      '64': { gap: spacing[64] },
      // 반응형 gap 내부 variant — CSS 변수로 외부에서 값 주입
      __responsive: {
        gap: 'var(--_fg-base, 0)' as unknown as number,
        '@media': {
          'screen and (min-width: 640px)': {
            gap: 'var(--_fg-sm, var(--_fg-base, 0))' as unknown as number,
          },
          'screen and (min-width: 768px)': {
            gap: 'var(--_fg-md, var(--_fg-sm, var(--_fg-base, 0)))' as unknown as number,
          },
          'screen and (min-width: 1024px)': {
            gap: 'var(--_fg-lg, var(--_fg-md, var(--_fg-sm, var(--_fg-base, 0))))' as unknown as number,
          },
          'screen and (min-width: 1280px)': {
            gap: 'var(--_fg-xl, var(--_fg-lg, var(--_fg-md, var(--_fg-sm, var(--_fg-base, 0)))))' as unknown as number,
          },
        },
      },
    },
  },

  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
  },
});
