import { useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { TabsProps } from './types';

import { tabsContainerStyle, tabStyle, tabsVars } from './Tabs.css';

export type { TabItem, TabsProps } from './types';

export const Tabs = ({
  items,
  variant,
  size,
  color = 'primary',
  rounded: roundedProp,
  justify,
  value: controlledValue,
  defaultValue,
  onChange,
}: TabsProps) => {
  const { global, components } = useTheme();
  const tabsTheme = components.Tabs;

  // 내부 상태 관리 (비제어 컴포넌트)
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? items[0]?.value ?? ''
  );

  // 제어 컴포넌트 vs 비제어 컴포넌트
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  // 우선순위: props > component theme > global theme
  const finalSize = size ?? tabsTheme.defaultSize;
  const finalVariant = variant ?? tabsTheme.defaultVariant;
  const finalJustify = justify ?? tabsTheme.defaultJustify;
  const themeRadius = tabsTheme.radius ?? global.radius.sm;
  const actualRadius =
    roundedProp !== undefined ? rounded[roundedProp] : themeRadius;
  const finalFontWeight =
    tabsTheme.fontWeight ?? global.typography.fontWeight.semibold;

  // 컬러 스킴 가져오기
  // 1. Theme에 정의된 프리셋인지 확인
  const colorScheme =
    tabsTheme.colorSchemes[color as keyof typeof tabsTheme.colorSchemes];

  // 2. 프리셋이 없으면 커스텀 컬러로 처리
  const finalColorScheme = colorScheme ?? {
    default: color,
    hover: color,
    active: color,
    text: color,
  };

  // CSS Variables 주입
  const vars = assignInlineVars({
    [tabsVars.defaultColor]: finalColorScheme.default,
    [tabsVars.hoverColor]: finalColorScheme.hover,
    [tabsVars.activeColor]: finalColorScheme.active,
    [tabsVars.textColor]: finalColorScheme.text,
    [tabsVars.fontFamily]: global.typography.fontFamily,
    [tabsVars.fontWeight]: String(finalFontWeight),
    [tabsVars.borderRadius]: `${toRem(actualRadius)}`,
    [tabsVars.disabledColor]: global.color.text.disabled,
    [tabsVars.borderColor]: global.color.border.default, // underlined 하단 보더 색상
  });

  // 탭 클릭 핸들러
  const handleTabClick = (value: string) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  return (
    <div
      className={tabsContainerStyle({
        variant: finalVariant,
        justify: finalJustify,
      })}
      style={{ ...vars }}
      role='tablist'
    >
      {items.map((item) => {
        const isActive = activeValue === item.value;

        return (
          <button
            key={item.value}
            className={tabStyle({
              variant: finalVariant,
              size: finalSize,
              active: isActive,
            })}
            onClick={() => handleTabClick(item.value)}
            disabled={item.disabled}
            role='tab'
            aria-selected={isActive}
            aria-disabled={item.disabled}
            type='button'
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
