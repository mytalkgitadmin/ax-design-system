/**
 * Breadcrumb 컴포넌트 테마
 * Breadcrumb의 기본 동작과 스타일 정책을 정의
 */

import { rounded } from '../../tokens';

export type BreadcrumbTheme = {
  focusRadius?: number; // undefined면 기본값 사용
};

export const breadcrumbTheme: BreadcrumbTheme = {
  focusRadius: rounded.xxs, // 기본값: xxs (4px)
};
