import { Tabs } from './index';
import { TABS_JUSTIFY, TABS_ROUNDED, TABS_SIZES, TABS_VARIANTS } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Tabs 컴포넌트는 여러 콘텐츠를 탭으로 구분하여 보여주는 네비게이션 컴포넌트입니다.
 *
 * ## 주요 기능
 * - **variant**: none, underlined, rounded (기본값: underlined)
 * - **size**: sm, md, lg (기본값: md)
 * - **justify**: start, center, end, between, around, evenly (기본값: start)
 * - **rounded**: none, xs, sm, md, lg, xl, full (기본값: sm)
 * - **제어/비제어 컴포넌트** 모두 지원
 * - **비활성 탭** 지원
 * - **시맨틱 컬러 프리셋**: primary, secondary
 *
 * ## Variant 설명
 * - **none**: 스타일 없음 (텍스트만)
 * - **underlined**: 하단 언더라인 (가장 일반적)
 * - **rounded**: 둥근 배경 버튼 스타일
 *
 * ## 사용법
 * ### 비제어 컴포넌트
 * ```tsx
 * <Tabs
 *   items={[
 *     { label: '탭1', value: 'tab1' },
 *     { label: '탭2', value: 'tab2' },
 *   ]}
 *   defaultValue="tab1"
 * />
 * ```
 *
 * ### 제어 컴포넌트
 * ```tsx
 * const [activeTab, setActiveTab] = useState('tab1');
 * <Tabs
 *   items={[...]}
 *   value={activeTab}
 *   onChange={setActiveTab}
 * />
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
    // Appearance
    variant: {
      control: 'select',
      options: TABS_VARIANTS,
      description: 'Tabs 스타일 변형',
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: TABS_SIZES,
      description: 'Tabs 크기',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: ['primary'],
      description: '컬러 프리셋 (primary만 지원)',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: TABS_ROUNDED,
      description: 'Border radius (테마 설정 덮어쓰기)',
      table: {
        category: 'Appearance',
      },
    },
    justify: {
      control: 'select',
      options: TABS_JUSTIFY,
      description: '탭들의 정렬 방식',
      table: {
        category: 'Appearance',
      },
    },

    // Data
    items: {
      control: false,
      description: '탭 목록 배열',
      table: { category: 'Data' },
    },

    // State
    value: {
      control: 'text',
      description: '현재 활성 탭 (제어 컴포넌트)',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: '초기 활성 탭 (비제어 컴포넌트)',
      table: { category: 'State' },
    },

    // Events
    onChange: {
      control: false,
      description: '탭 변경 이벤트 핸들러',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'underlined',
    size: 'md',
    color: 'primary',
    justify: 'start',
    items: [
      { label: '레이블', value: 'tab1' },
      { label: '레이블', value: 'tab2' },
      { label: '레이블', value: 'tab3' },
    ],
    defaultValue: 'tab1',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * Variant와 Size 조합
 */
export const VariantAndSize: Story = {
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
 * Rounded variant에서 테마 설정을 덮어쓰기하여 원하는 모서리 둥글기를 적용할 수 있습니다.
 */
export const Rounded: Story = {
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
