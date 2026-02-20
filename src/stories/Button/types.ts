// Button types
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import {
  COMPONENT_COLOR_PRESETS,
  COMPONENT_ROUNDED,
  COMPONENT_SIZES,
  ComponentColorPreset,
  ComponentRounded,
  ComponentSize,
} from '../../types/component';
import { IconType } from '../Icon';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = ComponentSize;
export type ButtonType = 'button' | 'submit';
export type ButtonRounded = ComponentRounded;

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type ButtonColorPreset = ComponentColorPreset;
export type ButtonColor = ButtonColorPreset | string;

export type ButtonColorScheme = {
  default: string;
  hover: string;
  active: string;
  text: string;
};

// 공통 Props
type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  full?: boolean;
  rounded?: ButtonRounded; // 테마 설정을 덮어쓰기 위한 rounded 옵션

  label?: ReactNode; // children 추가로 인해 optional로 변경
  children?: ReactNode; // children 우선, 없으면 label 사용
  disabled?: boolean;
  loading?: boolean; // 로딩 상태 (spinner 표시 및 disabled 처럼 동작)

  icon?: IconType;
  leftIcon?: IconType;
  rightIcon?: IconType;

  style?: React.CSSProperties;
  className?: string;
};

// 다형성(Polymorphic)을 지원하는 최종 Button Props
export type ButtonProps<T extends ElementType = 'button'> = ButtonBaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps | 'as'>;

// Storybook을 위한 options 배열
export const BUTTON_VARIANTS: ButtonVariant[] = ['solid', 'outline', 'ghost'];
export const BUTTON_SIZES: ButtonSize[] = COMPONENT_SIZES;
export const BUTTON_TYPES: ButtonType[] = ['button', 'submit'];
export const BUTTON_COLOR_PRESETS: ButtonColorPreset[] =
  COMPONENT_COLOR_PRESETS;
export const BUTTON_ROUNDED: ButtonRounded[] = COMPONENT_ROUNDED;
