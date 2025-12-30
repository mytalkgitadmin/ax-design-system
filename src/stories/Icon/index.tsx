import { useTheme } from '../../theme';
import * as Icons from './icons';
import { IconProps } from './types';

export type { IconType } from './types';

export const Icon = ({
  name,
  size,
  color,
  className,
  'aria-label': ariaLabel,
}: IconProps) => {
  const { components } = useTheme();
  const iconTheme = components.Icon;

  // 아이콘 컴포넌트 가져오기
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // 우선순위: props > component theme
  const finalSize = size ?? iconTheme.defaultSize;

  // 컬러 처리
  // 1. color prop이 없으면 → undefined (부모의 color 상속, currentColor 활용)
  // 2. color가 프리셋 이름이면 → Theme에서 가져오기
  // 3. 커스텀 컬러면 → 그대로 사용
  let finalColor: string | undefined = undefined;

  if (color) {
    const presetColor =
      iconTheme.colorPresets[color as keyof typeof iconTheme.colorPresets];
    finalColor = presetColor ?? color;
  }

  // 접근성 처리
  // aria-label이 있으면 의미있는 아이콘 (role="img")
  // aria-label이 없으면 장식용 아이콘 (aria-hidden)
  const a11yProps = ariaLabel
    ? { 'aria-label': ariaLabel, role: 'img' as const }
    : { 'aria-hidden': true as const };

  return (
    <IconComponent
      width={finalSize}
      height={finalSize}
      className={className}
      style={finalColor ? { color: finalColor } : undefined}
      {...a11yProps}
    />
  );
};
