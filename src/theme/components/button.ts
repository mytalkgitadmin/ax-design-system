/**
 * Button 컴포넌트 테마
 * Button의 기본 동작과 스타일 정책을 정의
 *
 * 모든 컬러는 global color theme을 참조합니다.
 */

import { rounded } from '../../tokens';
import { colorTheme } from '../global/color';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'solid' | 'outline';

/**
 * 컬러 스킴 정의
 * default: 기본 상태
 * hover: 마우스 오버 상태
 * active: 클릭/활성화 상태
 * text: 텍스트 색상
 */
export type ColorScheme = {
  default: string;
  hover: string;
  active: string;
  text: string;
};

export type ButtonTheme = {
  defaultSize: ButtonSize;
  defaultVariant: ButtonVariant;
  radius?: number; // undefined면 global.radius.sm 사용
  fontWeight?: number; // undefined면 global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: ColorScheme;
    secondary: ColorScheme;
  };
};

export const buttonTheme: ButtonTheme = {
  defaultSize: 'md',
  defaultVariant: 'solid',
  radius: rounded.sm, // 기본값: sm (8px)
  // fontWeight: undefined, // global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: {
      default: colorTheme.brand.default, // #4f7cff
      hover: colorTheme.brand.hover, // #355fea (원래 #2747be였는데 일관성을 위해 변경)
      active: colorTheme.brand.active, // #1a318b
      text: colorTheme.text.inverse, // #ffffff
    },
    secondary: {
      default: colorTheme.bg.gray, // #edf0f5
      hover: colorTheme.bg.grayStrong, // #e3e6ee
      active: colorTheme.bg.grayStrongest, // #c5c9d3
      text: colorTheme.text.secondary, // #697180
    },
  },
};
