import React from 'react';

import { IconType } from '../Icon';

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalAction = {
  /** 버튼 레이블 */
  label: string;
  /** 클릭 핸들러 (비동기 지원) */
  onClick?: () => void | Promise<void>;
  /** 로딩 상태 */
  loading?: boolean;

  // Button 스타일
  /** 버튼 variant */
  variant?: 'solid' | 'outline' | 'ghost';
  /** 버튼 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 버튼 색상 */
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'red';
  /** 버튼 모서리 둥글기 */
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  // 아이콘
  /** 왼쪽 아이콘 */
  leftIcon?: IconType;
  /** 오른쪽 아이콘 */
  rightIcon?: IconType;

  // 상태
  /** 비활성화 상태 */
  disabled?: boolean;

  // 레이아웃
  /** 버튼 너비 비율 (flex-basis) */
  flex?: number;
  /** 전체 너비 버튼 */
  full?: boolean;
};

export type ButtonsAlign = 'left' | 'center' | 'right';
export type ButtonsDirection = 'row' | 'column';

export type ModalProps = {
  /** Modal 크기 */
  size?: ModalSize;

  /** Modal 커스텀 너비 (px 단위 숫자 또는 CSS 문자열) */
  width?: number | string;

  /** 내부 패딩 제거 (외부 콘텐츠가 직접 채울 때 사용) */
  noPadding?: boolean;

  /** Modal 제목 (없으면 헤더 영역 전체 숨김) */
  title?: string;

  /**
   * 스크린리더용 Modal 레이블
   * title이 없는 Modal(커스텀 children만 사용)에서 접근성을 위해 제공합니다.
   * title이 있으면 자동으로 무시됩니다.
   */
  ariaLabel?: string;

  /** 부가 설명 */
  description?: string;

  /** Modal 컨텐츠 (Dialog에서 사용) */
  children?: React.ReactNode;

  /** Modal 열림/닫힘 상태 */
  open: boolean;

  /** Modal 닫기 핸들러 */
  onClose: () => void;

  /** Modal 닫힌 후 실행되는 콜백 (애니메이션 완료 후) */
  afterClose?: () => void;

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

  /** 버튼 정렬 방향 (기본: right) */
  buttonsAlign?: ButtonsAlign;

  /** 버튼 간격 (px, 기본: 12) */
  buttonsGap?: number;

  /** 버튼 방향 (기본: row) */
  buttonsDirection?: ButtonsDirection;
};

// Storybook을 위한 상수 배열
export const MODAL_SIZES: ModalSize[] = ['sm', 'md', 'lg'];
