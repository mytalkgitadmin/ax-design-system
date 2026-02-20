import React, { useMemo } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { color, toRem } from '../../tokens';
import { Icon } from '../Icon';
import { BreadCrumbItem, BreadCrumbProps } from './types';

import {
  breadCrumbContainer,
  breadCrumbItemStyle,
  breadCrumbLabelStyle,
  breadCrumbVars,
  separatorStyle,
} from './BreadCrumb.css';

export type { BreadCrumbItem, BreadCrumbProps } from './types';

// 내부적으로 사용하는 확장 타입 (ellipsis 지원)
type DisplayItem = BreadCrumbItem & { isEllipsis?: boolean };

export const BreadCrumb = ({ items, isEllipsis }: BreadCrumbProps) => {
  const { global, components } = useTheme();
  const breadcrumbTheme = components.Breadcrumb;

  // 아이템 개수에 따라 표시할 아이템 결정
  const displayItems = useMemo((): DisplayItem[] => {
    if (isEllipsis) {
      // ... 줄임 처리  -  5개 이상: 첫 번째 + ... + 마지막 2개
      return [
        items[0],
        { label: '...', isEllipsis: true },
        items[items.length - 2],
        items[items.length - 1],
      ];
    }

    return items;
  }, [items, isEllipsis]);

  // 테마에서 focusRadius 가져오기 (우선순위: Breadcrumb theme > global theme > default)
  const themeFocusRadius =
    breadcrumbTheme.focusRadius ?? global.radius?.sm ?? 4;

  // CSS Variables 주입 (Button 패턴 참고)
  const vars = useMemo(
    () =>
      assignInlineVars({
        [breadCrumbVars.brandDefault]: global.color.brand.default,
        [breadCrumbVars.focusShadowColor]: global.color.brand.subtle,
        [breadCrumbVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
        [breadCrumbVars.focusBorderRadius]: toRem(themeFocusRadius),
      }),
    [global.color.brand, themeFocusRadius]
  );

  return (
    <nav aria-label='breadcrumb'>
      <ol className={breadCrumbContainer} style={vars}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const {
            label,
            leftIcon,
            href,
            as: Component = 'a',
            isEllipsis,
            ...rest
          } = item;

          return (
            <React.Fragment key={`${index}-${href || label}`}>
              <li>
                {isEllipsis ? (
                  // ... 표시
                  <span
                    className={breadCrumbItemStyle({
                      isLast: false,
                      isEllipsis: true,
                    })}
                  >
                    {item.label}
                  </span>
                ) : (
                  // 링크로 렌더링
                  <Component
                    {...(Component === 'a' && !href ? { href: '#' } : {})}
                    {...(href ? { href } : {})}
                    className={breadCrumbItemStyle({
                      isLast,
                      isEllipsis: false,
                    })}
                    aria-current={isLast ? 'page' : undefined}
                    {...rest}
                  >
                    {leftIcon && <Icon name={leftIcon} size={16} />}
                    <span className={breadCrumbLabelStyle}>{label}</span>
                  </Component>
                )}
              </li>

              {/* 마지막 아이템이 아니면 구분자 표시 */}
              {!isLast && (
                <li aria-hidden='true' className={separatorStyle}>
                  <Icon name='ChevronRight' size={16} color={color.icon.fill} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
