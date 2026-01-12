import { useCallback, useMemo, useState } from 'react';

import { color } from '../../tokens';
import { Icon } from '../Icon';
import { AvatarProps } from './types';

import {
  avatarImageStyle,
  avatarSizes,
  avatarStyle,
  interactiveAvatar,
} from './Avatar.css';

export type { AvatarProps } from './types';

// 텍스트를 기반으로 색상 variant를 선택하는 함수
const getColorVariantFromText = (
  text: string
): 'blue' | 'green' | 'red' | 'yellow' | 'indigo' | 'pink' | 'gray' => {
  const colors = [
    'blue',
    'green',
    'red',
    'yellow',
    'indigo',
    'pink',
    'gray',
  ] as const;

  // 빈 문자열 처리
  if (!text) return 'gray';

  // 간단한 해시 함수 (문자열을 숫자로 변환)
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // 해시 값을 색상 배열 인덱스로 변환
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// 이름에서 첫 1-2글자 추출
const getInitials = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) return '';

  // 한글인 경우 첫 2글자, 영문인 경우 첫 1-2글자
  const words = trimmed.split(' ');
  if (words.length > 1) {
    // 여러 단어인 경우 각 단어의 첫 글자
    return words
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
  // 한 단어인 경우 첫 2글자
  return trimmed.slice(0, 2);
};

export const Avatar = ({
  size = 'md',
  type = 'empty',
  rounded = 'full',
  src,
  alt = 'Avatar',
  text,
  name,
  onClick,
  className,
  title,
  'aria-label': ariaLabel,
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);
  const iconSize = Number(avatarSizes[size].iconSize);

  // 키보드 이벤트 핸들러 - 중복 제거
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  // Interactive 클래스 추가
  const combinedClassName = useMemo(() => {
    const classes = [className, onClick ? interactiveAvatar : ''];
    return classes.filter(Boolean).join(' ');
  }, [className, onClick]);

  // Accessibility 속성 - aria-label 중복 제거
  const accessibilityProps = useMemo(() => {
    const props: Record<string, string> = {};

    if (title) {
      props.title = title;
    }

    // aria-label은 여기서만 설정
    if (ariaLabel) {
      props['aria-label'] = ariaLabel;
    }

    return props;
  }, [title, ariaLabel]);

  // 공통 container props
  const getContainerProps = (defaultAriaLabel?: string) => ({
    onClick,
    role: onClick ? 'button' : 'img',
    tabIndex: onClick ? 0 : undefined,
    onKeyDown: onClick ? handleKeyDown : undefined,
    'aria-label': ariaLabel || defaultAriaLabel,
    ...accessibilityProps,
  });

  // Image 타입 - 로드 실패 시 name을 사용해 text로 fallback
  if (type === 'image' && src && !imageError) {
    const imgAlt = alt || name || 'Avatar';

    return (
      <div
        className={`${avatarStyle({ size, rounded, type: 'image' })} ${combinedClassName}`}
        {...getContainerProps(name ? `${name}의 프로필 사진` : '프로필 사진')}
      >
        <img
          src={src}
          alt={imgAlt}
          className={avatarImageStyle}
          onError={() => {
            // 이미지 로드 실패 시 fallback으로 전환
            // name이나 text가 있으면 text 타입으로, 없으면 empty 타입으로
            setImageError(true);
          }}
        />
      </div>
    );
  }

  // Image 로드 실패 후 fallback 또는 Text 타입
  if ((type === 'image' && imageError && name) || (type === 'text' && text)) {
    const displayText =
      type === 'image' && imageError && name ? getInitials(name) : text || '';
    const colorVariant = getColorVariantFromText(displayText);

    return (
      <div
        className={`${avatarStyle({ size, rounded, colorVariant, type: 'text' })} ${combinedClassName}`}
        {...getContainerProps(name ? `${name}의 프로필` : '사용자 프로필')}
      >
        {displayText}
      </div>
    );
  }

  // Empty 타입 (기본) - 이미지 로드 실패했지만 name/text 없을 때도 여기로
  return (
    <div
      className={`${avatarStyle({ size, rounded, type: 'empty' })} ${combinedClassName}`}
      {...getContainerProps('사용자 프로필')}
    >
      <Icon name='UserFilled' size={iconSize} color={color.icon.muted} />
    </div>
  );
};
