import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useTheme } from '../../theme';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ModalProps } from './types';

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

export const Modal = ({
  size = 'md',
  viewport = 'pc',
  title: titleText,
  description: descriptionText,
  children,
  open,
  onClose,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscapeKey = true,
  primaryAction,
  secondaryAction,
}: ModalProps) => {
  const { global } = useTheme();
  const animationVariant = global.motion.modalType || 'default';

  const [isVisible, setIsVisible] = useState(open);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const isClosing = !open && isVisible;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // ESC 키 처리
  useEffect(() => {
    if (!open || !closeOnEscapeKey) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscapeKey, handleClose]);

  // Focus trap & 관리
  useEffect(() => {
    if (!open) return;

    // 이전 포커스 저장
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Modal 내부로 포커스 이동
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Focus trap
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // Modal 닫힐 때 이전 포커스로 복귀
      previousActiveElement.current?.focus();
    };
  }, [open]);

  //Body 스크롤 방지
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handlePrimaryClick = async () => {
    if (primaryAction?.onClick) {
      await primaryAction.onClick();
    }
  };

  const handleSecondaryClick = () => {
    if (secondaryAction?.onClick) {
      secondaryAction.onClick();
    }
  };

  if (!open && !isVisible) return null;

  const titleId = 'modal-title';
  const descriptionId = descriptionText ? 'modal-description' : undefined;

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
          viewport,
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
            onClick={handleClose}
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
          <div className={buttonContainer}>
            {secondaryAction && (
              <Button
                label={secondaryAction.label}
                onClick={handleSecondaryClick}
                variant='outline'
                color='secondary'
                size='lg'
              />
            )}
            {primaryAction && (
              <Button
                label={primaryAction.label}
                onClick={handlePrimaryClick}
                variant='solid'
                color='primary'
                size='lg'
                disabled={primaryAction.loading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
