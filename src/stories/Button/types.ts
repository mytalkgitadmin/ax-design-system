// Button types
import { IconType } from '../Icon';

export type ButtonVariant = 'solid' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit';

// 디자인 토큰에서 정의된 색상 타입
export type TokenColor = 'primary' | 'success';

export interface ButtonProps {
  /** 왼쪽 아이콘 */
  leftIcon?: IconType;
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼 색상 (토큰 이름 또는 HEX/RGB 값) */
  color?: TokenColor | string;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 버튼 타입 */
  type?: ButtonType;
  /** 버튼 텍스트 */
  label: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 전체 너비 사용 여부 */
  full?: boolean;
}
