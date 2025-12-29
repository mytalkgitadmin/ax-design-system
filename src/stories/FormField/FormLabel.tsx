import { FormLabelProps } from './types';

import { labelStyle, requiredMark, srOnly } from './FormField.css';

/**
 * FormLabel 컴포넌트
 *
 * Form 요소(Input, Textarea 등)의 레이블을 렌더링하는 공통 컴포넌트
 *
 * @example
 * ```tsx
 * <FormLabel htmlFor="email" required size="md">
 *   이메일
 * </FormLabel>
 * ```
 *
 * @example 시각적으로 숨김 (접근성 유지)
 * ```tsx
 * <FormLabel htmlFor="email" hiddenLabel>
 *   이메일
 * </FormLabel>
 * ```
 */
export const FormLabel = ({
  htmlFor,
  children,
  required = false,
  hiddenLabel = false,
  size = 'md',
  className,
}: FormLabelProps) => {
  // hiddenLabel이 true면 시각적으로만 숨김 (스크린 리더에서는 읽힘)
  const labelClassName = hiddenLabel
    ? srOnly
    : `${labelStyle({ size })} ${className || ''}`;

  return (
    <label htmlFor={htmlFor} className={labelClassName}>
      {children}
      {/* 필수 표시는 hiddenLabel이 아닐 때만 표시 */}
      {required && !hiddenLabel && <span className={requiredMark}>*</span>}
    </label>
  );
};
