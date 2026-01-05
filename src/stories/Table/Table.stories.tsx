import { Table } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: `
Table 컴포넌트는 데이터를 테이블 형식으로 표시하는 컴포넌트입니다.

## 주요 기능
- JSON 데이터 기반 렌더링


## 기본 사용법

\`\`\`tsx
import { Table } from '@bemily/design-system';

<Table
  columns={[
    { key: 'name', header: '이름', width: '30%' },
    { key: 'email', header: '이메일', width: '40%' },
    { key: 'role', header: '역할', width: '30%' },
  ]}
  data={[
    { name: '홍길동', email: 'hong@example.com', role: '개발자' },
    { name: '김영희', email: 'kim@example.com', role: '디자이너' },
  ]}
/>
\`\`\`

## 상품 정보 스타일 (라벨-값 쌍)

\`\`\`tsx
<Table
  columns={[
    { key: 'label1', bgColor: true, width: '15%', align: 'center' },
    { key: 'value1', width: '35%' },
    { key: 'label2', bgColor: true, width: '15%', align: 'center' },
    { key: 'value2', width: '35%' },
  ]}
  data={[
    { label1: '상품번호', value1: '3', label2: '상품구분', value2: '컴퓨터/노트북' },
  ]}
/>
\`\`\`

## 커스텀 렌더링

\`\`\`tsx
import { Table, Badge, Button } from '@bemily/design-system';

<Table
  columns={[
    { key: 'name', header: '이름' },
    {
      key: 'status',
      header: '상태',
      render: (value) => <Badge label={value} color="primary" />
    },
    {
      key: 'actions',
      header: '관리',
      render: (_, row) => (
        <Button size="sm" onClick={() => console.log(row)}>수정</Button>
      )
    },
  ]}
  data={data}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    columns: {
      description: '컬럼 설정 배열',
      table: {
        type: { summary: 'TableColumn[]' },
      },
    },
    data: {
      description: '테이블 데이터 배열',
      table: {
        type: { summary: 'TableRow[]' },
      },
    },
    caption: {
      control: 'text',
      description: '테이블 제목 (접근성)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 테이블 예시
 * - 간단한 사용자 목록 표시
 */
export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: '이름', width: '30%' },
      { key: 'email', header: '이메일', width: '40%' },
      { key: 'role', header: '역할', width: '30%' },
    ],
    data: [
      { name: '홍길동', email: 'hong@example.com', role: '개발자' },
      { name: '김영희', email: 'kim@example.com', role: '디자이너' },
      { name: '이철수', email: 'lee@example.com', role: '기획자' },
    ],
  },
};

/**
 * 상품 정보 테이블 (라벨-값 쌍 스타일)
 * - bgColor: true로 라벨 셀 강조
 * - 2열 구조 (라벨 + 값, 라벨 + 값)
 * - 상품 상세 페이지 등에서 활용
 */
export const ProductInfo: Story = {
  args: {
    caption: '상품 주요 정보',
    columns: [
      { key: 'label1', bgColor: true, width: '15%', align: 'center' },
      { key: 'value1', width: '35%' },
      { key: 'label2', bgColor: true, width: '15%', align: 'center' },
      { key: 'value2', width: '35%' },
    ],
    data: [
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
    ],
  },
};
