import React from 'react';

import { Icon } from '../Icon';

import type { IconName } from '../Icon/types';
import type { SelectOption } from './types';

import {
  caretIcon,
  caretIconRotated,
  iconContainer,
  iconContainerDisabled,
  iconContainerExpanded,
  selectContent,
  selectPlaceholder,
  selectText,
  selectTriggerStyle,
  trailingIconsContainer,
} from './Select.css';

type SelectTriggerProps = {
  // Appearance
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  full: boolean;
  error: boolean;
  isOpen: boolean;
  iconSize: number;

  // Content
  selectedOption?: SelectOption;
  placeholderText: string;

  // Icons
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  showCaret: boolean;

  // State
  disabled: boolean;

  // HTML Attributes
  id: string;
  name?: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;

  // Event Handlers
  onToggle: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
};

export const SelectTrigger = ({
  size,
  full,
  error,
  isOpen,
  iconSize,
  selectedOption,
  placeholderText,
  leadingIcon,
  trailingIcon,
  showCaret,
  disabled,
  id,
  name,
  triggerRef,
  onToggle,
  onKeyDown,
  onFocus,
  onBlur,
}: SelectTriggerProps) => {
  // 아이콘 className 결정
  const getIconClassName = () => {
    const classes = [iconContainer];
    if (disabled) {
      classes.push(iconContainerDisabled);
    } else if (isOpen) {
      classes.push(iconContainerExpanded);
    }
    return classes.join(' ');
  };

  // Caret 아이콘 className 결정
  const getCaretClassName = () => {
    const classes = [caretIcon];
    if (isOpen) classes.push(caretIconRotated);
    if (disabled) {
      classes.push(iconContainerDisabled);
    } else if (isOpen) {
      classes.push(iconContainerExpanded);
    }
    return classes.join(' ');
  };

  return (
    <button
      ref={triggerRef}
      id={id}
      name={name}
      type='button'
      className={selectTriggerStyle({
        size,
        full,
        error,
        expanded: isOpen,
      })}
      disabled={disabled}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
    >
      <div className={selectContent}>
        {/* Leading Icon */}
        {leadingIcon && (
          <div className={getIconClassName()}>
            <Icon name={leadingIcon} size={iconSize} />
          </div>
        )}

        {/* Selected Text or Placeholder */}
        <span
          className={`${selectText} ${!selectedOption ? selectPlaceholder : ''}`}
        >
          {selectedOption ? selectedOption.label : placeholderText}
        </span>
      </div>

      {/* Trailing Icons */}
      <div className={trailingIconsContainer}>
        {/* Trailing Icon */}
        {trailingIcon && (
          <div className={getIconClassName()}>
            <Icon name={trailingIcon} size={iconSize} />
          </div>
        )}

        {/* Caret Icon */}
        {showCaret && (
          <div className={getCaretClassName()}>
            <Icon name='ChevronDown' size={iconSize} />
          </div>
        )}
      </div>
    </button>
  );
};
