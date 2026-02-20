import React, { ElementType, useCallback, useMemo, useState } from 'react';

import { color } from '../../tokens';
import { Icon } from '../Icon';
import { AvatarProps } from './types';
import { getColorVariantFromText, getInitials } from './utils';

import {
  avatarImageStyle,
  avatarSizes,
  avatarStyle,
  interactiveAvatar,
} from './Avatar.css';

export type { AvatarProps } from './types';

export const Avatar = <T extends ElementType = 'div'>({
  as,
  size = 'md',
  type,
  rounded = 'full',
  className,
  style,
  title,
  'aria-label': ariaLabel,
  onClick,
  src,
  alt = 'Avatar',
  text,
  name,
  ...props
}: AvatarProps<T>) => {
  const Component = as || 'div';

  const [imageError, setImageError] = useState(false);
  const iconSize = Number(avatarSizes[size].iconSize);

  // 최종 표시 타입 결정
  const finalType = useMemo(() => {
    // 1. 이미지를 강제했거나, src가 있고 에러가 없는 경우
    if ((type === 'image' || (!type && src)) && !imageError) {
      return 'image';
    }

    // 2. Explicit Empty
    if (type === 'empty') {
      return 'empty';
    }

    // 3. Text Fallback
    // - Explicit Text
    // - Image Failed (implicit or explicit) AND has text/name
    // - No Type AND has text/name
    if (type === 'text' || text || name) {
      return 'text';
    }

    // 4. Default to Empty
    return 'empty';
  }, [type, src, imageError, text, name]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  // 컨텐츠에 따라 최종 스타일/속성 조정
  const { finalClassName, finalAriaLabel, displayText } = useMemo(() => {
    let computedVariant = undefined;
    let label = ariaLabel;
    let dText = '';

    if (finalType === 'text') {
      dText =
        (src && imageError && name ? getInitials(name) : text) ||
        (name ? getInitials(name) : '');

      if (dText) {
        computedVariant = getColorVariantFromText(dText);
        if (!label) label = name ? `${name}의 프로필` : '사용자 프로필';
      }
    } else if (finalType === 'image') {
      if (!label) label = name ? `${name}의 프로필 사진` : '프로필 사진';
    } else {
      // Empty
      if (!label) label = '사용자 프로필';
    }

    return {
      finalClassName: avatarStyle({
        size,
        rounded,
        type: finalType === 'text' && !computedVariant ? 'empty' : finalType,
        colorVariant: computedVariant,
      }),
      finalAriaLabel: label,
      displayText: dText,
    };
  }, [finalType, size, rounded, src, imageError, name, text, ariaLabel]);

  // 렌더링 컨텐츠 결정
  const renderContent = () => {
    if (finalType === 'image' && src) {
      const imgAlt = alt || name || 'Avatar';
      return (
        <img
          src={src}
          alt={imgAlt}
          className={avatarImageStyle}
          onError={() => setImageError(true)}
        />
      );
    }

    if (finalType === 'text' && displayText) {
      return displayText;
    }

    // empty (or text fallback fail)
    return <Icon name='UserFill' size={iconSize} color={color.icon.muted} />;
  };

  const isButton = Component === 'button';
  const isLink = Component === 'a' || Boolean(props.href);

  const containerProps = {
    className: [finalClassName, className, onClick && interactiveAvatar]
      .filter(Boolean)
      .join(' '),
    onClick,
    role: onClick && !isButton && !isLink ? 'button' : undefined,
    tabIndex: onClick && !isButton && !isLink ? 0 : undefined,
    onKeyDown: onClick && !isButton && !isLink ? handleKeyDown : undefined,
    'aria-label': finalAriaLabel,
    ...(isButton && !props.type ? { type: 'button' } : {}),
    ...(title ? { title } : {}),
    ...(style ? { style } : {}),
  } as const;

  return React.createElement(
    Component,
    {
      ...containerProps,
      ...props,
    },
    renderContent()
  );
};
