/**
 * FormField - Form 요소 공통 컴포넌트 및 유틸리티
 *
 * Input, Textarea 등의 Form 요소에서 공통으로 사용하는
 * Label, Status Message, Hook 등을 제공합니다.
 */

// Components
export { FormLabel } from './FormLabel';
export { FormStatus } from './FormStatus';

// Hooks & Utils
export { generateFieldId, useFormField } from './useFormField';

// Types
export type {
  BaseFormFieldProps,
  FormFieldColor,
  FormFieldColorPreset,
  FormFieldColorScheme,
  FormFieldSize,
  FormFieldStatus,
  FormLabelProps,
  FormStatusProps,
} from './types';

// CSS Styles (필요한 경우 직접 import 가능)
export {
  errorTextStyle,
  formFieldVars,
  helperTextStyle,
  labelStyle,
  requiredMark,
  srOnly,
  successTextStyle,
  warnTextStyle,
} from './FormField.css';
