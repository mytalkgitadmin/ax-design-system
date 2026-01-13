import { style } from '@vanilla-extract/css';

import { spacing } from '../../../tokens';
import { toRem } from '../../../tokens/dev/helpers/units';
import { media } from '../../../utils/media';

export const pageContainer = style({
  maxWidth: '1200px',
  width: 'calc(100% - 40px)',
  margin: '0 auto',
  fontFamily: 'system-ui, -apple-system, sans-serif',

  [media.down('md')]: {
    width: 'calc(100% - 32px)',
  },
});

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: '68fr 48fr',
  gap: toRem(spacing[32]),

  [media.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: toRem(spacing[24]),
  },
});

export const imageSection = style({
  [media.down('md')]: {
    order: 1,
  },
});

export const infoSection = style({
  // 데스크탑에서 스티키 적용
  position: 'sticky',
  top: '36px',
  alignSelf: 'flex-start', // Grid 내에서 상단 정렬
  maxHeight: '100vh', // 뷰포트 높이를 넘지 않도록

  [media.down('md')]: {
    // 모바일에서는 스티키 해제
    position: 'static',
    maxHeight: 'none',
    overflowY: 'visible',
    order: 2,
  },
});

export const desktopOnly = style({
  [media.down('md')]: {
    display: 'none',
  },
});

export const mobileOnly = style({
  display: 'none',

  [media.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const purchaseSection = style({
  [media.down('md')]: {
    // 모바일에서는 StickyPurchaseBar를 사용하므로 숨김
    display: 'none',
  },
});

export const contentSection = style({
  [media.down('md')]: {
    gridColumn: '1 / -1',
    order: 3,
    // 스티키 바가 가리지 않도록 하단 패딩 추가
    paddingBottom: toRem(200), // 스티키 바 높이만큼
  },
});

// Breadcrumb wrapper - 모바일에서 가로 스크롤 허용
export const breadcrumbWrapper = style({
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch', // iOS 부드러운 스크롤

  [media.down('md')]: {
    // 스크롤바 숨기기
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE/Edge
    '::-webkit-scrollbar': {
      display: 'none', // Chrome/Safari
    },
  },
});

// Carousel wrapper - 모바일에서 넘치지 않도록
export const carouselWrapper = style({
  width: '100%',
  maxWidth: '100%',

  [media.down('md')]: {
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

// Tabs wrapper - 가로 넘침 방지
export const tabsWrapper = style({
  width: '100%',
  maxWidth: '100%',
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',

  [media.down('md')]: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
