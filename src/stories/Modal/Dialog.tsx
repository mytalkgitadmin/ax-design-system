import { Modal } from './index';
import { ModalProps } from './types';

/**
 * Dialog 컴포넌트
 *
 * 사용자로부터 입력을 받거나 복잡한 상호작용을 위한 다이얼로그입니다.
 * Modal 컴포넌트의 래퍼로, X 닫기 버튼이 있고 children을 통해 자유로운 컨텐츠를 지원합니다.
 */
export type DialogProps = ModalProps;

export const Dialog = (props: DialogProps) => {
  return <Modal {...props} showCloseButton={true} />;
};
