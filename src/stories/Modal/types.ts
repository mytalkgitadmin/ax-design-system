import React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';
export type ModalViewport = 'pc' | 'mobile';

export type ModalAction = {
  /** 버튼 레이블 */
  label: string;
  /** 클릭 핸들러 (비동기 지원) */
  onClick: () => void | Promise<void>;
  /** 로딩 상태 */
  loading?: boolean;
};

export type ModalProps = {
  /** Modal 크기 */
  size?: ModalSize;

  /** 뷰포트 타입 */
  viewport?: ModalViewport;

  /** Modal 제목 */
  title: string;

  /** 부가 설명 */
  description?: string;

  /** Modal 컨텐츠 (Dialog에서 사용) */
  children?: React.ReactNode;

  /** Modal 열림/닫힘 상태 */
  open: boolean;

  /** Modal 닫기 핸들러 */
  onClose: () => void;

  /** X 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;

  /** Backdrop 클릭 시 닫기 */
  closeOnBackdropClick?: boolean;

  /** ESC 키로 닫기 */
  closeOnEscapeKey?: boolean;

  /** Primary 액션 버튼 */
  primaryAction?: ModalAction;

  /** Secondary 액션 버튼 */
  secondaryAction?: ModalAction;
};

// Storybook을 위한 상수 배열
export const MODAL_SIZES: ModalSize[] = ['sm', 'md', 'lg'];
export const MODAL_VIEWPORTS: ModalViewport[] = ['pc', 'mobile'];
