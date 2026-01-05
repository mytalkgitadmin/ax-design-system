import { BreadCrumb } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: {
      description: {
        component: `
BreadCrumb 컴포넌트는 사용자가 현재 위치를 파악하고 상위 페이지로 쉽게 이동할 수 있도록 돕는 네비게이션 컴포넌트입니다.

## 사용법

\`\`\`tsx
import { BreadCrumb } from '@bemily/design-system';

function MyPage() {
  return (
    <BreadCrumb
      items={[
        { label: 'Home', leftIcon: 'Hamburger', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Current Page' },
      ]}
    />
  );
}
\`\`\`

## 주요 기능

- ✅ **자동 축약**: 6개 이상의 depth가 있을 경우 자동으로 \`...\` 처리
- ✅ **아이콘 지원**: 각 depth별로 왼쪽 아이콘 표시 가능
- ✅ **테마 연동**: hover 시 브랜드 컬러 자동 적용
- ✅ **접근성**: 시맨틱 HTML과 ARIA 속성으로 스크린 리더 지원

## 축약 규칙

- **4개 이하**: 모두 표시
- **5개 이상**: 첫 번째 + ... + 마지막 2개

예시:
- 4개: \`Home > Products > Category > Current\`
- 5개: \`Home > ... > Category > Current\`
        `,
      },
    },
  },
  argTypes: {
    items: {
      description: 'BreadCrumb 아이템 목록',
      table: {
        type: {
          summary: 'BreadCrumbItem[]',
          detail: '{ label: string; leftIcon?: IconType; href?: string; }[]',
        },
      },
    },
  },
  args: {
    items: [],
  },
} satisfies Meta<typeof BreadCrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예시
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', leftIcon: 'Hamburger' },
      { label: '베스트' },
      { label: '응원봉' },
      { label: '악세사리' },
      { label: '스티커' },
    ],
  },
};

export const All: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
        ]}
      />
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
          },
        ]}
      />
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
          },
          {
            label: 'depth3',
            href: '/depth1/depth2/depth3',
          },
        ]}
      />
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
          },
          {
            label: 'depth3',
            href: '/depth1/depth2/depth3',
          },
          {
            label: 'depth4',
            href: '/depth1/depth2/depth3/depth4',
          },
        ]}
      />
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
          },
          {
            label: 'depth3',
            href: '/depth1/depth2/depth3',
          },
          {
            label: 'depth4',
            href: '/depth1/depth2/depth3/depth4',
          },
          {
            label: 'depth5',
            href: '/depth1/depth2/depth3/depth4/depth5',
          },
        ]}
      />
      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
          },
          {
            label: 'depth3',
            href: '/depth1/depth2/depth3',
          },
          {
            label: 'depth4',
            href: '/depth1/depth2/depth3/depth4',
          },
          {
            label: 'depth5',
            href: '/depth1/depth2/depth3/depth4/depth5',
          },
        ]}
        isEllipsis={true}
      />

      <BreadCrumb
        items={[
          {
            label: 'depth1',
            href: '/depth1',
            leftIcon: 'Hamburger',
          },
          {
            label: 'depth2',
            href: '/depth1/depth2',
            leftIcon: 'Globe',
          },
          {
            label: 'depth3',
            href: '/depth1/depth2/depth3',
            leftIcon: 'Bag',
          },
          {
            label: 'depth4',
            href: '/depth1/depth2/depth3/depth4',
            leftIcon: 'Heart',
          },
        ]}
      />
    </div>
  ),
};
