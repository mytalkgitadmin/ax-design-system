import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { componentSize } from '../../tokens';
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
}: BadgeProps) => {
  const { global } = useTheme();

  // 아이콘 크기는 componentSize.xs.iconSize 토큰 사용
  const iconSize = Number(componentSize.xs.iconSize);

  // CSS Variables 주입
  const vars = assignInlineVars({
    [badgeVars.brandDefault]: global.color.brand.default,
    [badgeVars.brandSubtle]: global.color.brand.subtle,
    [badgeVars.brandSoft]: global.color.brand.soft,
  });

  return (
    <span className={badgeStyle({ color, variant, rounded })} style={vars}>
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {label}
      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </span>
  );
};
