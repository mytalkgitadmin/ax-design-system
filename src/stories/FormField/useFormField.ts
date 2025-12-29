import { useTheme } from '../../theme';
import { FormFieldColor, FormFieldColorScheme, FormFieldSize } from './types';

/**
 * useFormField Hook
 *
 * Form 요소(Input, Textarea 등)에서 공통으로 사용하는 로직을 처리하는 Hook
 *
 * @param size - Form 요소 크기
 * @param color - Form 요소 컬러
 * @param componentType - 컴포넌트 타입 ('Input' 또는 'Textarea')
 * @returns 테마 값들과 계산된 최종 스타일 값들
 *
 * @example
 * ```tsx
 * const { finalSize, finalColorScheme, finalLabelFontSize } =
 *   useFormField('md', 'primary', 'Input');
 * ```
 */
export const useFormField = (
  size?: FormFieldSize,
  color: FormFieldColor = 'primary',
  componentType: 'Input' | 'Textarea' = 'Input'
) => {
  const { global, components } = useTheme();
  const fieldTheme = components[componentType]; // 컴포넌트 타입에 따라 테마 선택

  // 최종 스타일 값 결정 (우선순위: props > component theme > global theme)
  const finalSize = size ?? fieldTheme.defaultSize;
  const finalRadius = fieldTheme.radius ?? global.radius.sm;
  const finalFontWeight =
    fieldTheme.fontWeight ?? global.typography.fontWeight.regular;

  // Label 폰트 크기 기본값 (테마가 없으면 사용)
  const defaultLabelFontSize = {
    xs: global.typography.fontSize.sm,
    sm: global.typography.fontSize.sm,
    md: global.typography.fontSize.md,
    lg: global.typography.fontSize.lg,
    xl: global.typography.fontSize.lg,
  };
  const finalLabelFontSize = fieldTheme.labelFontSize ?? defaultLabelFontSize;

  // 컬러 스킴 결정 - Input/Textarea는 단일 colorScheme 사용
  // color prop이 'primary'가 아닌 경우 커스텀 컬러로 처리
  const finalColorScheme: FormFieldColorScheme =
    color === 'primary'
      ? fieldTheme.colorScheme
      : {
          default: color,
          hover: color,
          focus: color,
          focusShadow: `${color}80`,
          error: global.color.text.negative,
        };

  return {
    global,
    fieldTheme,
    finalSize,
    finalRadius,
    finalFontWeight,
    finalLabelFontSize,
    finalColorScheme,
  };
};

/**
 * Form 요소 ID 생성 유틸리티 함수
 *
 * @param prefix - ID 접두사 (예: 'input', 'textarea')
 * @param id - 사용자가 제공한 ID (있으면 그대로 반환)
 * @returns 생성된 또는 제공된 ID
 *
 * @example
 * ```tsx
 * const inputId = generateFieldId('input', props.id);
 * // props.id가 없으면: 'input-abc123'
 * // props.id가 'email'이면: 'email'
 * ```
 */
export const generateFieldId = (prefix: string, id?: string): string => {
  return id || `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};
