import React from 'react';

import { Icon } from '../Icon';
import { Thumbnail } from '../Thumbnail';

import type { SelectOption as SelectOptionType } from './types';

import { optionCheckmark, optionLabel, optionStyle } from './Select.css';

type SelectOptionProps = {
  option: SelectOptionType;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconSize: number;
  isSelected: boolean;
  onSelect: (value: string | number) => void;
};

export const SelectOption = ({
  option,
  size,
  iconSize,
  isSelected,
  onSelect,
}: SelectOptionProps) => {
  const handleClick = () => {
    if (!option.disabled) {
      onSelect(option.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !option.disabled) {
      onSelect(option.value);
    }
  };

  // textValue를 우선 사용하고, label이 문자/숫자일 경우 문자열 변환하여 alt용 텍스트 추출
  const labelText =
    option.textValue ??
    (typeof option.label === 'string' || typeof option.label === 'number'
      ? String(option.label)
      : String(option.value));

  return (
    <div
      className={optionStyle({
        size,
        selected: isSelected,
        disabled: option.disabled,
      })}
      role='option'
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {option.thumbnail && (
        <Thumbnail
          src={option.thumbnail}
          alt={labelText}
          width={40}
          rounded='sm'
        />
      )}
      {option.thumbnail === '' && (
        <Thumbnail alt={labelText} width={40} rounded='sm' />
      )}
      {option.icon && <Icon name={option.icon} size={iconSize} />}
      <span className={optionLabel}>
        {option.label}
        {option.disabled && <>(품절)</>}
      </span>
      {isSelected && (
        <div className={optionCheckmark}>
          <Icon name='Check' size={iconSize} />
        </div>
      )}
    </div>
  );
};
