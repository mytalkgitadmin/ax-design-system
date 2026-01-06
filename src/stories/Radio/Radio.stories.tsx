import React, { useState } from 'react';

import { Radio } from './index';
import { RadioGroup } from './RadioGroup';
import { RADIO_SIZES, RadioProps } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Radio 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `string` (required) |
 * | `size` | `md` \| `lg` |
 * | `checked` | `boolean` |
 * | `defaultChecked` | `boolean` |
 * | `disabled` | `boolean` |
 * | `labelPlacement` | `start` \| `end` |
 * | `helpText` | `string` |
 * | `onChange` | `(checked: boolean) => void` |
 * | `id` | `string` |
 * | `name` | `string` (required for grouping) |
 * | `value` | `string` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Radio, RadioGroup } from '@bemily/design-system';
 *
 * // RadioGroup 사용 (권장)
 * const [value, setValue] = useState('option1');
 * <RadioGroup
 *   name="options"
 *   label="옵션 선택"
 *   value={value}
 *   onChange={setValue}
 *   required
 *   options={[
 *     { value: 'option1', label: '옵션 1' },
 *     { value: 'option2', label: '옵션 2' },
 *   ]}
 * />
 *
 * // 단독 사용
 * const [selected, setSelected] = useState('option1');
 * <Radio
 *   name="option"
 *   value="option1"
 *   label="옵션 1"
 *   checked={selected === 'option1'}
 *   onChange={() => setSelected('option1')}
 * />
 * ```
 */
const meta = {
  title: 'Components/Input-Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: RADIO_SIZES,
      description: '라디오 크기 (md: 20px, lg: 24px)',
      table: {
        category: 'Appearance',
      },
    },
    checked: {
      control: 'boolean',
      description: '선택 상태',
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
      description: '라디오 레이블',
      table: {
        category: 'Appearance',
      },
    },
    helpText: {
      control: 'text',
      description: '부가 설명 텍스트 (선택사항)',
      table: {
        category: 'Appearance',
      },
    },
    id: {
      control: false,
      table: {
        category: 'HTML',
      },
    },
    name: {
      control: false,
      table: {
        category: 'HTML',
      },
    },
    className: {
      control: false,
      table: {
        category: 'HTML',
      },
    },

    value: {
      control: false,
      table: {
        category: 'HTML',
      },
    },
    onChange: {
      control: false,
      table: {
        category: 'HTML',
      },
    },
  },
  args: {
    size: 'lg',
    checked: false,
    disabled: false,
    label: '라디오 레이블',
    helpText: '라디오 레이블에 대한 부가 설명',
    name: 'radio-demo',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultRadio = (args: RadioProps) => {
  const [checked, setChecked] = useState(args.checked || false);

  React.useEffect(() => {
    setChecked(args.checked || false);
  }, [args.checked]);

  return <Radio {...args} checked={checked} onChange={setChecked} />;
};
const AllStatesDemo = () => {
  const [selectedLg, setSelectedLg] = useState('checked');
  const [selectedMd, setSelectedMd] = useState('checked');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr',
        placeItems: 'center left',
        gap: '24px',
        fontSize: '14px',
      }}
    >
      <div></div>
      <h3>lg</h3>
      <h3>md</h3>
      <p>default</p>
      <Radio
        name='lg-demo'
        value='default'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='lg'
        checked={selectedLg === 'default'}
        onChange={() => setSelectedLg('default')}
      />
      <Radio
        name='md-demo'
        value='default'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='md'
        checked={selectedMd === 'default'}
        onChange={() => setSelectedMd('default')}
      />
      <p>checked</p>
      <Radio
        name='lg-demo'
        value='checked'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='lg'
        checked={selectedLg === 'checked'}
        onChange={() => setSelectedLg('checked')}
      />
      <Radio
        name='md-demo'
        value='checked'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='md'
        checked={selectedMd === 'checked'}
        onChange={() => setSelectedMd('checked')}
      />
      <p>disabled</p>
      <Radio
        name='lg-demo'
        value='disabled'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='lg'
        checked={false}
        disabled
      />
      <Radio
        name='md-demo'
        value='disabled'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='md'
        checked={false}
        disabled
      />
      <p>disabled - checked</p>
      <Radio
        name='lg-demo'
        value='checked-disabled'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='lg'
        checked={true}
        disabled
      />
      <Radio
        name='md-demo'
        value='checked-disabled'
        label='라디오 레이블'
        helpText='라디오 레이블에 대한 부가 설명'
        size='md'
        checked={true}
        disabled
      />
    </div>
  );
};

const RadioGroupDemo = () => {
  const [valueLg, setValueLg] = useState<string>('');
  const [valueMd, setValueMd] = useState<string>('');
  const [valueLgNoDesc, setValueLgNoDesc] = useState<string>('');
  const [valueMdNoDesc, setValueMdNoDesc] = useState<string>('');

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
    >
      <RadioGroup
        label='성별(lg)'
        name='gender-lg'
        onChange={setValueLg}
        value={valueLg}
        size='lg'
        options={[
          { value: 'male', label: '남성', helpText: '정열적인 색상' },
          { value: 'female', label: '여성', helpText: '차분한 색상' },
          { value: 'none', label: '미제공', helpText: '자연의 색상' },
        ]}
      />

      <RadioGroup
        label='성별(md)'
        name='gender-md'
        onChange={setValueMd}
        value={valueMd}
        size='md'
        options={[
          { value: 'male', label: '남성', helpText: '정열적인 색상' },
          { value: 'female', label: '여성', helpText: '차분한 색상' },
          { value: 'none', label: '미제공', helpText: '자연의 색상' },
        ]}
      />
      <RadioGroup
        label='성별(lg-설명없음)'
        name='gender-lg-no-desc'
        onChange={setValueLgNoDesc}
        value={valueLgNoDesc}
        size='lg'
        options={[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'none', label: '미제공' },
        ]}
      />

      <RadioGroup
        label='성별(md-설명없음)'
        name='gender-md-no-desc'
        onChange={setValueMdNoDesc}
        value={valueMdNoDesc}
        size='md'
        options={[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'none', label: '미제공' },
        ]}
      />
    </div>
  );
};

const RadioGroupHorizonDemo = () => {
  const [valueLg, setValueLg] = useState<string>('');
  const [valueMd, setValueMd] = useState<string>('');
  const [valueLgWithDesc, setValueLgWithDesc] = useState<string>('');
  const [valueMdWithDesc, setValueMdWithDesc] = useState<string>('');

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <RadioGroup
        label='성별(가로-lg)'
        name='gender-horizontal-lg'
        onChange={setValueLg}
        value={valueLg}
        direction='horizontal'
        size='lg'
        options={[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'none', label: '미제공' },
        ]}
      />

      <RadioGroup
        label='성별(가로-md)'
        name='gender-horizontal-md'
        onChange={setValueMd}
        value={valueMd}
        direction='horizontal'
        size='md'
        options={[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'none', label: '미제공' },
        ]}
      />

      <RadioGroup
        label='성별(가로-lg-설명)'
        name='gender-horizontal-lg-with-desc'
        onChange={setValueLgWithDesc}
        value={valueLgWithDesc}
        size='lg'
        direction='horizontal'
        options={[
          { value: 'male', label: '남성', helpText: '정열적인 색상' },
          { value: 'female', label: '여성', helpText: '차분한 색상' },
          { value: 'none', label: '미제공', helpText: '자연의 색상' },
        ]}
      />

      <RadioGroup
        label='성별(가로-md-설명)'
        name='gender-horizontal-md-with-desc'
        onChange={setValueMdWithDesc}
        value={valueMdWithDesc}
        size='md'
        direction='horizontal'
        options={[
          { value: 'male', label: '남성', helpText: '정열적인 색상' },
          { value: 'female', label: '여성', helpText: '차분한 색상' },
          { value: 'none', label: '미제공', helpText: '자연의 색상' },
        ]}
      />
    </div>
  );
};

// ========================================
// Stories
// ========================================
/**
 * 기본 라디오
 */
export const Default: Story = {
  render: (args) => <DefaultRadio {...args} />,
};

/**
 * 모든 상태 조합
 */
export const AllStates: Story = {
  render: () => <AllStatesDemo />,
};

/**
 * RadioGroup 컴포넌트
 *
 * 여러 라디오 버튼을 그룹으로 관리합니다.
 *
 * ## 사용법
 * ```tsx
 * import { RadioGroup } from '@bemily/design-system';
 *
 * const [value, setValue] = useState('option1');
 *
 * <RadioGroup
 *   name="options"
 *   label="옵션 선택"
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { value: 'option1', label: '옵션 1', helpText: '첫 번째 옵션' },
 *     { value: 'option2', label: '옵션 2', helpText: '두 번째 옵션' },
 *   ]}
 * />
 * ```
 */
export const Group: Story = {
  render: () => <RadioGroupDemo />,
};

/**
 * RadioGroup - 가로 방향
 *
 * direction="horizontal"을 사용하여 라디오 버튼을 가로로 배치합니다.
 *
 * ## 사용법
 * ```tsx
 * <RadioGroup
 *   name="options"
 *   value={value}
 *   onChange={setValue}
 *   direction="horizontal"
 *   options={[
 *     { value: 'a', label: '옵션 A' },
 *     { value: 'b', label: '옵션 B' },
 *   ]}
 * />
 * ```
 */
export const GroupHorizon: Story = {
  render: () => <RadioGroupHorizonDemo />,
};

/**
 * 비제어 컴포넌트 예시
 *
 * `defaultChecked`를 사용하면 React state 없이 폼을 구성할 수 있습니다.
 * 이 방식은 간단한 폼이나 폼 제출 시에만 값이 필요한 경우에 유용합니다.
 *
 * ## 사용 시나리오
 * - 간단한 설정 폼
 * - 서버에 제출만 하면 되는 경우
 * - React state 관리가 불필요한 경우
 */
export const UncontrolledExample: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const color = formData.get('color');
      const size = formData.get('size');

      alert(
        `선택된 값:\n색상: ${color || '선택 안 함'}\n사이즈: ${size || '선택 안 함'}`
      );
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          maxWidth: '400px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '18px' }}>상품 옵션 선택</h3>

        <div>
          <p style={{ margin: '0 0 12px 0', fontWeight: 600 }}>색상</p>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <Radio
              name='color'
              value='red'
              label='빨강'
              helpText='정열적인 색상'
              defaultChecked={false}
            />
            <Radio
              name='color'
              value='blue'
              label='파랑'
              helpText='차분한 색상'
              defaultChecked={true}
            />
            <Radio
              name='color'
              value='green'
              label='초록'
              helpText='자연의 색상'
              defaultChecked={false}
            />
          </div>
        </div>

        <div>
          <p style={{ margin: '0 0 12px 0', fontWeight: 600 }}>사이즈</p>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <Radio name='size' value='small' label='S' defaultChecked={false} />
            <Radio name='size' value='medium' label='M' defaultChecked={true} />
            <Radio name='size' value='large' label='L' defaultChecked={false} />
          </div>
        </div>

        <button
          type='submit'
          style={{
            padding: '10px 20px',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          선택 완료
        </button>

        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: '#6B7280',
            lineHeight: 1.5,
          }}
        >
          💡 이 폼은 비제어 컴포넌트로 구현되어 있습니다.
          <br />
          React state 없이 defaultChecked와 FormData로 값을 관리합니다.
        </p>
      </form>
    );
  },
};

const RequiredExampleComponent = () => {
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const canSubmit = gender !== '' && age !== '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        maxWidth: '400px',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '18px' }}>회원 가입</h3>

      <RadioGroup
        label='성별'
        name='gender'
        value={gender}
        onChange={setGender}
        required
        options={[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'other', label: '선택 안 함' },
        ]}
      />

      <RadioGroup
        label='연령대'
        name='age'
        value={age}
        onChange={setAge}
        required
        size='md'
        options={[
          { value: '10s', label: '10대' },
          { value: '20s', label: '20대' },
          { value: '30s', label: '30대' },
          { value: '40s', label: '40대 이상' },
        ]}
      />

      <button
        type='submit'
        disabled={!canSubmit}
        style={{
          padding: '10px 20px',
          backgroundColor: canSubmit ? '#3B82F6' : '#D1D5DB',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          transition: 'background-color 0.2s',
        }}
      >
        다음 단계로
      </button>

      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: '#6B7280',
          lineHeight: 1.5,
        }}
      >
        💡 필수 항목(*) 을 모두 선택하면 버튼이 활성화됩니다.
      </p>
    </div>
  );
};

/**
 * Required 필수 입력 표시
 *
 * RadioGroup에 `required` prop을 전달하면 그룹 레이블 옆에 빨간색 별표(*)가 표시됩니다.
 * 개별 Radio 컴포넌트가 아닌 **RadioGroup 레이블에만** 표시되는 점이 특징입니다.
 *
 * ## 사용법
 * ```tsx
 * <RadioGroup
 *   label="성별"
 *   name="gender"
 *   required
 *   options={[...]}
 * />
 * ```
 */
export const RequiredExample: Story = {
  render: () => <RequiredExampleComponent />,
};

const LabelPlacementExampleComponent = () => {
  const [selectedStart, setSelectedStart] = useState('option1');
  const [selectedEnd, setSelectedEnd] = useState('option1');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '24px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>
          labelPlacement="start" (기본값)
        </h4>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            color: '#6B7280',
          }}
        >
          라디오 버튼이 왼쪽에 위치합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            name='start-demo'
            value='option1'
            label='옵션 1'
            helpText='첫 번째 옵션입니다'
            labelPlacement='start'
            checked={selectedStart === 'option1'}
            onChange={() => setSelectedStart('option1')}
          />
          <Radio
            name='start-demo'
            value='option2'
            label='옵션 2'
            helpText='두 번째 옵션입니다'
            labelPlacement='start'
            checked={selectedStart === 'option2'}
            onChange={() => setSelectedStart('option2')}
          />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>labelPlacement="end"</h4>
        <p
          style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            color: '#6B7280',
          }}
        >
          라디오 버튼이 오른쪽에 위치합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Radio
            name='end-demo'
            value='option1'
            label='옵션 1'
            helpText='첫 번째 옵션입니다'
            labelPlacement='end'
            checked={selectedEnd === 'option1'}
            onChange={() => setSelectedEnd('option1')}
          />
          <Radio
            name='end-demo'
            value='option2'
            label='옵션 2'
            helpText='두 번째 옵션입니다'
            labelPlacement='end'
            checked={selectedEnd === 'option2'}
            onChange={() => setSelectedEnd('option2')}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Label Placement 위치 제어
 *
 * 개별 Radio 컴포넌트에서 `labelPlacement` prop으로 레이블과 라디오 버튼의 위치를 제어할 수 있습니다.
 *
 * ## 옵션
 * - `start` (기본값): 라디오 버튼이 왼쪽, 레이블이 오른쪽
 * - `end`: 레이블이 왼쪽, 라디오 버튼이 오른쪽
 *
 * ## 사용법
 * ```tsx
 * <Radio label="라디오 왼쪽" labelPlacement="start" />
 * <Radio label="라디오 오른쪽" labelPlacement="end" />
 * ```
 */
export const LabelPlacementExample: Story = {
  render: () => <LabelPlacementExampleComponent />,
};
