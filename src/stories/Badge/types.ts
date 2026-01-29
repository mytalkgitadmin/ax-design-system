// Badge types
import { IconType } from '../Icon';

export type BadgeVariant = 'solid' | 'outline' | 'soft';

// solid variant에서만 사용 가능한 색상
export type SolidBadgeColor =
  | 'primary'
  | 'green'
  | 'red'
  | 'yellow'
  | 'muted'
  | 'neutral-emphasis'
  | 'neutral-disabled';

// outline, soft variant에서 사용 가능한 색상
export type OutlineSoftBadgeColor = 'primary' | 'green' | 'red' | 'yellow';

// 모든 색상 타입
export type BadgeColor = SolidBadgeColor | OutlineSoftBadgeColor;

export type BadgeRounded = 'none' | 'xs' | 'md' | 'full';

// variant에 따라 사용 가능한 color를 제한하는 타입
type BadgePropsBase = {
  /** 표시할 텍스트 */
  label: string;

  /** 둥근 모서리 */
  rounded?: BadgeRounded;

  /** 왼쪽 아이콘 */
  leftIcon?: IconType;

  /** 오른쪽 아이콘 */
  rightIcon?: IconType;

  /** 스타일 */
  style?: React.CSSProperties;

  /** 클래스 이름 */
  className?: string;
};

type SolidBadgeProps = BadgePropsBase & {
  /** 스타일 변형 */
  variant?: 'solid';
  /** 배지 색상 */
  color?: SolidBadgeColor;
};

type OutlineSoftBadgeProps = BadgePropsBase & {
  /** 스타일 변형 */
  variant: 'outline' | 'soft';
  /** 배지 색상 */
  color?: OutlineSoftBadgeColor;
};

export type BadgeProps = SolidBadgeProps | OutlineSoftBadgeProps;

// Storybook을 위한 options 배열
export const BADGE_VARIANTS: BadgeVariant[] = ['solid', 'outline', 'soft'];

export const SOLID_BADGE_COLORS: SolidBadgeColor[] = [
  'primary',
  'green',
  'red',
  'yellow',
  'muted',
  'neutral-emphasis',
  'neutral-disabled',
];

export const OUTLINE_SOFT_BADGE_COLORS: OutlineSoftBadgeColor[] = [
  'primary',
  'green',
  'red',
  'yellow',
];

export const BADGE_ROUNDED: BadgeRounded[] = ['none', 'xs', 'md', 'full'];
