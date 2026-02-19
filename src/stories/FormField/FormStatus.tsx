import { spacing } from '../../tokens';
import { Icon } from '../Icon';
import { FormStatusProps } from './types';

import {
  errorTextStyle,
  helperTextStyle,
  successTextStyle,
  warnTextStyle,
} from './FormField.css';

/**
 * 상태별 아이콘 매핑
 */
const statusIcons = {
  help: 'Check' as const,
  success: 'CircleCheckFill' as const,
  warn: 'CircleInfoFill' as const,
  error: 'CircleErrorFill' as const,
};

/**
 * Status 메시지 공통 스타일
 */
const statusMessageStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: spacing[4],
};

/**
 * FormStatus 컴포넌트
 *
 * Form 요소의 상태 메시지를 표시하는 공통 컴포넌트
 *
 * @example
 * ```tsx
 * <FormStatus status="error" message="이메일 형식이 올바르지 않습니다" />
 * ```
 *
 * @example 아이콘과 함께 표시
 * ```tsx
 * <FormStatus
 *   status="success"
 *   message="사용 가능한 이메일입니다"
 *   showIcon
 * />
 * ```
 */
export const FormStatus = ({
  status,
  message,
  showIcon = false,
  className,
}: FormStatusProps) => {
  // status나 message가 없으면 렌더링하지 않음
  if (!status || !message) {
    return null;
  }

  // 상태에 따른 스타일 클래스 선택
  const statusClass = {
    help: helperTextStyle,
    success: successTextStyle,
    warn: warnTextStyle,
    error: errorTextStyle,
  }[status];

  // 최종 className 조합
  const finalClassName = className
    ? `${statusClass} ${className}`
    : statusClass;

  return (
    <div className={finalClassName} style={statusMessageStyle}>
      {/* 아이콘 표시 옵션이 켜져 있으면 아이콘 렌더링 */}
      {showIcon && <Icon name={statusIcons[status]} size={12} />}
      <span>{message}</span>
    </div>
  );
};
