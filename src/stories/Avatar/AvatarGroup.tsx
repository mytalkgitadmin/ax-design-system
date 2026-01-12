import { color } from '../../tokens';
import { Avatar } from './index';
import { AvatarGroupProps } from './types';

import type { CSSProperties } from 'react';

import { avatarSizes } from './Avatar.css';
import {
  avatarGroupContainer,
  avatarGroupItem,
  avatarGroupMore,
} from './AvatarGroup.css';

export type { AvatarGroupProps } from './types';

export const AvatarGroup = ({
  avatars,
  max = 3,
  size = 'md',
  rounded = 'full',
  spacing,
  borderWidth = 3,
  borderColor = color.base.white,
}: AvatarGroupProps) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  // 크기에 따른 +N 스타일
  const avatarSize = avatarSizes[size as keyof typeof avatarSizes];
  const moreStyle: CSSProperties = {
    width: `${avatarSize.size}px`,
    height: `${avatarSize.size}px`,
    fontSize: `${avatarSize.fontSize}px`,
    border: `${borderWidth}px solid ${borderColor}`,
  };

  // spacing이 제공된 경우 커스텀 스타일 적용
  const itemStyle: CSSProperties | undefined =
    spacing !== undefined
      ? {
          marginLeft: `-${spacing}px`,
        }
      : undefined;

  // box-shadow 스타일 (배경 투명)
  const shadowStyle: CSSProperties = {
    boxShadow:
      borderWidth > 0 ? `0 0 0 ${borderWidth}px ${borderColor}` : 'none',
  };

  return (
    <div className={avatarGroupContainer}>
      {visibleAvatars.map((avatarProps, index) => {
        // 더 나은 key: avatarProps의 고유 속성 사용
        // src, name, text 중 하나를 key로 사용 (없으면 index)
        const key =
          avatarProps.src ||
          avatarProps.name ||
          avatarProps.text ||
          `avatar-${index}`;

        return (
          <div
            key={key}
            className={avatarGroupItem}
            style={{
              ...(index > 0 ? itemStyle : undefined),
              ...shadowStyle,
            }}
          >
            <Avatar {...avatarProps} size={size} rounded={rounded} />
          </div>
        );
      })}

      {remainingCount > 0 && (
        <div
          className={avatarGroupMore}
          style={{
            ...moreStyle,
            ...(spacing !== undefined && visibleAvatars.length > 0
              ? itemStyle
              : undefined),
          }}
          title={`+${remainingCount}명 더 보기`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
