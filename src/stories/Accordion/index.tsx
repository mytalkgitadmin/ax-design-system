import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { componentSize } from '../../tokens';
import { Icon } from '../Icon';

import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from './types';

import {
  accordionContainer,
  accordionContent,
  accordionHeader,
  accordionItem,
  accordionVars,
  category as categoryStyle,
  chevronExpanded,
  chevronWrapper,
  leftIconWrapper,
  textArea,
  title as titleStyle,
} from './Accordion.css';

// Export types
export type {
  AccordionContentProps,
  AccordionItemData,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from './types';

// Context for Accordion
type AccordionContextValue = {
  size: 'sm' | 'md' | 'lg';
  type: 'single' | 'multiple';
  expandedItems: string[];
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion components must be used within an Accordion component'
    );
  }
  return context;
};

// Context for AccordionItem
type AccordionItemContextValue = {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionTrigger and AccordionContent must be used within an AccordionItem'
    );
  }
  return context;
};

// Main Accordion Component
export const Accordion = ({
  size = 'md',
  type = 'single',
  defaultValue,
  defaultValues,
  value: controlledValue,
  values: controlledValues,
  onValueChange,
  items,
  children,
}: AccordionProps) => {
  const { global } = useTheme();

  // State management
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (type === 'multiple') {
      return defaultValues || [];
    }
    return defaultValue ? [defaultValue] : [];
  });

  const isControlled =
    (type === 'single' && controlledValue !== undefined) ||
    (type === 'multiple' && controlledValues !== undefined);

  const expandedItems = isControlled
    ? type === 'single'
      ? controlledValue
        ? [controlledValue]
        : []
      : controlledValues || []
    : internalValue;

  const toggleItem = (itemValue: string) => {
    let newValues: string[];

    if (type === 'single') {
      newValues = expandedItems.includes(itemValue) ? [] : [itemValue];
    } else {
      newValues = expandedItems.includes(itemValue)
        ? expandedItems.filter((v) => v !== itemValue)
        : [...expandedItems, itemValue];
    }

    if (!isControlled) {
      setInternalValue(newValues);
    }

    onValueChange?.(type === 'single' ? newValues[0] || '' : newValues);
  };

  const vars = assignInlineVars({
    [accordionVars.textColor]: global.color.text.secondary,
    [accordionVars.borderColor]: global.color.border.default,
    [accordionVars.bgColor]: global.color.bg.default,
    [accordionVars.focusShadowColor]: global.color.brand.subtle,
    [accordionVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
    [accordionVars.fontFamily]: global.typography.fontFamily,
  });

  return (
    <AccordionContext.Provider
      value={{ size, type, expandedItems, toggleItem }}
    >
      <div className={accordionContainer} style={vars}>
        {items
          ? items.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                <AccordionTrigger
                  category={item.category}
                  title={item.title}
                  leftIcon={item.leftIcon}
                >
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))
          : children}
      </div>
    </AccordionContext.Provider>
  );
};

// AccordionItem Component
export const AccordionItem = ({
  value,
  disabled = false,
  children,
}: AccordionItemProps) => {
  const { expandedItems } = useAccordionContext();
  const isExpanded = expandedItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, disabled }}>
      <div className={accordionItem}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

// AccordionTrigger Component
export const AccordionTrigger = ({
  category,
  title,
  leftIcon,
  children,
}: AccordionTriggerProps) => {
  const { size, toggleItem } = useAccordionContext();
  const { value, isExpanded, disabled } = useAccordionItemContext();

  const iconSize = Number(componentSize[size].iconSize);

  const handleClick = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    // Enter or Space key
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(value);
    }
  };

  const contentId = `accordion-content-${value}`;

  return (
    <button
      className={accordionHeader({ size })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={isExpanded}
      aria-controls={contentId}
      type='button'
    >
      {/* 왼쪽 아이콘 */}
      {leftIcon && (
        <div className={leftIconWrapper}>
          <Icon name={leftIcon} size={iconSize} />
        </div>
      )}

      {/* 텍스트 영역 */}
      <div className={textArea}>
        {children ? (
          children
        ) : (
          <>
            {category && <div className={categoryStyle}>{category}</div>}
            {title && <div className={titleStyle}>{title}</div>}
          </>
        )}
      </div>

      {/* 오른쪽 Chevron */}
      <div className={`${chevronWrapper} ${isExpanded ? chevronExpanded : ''}`}>
        <Icon name='ChevronDown' size={iconSize} />
      </div>
    </button>
  );
};

// AccordionContent Component
export const AccordionContent = ({ children }: AccordionContentProps) => {
  const { size } = useAccordionContext();
  const { value, isExpanded } = useAccordionItemContext();
  const contentRef = useRef<HTMLDivElement>(null);

  // Content의 동적 높이 계산
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = '0';
      }
    }
  }, [isExpanded, children]);

  const contentId = `accordion-content-${value}`;

  return (
    <div
      id={contentId}
      ref={contentRef}
      role='region'
      className={accordionContent({ size, expanded: isExpanded })}
    >
      {children}
    </div>
  );
};
