import { AvatarGroup } from './AvatarGroup';
import { Avatar } from './index';
import { AVATAR_ROUNDED, AVATAR_SIZES, AVATAR_TYPES } from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Avatar 컴포넌트는 사용자 프로필을 표시하는 데 사용됩니다.
 * 이미지, 텍스트(이니셜), 빈 상태의 세 가지 타입을 지원합니다.
 *
 * ## Props (웹 접근성 & 시맨틱)
 *
 * 이 컴포넌트는 **웹 접근성(A11y)**과 **시맨틱 마크업**을 위해 엄격한 타입을 적용합니다.
 *
 * ### 1. Image Type
 * 이미지를 표시할 때는 `src`와 `alt`가 **필수**입니다.
 *
 * | Prop | Type | Required | Description |
 * |------|------|----------|-------------|
 * | `type` | `'image'` | Optional | 생략 시 `src`가 있으면 자동 감지됩니다. |
 * | `src` | `string` | **Yes** | 이미지 경로 |
 * | `alt` | `string` | **Yes** | 이미지 대체 텍스트 (스크린리더용) |
 * | `name` | `string` | Optional | 이미지 로드 실패 시 Fallback으로 표시될 이름 |
 *
 * ### 2. Text Type
 * 텍스트(이니셜)를 표시할 때는 `text` 또는 `name` 중 하나가 **필수**입니다.
 *
 * | Prop | Type | Required | Description |
 * |------|------|----------|-------------|
 * | `type` | `'text'` | Optional | 생략 시 `text`/`name`이 있으면 자동 감지됩니다. |
 * | `text` | `string` | **Yes*** | 표시할 텍스트 (1-2글자 권장). `name`이 있으면 생략 가능. |
 * | `name` | `string` | **Yes*** | 사용자 이름. `text`가 없을 때 이니셜 생성용. |
 *
 * ### 3. Interactive (Button/Link)
 * `as` prop에 따라 추가적인 필수 속성이 요구됩니다.
 *
 * | Prop | Type | Required | Description |
 * |------|------|----------|-------------|
 * | `as` | `'button'` | - | 버튼으로 렌더링 |
 * | `onClick` | `func` | **Yes** | `as="button"`일 때 필수 |
 * | `as` | `'a'` | - | 링크로 렌더링 |
 * | `href` | `string` | **Yes** | `as="a"`일 때 필수 |
 *
 * ---
 *
 * ### Common Props
 *
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `size` | `xs` \| `sm` \| `md` \| `lg` | 크기 설정 (기본: `md`) |
 * | `rounded` | `none`...`full` | 둥근 모서리 (기본: `full`) |
 * | `title` | `string` | 툴팁 텍스트 |
 *
 * ## 사용 예시
 *
 * ```tsx
 * // ✅ Image (alt 필수)
 * <Avatar src="url" alt="홍길동" />
 *
 * // ✅ Text (text 또는 name 필수)
 * <Avatar name="홍길동" />
 *
 * // ✅ Interactive (onClick 필수)
 * <Avatar as="button" onClick={handleClick} name="Click Me" />
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
    size: {
      control: 'select',
      options: AVATAR_SIZES,
      description: 'Avatar 크기',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    type: {
      control: 'select',
      options: AVATAR_TYPES,
      description: 'Avatar 타입 (자동 감지됨)',
      table: { category: 'Appearance' },
    },
    rounded: {
      control: 'select',
      options: AVATAR_ROUNDED,
      description: '둥근 모서리',
      table: { category: 'Appearance', defaultValue: { summary: 'full' } },
    },
    src: {
      control: 'text',
      description: '이미지 URL (**필수**: Image 타입일 때 `alt`와 함께 사용)',
      table: { category: 'Content' },
    },
    alt: {
      control: 'text',
      description: '대체 텍스트 (**필수**: `src`가 있을 때)',
      table: { category: 'Accessibility' },
    },
    text: {
      control: 'text',
      description:
        '표시 텍스트 (**필수**: Text 타입일 때 `name`이 없으면 필수)',
      table: { category: 'Content' },
    },
    name: {
      control: 'text',
      description:
        '사용자 이름 (Image 실패 시 Fallback, Text 타입 시 이니셜 생성)',
      table: { category: 'Content' },
    },
    as: {
      control: false,
      description: '렌더링할 HTML 태그 (`button`, `a`, `div` 등)',
      table: { category: 'Polymorphic' },
    },
    onClick: {
      control: false,
      description: '클릭 이벤트 (**필수**: `as="button"`일 때)',
      table: { category: 'Interaction' },
    },
    href: {
      control: false,
      description: '링크 URL (**필수**: `as="a"`일 때)',
      table: { category: 'Interaction' },
    },
    title: {
      control: 'text',
      description: '툴팁 텍스트',
      table: { category: 'Interaction' },
    },
    'aria-label': {
      control: 'text',
      description: '접근성 레이블 (기본값: name 또는 "프로필")',
      table: { category: 'Accessibility' },
    },
    className: {
      control: false,
      table: { category: 'Others' },
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
        <Avatar
          type='image'
          src='https://i.pravatar.cc/150?img=1'
          alt='사용자 프로필'
        />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Image</p>
      </div>
    </div>
  ),
};

/**
 * Avatar 크기
 * Avatar 전용 스펙(20-48px)을 따릅니다.
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
        <p style={{ marginTop: '8px', fontSize: '12px' }}>xs (20px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='sm' type='text' text='SM' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>sm (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='md' type='text' text='MD' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>md (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar size='lg' type='text' text='LG' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>lg (48px)</p>
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
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='N' rounded='none' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>none (0px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Avatar type='text' text='XS' rounded='xs' size='lg' />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>xs (6px)</p>
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
        gap: '24px',
      }}
    >
      <Avatar type='text' text='A' />
      <Avatar type='text' text='B' />
      <Avatar type='text' text='C' />
      <Avatar type='text' text='D' />
      <Avatar type='text' text='E' />
      <Avatar type='text' text='F' />
      <Avatar type='text' text='G' />
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
        as='button'
        src='https://i.pravatar.cc/150?img=1'
        alt='사용자 프로필'
        onClick={() => alert('Avatar 클릭!')}
        title='클릭하여 프로필 보기'
      />
      <Avatar
        type='text'
        as='button'
        text='홍'
        onClick={() => alert('홍길동 프로필')}
        name='홍길동'
        title='홍길동'
      />
      <Avatar
        as='button'
        onClick={() => alert('기본 프로필')}
        title='기본 사용자'
      />
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
          alt='홍길동'
        />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
          잘못된 이미지 URL → name이 있으면 텍스트(이니셜), 없으면 Empty로 자동
          전환
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar
            type='image'
            src='broken-url.jpg'
            name='홍길동'
            alt='홍길동'
          />
          <Avatar
            type='image'
            src='invalid.png'
            name='Kim Min Ho'
            alt='Kim Min Ho'
          />
          <Avatar type='image' src='invalid.png' name='Abcd' alt='abcd' />
          <Avatar type='image' src='error.jpg' name='박영희' alt='박영희' />
          <Avatar type='image' src='error.jpg' alt='박영희' />
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
              alt: '홍길동',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=2',
              name: '김철수',
              alt: '김철수',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=3',
              name: '박영희',
              alt: '박영희',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=4',
              name: '이민호',
              alt: '이민호',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=5',
              name: '정수진',
              alt: '정수진',
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
              alt: '홍길동',
            },
            { type: 'text', text: '김', name: '김철수' },
            { type: 'empty' },
            { type: 'text', text: '박영', name: '박영희' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=3',
              name: '이민호',
              alt: '이민호',
            },
            { type: 'text', text: 'JD', name: 'John Doe' },
          ]}
        />
      </div>

      <div>
        <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          크기 조절 (xs, sm, md, lg)
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
                {
                  type: 'image',
                  src: 'https://i.pravatar.cc/150?img=1',
                  alt: 'User 1',
                },
                { type: 'text', text: '김' },
                { type: 'empty' },
                {
                  type: 'image',
                  src: 'https://i.pravatar.cc/150?img=2',
                  alt: 'User 2',
                },
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
                {
                  type: 'image',
                  src: 'https://i.pravatar.cc/150?img=1',
                  alt: 'User 1',
                },
                { type: 'text', text: '김' },
                { type: 'empty' },
                {
                  type: 'image',
                  src: 'https://i.pravatar.cc/150?img=2',
                  alt: 'User 2',
                },
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
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=1',
                      alt: 'User 1',
                    },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=2',
                      alt: 'User 2',
                    },
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
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=1',
                      alt: 'User 1',
                    },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=2',
                      alt: 'User 2',
                    },
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
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=1',
                      alt: 'User 1',
                    },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=2',
                      alt: 'User 2',
                    },
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
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=1',
                      alt: 'User 1',
                    },
                    { type: 'text', text: '김' },
                    { type: 'empty' },
                    {
                      type: 'image',
                      src: 'https://i.pravatar.cc/150?img=2',
                      alt: 'User 2',
                    },
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
              alt: '홍길동',
            },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=2',
              name: '김철수',
              alt: '김철수',
            },
            { type: 'text', text: '박영', name: '박영희' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=4',
              name: '이민호',
              alt: '이민호',
            },
            { type: 'text', text: '정', name: '정수진' },
            { type: 'empty' },
            { type: 'text', text: '최', name: '최유리' },
            {
              type: 'image',
              src: 'https://i.pravatar.cc/150?img=5',
              name: '강민수',
              alt: '강민수',
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
              alt: '홍길동',
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
