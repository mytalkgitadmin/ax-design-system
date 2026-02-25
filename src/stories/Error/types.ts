import { ReactNode } from 'react';

import { ButtonProps } from '../Button';
import { IconType } from '../Icon';

export type ErrorProps = {
  /**
   * 커스텀 아이콘 이름
   * (생략 시 아이콘이 영역에서 제거됨)
   */
  icon?: IconType;
  /**
   * 컴포넌트 전체 크기
   * - sm: 기본 크기 (기존)
   * - md: 중간 크기
   * - lg: 큰 크기
   * @default "sm"
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 커스텀 아이콘 색상
   * @default color.icon.primary
   */
  iconColor?: string;
  /**
   * 아이콘 크기 (size 속성보다 우선 적용됨)
   * 생략 시 size 속성에 따라 자동 결정됨 (sm: 48, md: 64, lg: 80)
   */
  iconSize?: number;
  /**
   * 에러 제목
   * @default "서비스 이용이 원활하지 않아요"
   */
  title?: ReactNode;
  /**
   * 에러 설명
   * @default "불편을 드려 죄송해요.\n잠시 후에 다시 시도해 주세요."
   */
  description?: ReactNode;
  /**
   * 버튼 텍스트
   * @default "다시 시도하기"
   */
  buttonText?: string;
  /**
   * 버튼 클릭 핸들러 (buttonProps.onClick과 동일하게 동작)
   */
  onRetry?: () => void;
  /**
   * 추가적인 버튼 속성 (size, variant, color, onClick 등)
   */
  buttonProps?: Omit<ButtonProps, 'children'>;
  /**
   * 추가 클래스명
   */
  className?: string;
};
