import React, { useState } from 'react';

import { CheckboxGroup } from './CheckboxGroup';
import { Checkbox } from './index';
import { CHECKBOX_SIZES } from './types';

import type { CheckboxProps } from './types';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Checkbox 컴포넌트는 사용자가 선택/해제할 수 있는 체크박스입니다.
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
 * | `required` | `boolean` |
 * | `labelPlacement` | `start` \| `end` |
 * | `helpText` | `string` |
 * | `onChange` | `(checked: boolean) => void` |
 * | `id` | `string` |
 * | `name` | `string` |
 * | `value` | `string` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Checkbox, CheckboxGroup } from '@bemily/design-system';
 *
 * // 제어 컴포넌트
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   label="동의합니다"
 *   checked={checked}
 *   onChange={setChecked}
 * />
 *
 * // 비제어 컴포넌트
 * <Checkbox label="약관 동의" defaultChecked={true} />
 *
 * // CheckboxGroup으로 여러 옵션 관리
 * const [values, setValues] = useState<string[]>([]);
 * <CheckboxGroup
 *   label="관심사"
 *   name="interests"
 *   value={values}
 *   onChange={setValues}
 *   options={[
 *     { value: 'design', label: '디자인' },
 *     { value: 'dev', label: '개발' },
 *   ]}
 * />
 * ```
 */
const meta = {
  title: 'Components/Input-Checkbox',
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
    label: '체크박스 레이블',
    helpText: '체크박스 레이블에 대한 부가 설명',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);

  React.useEffect(() => {
    setChecked(args.checked || false);
  }, [args.checked]);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

const AllStatesDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

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
      <Checkbox
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        size='lg'
        checked={checked1}
        onChange={setChecked1}
      />
      <Checkbox
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        size='md'
        checked={checked1}
        onChange={setChecked1}
      />
      <p>checked</p>
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked2}
        onChange={setChecked2}
      />
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={checked2}
        onChange={setChecked2}
      />
      <p>disabled</p>
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={false}
        disabled
      />
      <Checkbox
        size='md'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={false}
        disabled
      />
      <p>disabled - checked</p>
      <Checkbox
        size='lg'
        label='체크박스 레이블'
        helpText='체크박스 레이블에 대한 부가 설명'
        checked={true}
        disabled
      />
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

const CheckboxGroupDemo = () => {
  const [valuesLg, setValuesLg] = useState<string[]>([]);
  const [valuesMd, setValuesMd] = useState<string[]>([]);
  const [valuesLgNoDesc, setValuesLgNoDesc] = useState<string[]>([]);
  const [valuesMdNoDesc, setValuesMdNoDesc] = useState<string[]>([]);

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
    >
      <CheckboxGroup
        label='관심사(lg)'
        name='interests-lg'
        onChange={setValuesLg}
        value={valuesLg}
        size='lg'
        options={[
          { value: 'coding', label: '코딩', helpText: '프로그래밍' },
          { value: 'design', label: '디자인', helpText: 'UI/UX' },
          { value: 'planning', label: '기획', helpText: '기획 및 전략' },
        ]}
      />

      <CheckboxGroup
        label='관심사(md)'
        name='interests-md'
        onChange={setValuesMd}
        value={valuesMd}
        size='md'
        options={[
          { value: 'coding', label: '코딩', helpText: '프로그래밍' },
          { value: 'design', label: '디자인', helpText: 'UI/UX' },
          { value: 'planning', label: '기획', helpText: '기획 및 전략' },
        ]}
      />
      <CheckboxGroup
        label='관심사(lg-설명없음)'
        name='interests-lg-no-desc'
        onChange={setValuesLgNoDesc}
        value={valuesLgNoDesc}
        size='lg'
        options={[
          { value: 'coding', label: '코딩' },
          { value: 'design', label: '디자인' },
          { value: 'planning', label: '기획' },
        ]}
      />

      <CheckboxGroup
        label='관심사(md-설명없음)'
        name='interests-md-no-desc'
        onChange={setValuesMdNoDesc}
        value={valuesMdNoDesc}
        size='md'
        options={[
          { value: 'coding', label: '코딩' },
          { value: 'design', label: '디자인' },
          { value: 'planning', label: '기획' },
        ]}
      />
    </div>
  );
};

const CheckboxGroupHorizonDemo = () => {
  const [valuesLg, setValuesLg] = useState<string[]>([]);
  const [valuesMd, setValuesMd] = useState<string[]>([]);
  const [valuesLgWithDesc, setValuesLgWithDesc] = useState<string[]>([]);
  const [valuesMdWithDesc, setValuesMdWithDesc] = useState<string[]>([]);

  return (
    <div style={{ display: 'grid', gap: '32px' }}>
      <CheckboxGroup
        label='관심사(가로-lg)'
        name='interests-horizontal-lg'
        onChange={setValuesLg}
        value={valuesLg}
        direction='horizontal'
        size='lg'
        options={[
          { value: 'coding', label: '코딩' },
          { value: 'design', label: '디자인' },
          { value: 'planning', label: '기획' },
        ]}
      />

      <CheckboxGroup
        label='관심사(가로-md)'
        name='interests-horizontal-md'
        onChange={setValuesMd}
        value={valuesMd}
        direction='horizontal'
        size='md'
        options={[
          { value: 'coding', label: '코딩' },
          { value: 'design', label: '디자인' },
          { value: 'planning', label: '기획' },
        ]}
      />

      <CheckboxGroup
        label='관심사(가로-lg-설명)'
        name='interests-horizontal-lg-with-desc'
        onChange={setValuesLgWithDesc}
        value={valuesLgWithDesc}
        size='lg'
        direction='horizontal'
        options={[
          { value: 'coding', label: '코딩', helpText: '프로그래밍' },
          { value: 'design', label: '디자인', helpText: 'UI/UX' },
          { value: 'planning', label: '기획', helpText: '기획 및 전략' },
        ]}
      />

      <CheckboxGroup
        label='관심사(가로-md-설명)'
        name='interests-horizontal-md-with-desc'
        onChange={setValuesMdWithDesc}
        value={valuesMdWithDesc}
        size='md'
        direction='horizontal'
        options={[
          { value: 'coding', label: '코딩', helpText: '프로그래밍' },
          { value: 'design', label: '디자인', helpText: 'UI/UX' },
          { value: 'planning', label: '기획', helpText: '기획 및 전략' },
        ]}
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
 * 모든 상태 조합
 */
export const AllStates: Story = {
  render: () => <AllStatesDemo />,
};

/**
 * CheckboxGroup 컴포넌트
 *
 * 여러 체크박스를 그룹으로 관리합니다.
 *
 * ## 사용법
 * ```tsx
 * import { CheckboxGroup } from '@bemily/design-system';
 *
 * const [values, setValues] = useState<string[]>(['option1']);
 *
 * <CheckboxGroup
 *   name="interests"
 *   label="관심사 선택"
 *   value={values}
 *   onChange={setValues}
 *   options={[
 *     { value: 'option1', label: '옵션 1', helpText: '첫 번째 옵션' },
 *     { value: 'option2', label: '옵션 2', helpText: '두 번째 옵션' },
 *   ]}
 * />
 * ```
 */
export const Group: Story = {
  render: () => <CheckboxGroupDemo />,
};

/**
 * CheckboxGroup - 가로 방향
 *
 * direction="horizontal"을 사용하여 체크박스를 가로로 배치합니다.
 *
 * ## 사용법
 * ```tsx
 * <CheckboxGroup
 *   name="interests"
 *   value={values}
 *   onChange={setValues}
 *   direction="horizontal"
 *   options={[
 *     { value: 'a', label: '옵션 A' },
 *     { value: 'b', label: '옵션 B' },
 *   ]}
 * />
 * ```
 */
export const GroupHorizon: Story = {
  render: () => <CheckboxGroupHorizonDemo />,
};

/**
 * 비제어 컴포넌트 (Uncontrolled)
 *
 * `defaultChecked`를 사용하여 초기값만 설정하고, 이후에는 컴포넌트가 자체적으로 상태를 관리합니다.
 * 폼 제출 시에만 값이 필요한 경우에 유용합니다.
 *
 * ## 사용 케이스
 * - 간단한 폼 (제출 시에만 값 확인)
 * - 서버에서 받은 초기값으로 시작
 * - 부모 컴포넌트의 리렌더링 최소화
 *
 * ## 사용법
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   <Checkbox
 *     name="terms"
 *     label="약관에 동의합니다"
 *     defaultChecked={true}
 *     required
 *   />
 *   <button type="submit">제출</button>
 * </form>
 * ```
 */
export const UncontrolledExample: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const marketing = formData.get('marketing') === 'on';
      const newsletter = formData.get('newsletter') === 'on';
      const notifications = formData.get('notifications') === 'on';

      alert(
        `폼 제출 결과:\n마케팅: ${marketing}\n뉴스레터: ${newsletter}\n알림: ${notifications}`
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
        <h3 style={{ margin: 0, fontSize: '18px' }}>알림 설정</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            name='marketing'
            label='마케팅 수신 동의'
            helpText='이벤트 및 프로모션 정보를 받습니다'
            defaultChecked={false}
          />

          <Checkbox
            name='newsletter'
            label='뉴스레터 구독'
            helpText='주간 뉴스레터를 이메일로 받습니다'
            defaultChecked={true}
          />

          <Checkbox
            name='notifications'
            label='알림 받기'
            helpText='중요한 알림을 받습니다'
            defaultChecked={true}
          />
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
          설정 저장
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
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const canSubmit = terms && privacy;

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label='서비스 이용약관 동의'
          helpText='필수 동의 항목입니다'
          required
          checked={terms}
          onChange={setTerms}
        />

        <Checkbox
          label='개인정보 수집 및 이용 동의'
          helpText='필수 동의 항목입니다'
          required
          checked={privacy}
          onChange={setPrivacy}
        />
      </div>

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
        💡 필수 항목(*) 을 모두 체크하면 버튼이 활성화됩니다.
      </p>
    </div>
  );
};

/**
 * Required 표시
 *
 * `required` prop을 사용하여 필수 입력임을 표시합니다.
 * 빨간색 별표(*)가 레이블 뒤에 표시됩니다.
 *
 * ## 사용법
 * ```tsx
 * <Checkbox
 *   label="필수 동의 항목"
 *   required
 *   checked={checked}
 *   onChange={setChecked}
 * />
 * ```
 */
export const RequiredExample: Story = {
  render: () => <RequiredExampleComponent />,
};

const LabelPlacementExampleComponent = () => {
  const [checked, setChecked] = useState(false);

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
          체크박스가 왼쪽에 위치합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label='옵션 1'
            helpText='첫 번째 옵션입니다'
            labelPlacement='start'
            checked={checked}
            onChange={setChecked}
          />
          <Checkbox
            label='옵션 2'
            helpText='두 번째 옵션입니다'
            labelPlacement='start'
            checked={checked}
            onChange={setChecked}
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
          체크박스가 오른쪽에 위치합니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label='옵션 1'
            helpText='첫 번째 옵션입니다'
            labelPlacement='end'
            checked={checked}
            onChange={setChecked}
          />
          <Checkbox
            label='옵션 2'
            helpText='두 번째 옵션입니다'
            labelPlacement='end'
            checked={checked}
            onChange={setChecked}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * 라벨 위치 제어
 *
 * `labelPlacement`를 사용하여 체크박스와 라벨의 위치를 제어합니다.
 * - `start`: 체크박스가 왼쪽, 라벨이 오른쪽 (기본값)
 * - `end`: 라벨이 왼쪽, 체크박스가 오른쪽
 *
 * ## 사용법
 * ```tsx
 * <Checkbox
 *   label="라벨"
 *   labelPlacement="end"
 *   checked={checked}
 *   onChange={setChecked}
 * />
 * ```
 */
export const LabelPlacementExample: Story = {
  render: () => <LabelPlacementExampleComponent />,
};
