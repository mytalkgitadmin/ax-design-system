// Button types
import { IconType } from '../Icon';

export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit';
export type ButtonRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export type ButtonColorPreset = 'primary' | 'secondary';
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

  label: string;
  disabled?: boolean;

  icon?: IconType;
  leftIcon?: IconType;
  rightIcon?: IconType;

  style?: React.CSSProperties;
  className?: string;
};

// Button 태그로 렌더링될 때
type ButtonAsButton = ButtonBaseProps & {
  as?: never; // undefined만 허용
  href?: never;
  target?: never;
  type?: ButtonType;
  onClick?: () => void;
};

// a 태그로 렌더링될 때
type ButtonAsLink = ButtonBaseProps & {
  as: 'a';
  href: string; // 필수!
  target?: '_blank' | '_self';
  type?: never; // a 태그에는 type 속성 없음
  onClick?: never; // 링크는 onClick 대신 href 사용
};

// 최종 타입: ButtonAsButton 또는 ButtonAsLink 둘 중 하나
export type ButtonProps = ButtonAsButton | ButtonAsLink;

// Storybook을 위한 options 배열
export const BUTTON_VARIANTS: ButtonVariant[] = ['solid', 'outline'];
export const BUTTON_SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const BUTTON_TYPES: ButtonType[] = ['button', 'submit'];
export const BUTTON_COLOR_PRESETS: ButtonColorPreset[] = [
  'primary',
  'secondary',
];
export const BUTTON_ROUNDED: ButtonRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
