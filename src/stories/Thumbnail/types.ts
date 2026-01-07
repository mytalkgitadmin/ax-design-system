export type ThumbnailRounded =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type ThumbnailProps = {
  /** 이미지 URL (없으면 기본 아이콘 표시) */
  src?: string | null;

  /** 이미지 대체 텍스트 (접근성을 위한 필수 속성) */
  alt?: string;

  /** 썸네일 너비 (단위: em을 위한 계산값, 기본값 80) */
  width?: number;

  /** 배경 색상 */
  color?: 'brand' | 'gray';

  /** 이미지 비율 */
  ratio?: '1' | '16:9' | '1.618:1';

  /** 모서리 둥글기 (테마 설정을 덮어쓰기 위한 옵션) */
  rounded?: ThumbnailRounded;
  style?: React.CSSProperties;
  className?: string;
};

export const THUMBNAIL_ROUNDED: ThumbnailRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
