import { ComponentProps } from 'react';

import { Carousel } from './index';

import type { CarouselItem } from './types';
import type { Meta, StoryObj } from '@storybook/react';

// 샘플 이미지 데이터 (10개)
const SAMPLE_ITEMS: CarouselItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  src: `https://picsum.photos/seed/carousel${i + 1}/800/450`,
  alt: `샘플 이미지 ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/carousel${i + 1}/100/100`,
  content: <div>슬라이드 {i + 1} - 설명 텍스트</div>,
}));

// Storybook 전용 Args 타입 정의
type CarouselStoryArgs = ComponentProps<typeof Carousel> & {
  itemCount?: number;
};

/**
 * Carousel(캐러셀) 컴포넌트는 여러 컨텐츠를 슬라이드 형태로 보여주는 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `CarouselItem[]` | `[]` | 캐러셀에 표시할 아이템 배열 |
 * | `slidesPerView` | `number` | `1` | 한 화면에 표시할 슬라이드 수 |
 * | `spaceBetween` | `number` \| `[number, number]` | `8` | 슬라이드 간격 (px) |
 * | `autoplay` | `boolean` | `false` | 자동 재생 활성화 여부 |
 * | `autoplayDelay` | `number` | `3000` | 자동 재생 지연 시간 (ms) |
 * | `loop` | `boolean` | `false` | 루프 재생 여부 |
 * | `showNavigation` | `boolean` | `true` | 네비게이션 버튼 표시 여부 |
 * | `showThumbnails` | `boolean` | `true` | 썸네일 네비게이션 표시 여부 |
 * | `thumbnailPosition` | `'bottom'` \| `'top'` \| `'left'` \| `'right'` | `'bottom'` | 썸네일 위치 |
 * | `thumbnailSize` | `number` | `100` | 썸네일 크기 (px) |
 * | `thumbnailCount` | `number` | `5` | 화면에 보여질 썸네일 개수 |
 * | `showPagination` | `boolean` | `false` | 페이지네이션 표시 여부 |
 * | `className` | `string` | - | 추가 CSS 클래스명 |
 * | `style` | `CSSProperties` | - | 인라인 스타일 |
 */
const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Content
    items: {
      control: false,
      description: '캐러셀 아이템 배열 (itemCount로 조절 가능)',
      table: { category: 'Content' },
    },
    itemCount: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: '아이템 개수 (Storybook 테스트용)',
      table: { category: 'Content' },
    },

    // Appearance
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5 },
      description: '한 화면에 표시할 슬라이드 수',
      table: { category: 'Appearance' },
    },
    spaceBetween: {
      control: 'object',
      description: '간격 설정 (숫자 또는 [메인/썸네일 간격, 슬라이드 간격])',
      table: { category: 'Appearance' },
    },
    thumbnailPosition: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
      description: '썸네일 위치',
      table: { category: 'Appearance' },
    },
    thumbnailSize: {
      control: 'number',
      description: '썸네일 크기 (px)',
      table: { category: 'Appearance' },
    },
    thumbnailCount: {
      control: 'number',
      description: '화면에 보여질 썸네일 개수',
      table: { category: 'Appearance' },
    },

    // Behavior
    autoplay: {
      control: 'boolean',
      description: '자동 재생 활성화',
      table: { category: 'Behavior' },
    },
    autoplayDelay: {
      control: 'number',
      description: '자동 재생 지연 시간 (ms)',
      if: { arg: 'autoplay' },
      table: { category: 'Behavior' },
    },
    loop: {
      control: 'boolean',
      description: '무한 루프 재생',
      table: { category: 'Behavior' },
    },

    // Controls
    showNavigation: {
      control: 'boolean',
      description: '좌우 네비게이션 버튼 표시',
      table: { category: 'Controls' },
    },
    showThumbnails: {
      control: 'boolean',
      description: '썸네일 리스트 표시',
      table: { category: 'Controls' },
    },
    showPagination: {
      control: 'boolean',
      description: '페이지네이션(점) 표시',
      table: { category: 'Controls' },
    },
  },
  args: {
    items: SAMPLE_ITEMS,
    itemCount: 5,
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: false,
    autoplayDelay: 3000,
    loop: false,
    showNavigation: true,
    showThumbnails: true,
    thumbnailPosition: 'bottom',
    thumbnailSize: 100,
    thumbnailCount: 5,
    showPagination: false,
  },
} satisfies Meta<CarouselStoryArgs>;

export default meta;
type Story = StoryObj<CarouselStoryArgs>;

/**
 * 기본 Carousel 사용 예시입니다. itemCount 컨트롤을 통해 아이템 개수를 조절해볼 수 있습니다.
 */
export const Default: Story = {
  args: {},
  render: ({ itemCount, ...args }) => {
    const count = itemCount ?? 5;
    const items = SAMPLE_ITEMS.slice(0, count);

    return <Carousel {...args} items={items} />;
  },
};

/**
 * 자동 재생 옵션을 활성화한 예시입니다.
 */
export const WithAutoplay: Story = {
  args: {
    autoplay: true,
    autoplayDelay: 2000,
    loop: true,
    itemCount: 5,
  },
  render: ({ itemCount, ...args }) => {
    const items = SAMPLE_ITEMS.slice(0, itemCount);
    return <Carousel {...args} items={items} />;
  },
};

/**
 * 썸네일 없이 페이지네이션을 사용하는 예시입니다.
 */
export const PaginationOnly: Story = {
  args: {
    showThumbnails: false,
    showPagination: true,
    showNavigation: true,
    itemCount: 5,
  },
  render: ({ itemCount, ...args }) => {
    const items = SAMPLE_ITEMS.slice(0, itemCount);
    return <Carousel {...args} items={items} />;
  },
};

/**
 * 한 화면에 여러 슬라이드를 표시하는 예시입니다.
 */
export const MultipleSlides: Story = {
  args: {
    slidesPerView: 3,
    spaceBetween: 16,
    showThumbnails: false,
    showPagination: true,
    itemCount: 6,
  },
  render: ({ itemCount, ...args }) => {
    const items = SAMPLE_ITEMS.slice(0, itemCount);
    return <Carousel {...args} items={items} />;
  },
};

/**
 * 썸네일 위치를 변경한 예시들입니다. (Left, Right, Top)
 */
export const ThumbnailPosition: Story = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3>Thumbnail Left</h3>
        <div style={{ height: '400px' }}>
          <Carousel
            items={SAMPLE_ITEMS.slice(0, 5)}
            thumbnailPosition='left'
            thumbnailSize={100}
            thumbnailCount={4}
          />
        </div>
      </div>

      <div>
        <h3>Thumbnail Right</h3>
        <div style={{ height: '400px' }}>
          <Carousel
            items={SAMPLE_ITEMS.slice(0, 5)}
            thumbnailPosition='right'
            thumbnailSize={100}
            thumbnailCount={4}
          />
        </div>
      </div>

      <div>
        <h3>Thumbnail Top</h3>
        <Carousel
          items={SAMPLE_ITEMS.slice(0, 5)}
          thumbnailPosition='top'
          thumbnailSize={80}
          thumbnailCount={5}
        />
      </div>
    </div>
  ),
};
