import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './index';
import { ACCORDION_SIZES, ACCORDION_TYPES } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Accordion 컴포넌트는 콘텐츠를 펼치고 접을 수 있는 인터랙티브한 리스트입니다.
 *
 * ## Props
 *
 * ### Accordion (컨테이너)
 *
 * | Prop | Type |
 * |------|------|
 * | `size` | `sm` \| `md` \| `lg` |
 * | `type` | `single` \| `multiple` |
 * | `defaultValue` | `string` (single 모드) |
 * | `defaultValues` | `string[]` (multiple 모드) |
 * | `value` | `string` (제어 모드, single) |
 * | `values` | `string[]` (제어 모드, multiple) |
 * | `onValueChange` | `(value: string \| string[]) => void` |
 * | `items` | `AccordionItemData[]` (객체 배열로 전달) |
 * | `children` | `ReactNode` (JSX로 전달) |
 *
 * ### AccordionItem
 *
 * | Prop | Type |
 * |------|------|
 * | `value` | `string` (필수) |
 * | `disabled` | `boolean` |
 * | `children` | `ReactNode` |
 *
 * ### AccordionTrigger
 *
 * | Prop | Type |
 * |------|------|
 * | `category` | `string` (상단 작은 텍스트) |
 * | `title` | `string` (메인 타이틀) |
 * | `leftIcon` | `IconType` |
 * | `children` | `ReactNode` (커스텀 트리거) |
 *
 * ### AccordionContent
 *
 * | Prop | Type |
 * |------|------|
 * | `children` | `ReactNode` |
 *
 * ## 사용 예시
 *
 * ### JSX 패턴 (유연성 높음)
 *
 * ```tsx
 * import {
 *   Accordion,
 *   AccordionItem,
 *   AccordionTrigger,
 *   AccordionContent
 * } from '@bemily/design-system';
 *
 * <Accordion type="single" defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger
 *       category="운송 정보"
 *       title="배송 안내"
 *       leftIcon="Share"
 *     />
 *     <AccordionContent>
 *       무료 배송 서비스를 제공합니다.
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger title="교환/환불" />
 *     <AccordionContent>
 *       7일 이내 교환 및 환불이 가능합니다.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * ### 객체 배열 패턴 (간편함)
 *
 * ```tsx
 * const items = [
 *   {
 *     value: 'shipping',
 *     category: '운송 정보',
 *     title: '배송 안내',
 *     leftIcon: 'Share',
 *     content: '무료 배송 서비스를 제공합니다.',
 *   },
 *   {
 *     value: 'return',
 *     title: '교환/환불',
 *     content: '7일 이내 교환 및 환불이 가능합니다.',
 *   },
 * ];
 *
 * <Accordion type="single" items={items} defaultValue="shipping" />
 * ```
 *
 * ### 다중 선택 모드
 *
 * 여러 아이템을 동시에 펼칠 수 있습니다
 * ```
 */
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ACCORDION_SIZES,
      description: '아코디언 크기',
      table: {
        category: 'Appearance',
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ACCORDION_TYPES,
      description: '단일/다중 선택 모드',
      table: {
        category: 'Appearance',
        type: { summary: 'single | multiple' },
        defaultValue: { summary: 'single' },
      },
    },

    // State (Uncontrolled)
    defaultValue: {
      control: 'text',
      description: '초기 펼침 아이템 value (single 모드)',
      table: {
        category: 'State (Uncontrolled)',
        type: { summary: 'string' },
      },
    },
    defaultValues: {
      control: 'object',
      description: '초기 펼침 아이템들 (multiple 모드)',
      table: {
        category: 'State (Uncontrolled)',
        type: { summary: 'string[]' },
      },
    },

    // State (Controlled)
    value: {
      control: 'text',
      description: '제어된 값 (single 모드)',
      table: {
        category: 'State (Controlled)',
        type: { summary: 'string' },
      },
    },
    values: {
      control: 'object',
      description: '제어된 값들 (multiple 모드)',
      table: {
        category: 'State (Controlled)',
        type: { summary: 'string[]' },
      },
    },

    // Events
    onValueChange: {
      control: false,
      description: '값 변경 핸들러',
      table: {
        category: 'Events',
        type: { summary: '(value: string | string[]) => void' },
      },
    },

    // Content
    items: {
      control: 'object',
      description: '아이템 배열 (객체로 전달 시 사용)',
      table: {
        category: 'Content',
        type: { summary: 'AccordionItemData[]' },
      },
    },
    children: {
      control: false,
      description: 'JSX로 전달된 AccordionItem들',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    type: 'single',
    size: 'md',
    defaultValue: 'item-1',
    items: [
      {
        value: 'item-1',
        category: '운송 정보',
        title: '배송 안내',
        content: '무료 배송 서비스를 제공합니다. 주문 후 2-3일 내 배송됩니다.',
      },
      {
        value: 'item-2',
        category: '고객 지원',
        title: '교환 및 환불',
        content: '상품 수령 후 7일 이내 교환 및 환불이 가능합니다.',
      },
      {
        value: 'item-3',
        category: '고객 지원',
        title: '고객센터',
        content: '평일 09:00 - 18:00 (주말 및 공휴일 휴무)',
      },
    ],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 아코디언 예시 - Controls에서 size, type, items 등을 변경할 수 있습니다
 */
export const Primary: Story = {};

/**
 * 아이콘이 포함된 아코디언
 */
export const WithIcons: Story = {
  args: { children: <div /> },
  render: () => (
    <Accordion type='single'>
      <AccordionItem value='info'>
        <AccordionTrigger title='상품 정보' leftIcon='Hamburger' />
        <AccordionContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p>
              <strong>브랜드:</strong> 샘플 브랜드
            </p>
            <p>
              <strong>모델명:</strong> ABC-123
            </p>
            <p>
              <strong>제조국:</strong> 대한민국
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='shipping'>
        <AccordionTrigger title='배송 정보' leftIcon='Share' />
        <AccordionContent>전국 무료 배송, 2-3일 내 도착</AccordionContent>
      </AccordionItem>
      <AccordionItem value='return'>
        <AccordionTrigger title='교환/환불' leftIcon='Download' />
        <AccordionContent>7일 이내 무료 교환/환불</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 다중 선택 모드 - 여러 아이템을 동시에 펼칠 수 있습니다
 */
export const MultipleMode: Story = {
  args: { children: <div /> },
  render: () => (
    <Accordion type='multiple' defaultValues={['item-1', 'item-2']}>
      <AccordionItem value='item-1'>
        <AccordionTrigger title='첫 번째 아이템' />
        <AccordionContent>첫 번째 아이템의 내용입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger title='두 번째 아이템' />
        <AccordionContent>두 번째 아이템의 내용입니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger title='세 번째 아이템' />
        <AccordionContent>세 번째 아이템의 내용입니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 크기 비교
 */
export const Sizes: Story = {
  args: { children: <div /> },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Small</h3>
        <Accordion type='single' size='sm'>
          <AccordionItem value='sm-1'>
            <AccordionTrigger title='Small 크기 아코디언' />
            <AccordionContent>Small 크기의 내용입니다.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Medium (Default)</h3>
        <Accordion type='single' size='md'>
          <AccordionItem value='md-1'>
            <AccordionTrigger title='Medium 크기 아코디언' />
            <AccordionContent>Medium 크기의 내용입니다.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Large</h3>
        <Accordion type='single' size='lg'>
          <AccordionItem value='lg-1'>
            <AccordionTrigger title='Large 크기 아코디언' />
            <AccordionContent>Large 크기의 내용입니다.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

/**
 * 비활성화된 아이템
 */
export const DisabledItem: Story = {
  args: { children: <div /> },
  render: () => (
    <Accordion type='single'>
      <AccordionItem value='item-1'>
        <AccordionTrigger title='활성화된 아이템' />
        <AccordionContent>이 아이템은 정상적으로 작동합니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2' disabled>
        <AccordionTrigger title='비활성화된 아이템' />
        <AccordionContent>이 내용은 접근할 수 없습니다.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger title='다른 활성화된 아이템' />
        <AccordionContent>이 아이템도 정상적으로 작동합니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 커스텀 트리거 콘텐츠 - children을 전달하여 완전히 커스텀 가능
 */
export const CustomTrigger: Story = {
  args: { children: <div /> },
  render: () => (
    <Accordion type='single'>
      <AccordionItem value='custom'>
        <AccordionTrigger>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: '#4f7cff' }}>
              커스텀 스타일
            </span>
            <span
              style={{
                fontSize: '12px',
                backgroundColor: '#eef3ff',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              NEW
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          AccordionTrigger에 children을 전달하면 완전히 커스텀 가능합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * 객체 배열로 전달 (items prop)
 *
 * API 데이터나 단순한 리스트를 렌더링할 때 유용합니다.
 */
export const WithItemsArray: Story = {
  args: { children: <div /> },
  render: () => {
    const items = [
      {
        value: 'shipping',
        category: '운송 정보',
        title: '배송 안내',
        leftIcon: 'Share' as const,
        content: '무료 배송 서비스를 제공합니다. 주문 후 2-3일 내 배송됩니다.',
      },
      {
        value: 'return',
        category: '고객 지원',
        title: '교환 및 환불',
        leftIcon: 'Download' as const,
        content: '상품 수령 후 7일 이내 교환 및 환불이 가능합니다.',
      },
      {
        value: 'support',
        category: '고객 지원',
        title: '고객센터',
        leftIcon: 'User' as const,
        content: '평일 09:00 - 18:00 (주말 및 공휴일 휴무)',
      },
    ];

    return <Accordion type='single' items={items} defaultValue='shipping' />;
  },
};

/**
 * 객체 배열 - 복잡한 내용도 가능
 */
export const ItemsWithComplexContent: Story = {
  args: { children: <div /> },
  render: () => {
    const items = [
      {
        value: 'product',
        category: '상품 정보',
        title: '상세 스펙',
        leftIcon: 'Hamburger' as const,
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p>
              <strong>브랜드:</strong> 샘플 브랜드
            </p>
            <p>
              <strong>모델명:</strong> ABC-123
            </p>
            <p>
              <strong>제조국:</strong> 대한민국
            </p>
            <p>
              <strong>보증기간:</strong> 1년
            </p>
          </div>
        ),
      },
      {
        value: 'features',
        title: '주요 기능',
        content: (
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>고성능 프로세서</li>
            <li>대용량 스토리지</li>
            <li>긴 배터리 수명</li>
          </ul>
        ),
      },
    ];

    return <Accordion type='multiple' items={items} size='md' />;
  },
};
