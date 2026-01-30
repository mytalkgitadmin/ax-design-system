// Input types
import {
  COMPONENT_COLOR_PRESETS,
  COMPONENT_ROUNDED,
  COMPONENT_SIZES,
  ComponentColorPreset,
  ComponentRounded,
  ComponentSize,
  ComponentStatus,
} from '../../types/component';
import { IconType } from '../Icon';

export type InputSize = ComponentSize;
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'number'
  | 'search';
export type InputVariant = 'outline' | 'underline';
export type InputRounded = Exclude<ComponentRounded, 'full'>;

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type InputColorPreset = ComponentColorPreset;
export type InputColor = InputColorPreset | string;

// Input 상태 타입
export type InputStatus = ComponentStatus;

export type InputColorScheme = {
  default: string;
  hover: string;
  focus: string;
  focusShadow: string;
  error: string;
};

import { BaseFormFieldProps } from '../FormField';

export type InputProps = BaseFormFieldProps & {
  // Appearance
  variant?: InputVariant; // outline(전체 테두리) 또는 underline(하단 테두리만)
  rounded?: InputRounded; // 테마 설정을 덮어쓰기 위한 rounded 옵션

  // Icons
  leftIcon?: IconType | React.ReactNode;
  rightIcon?: IconType | React.ReactNode;
  onLeftIconClick?: () => void; // leftIcon 클릭 핸들러
  onRightIconClick?: () => void; // rightIcon 클릭 핸들러

  // HTML Input Props
  type?: InputType;
  value?: string | number;
  defaultValue?: string | number;
  min?: number;
  max?: number;

  // Style
  textAlign?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
  className?: string;

  // Event Handlers
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

// Storybook을 위한 options 배열
export const INPUT_SIZES: InputSize[] = COMPONENT_SIZES;
export const INPUT_TYPES: InputType[] = [
  'text',
  'password',
  'email',
  'tel',
  'number',
  'search',
];
export const INPUT_VARIANTS: InputVariant[] = ['outline', 'underline'];
export const INPUT_COLOR_PRESETS: InputColorPreset[] = COMPONENT_COLOR_PRESETS;
export const INPUT_ROUNDED: InputRounded[] = COMPONENT_ROUNDED.filter(
  (r): r is InputRounded => r !== 'full'
);
