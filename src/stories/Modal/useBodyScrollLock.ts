import { useEffect } from 'react';

/**
 * Modal이 열려있을 때 body 스크롤 방지
 * Modal이 닫히면 스크롤 복원
 */
export const useBodyScrollLock = (open: boolean) => {
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
};
