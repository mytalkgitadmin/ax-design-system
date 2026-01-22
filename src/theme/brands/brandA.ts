/**
 * Brand A Theme
 * Project A의 브랜드 테마 정의
 */

import { color } from 'storybook/theming';

import { rounded, theme } from '../../tokens';
import { createTheme } from '../createTheme';

/**
 * Brand A 공통 상수
 */
const BRAND_A_COLORS = theme.brand1; // Brand A 컬러 팔레트
const BRAND_A_RADIUS = rounded.none; // 모든 컴포넌트에 적용되는 radius
const FOCUS_SHADOW_OPACITY = '80'; // focus shadow 투명도 (hex)

// 자주 사용되는 컬러 상태값
const COLOR_DEFAULT = BRAND_A_COLORS.default;
const COLOR_HOVER = BRAND_A_COLORS.subtle;
const COLOR_ACTIVE = BRAND_A_COLORS.strong;
const COLOR_SUBTLE = BRAND_A_COLORS.subtle;
const COLOR_STRONG = BRAND_A_COLORS.strong;
const COLOR_STRONGER = BRAND_A_COLORS.stronger;
const COLOR_STRONGEST = BRAND_A_COLORS.strongest;
const COLOR_SOFT = BRAND_A_COLORS.soft;
const COLOR_INVERSE_TEXT = color.inverseText; // 역색 텍스트

export const brandATheme = createTheme({
  global: {
    typography: {
      fontFamily: "'Pretendard', sans-serif",
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
      },
    },
    radius: {
      xxs: BRAND_A_RADIUS,
      xs: BRAND_A_RADIUS,
      sm: BRAND_A_RADIUS,
      md: BRAND_A_RADIUS,
      lg: BRAND_A_RADIUS,
      xl: BRAND_A_RADIUS,
    },
    motion: {
      // Strong Spring Effect (High overshoot)
      hover: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      click: 'scale(0.85)',
      entrance:
        'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transition: {
        fast: '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        normal: '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        slow: '0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      modalType: 'bouncy',
    },
  },
  components: {
    Button: {
      radius: BRAND_A_RADIUS,
      colorSchemes: {
        primary: {
          default: COLOR_DEFAULT,
          hover: COLOR_HOVER,
          active: COLOR_ACTIVE,
          text: COLOR_INVERSE_TEXT,
          bgHover: COLOR_SOFT, // Pagination hover 배경색
        },
      },
    },
    Input: {
      radius: BRAND_A_RADIUS,
      colorScheme: {
        // default, hover, error는 defaultTheme의 global 색상 사용
        focus: COLOR_DEFAULT, // Brand A의 focus 색상
        focusShadow: `${COLOR_DEFAULT}${FOCUS_SHADOW_OPACITY}`, // Brand A의 focus shadow
      },
    },
    Textarea: {
      radius: BRAND_A_RADIUS,
      colorScheme: {
        // default, hover, error는 defaultTheme의 global 색상 사용
        focus: COLOR_DEFAULT, // Brand A의 focus 색상
        focusShadow: `${COLOR_DEFAULT}${FOCUS_SHADOW_OPACITY}`, // Brand A의 focus shadow
      },
    },
    Tabs: {
      radius: BRAND_A_RADIUS,
      colorSchemes: {
        primary: {
          default: COLOR_DEFAULT,
          hover: COLOR_HOVER,
          active: COLOR_DEFAULT,
          text: COLOR_INVERSE_TEXT,
        },
      },
    },
    Text: {
      colorSchemes: {
        brand1: COLOR_DEFAULT, // Brand A의 primary 브랜드 컬러
        brand2: COLOR_SUBTLE, // Brand A의 secondary 브랜드 컬러
      },
    },
    Thumbnail: {
      radius: BRAND_A_RADIUS, // Brand A는 모든 컴포넌트에 rounded.none 적용
    },
    Badge: {
      radius: BRAND_A_RADIUS,
    },
    Checkbox: {
      radius: {
        lg: BRAND_A_RADIUS,
        md: BRAND_A_RADIUS,
      },
    },
    Breadcrumb: {
      focusRadius: BRAND_A_RADIUS,
    },
  },
});
