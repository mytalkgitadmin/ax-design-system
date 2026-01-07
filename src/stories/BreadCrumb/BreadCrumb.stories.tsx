import { BreadCrumb } from './index';
import { BreadCrumbItem } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * BreadCrumb 컴포넌트는 현재 페이지의 위치를 표시하는 네비게이션 UI입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `items` | `BreadCrumbItem[]` (required) |
 * | `isEllipsis` | `boolean` |
 *
 * ### BreadCrumbItem
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `string` (required) |
 * | `leftIcon` | `IconType` |
 * | `href` | `string` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { BreadCrumb } from '@bemily/design-system';
 *
 * const items = [
 *   { label: 'Home', href: '/', leftIcon: 'Home' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Detail' },
 * ];
 *
 * <BreadCrumb items={items} />
 *
 * // Ellipsis 모드 (깊이가 깊을 때)
 * <BreadCrumb items={longItems} isEllipsis />
 * ```

 */
const meta = {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    items: {
      control: false,
      description: 'BreadCrumb 아이템 배열',
      table: {
        category: 'Content',
      },
    },
    isEllipsis: {
      control: 'boolean',
      description: '긴 경로를 축약하여 표시',
      table: {
        category: 'Appearance',
      },
    },
  },
} satisfies Meta<typeof BreadCrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: BreadCrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Detail' },
];

export const Primary: Story = {
  args: {
    items: basicItems,
  },
};

/**
 * 아이콘 포함
 */
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', leftIcon: 'Globe' },
      { label: 'Products', href: '/products', leftIcon: 'Bag' },
      { label: 'Item', href: '/products/item', leftIcon: 'Heart' },
      { label: 'Detail' },
    ],
  },
};
/**
 * 5개 경로
 */
export const Path5: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Subcategory', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Item', href: '#' },
      { label: 'Detail' },
    ],
  },
};

/**
 * 줄임 처리 (Ellipsis)
 */
export const Ellipsis: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Subcategory', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Item', href: '#' },
      { label: 'Detail' },
    ],
    isEllipsis: true,
  },
};
