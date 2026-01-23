import React, { useEffect, useRef, useState } from 'react';

import { componentSize, rounded } from '../../tokens';
import {
  FormLabel,
  FormStatus,
  generateFieldId,
  useFormField,
} from '../FormField';
import { SelectDropdown } from './SelectDropdown';
import { SelectTrigger } from './SelectTrigger';
import { getSelectCSSVars } from './selectUtils';

import type { SelectProps } from './types';

import {
  descriptionStyle,
  selectContainer,
  selectWrapper,
  selectWrapperFull,
} from './Select.css';

export type { SelectProps } from './types';

export const Select = ({
  // Appearance
  size = 'md',
  color = 'primary',
  full = false,
  rounded: roundedProp,

  // Label & Description
  label,
  hiddenLabel = false,
  showLabel = true,
  required = false,
  description,
  showDescription = false,

  // Status & Message
  status,
  statusMessage,
  showStatusIcon = false,

  // Icons
  leadingIcon,
  trailingIcon,
  showCaret = true,

  // Dropdown
  expanded: controlledExpanded,
  placement = 'bottom',
  options,

  // State
  disabled = false,
  error = false,

  // HTML Select Props
  text = '옵션을 선택해 주세요',
  value: controlledValue,
  defaultValue,
  name,
  id,

  className,
  style,
  width,

  // Event Handlers
  onChange,
  onToggle,
  onFocus,
  onBlur,
}: SelectProps) => {
  // 1. 공통 Hook 사용 (테마 값 가져오기)
  const {
    global,
    finalSize,
    finalRadius,
    finalFontWeight,
    finalLabelFontSize,
    finalColorScheme,
  } = useFormField(size, color);

  // 내부 상태 관리 (비제어 컴포넌트)
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  // 제어 vs 비제어 결정
  const isControlled = controlledExpanded !== undefined;
  const isOpen = isControlled ? controlledExpanded : internalExpanded;
  const selectedValue = controlledValue ?? internalValue;

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // 선택된 옵션 찾기
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // 크기에 따른 iconSize
  const iconSize = Number(componentSize[finalSize].iconSize);

  // 2. rounded prop이 있으면 테마 설정을 덮어쓰기
  const actualRadius =
    roundedProp !== undefined ? rounded[roundedProp] : finalRadius;

  // ========================================
  // 3. CSS Variables 주입
  // ========================================
  const vars = getSelectCSSVars(
    global,
    finalLabelFontSize,
    finalColorScheme,
    finalFontWeight,
    actualRadius
  );

  // ID 생성 (label과 select 연결용)
  const selectId = generateFieldId('select', id);

  // 드롭다운 토글
  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !isOpen;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  };

  // 옵션 선택
  const handleSelect = (optionValue: string | number) => {
    if (!isControlled) {
      setInternalValue(optionValue);
      setInternalExpanded(false);
    }
    onChange?.(optionValue);
    onToggle?.(false);
  };

  // 외부 클릭 감지 (드롭다운 닫기)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (!isControlled) {
          setInternalExpanded(false);
        }
        onToggle?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isControlled, onToggle]);

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleToggle();
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          if (!isControlled) {
            setInternalExpanded(false);
          }
          onToggle?.(false);
          triggerRef.current?.focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        if (!isOpen) {
          e.preventDefault();
          handleToggle();
        }
        break;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`${selectWrapper} ${full ? selectWrapperFull : ''} ${className || ''}`}
      style={{
        ...vars,
        ...(width ? { width } : {}),
        ...style,
      }}
    >
      {/* FormLabel 컴포넌트 사용 */}
      {showLabel && label && (
        <FormLabel
          htmlFor={selectId}
          required={required}
          hiddenLabel={hiddenLabel}
          size={finalSize}
        >
          {label}
        </FormLabel>
      )}

      {/* Select Container (Trigger + Dropdown) */}
      <div className={selectContainer}>
        {/* Select Trigger */}
        <SelectTrigger
          size={finalSize}
          full={full}
          error={error || status === 'error'}
          isOpen={isOpen}
          iconSize={iconSize}
          selectedOption={selectedOption}
          placeholderText={text}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          showCaret={showCaret}
          disabled={disabled}
          id={selectId}
          name={name}
          triggerRef={triggerRef}
          onToggle={handleToggle}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {/* Dropdown */}
        {isOpen && !disabled && (
          <SelectDropdown
            options={options}
            placement={placement || 'bottom'}
            size={finalSize}
            iconSize={iconSize}
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        )}
      </div>

      {/* Description */}
      {showDescription && description && (
        <div className={descriptionStyle}>{description}</div>
      )}

      {/* FormStatus 컴포넌트 사용 */}
      <FormStatus
        status={status}
        message={statusMessage}
        showIcon={showStatusIcon}
      />
    </div>
  );
};
