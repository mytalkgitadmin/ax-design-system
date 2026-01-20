/**
 * Badge 컴포넌트 테마
 * Badge의 기본 동작과 스타일 정책을 정의
 */

import { rounded } from '../../tokens';

export type BadgeTheme = {
  radius?: number; // undefined면 기본값 사용
};

export const badgeTheme: BadgeTheme = {
  radius: rounded.xs, // 기본값: xs (6px)
};
