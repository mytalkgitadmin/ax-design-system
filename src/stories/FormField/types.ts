/**
 * FormField 공통 타입 정의
 * Input, Textarea 등 Form 요소에서 공통으로 사용하는 타입들
 */

// Form 요소 크기
export type FormFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Form 요소 상태
export type FormFieldStatus = 'help' | 'success' | 'warn' | 'error';

// Form 요소 컬러 프리셋 (Input/Textarea는 단일 컬러 스킴 사용)
export type FormFieldColorPreset = 'primary';

// 시맨틱 프리셋 또는 커스텀 컬러 값(hex, rgb)
export type FormFieldColor = FormFieldColorPreset | string;

// 컬러 스킴 (테마에서 사용)
export type FormFieldColorScheme = {
  default: string;
  hover: string;
  focus: string;
  focusShadow: string;
  error: string;
};

/**
 * FormLabel Props
 */
export type FormLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hiddenLabel?: boolean;
  size?: FormFieldSize;
  className?: string; // 커스텀 스타일을 위한 className
};

/**
 * FormStatus Props
 */
export type FormStatusProps = {
  status?: FormFieldStatus;
  message?: string;
  showIcon?: boolean;
  className?: string; // 커스텀 스타일을 위한 className
};

/**
 * FormField 공통 Props (다른 Form 컴포넌트에서 확장)
 */
export type BaseFormFieldProps = {
  // Appearance
  size?: FormFieldSize;
  color?: FormFieldColor;
  full?: boolean;

  // Label
  label: string; // 접근성을 위해 필수
  hiddenLabel?: boolean;
  required?: boolean;

  // Status
  status?: FormFieldStatus;
  statusMessage?: string;
  showStatusIcon?: boolean;

  // State
  disabled?: boolean;
  error?: boolean;

  // HTML Attributes
  name?: string;
  id?: string;
  placeholder?: string;
};
