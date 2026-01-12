/**
 * Button 컴포넌트 테마
 * Button의 기본 동작과 스타일 정책을 정의
 *
 * 모든 컬러는 global color theme을 참조합니다.
 */

import { color, rounded } from '../../tokens';
import { colorTheme } from '../global/color';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

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

/**
 * Ghost 버튼 컬러 스킴
 * textDefault, textHover, textActive: 텍스트 색상 상태별
 * bgHover, bgActive: 배경 색상 (기본은 transparent)
 */
export type GhostColorScheme = {
  textDefault: string;
  textHover: string;
  textActive: string;
  bgHover: string;
  bgActive: string;
};

export type ButtonTheme = {
  defaultSize: ButtonSize;
  defaultVariant: ButtonVariant;
  radius?: number; // undefined면 global.radius.sm 사용
  fontWeight?: number; // undefined면 global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: ColorScheme;
    secondary: ColorScheme;
    tertiary: ColorScheme;
  };

  // Ghost variant 별도 관리
  ghostSchemes: {
    primary: GhostColorScheme;
    secondary: GhostColorScheme;
  };
};

export const buttonTheme: ButtonTheme = {
  defaultSize: 'md',
  defaultVariant: 'solid',
  radius: rounded.sm, // 기본값: sm (8px)
  // fontWeight: undefined, // global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: {
      default: colorTheme.brand.default,
      hover: colorTheme.brand.stronger,
      active: colorTheme.brand.strongest,
      text: colorTheme.text.inverse,
    },
    secondary: {
      default: color.bg.darkgray,
      hover: color.bg.darkgraySoft,
      active: color.bg.darkgrayStrong,
      text: color.text.inverse, // #ffffff
    },
    tertiary: {
      default: color.bg.gray,
      hover: color.bg.grayStrong,
      active: color.bg.grayStrongest,
      text: color.text.muted, // outline에서 사용
    },
  },

  // Ghost 버튼 색상 설정
  ghostSchemes: {
    primary: {
      textDefault: colorTheme.brand.default,
      textHover: colorTheme.brand.stronger,
      textActive: colorTheme.brand.strongest,
      bgHover: colorTheme.brand.soft, // 매우 연한 브랜드 색
      bgActive: colorTheme.brand.subtle, // 연한 브랜드 색
    },
    secondary: {
      textDefault: colorTheme.brand.default,
      textHover: colorTheme.brand.stronger,
      textActive: colorTheme.brand.strongest,
      bgHover: color.bg.gray, // 회색 배경
      bgActive: color.bg.grayStrong, // 진한 회색 배경
    },
  },
};
