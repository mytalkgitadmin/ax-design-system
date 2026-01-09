import { useState } from 'react';

import { color } from '../../tokens';
import { Textarea } from './index';
import {
  TEXTAREA_COLOR_PRESETS,
  TEXTAREA_ROUNDED,
  TEXTAREA_SIZES,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Textarea 컴포넌트는 사용자로부터 여러 줄의 텍스트 입력을 받는 입력 필드입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `string` (required) |
 * | `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `color` | `primary` \| `secondary` \| `string` (hex/rgb) |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `full` | `boolean` |
 * | `disabled` | `boolean` |
 * | `required` | `boolean` |
 * | `placeholder` | `string` |
 * | `hiddenLabel` | `boolean` |
 * | `status` | `help` \| `success` \| `warn` \| `error` |
 * | `statusMessage` | `string` |
 * | `showStatusIcon` | `boolean` |
 * | `rows` | `number` |
 * | `autoGrow` | `boolean` |
 * | `minRows` | `number` |
 * | `maxRows` | `number` |
 * | `maxLength` | `number` |
 * | `minLength` | `number` |
 * | `showCharacterCount` | `boolean` |
 * | `characterCountPosition` | `left` \| `right` \| `inside-left` \| `inside-right` |
 * | `value` | `string` |
 * | `onChange` | `(e: ChangeEvent<HTMLTextAreaElement>) => void` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Textarea } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Textarea label="설명" placeholder="설명을 입력하세요" rows={4} />
 *
 * // Auto-grow (자동 높이 조정)
 * <Textarea label="내용" autoGrow minRows={2} maxRows={10} />
 *
 * // 글자수 카운터
 * <Textarea
 *   label="리뷰"
 *   maxLength={500}
 *   showCharacterCount
 *   characterCountPosition="inside-right"
 * />
 *
 * // 상태 메시지
 * <Textarea
 *   label="내용"
 *   status="error"
 *   statusMessage="최소 10자 이상 입력해주세요"
 * />
 * ```
 */
const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: TEXTAREA_SIZES,
      description: 'Textarea size',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: [
        ...TEXTAREA_COLOR_PRESETS,
        color.blue['500'],
        color.pink['500'],
        color.indigo['500'],
        color.green['600'],
      ],
      description:
        '시맨틱 프리셋(primary, secondary) 또는 토큰 컬러 선택. 커스텀 hex 값은 직접 입력 가능',
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
      options: TEXTAREA_ROUNDED,
      description: 'Border radius (테마 설정 덮어쓰기)',
      table: {
        category: 'Appearance',
      },
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines (autoGrow가 false일 때)',
      table: {
        category: 'Appearance',
      },
    },
    autoGrow: {
      control: 'boolean',
      description: 'Auto-grow 기능 활성화 (자동 높이 조정)',
      table: {
        category: 'Appearance',
      },
    },
    minRows: {
      control: 'number',
      description: 'Auto-grow 시 최소 줄 수',
      table: {
        category: 'Appearance',
      },
    },
    maxRows: {
      control: 'number',
      description: 'Auto-grow 시 최대 줄 수',
      table: {
        category: 'Appearance',
      },
    },

    // Content
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        category: 'Content',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: { category: 'Content' },
    },
    hiddenLabel: {
      control: 'boolean',
      description: '시각적으로 숨김 (스크린 리더 전용)',
      table: {
        category: 'Content',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { category: 'State' },
    },
    error: {
      control: 'boolean',
      description: 'Error state (deprecated: use status="error")',
      table: {
        category: 'State',
      },
    },
    required: {
      control: 'boolean',
      description: 'Required field (shows asterisk)',
      table: {
        category: 'State',
      },
    },
    status: {
      control: 'select',
      options: ['help', 'success', 'warn', 'error'],
      description: '입력 상태 (help, success, warn, error)',
      table: {
        category: 'State',
      },
    },
    statusMessage: {
      control: 'text',
      description: '상태 메시지',
      table: {
        category: 'State',
      },
    },
    showStatusIcon: {
      control: 'boolean',
      description: '상태 아이콘 표시 여부',
      table: {
        category: 'State',
      },
    },

    // Validation
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters',
      table: {
        category: 'Validation',
      },
    },
    minLength: {
      control: 'number',
      description: 'Minimum number of characters',
      table: {
        category: 'Validation',
      },
    },

    // Character Counter
    showCharacterCount: {
      control: 'boolean',
      description: '글자수 표시 여부',
      table: {
        category: 'Character Counter',
      },
    },
    characterCountPosition: {
      control: 'select',
      options: ['left', 'right', 'inside-left', 'inside-right'],
      description:
        '글자수 위치 (left: 외부 왼쪽, right: 외부 오른쪽, inside-left: 내부 왼쪽, inside-right: 내부 오른쪽)',
      table: {
        category: 'Character Counter',
      },
    },

    // HTML Attributes
    value: {
      control: false,
      table: {
        category: 'HTML Attributes',
      },
    },
    defaultValue: {
      control: false,
      table: {
        category: 'HTML Attributes',
      },
    },
    id: {
      control: false,
      table: {
        category: 'HTML Attributes',
      },
    },
    name: {
      control: false,
      table: {
        category: 'HTML Attributes',
      },
    },

    // Events
    onChange: {
      control: false,
      table: {
        category: 'Events',
      },
    },
    onFocus: {
      control: false,
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      control: false,
      table: {
        category: 'Events',
      },
    },
  },

  args: {
    size: 'md',
    color: 'primary',
    full: false,
    rows: 4,

    label: '레이블',
    placeholder: '텍스트를 입력해 주세요',
    hiddenLabel: false,

    disabled: false,
    error: false,
    required: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * Textarea 사이즈
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        display: 'grid',
        gap: '16px',
      }}
    >
      <Textarea label='XS' size='xs' rows={3} />
      <Textarea label='SM' size='sm' rows={3} />
      <Textarea label='MD' size='md' rows={4} />
      <Textarea label='LG' size='lg' rows={4} />
      <Textarea label='XL' size='xl' rows={5} />
    </div>
  ),
};

/**
 * Auto-grow 기능
 */
export const AutoGrow: Story = {
  render: () => {
    const AutoGrowExample = () => {
      const [message, setMessage] = useState('');

      return (
        <div
          style={{
            width: '600px',
            maxWidth: '100%',
            display: 'grid',
            gap: '24px',
          }}
        >
          <Textarea
            label='일반 Textarea (고정 높이)'
            placeholder='4줄 고정 높이입니다'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />

          <Textarea
            label='Auto-grow (최소 1줄 ~ 제한 없음)'
            placeholder='입력에 따라 자동으로 늘어납니다'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoGrow
            minRows={1}
          />

          <Textarea
            label='Auto-grow (최소 2줄 ~ 최대 5줄)'
            placeholder='최소, 최대 높이가 정해져 있습니다'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoGrow
            minRows={2}
            maxRows={5}
            maxLength={500}
            required
            status={message.length > 450 ? 'warn' : 'help'}
            statusMessage={`${message.length} / 500자`}
            showStatusIcon={message.length > 450}
          />
        </div>
      );
    };

    return <AutoGrowExample />;
  },
};

/**
 * 글자수 카운터
 */
export const CharacterCounter: Story = {
  render: () => {
    const CharacterCounterExample = () => {
      const [text, setText] = useState('');

      return (
        <div
          style={{
            width: '600px',
            maxWidth: '100%',
            display: 'grid',
            gap: '24px',
          }}
        >
          <Textarea
            label='내부 오른쪽 (inside-right) - 기본'
            placeholder='텍스트를 입력하세요'
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            rows={4}
            showCharacterCount
            characterCountPosition='inside-right'
          />

          <Textarea
            label='내부 왼쪽 (inside-left)'
            placeholder='텍스트를 입력하세요'
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={100}
            rows={4}
            showCharacterCount
            characterCountPosition='inside-left'
          />

          <Textarea
            label='외부 왼쪽 (left)'
            placeholder='텍스트를 입력하세요'
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={50}
            rows={2}
            showCharacterCount
            characterCountPosition='left'
            status='help'
            statusMessage='간단명료하게 작성해주세요'
          />

          <Textarea
            label='외부 오른쪽 (right)'
            placeholder='텍스트를 입력하세요'
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            rows={4}
            showCharacterCount
            characterCountPosition='right'
            status='help'
            statusMessage='자세히 작성해주세요'
          />
        </div>
      );
    };

    return <CharacterCounterExample />;
  },
};
