// Textarea types
import {
  COMPONENT_COLOR_PRESETS,
  COMPONENT_ROUNDED,
  COMPONENT_SIZES,
  ComponentColorPreset,
  ComponentRounded,
  ComponentSize,
  ComponentStatus,
} from '../../types/component';

export type TextareaSize = ComponentSize;
export type TextareaRounded = Exclude<ComponentRounded, 'full'>;

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type TextareaColorPreset = ComponentColorPreset;
export type TextareaColor = TextareaColorPreset | string;

// Textarea 상태 타입
export type TextareaStatus = ComponentStatus;

// 글자수 카운터 위치 타입
export type CharacterCountPosition =
  | 'left' // 외부 왼쪽 (statusMessage 왼쪽)
  | 'right' // 외부 오른쪽 (statusMessage 오른쪽)
  | 'inside-left' // 내부 왼쪽 하단
  | 'inside-right'; // 내부 오른쪽 하단 (기본값)

export type TextareaColorScheme = {
  default: string;
  hover: string;
  focus: string;
  focusShadow: string;
  error: string;
};

import { BaseFormFieldProps } from '../FormField';

export type TextareaProps = BaseFormFieldProps & {
  // Appearance
  rounded?: TextareaRounded; // 테마 설정을 덮어쓰기 위한 rounded 옵션

  // HTML Textarea Props
  value?: string;
  defaultValue?: string;
  rows?: number; // 기본 줄 수 (autoGrow가 false일 때)
  maxLength?: number; // 최대 글자 수
  minLength?: number; // 최소 글자 수

  // Auto-grow 기능
  autoGrow?: boolean; // 자동 확장 기능 활성화
  minRows?: number; // autoGrow 시 최소 줄 수 (기본: 1)
  maxRows?: number; // autoGrow 시 최대 줄 수 (기본: 제한 없음)

  // Character Counter
  showCharacterCount?: boolean; // 글자수 표시 여부
  characterCountPosition?: CharacterCountPosition; // 글자수 위치 (기본: 'inside-right')

  // Style
  style?: React.CSSProperties;
  className?: string;

  // Event Handlers
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

// Storybook을 위한 options 배열
export const TEXTAREA_SIZES: TextareaSize[] = COMPONENT_SIZES;
export const TEXTAREA_COLOR_PRESETS: TextareaColorPreset[] =
  COMPONENT_COLOR_PRESETS;
export const TEXTAREA_ROUNDED: TextareaRounded[] = COMPONENT_ROUNDED.filter(
  (r): r is TextareaRounded => r !== 'full'
);
