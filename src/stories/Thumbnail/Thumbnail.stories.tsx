import { Thumbnail } from './index';
import { THUMBNAIL_ROUNDED } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Thumbnail 컴포넌트
 *
 * 이미지 썸네일을 표시하거나, 이미지가 없을 때 기본 아이콘을 보여주는 컴포넌트입니다.
 *
 * ## 주요 기능
 * - ✅ 반응형 크기 조절 (부모 컨테이너에 맞춤)
 * - ✅ 다양한 이미지 비율 지원 (1:1, 16:9, 황금비율)
 * - ✅ 이미지 로드 실패 시 자동 fallback
 * - ✅ 접근성 지원 (alt 속성)
 *
 * ## 사용법
 *
 * ### 기본 사용
 * ```tsx
 * <Thumbnail src="image.jpg" alt="상품 이미지" />
 * ```
 *
 * ### 이미지 없이 사용 (기본 아이콘)
 * ```tsx
 * <Thumbnail color="gray" />
 * ```
 *
 * ### 크기와 비율 조절
 * ```tsx
 * <Thumbnail
 *   src="image.jpg"
 *   alt="배너 이미지"
 *   width={200}
 *   ratio="16:9"
 *   rounded="md"
 * />
 * ```
 *
 * ## Props
 * - `src`: 이미지 URL (없거나 로드 실패 시 기본 아이콘 표시)
 * - `alt`: 이미지 대체 텍스트 (접근성을 위해 권장)
 * - `width`: 썸네일 너비 (생략 시 100%, 단위: 0.1em)
 * - `color`: 배경 색상 ('brand' | 'gray')
 * - `ratio`: 이미지 비율 ('1' | '16:9' | '1.618:1')
 * - `rounded`: 모서리 둥글기 ('none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full')
 *
 * ## 에러 처리
 * - 이미지 URL이 잘못되었거나 네트워크 오류로 로드 실패 시
 * - 자동으로 기본 아이콘으로 대체됩니다
 *
 * ## 접근성
 * - 이미지를 사용할 때는 `alt` prop을 제공해주세요
 * - 장식용 이미지는 `alt=""` 로 설정할 수 있습니다
 */
const meta = {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    rounded: {
      control: 'select',
      options: THUMBNAIL_ROUNDED,
      description: 'Border radius',
      table: {
        category: 'Appearance',
      },
    },
  },
  args: {
    src: null,
    ratio: '1',
    rounded: 'sm',
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 썸네일 (이미지 없음)
 *
 * Controls를 사용하여 실시간으로 속성을 변경해보세요.
 */
export const Default: Story = {
  args: {
    src: null,
    color: 'brand',
    width: 80,
  },
};

export const Color: Story = {
  render: () => (
    <div
      style={{
        width: '200px',
        display: 'flex',
        gap: '8px',
      }}
    >
      <Thumbnail />
      <Thumbnail color='gray' />
    </div>
  ),
};

/**
 * Rounded (모서리 둥글기)
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
      <Thumbnail rounded='none' width={60} />
      <Thumbnail rounded='xs' width={60} />
      <Thumbnail rounded='sm' width={60} />
      <Thumbnail rounded='md' width={60} />
      <Thumbnail rounded='lg' width={60} />
      <Thumbnail rounded='xl' width={60} />
      <Thumbnail rounded='full' width={60} />
    </div>
  ),
};

export const Image: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <Thumbnail
        width={150}
        src='https://cdn.imweb.me/upload/S202207202685e30f16e24/8606de06c1ae6.png'
        alt='정사각형 비율 이미지'
      />
      <Thumbnail
        width={150}
        src='https://cdn.imweb.me/upload/S202207202685e30f16e24/8606de06c1ae6.png'
        alt='황금 비율 이미지'
        ratio='1.618:1'
      />
      <Thumbnail
        width={150}
        src='https://cdn.imweb.me/upload/S202207202685e30f16e24/8606de06c1ae6.png'
        alt='16:9 비율 이미지'
        ratio='16:9'
      />
    </div>
  ),
};

/**
 * 이미지 로드 실패 처리
 *
 * 잘못된 URL이나 네트워크 오류로 이미지를 불러올 수 없을 때,
 * 자동으로 기본 아이콘으로 대체됩니다.
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
