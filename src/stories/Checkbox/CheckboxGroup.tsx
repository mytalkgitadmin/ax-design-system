import React, { Children, cloneElement, isValidElement, useId } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { Checkbox } from './index';
import { CheckboxGroupProps, CheckboxProps } from './types';

import {
  checkboxGroupContainer,
  checkboxGroupItems,
  checkboxGroupLabel,
  checkboxVars,
} from './Checkbox.css';

export type { CheckboxGroupProps } from './types';

/**
 * CheckboxGroup 컴포넌트
 *
 * 여러 체크박스를 그룹으로 관리하는 컴포넌트입니다.
 * options 배열 또는 children으로 체크박스를 전달할 수 있습니다.
 *
 * @example
 * // options 배열 사용 (권장)
 * ```tsx
 * import { CheckboxGroup } from '@bemily/design-system';
 *
 * const [values, setValues] = useState<string[]>(['option1']);
 *
 * <CheckboxGroup
 *   name="interests"
 *   label="관심사 선택"
 *   value={values}
 *   onChange={setValues}
 *   options={[
 *     { value: 'option1', label: '옵션 1', helpText: '첫 번째 옵션' },
 *     { value: 'option2', label: '옵션 2', helpText: '두 번째 옵션' },
 *     { value: 'option3', label: '옵션 3', disabled: true },
 *   ]}
 * />
 * ```
 *
 * @example
 * // children 패턴 사용
 * ```tsx
 * import { CheckboxGroup, Checkbox } from '@bemily/design-system';
 *
 * const [values, setValues] = useState<string[]>(['option1']);
 *
 * <CheckboxGroup name="interests" label="관심사 선택" value={values} onChange={setValues}>
 *   <Checkbox value="option1" label="옵션 1" />
 *   <Checkbox value="option2" label="옵션 2" />
 *   <Checkbox value="option3" label="옵션 3" />
 * </CheckboxGroup>
 * ```
 *
 * @example
 * // 가로 방향 배치
 * ```tsx
 * <CheckboxGroup
 *   name="options"
 *   value={values}
 *   onChange={setValues}
 *   direction="horizontal"
 *   options={[
 *     { value: 'a', label: '옵션 A' },
 *     { value: 'b', label: '옵션 B' },
 *     { value: 'c', label: '옵션 C' },
 *   ]}
 * />
 * ```
 */
export const CheckboxGroup = ({
  label,
  size = 'lg',
  name,
  value = [],
  onChange,
  direction = 'vertical',
  options,
  children,
  disabled = false,
  className,
}: CheckboxGroupProps) => {
  const { global } = useTheme();
  const groupId = useId();

  // CSS Variables 주입
  const vars = assignInlineVars({
    [checkboxVars.fontFamily]: global.typography.fontFamily,
    [checkboxVars.fontWeight]: String(global.typography.fontWeight.semibold),
    [checkboxVars.borderRadius]: size === 'lg' ? '8px' : '6px',
    [checkboxVars.primaryColor]: global.color.brand.default,
    [checkboxVars.focusShadowColor]: global.color.brand.subtle,
    [checkboxVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
    [checkboxVars.borderDefault]: global.color.border.default,
    [checkboxVars.borderStrong]: global.color.border.strong,
    [checkboxVars.bgDisabled]: global.color.bg.disabled,
    [checkboxVars.textPrimary]: global.color.text.primary,
    [checkboxVars.textTertiary]: global.color.text.tertiary,
    [checkboxVars.textDisabled]: global.color.text.disabled,
    [checkboxVars.iconDisabled]: global.color.text.disabled,
  });

  const handleChange = (itemValue: string, checked: boolean) => {
    if (!onChange || disabled) return;

    if (checked) {
      // 체크: 배열에 추가
      onChange([...value, itemValue]);
    } else {
      // 체크 해제: 배열에서 제거
      onChange(value.filter((v) => v !== itemValue));
    }
  };

  // options 사용 시
  const renderFromOptions = () => {
    if (!options) return null;

    return options.map((option, index) => (
      <Checkbox
        key={option.value || index}
        name={name}
        value={option.value}
        label={option.label}
        helpText={option.helpText}
        size={size}
        checked={value.includes(option.value)}
        disabled={disabled || option.disabled}
        onChange={(checked) => handleChange(option.value, checked)}
      />
    ));
  };

  // children 사용 시
  const renderFromChildren = () => {
    if (!children) return null;

    return Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Checkbox) {
        const childElement = child as React.ReactElement<CheckboxProps>;
        const childValue = childElement.props.value || '';
        return cloneElement(childElement, {
          name,
          size: childElement.props.size || size,
          checked: value.includes(childValue),
          disabled: disabled || childElement.props.disabled,
          onChange: (checked: boolean) => handleChange(childValue, checked),
        });
      }
      return child;
    });
  };

  return (
    <div
      className={`${checkboxGroupContainer} ${className || ''}`}
      style={vars}
      role='group'
      aria-labelledby={label ? `${groupId}-label` : undefined}
      aria-disabled={disabled}
    >
      {label && (
        <label id={`${groupId}-label`} className={checkboxGroupLabel}>
          {label}
        </label>
      )}

      <div className={checkboxGroupItems({ direction })}>
        {options ? renderFromOptions() : renderFromChildren()}
      </div>
    </div>
  );
};
