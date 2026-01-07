import { Thumbnail } from './index';
import { THUMBNAIL_ROUNDED } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Thumbnail 컴포넌트는 이미지를 일정한 비율로 표시하는 썸네일 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `src` | `string` \| `null` |
 * | `alt` | `string` |
 * | `width` | `number` (기본값: 80) |
 * | `color` | `brand` \| `gray` |
 * | `ratio` | `1` \| `16:9` \| `1.618:1` |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Thumbnail } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Thumbnail src="/image.jpg" alt="썸네일" />
 *
 * // 다양한 비율
 * <Thumbnail src="/image.jpg" alt="정사각형" ratio="1" />
 * <Thumbnail src="/image.jpg" alt="와이드" ratio="16:9" />
 * <Thumbnail src="/image.jpg" alt="황금비율" ratio="1.618:1" />
 *
 * // 크기 조절
 * <Thumbnail src="/image.jpg" alt="작은 썸네일" width={60} />
 * <Thumbnail src="/image.jpg" alt="큰 썸네일" width={120} />
 *
 * // 이미지 없음 (기본 아이콘 표시)
 * <Thumbnail src={null} alt="No image" color="brand" />
 * ```

 */
const meta = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    src: {
      control: 'text',
      description: '이미지 URL (없으면 기본 아이콘 표시)',
      table: {
        category: 'Content',
      },
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트 (접근성)',
      table: {
        category: 'Content',
      },
    },
    width: {
      control: 'number',
      description: '썸네일 너비 (기본값: 80)',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: ['brand', 'gray'],
      description: '배경 색상',
      table: {
        category: 'Appearance',
      },
    },
    ratio: {
      control: 'select',
      options: ['1', '16:9', '1.618:1'],
      description: '이미지 비율',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: THUMBNAIL_ROUNDED,
      description: '모서리 둥글기',
      table: {
        category: 'Appearance',
      },
    },
  },
  args: {
    alt: 'Thumbnail',
    width: 80,
    ratio: '1',
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: 'https://picsum.photos/200',
  },
};

/**
 * 비율별 썸네일
 */
export const Ratios: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div>
        <p>1:1 (정사각형)</p>
        <Thumbnail src='https://picsum.photos/200' alt='1:1' ratio='1' />
      </div>
      <div>
        <p>16:9 (와이드)</p>
        <Thumbnail
          src='https://picsum.photos/400/225'
          alt='16:9'
          ratio='16:9'
        />
      </div>
      <div>
        <p>1.618:1 (황금비율)</p>
        <Thumbnail
          src='https://picsum.photos/324/200'
          alt='Golden Ratio'
          ratio='1.618:1'
        />
      </div>
    </div>
  ),
};

/**
 * 이미지 없음 (기본 아이콘)
 */
export const NoImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Thumbnail src={null} alt='No image - brand' color='brand' />
      <Thumbnail src={null} alt='No image - gray' color='gray' />
    </div>
  ),
};

/**
 * 크기 조절
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
      <Thumbnail src='https://picsum.photos/200' alt='Small' width={60} />
      <Thumbnail src='https://picsum.photos/200' alt='Medium' width={80} />
      <Thumbnail src='https://picsum.photos/200' alt='Large' width={120} />
    </div>
  ),
};

/**
 * 이미지 로드 실패 : 잘못된 URL이나 네트워크 오류로 이미지를 불러올 수 없을 때, 자동으로 기본 아이콘으로 대체됩니다.
 */
export const ImageError: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
      }}
    >
      <Thumbnail
        width={80}
        src='https://example.com/404.png'
        alt='존재하지 않는 이미지'
        color='gray'
      />
    </div>
  ),
};
