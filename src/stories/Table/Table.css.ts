import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, font, spacing, typography } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

export const tableStyle = style({
  width: '100%',
  borderBottom: `1px solid ${color.divider.soft}`,
});
// 기본 셀 스타일
const baseCellStyle = style({
  textAlign: 'left',
  verticalAlign: 'middle',
  fontSize: toRem(typography.fontSize[13]),
  color: color.text.secondary,
  borderTop: `1px solid ${color.divider.soft}`,
  transition: 'background-color 0.2s ease',
  padding: '1em',
});

// 셀 Recipe (th, td 공통)
export const cellStyle = recipe({
  base: baseCellStyle,

  variants: {
    bgColor: {
      true: {
        backgroundColor: color.bg.subtler,
        fontWeight: 600,
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
    // 정렬
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  },

  defaultVariants: {
    bgColor: false,
    align: 'left',
  },
});

export const captionStyle = style({
  padding: `${toRem(spacing[12])} 0`,
  fontSize: toRem(typography.fontSize[14]),
  fontWeight: font.weight.semibold,
  textAlign: 'left',
  color: color.text.primary,
});
