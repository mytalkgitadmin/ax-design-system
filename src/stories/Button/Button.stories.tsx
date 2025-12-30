import { color } from '../../tokens';
import { ICON_NAMES } from '../Icon/types';
import { Button } from './index';
import {
  BUTTON_COLOR_PRESETS,
  BUTTON_ROUNDED,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Button 컴포넌트는 사용자 액션을 트리거하는 기본 버튼입니다.
 *
 * ## 주요 기능
 * - **variant**: solid, outline
 * - **size**: xs, sm, md, lg, xl
 * - **rounded**: none, xs, sm, md, lg, xl, full (기본값: sm)
 * - **시맨틱 컬러 프리셋**: primary, secondary
 * - **커스텀 hex/rgb 컬러** 지원
 * - **hover/active 상태** 자동 처리
 * - **전체 너비 옵션** (full)
 * - **Tabler 아이콘** 지원
 *
 * ## 컬러 사용법
 * ### 시맨틱 토큰 (권장)
 * ```tsx
 * <Button color="primary" label="Primary" />
 * <Button color="secondary" label="Secondary" />
 * ```
 *
 * ### 커스텀 컬러
 * ```tsx
 * <Button color="#8facff" label="Custom Blue" />
 * <Button color="rgb(143, 172, 255)" label="Custom RGB" />
 * ```
 *
 * ## Rounded 사용법
 * ```tsx
 * // 기본값 사용 (sm = 8px)
 * <Button label="Button" />
 *
 * // rounded prop으로 덮어쓰기
 * <Button label="Button" rounded="full" />  // 완전히 둥근 모서리
 * <Button label="Button" rounded="none" />  // 모서리 둥글기 없음
 * ```
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description: 'Button variant (solid, outline)',
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      description: 'Button size',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: [
        ...BUTTON_COLOR_PRESETS,
        color.blue['500'],
        color.pink['500'],
        color.indigo['500'],
        color.green['600'],
      ],
      description:
        '시맨틱 프리셋(primary, secondary 등) 또는 토큰 컬러 선택. 커스텀 hex 값은 직접 입력 가능',
      table: {
        category: 'Appearance',
      },
    },
    full: {
      control: 'boolean',
      description: 'Full width',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: BUTTON_ROUNDED,
      description: 'Border radius (테마 설정 덮어쓰기)',
      table: {
        category: 'Appearance',
      },
    },

    // Content
    label: {
      control: 'text',
      description: 'Button text',
      table: { category: 'Content' },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { category: 'State' },
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
    icon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '아이콘만 있는 버튼',
      table: { category: 'Icon' },
    },

    // HTML Attributes
    type: {
      control: 'select',
      options: BUTTON_TYPES,
      description: 'Button type (기본: button)',
      table: {
        category: 'HTML Attributes',
        defaultValue: { summary: 'button' },
      },
    },
    as: {
      control: 'text',
      description: '렌더링할 HTML 태그 ("a"로 설정 시 링크로 렌더링)',
      table: {
        category: 'HTML Attributes',
      },
    },
    href: {
      control: 'text',
      description: 'URL (as="a"일 때 필수)',
      table: {
        category: 'HTML Attributes',
      },
    },
    target: {
      control: 'select',
      description: '링크 타겟 (as="a"일 때 사용)',
      table: {
        category: 'HTML Attributes',
      },
    },

    // Events
    onClick: {
      control: false,
      description: '클릭 이벤트 핸들러',
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    full: false,

    label: 'Button',

    disabled: false,

    type: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * 시맨틱 컬러 프리셋 - 디자인 시스템에서 정의한 색상과 hover/active 상태를 사용합니다.
 */
export const SemanticColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Button variant='solid' size='md' color='primary' label='Primary' />
      <Button variant='solid' size='md' color='secondary' label='Secondary' />
      <Button variant='outline' size='md' color='primary' label='Outline' />
    </div>
  ),
};

/**
 * 버튼 사이즈
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: '40px repeat(3, 1fr)',
        placeItems: 'center start',
      }}
    >
      <p></p>
      <p>solid-primary</p>
      <p>solid-secondary</p>
      <p>outline-primary</p>

      <p>xs</p>
      <Button variant='solid' size='xs' color='primary' label='Button' />
      <Button variant='solid' size='xs' color='secondary' label='Button' />
      <Button variant='outline' size='xs' color='primary' label='Button' />

      <p>sm</p>
      <Button variant='solid' size='sm' color='primary' label='Button' />
      <Button variant='solid' size='sm' color='secondary' label='Button' />
      <Button variant='outline' size='sm' color='primary' label='Button' />

      <p>md</p>
      <Button variant='solid' size='md' color='primary' label='Button' />
      <Button variant='solid' size='md' color='secondary' label='Button' />
      <Button variant='outline' size='md' color='primary' label='Button' />

      <p>lg</p>
      <Button variant='solid' size='lg' color='primary' label='Button' />
      <Button variant='solid' size='lg' color='secondary' label='Button' />
      <Button variant='outline' size='lg' color='primary' label='Button' />

      <p>xl</p>
      <Button variant='solid' size='xl' color='primary' label='Button' />
      <Button variant='solid' size='xl' color='secondary' label='Button' />
      <Button variant='outline' size='xl' color='primary' label='Button' />
    </div>
  ),
};

/**
 * Rounded (모서리 둥글기)
 * 테마 설정을 덮어쓰기하여 원하는 모서리 둥글기를 적용할 수 있습니다.
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
      <Button
        variant='solid'
        color='primary'
        label='None (0px)'
        rounded='none'
      />
      <Button variant='solid' color='primary' label='XS (4px)' rounded='xs' />
      <Button variant='solid' color='primary' label='SM (8px)' rounded='sm' />
      <Button variant='solid' color='primary' label='MD (12px)' rounded='md' />
      <Button variant='solid' color='primary' label='LG (16px)' rounded='lg' />
      <Button variant='solid' color='primary' label='XL (24px)' rounded='xl' />
      <Button
        variant='solid'
        color='primary'
        label='Full (999px)'
        rounded='full'
      />
    </div>
  ),
};

/**
 * Disabled 상태
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        variant='solid'
        size='md'
        color='primary'
        label='Primary'
        disabled
      />
      <Button
        variant='solid'
        size='md'
        color='secondary'
        label='Secondary'
        disabled
      />
      <Button
        variant='outline'
        size='md'
        color='primary'
        label='Outline'
        disabled
      />
    </div>
  ),
};

/**
 * Full Width 버튼
 */
export const FullWidth: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Button variant='solid' size='md' color='primary' label='Button' full />
      <Button variant='solid' size='md' color='secondary' label='Button' full />
      <Button variant='outline' size='md' color='primary' label='Button' full />
    </div>
  ),
};

/**
 * 아이콘이 있는 버튼
 */
export const WithIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'auto auto auto',
      }}
    >
      <Button label='Download' leftIcon='Upload' />
      <Button label='Trash' leftIcon='CircleXDuotone' />
      <Button label='search' leftIcon='Search' />

      <Button label='Download' color='secondary' leftIcon='Upload' />
      <Button label='Trash' color='secondary' leftIcon='CircleXDuotone' />
      <Button label='search' color='secondary' leftIcon='Search' />

      <Button variant='outline' label='Download' leftIcon='Upload' />
      <Button variant='outline' label='Trash' leftIcon='CircleXDuotone' />
      <Button variant='outline' label='search' leftIcon='Search' />
    </div>
  ),
};
/**
 * 아이콘만 있는 버튼
 */
export const OnlyIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(9, 1fr)',
      }}
    >
      {/* sm */}
      <Button size='sm' label='Download' icon='Upload' />
      <Button size='sm' label='Trash' icon='CircleXDuotone' />
      <Button size='sm' label='search' icon='Search' />
      <Button size='sm' label='Download' color='secondary' icon='Upload' />
      <Button size='sm' label='Trash' color='secondary' icon='CircleXDuotone' />
      <Button size='sm' label='search' color='secondary' icon='Search' />
      <Button size='sm' variant='outline' label='Download' icon='Upload' />
      <Button size='sm' variant='outline' label='Trash' icon='CircleXDuotone' />
      <Button size='sm' variant='outline' label='search' icon='Search' />
      {/* md */}
      <Button label='Download' icon='Upload' />
      <Button label='Trash' icon='CircleXDuotone' />
      <Button label='search' icon='Search' />
      <Button label='Download' color='secondary' icon='Upload' />
      <Button label='Trash' color='secondary' icon='CircleXDuotone' />
      <Button label='search' color='secondary' icon='Search' />
      <Button variant='outline' label='Download' icon='Upload' />
      <Button variant='outline' label='Trash' icon='CircleXDuotone' />
      <Button variant='outline' label='search' icon='Search' />

      {/* lg */}
      <Button size='lg' label='Download' icon='Upload' />
      <Button size='lg' label='Trash' icon='CircleXDuotone' />
      <Button size='lg' label='search' icon='Search' />
      <Button size='lg' label='Download' color='secondary' icon='Upload' />
      <Button size='lg' label='Trash' color='secondary' icon='CircleXDuotone' />
      <Button size='lg' label='search' color='secondary' icon='Search' />
      <Button size='lg' variant='outline' label='Download' icon='Upload' />
      <Button size='lg' variant='outline' label='Trash' icon='CircleXDuotone' />
      <Button size='lg' variant='outline' label='search' icon='Search' />

      {/* xl */}
      <Button size='xl' label='Download' icon='Upload' />
      <Button size='xl' label='Trash' icon='CircleXDuotone' />
      <Button size='xl' label='search' icon='Search' />
      <Button size='xl' label='Download' color='secondary' icon='Upload' />
      <Button size='xl' label='Trash' color='secondary' icon='CircleXDuotone' />
      <Button size='xl' label='search' color='secondary' icon='Search' />
      <Button size='xl' variant='outline' label='Download' icon='Upload' />
      <Button size='xl' variant='outline' label='Trash' icon='CircleXDuotone' />
      <Button size='xl' variant='outline' label='search' icon='Search' />
    </div>
  ),
};

/**
 * 링크로 사용하기 (a 태그)
 *
 * `as="a"`를 사용하면 버튼이 링크로 렌더링됩니다.
 *
 * **주의사항:**
 * - `as="a"`를 설정할 때는 반드시 `href`를 함께 제공해야 합니다
 * - `type`과 `onClick`은 사용할 수 없습니다 (링크는 href로 동작)
 * - 외부 링크일 경우 `target="_blank"`를 함께 사용하세요
 *
 * ```tsx
 * // 올바른 사용
 * <Button as="a" href="https://example.com" label="링크" />
 * <Button as="a" href="https://example.com" target="_blank" label="새 탭에서 열기" />
 *
 * // 잘못된 사용 (TypeScript 에러 발생)
 * <Button as="a" label="링크" /> // ❌ href 누락
 * <Button as="a" href="https://example.com" type="submit" /> // ❌ type 사용 불가
 * ```
 */
export const AsLink: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button
          as='a'
          href='https://example.com'
          label='내부 링크'
          variant='solid'
          color='primary'
        />
        <Button
          as='a'
          href='https://example.com'
          target='_blank'
          label='외부 링크 (새 탭)'
          variant='solid'
          color='secondary'
        />
        <Button
          as='a'
          href='https://example.com'
          label='Outline 링크'
          variant='outline'
          color='primary'
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button
          as='a'
          href='https://example.com'
          label='Download'
          leftIcon='Upload'
        />
        <Button
          as='a'
          href='https://example.com'
          target='_blank'
          label='Search'
          rightIcon='Search'
        />
        <Button
          as='a'
          href='https://example.com'
          label='Trash'
          icon='CircleXDuotone'
        />
      </div>
    </div>
  ),
};
