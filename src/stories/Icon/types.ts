import * as Icons from './icons';

// 생성된 아이콘 컴포넌트들의 이름을 자동으로 타입으로 추출
export type IconName = keyof typeof Icons;

// 아이콘 이름 배열 (Storybook controls 등에서 사용)
export const ICON_NAMES = Object.keys(Icons) as IconName[];

// 시맨틱 컬러 프리셋
export const ICON_COLOR_PRESETS = [
  'primary',
  'warning',
  'success',
  'danger',
] as const;

export type IconColorPreset = (typeof ICON_COLOR_PRESETS)[number];
export type IconColor = IconColorPreset | string;

export type IconProps = {
  /** 아이콘 이름 */
  name: IconName;
  /** 아이콘 크기 (px) */
  size?: number;
  /** 아이콘 색상 - 시맨틱 토큰(primary, warning, success, danger) 또는 hex/rgb 값 */
  color?: IconColor;
  /** 추가 클래스명 */
  className?: string;
};

// 편의를 위한 타입 export
export type { IconName as IconType };
