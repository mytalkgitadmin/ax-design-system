import { RefObject, useEffect } from 'react';

/**
 * Modal의 키보드 이벤트 처리
 * - ESC 키로 모달 닫기
 * - Tab 키로 포커스 트랩
 */
export const useModalKeyboard = (
  open: boolean,
  closeOnEscapeKey: boolean,
  onClose: () => void,
  modalRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!open) return;

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC 키로 닫기
      if (event.key === 'Escape' && closeOnEscapeKey) {
        onClose();
        return;
      }

      // Tab 키로 포커스 트랩
      if (event.key === 'Tab' && focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscapeKey, onClose, modalRef]);
};
