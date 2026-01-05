/**
 * Thumbnail 컴포넌트 테마
 * Thumbnail의 기본 동작과 스타일 정책을 정의
 */

import { rounded } from '../../tokens';

export type ThumbnailRounded =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type ThumbnailTheme = {
  radius?: number;
};

export const thumbnailTheme: ThumbnailTheme = {
  radius: rounded.sm, // 기본값: sm (8px)
};
