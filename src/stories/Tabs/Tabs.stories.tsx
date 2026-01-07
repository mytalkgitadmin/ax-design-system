import { useState } from 'react';

import { color } from '../../tokens';
import { Tabs } from './index';
import {
  TabItem,
  TABS_JUSTIFY,
  TABS_ROUNDED,
  TABS_SIZES,
  TABS_VARIANTS,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Tabs 컴포넌트는 여러 콘텐츠를 탭으로 구분하여 표시하는 네비게이션 UI입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `items` | `TabItem[]` (required) |
 * | `variant` | `none` \| `underlined` \| `rounded` |
 * | `size` | `sm` \| `md` \| `lg` |
 * | `color` | `string` (시맨틱 또는 hex/rgb) |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
 * | `justify` | `start` \| `center` \| `end` \| `between` \| `around` \| `evenly` |
 * | `value` | `string` |
 * | `defaultValue` | `string` |
 * | `onChange` | `(value: string) => void` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Tabs } from '@bemily/design-system';
 *
 * const items = [
 *   { label: '탭 1', value: 'tab1' },
 *   { label: '탭 2', value: 'tab2' },
 *   { label: '탭 3', value: 'tab3' },
 * ];
 *
 * // 제어 컴포넌트
 * const [activeTab, setActiveTab] = useState('tab1');
 * <Tabs items={items} value={activeTab} onChange={setActiveTab} />
 *
 * // 비제어 컴포넌트
 * <Tabs items={items} defaultValue="tab1" />
 *
 * // Variant 옵션
 * <Tabs items={items} variant="underlined" />
 * <Tabs items={items} variant="rounded" />
 * ```
 */
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    variant: {
      control: 'select',
      options: TABS_VARIANTS,
      description: 'Tabs variant',
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: TABS_SIZES,
      description: 'Tabs size',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', color.blue['500'], color.indigo['500']],
      description: '시맨틱 프리셋 또는 커스텀 컬러',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: TABS_ROUNDED,
      description: 'Border radius (variant="rounded"일 때)',
      table: {
        category: 'Appearance',
      },
    },
    justify: {
      control: 'select',
      options: TABS_JUSTIFY,
      description: '탭들의 정렬 방식',
      table: {
        category: 'Layout',
      },
    },
    items: {
      control: false,
      description: '탭 목록',
      table: {
        category: 'Content',
      },
    },
    value: {
      control: false,
      description: '현재 활성화된 탭 (제어 컴포넌트)',
      table: {
        category: 'State',
      },
    },
    defaultValue: {
      control: false,
      description: '초기 활성 탭 (비제어 컴포넌트)',
      table: {
        category: 'State',
      },
    },
    onChange: {
      control: false,
      description: '탭 변경 이벤트',
      table: {
        category: 'Events',
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: TabItem[] = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
  { label: 'Tab 4', value: 'tab4' },
];

export const Primary: Story = {
  args: {
    items: basicItems,
    variant: 'underlined',
    defaultValue: 'tab1',
  },
};

/**
 * Variant와 Size 조합
 */
export const VariantAndSize: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '80px 1fr',
        placeItems: 'center start',
        width: '680px',
        fontSize: '12px',
      }}
    >
      <p style={{ fontWeight: 600 }}>None</p>
      <p></p>
      sm
      <Tabs
        variant='none'
        size='sm'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      md
      <Tabs
        variant='none'
        size='md'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      lg
      <Tabs
        variant='none'
        size='lg'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p style={{ fontWeight: 600 }}>Underlined</p>
      <p></p>
      sm
      <Tabs
        variant='underlined'
        size='sm'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      md
      <Tabs
        variant='underlined'
        size='md'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      lg
      <Tabs
        variant='underlined'
        size='lg'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p style={{ fontWeight: 600 }}>Rounded</p>
      <p></p>
      sm
      <Tabs
        variant='rounded'
        size='sm'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      md
      <Tabs
        variant='rounded'
        size='md'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      lg
      <Tabs
        variant='rounded'
        size='lg'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
    </div>
  ),
};

/**
 * 정렬 방식 (Justify)
 */
export const Justify: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        placeItems: 'center left',
        gap: '24px 0',
        width: '680px',
        fontSize: '12px',
      }}
    >
      Start (기본값)
      <Tabs
        justify='start'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      Center
      <Tabs
        justify='center'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p>End</p>
      <Tabs
        justify='end'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p>Between</p>
      <Tabs
        justify='between'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p>Around</p>
      <Tabs
        justify='around'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
      <p>Evenly</p>
      <Tabs
        justify='evenly'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
        defaultValue='tab1'
      />
    </div>
  ),
};

/**
 * Rounded (모서리 둥글기)
 *
 * Rounded variant에서 테마 설정을 덮어쓰기하여 원하는 모서리 둥글기를 적용할 수 있습니다.
 */
export const Rounded: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '600px',
      }}
    >
      <Tabs
        variant='rounded'
        rounded='none'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='xs'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='sm'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='md'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='lg'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='xl'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
      <Tabs
        variant='rounded'
        rounded='full'
        items={[
          { label: '레이블', value: 'tab1' },
          { label: '레이블', value: 'tab2' },
          { label: '레이블', value: 'tab3' },
        ]}
      />
    </div>
  ),
};

/**
 * 제어 컴포넌트
 */
export const Controlled: Story = {
  args: {
    items: basicItems,
  },
  render: () => {
    const ControlledTabs = () => {
      const [activeTab, setActiveTab] = useState('tab1');

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Tabs
            items={basicItems}
            variant='underlined'
            value={activeTab}
            onChange={setActiveTab}
          />
          <p>현재 선택된 탭: {activeTab}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setActiveTab('tab1')}>탭 1로 이동</button>
            <button onClick={() => setActiveTab('tab3')}>탭 3으로 이동</button>
          </div>
        </div>
      );
    };

    return <ControlledTabs />;
  },
};
