import { ReactNode } from 'react';

import { ButtonProps } from '../Button';
import { IconType } from '../Icon';

export type ErrorProps = {
  /**
   * 커스텀 아이콘 이름
   * @default "CircleError"
   */
  iconName?: IconType;
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
