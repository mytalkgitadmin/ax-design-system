// Avatar types

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarType = 'empty' | 'text' | 'image';

export type AvatarRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type AvatarProps = {
  /** Avatar 크기 */
  size?: AvatarSize;

  /** Avatar 타입 */
  type?: AvatarType;

  /** 둥근 모서리 */
  rounded?: AvatarRounded;

  /** 이미지 URL (type='image'일 때 사용) */
  src?: string;

  /** 대체 텍스트 (type='image'일 때 사용) */
  alt?: string;

  /** 표시할 텍스트 (type='text'일 때 사용, 보통 1-2글자) */
  text?: string;

  /** 사용자 이름 (이미지 로드 실패 시 첫 글자를 text로 사용) */
  name?: string;

  /** 클릭 이벤트 핸들러 (Interactive) */
  onClick?: () => void;

  /** 추가 CSS 클래스명 */
  className?: string;

  /** 호버 시 표시할 툴팁 텍스트 */
  title?: string;

  /** 스크린리더용 레이블 */
  'aria-label'?: string;
};

// AvatarGroup types

export type AvatarGroupProps = {
  /** Avatar 데이터 배열 */
  avatars: AvatarProps[];

  /** 최대 표시 개수 (나머지는 +N으로 표시) */
  max?: number;

  /** Avatar 크기 (모든 Avatar에 적용) */
  size?: AvatarSize;

  /** 둥근 모서리 (모든 Avatar에 적용) */
  rounded?: AvatarRounded;

  /** 겹침 간격 (px) */
  spacing?: number;

  /** 테두리 두께 (px) */
  borderWidth?: number;

  /** 테두리 색상 (hex/rgb) */
  borderColor?: string;
};

// Storybook을 위한 options 배열
export const AVATAR_SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const AVATAR_TYPES: AvatarType[] = ['empty', 'text', 'image'];

export const AVATAR_ROUNDED: AvatarRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
