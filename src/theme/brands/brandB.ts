/**
 * Brand B Theme
 * Project B의 브랜드 테마 정의
 */

import { color as tokenColors, rounded, theme } from '../../tokens';
import { createTheme } from '../createTheme';

/**
 * Brand B 공통 상수
 */
const BRAND_B_COLORS = theme.brand2; // Brand B 컬러 팔레트
const BRAND_B_RADIUS = rounded.lg; // 모든 컴포넌트에 적용되는 radius
const FOCUS_SHADOW_OPACITY = '80'; // focus shadow 투명도 (hex)

// 자주 사용되는 컬러 상태값
const COLOR_DEFAULT = BRAND_B_COLORS.default;
const COLOR_HOVER = BRAND_B_COLORS.subtle;
const COLOR_ACTIVE = BRAND_B_COLORS.strong;
const COLOR_SUBTLE = BRAND_B_COLORS.subtle;
const COLOR_STRONG = BRAND_B_COLORS.strong;
const COLOR_STRONGER = BRAND_B_COLORS.stronger;
const COLOR_STRONGEST = BRAND_B_COLORS.strongest;
const COLOR_SOFT = BRAND_B_COLORS.soft;
const COLOR_BORDER_SOFT = tokenColors.pink['200']; // #fbccef - outline용 연한 테두리

export const brandBTheme = createTheme({
  global: {
    typography: {
      fontFamily: "'GMarketSans', sans-serif",
    },
    color: {
      brand: {
        default: COLOR_DEFAULT,
        hover: COLOR_HOVER,
        active: COLOR_ACTIVE,
        subtle: COLOR_SUBTLE,
        strong: COLOR_STRONG,
        stronger: COLOR_STRONGER,
        strongest: COLOR_STRONGEST,
        soft: COLOR_SOFT,
        borderSoft: COLOR_BORDER_SOFT,
      },
    },
    radius: {
      xxs: BRAND_B_RADIUS,
      xs: BRAND_B_RADIUS,
      sm: BRAND_B_RADIUS,
      md: BRAND_B_RADIUS,
      lg: BRAND_B_RADIUS,
      xl: BRAND_B_RADIUS,
    },
    motion: {
      // Very Slow & Elegant Fade
      hover: 'all 0.8s cubic-bezier(0.2, 0, 0, 1)', // Custom ease-out-expo-ish
      click: 'scale(0.96)',
      entrance:
        'opacity 1.2s cubic-bezier(0.2, 0, 0, 1), transform 1.2s cubic-bezier(0.2, 0, 0, 1)',
      transition: {
        fast: '0.6s cubic-bezier(0.2, 0, 0, 1)',
        normal: '0.9s cubic-bezier(0.2, 0, 0, 1)',
        slow: '1.5s cubic-bezier(0.2, 0, 0, 1)',
      },
      modalType: 'slide',
    },
  },
  components: {
    Button: {
      radius: BRAND_B_RADIUS,
      colorSchemes: {
        primary: {
          default: COLOR_DEFAULT,
          hover: COLOR_HOVER,
          active: COLOR_ACTIVE,
          text: tokenColors.base.white,
          bgHover: COLOR_SOFT, // Pagination hover 배경색
        },
      },
    },
    Input: {
      radius: BRAND_B_RADIUS,
      colorScheme: {
        // default, hover, error는 defaultTheme의 global 색상 사용
        focus: COLOR_DEFAULT, // Brand B의 focus 색상
        focusShadow: `${COLOR_DEFAULT}${FOCUS_SHADOW_OPACITY}`, // Brand B의 focus shadow
      },
    },
    Textarea: {
      radius: BRAND_B_RADIUS,
      colorScheme: {
        // default, hover, error는 defaultTheme의 global 색상 사용
        focus: COLOR_DEFAULT, // Brand B의 focus 색상
        focusShadow: `${COLOR_DEFAULT}${FOCUS_SHADOW_OPACITY}`, // Brand B의 focus shadow
      },
    },
    Tabs: {
      radius: BRAND_B_RADIUS,
      colorSchemes: {
        primary: {
          default: COLOR_DEFAULT,
          hover: COLOR_HOVER,
          active: COLOR_DEFAULT,
          text: tokenColors.base.white,
        },
      },
    },
    Text: {
      colorSchemes: {
        brand1: COLOR_DEFAULT, // Brand B의 primary 브랜드 컬러
        brand2: COLOR_SUBTLE, // Brand B의 secondary 브랜드 컬러
      },
    },
    Thumbnail: {
      radius: BRAND_B_RADIUS, // Brand B는 모든 컴포넌트에 rounded.lg 적용
    },
    Badge: {
      radius: BRAND_B_RADIUS,
    },
    Checkbox: {
      radius: {
        lg: BRAND_B_RADIUS,
        md: BRAND_B_RADIUS,
      },
    },
    Breadcrumb: {
      focusRadius: BRAND_B_RADIUS,
    },
  },
});
