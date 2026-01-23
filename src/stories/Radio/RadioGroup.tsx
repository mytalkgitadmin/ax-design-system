import React, { Children, cloneElement, isValidElement, useId } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { Radio } from './index';
import { RadioGroupProps, RadioProps } from './types';

import {
  radioGroupContainer,
  radioGroupItems,
  radioGroupLabel,
  radioVars,
  requiredMark,
} from './Radio.css';

export type { RadioGroupProps } from './types';

/**
 * RadioGroup 컴포넌트
 *
 * 여러 라디오 버튼을 그룹으로 관리하는 컴포넌트입니다.
 * options 배열 또는 children으로 라디오 버튼을 전달할 수 있습니다.
 *
 * @example
 * // options 배열 사용 (권장)
 * ```tsx
 * import { RadioGroup } from '@bemily/design-system';
 *
 * const [value, setValue] = useState('option1');
 *
 * <RadioGroup
 *   name="options"
 *   label="옵션 선택"
 *   value={value}
 *   onChange={setValue}
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
 * import { RadioGroup, Radio } from '@bemily/design-system';
 *
 * const [value, setValue] = useState('option1');
 *
 * <RadioGroup name="options" label="옵션 선택" value={value} onChange={setValue}>
 *   <Radio value="option1" label="옵션 1" />
 *   <Radio value="option2" label="옵션 2" />
 *   <Radio value="option3" label="옵션 3" />
 * </RadioGroup>
 * ```
 *
 * @example
 * // 가로 방향 배치
 * ```tsx
 * <RadioGroup
 *   name="options"
 *   value={value}
 *   onChange={setValue}
 *   direction="horizontal"
 *   options={[
 *     { value: 'a', label: '옵션 A' },
 *     { value: 'b', label: '옵션 B' },
 *     { value: 'c', label: '옵션 C' },
 *   ]}
 * />
 * ```
 */
export const RadioGroup = ({
  label,
  size = 'lg',
  name,
  value,
  onChange,
  direction = 'vertical',
  options,
  children,
  disabled = false,
  required = false,
  className,
  style,
}: RadioGroupProps) => {
  const { global } = useTheme();
  const groupId = useId();

  // CSS Variables 주입
  const vars = assignInlineVars({
    [radioVars.fontFamily]: global.typography.fontFamily,
    [radioVars.fontWeight]: String(global.typography.fontWeight.semibold),
    [radioVars.primaryColor]: global.color.brand.default,
    [radioVars.focusShadowColor]: global.color.brand.subtle,
    [radioVars.borderDefault]: global.color.border.default,
    [radioVars.borderStrong]: global.color.border.strong,
    [radioVars.bgDisabled]: global.color.bg.disabled,
    [radioVars.textPrimary]: global.color.text.primary,
    [radioVars.textTertiary]: global.color.text.tertiary,
    [radioVars.textDisabled]: global.color.text.disabled,
    [radioVars.iconDisabled]: global.color.text.disabled,
  });

  const handleChange = (selectedValue: string) => {
    if (onChange && !disabled) {
      onChange(selectedValue);
    }
  };

  // options 사용 시
  const renderFromOptions = () => {
    if (!options) return null;

    return options.map((option, index) => (
      <Radio
        key={option.value || index}
        name={name}
        value={option.value}
        label={option.label}
        helpText={option.helpText}
        size={size}
        checked={value === option.value}
        disabled={disabled || option.disabled}
        onChange={() => handleChange(option.value)}
      />
    ));
  };

  // children 사용 시
  const renderFromChildren = () => {
    if (!children) return null;

    return Children.map(children, (child) => {
      if (isValidElement(child) && child.type === Radio) {
        const childElement = child as React.ReactElement<RadioProps>;
        const childValue = childElement.props.value || '';
        return cloneElement(childElement, {
          name,
          size: childElement.props.size || size,
          checked: value === childValue,
          disabled: disabled || childElement.props.disabled,
          onChange: () => handleChange(childValue),
        });
      }
      return child;
    });
  };

  return (
    <div
      className={`${radioGroupContainer} ${className || ''}`}
      style={{ ...vars, ...style }}
      role='radiogroup'
      aria-labelledby={label ? `${groupId}-label` : undefined}
      aria-disabled={disabled}
    >
      {label && (
        <label id={`${groupId}-label`} className={radioGroupLabel}>
          {label}
          {required && <span className={requiredMark}>*</span>}
        </label>
      )}

      <div className={radioGroupItems({ direction })}>
        {options ? renderFromOptions() : renderFromChildren()}
      </div>
    </div>
  );
};
