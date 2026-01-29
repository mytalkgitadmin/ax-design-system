import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { componentSize, toRem } from '../../tokens';
import { Icon } from '../Icon';
import { BadgeProps } from './types';

import { badgeStyle, badgeVars } from './Badge.css';

export type { BadgeProps } from './types';

export const Badge = ({
  label,
  color = 'primary',
  variant = 'solid',
  rounded = 'xs',
  leftIcon,
  rightIcon,
  style,
  className,
}: BadgeProps) => {
  const { global, components } = useTheme();
  const badgeTheme = components.Badge;

  // 아이콘 크기는 componentSize.xs.iconSize 토큰 사용
  const iconSize = Number(componentSize.xs.iconSize);

  // 테마에서 radius 가져오기 (우선순위: Badge theme > global theme > default)
  const themeRadius = badgeTheme.radius ?? global.radius.xs ?? 6;

  // CSS Variables 주입
  const vars = assignInlineVars({
    [badgeVars.brandDefault]: global.color.brand.default,
    [badgeVars.brandSubtle]: global.color.brand.subtle,
    [badgeVars.brandSoft]: global.color.brand.soft,
    [badgeVars.borderRadius]: toRem(themeRadius),
  });

  return (
    <span
      className={`${badgeStyle({ color, variant, rounded })} ${className || ''}`}
      style={{ ...vars, ...style }}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {label}
      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </span>
  );
};
