// Icon types - 배열을 먼저 정의하고 타입을 추출하여 중복 제거
export const ICON_TYPES = [
  'tabler:check',
  'tabler:x',
  'tabler:plus',
  'tabler:minus',
  'tabler:arrow-right',
  'tabler:arrow-left',
  'tabler:arrow-up',
  'tabler:search',
  'tabler:settings',
  'tabler:user',
  'tabler:home',
  'tabler:menu',
  'tabler:dots',
  'tabler:edit',
  'tabler:trash',
  'tabler:download',
  'tabler:upload',
  'tabler:tag',
  'tabler:device-laptop',
  'tabler:device-desktop',
  'tabler:heart',
  'tabler:heart-filled',
  'tabler:shopping-cart',
  'tabler:shopping-bag',
  'tabler:share',
  'tabler:message',
  'tabler:message-circle',
  'tabler:mail',
  'tabler:phone',
  'tabler:link',
  'tabler:eye',
  'tabler:eye-off',
  'tabler:alert-circle-filled',
] as const;

// 배열에서 타입을 자동으로 추출
export type IconType = (typeof ICON_TYPES)[number];

// 시맨틱 토큰 이름 또는 커스텀 컬러 값(hex, rgb)을 모두 허용
export const ICON_COLOR_PRESETS = [
  'primary',
  'secondary',
  'warning',
  'success',
  'danger',
] as const;

export type IconColorPreset = (typeof ICON_COLOR_PRESETS)[number];
export type IconColor = IconColorPreset | string;

export type IconProps = {
  /** 아이콘 이름 (tabler 아이콘 사용) */
  name: IconType;
  /** 아이콘 크기 (px) */
  size?: number;
  /** 아이콘 색상 - 시맨틱 토큰(primary, secondary, warning, success, danger) 또는 hex/rgb 값 */
  color?: IconColor;
  /** 추가 클래스명 */
  className?: string;
};
