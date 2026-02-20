import { IconType } from '../Icon';

import type { ElementType } from 'react';

/** BreadCrumb 아이템 */
export type BreadCrumbItem = {
  /** 표시할 텍스트 */
  label: string;

  /** 왼쪽 아이콘 */
  leftIcon?: IconType;

  /** 링크 URL */
  href?: string;

  /** 다형성 지원: 렌더링할 태그 / 컴포넌트 */
  as?: ElementType;

  /** 기타 추가 prop (Link 컴포넌트용 등) */
  [key: string]: unknown;
};

export type BreadCrumbProps = {
  items: BreadCrumbItem[];
  isEllipsis?: boolean;
};

// 최대 depth 제한
export const MAX_BREADCRUMB_DEPTH = 6;
