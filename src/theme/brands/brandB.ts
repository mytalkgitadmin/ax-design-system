/**
 * Brand B Theme
 * Project B의 브랜드 테마 정의
 */

import { color } from 'storybook/theming';

import { rounded, theme } from '../../tokens';
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
const COLOR_STRONGEST = BRAND_B_COLORS.strongest;

export const brandBTheme = createTheme({
  global: {
    color: {
      brand: {
        default: COLOR_DEFAULT,
        hover: COLOR_HOVER,
        active: COLOR_ACTIVE,
        subtle: COLOR_SUBTLE,
        strong: COLOR_STRONG,
        strongest: COLOR_STRONGEST,
      },
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
          text: color.inverseText,
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
    Text: {
      colorSchemes: {
        brand1: COLOR_DEFAULT, // Brand B의 primary 브랜드 컬러
        brand2: COLOR_SUBTLE, // Brand B의 secondary 브랜드 컬러
      },
    },
  },
});
