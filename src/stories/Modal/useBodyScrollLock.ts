import { useEffect } from 'react';

/**
 * Modal이 열려있을 때 body 스크롤 방지
 * - open: true → 스크롤 잠금
 * - isClosing: true → 닫히는 애니메이션 중 → 잠금 유지
 * - open: false & isClosing: false → 애니메이션 완료 → 스크롤 복원
 */
export const useBodyScrollLock = (open: boolean, isClosing: boolean) => {
  useEffect(() => {
    if (open || isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isClosing]);
};
