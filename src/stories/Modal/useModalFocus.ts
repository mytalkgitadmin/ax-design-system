import { RefObject, useEffect } from 'react';

/**
 * Modal 열림/닫힘 시 포커스 관리
 * - Modal이 열릴 때 이전 포커스 저장
 * - Modal 내부의 첫 번째 포커스 가능한 요소로 포커스 이동
 * - Modal이 닫힐 때 이전 포커스로 복귀
 */
export const useModalFocus = (
  open: boolean,
  modalRef: RefObject<HTMLDivElement | null>,
  previousActiveElement: RefObject<HTMLElement | null>
) => {
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

    return () => {
      // Modal 닫힐 때 이전 포커스로 복귀
      previousActiveElement.current?.focus();
    };
  }, [open, modalRef, previousActiveElement]);
};
