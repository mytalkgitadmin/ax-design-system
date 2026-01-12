import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, componentSize, font, rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

// Avatar 크기 정의 - componentSize 토큰 사용
export const avatarSizes = {
  xs: {
    size: componentSize.xs.height,
    fontSize: componentSize.xs.fontSize,
    iconSize: componentSize.xs.iconSize,
  },
  sm: {
    size: componentSize.sm.height,
    fontSize: componentSize.sm.fontSize,
    iconSize: componentSize.sm.iconSize,
  },
  md: {
    size: componentSize.md.height,
    fontSize: componentSize.md.fontSize,
    iconSize: componentSize.md.iconSize,
  },
  lg: {
    size: componentSize.lg.height,
    fontSize: componentSize.lg.fontSize,
    iconSize: componentSize.lg.iconSize,
  },
  xl: {
    size: componentSize.xl.height,
    fontSize: componentSize.xl.fontSize,
    iconSize: componentSize.xl.iconSize,
  },
};

// 기본 스타일
const baseAvatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: toRem(rounded.full),
  overflow: 'hidden',
  flexShrink: 0,
  userSelect: 'none',
  position: 'relative',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  boxSizing: 'border-box', // border/box-shadow를 크기에 포함
  lineHeight: 0, // inline-flex의 line-height 영향 제거
  verticalAlign: 'middle',
});

// Interactive 스타일 (클릭 가능한 경우)
export const interactiveAvatar = style({
  cursor: 'pointer',

  ':hover': {
    opacity: 0.8,
    transform: 'scale(1.05)',
  },

  ':active': {
    transform: 'scale(0.95)',
  },
});

// Image 스타일
export const avatarImageStyle = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: toRem(rounded.full),
  boxSizing: 'border-box', // border를 크기에 포함
});

// Recipe로 변형 정의
export const avatarStyle = recipe({
  base: baseAvatar,

  variants: {
    // 크기 변형
    size: {
      xs: {
        width: toRem(avatarSizes.xs.size),
        height: toRem(avatarSizes.xs.size),
        fontSize: toRem(avatarSizes.xs.fontSize),
      },
      sm: {
        width: toRem(avatarSizes.sm.size),
        height: toRem(avatarSizes.sm.size),
        fontSize: toRem(avatarSizes.sm.fontSize),
      },
      md: {
        width: toRem(avatarSizes.md.size),
        height: toRem(avatarSizes.md.size),
        fontSize: toRem(avatarSizes.md.fontSize),
      },
      lg: {
        width: toRem(avatarSizes.lg.size),
        height: toRem(avatarSizes.lg.size),
        fontSize: toRem(avatarSizes.lg.fontSize),
      },
      xl: {
        width: toRem(avatarSizes.xl.size),
        height: toRem(avatarSizes.xl.size),
        fontSize: toRem(avatarSizes.xl.fontSize),
      },
    },

    // 색상 변형 (텍스트 타입에서 사용)
    colorVariant: {
      blue: {
        backgroundColor: color.blue[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      green: {
        backgroundColor: color.green[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      red: {
        backgroundColor: color.red[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      yellow: {
        backgroundColor: color.yellow[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      indigo: {
        backgroundColor: color.indigo[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      pink: {
        backgroundColor: color.pink[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
      gray: {
        backgroundColor: color.gray[400],
        color: color.text.inverse,
        fontWeight: font.weight.semibold,
      },
    },

    // 둥근 모서리 변형
    rounded: {
      none: {
        borderRadius: toRem(rounded.none),
      },
      xs: {
        borderRadius: toRem(rounded.xs),
      },
      sm: {
        borderRadius: toRem(rounded.sm),
      },
      md: {
        borderRadius: toRem(rounded.md),
      },
      lg: {
        borderRadius: toRem(rounded.lg),
      },
      xl: {
        borderRadius: toRem(rounded.xl),
      },
      full: {
        borderRadius: toRem(rounded.full),
      },
    },

    // 타입 변형
    type: {
      empty: {
        backgroundColor: color.bg.gray,
        color: color.icon.muted,
      },
      text: {},
      image: {
        selectors: {
          '&::after': {
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: toRem(rounded.full),
            boxShadow: `inset 0 0 0 1px ${color.border.thumbnail}`,
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    rounded: 'full',
  },
});
