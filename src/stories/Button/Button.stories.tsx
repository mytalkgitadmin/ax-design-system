import { color } from '../../tokens';
import { Icon } from '../Icon';
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

const PRESET_COLORS = ['primary', 'secondary', 'tertiary'] as const;
const COLORED_BUTTONS = ['green', 'blue', 'red', 'yellow'] as const;

/**
 * Button 컴포넌트는 사용자 액션을 트리거하는 기본 버튼입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `ReactNode` (optional) |
 * | `children` | `ReactNode` (optional, label보다 우선) |
 * | `variant` | `solid` \| `outline` \| `ghost` |
 * | `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `color` | `primary` \| `secondary` \| `tertiary` \| `string` (hex/rgb) |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
 * | `full` | `boolean` |
 * | `disabled` | `boolean` |
 * | `loading` | `boolean` |
 * | `leftIcon` | `IconType` |
 * | `rightIcon` | `IconType` |
 * | `icon` | `IconType` (아이콘 전용 버튼) |
 * | `type` | `button` \| `submit` \| `reset` |
 * | `as` | `button` \| `a` |
 * | `href` | `string` (as="a"일 때 필수) |
 * | `target` | `_blank` \| `_self` |
 * | `onClick` | `() => void` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Button } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Button label="클릭" />
 * <Button label="Primary" color="primary" variant="solid" />
 *
 * // children 사용 (label보다 우선)
 * <Button>
 *   <Icon name="Download" /> 다운로드
 * </Button>
 * <Button>
 *   <strong>Bold</strong> Text
 * </Button>
 *
 * // 사이즈 및 스타일
 * <Button label="작은 버튼" size="sm" />
 * <Button label="큰 버튼" size="lg" />
 * <Button label="Outline" variant="outline" />
 * <Button label="Ghost" variant="ghost" />
 *
 * // 아이콘 포함
 * <Button label="다운로드" leftIcon="Download" />
 * <Button icon="Search" /> // 아이콘 전용
 *
 * // 커스텀 컬러
 * <Button label="Custom" color="#8facff" />
 *
 * // 링크로 사용
 * <Button label="Go" as="a" href="https://example.com" />
 *
 * // 전체 너비
 * <Button label="전체 너비" full />
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
    // === Appearance ===
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description: 'Button variant (solid, outline, ghost)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      description: 'Button size',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
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
        '시맨틱 프리셋(primary, secondary, tertiary) 또는 커스텀 hex/rgb 값',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
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
    full: {
      control: 'boolean',
      description: 'Full width',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
      table: { category: 'Appearance' },
    },
    style: {
      control: 'object',
      description: '인라인 스타일',
      table: { category: 'Appearance' },
    },

    // === Content ===
    label: {
      control: 'text',
      description: 'Button text (ReactNode)',
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Button content (ReactNode, label보다 우선)',
      table: { category: 'Content' },
    },

    // === Icon ===
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
      description: '아이콘만 있는 버튼 (text 없음)',
      table: { category: 'Icon' },
    },

    // === State ===
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state (shows "Loading..." text)',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },

    // === Polymorphic ===
    as: {
      control: false,
      description: '렌더링할 HTML 태그/컴포넌트 (button, a, Link 등)',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'button' },
      },
    },
    type: {
      control: 'select',
      options: BUTTON_TYPES,
      description: 'Button type (as="button"일 때만 사용)',
      table: {
        category: 'Polymorphic',
        defaultValue: { summary: 'button' },
      },
    },
    href: {
      control: 'text',
      description: 'URL (**필수**: as="a"일 때)',
      table: {
        category: 'Polymorphic',
      },
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
      description: '링크 타겟 (as="a"일 때 사용)',
      table: {
        category: 'Polymorphic',
      },
    },
    rel: {
      control: 'text',
      description:
        '링크 관계 (target="_blank" 시 자동으로 "noopener noreferrer" 추가됨)',
      table: {
        category: 'Polymorphic',
      },
    },

    // === Events ===
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
      {PRESET_COLORS.map((color) => {
        const title = color.charAt(0).toUpperCase() + color.slice(1);
        return (
          <Button
            key={color}
            variant='solid'
            size='md'
            color={color}
            label={title}
          />
        );
      })}
      <Button variant='outline' size='md' color='primary' label='Outline' />
      <Button variant='ghost' size='md' color='primary' label='Ghost' />
    </div>
  ),
};

/**
 * 컬러 버튼 - Badge처럼 green, blue, red, yellow 색상을 사용할 수 있습니다.
 * 아이콘과 함께 사용할 수도 있습니다.
 */
export const ColoredButtons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* 기본 컬러 버튼 */}

      <h3
        style={{
          marginBottom: '16px',
          color: '#222',
          fontSize: '16px',
          fontWeight: 600,
        }}
      >
        기본 컬러 버튼
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {(['solid', 'outline', 'ghost'] as const).map((variant) => (
          <div key={variant}>
            <h4
              style={{
                marginBottom: '12px',
                color: '#697180',
                textTransform: 'capitalize',
                fontSize: '14px',
              }}
            >
              {variant}
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {COLORED_BUTTONS.map((color) => {
                const title = color.charAt(0).toUpperCase() + color.slice(1);
                return (
                  <Button
                    key={color}
                    variant={variant}
                    size='md'
                    color={color}
                    label={title}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Solid Variant - 각 사이즈와 컬러별 solid 버튼
 */
export const Solid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        placeItems: 'center left',
        gap: '12px',
      }}
    >
      {BUTTON_SIZES.map((size) =>
        PRESET_COLORS.map((color) => (
          <Button
            key={`solid-${size}-${color}`}
            variant='solid'
            size={size}
            color={color}
            label='Button'
          />
        ))
      )}
    </div>
  ),
};

/**
 * Outline Variant - 각 사이즈와 컬러별 outline 버튼
 */
export const Outline: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        placeItems: 'center left',
        gap: '12px',
      }}
    >
      {BUTTON_SIZES.map((size) =>
        PRESET_COLORS.map((color) => (
          <Button
            key={`outline-${size}-${color}`}
            variant='outline'
            size={size}
            color={color}
            label='Button'
          />
        ))
      )}
    </div>
  ),
};

/**
 * Ghost Variant - 각 사이즈와 컬러별 ghost 버튼 (hover 시 연한 배경 표시)
 */
export const Ghost: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        placeItems: 'center left',
        gap: '12px',
      }}
    >
      {BUTTON_SIZES.map((size) =>
        PRESET_COLORS.map((color) => (
          <Button
            key={`ghost-${size}-${color}`}
            variant='ghost'
            size={size}
            color={color}
            label='Button'
          />
        ))
      )}
    </div>
  ),
};

/**
 * Rounded - 테마 설정을 덮어쓰기하여 모서리 둥글기를 조정할 수 있습니다.
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
      <Button
        variant='ghost'
        size='md'
        color='primary'
        label='Ghost'
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
 * 아이콘이 있는 버튼 - 모든 variant와 color 조합
 */
export const WithIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {(['solid', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant}>
          <h4
            style={{
              marginBottom: '12px',
              color: '#697180',
              textTransform: 'capitalize',
            }}
          >
            {variant}
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {PRESET_COLORS.map((color) => (
              <>
                <Button
                  key={`${variant}-${color}-start`}
                  variant={variant}
                  label='Download'
                  leftIcon='Download'
                  color={color}
                />
                <Button
                  key={`${variant}-${color}-end`}
                  variant={variant}
                  label='Search'
                  rightIcon='Search'
                  color={color}
                />
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * 아이콘만 있는 버튼 - 모든 variant와 color 조합 (사이즈별)
 */
export const OnlyIcon: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {(['solid', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant}>
          <h4
            style={{
              marginBottom: '12px',
              color: '#697180',
              textTransform: 'capitalize',
            }}
          >
            {variant}
          </h4>
          <div
            style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(6, auto)',
              alignItems: 'center',
            }}
          >
            {BUTTON_SIZES.map((size) =>
              PRESET_COLORS.map((color) => (
                <>
                  <Button
                    key={`${variant}-${size}-${color}-dl`}
                    size={size}
                    variant={variant}
                    icon='Download'
                    color={color}
                    label='Download'
                  />
                  <Button
                    key={`${variant}-${size}-${color}-search`}
                    size={size}
                    variant={variant}
                    icon='Search'
                    color={color}
                    label='Search'
                  />
                </>
              ))
            )}
          </div>
        </div>
      ))}
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
          leftIcon='Download'
        />
        <Button
          as='a'
          href='https://example.com'
          target='_blank'
          label='Search'
          rightIcon='Search'
        />
      </div>
    </div>
  ),
};

/**
 * Loading State
 *
 * 비동기 작업 중 버튼에 "Loading..." 텍스트를 표시합니다.
 */
export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h4
          style={{
            marginBottom: '12px',
            color: '#697180',
            fontSize: '14px',
          }}
        >
          Solid Variant
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {PRESET_COLORS.map((color) => (
            <Button
              key={color}
              variant='solid'
              color={color}
              label='Loading...'
              loading
            />
          ))}
        </div>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '12px',
            color: '#697180',
            fontSize: '14px',
          }}
        >
          Outline Variant
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {PRESET_COLORS.map((color) => (
            <Button
              key={color}
              variant='outline'
              color={color}
              label='Loading...'
              loading
            />
          ))}
        </div>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '12px',
            color: '#697180',
            fontSize: '14px',
          }}
        >
          Ghost Variant
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {PRESET_COLORS.map((color) => (
            <Button
              key={color}
              variant='ghost'
              color={color}
              label='Loading...'
              loading
            />
          ))}
        </div>
      </div>

      <div>
        <h4
          style={{
            marginBottom: '12px',
            color: '#697180',
            fontSize: '14px',
          }}
        >
          Different Sizes
        </h4>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {BUTTON_SIZES.map((size) => (
            <Button
              key={size}
              size={size}
              variant='solid'
              color='primary'
              label='Loading'
              loading
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * children prop을 사용하여 복잡한 컨텐츠를 렌더링할 수 있습니다.
 * 아이콘과 텍스트를 조합하거나, HTML 요소를 포함할 수 있습니다.
 */
export const WithChildren: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 아이콘 + 텍스트 조합 예제 */}
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', color: '#697180' }}
        >
          아이콘 + 텍스트 조합
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant='outline'>
            <Icon name='Download' size={16} /> 다운로드
          </Button>
          <Button variant='outline'>
            <Icon name='Share' size={16} /> 공유하기
          </Button>
          <Button variant='solid' color='primary'>
            <Icon name='UserFill' size={16} /> 프로필 보기
          </Button>
        </div>
      </div>

      {/* HTML 요소 조합 예제 */}
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', color: '#697180' }}
        >
          HTML 요소 조합
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button variant='solid' color='primary'>
            <strong>강조</strong> 텍스트
          </Button>
          <Button variant='outline'>
            <span style={{ color: '#ff6b6b' }}>빨간</span> 텍스트
          </Button>
        </div>
      </div>

      {/* children과 label 비교 */}
      <div>
        <h4
          style={{ marginBottom: '12px', fontSize: '14px', color: '#697180' }}
        >
          children vs label (children이 우선)
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button label='label prop' variant='outline' />
          <Button variant='outline'>children prop</Button>
          <Button label='무시됨' variant='outline'>
            children이 우선
          </Button>
        </div>
      </div>
    </div>
  ),
};
