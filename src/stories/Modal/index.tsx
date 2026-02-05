import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '../../theme';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ModalProps } from './types';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useModalFocus } from './useModalFocus';
import { useModalKeyboard } from './useModalKeyboard';

import {
  backdrop,
  buttonContainer,
  closeButton,
  content,
  description,
  modalContainer,
  textContainer,
  title,
} from './Modal.css';

export type { ModalProps } from './types';

// Constants
const MODAL_CLOSE_ANIMATION_DURATION = 150;
const DEFAULT_BUTTONS_GAP = 8;

export const Modal = ({
  size = 'md',
  title: titleText,
  description: descriptionText,
  children,
  open,
  onClose,
  afterClose,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscapeKey = true,
  primaryAction,
  secondaryAction,
  buttonsAlign = 'right',
  buttonsGap = DEFAULT_BUTTONS_GAP,
  buttonsDirection = 'row',
}: ModalProps) => {
  const { global } = useTheme();
  const animationVariant = global.motion.modalType || 'default';

  const [isVisible, setIsVisible] = useState(open);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // 접근성을 위한 고유 ID 생성
  const id = useId();
  const titleId = `modal-title-${id}`;
  const descriptionId = descriptionText ? `modal-description-${id}` : undefined;

  // 애니메이션과 함께 open/close 처리
  // 최신 afterClose 콜백 유지
  const latestAfterClose = useRef(afterClose);
  useEffect(() => {
    latestAfterClose.current = afterClose;
  }, [afterClose]);

  // 애니메이션과 함께 open/close 처리
  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else if (isVisible) {
      // open이 false이고 현재 보여지는 중이라면 (닫히는 과정)
      const timer = setTimeout(() => {
        setIsVisible(false);
        // 애니메이션 완료 후 afterClose 콜백 호출
        latestAfterClose.current?.();
      }, MODAL_CLOSE_ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open, isVisible]);

  const isClosing = !open && isVisible;

  // 커스텀 훅으로 Modal 동작 관리
  useModalKeyboard(open, closeOnEscapeKey, onClose, modalRef);
  useModalFocus(open, modalRef, previousActiveElement);
  useBodyScrollLock(open);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleActionClick = async (action?: {
    onClick?: () => void | Promise<void>;
  }) => {
    if (action?.onClick) {
      await action.onClick();
    }
  };

  if (!open && !isVisible) return null;

  const modalContent = (
    <div
      className={backdrop}
      onClick={handleBackdropClick}
      data-closing={isClosing}
      role='presentation'
    >
      <div
        ref={modalRef}
        className={modalContainer({
          size,
          animation: animationVariant,
        })}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        data-closing={isClosing}
      >
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button
            className={closeButton}
            onClick={onClose}
            aria-label='닫기'
            type='button'
          >
            <Icon name='X' size={20} />
          </button>
        )}

        {/* 텍스트 컨테이너 */}
        <div className={textContainer} data-no-close-button={!showCloseButton}>
          <h2 id={titleId} className={title}>
            {titleText}
          </h2>
          {descriptionText && (
            <p id={descriptionId} className={description}>
              {descriptionText}
            </p>
          )}
        </div>

        {/* 컨텐츠 (children) */}
        {children && <div className={content}>{children}</div>}

        {/* 버튼 컨테이너 */}
        {(primaryAction || secondaryAction) && (
          <div
            className={buttonContainer({
              align: buttonsAlign,
              direction: buttonsDirection,
            })}
            style={{ gap: `${buttonsGap}px` }}
          >
            {secondaryAction && (
              <Button
                label={secondaryAction.label}
                onClick={() => handleActionClick(secondaryAction)}
                variant={secondaryAction.variant || 'solid'}
                color={secondaryAction.color || 'tertiary'}
                size={secondaryAction.size || 'md'}
                leftIcon={secondaryAction.leftIcon}
                rightIcon={secondaryAction.rightIcon}
                rounded={secondaryAction.rounded}
                disabled={secondaryAction.disabled}
                loading={secondaryAction.loading}
                full={secondaryAction.full}
                {...(secondaryAction.flex !== undefined && {
                  style: {
                    flex: `${secondaryAction.flex} 1 0`,
                    minWidth: 0,
                    padding: 0,
                  },
                })}
              />
            )}
            {primaryAction && (
              <Button
                label={primaryAction.label}
                onClick={() => handleActionClick(primaryAction)}
                variant={primaryAction.variant || 'solid'}
                color={primaryAction.color || 'secondary'}
                size={primaryAction.size || 'md'}
                leftIcon={primaryAction.leftIcon}
                rightIcon={primaryAction.rightIcon}
                rounded={primaryAction.rounded}
                disabled={primaryAction.disabled}
                loading={primaryAction.loading}
                full={primaryAction.full}
                {...(primaryAction.flex !== undefined && {
                  style: {
                    flex: `${primaryAction.flex} 1 0`,
                    minWidth: 0,
                    padding: 0,
                  },
                })}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
