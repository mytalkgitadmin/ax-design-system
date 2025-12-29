import { useState } from 'react';

import { Checkbox } from './index';
import { CHECKBOX_SIZES } from './types';

import type { CheckboxProps } from './types';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Checkbox 컴포넌트는 사용자가 선택/해제할 수 있는 체크박스입니다.
 *
 * ## 주요 기능
 * - size: md (20px), lg (24px)
 * - 체크/미체크 상태
 * - disabled 상태
 * - 레이블 및 부가 설명 텍스트 지원
 * - 접근성 준수 (키보드 네비게이션, ARIA 속성)
 *
 * ## 사용법
 * ```tsx
 * const [checked, setChecked] = useState(false);
 *
 * <Checkbox
 *   label="체크박스 레이블"
 *   helpText="체크박스 레이블에 대한 부가 설명"
 *   checked={checked}
 *   onChange={setChecked}
 * />
 * ```
 */
const meta = {
  title: '(test)Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: CHECKBOX_SIZES,
      description: 'Checkbox 크기 (md: 20px, lg: 24px)',
      table: {
        category: 'Appearance',
      },
    },
    checked: {
      control: 'boolean',
      description: '체크 상태',
      table: {
        category: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        category: 'State',
      },
    },
    label: {
      control: 'text',
      description: '체크박스 레이블',
      table: {
        category: 'Content',
      },
    },
    helpText: {
      control: 'text',
      description: '부가 설명 텍스트 (선택사항)',
      table: {
        category: 'Content',
      },
    },
    onChange: {
      description: '체크 상태 변경 핸들러',
      table: {
        category: 'Events',
      },
    },
    id: {
      control: 'text',
      description: 'HTML id 속성',
      table: {
        category: 'HTML',
      },
    },
    name: {
      control: 'text',
      description: 'HTML name 속성',
      table: {
        category: 'HTML',
      },
    },
  },
  args: {
    size: 'lg',
    checked: false,
    disabled: false,
    label: '체크박스 레이블',
    helpText: '체크박스 레이블에 대한 부가 설명',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Helper Components (React Hooks 규칙 준수)
// ========================================

const DefaultCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

const AllStatesLargeDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '400px',
      }}
    >
      {/* Default - Unchecked */}
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked1}
        onChange={setChecked1}
      />

      {/* Default - Checked */}
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked2}
        onChange={setChecked2}
      />

      {/* Disabled - Unchecked */}
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={false}
        disabled
      />

      {/* Disabled - Checked */}
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={true}
        disabled
      />
    </div>
  );
};

const AllStatesMediumDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '400px',
      }}
    >
      {/* Default - Unchecked */}
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked1}
        onChange={setChecked1}
      />

      {/* Default - Checked */}
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked2}
        onChange={setChecked2}
      />

      {/* Disabled - Unchecked */}
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={false}
        disabled
      />

      {/* Disabled - Checked */}
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={true}
        disabled
      />
    </div>
  );
};

const SizesDemo = () => {
  const [checkedLg, setCheckedLg] = useState(true);
  const [checkedMd, setCheckedMd] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '400px',
      }}
    >
      <Checkbox
        size='lg'
        label='체크박스 레이블 (Large - 24px)'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checkedLg}
        onChange={setCheckedLg}
      />
      <Checkbox
        size='md'
        label='체크박스 레이블 (Medium - 20px)'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checkedMd}
        onChange={setCheckedMd}
      />
    </div>
  );
};

const WithoutHelpTextDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '400px',
      }}
    >
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        checked={checked}
        onChange={setChecked}
      />
      <Checkbox
        size='md'
        label='체크박스 레이블'
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
};

const FormExampleDemo = () => {
  const [options, setOptions] = useState({
    option1: false,
    option2: true,
    option3: false,
    option4: false,
  });

  const handleChange = (key: keyof typeof options) => (checked: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minWidth: '400px',
        padding: '24px',
        border: '1px solid #e3e6ee',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
        약관 동의
      </h3>
      <Checkbox
        size='lg'
        label='[필수] 서비스 이용약관 동의'
        checked={options.option1}
        onChange={handleChange('option1')}
      />
      <Checkbox
        size='lg'
        label='[필수] 개인정보 수집 및 이용 동의'
        checked={options.option2}
        onChange={handleChange('option2')}
      />
      <Checkbox
        size='lg'
        label='[선택] 마케팅 정보 수신 동의'
        helpText='이메일, SMS 등을 통한 마케팅 정보를 받으실 수 있습니다.'
        checked={options.option3}
        onChange={handleChange('option3')}
      />
      <Checkbox
        size='lg'
        label='[선택] 이벤트 및 혜택 알림 수신 동의'
        helpText='다양한 이벤트와 혜택 정보를 받아보세요.'
        checked={options.option4}
        onChange={handleChange('option4')}
      />
    </div>
  );
};

const AccessibilityTestDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '400px',
      }}
    >
      <p style={{ fontSize: '14px', color: '#697180' }}>
        Tab 키로 포커스 이동, Space/Enter 키로 체크/해제
      </p>
      <Checkbox
        size='lg'
        label='첫 번째 체크박스'
        helpText='Tab 키로 이동하고 Space/Enter로 토글하세요'
        checked={checked1}
        onChange={setChecked1}
      />
      <Checkbox
        size='lg'
        label='두 번째 체크박스'
        helpText='키보드로 접근 가능합니다'
        checked={checked2}
        onChange={setChecked2}
      />
      <Checkbox
        size='lg'
        label='세 번째 체크박스'
        helpText='스크린 리더 지원'
        checked={checked3}
        onChange={setChecked3}
      />
      <Checkbox
        size='lg'
        label='비활성화된 체크박스'
        helpText='포커스할 수 없습니다'
        checked={false}
        disabled
      />
    </div>
  );
};

// ========================================
// Stories
// ========================================

/**
 * 기본 체크박스
 */
export const Default: Story = {
  render: (args) => <DefaultCheckbox {...args} />,
};

/**
 * 모든 상태 조합 (lg 사이즈)
 */
export const AllStatesLarge: Story = {
  render: () => <AllStatesLargeDemo />,
};

/**
 * 모든 상태 조합 (md 사이즈)
 */
export const AllStatesMedium: Story = {
  render: () => <AllStatesMediumDemo />,
};

/**
 * 사이즈 비교
 */
export const Sizes: Story = {
  render: () => <SizesDemo />,
};

/**
 * 부가 설명 없는 체크박스
 */
export const WithoutHelpText: Story = {
  render: () => <WithoutHelpTextDemo />,
};

/**
 * Disabled 상태
 */
export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        minWidth: '400px',
      }}
    >
      <Checkbox
        size='lg'
        label='체크박스 레이블 (비활성화)'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={false}
        disabled
      />
      <Checkbox
        size='lg'
        label='체크박스 레이블 (비활성화, 체크됨)'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={true}
        disabled
      />
    </div>
  ),
};

/**
 * 폼 예제 - 여러 체크박스를 함께 사용
 */
export const FormExample: Story = {
  render: () => <FormExampleDemo />,
};

/**
 * 접근성 테스트 - 키보드 네비게이션
 */
export const AccessibilityTest: Story = {
  render: () => <AccessibilityTestDemo />,
};
