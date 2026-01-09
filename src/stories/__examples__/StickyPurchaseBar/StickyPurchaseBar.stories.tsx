import { StickyPurchaseBar } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Examples/Components/StickyPurchaseBar',
  component: StickyPurchaseBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
모바일 쇼핑몰에서 사용하는 하단 고정 구매 버튼 바 컴포넌트입니다.

## 특징
- **모바일 전용**: md breakpoint(768px) 이하에서만 표시됩니다
- **고정 위치**: 화면 하단에 고정되어 스크롤해도 항상 보입니다
- **간단한 UI**: 장바구니/구매하기 버튼만 포함
- **Bottom Sheet 통합**: 버튼 클릭 시 상위 컴포넌트에서 옵션 선택 Bottom Sheet 표시

## 사용 사례
- 상품 상세 페이지 (ProductDetailPage 참고)
- 모바일 쇼핑몰 UI
- 반응형 e-커머스 페이지
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onCartClick: {
      description: '장바구니 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    onPurchaseClick: {
      description: '구매하기 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof StickyPurchaseBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCartClick: () => console.warn('장바구니 클릭'),
    onPurchaseClick: () => console.warn('구매하기 클릭'),
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 스티키 구매 버튼 바. 모바일 화면(768px 이하)에서 확인하세요. 실제 사용 예제는 ProductDetailPage를 참고하세요.',
      },
    },
  },
};
