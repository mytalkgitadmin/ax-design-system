import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { color, rounded, shadow, spacing, toRem, zIndex } from '../../tokens';

// 애니메이션
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
});

const scaleOut = keyframes({
  from: { opacity: 1, transform: 'scale(1)' },
  to: { opacity: 0, transform: 'scale(0.95)' },
});

// Brand A: Bouncy (Elastic Pop)
const bounceIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '50%': { opacity: 1, transform: 'scale(1.05)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

// Brand B: Slide Up (Bottom Sheet style)
const slideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(100px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

// Backdrop (오버레이)
export const backdrop = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: color.bg.dim,
  zIndex: zIndex.modal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing[16],
  animation: `${fadeIn} 0.2s ease-out`,

  selectors: {
    '&[data-closing="true"]': {
      animation: `${fadeOut} 0.15s ease-in !important`,
    },
  },
});

// Modal 컨테이너
const baseContainer = style({
  position: 'relative',
  backgroundColor: color.bg.default,
  borderRadius: toRem(rounded.md),
  boxShadow: shadow.overlay,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[24],
  padding: spacing[32],
  maxHeight: '90vh',
  overflowY: 'auto',

  selectors: {
    '&[data-closing="true"]': {
      animation: `${scaleOut} 0.15s ease-in !important`,
    },
  },
});

export const modalContainer = recipe({
  base: baseContainer,

  variants: {
    size: {
      sm: {
        width: '400px',
        maxWidth: '100%',
      },
      md: {
        width: '560px',
        maxWidth: '100%',
      },
      lg: {
        width: '720px',
        maxWidth: '100%',
      },
    },

    viewport: {
      pc: {},
      mobile: {
        width: '100%',
        maxWidth: '100%',
        borderRadius: toRem(rounded.md),
      },
    },

    animation: {
      default: {
        animation: `${scaleIn} 0.2s ease-out`,
      },
      bouncy: {
        animation: `${bounceIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
      },
      slide: {
        animation: `${slideUp} 0.6s cubic-bezier(0.2, 0, 0, 1)`,
      },
    },
  },

  defaultVariants: {
    size: 'md',
    viewport: 'pc',
    animation: 'default',
  },
});

// 닫기 버튼
export const closeButton = style({
  position: 'absolute',
  top: spacing[32],
  right: spacing[32],
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: spacing[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color.icon.secondary,
  transition: 'color 0.2s ease',

  ':hover': {
    color: color.icon.primary,
  },

  ':focus-visible': {
    outline: `2px solid ${color.border.focus}`,
    outlineOffset: '2px',
    borderRadius: toRem(rounded.xxs),
  },
});

// 텍스트 컨테이너
export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[8],
  paddingRight: spacing[48], // 닫기 버튼 공간 확보
});

// 제목
export const title = style({
  fontSize: toRem(20),
  fontWeight: 700,
  lineHeight: 1.2,
  color: color.text.primary,
  margin: 0,
});

// 설명
export const description = style({
  fontSize: toRem(16),
  fontWeight: 400,
  lineHeight: 1.4,
  color: color.text.secondary,
  margin: 0,
});

// 컨텐츠 영역
export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing[16],
});

// 버튼 컨테이너
export const buttonContainer = style({
  display: 'flex',
  gap: spacing[12],
  justifyContent: 'flex-end',
  alignItems: 'center',
});

// showCloseButton이 false일 때 textContainer padding 제거
globalStyle(`${textContainer}[data-no-close-button="true"]`, {
  paddingRight: 0,
});
