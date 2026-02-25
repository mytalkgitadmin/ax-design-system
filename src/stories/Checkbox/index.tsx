import React, { useId, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { toRem } from '../../tokens';
import { CheckboxProps } from './types';

import {
  checkboxBox,
  checkboxContainer,
  checkboxInput,
  checkboxVars,
  checkIcon,
  checkSvg,
  helpText,
  label,
  requiredMark,
  textContainer,
} from './Checkbox.css';

export type { CheckboxProps } from './types';

/**
 * Checkbox 컴포넌트
 *
 * 사용자가 선택/해제할 수 있는 체크박스 컴포넌트입니다.
 * 여러 개의 체크박스를 사용할 경우 CheckboxGroup과 함께 사용하는 것을 권장합니다.
 *
 * @example
 * // 단독 사용
 * ```tsx
 * import { Checkbox } from '@bemily/design-system';
 *
 * const [checked, setChecked] = useState(false);
 *
 * <Checkbox
 *   label="동의합니다"
 *   helpText="체크박스에 대한 부가 설명"
 *   checked={checked}
 *   onChange={setChecked}
 * />
 * ```
 *
 * @example
 * // CheckboxGroup과 함께 사용 (권장)
 * ```tsx
 * import { CheckboxGroup } from '@bemily/design-system';
 *
 * const [values, setValues] = useState<string[]>(['option1']);
 *
 * <CheckboxGroup
 *   name="options"
 *   value={values}
 *   onChange={setValues}
 *   options={[
 *     { value: 'option1', label: '옵션 1' },
 *     { value: 'option2', label: '옵션 2' },
 *   ]}
 * />
 * ```
 */
export const Checkbox = ({
  size = 'lg',
  checked,
  defaultChecked = false,
  disabled = false,
  required = false,
  labelPlacement = 'start',
  label: labelText,
  helpText: helpTextContent,
  onChange,
  id,
  name,
  value,
  className,
  style,
}: CheckboxProps) => {
  const { global, components } = useTheme();
  const checkboxTheme = components.Checkbox;
  const generatedId = useId();
  const checkboxId = id || generatedId;

  // 제어/비제어 컴포넌트 판단
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const currentChecked = isControlled ? checked : internalChecked;

  // 체크박스 상태 변경 핸들러
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

  // 테마에서 radius 가져오기, 최대값 제한 (lg: 8px, md: 6px)
  const defaultRadius = size === 'lg' ? 8 : 6;
  const themeRadius =
    checkboxTheme.radius?.[size] ?? global.radius?.sm ?? defaultRadius;
  const finalRadius = Math.min(themeRadius, defaultRadius); // 기존 최대값으로 제한

  // CSS Variables 주입
  const vars = assignInlineVars({
    [checkboxVars.fontFamily]: global.typography.fontFamily,
    [checkboxVars.fontWeight]: String(global.typography.fontWeight.regular),
    [checkboxVars.borderRadius]: toRem(finalRadius),
    [checkboxVars.primaryColor]: global.color.brand.default,
    [checkboxVars.focusShadowColor]: global.color.brand.subtle,
    [checkboxVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
    [checkboxVars.borderDefault]: global.color.border.default,
    [checkboxVars.borderStrong]: global.color.border.strong,
    [checkboxVars.bgDisabled]: global.color.bg.disabled,
    [checkboxVars.textPrimary]: global.color.text.primary,
    [checkboxVars.textTertiary]: global.color.text.tertiary,
    [checkboxVars.textDisabled]: global.color.text.disabled,
    [checkboxVars.iconDisabled]: global.color.text.disabled, // icon.disabled 대신 text.disabled 사용
  });

  // size에 따라 다른 체크 아이콘 SVG 사용
  const checkIconSvg =
    size === 'lg' ? (
      // 큰 사이즈용 체크 아이콘 (13x9)
      <svg
        className={checkSvg}
        width='13'
        height='9'
        viewBox='0 0 13 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M10.8196 0.21329C11.1042 -0.0711332 11.5659 -0.0710604 11.8507 0.21329C12.1354 0.498032 12.1354 0.960418 11.8507 1.24519L4.78035 8.3155C4.6436 8.45226 4.45779 8.52953 4.2644 8.52953C4.07131 8.52939 3.88586 8.45279 3.74926 8.31632L0.21329 4.78035C-0.0710473 4.49563 -0.0711463 4.03392 0.21329 3.74926C0.497998 3.46455 0.960422 3.46465 1.24519 3.74926L4.2644 6.76847L10.8196 0.21329Z'
          fill='currentColor'
        />
      </svg>
    ) : (
      // 작은 사이즈용 체크 아이콘 (10x7)
      <svg
        className={checkSvg}
        width='10'
        height='7'
        viewBox='0 0 10 7'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M8.65566 0.170632C8.88338 -0.0569066 9.25276 -0.0568483 9.48053 0.170632C9.70835 0.398426 9.70832 0.768335 9.48053 0.996153L3.82428 6.6524C3.71488 6.76181 3.56623 6.82362 3.41152 6.82363C3.25705 6.82352 3.10869 6.76223 2.99941 6.65305L0.170632 3.82428C-0.0568379 3.5965 -0.056917 3.22713 0.170632 2.99941C0.398399 2.77164 0.768338 2.77172 0.996153 2.99941L3.41152 5.41477L8.65566 0.170632Z'
          fill='currentColor'
        />
      </svg>
    );

  return (
    <label
      htmlFor={checkboxId}
      className={`${checkboxContainer({ labelPlacement })} ${className || ''}`}
      style={{ ...vars, ...style }}
    >
      <input
        type='checkbox'
        id={checkboxId}
        name={name}
        value={value}
        checked={currentChecked}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        className={checkboxInput}
        aria-describedby={helpTextContent ? `${checkboxId}-help` : undefined}
        aria-required={required}
      />

      <div className={checkboxBox({ size, checked: currentChecked, disabled })}>
        <span className={checkIcon({ checked: currentChecked, disabled })}>
          {checkIconSvg}
        </span>
      </div>

      <div className={textContainer}>
        {(labelText || required) && (
          <span className={label({ size, disabled })}>
            {labelText}
            {required && <span className={requiredMark}>*</span>}
          </span>
        )}

        {helpTextContent && (
          <span id={`${checkboxId}-help`} className={helpText({ disabled })}>
            {helpTextContent}
          </span>
        )}
      </div>
    </label>
  );
};
