import { Table } from './index';
import { TableColumn, TableRow } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Table 컴포넌트는 데이터를 표 형태로 표시하는 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `columns` | `TableColumn[]` (required) |
 * | `data` | `TableRow[]` (required) |
 * | `caption` | `string` |
 *
 * ### TableColumn
 *
 * | Prop | Type |
 * |------|------|
 * | `key` | `string` (required) |
 * | `header` | `string` |
 * | `width` | `string` \| `number` |
 * | `align` | `left` \| `center` \| `right` |
 * | `bgColor` | `boolean` |
 * | `render` | `(value, row) => ReactNode` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Table } from '@bemily/design-system';
 *
 * const columns = [
 *   { key: 'name', header: '이름', width: '30%' },
 *   { key: 'age', header: '나이', align: 'center' },
 *   { key: 'email', header: '이메일' },
 * ];
 *
 * const data = [
 *   { name: '홍길동', age: 25, email: 'hong@example.com' },
 *   { name: '김철수', age: 30, email: 'kim@example.com' },
 * ];
 *
 * <Table columns={columns} data={data} caption="사용자 목록" />
 *
 * // 커스텀 렌더링
 * const columns = [
 *   { key: 'name', header: '이름' },
 *   {
 *     key: 'status',
 *     header: '상태',
 *     render: (value) => <Badge label={value} color="primary" />
 *   },
 * ];
 * ```
 */
const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    columns: {
      control: false,
      description: '컬럼 설정',
      table: {
        category: 'Content',
      },
    },
    data: {
      control: false,
      description: '테이블 데이터',
      table: {
        category: 'Content',
      },
    },
    caption: {
      control: 'text',
      description: '테이블 제목 (접근성)',
      table: {
        category: 'Content',
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleColumns: TableColumn[] = [
  { key: 'name', header: '이름', width: '30%' },
  { key: 'age', header: '나이', align: 'center', width: '20%' },
  { key: 'email', header: '이메일', width: '50%' },
];

const sampleData: TableRow[] = [
  { name: '홍길동', age: 25, email: 'hong@example.com' },
  { name: '김철수', age: 30, email: 'kim@example.com' },
  { name: '이영희', age: 28, email: 'lee@example.com' },
];

export const Primary: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    caption: '사용자 목록',
  },
};

/**
 * 다양한 데이터 타입
 */
export const VariousDataTypes: Story = {
  args: {
    columns: [],
    data: [],
  },
  render: () => {
    const columns: TableColumn[] = [
      { key: 'label1', bgColor: true, width: '15%', align: 'center' },
      { key: 'value1', width: '35%' },
      { key: 'label2', bgColor: true, width: '15%', align: 'center' },
      { key: 'value2', width: '35%' },
    ];

    const data: TableRow[] = [
      { label: '프로젝트명', value: 'Design System' },
      {
        label1: '상품번호',
        value1: '3',
        label2: '상품구분',
        value2: '컴퓨터/노트북',
      },
      {
        label1: '모델명',
        value1: 'Z1C80003C',
        label2: '브랜드',
        value2: '홍소인',
      },
      {
        label1: '제조사',
        value1: 'Apple',
        label2: 'KC 인증',
        value2: 'KC 인증 있음',
      },
      {
        label1: '원산지',
        value1: '수입',
        label2: '미성년자 구매',
        value2: '가능',
      },
      {
        label1: '제조일자',
        value1: '2023.12.12.',
        label2: '유효일자',
        value2: '2024.05.10.',
      },
    ];

    return <Table columns={columns} data={data} caption='상품 주요 정보' />;
  },
};
