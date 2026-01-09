import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, componentSize, spacing } from '../../tokens';
import { fontWeight } from '../../tokens/dev/helpers/typography';
import { toRem } from '../../tokens/dev/helpers/units';

// CSS 변수 정의 - 런타임에 Theme에서 주입됨
const defaultColorVar = createVar();
const hoverColorVar = createVar();
const activeColorVar = createVar();
const textColorVar = createVar();
const fontFamilyVar = createVar();
const fontWeightVar = createVar();
const borderRadiusVar = createVar();
const disabledColorVar = createVar();
const borderColorVar = createVar(); // underlined variant 하단 보더 색상

// Tabs 컨테이너 기본 스타일
const baseTabsContainer = style({
  display: 'flex',
  gap: toRem(spacing['8']), // 탭 간 간격
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
});

// 개별 Tab 버튼 기본 스타일
const baseTabItem = style({
  fontFamily: fontFamilyVar,

  fontWeight: fontWeight.semibold, // 비활성 탭은 normal

  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  transition: 'all 0.2s ease',
  position: 'relative',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',

  // 기본 상태 (비활성 탭 - 회색)
  color: color.text.disabled,

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      color: disabledColorVar,
      opacity: 0.5,
    },
  },
});

// Tabs 컨테이너 스타일 (justify 옵션)
export const tabsContainerStyle = recipe({
  base: baseTabsContainer,

  variants: {
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: {
        justifyContent: 'space-between',

        '& > button': {
          flexBasis: 0,
          flexGrow: 1,
          padding: 0,
        },
      },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    variant: {
      // none: 스타일 없음 (기본 gap만)
      none: {},

      // underlined: 하단 보더 라인 (전체 컨테이너에)
      underlined: {
        boxShadow: `inset 0 -1px ${borderColorVar}`,
        gap: 0,
      },

      // rounded: 배경색 있는 둥근 탭
      rounded: {
        borderRadius: borderRadiusVar,
        gap: toRem(spacing[8]),
      },
    },
  },
});

// 개별 Tab 스타일
export const tabStyle = recipe({
  base: baseTabItem,

  variants: {
    variant: {
      // none: 텍스트만, 활성 시 색상 변경
      none: {
        padding: `${toRem(spacing[8])} ${toRem(spacing[16])}`,
        selectors: {
          '&:hover:not(:disabled)': {
            color: hoverColorVar,
          },
        },
      },

      // underlined: 하단 언더라인 스타일
      underlined: {
        padding: `${toRem(spacing['12'])} ${toRem(spacing['20'])}`,
        color: color.text.primary,
        selectors: {
          '&:hover:not(:disabled)': {
            color: hoverColorVar,
          },
        },
        // 하단 언더라인 효과
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s ease',
        },
      },

      // rounded: 배경색 있는 둥근 버튼
      rounded: {
        borderRadius: borderRadiusVar,
        backgroundColor: 'transparent',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: color.bg.subtle,
          },
        },
      },
    },

    size: {
      sm: {
        height: `${toRem(componentSize.sm.height)}`,
        fontSize: `${toRem(componentSize.sm.fontSize)}`,
      },
      md: {
        height: `${toRem(componentSize.md.height)}`,
        fontSize: `${toRem(componentSize.md.fontSize)}`,
      },
      lg: {
        height: `${toRem(componentSize.lg.height)}`,
        fontSize: `${toRem(componentSize.lg.fontSize)}`,
      },
    },

    // 활성 상태
    active: {
      true: {
        color: activeColorVar,
        fontWeight: fontWeightVar,
      },
    },
  },

  // variant와 active 조합
  compoundVariants: [
    // underlined + active: 하단 라인 표시 (텍스트 색상은 activeColorVar로)
    {
      variants: {
        variant: 'underlined',
        active: true,
      },
      style: {
        selectors: {
          '&::after': {
            backgroundColor: activeColorVar,
          },
        },
      },
    },
    {
      variants: {
        variant: 'none',
        size: 'lg',
      },
      style: {
        padding: `${toRem(spacing[8])} ${toRem(spacing[16])}`,
      },
    },
    {
      variants: {
        variant: 'none',
        size: 'md',
      },
      style: { padding: `${toRem(spacing[4])} ${toRem(spacing[16])}` },
    },
    {
      variants: {
        variant: 'none',
        size: 'sm',
      },
      style: { padding: `${toRem(spacing[8])} ${toRem(spacing[8])}` },
    },
    {
      variants: {
        variant: 'underlined',
        size: 'lg',
      },
      style: {
        padding: `${toRem(spacing[8])} ${toRem(spacing[48])}`,
      },
    },
    {
      variants: {
        variant: 'underlined',
        size: 'md',
      },
      style: { padding: `${toRem(spacing[4])} ${toRem(spacing[8])}` },
    },
    {
      variants: {
        variant: 'underlined',
        size: 'sm',
      },
      style: { padding: `${toRem(spacing[4])} ${toRem(spacing[4])}` },
    },
    // rounded + active: 배경색을 활성 색상으로, 텍스트는 흰색
    {
      variants: {
        variant: 'rounded',
        active: true,
      },
      style: {
        backgroundColor: activeColorVar,
        color: textColorVar, // 활성 시 텍스트 색상 (흰색)
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: activeColorVar,
          },
        },
      },
    },
    {
      variants: {
        variant: 'rounded',
        size: 'lg',
      },
      style: {
        padding: `${toRem(spacing[12])} ${toRem(spacing[20])}`,
      },
    },
    {
      variants: {
        variant: 'rounded',
        size: 'md',
      },
      style: { padding: `${toRem(spacing[12])} ${toRem(spacing[16])}` },
    },
    {
      variants: {
        variant: 'rounded',
        size: 'sm',
      },
      style: { padding: `${toRem(spacing[8])} ${toRem(spacing[12])}` },
    },
  ],
});

// vars 객체 export
export const tabsVars = {
  defaultColor: defaultColorVar,
  hoverColor: hoverColorVar,
  activeColor: activeColorVar,
  textColor: textColorVar,
  fontFamily: fontFamilyVar,
  fontWeight: fontWeightVar,
  borderRadius: borderRadiusVar,
  disabledColor: disabledColorVar,
  borderColor: borderColorVar,
};
