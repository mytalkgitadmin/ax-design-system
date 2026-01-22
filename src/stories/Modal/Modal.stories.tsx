import { useState } from 'react';

import { Input } from '../Input';
import { Alert } from './Alert';
import { Dialog } from './Dialog';
import { Modal } from './index';
import { MODAL_SIZES } from './types';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: MODAL_SIZES,
      description: 'Modal 크기',
    },
    viewport: {
      control: 'radio',
      options: ['pc', 'mobile'],
      description: '뷰포트 타입',
    },
    title: {
      control: 'text',
      description: 'Modal 제목',
    },
    description: {
      control: 'text',
      description: '부가 설명',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'X 닫기 버튼 표시 여부',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Backdrop 클릭 시 닫기',
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'ESC 키로 닫기',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

// 컨트롤 가능한 Modal
const ModalWrapper = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

/**
 * 기본 Modal 예시
 */
export const Default = {
  render: (args: React.ComponentProps<typeof Modal>) => (
    <ModalWrapper {...args} />
  ),
  args: {
    title: '타이틀을 입력해 주세요',
    description: '부가설명을 입력해 주세요',
    size: 'md' as const,
    viewport: 'pc' as const,
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscapeKey: true,
    open: false,
    onClose: () => {},
    primaryAction: {
      label: '확인',
      onClick: () => {
        // Primary action
      },
    },
    secondaryAction: {
      label: '취소',
      onClick: () => {
        // Secondary action
      },
    },
  },
} satisfies StoryObj<typeof meta>;

/**
 * 크기 비교
 */
const SizesComponent = () => {
  const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {MODAL_SIZES.map((size) => (
        <button
          key={size}
          onClick={() => setOpenSize(size)}
          style={{ padding: '12px 24px' }}
        >
          Open {size.toUpperCase()}
        </button>
      ))}
      {openSize && (
        <Modal
          size={openSize}
          title={`${openSize.toUpperCase()} Modal`}
          description='크기별 Modal 비교입니다'
          open={!!openSize}
          onClose={() => setOpenSize(null)}
          primaryAction={{
            label: '확인',
            onClick: () => setOpenSize(null),
          }}
        />
      )}
    </div>
  );
};

export const Sizes = {
  render: () => <SizesComponent />,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Alert 컴포넌트
 *
 * 닫기 버튼이 없고, 정보 전달 및 확인 용도로 사용됩니다.
 */
const AlertComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Alert
      </button>
      <Alert
        title='타이틀을 입력해 주세요'
        description='부가설명을 입력해 주세요'
        open={open}
        onClose={() => setOpen(false)}
        size='md'
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const AlertExample = {
  render: () => <AlertComponent />,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Dialog with Input
 *
 * children을 활용하여 Input 필드를 포함한 Dialog 예시입니다.
 */
const DialogWithInputComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Dialog
      </button>
      <Dialog
        title='타이틀을 입력해 주세요'
        description='부가설명을 입력해 주세요'
        open={open}
        onClose={() => setOpen(false)}
        size='md'
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            id='input1'
            label='레이블'
            placeholder='텍스트를 입력해 주세요'
            full
          />
          <Input
            id='input2'
            label='레이블'
            placeholder='텍스트를 입력해 주세요'
            full
          />
        </div>
      </Dialog>
    </>
  );
};

export const DialogWithInput = {
  render: () => <DialogWithInputComponent />,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * 단일 버튼
 *
 * Primary 버튼만 있는 경우
 */
const SingleButtonComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      <Modal
        title='확인이 필요합니다'
        description='이 작업을 진행하시겠습니까?'
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const SingleButton = {
  render: () => <SingleButtonComponent />,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * 긴 컨텐츠
 *
 * 스크롤이 필요한 긴 컨텐츠가 있는 경우
 */
const LongContentComponent = () => {
  const [open, setOpen] = useState(false);
  const longText = `
      에시일너다 긴내 이때 듭을 이렇까지 킬던 앞겼지만
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정브를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용하에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
      대한 상다는 사용차에게 적업에 대한 알리고 중동한 정부를 표함하거나 겼정이 릴요하거나 어리 적업을 표함할 수 있습나다.
    `.repeat(3);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      <Modal
        title='에시일너다 긴내 이때 듭을 이렇까지 킬던 앞겼지만'
        description={longText}
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const LongContent = {
  render: () => <LongContentComponent />,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * 반응형
 *
 * Mobile viewport 설정
 */
const ResponsiveComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal (Mobile)
      </button>
      <Modal
        title='타이틀을 입력해 주세요'
        description='부가설명을 입력해 주세요'
        open={open}
        onClose={() => setOpen(false)}
        viewport='mobile'
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const Responsive = {
  render: () => <ResponsiveComponent />,
  parameters: {
    controls: { disable: true },
  },
};
