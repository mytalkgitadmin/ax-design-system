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
  parameters: {
    docs: {
      description: {
        component: `
Modal 컴포넌트는 사용자의 주의를 끌고 중요한 정보를 전달하거나 사용자 입력을 받기 위한 오버레이 창입니다.

## 구성 요소

Modal은 세 가지 유형으로 사용할 수 있습니다:

### 1. Modal (기본)
- 닫기 버튼(X)이 있는 표준 모달
- 제목, 설명, 사용자 정의 컨텐츠, 액션 버튼 포함
- 가장 일반적인 사용 사례

### 2. Alert
- 닫기 버튼이 없는 모달
- 정보 전달 및 확인 용도
- 사용자가 반드시 액션 버튼을 통해 응답해야 할 때 사용

### 3. Dialog
- children prop을 통해 사용자 정의 컨텐츠를 포함
- 폼 입력, 복잡한 컨텐츠 등에 적합

## 주요 기능

- **접근성**: ARIA 속성, 포커스 관리, 키보드 내비게이션 지원
- **반응형**: 모바일(500px 이하)에서 자동으로 스타일 조정
- **애니메이션**: 부드러운 열기/닫기 애니메이션
- **스크롤 락**: Modal이 열릴 때 body 스크롤 방지
- **포커스 트랩**: Modal 내부로 포커스 제한
- **ESC 키 닫기**: closeOnEscapeKey prop으로 제어
- **Backdrop 클릭 닫기**: closeOnBackdropClick prop으로 제어
- **afterClose 콜백**: 애니메이션 완료 후 실행

## 사용 가이드

\`\`\`tsx
import { useState } from 'react';
import { Modal } from '@/components';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="타이틀"
        description="설명"
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
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: MODAL_SIZES,
      description: 'Modal의 크기를 설정합니다.',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    title: {
      control: 'text',
      description: 'Modal의 제목을 설정합니다. (필수)',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Modal의 부가 설명을 설정합니다. 최대 3줄까지 권장됩니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Modal의 열림/닫힘 상태를 제어합니다. (필수)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      description: 'Modal이 닫힐 때 호출되는 함수입니다. (필수)',
      table: {
        type: { summary: '() => void' },
      },
    },
    afterClose: {
      description:
        'Modal 닫기 애니메이션이 완료된 후 호출되는 콜백 함수입니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: '우측 상단의 X 닫기 버튼 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description:
        'Backdrop(배경)을 클릭했을 때 Modal을 닫을지 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'ESC 키를 눌렀을 때 Modal을 닫을지 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    primaryAction: {
      description:
        '주요 액션 버튼의 설정입니다. label, onClick 등을 포함합니다.',
      table: {
        type: { summary: 'ModalAction' },
      },
    },
    secondaryAction: {
      description:
        '보조 액션 버튼의 설정입니다. label, onClick 등을 포함합니다.',
      table: {
        type: { summary: 'ModalAction' },
      },
    },
    buttonsAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '버튼의 정렬 방향을 설정합니다.',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'right' },
      },
    },
    buttonsDirection: {
      control: 'select',
      options: ['row', 'column'],
      description: '버튼의 배치 방향을 설정합니다.',
      table: {
        type: { summary: 'row | column' },
        defaultValue: { summary: 'row' },
      },
    },
    buttonsGap: {
      control: 'number',
      description: '버튼 간의 간격(px)을 설정합니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
    },
    children: {
      description:
        'Modal 내부에 렌더링할 커스텀 컨텐츠입니다. Dialog 타입에서 주로 사용됩니다.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    ariaLabel: {
      control: 'text',
      description:
        'title이 없는 Modal에서 스크린리더용 레이블을 제공합니다. title이 있으면 자동으로 무시됩니다.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

/**
 * ============================================================================
 * 📖 스토리 구성 (Story Organization)
 * ============================================================================
 *
 * Modal 스토리는 다음과 같이 그룹화되어 있습니다:
 *
 * ## 📌 Basics (기본 사용)
 * - 기본 사용법: 가장 기본적인 Modal 사용 예시
 * - 크기 비교: sm, md, lg 크기 비교
 * - Alert (닫기 버튼 없음): 필수 응답이 필요한 경우
 * - Dialog (커스텀 컨텐츠): children을 활용한 폼 입력 등
 *
 * ## 🎨 Buttons (버튼 구성)
 * - 버튼 개수: 버튼 없음 / 단일 / 단일(전체) / 2개
 * - 버튼 정렬: 왼쪽 / 가운데 / 오른쪽 / 세로
 * - 버튼 비율: 1:1(기본) / 1:3 / 1:5
 * - 버튼 크기: sm, md(기본), lg, xl
 * - 버튼 스타일: variant(solid/outline/ghost) + 컬러 + 아이콘
 * - 조건부 비활성화: 폼 유효성 검사 등
 *
 * ## 🚀 Advanced (고급 기능)
 * - 긴 컨텐츠 (스크롤): 내용이 많을 때 자동 스크롤
 * - AfterClose 콜백: Modal 닫힌 후 후속 작업
 * - 비동기 작업 & 로딩: 버튼 로딩 상태
 * - 외부 결제 모듈 연동: PG사 결제창과 함께 사용
 *
 * ============================================================================
 */

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
 * ## 기본 Modal
 *
 * 가장 기본적인 Modal 사용 예시입니다.
 */
export const BasicsDefault = {
  name: '기본 사용법',
  render: (args: React.ComponentProps<typeof Modal>) => (
    <ModalWrapper {...args} />
  ),
  args: {
    title: '타이틀을 입력해 주세요',
    description: '부가설명을 입력해 주세요',
    size: 'md' as const,
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscapeKey: true,
    open: false,
    onClose: () => {},
    primaryAction: {
      label: '확인',
      onClick: () => {},
    },
    secondaryAction: {
      label: '취소',
      onClick: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Modal의 기본 사용 예시입니다. Controls 패널에서 다양한 props를 조정하여 동작을 확인할 수 있습니다.

\`\`\`tsx
import { useState } from 'react';
import { Modal } from '@/components';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="타이틀을 입력해 주세요"
        description="부가설명을 입력해 주세요"
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
}
\`\`\``,
      },
    },
  },
} satisfies StoryObj<typeof meta>;

/**
 * ## 크기 비교
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

export const BasicsSizes = {
  name: '크기 비교',
  render: () => <SizesComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `**sm**, **md**, **lg** 세 가지 크기의 Modal을 비교할 수 있습니다.

\`\`\`tsx
<Modal
  size="sm"  // 'sm' | 'md' | 'lg'
  title="Small Modal"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{
    label: '확인',
    onClick: () => setOpen(false),
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## Alert 컴포넌트
 *
 * 닫기 버튼(X)이 없는 Modal입니다. 사용자가 반드시 액션 버튼을 통해 응답해야 할 때 사용합니다.
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

export const BasicsAlert = {
  name: 'Alert (닫기 버튼 없음)',
  render: () => <AlertComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `Alert는 \`import { Alert } from "./Alert"\`로 가져올 수 있습니다.

\`\`\`tsx
import { Alert } from '@/components/Modal/Alert';

<Alert
  title="중요한 알림"
  description="이 작업을 계속하시겠습니까?"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{
    label: '확인',
    onClick: () => setOpen(false),
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## Dialog with Input
 */
const DialogWithInputComponent = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
          size: 'lg',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          size: 'lg',
          onClick: () => setOpen(false),
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            id='input1'
            label='레이블'
            placeholder='텍스트를 입력해 주세요'
            size='lg'
            full
          />
          <Input
            id='input2'
            label='레이블'
            placeholder='텍스트를 입력해 주세요'
            size='lg'
            full
          />
        </div>
      </Dialog>

      <button onClick={() => setOpen2(true)} style={{ padding: '12px 24px' }}>
        Open Dialog
      </button>
      <Dialog
        title='타이틀을 입력해 주세요'
        description='부가설명을 입력해 주세요'
        open={open2}
        onClose={() => setOpen2(false)}
        size='md'
        primaryAction={{
          label: '확인',
          onClick: () => setOpen2(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen2(false),
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

export const BasicsDialog = {
  name: 'Dialog (커스텀 컨텐츠)',
  render: () => <DialogWithInputComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `Dialog는 \`import { Dialog } from "./Dialog"\`로 가져올 수 있습니다. children을 자유롭게 추가할 수 있는 Modal입니다.

\`\`\`tsx
import { Dialog } from '@/components/Modal/Dialog';
import { Input } from '@/components';

<Dialog
  title="사용자 정보 입력"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{ label: '저장', onClick: () => setOpen(false) }}
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input id="name" label="이름" placeholder="이름을 입력해 주세요" full />
    <Input id="email" label="이메일" placeholder="이메일을 입력해 주세요" full />
  </div>
</Dialog>
\`\`\``,
      },
    },
  },
};

/**
 * ## ariaLabel (title 없는 Modal 접근성)
 *
 * title 없이 children만 사용하는 Modal에서
 * `ariaLabel`로 스크린리더용 레이블을 제공합니다.
 */
const AriaLabelComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal (제목 없음)
      </button>
      <Modal
        ariaLabel='결제 정보 입력 모달'
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          label: '결제하기',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '8px 0',
          }}
        >
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            스크린리더는 Modal 진입 시{' '}
            <strong>&ldquo;결제 정보 입력 모달, 대화상자&rdquo;</strong>를
            읽습니다.
          </p>
          <Input
            id='aria-card-number'
            label='카드 번호'
            placeholder='0000-0000-0000-0000'
            full
          />
          <Input id='aria-expiry' label='유효기간' placeholder='MM/YY' full />
        </div>
      </Modal>
    </>
  );
};

export const BasicsAriaLabel = {
  name: 'ariaLabel (접근성 레이블)',
  render: () => <AriaLabelComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `\`title\`없이 children만 사용하는 Modal에서는 \`ariaLabel\`로 스크린리더용 레이블을 제공해야 합니다.

**접근성 원칙:**
- WAI-ARIA 명세에 따르면 \`role="dialog"\`의 요소는 **반드시** 접근 가능한 이름(accessible name)을 가져야 합니다.
- \`title\`이 있으면 \`aria-labelledby\`로 자동 연결, \`title\`이 없으면 \`aria-label\`로 대체합니다.

\`\`\`tsx
// ❌ title도 ariaLabel도 없는 경우 → 접근성 위반
<Modal open={open} onClose={onClose}>
  <PaymentForm />
</Modal>

// ✅ ariaLabel로 스크린리더용 레이블 제공
<Modal
  ariaLabel="결제 정보 입력 모달"
  open={open}
  onClose={onClose}
>
  <PaymentForm />
</Modal>

// ✅ title이 있는 경우 → ariaLabel은 자동 무시
<Modal
  title="결제"
  ariaLabel="이 값은 무시됩니다"
  open={open}
  onClose={onClose}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 버튼 개수
 *
 * 버튼 없음, 단일 버튼, 2개 버튼을 모두 확인할 수 있습니다.
 */
const ButtonsCountComponent = () => {
  const [openCount, setOpenCount] = useState<
    'none' | 'single' | 'single-full' | 'dual' | null
  >(null);

  const counts: Array<{
    value: 'none' | 'single' | 'single-full' | 'dual';
    label: string;
  }> = [
    { value: 'none', label: '버튼 없음' },
    { value: 'single', label: '단일 버튼' },
    { value: 'single-full', label: '단일 버튼 (전체)' },
    { value: 'dual', label: '2개 버튼' },
  ];

  return (
    <>
      {counts.map((count) => (
        <button
          key={count.value}
          onClick={() => setOpenCount(count.value)}
          style={{ padding: '12px 24px', marginRight: '8px' }}
        >
          {count.label}
        </button>
      ))}

      {openCount === 'none' && (
        <Modal
          title='알림'
          description='이 작업이 완료되었습니다.'
          open={true}
          onClose={() => setOpenCount(null)}
          showCloseButton={true}
        />
      )}

      {openCount === 'single' && (
        <Modal
          title='확인이 필요합니다'
          description='이 작업을 진행하시겠습니까?'
          open={true}
          onClose={() => setOpenCount(null)}
          primaryAction={{
            label: '확인',
            onClick: () => setOpenCount(null),
          }}
        />
      )}

      {openCount === 'single-full' && (
        <Modal
          title='확인이 필요합니다'
          description='버튼이 전체 너비를 차지합니다.'
          open={true}
          onClose={() => setOpenCount(null)}
          primaryAction={{
            label: '확인',
            full: true,
            onClick: () => setOpenCount(null),
          }}
        />
      )}

      {openCount === 'dual' && (
        <Modal
          title='계속하시겠습니까?'
          description='변경사항이 저장되지 않을 수 있습니다.'
          open={true}
          onClose={() => setOpenCount(null)}
          primaryAction={{
            label: '확인',
            onClick: () => setOpenCount(null),
          }}
          secondaryAction={{
            label: '취소',
            onClick: () => setOpenCount(null),
          }}
        />
      )}
    </>
  );
};

export const ButtonsCount = {
  name: '버튼 개수',
  render: () => <ButtonsCountComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `버튼의 개수와 너비를 선택할 수 있습니다.

**버튼 없음**
- primaryAction, secondaryAction 모두 생략
- 닫기 버튼(X)이나 Backdrop 클릭으로만 닫을 수 있음

\`\`\`tsx
<Modal
  title="알림"
  description="완료되었습니다."
  open={open}
  onClose={() => setOpen(false)}
  showCloseButton={true}
/>
\`\`\`

**단일 버튼**
- primaryAction만 설정

\`\`\`tsx
<Modal
  title="확인"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{
    label: '확인',
    onClick: () => setOpen(false),
  }}
/>
\`\`\`

**단일 버튼 (전체 너비)**
- full: true 설정으로 버튼이 Modal 전체 너비를 차지

\`\`\`tsx
<Modal
  title="확인"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{
    label: '확인',
    full: true,
    onClick: () => setOpen(false),
  }}
/>
\`\`\`

**2개 버튼** (기본)
- primaryAction + secondaryAction

\`\`\`tsx
<Modal
  title="확인"
  open={open}
  onClose={() => setOpen(false)}
  primaryAction={{ label: '확인' }}
  secondaryAction={{ label: '취소' }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 버튼 정렬
 *
 * 왼쪽, 가운데, 오른쪽, 세로 정렬을 모두 확인할 수 있습니다.
 */
const ButtonsAlignmentComponent = () => {
  const [openAlign, setOpenAlign] = useState<
    'left' | 'center' | 'right' | 'column' | null
  >(null);

  const alignments: Array<{
    value: 'left' | 'center' | 'right' | 'column';
    label: string;
  }> = [
    { value: 'left', label: '왼쪽' },
    { value: 'center', label: '가운데' },
    { value: 'right', label: '오른쪽' },
    { value: 'column', label: '세로' },
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {alignments.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setOpenAlign(value)}
          style={{ padding: '12px 24px' }}
        >
          {label} 정렬
        </button>
      ))}
      {openAlign && (
        <Modal
          title={`버튼 ${alignments.find((a) => a.value === openAlign)?.label} 정렬`}
          description='버튼 정렬을 확인해보세요'
          open={!!openAlign}
          onClose={() => setOpenAlign(null)}
          buttonsAlign={openAlign === 'column' ? 'right' : openAlign}
          buttonsDirection={openAlign === 'column' ? 'column' : 'row'}
          primaryAction={{
            label: '확인',
            onClick: () => setOpenAlign(null),
          }}
          secondaryAction={{
            label: '취소',
            onClick: () => setOpenAlign(null),
          }}
        />
      )}
    </div>
  );
};

export const ButtonsAlignment = {
  name: '버튼 정렬',
  render: () => <ButtonsAlignmentComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `버튼 정렬을 왼쪽, 가운데, 오른쪽, 세로로 변경할 수 있습니다.

\`\`\`tsx
// 왼쪽 정렬
<Modal buttonsAlign="left" {...props} />

// 가운데 정렬
<Modal buttonsAlign="center" {...props} />

// 오른쪽 정렬 (기본값)
<Modal buttonsAlign="right" {...props} />

// 세로 배치
<Modal 
  buttonsDirection="column" 
  {...props} 
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 버튼 비율
 *
 * 1:1 (기본), 1:2, 1:3 비율을 모두 확인할 수 있습니다.
 */
const ButtonsRatioComponent = () => {
  const [openRatio, setOpenRatio] = useState<'1:1' | '1:3' | '1:5' | null>(
    null
  );

  const ratios: Array<{
    value: '1:1' | '1:3' | '1:5';
    flex: [number, number];
    label: string;
  }> = [
    { value: '1:1', flex: [1, 1], label: '1:1 (기본)' },
    { value: '1:3', flex: [1, 3], label: '1:3' },
    { value: '1:5', flex: [1, 5], label: '1:5' },
  ];

  const selectedRatio = ratios.find((r) => r.value === openRatio);

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {ratios.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setOpenRatio(value)}
          style={{ padding: '12px 24px' }}
        >
          {label}
        </button>
      ))}
      {openRatio && selectedRatio && (
        <Modal
          title={`버튼 비율 ${openRatio}`}
          description={`Secondary : Primary = ${selectedRatio.flex[0]}:${selectedRatio.flex[1]}`}
          open={!!openRatio}
          onClose={() => setOpenRatio(null)}
          primaryAction={{
            label: '확인',
            flex: selectedRatio.flex[1],
            onClick: () => setOpenRatio(null),
          }}
          secondaryAction={{
            label: '취소',
            flex: selectedRatio.flex[0],
            onClick: () => setOpenRatio(null),
          }}
        />
      )}
    </div>
  );
};

export const ButtonsRatio = {
  name: '버튼 비율',
  render: () => <ButtonsRatioComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `각 버튼의 \`flex\` prop으로 너비 비율을 조정할 수 있습니다.

\`\`\`tsx
// 1:1 (기본 - flex 지정하지 않음)
<Modal
  primaryAction={{ label: '확인' }}
  secondaryAction={{ label: '취소' }}
/>

// 1:2 비율
<Modal
  primaryAction={{ label: '확인', flex: 2 }}
  secondaryAction={{ label: '취소', flex: 1 }}
/>

// 1:3 비율
<Modal
  primaryAction={{ label: '확인', flex: 3 }}
  secondaryAction={{ label: '취소', flex: 1 }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 버튼 크기
 *
 * sm, md (기본), lg, xl 크기를 모두 확인할 수 있습니다.
 */
const ButtonsSizesComponent = () => {
  const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(
    null
  );

  const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setOpenSize(size)}
          style={{ padding: '12px 24px' }}
        >
          {size.toUpperCase()}
        </button>
      ))}
      {openSize && (
        <Modal
          title={`버튼 크기: ${openSize.toUpperCase()}`}
          description={`버튼 크기를 ${openSize}로 설정했습니다`}
          open={!!openSize}
          onClose={() => setOpenSize(null)}
          primaryAction={{
            label: '확인',
            size: openSize,
            onClick: () => setOpenSize(null),
          }}
          secondaryAction={{
            label: '취소',
            size: openSize,
            onClick: () => setOpenSize(null),
          }}
        />
      )}
    </div>
  );
};

export const ButtonsSizes = {
  name: '버튼 크기',
  render: () => <ButtonsSizesComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `버튼 크기를 sm, md (기본), lg, xl로 설정할 수 있습니다.

\`\`\`tsx
<Modal
  primaryAction={{
    label: '확인',
    size: 'lg',  // 'sm' | 'md' | 'lg' | 'xl'
  }}
  secondaryAction={{
    label: '취소',
    size: 'lg',
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 버튼 스타일
 *
 * variant (solid/outline/ghost) + 다양한 컬러 + 아이콘 조합을 확인할 수 있습니다.
 */
const ButtonsStylesComponent = () => {
  const [openStyle, setOpenStyle] = useState<string | null>(null);

  type StyleExample = {
    id: string;
    label: string;
    title: string;
    description: string;
    primary: {
      label: string;
      variant?: 'solid' | 'outline' | 'ghost';
      color?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'blue'
        | 'green'
        | 'yellow'
        | 'red';
      leftIcon?: 'Check' | 'X';
    };
    secondary: {
      label: string;
      variant?: 'solid' | 'outline' | 'ghost';
      color?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'blue'
        | 'green'
        | 'yellow'
        | 'red';
      leftIcon?: 'Check' | 'X';
    };
  };

  const styleExamples: StyleExample[] = [
    {
      id: 'success',
      label: '성공 (Green Solid)',
      title: '작업이 완료되었습니다',
      description: '모든 변경사항이 저장되었습니다.',
      primary: {
        label: '확인',
        variant: 'outline',
        color: 'green',
        leftIcon: 'Check',
      },
      secondary: { label: '닫기', variant: 'solid', color: 'tertiary' },
    },
    {
      id: 'danger',
      label: '위험 (Red Outline)',
      title: '정말 삭제하시겠습니까?',
      description: '이 작업은 되돌릴 수 없습니다.',
      primary: {
        label: '삭제',
        variant: 'outline',
        color: 'red',
        leftIcon: 'X',
      },
      secondary: { label: '취소', variant: 'solid', color: 'tertiary' },
    },

    {
      id: 'info',
      label: '정보 (Blue Ghost)',
      title: '새로운 업데이트',
      description: '새로운 기능이 추가되었습니다.',
      primary: { label: '확인', variant: 'ghost', color: 'blue' },
      secondary: { label: '나중에', variant: 'ghost', color: 'tertiary' },
    },
  ];

  const selectedStyle = styleExamples.find((s) => s.id === openStyle);

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {styleExamples.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setOpenStyle(id)}
          style={{ padding: '12px 24px' }}
        >
          {label}
        </button>
      ))}
      {openStyle && selectedStyle && (
        <Modal
          title={selectedStyle.title}
          description={selectedStyle.description}
          open={!!openStyle}
          onClose={() => setOpenStyle(null)}
          primaryAction={{
            ...selectedStyle.primary,
            onClick: () => setOpenStyle(null),
          }}
          secondaryAction={{
            ...selectedStyle.secondary,
            onClick: () => setOpenStyle(null),
          }}
        />
      )}
    </div>
  );
};

export const ButtonsStyles = {
  name: '버튼 스타일',
  render: () => <ButtonsStylesComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `variant (solid/outline/ghost), 다양한 컬러, 아이콘을 조합하여 상황에 맞는 버튼 스타일을 만들 수 있습니다.

**사용 가능한 옵션:**
- **variant**: \`solid\` | \`outline\` | \`ghost\`
- **color**: \`primary\` | \`secondary\` | \`tertiary\` | \`blue\` | \`green\` | \`yellow\` | \`red\`
- **leftIcon / rightIcon**: 아이콘 추가


\`\`\`tsx
// 성공 스타일
<Modal
  primaryAction={{
    label: '확인',
    variant: 'solid',
    color: 'green',
    leftIcon: 'Check',
  }}
/>

// 위험 작업 확인
<Modal
  primaryAction={{
    label: '삭제',
    variant: 'outline',
    color: 'red',
    leftIcon: 'X',
  }}
  secondaryAction={{
    label: '취소',
    variant: 'solid',
    color: 'secondary',
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 조건부 비활성화
 */
const DisabledButtonComponent = () => {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      <Modal
        title='약관 동의'
        description='계속하려면 아래 체크박스를 선택해주세요'
        open={open}
        onClose={() => setOpen(false)}
        primaryAction={{
          label: '계속하기',
          disabled: !agreed,
          leftIcon: 'Check',
          onClick: () => setOpen(false),
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setOpen(false),
        }}
      >
        <div style={{ padding: '16px 0' }}>
          <label style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
            <input
              type='checkbox'
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
          </label>
        </div>
      </Modal>
    </>
  );
};

export const ButtonsDisabled = {
  name: '조건부 비활성화',
  render: () => <DisabledButtonComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `\`disabled\` prop을 사용하여 조건부로 버튼을 비활성화할 수 있습니다.

**사용 예시:**
- 폼 유효성 검사 실패 시
- 필수 동의 항목 미체크 시
- 비동기 작업 진행 중 (\`loading\` prop과 함께)

\`\`\`tsx
function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Modal
      primaryAction={{
        label: '계속하기',
        disabled: !agreed,  // 동의하지 않으면 비활성화
        onClick: handleSubmit,
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        이용약관에 동의합니다
      </label>
    </Modal>
  );
}
\`\`\``,
      },
    },
  },
};

/**
 * ## 긴 컨텐츠
 */
const LongContentComponent = () => {
  const [open, setOpen] = useState(false);
  const longText = `
      예시입니다 긴내용 이때 등을 이렇게까지 길던 앞겠지만
      대한 상다는 사용자에게 작업에 대한 알리고 중요한 정보를 표현하거나 결정이 필요하거나 여러 작업을 표현할 수 있습니다.
      대한 상다는 사용자에게 작업에 대한 알리고 중요한 정보를 표현하거나 결정이 필요하거나 여러 작업을 표현할 수 있습니다.
      대한 상다는 사용자에게 작업에 대한 알리고 중요한 정보를 표현하거나 결정이 필요하거나 여러 작업을 표현할 수 있습니다.
    `.repeat(5);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      <Modal
        title='긴 컨텐츠 예시'
        description='스크롤이 필요한 긴 내용을 확인할 수 있습니다'
        children={longText}
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

export const AdvancedLongContent = {
  name: '긴 컨텐츠 (스크롤)',
  render: () => <LongContentComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `긴 컨텐츠는 자동으로 스크롤 영역이 생성됩니다. 헤더(제목)와 푸터(버튼)는 고정됩니다.`,
      },
    },
  },
};

/**
 * ## AfterClose 콜백
 */
const AfterCloseComponent = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      {message && (
        <p style={{ marginTop: '16px', color: '#1fa45c' }}>✓ {message}</p>
      )}
      <Modal
        title='afterClose 콜백 테스트'
        description='Modal을 닫으면 아래에 메시지가 표시됩니다'
        open={open}
        onClose={() => setOpen(false)}
        afterClose={() => {
          setMessage('Modal이 완전히 닫혔습니다! (애니메이션 완료)');
          setTimeout(() => setMessage(''), 3000);
        }}
        primaryAction={{
          label: '확인',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const AdvancedAfterCloseCallback = {
  name: 'AfterClose 콜백',
  render: () => <AfterCloseComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `\`afterClose\` 콜백은 Modal이 완전히 닫힌 후(애니메이션 완료 후) 실행됩니다.

**onClose vs afterClose:**
- \`onClose\`: Modal 닫기 시작 시 즉시 호출 (state 업데이트)
- \`afterClose\`: 닫기 애니메이션 완료 후 호출 (테마 설정에 따라 200ms ~ 600ms 후)

**사용 예시:**
- 폼 초기화
- 성공 메시지 표시
- 다음 Modal 열기
- 페이지 리다이렉트

\`\`\`tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  afterClose={() => {
    // 애니메이션 완료 후 실행
    console.log('Modal이 완전히 닫혔습니다');
    // 폼 초기화, 후속 작업 등
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 비동기 작업 & 로딩 상태
 *
 * 비동기 작업 중 버튼에 로딩 스피너를 표시합니다.
 */
const AsyncLoadingComponent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    // 비동기 작업 시뮬레이션 (3초)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoading(false);
    setMessage('✓ 작업이 완료되었습니다!');
    setOpen(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: '12px 24px' }}>
        Open Modal
      </button>
      {message && (
        <p style={{ marginTop: '16px', color: '#1fa45c' }}>{message}</p>
      )}
      <Modal
        title='비동기 작업 테스트'
        description='확인 버튼을 누르면 3초간 로딩 스피너가 표시됩니다'
        open={open}
        onClose={() => setOpen(false)}
        closeOnBackdropClick={!loading}
        closeOnEscapeKey={!loading}
        showCloseButton={!loading}
        primaryAction={{
          label: '확인',
          loading: loading,
          onClick: handleSubmit,
        }}
        secondaryAction={{
          label: '취소',
          disabled: loading,
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
};

export const AdvancedAsyncLoading = {
  name: '비동기 작업 & 로딩',
  render: () => <AsyncLoadingComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `비동기 작업 중 버튼에 로딩 상태를 표시할 수 있습니다.

**주요 기능:**
- \`loading: true\` 시 버튼에 "Loading..." 텍스트 표시 (추후 스피너 디자인 적용 예정)
- loading 중에는 자동으로 disabled 처리
- 로딩 중 Modal 닫기 방지 (backdrop, ESC, X 버튼)

**Best Practice:**
- Primary 버튼에 loading 표시
- Secondary 버튼은 disabled 처리
- 로딩 중에는 Modal 닫기 차단

\`\`\`tsx
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  
  try {
    await someAsyncOperation();
    setOpen(false);
  } finally {
    setLoading(false);
  }
};

<Modal
  open={open}
  onClose={() => setOpen(false)}
  closeOnBackdropClick={!loading}
  closeOnEscapeKey={!loading}
  showCloseButton={!loading}
  primaryAction={{
    label: '확인',
    loading: loading,
    onClick: handleSubmit,
  }}
  secondaryAction={{
    label: '취소',
    disabled: loading,
    onClick: () => setOpen(false),
  }}
/>
\`\`\``,
      },
    },
  },
};

/**
 * ## 외부 결제 모듈 연동
 *
 * 토스페이, KG이니시스 등 외부 PG사 결제 모듈과 함께 사용할 때의 패턴입니다.
 * 결제 모듈은 자체 팝업/레이어를 띄우므로, Modal은 결제 전후 UI로만 활용합니다.
 */
const ExternalPaymentComponent = () => {
  const [step, setStep] = useState<'idle' | 'confirm' | 'processing' | 'done'>(
    'idle'
  );

  const handlePaymentRequest = async () => {
    // 1. 확인 Modal 닫힘과 동시에 외부 결제 모듈 실행
    setStep('processing');

    // 외부 결제 SDK 호출 시뮬레이션
    // 실제로는: window.PAYMODULE.requestPayment({ ... })
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setStep('done');
  };

  return (
    <>
      <button
        onClick={() => setStep('confirm')}
        style={{ padding: '12px 24px' }}
        disabled={step === 'processing'}
      >
        결제하기
      </button>

      {step === 'processing' && (
        <p style={{ marginTop: '12px', color: '#888' }}>
          ⏳ 외부 결제 모듈 처리 중...
        </p>
      )}

      {/* 1단계: 결제 확인 Modal */}
      {/* onClick이 없어도 되도록 ModalAction.onClick은 optional */}
      <Modal
        title='결제를 진행하시겠습니까?'
        description='확인을 누르면 외부 결제 모듈이 실행됩니다. 결제창이 별도로 열립니다.'
        open={step === 'confirm'}
        onClose={() => setStep('idle')}
        closeOnBackdropClick={false}
        closeOnEscapeKey={false}
        primaryAction={{
          label: '결제 진행',
          color: 'blue',
          onClick: handlePaymentRequest,
        }}
        secondaryAction={{
          label: '취소',
          onClick: () => setStep('idle'),
        }}
      />

      {/* 2단계: 결제 완료 Modal */}
      <Modal
        title='결제가 완료되었습니다 ✅'
        description='결제가 정상적으로 처리되었습니다.'
        open={step === 'done'}
        onClose={() => setStep('idle')}
        showCloseButton={false}
        closeOnBackdropClick={false}
        primaryAction={{
          label: '확인',
          color: 'green',
          onClick: () => setStep('idle'),
        }}
      />
    </>
  );
};

export const AdvancedExternalPayment = {
  name: '외부 결제 모듈 연동',
  render: () => <ExternalPaymentComponent />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `외부 PG사 결제 모듈(토스페이, KG이니시스 등)과 함께 Modal을 활용하는 패턴입니다.

**핵심 포인트:**
- \`closeOnBackdropClick={false}\` + \`closeOnEscapeKey={false}\`: 결제 진행 중 실수로 닫히는 것 방지
- \`showCloseButton={false}\`: 완료 Modal에서 X 버튼 제거로 명확한 CTA 유도
- \`onClick\`의 async 지원으로 결제 API 호출을 자연스럽게 처리
- \`ModalAction.onClick\`은 optional이므로, 외부 모듈이 자체 버튼을 관리하는 경우 생략 가능

\`\`\`tsx
// 결제 확인 Modal
<Modal
  title="결제를 진행하시겠습니까?"
  open={step === 'confirm'}
  onClose={() => setStep('idle')}
  closeOnBackdropClick={false}
  closeOnEscapeKey={false}
  primaryAction={{
    label: '결제 진행',
    onClick: async () => {
      setStep('processing');
      // 외부 결제 SDK 호출
      await window.PAYMODULE.requestPayment({ orderId, amount });
      setStep('done');
    },
  }}
  secondaryAction={{
    label: '취소',
    onClick: () => setStep('idle'),
  }}
/>
\`\`\``,
      },
    },
  },
};
