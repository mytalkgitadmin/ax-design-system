/**
 * Tabs 컴포넌트 테마
 * Tabs의 기본 동작과 스타일 정책을 정의
 *
 * 모든 컬러는 global color theme을 참조합니다.
 */

import { rounded } from '../../tokens';
import { colorTheme } from '../global/color';

export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsVariant = 'none' | 'underlined' | 'rounded';
export type TabsJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * 컬러 스킴 정의
 * default: 기본 상태 (비활성 탭)
 * hover: 마우스 오버 상태
 * active: 활성화된 탭 상태
 * text: 텍스트 색상
 */
export type ColorScheme = {
  default: string;
  hover: string;
  active: string;
  text: string;
};

export type TabsTheme = {
  defaultSize: TabsSize;
  defaultVariant: TabsVariant;
  defaultJustify: TabsJustify;
  radius?: number; // rounded variant 개별 탭의 border radius (기본값: full)
  fontWeight?: number; // undefined면 global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: ColorScheme;
  };
};

export const tabsTheme: TabsTheme = {
  defaultSize: 'md',
  defaultVariant: 'underlined', // 디자인에서 가장 일반적인 스타일
  defaultJustify: 'start', // 왼쪽 정렬이 기본
  radius: rounded.full, // 기본값: full (999px) - rounded variant 개별 탭에 사용
  // fontWeight: undefined, // global.typography.fontWeight.semibold 사용

  colorSchemes: {
    primary: {
      default: colorTheme.text.tertiary, // #888e9c (비활성 탭 텍스트 색상)
      hover: colorTheme.brand.hover, // #355fea (호버 시 텍스트 색상)
      active: colorTheme.brand.default, // #4f7cff (활성 탭 색상: none/underlined은 텍스트, rounded는 배경)
      text: colorTheme.text.inverse, // #ffffff (rounded + active 시 텍스트 색상 - 흰색)
    },
  },
};
