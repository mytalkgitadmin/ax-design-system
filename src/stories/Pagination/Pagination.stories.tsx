import { Pagination } from './index';
import { PAGINATION_COLORS, PAGINATION_SIZES } from './types';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs', '!dev'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: '전체 페이지 수',
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 활성 페이지 (1부터 시작)',
    },
    color: {
      control: 'select',
      options: PAGINATION_COLORS,
      description: '색상 변형',
    },
    size: {
      control: 'select',
      options: PAGINATION_SIZES,
      description: '크기 변형',
    },
    showNavButtons: {
      control: 'boolean',
      description: '이전/다음 버튼 표시 여부',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: '현재 페이지 주변에 표시할 페이지 버튼 수',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onPageChange: {
      action: 'page-changed',
      description: '페이지 변경 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Pagination 예시
 */
export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    color: 'primary',
    size: 'md',
    showNavButtons: true,
    siblingCount: 1,
    disabled: false,
  },
};

/**
 * 색상 변형 비교
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          Primary (브랜드 컬러)
        </h3>
        <Pagination totalPages={10} currentPage={3} color='primary' />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          Secondary
        </h3>
        <Pagination totalPages={10} currentPage={3} color='secondary' />
      </div>
    </div>
  ),
};

/**
 * 크기 변형 비교
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          SM (36px height - Mobile)
        </h3>
        <Pagination totalPages={10} currentPage={3} size='sm' />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          MD (40px height - PC, Default)
        </h3>
        <Pagination totalPages={10} currentPage={3} size='md' />
      </div>
    </div>
  ),
};

/**
 * 페이지가 적을 때 (3페이지 이하는 navigation button 숨김)
 */
export const FewPages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          3페이지 (이전/다음 버튼 숨김)
        </h3>
        <Pagination totalPages={3} currentPage={2} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          4페이지 (이전/다음 버튼 표시)
        </h3>
        <Pagination totalPages={4} currentPage={2} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          5페이지 (모든 페이지 표시)
        </h3>
        <Pagination totalPages={5} currentPage={2} />
      </div>
    </div>
  ),
};

/**
 * 페이지가 많을 때 (ellipsis 표시)
 */
export const ManyPages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', color: '#697180' }}>
        현재 페이지: 15 / 50
        <br />
        페이지가 많을 때 ellipsis(...)로 중간 페이지를 생략합니다
      </p>
      <Pagination totalPages={50} currentPage={15} />
    </div>
  ),
};

/**
 * siblingCount 옵션
 */
export const SiblingCount: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          siblingCount = 0 (최소)
        </h3>
        <Pagination totalPages={20} currentPage={10} siblingCount={0} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          siblingCount = 1 (기본값)
        </h3>
        <Pagination totalPages={20} currentPage={10} siblingCount={1} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          siblingCount = 2 (더 많은 페이지 표시)
        </h3>
        <Pagination totalPages={20} currentPage={10} siblingCount={2} />
      </div>
    </div>
  ),
};

/**
 * 네비게이션 버튼 없이
 */
export const WithoutNavButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', color: '#697180' }}>
        이전/다음 버튼 없이 페이지 번호만 표시
      </p>
      <Pagination totalPages={10} currentPage={5} showNavButtons={false} />
    </div>
  ),
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', color: '#697180' }}>
        비활성화된 Pagination (클릭 불가)
      </p>
      <Pagination totalPages={10} currentPage={5} disabled />
    </div>
  ),
};

/**
 * 첫 페이지와 마지막 페이지
 */
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          첫 페이지
        </h3>
        <Pagination totalPages={20} currentPage={1} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          마지막 페이지
        </h3>
        <Pagination totalPages={20} currentPage={20} />
      </div>

      <div>
        <h3
          style={{ marginBottom: '16px', fontSize: '14px', color: '#697180' }}
        >
          단일 페이지 (버튼 비활성화)
        </h3>
        <Pagination totalPages={1} currentPage={1} />
      </div>
    </div>
  ),
};

/**
 * 모든 Variant 조합
 */
export const AllCombinations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: '12px', color: '#697180', fontWeight: 600 }}>
        Primary
      </div>
      <Pagination totalPages={10} currentPage={5} color='primary' size='md' />

      <div style={{ fontSize: '12px', color: '#697180', fontWeight: 600 }}>
        Secondary
      </div>
      <Pagination totalPages={10} currentPage={5} color='secondary' size='md' />
    </div>
  ),
};
