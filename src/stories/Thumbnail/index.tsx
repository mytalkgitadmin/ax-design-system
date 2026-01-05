import { useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { rounded as roundedTokens } from '../../tokens';
import { Icon } from '../Icon';
import { ThumbnailProps, ThumbnailRounded } from './types';

import { thumbnailStyle, thumbnailVars } from './Thumbnail.css';

export type { ThumbnailProps } from './types';

// 숫자 radius 값 → 문자열 리터럴 매핑
const RADIUS_MAP: Record<number, ThumbnailRounded> = {
  [roundedTokens.none]: 'none',
  [roundedTokens.xs]: 'xs',
  [roundedTokens.sm]: 'sm',
  [roundedTokens.md]: 'md',
  [roundedTokens.lg]: 'lg',
  [roundedTokens.xl]: 'xl',
  [roundedTokens.full]: 'full',
};

export const Thumbnail = ({
  src,
  alt = '',
  width,
  color = 'brand',
  ratio = '1',
  rounded,
}: ThumbnailProps) => {
  const { global, components } = useTheme();
  const thumbnailTheme = components.Thumbnail;

  // 기본값은 테마에서 가져오기
  const themeRadius = thumbnailTheme.radius ?? global.radius.sm;
  const finalRounded = rounded ?? RADIUS_MAP[themeRadius] ?? 'sm';
  const [imageError, setImageError] = useState(false);

  // CSS Variables 주입
  const vars = assignInlineVars({
    [thumbnailVars.iconColor]: global.color.brand.default,
    [thumbnailVars.bgColor]: global.color.brand.soft,
  });

  // width 스타일 객체
  const widthStyle = {
    width: width ? `${width * 0.1}em` : '100%',
  };

  // 이미지가 있고 에러가 발생하지 않았을 때만 img 태그 사용
  if (src && !imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={thumbnailStyle({ color, ratio, rounded: finalRounded })}
        style={{ ...vars, ...widthStyle }}
        onError={() => setImageError(true)}
      />
    );
  }

  // 이미지가 없거나 로드 실패 시 fallback UI
  return (
    <div
      className={thumbnailStyle({ color, ratio, rounded: finalRounded })}
      style={{ ...vars, ...widthStyle }}
    >
      <Icon name='Image' size={24} />
    </div>
  );
};
