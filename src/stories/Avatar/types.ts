// Avatar types
import {
  COMPONENT_ROUNDED,
  COMPONENT_SIZES,
  ComponentRounded,
  ComponentSize,
} from '../../types/component';

import type { ComponentPropsWithoutRef, ElementType } from 'react';

// AvatarSize (xl 제외)
export type AvatarSize = Exclude<ComponentSize, 'xl'>;
export type AvatarType = 'empty' | 'text' | 'image';
export type AvatarRounded = ComponentRounded;

// 기본 Props
type AvatarBaseProps = {
  size?: AvatarSize;
  rounded?: AvatarRounded;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  'aria-label'?: string;
};

// 1. Image 타입: src가 있으면 image로 간주 (alt 필수)
type AvatarImageProps = AvatarBaseProps & {
  type?: 'image'; // 생략 가능 (src가 있으면 자동 감지)
  src: string;
  alt: string; // 웹 접근성 필수
  text?: never;
  name?: string; // 로드 실패 시 fallback용
};

// 2. Text 타입: src 불가, text나 name 필수
type AvatarTextProps = AvatarBaseProps & {
  type?: 'text'; // 생략 가능 (text/name이 있으면 자동 감지)
  src?: never;
  text?: string;
  name?: string;
  alt?: never;
};

// 3. Empty 타입: src, text, name 불가
type AvatarEmptyProps = AvatarBaseProps & {
  type?: 'empty'; // 생략 가능
  src?: never;
  alt?: never;
  text?: never;
  name?: never;
};

type AvatarVariantProps = AvatarImageProps | AvatarTextProps | AvatarEmptyProps;

export type AvatarProps<T extends ElementType = 'div'> = AvatarVariantProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof AvatarVariantProps | 'as'>;

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
export const AVATAR_SIZES: AvatarSize[] = COMPONENT_SIZES.filter(
  (size) => size !== 'xl'
) as AvatarSize[];
export const AVATAR_TYPES: AvatarType[] = ['empty', 'text', 'image'];
export const AVATAR_ROUNDED: AvatarRounded[] = COMPONENT_ROUNDED;
