import React, { useCallback, useEffect, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import * as tokens from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { Icon } from '../Icon';
import { StepperProps } from './types';

import {
  buttonStyle,
  inputStyle,
  stepperVars,
  wrapperStyle,
} from './Stepper.css';

export type { StepperProps } from './types';

export const Stepper = ({
  size = 'md',
  color = 'primary',
  rounded: roundedProp,
  defaultValue,
  value,
  min,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  readOnly = false,
  style,
  className,
}: StepperProps) => {
  // 1. 테마 값 가져오기
  const { global, components } = useTheme();
  const inputTheme = components.Input;

  // 2. 최종 값 결정
  const finalSize = size;
  const finalRadius =
    roundedProp !== undefined
      ? tokens.rounded[roundedProp]
      : (inputTheme.radius ?? global.radius.sm);
  const finalFontWeight =
    inputTheme.fontWeight ?? global.typography.fontWeight.regular;

  // 3. 컬러 스킴 결정
  const finalColorScheme =
    color === 'primary'
      ? inputTheme.colorScheme
      : color === 'secondary'
        ? {
            default: global.color.border.default,
            hover: global.color.border.strong,
            focus: global.color.border.strong,
            focusShadow: `${global.color.border.strong}80`,
            error: global.color.text.negative,
          }
        : {
            default: color,
            hover: color,
            focus: color,
            focusShadow: `${color}80`,
            error: global.color.text.negative,
          };

  // 4. Controlled vs Uncontrolled logic
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number | string>(
    defaultValue !== undefined ? defaultValue : value !== undefined ? value : ''
  );

  const currentValue = isControlled ? value : internalValue;

  // Update internal value if controlled value changes (to build valid sync)
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [isControlled, value]);

  const triggerChange = useCallback(
    (newValue: number | null) => {
      if (!isControlled) {
        setInternalValue(newValue === null ? '' : newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const handleMinus = useCallback(() => {
    if (disabled || readOnly) return;

    // Safely handle non-numeric current values
    const current =
      typeof currentValue === 'number'
        ? currentValue
        : Number(currentValue || 0);
    const nextVal = current - step;

    if (min !== undefined && nextVal < min) {
      triggerChange(min);
    } else {
      triggerChange(nextVal);
    }
  }, [currentValue, step, min, disabled, readOnly, triggerChange]);

  const handlePlus = useCallback(() => {
    if (disabled || readOnly) return;

    const current =
      typeof currentValue === 'number'
        ? currentValue
        : Number(currentValue || 0);
    const nextVal = current + step;

    if (max !== undefined && nextVal > max) {
      triggerChange(max);
    } else {
      triggerChange(nextVal);
    }
  }, [currentValue, step, max, disabled, readOnly, triggerChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;

    const inputValue = e.target.value;

    // Allow empty string to let user delete everything
    if (inputValue === '') {
      if (!isControlled) setInternalValue('');
      onChange?.(null);
      return;
    }

    const parsed = Number(inputValue);
    if (!isNaN(parsed)) {
      // We might want to clamp here, but usually typing allows intermediate invalid values
      // We'll trust the user or validate on blur. For now, just pass it.
      if (!isControlled) setInternalValue(parsed);
      onChange?.(parsed);
    }
  };

  const handleBlur = () => {
    // Validate bounds on blur
    let val =
      typeof currentValue === 'number' ? currentValue : Number(currentValue);

    if (typeof currentValue === 'string' && currentValue === '') {
      return; // Leave as empty or set to min/default?
      // Typically undefined or null.
    }

    let changed = false;
    if (min !== undefined && val < min) {
      val = min;
      changed = true;
    }
    if (max !== undefined && val > max) {
      val = max;
      changed = true;
    }

    if (changed) {
      triggerChange(val);
    }
  };

  // Determine disabled states for buttons
  const isMinusDisabled =
    disabled ||
    (min !== undefined &&
      (typeof currentValue === 'number'
        ? currentValue
        : Number(currentValue || 0)) <= min);
  const isPlusDisabled =
    disabled ||
    (max !== undefined &&
      (typeof currentValue === 'number'
        ? currentValue
        : Number(currentValue || 0)) >= max);

  const iconSize = Number(tokens.componentSize[finalSize].iconSize);

  // 5. CSS Variables 주입
  const vars = assignInlineVars({
    [stepperVars.borderColor]: finalColorScheme.default,
    [stepperVars.hoverBorderColor]: finalColorScheme.hover,
    [stepperVars.focusBorderColor]: finalColorScheme.focus,
    [stepperVars.focusShadowColor]: finalColorScheme.focusShadow,
    [stepperVars.bgColor]: global.color.bg.default,
    [stepperVars.disabledBgColor]: global.color.bg.disabled,

    [stepperVars.textColor]: global.color.text.secondary,
    [stepperVars.disabledTextColor]: global.color.text.disabled,
    [stepperVars.iconColor]: tokens.color.icon.secondary,
    [stepperVars.iconHoverColor]: finalColorScheme.focus,
    [stepperVars.iconActiveColor]: finalColorScheme.focus,
    [stepperVars.iconDisabledColor]: tokens.color.icon.disabled,

    [stepperVars.buttonHoverBgColor]: global.color.bg.subtle,
    [stepperVars.buttonActiveBgColor]: global.color.bg.muted,
    [stepperVars.buttonDisabledBgColor]: global.color.bg.muted,

    [stepperVars.borderRadius]: `${toRem(finalRadius)}`,
    [stepperVars.buttonBorderRadius]: `${toRem(Math.max(finalRadius - 3, 0))}`,
    [stepperVars.fontWeight]: String(finalFontWeight),
  });

  return (
    <div
      className={`${wrapperStyle({ size: finalSize, disabled })} ${className || ''}`}
      style={{ ...vars, ...style }}
    >
      <button
        type='button'
        className={buttonStyle({ size: finalSize })}
        onClick={handleMinus}
        disabled={isMinusDisabled || readOnly}
        tabIndex={-1}
      >
        <Icon name='Minus' size={iconSize} />
      </button>

      <input
        type='number'
        className={inputStyle({ size: finalSize })}
        value={currentValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
      />

      <button
        type='button'
        className={buttonStyle({ size: finalSize })}
        onClick={handlePlus}
        disabled={isPlusDisabled || readOnly}
        tabIndex={-1}
      >
        <Icon name='Plus' size={iconSize} />
      </button>
    </div>
  );
};
