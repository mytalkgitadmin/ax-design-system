// Textarea types

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextareaRounded =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type TextareaColorPreset = 'primary' | 'secondary';
export type TextareaColor = TextareaColorPreset | string;

// Textarea 상태 타입
export type TextareaStatus = 'help' | 'success' | 'warn' | 'error';

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

export type TextareaProps = {
  // Appearance
  size?: TextareaSize;
  color?: TextareaColor;
  full?: boolean;
  rounded?: TextareaRounded; // 테마 설정을 덮어쓰기 위한 rounded 옵션

  // Label & Helper Text
  label: string; // 접근성을 위해 필수값
  hiddenLabel?: boolean; // true일 경우 시각적으로만 숨김 (스크린 리더에서는 읽힘)
  required?: boolean;

  // Status & Message
  status?: TextareaStatus; // help, success, warn, error
  statusMessage?: string; // 상태 메시지
  showStatusIcon?: boolean; // 상태 아이콘 표시 여부 (기본: false)

  // State
  disabled?: boolean;
  error?: boolean;

  // HTML Textarea Props
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
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

  // Event Handlers
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

// Storybook을 위한 options 배열
export const TEXTAREA_SIZES: TextareaSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const TEXTAREA_COLOR_PRESETS: TextareaColorPreset[] = [
  'primary',
  'secondary',
];
export const TEXTAREA_ROUNDED: TextareaRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
