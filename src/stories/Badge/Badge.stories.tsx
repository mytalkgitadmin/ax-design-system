import { ICON_NAMES } from '../Icon/types';
import { Badge } from './index';
import { BADGE_ROUNDED, BADGE_VARIANTS, SOLID_BADGE_COLORS } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Badge 컴포넌트는 상태, 카테고리, 또는 레이블을 표시하는 작은 배지입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `string` |
 * | `variant` | `solid` \| `outline` \| `soft` |
 * | `color` | `primary` \| `green` \| `red` \| `yellow` \| `muted` \| `neutral-emphasis` \| `neutral-disabled` |
 * | `rounded` | `none` \| `xs` \| `md` \| `full` |
 * | `leftIcon` | `IconType` |
 * | `rightIcon` | `IconType` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Badge } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Badge label="텍스트" color="primary" variant="solid" />
 *
 * // 다양한 스타일
 * <Badge label="성공" color="green" variant="soft" />
 * <Badge label="에러" color="red" variant="outline" />
 *
 * // 아이콘 포함
 * <Badge label="알림" color="primary" leftIcon="Bell" />
 * <Badge label="다운로드" color="green" rightIcon="Download" />
 * ```
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: BADGE_VARIANTS,
      description: 'Badge variant (solid, outline, soft)',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: SOLID_BADGE_COLORS,
      description: 'Badge color (variant에 따라 사용 가능한 색상이 제한됨)',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: BADGE_ROUNDED,
      description: 'Border radius',
      table: {
        category: 'Appearance',
      },
    },

    // Content
    label: {
      control: 'text',
      description: 'Badge text',
      table: { category: 'Content' },
    },

    // Icon
    leftIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '왼쪽 아이콘',
      table: { category: 'Icon' },
    },
    rightIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '오른쪽 아이콘',
      table: { category: 'Icon' },
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    rounded: 'full',
    label: '텍스트',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * 모든 색상 조합
 */
export const AllColorCombinations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(7, 1fr)',
      }}
    >
      <Badge variant='solid' color='primary' label='텍스트' />
      <Badge variant='solid' color='green' label='텍스트' />
      <Badge variant='solid' color='red' label='텍스트' />
      <Badge variant='solid' color='yellow' label='텍스트' />
      <Badge variant='solid' color='muted' label='텍스트' />
      <Badge variant='solid' color='neutral-emphasis' label='텍스트' />
      <Badge variant='solid' color='neutral-disabled' label='텍스트' />

      <Badge variant='soft' color='primary' label='텍스트' />
      <Badge variant='soft' color='green' label='텍스트' />
      <Badge variant='soft' color='red' label='텍스트' />
      <Badge variant='soft' color='yellow' label='텍스트' />
      <span></span>
      <span></span>
      <span></span>

      <Badge variant='outline' color='primary' label='텍스트' />
      <Badge variant='outline' color='green' label='텍스트' />
      <Badge variant='outline' color='red' label='텍스트' />
      <Badge variant='outline' color='yellow' label='텍스트' />
      <span></span>
      <span></span>
      <span></span>
    </div>
  ),
};

/**
 * Rounded
 */
export const Rounded: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Badge color='primary' label='None (0px)' rounded='none' />
      <Badge color='primary' label='XS (2px)' rounded='xs' />
      <Badge color='primary' label='MD (8px)' rounded='md' />
      <Badge color='primary' label='Full (999px)' rounded='full' />
    </div>
  ),
};

/**
 * 아이콘이 있는 Badge
 */
export const WithIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge label='알림' color='primary' leftIcon='Plus' />
        <Badge label='성공' color='green' leftIcon='Check' />
        <Badge label='에러' color='red' leftIcon='X' />
        <Badge label='경고' color='yellow' leftIcon='Minus' />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge label='알림' color='primary' rightIcon='ChevronRight' />
        <Badge label='성공' color='green' rightIcon='ChevronRight' />
        <Badge label='에러' color='red' rightIcon='ChevronRight' />
        <Badge label='경고' color='yellow' rightIcon='ChevronRight' />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge label='알림' color='primary' variant='outline' leftIcon='Plus' />
        <Badge label='성공' color='green' variant='outline' leftIcon='Check' />
        <Badge label='에러' color='red' variant='outline' leftIcon='X' />
        <Badge label='경고' color='yellow' variant='outline' leftIcon='Minus' />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Badge label='알림' color='primary' variant='soft' leftIcon='Plus' />
        <Badge label='성공' color='green' variant='soft' leftIcon='Check' />
        <Badge label='에러' color='red' variant='soft' leftIcon='X' />
        <Badge label='경고' color='yellow' variant='soft' leftIcon='Minus' />
      </div>
    </div>
  ),
};

/**
 * 실제 사용 예시
 */
export const UseCases: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* 상태 표시 */}
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>상태 표시</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge label='활성' color='green' variant='soft' />
          <Badge label='대기' color='yellow' variant='soft' />
          <Badge label='비활성' color='muted' variant='solid' />
          <Badge label='에러' color='red' variant='soft' />
        </div>
      </div>

      {/* 카테고리 */}
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>카테고리</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge label='디자인' color='primary' variant='solid' />
          <Badge label='개발' color='green' variant='solid' />
          <Badge label='마케팅' color='yellow' variant='solid' />
          <Badge label='기타' color='muted' variant='solid' />
        </div>
      </div>

      {/* 알림 */}
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 600 }}>알림</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge label='3' color='red' variant='solid' rounded='full' />
          <Badge
            label='새 메시지 5개'
            color='primary'
            variant='soft'
            leftIcon='Plus'
          />
          <Badge label='진행 중' color='yellow' variant='outline' />
        </div>
      </div>
    </div>
  ),
};
