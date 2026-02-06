import { Modal } from './index';
import { ModalProps } from './types';

/**
 * Alert 컴포넌트
 *
 * 사용자에게 정보를 전달하고 확인을 받기 위한 간단한 다이얼로그입니다.
 * Modal 컴포넌트의 래퍼로, X 닫기 버튼이 없고 컨텐츠(children)를 지원하지 않습니다.
 */
export type AlertProps = Omit<ModalProps, 'showCloseButton' | 'children'>;

export const Alert = (props: AlertProps) => {
  return <Modal {...props} showCloseButton={false} />;
};
