// Select types
import { FormFieldStatus } from '../FormField';
import { IconType } from '../Icon';

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SelectRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SelectPlacement = 'bottom' | 'top';

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type SelectColorPreset = 'primary' | 'secondary';
export type SelectColor = SelectColorPreset | string;

export type SelectColorScheme = {
  default: string;
  hover: string;
  focus: string;
  focusShadow: string;
  error: string;
};

// Select Option 타입
export type SelectOption = {
  /** 옵션 값 */
  value: string | number;
  /** 옵션 레이블 (화면에 표시되는 텍스트) */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 옵션 아이콘 */
  icon?: IconType;
  /** 옵션 썸네일 이미지 URL */
  thumbnail?: string;
};

export type SelectProps = {
  // Appearance
  /** 컴포넌트 크기 */
  size?: SelectSize;
  /** 컴포넌트 색상 테마 */
  color?: SelectColor;
  /** 전체 너비 사용 여부 */
  full?: boolean;
  /** 테마 설정을 덮어쓰기 위한 rounded 옵션 */
  rounded?: SelectRounded;

  // Label & Description
  /** 접근성을 위해 필수값 */
  label?: string;
  /** true일 경우 시각적으로만 숨김 (스크린 리더에서는 읽힘) */
  hiddenLabel?: boolean;
  /** 레이블 표시 여부 */
  showLabel?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 설명 텍스트 */
  description?: string;
  /** 설명 텍스트 표시 여부 */
  showDescription?: boolean;

  // Status & Message
  /** 입력 상태 (help, success, warn, error) */
  status?: FormFieldStatus;
  /** 상태 메시지 */
  statusMessage?: string;
  /** 상태 아이콘 표시 여부 (기본: false) */
  showStatusIcon?: boolean;

  // Icons
  /** 왼쪽 아이콘 (leading icon) */
  leadingIcon?: IconType;
  /** 오른쪽 아이콘 (trailing icon, caret 이전) */
  trailingIcon?: IconType;
  /** caret 아이콘 표시 여부 (기본: true) */
  showCaret?: boolean;

  // Dropdown
  /** 드롭다운 열림/닫힘 상태 */
  expanded?: boolean;
  /** 드롭다운 위치 (기본: 'bottom') */
  placement?: SelectPlacement;
  /** 옵션 목록 */
  options: SelectOption[];

  // State
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;

  // HTML Select Props
  /** placeholder 텍스트 */
  text?: string;
  /** 선택된 값 */
  value?: string | number;
  /** 기본 선택 값 (비제어 컴포넌트) */
  defaultValue?: string | number;
  /** name 속성 */
  name?: string;
  /** id 속성 */
  id?: string;

  // Event Handlers
  /** 값 변경 핸들러 */
  onChange?: (value: string | number) => void;
  /** 드롭다운 열기/닫기 핸들러 */
  onToggle?: (isOpen: boolean) => void;
  /** 포커스 핸들러 */
  onFocus?: () => void;
  /** 블러 핸들러 */
  onBlur?: () => void;
};

// Storybook을 위한 options 배열
export const SELECT_SIZES: SelectSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const SELECT_COLOR_PRESETS: SelectColorPreset[] = [
  'primary',
  'secondary',
];
export const SELECT_ROUNDED: SelectRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
export const SELECT_PLACEMENTS: SelectPlacement[] = ['bottom', 'top'];
