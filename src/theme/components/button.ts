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
  bgHover?: string;
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
  radius?: number;
  fontWeight?: number;

  colorSchemes: {
    primary: ColorScheme;
    secondary: ColorScheme;
    tertiary: ColorScheme;
    green: ColorScheme;
    blue: ColorScheme;
    red: ColorScheme;
    yellow: ColorScheme;
  };

  ghostSchemes: {
    primary: GhostColorScheme;
    secondary: GhostColorScheme;
    tertiary: GhostColorScheme;
  };
};

export const buttonTheme: ButtonTheme = {
  defaultSize: 'md',
  defaultVariant: 'solid',
  radius: rounded.sm,

  colorSchemes: {
    primary: {
      default: colorTheme.brand.default,
      hover: colorTheme.brand.stronger,
      active: colorTheme.brand.strongest,
      text: colorTheme.text.inverse,
      bgHover: colorTheme.brand.soft, // Primary hover 배경색
    },
    secondary: {
      default: color.bg.darkgray,
      hover: color.bg.darkgraySoft,
      active: color.bg.darkgrayStrong,
      text: color.text.inverse,
      bgHover: color.bg.gray,
    },
    tertiary: {
      default: color.bg.gray,
      hover: color.bg.grayStrong,
      active: color.bg.grayStrongest,
      text: color.text.muted,
    },
    green: {
      default: color.green[500],
      hover: color.green[600],
      active: color.green[700],
      text: color.base.white,
      bgHover: color.bg.positive,
    },
    blue: {
      default: color.blue[500],
      hover: color.blue[600],
      active: color.blue[700],
      text: color.base.white,
      bgHover: color.blue[100],
    },
    red: {
      default: color.red[500],
      hover: color.red[600],
      active: color.red[700],
      text: color.base.white,
      bgHover: color.bg.negative,
    },
    yellow: {
      default: color.yellow[500],
      hover: color.yellow[600],
      active: color.yellow[700],
      text: color.gray[900],
      bgHover: color.bg.warning,
    },
  },

  ghostSchemes: {
    primary: {
      textDefault: colorTheme.brand.default,
      textHover: colorTheme.brand.stronger,
      textActive: colorTheme.brand.strongest,
      bgHover: colorTheme.brand.soft,
      bgActive: colorTheme.brand.soft,
    },
    secondary: {
      textDefault: color.text.secondary,
      textHover: color.text.primary,
      textActive: color.text.primary,
      bgHover: color.bg.gray,
      bgActive: color.bg.gray,
    },
    tertiary: {
      textDefault: color.text.muted,
      textHover: color.text.tertiary,
      textActive: color.text.tertiary,
      bgHover: color.bg.gray,
      bgActive: color.bg.gray,
    },
  },
};
