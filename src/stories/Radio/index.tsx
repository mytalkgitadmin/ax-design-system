import React, { useId, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { RadioProps } from './types';

import {
  helpText,
  label,
  radioBox,
  radioContainer,
  radioDot,
  radioInput,
  radioVars,
  textContainer,
} from './Radio.css';

export type { RadioProps } from './types';

/**
 * Radio 컴포넌트
 *
 * 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼 컴포넌트입니다.
 * 일반적으로 RadioGroup과 함께 사용하는 것을 권장합니다.
 *
 * @example
 * // 단독 사용
 * ```tsx
 * import { Radio } from '@bemily/design-system';
 *
 * const [selected, setSelected] = useState('option1');
 *
 * <Radio
 *   name="option"
 *   value="option1"
 *   label="옵션 1"
 *   helpText="라디오 버튼에 대한 부가 설명"
 *   checked={selected === 'option1'}
 *   onChange={() => setSelected('option1')}
 * />
 * ```
 *
 * @example
 * // RadioGroup과 함께 사용 (권장)
 * ```tsx
 * import { RadioGroup } from '@bemily/design-system';
 *
 * const [value, setValue] = useState('option1');
 *
 * <RadioGroup
 *   name="options"
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { value: 'option1', label: '옵션 1' },
 *     { value: 'option2', label: '옵션 2' },
 *   ]}
 * />
 * ```
 */
export const Radio = ({
  size = 'lg',
  checked,
  defaultChecked = false,
  disabled = false,
  labelPlacement = 'start',
  label: labelText,
  helpText: helpTextContent,
  onChange,
  id,
  name,
  value,
  className,
}: RadioProps) => {
  const { global } = useTheme();
  const generatedId = useId();
  const radioId = id || generatedId;

  // 제어/비제어 컴포넌트 판단
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const currentChecked = isControlled ? checked : internalChecked;

  // 라디오 버튼 상태 변경 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newChecked = event.target.checked;

    // 비제어 컴포넌트인 경우 내부 상태 업데이트
    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    // onChange 콜백 호출
    if (onChange) {
      onChange(newChecked);
    }
  };

  // CSS Variables 주입
  const vars = assignInlineVars({
    [radioVars.fontFamily]: global.typography.fontFamily,
    [radioVars.fontWeight]: String(global.typography.fontWeight.semibold),
    [radioVars.primaryColor]: global.color.brand.default,
    [radioVars.focusShadowColor]: global.color.brand.subtle,
    [radioVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
    [radioVars.borderDefault]: global.color.border.default,
    [radioVars.borderStrong]: global.color.border.strong,
    [radioVars.bgDisabled]: global.color.bg.disabled,
    [radioVars.textPrimary]: global.color.text.primary,
    [radioVars.textTertiary]: global.color.text.tertiary,
    [radioVars.textDisabled]: global.color.text.disabled,
    [radioVars.iconDisabled]: global.color.text.disabled,
  });

  return (
    <label
      htmlFor={radioId}
      className={`${radioContainer({ labelPlacement })} ${className || ''}`}
      style={vars}
    >
      <input
        type='radio'
        id={radioId}
        name={name}
        value={value}
        checked={currentChecked}
        disabled={disabled}
        onChange={handleChange}
        className={radioInput}
        aria-describedby={helpTextContent ? `${radioId}-help` : undefined}
      />

      <div className={radioBox({ size, checked: currentChecked, disabled })}>
        <span
          className={radioDot({ size, checked: currentChecked, disabled })}
        />
      </div>

      <div className={textContainer}>
        <span className={label({ size, disabled })}>{labelText}</span>

        {helpTextContent && (
          <span id={`${radioId}-help`} className={helpText({ disabled })}>
            {helpTextContent}
          </span>
        )}
      </div>
    </label>
  );
};
