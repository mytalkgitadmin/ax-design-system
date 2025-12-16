// Icon.tsx
import { Icon as IconifyIcon } from '@iconify/react';
import { IconProps } from './types';

export type { IconType } from './types';

const Icon = ({ name, size = 20, color, className }: IconProps) => {
  return (
    <IconifyIcon
      icon={name}
      width={size}
      height={size}
      color={color}
      className={className}
    />
  );
};

export default Icon;
