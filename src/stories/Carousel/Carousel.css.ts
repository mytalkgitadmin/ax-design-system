import { createVar, globalStyle, style } from '@vanilla-extract/css';

import { color, spacing, toRem } from '../../tokens';

// CSS Variables
export const carouselVars = {
  buttonBgColor: createVar(),
  buttonTextColor: createVar(),
  buttonHoverBgColor: createVar(),
  thumbnailActiveBorderColor: createVar(),
  paginationBulletColor: createVar(),
  paginationBulletActiveColor: createVar(),
  borderRadius: createVar(),
  focusShadowColor: createVar(), // Added
  focusOutlineColor: createVar(), // Added
};

// Swiper Pagination 커스터마이징
globalStyle('.swiper-pagination-bullet', {
  backgroundColor: carouselVars.paginationBulletColor,
  opacity: 1,
});

globalStyle('.swiper-pagination-bullet-active', {
  backgroundColor: carouselVars.paginationBulletActiveColor,
});

// 썸네일 Swiper 전용 클래스
export const thumbsSwiper = style({});

// 썸네일 이미지 기본 스타일 (Layout Shift 방지용)
globalStyle(`${thumbsSwiper} .swiper-slide img`, {
  border: '2px solid transparent',
  boxSizing: 'border-box',
  display: 'block', // 이미지 하단 여백 제거
  cursor: 'pointer',
});

// Swiper Thumbs - 활성화된 슬라이드 스타일
globalStyle(`${thumbsSwiper} .swiper-slide-thumb-active img`, {
  borderColor: carouselVars.thumbnailActiveBorderColor,
});

// 드래그 선택 방지
globalStyle('.swiper-slide', {
  userSelect: 'none',
});

globalStyle('.swiper-slide img', {
  userSelect: 'none',
  // @ts-expect-error - WebkitUserDrag is a non-standard property
  WebkitUserDrag: 'none',
});

// 메인 이미지 래퍼 (네비게이션 버튼 포함)
export const navigationWrapper = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: carouselVars.borderRadius,
});

// 커스텀 네비게이션 버튼
export const navButton = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  width: toRem(40),
  height: toRem(40),
  borderRadius: '50%',
  backgroundColor: 'transparent', // 배경 제거
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  // boxShadow 제거
  opacity: 1, // 모바일 기본값: 항상 보임
  color: '#333', // 기본 아이콘 색상

  // Hover 가능한 장비(데스크탑)에서는 기본적으로 숨김
  '@media': {
    '(hover: hover)': {
      opacity: 0,
    },
  },

  selectors: {
    '&:hover': {
      color: carouselVars.thumbnailActiveBorderColor,
    },
    '&:focus-visible': {
      opacity: 1,
      color: carouselVars.thumbnailActiveBorderColor,
      outline: `1px solid ${color.alpha.white100}`,
      boxShadow: `0 0 0 2px ${carouselVars.focusOutlineColor}, 0 0 5px 2px ${carouselVars.focusShadowColor}`,
    },
    '&.swiper-button-disabled, &:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      color: '#333', // Disabled 상태에서는 색상 변경 방지
    },
  },
});

// 데스크탑에서 래퍼에 마우스 올렸을 때 버튼 표시
globalStyle(`${navigationWrapper}:hover ${navButton}`, {
  '@media': {
    '(hover: hover)': {
      opacity: 1,
    },
  },
});

// Disabled 상태일 때는 Hover 되어도 흐릿하게 표시
globalStyle(
  `${navigationWrapper}:hover ${navButton}.swiper-button-disabled, ${navigationWrapper}:hover ${navButton}:disabled`,
  {
    '@media': {
      '(hover: hover)': {
        opacity: 0.3,
      },
    },
  }
);

// 접근성: 키보드 포커스가 캐러셀 내부에 있을 때 항상 버튼 표시
globalStyle(`${navigationWrapper}:focus-within ${navButton}`, {
  opacity: 1,
});

// 접근성 + Disabled
globalStyle(
  `${navigationWrapper}:focus-within ${navButton}.swiper-button-disabled, ${navigationWrapper}:focus-within ${navButton}:disabled`,
  {
    opacity: 0.3,
  }
);

export const navButtonPrev = style({
  left: spacing[4],
});

export const navButtonNext = style({
  right: spacing[4],
});
