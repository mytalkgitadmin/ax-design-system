// BreadCrumb types
import { IconType } from '../Icon';

/** BreadCrumb 아이템 */
export type BreadCrumbItem = {
  /** 표시할 텍스트 */
  label: string;

  /** 왼쪽 아이콘 */
  leftIcon?: IconType;

  /** 링크 URL */
  href?: string;
};

export type BreadCrumbProps = {
  items: BreadCrumbItem[];
  isEllipsis?: boolean;
};

// 최대 depth 제한
export const MAX_BREADCRUMB_DEPTH = 6;
