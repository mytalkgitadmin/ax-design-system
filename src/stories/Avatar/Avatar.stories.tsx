import { AvatarGroup } from './AvatarGroup';
import { Avatar } from './index';
import { AVATAR_ROUNDED, AVATAR_SIZES, AVATAR_TYPES } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Avatar 컴포넌트는 사용자 프로필을 표시하는 데 사용됩니다.
 * 이미지, 텍스트(이니셜), 빈 상태의 세 가지 타입을 지원합니다.
 *
 * ## Props
 *
 * ### Avatar
 *
 * | Prop | Type |
 * |------|------|
 * | `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `type` | `empty` \| `text` \| `image` |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
 * | `src` | `string` |
 * | `alt` | `string` |
 * | `text` | `string` |
 * | `name` | `string` |
 * | `onClick` | `() => void` |
 * | `title` | `string` |
 * | `aria-label` | `string` |
 *
 * ### AvatarGroup
 *
 * | Prop | Type |
 * |------|------|
 * | `avatars` | `AvatarProps[]` (required) |
 * | `max` | `number` |
 * | `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
 * | `spacing` | `number` (px) |
 * | `borderWidth` | `number` (px, default: 3) |
 * | `borderColor` | `string` (hex/rgb, default: white) |
 *
 * ## 크기 시스템
 *
 * Avatar는 componentSize 토큰을 사용합니다 (Button, Input과 동일):
 * - **xs**: 26px (밀집 UI, 테이블)
 * - **sm**: 32px (콤팩트 UI, 툴바)
 * - **md**: 44px (기본 크기, 44px 터치 타겟)
 * - **lg**: 56px (강조 UI)
 * - **xl**: 64px (히어로 섹션, 랜딩 페이지)
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Avatar, AvatarGroup } from '@bemily/design-system';
 *
 * // 기본 사용 (Empty)
 * <Avatar />
 *
 * // 텍스트 (이니셜)
 * <Avatar type="text" text="홍" />
 * <Avatar type="text" text="김철수" /> // 자동으로 "김철" 추출
 *
 * // 이미지
 * <Avatar type="image" src="https://..." alt="프로필" />
 *
 * // 크기 조절 (componentSize 토큰)
 * <Avatar size="xl" /> // 64px (히어로 섹션)
 *
 * // 둥근 모서리 변경
 * <Avatar rounded="lg" /> // 사각형에 가까운 형태
 * <Avatar rounded="none" /> // 완전한 사각형
 *
 * // 이미지 로드 실패 시 자동 fallback
 * <Avatar type="image" src="broken.jpg" name="홍길동" /> // "홍길" 표시
 *
 * // Interactive (클릭 가능)
 * <Avatar
 *   type="image"
 *   src="..."
 *   onClick={() => navigate('/profile')}
 *   title="프로필 보기"
 * />
 *
 * // AvatarGroup (여러 사용자)
 * <AvatarGroup
 *   max={3}
 *   size="md"
 *   avatars={[
 *     { type: 'image', src: '...', name: '홍길동' },
 *     { type: 'text', text: '김' },
 *     { type: 'empty' },
 *     // 나머지는 +1로 표시됨
 *   ]}
 * />
 *
 * // AvatarGroup 테두리 커스터마이징
 * <AvatarGroup
 *   borderWidth={0}  // 투명 테두리 (권장 - 배경색 변경에 유연)
 *   avatars={[
 *     { type: 'image', src: '...', name: '홍길동' },
 *     { type: 'text', text: '김' },
 *     { type: 'empty' },
 *   ]}
 * />
 *
 * // 또는 배경색 매칭 (배경색마다 설정 필요)
 * <AvatarGroup
 *   borderWidth={2}
 *   borderColor="#f0f0f0"  // 배경색과 동일
 *   avatars={[
 *     { type: 'image', src: '...', name: '홍길동' },
 *     { type: 'text', text: '김' },
 *     { type: 'empty' },
 *   ]}
 * />
 * ```
 */
const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: AVATAR_SIZES,
      description: 'Avatar 크기',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: AVATAR_TYPES,
      description: 'Avatar 타입',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'empty' },
      },
    },
    rounded: {
      control: 'select',
      options: AVATAR_ROUNDED,
      description: '둥근 모서리 (full=원형, md/lg/xl=사각형)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'full' },
      },
    },

    // Content
    src: {
      control: 'text',
      description: '이미지 URL (type="image"일 때)',
      table: {
        category: 'Content',
      },
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Avatar' },
      },
    },
    text: {
      control: 'text',
      description: '표시할 텍스트 (type="text"일 때, 1-2글자)',
      table: {
        category: 'Content',
      },
    },
    name: {
      control: 'text',
      description: '사용자 이름 (이미지 로드 실패 시 첫 글자 사용)',
      table: {
        category: 'Content',
      },
    },

    // Interaction
    onClick: {
      control: false,
      description: '클릭 이벤트 핸들러',
      table: {
        category: 'Interaction',
      },
    },
    title: {
      control: 'text',
      description: '호버 시 툴팁',
      table: {
        category: 'Interaction',
      },
    },

    // Accessibility
    'aria-label': {
      control: 'text',
      description: '스크린리더용 레이블',
      table: {
        category: 'Accessibility',
      },
    },

    // Unused in stories
    className: {
      control: false,
      table: {
        category: 'Others',
      },
    },
  },

  args: {
    size: 'md',
    type: 'empty',
    rounded: 'full',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * Avatar 타입
 * Empty (기본 아이콘), Text (이니셜), Image (프로필 사진)
 */
export const Types: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        placeItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar type='empty' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Empty</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='홍' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Text</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='image' src='https://i.pravatar.cc/150?img=1' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Image</p>
      </div>
    </div>
  ),
};

/**
 * Avatar 크기
 * componentSize 토큰을 따릅니다.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar size='xs' type='text' text='XS' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>xs (26px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='sm' type='text' text='SM' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>sm (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='md' type='text' text='MD' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>md (44px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='lg' type='text' text='LG' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>lg (56px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='xl' type='text' text='XL' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>xl (64px)</p>
      </div>
    </div>
  ),
};

/**
 * Rounded (둥근 모서리)
 * 완전한 사각형(none)부터 원형(full)까지 7가지 옵션 제공
 */
export const Rounded: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px 16px',
        placeItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='N' rounded='none' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>none (0px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='XS' rounded='xs' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>xs (4px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='SM' rounded='sm' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>sm (8px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='MD' rounded='md' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>md (12px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='LG' rounded='lg' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>lg (16px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='XL' rounded='xl' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>xl (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='원형' rounded='full' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>full (원형)</p>
      </div>
    </div>
  ),
};

/**
 * 텍스트 색상
 * 텍스트 내용에 따라 자동으로 7가지 색상 중 하나가 할당됩니다.
 * 같은 텍스트는 항상 같은 색상을 가집니다.
 */
export const TextColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Avatar type='text' text='홍' name='홍길동' />
      <Avatar type='text' text='김' name='김철수' />
      <Avatar type='text' text='박' name='박영희' />
      <Avatar type='text' text='이' name='이민호' />
      <Avatar type='text' text='정' name='정수진' />
      <Avatar type='text' text='최' name='최유리' />
      <Avatar type='text' text='강' name='강민수' />
      <Avatar type='text' text='JD' name='John Doe' />
      <Avatar type='text' text='AB' name='Anna Brown' />
    </div>
  ),
};

/**
 * Interactive (클릭 가능)
 * onClick prop을 전달하면 hover 효과와 함께 클릭이 가능합니다.
 * 키보드(Enter, Space)로도 접근 가능합니다.
 */
export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar
        type='image'
        src='https://i.pravatar.cc/150?img=1'
        onClick={() => alert('Avatar 클릭!')}
        title='클릭하여 프로필 보기'
      />
      <Avatar
        type='text'
        text='홍'
        onClick={() => alert('홍길동 프로필')}
        name='홍길동'
        title='홍길동'
      />
      <Avatar onClick={() => alert('기본 프로필')} title='기본 사용자' />
    </div>
  ),
};

/**
 * Image Error Fallback
 * 이미지 로드가 실패하면 name prop의 첫 글자로 자동 전환됩니다.
 */
export const ImageErrorFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
          정상 이미지 (로드 성공)
        </p>
        <Avatar
          type='image'
          src='https://i.pravatar.cc/150?img=1'
          name='홍길동'
        />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
          잘못된 이미지 URL → 자동으로 name의 첫 글자로 전환
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar type='image' src='broken-url.jpg' name='홍길동' />
          <Avatar type='image' src='invalid.png' name='Kim Min Ho' />
          <Avatar type='image' src='error.jpg' name='박영희' />
        </div>
      </div>
    </div>
  ),
};

/**
 * AvatarGroup
 * 여러 사용자를 겹쳐서 표시합니다. max 개수를 초과하면 +N으로 표시됩니다.
 */
export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          기본 사용 (max=3)
        </p>
        <AvatarGroup
          max={3}
          avatars={[
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=1',
              name: '홍길동',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=2',
              name: '김철수',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=3',
              name: '박영희',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=4',
              name: '이민호',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=5',
              name: '정수진',
            },
          ]}
        />
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          혼합 타입 (Image, Text, Empty)
        </p>
        <AvatarGroup
          max={5}
          avatars={[
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=1',
              name: '홍길동',
            },
            { type: 'text', text: '김', name: '김철수' },
            { type: 'empty' },
            { type: 'text', text: '박영', name: '박영희' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=3',
              name: '이민호',
            },
            { type: 'text', text: 'JD', name: 'John Doe' },
          ]}
        />
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          크기 조절 (componentSize 토큰)
        </p>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <AvatarGroup
            size='xs'
            max={3}
            avatars={[
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B' },
              { type: 'text', text: 'C' },
              { type: 'text', text: 'D' },
            ]}
          />
          <AvatarGroup
            size='sm'
            max={3}
            avatars={[
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B' },
              { type: 'text', text: 'C' },
              { type: 'text', text: 'D' },
            ]}
          />
          <AvatarGroup
            size='md'
            max={3}
            avatars={[
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B' },
              { type: 'text', text: 'C' },
              { type: 'text', text: 'D' },
            ]}
          />
          <AvatarGroup
            size='lg'
            max={3}
            avatars={[
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B' },
              { type: 'text', text: 'C' },
              { type: 'text', text: 'D' },
            ]}
          />
          <AvatarGroup
            size='xl'
            max={3}
            avatars={[
              { type: 'text', text: 'A' },
              { type: 'text', text: 'B' },
              { type: 'text', text: 'C' },
              { type: 'text', text: 'D' },
            ]}
          />
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          겹침 간격 조절 (spacing)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              spacing=4 (적게 겹침)
            </p>
            <AvatarGroup
              spacing={4}
              avatars={[
                { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                { type: 'text', text: '김' },
                { type: 'empty' },
                { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
              ]}
            />
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              spacing=12 (많이 겹침)
            </p>
            <AvatarGroup
              spacing={12}
              avatars={[
                { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                { type: 'text', text: '김' },
                { type: 'empty' },
                { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          테두리 커스터마이징 (box-shadow 방식)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              ✅ borderWidth=0 → 구분선 없음 (밀착)
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <AvatarGroup
                  borderWidth={0}
                  avatars={[
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              borderWidth=2 → 구분선 있음 (box-shadow)
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <AvatarGroup
                  borderColor='white'
                  avatars={[
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
                  ]}
                />
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                }}
              >
                <AvatarGroup
                  borderColor='#f0f0f0'
                  avatars={[
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              borderColor로 색상 조절 (box-shadow 색상)
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div
                style={{
                  padding: '16px',
                  background: '#333',
                  borderRadius: '8px',
                }}
              >
                <AvatarGroup
                  borderColor='#333'
                  avatars={[
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=1' },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    { type: 'image', src: 'https://i.pravatar.cc/150?img=2' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 실전 예시 - 프로젝트 멤버 표시
 */
export const RealWorldExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          padding: '16px',
          border: '1px solid #e3e6ee',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}
          >
            디자인 시스템 팀
          </h3>
          <p style={{ fontSize: '14px', color: '#697180' }}>8명의 멤버</p>
        </div>
        <AvatarGroup
          max={5}
          avatars={[
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=1',
              name: '홍길동',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=2',
              name: '김철수',
            },
            { type: 'text', text: '박영', name: '박영희' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=4',
              name: '이민호',
            },
            { type: 'text', text: '정', name: '정수진' },
            { type: 'empty' },
            { type: 'text', text: '최', name: '최유리' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=5',
              name: '강민수',
            },
          ]}
        />
      </div>

      <div
        style={{
          padding: '16px',
          border: '1px solid #e3e6ee',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}
          >
            프론트엔드 팀
          </h3>
          <p style={{ fontSize: '14px', color: '#697180' }}>4명의 멤버</p>
        </div>
        <AvatarGroup
          max={4}
          size='sm'
          avatars={[
            { type: 'text', text: 'JS', name: 'John Smith' },
            { type: 'text', text: 'KM', name: 'Kim Minho' },
            { type: 'empty' },
            { type: 'text', text: '박', name: '박서현' },
          ]}
        />
      </div>

      <div
        style={{
          padding: '16px',
          border: '1px solid #e3e6ee',
          borderRadius: '8px',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <h3
            style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}
          >
            개별 Avatar에 onClick 설정
          </h3>
          <p style={{ fontSize: '14px', color: '#697180' }}>
            각 Avatar를 클릭하여 프로필 페이지로 이동
          </p>
        </div>
        <AvatarGroup
          max={3}
          avatars={[
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=1',
              name: '홍길동',
              onClick: () => alert('홍길동 프로필 페이지'),
              title: '홍길동 프로필 보기',
            },
            {
              type: 'text',
              text: '김',
              name: '김철수',
              onClick: () => alert('김철수 프로필 페이지'),
              title: '김철수 프로필 보기',
            },
            {
              type: 'empty',
              onClick: () => alert('사용자 프로필'),
              title: '프로필 보기',
            },
            {
              type: 'text',
              text: '이',
              name: '이민호',
              onClick: () => alert('이민호 프로필'),
            },
          ]}
        />
      </div>
    </div>
  ),
};
