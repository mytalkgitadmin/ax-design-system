import React from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { componentSize, rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { Icon } from '../Icon';
import { ButtonProps } from './types';

import { buttonStyle, buttonVars } from './Button.css';

export type { ButtonProps } from './types';

export const Button = ({
  leftIcon,
  rightIcon,
  icon,
  variant,
  color = 'primary',
  size,
  rounded: roundedProp,
  type = 'button',
  label,
  full = false,
  disabled = false,
  onClick,
  as,
  href,
  target,
  style,
  className,
}: ButtonProps) => {
  const { global, components } = useTheme();
  const buttonTheme = components.Button;

  // 런타임 검증: as="a"일 때 href가 필수
  if (process.env.NODE_ENV !== 'production') {
    if (as === 'a' && !href) {
      console.error('Button: as="a"로 설정할 때는 href가 필수입니다.');
    }
  }

  const Component = as === 'a' ? 'a' : 'button';

  // 우선순위: props > component theme > global theme
  const finalSize = size ?? buttonTheme.defaultSize;
  const finalVariant = variant ?? buttonTheme.defaultVariant;
  const themeRadius = buttonTheme.radius ?? global.radius.sm;
  const actualRadius =
    roundedProp !== undefined ? rounded[roundedProp] : themeRadius;
  const finalFontWeight =
    buttonTheme.fontWeight ?? global.typography.fontWeight.semibold;

  // 컬러 스킴 가져오기
  // 1. Theme에 정의된 프리셋인지 확인
  const colorScheme =
    buttonTheme.colorSchemes[color as keyof typeof buttonTheme.colorSchemes];

  // 2. 프리셋이 없으면 커스텀 컬러로 처리
  const finalColorScheme = colorScheme ?? {
    default: color,
    hover: color,
    active: color,
    text: color,
  };

  const iconSize = Number(componentSize[finalSize].iconSize);

  const ghostColorKey = ['primary', 'secondary', 'tertiary'].includes(color)
    ? (color as 'primary' | 'secondary' | 'tertiary')
    : 'primary';

  const ghostScheme =
    ghostColorKey === 'primary'
      ? {
          textDefault: global.color.brand.default,
          textHover: global.color.brand.stronger,
          textActive: global.color.brand.strongest,
          bgHover: global.color.brand.soft,
          bgActive: global.color.brand.soft,
        }
      : buttonTheme.ghostSchemes[ghostColorKey];

  const vars = assignInlineVars({
    [buttonVars.defaultColor]: finalColorScheme.default,
    [buttonVars.hoverColor]: finalColorScheme.hover,
    [buttonVars.activeColor]: finalColorScheme.active,
    [buttonVars.textColor]: finalColorScheme.text,
    [buttonVars.fontFamily]: global.typography.fontFamily,
    [buttonVars.fontWeight]: String(finalFontWeight),
    [buttonVars.borderRadius]: `${toRem(actualRadius)}`,
    [buttonVars.disabledBgColor]: global.color.bg.disabled,
    [buttonVars.disabledTextColor]: global.color.text.disabled,
    [buttonVars.focusShadowColor]: global.color.brand.subtle,
    [buttonVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
    [buttonVars.ghostDefaultColor]: ghostScheme.textDefault,
    [buttonVars.ghostHoverColor]: ghostScheme.textHover,
    [buttonVars.ghostActiveColor]: ghostScheme.textActive,
    [buttonVars.ghostHoverBgColor]: ghostScheme.bgHover,
    [buttonVars.ghostActiveBgColor]: ghostScheme.bgActive,
  });

  const commonProps = {
    className: `${buttonStyle({
      variant: finalVariant,
      size: finalSize,
      color: ['primary', 'secondary', 'tertiary'].includes(color)
        ? (color as 'primary' | 'secondary' | 'tertiary')
        : undefined,
      full,
      leftIcon: !!leftIcon,
      rightIcon: !!rightIcon,
      icon: !!icon,
    })}${className ? ` ${className}` : ''}`,
    style: { ...vars, ...style },
    disabled: disabled,
  };

  const children = (
    <>
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {icon ? <Icon name={icon} size={iconSize} /> : label}
      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </>
  );

  // a 태그로 렌더링
  if (Component === 'a') {
    return React.createElement(
      'a',
      {
        ...commonProps,
        href,
        target,
        rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      },
      children
    );
  }

  // button 태그로 렌더링
  return React.createElement(
    'button',
    {
      ...commonProps,
      type,
      onClick,
    },
    children
  );
};
