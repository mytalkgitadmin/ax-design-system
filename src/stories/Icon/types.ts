// Icon types
export type IconType =
  | 'tabler:check'
  | 'tabler:x'
  | 'tabler:plus'
  | 'tabler:minus'
  | 'tabler:arrow-right'
  | 'tabler:arrow-left'
  | 'tabler:search'
  | 'tabler:settings'
  | 'tabler:user'
  | 'tabler:home'
  | 'tabler:menu'
  | 'tabler:dots'
  | 'tabler:edit'
  | 'tabler:trash'
  | 'tabler:download'
  | 'tabler:upload';

export interface IconProps {
  /** 아이콘 이름 (tabler 아이콘 사용) */
  name: IconType;
  /** 아이콘 크기 (px) */
  size?: number;
  /** 아이콘 색상 */
  color?: string;
  /** 추가 클래스명 */
  className?: string;
}
