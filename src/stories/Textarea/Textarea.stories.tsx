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
 * ## 주요 기능
 * - **크기**: xs, sm, md, lg, xl (Label 폰트 크기도 자동 조정)
 * - **rounded**: none, xs, sm, md, lg, xl, full (기본값: sm)
 * - **컬러**: 시맨틱 프리셋(primary, secondary) 및 커스텀 hex/rgb
 * - **상태**: hover, focus, disabled 자동 처리
 * - **Auto-grow**: 자동 높이 조정 기능
 * - **글자수 카운터**: 내부/외부 위치 선택 가능
 *
 * ## Label & 접근성
 * - **label** (필수): 접근성을 위해 항상 제공해야 합니다
 * - **required**: 필수 입력 표시 (*)
 * - **hiddenLabel**: 시각적으로 숨기고 스크린 리더만 읽음
 *
 * ## 상태 메시지
 * ```tsx
 * <Textarea label="설명" status="help" statusMessage="도움말 메시지" />
 * <Textarea label="내용" status="success" statusMessage="성공 메시지" />
 * <Textarea label="비고" status="warn" statusMessage="경고 메시지" />
 * <Textarea label="메모" status="error" statusMessage="에러 메시지" />
 *
 * // 아이콘 표시
 * <Textarea label="설명" status="success" statusMessage="성공!" showStatusIcon />
 * ```
 *
 * ## 컬러 사용법
 * ```tsx
 * // 시맨틱 프리셋
 * <Textarea label="설명" color="primary" />
 * <Textarea label="내용" color="secondary" />
 *
 * // 커스텀 컬러
 * <Textarea label="메모" color="#8facff" />
 * <Textarea label="비고" color="rgb(143, 172, 255)" />
 * ```
 *
 * ## Rounded 사용법
 * ```tsx
 * // 기본값 사용 (sm = 8px)
 * <Textarea label="설명" />
 *
 * // rounded prop으로 덮어쓰기
 * <Textarea label="설명" rounded="lg" />  // 큰 둥글기
 * <Textarea label="내용" rounded="none" />  // 모서리 둥글기 없음
 * ```
 *
 * ## Auto-grow 사용법
 * ```tsx
 * // 기본 사용 (고정 높이)
 * <Textarea label="설명" rows={4} />
 *
 * // Auto-grow 활성화
 * <Textarea label="설명" autoGrow minRows={2} maxRows={10} />
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
 * Rounded (모서리 둥글기)
 * 테마 설정을 덮어쓰기하여 원하는 모서리 둥글기를 적용할 수 있습니다.
 */
export const Rounded: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        display: 'grid',
        gap: '16px',
      }}
    >
      <Textarea
        label='None (0px)'
        rounded='none'
        placeholder='모서리 둥글기 없음'
        rows={3}
      />
      <Textarea
        label='XS (4px)'
        rounded='xs'
        placeholder='아주 작은 둥글기'
        rows={3}
      />
      <Textarea
        label='SM (8px)'
        rounded='sm'
        placeholder='작은 둥글기'
        rows={3}
      />
      <Textarea
        label='MD (12px)'
        rounded='md'
        placeholder='중간 둥글기'
        rows={3}
      />
      <Textarea
        label='LG (16px)'
        rounded='lg'
        placeholder='큰 둥글기'
        rows={3}
      />
      <Textarea
        label='XL (24px)'
        rounded='xl'
        placeholder='아주 큰 둥글기'
        rows={3}
      />
      <Textarea
        label='Full (999px)'
        rounded='full'
        placeholder='완전히 둥근 모서리'
        rows={3}
      />
    </div>
  ),
};

/**
 * 상태
 */
export const State: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        display: 'grid',
        gap: '16px',
      }}
    >
      <Textarea label='default' />
      <Textarea label='filled' defaultValue='기본입력값입니다.' />
      <Textarea
        label='error'
        status='error'
        statusMessage='에러 상태입니다'
        rows={3}
      />
      <Textarea disabled label='disabled' rows={3} />
    </div>
  ),
};

/**
 * Label과 Required
 */
export const WithLabel: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        display: 'grid',
        gap: '16px',
      }}
    >
      <Textarea label='자기소개' placeholder='자기소개를 입력하세요' rows={4} />

      <Textarea
        label='자기소개'
        placeholder='자기소개를 입력하세요'
        required
        rows={4}
      />

      <Textarea
        label='자기소개'
        placeholder='자기소개를 입력하세요'
        rows={4}
        hiddenLabel
      />
    </div>
  ),
};

/**
 * 상태 메시지
 * status와 statusMessage를 사용하여 다양한 피드백 제공
 */
export const StatusMessages: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* help */}
      <>
        <Textarea
          label='도움말'
          placeholder='입력하세요'
          status='help'
          statusMessage='도움말 메시지입니다'
          rows={3}
        />

        <Textarea
          label='도움말 (아이콘)'
          placeholder='입력하세요'
          status='help'
          statusMessage='도움말 메시지입니다'
          showStatusIcon
          rows={3}
        />
      </>

      {/* success */}
      <>
        <Textarea
          label='성공'
          placeholder='내용 입력'
          status='success'
          statusMessage='저장되었습니다'
          rows={3}
        />

        <Textarea
          label='성공 (아이콘)'
          placeholder='내용 입력'
          status='success'
          statusMessage='저장되었습니다'
          showStatusIcon
          rows={3}
        />
      </>

      {/* warn */}
      <>
        <Textarea
          label='경고'
          placeholder='내용 입력'
          status='warn'
          statusMessage='권장 글자 수를 초과했습니다'
          rows={3}
        />

        <Textarea
          label='경고 (아이콘)'
          placeholder='내용 입력'
          status='warn'
          statusMessage='권장 글자 수를 초과했습니다'
          showStatusIcon
          rows={3}
        />
      </>

      {/* error */}
      <>
        <Textarea
          label='에러'
          placeholder='내용 입력'
          status='error'
          statusMessage='최소 10자 이상 입력해주세요'
          rows={3}
        />

        <Textarea
          label='에러 (아이콘)'
          placeholder='내용 입력'
          status='error'
          statusMessage='최소 10자 이상 입력해주세요'
          showStatusIcon
          rows={3}
        />
      </>
    </div>
  ),
};

/**
 * 실시간 유효성 검사 예시
 */
export const ValidationExample: Story = {
  render: () => {
    const ValidationComponent = () => {
      const [content, setContent] = useState('');
      const minLength = 10;
      const maxLength = 200;

      const getStatus = () => {
        if (content.length === 0) return 'help';
        if (content.length < minLength) return 'error';
        if (content.length > maxLength * 0.9) return 'warn';
        return 'success';
      };

      const getStatusMessage = () => {
        if (content.length === 0)
          return `최소 ${minLength}자 이상 작성해주세요`;
        if (content.length < minLength)
          return `${minLength - content.length}자 더 입력해주세요`;
        if (content.length > maxLength * 0.9)
          return `${maxLength - content.length}자 남았습니다`;
        return '적절한 길이입니다';
      };

      return (
        <div
          style={{
            width: '600px',
            maxWidth: '100%',
            display: 'grid',
            gap: '16px',
          }}
        >
          <Textarea
            label='내용'
            placeholder={`${minLength}자 이상, ${maxLength}자 이하로 작성해주세요`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={maxLength}
            rows={6}
            full
            required
            status={getStatus()}
            statusMessage={`${getStatusMessage()} (${content.length}/${maxLength})`}
            showStatusIcon
          />
        </div>
      );
    };

    return <ValidationComponent />;
  },
};

/**
 * Auto-grow 기능
 * 텍스트 입력에 따라 자동으로 높이가 조절됩니다
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
            label='최소 1줄 ~ 제한 없음'
            placeholder='입력에 따라 자동으로 늘어납니다'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoGrow
            minRows={1}
          />

          <Textarea
            label='최소 2줄 ~ 최대 5줄'
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
 * 글자수 카운터 - 위치별 예제
 * 4가지 위치 옵션을 모두 보여줍니다
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

/**
 * 글자수 카운터 - 실전 활용 예제
 * maxLength와 상태 메시지를 조합한 실제 사용 사례
 */
export const CharacterCounterPractical: Story = {
  render: () => {
    const PracticalExample = () => {
      const [review, setReview] = useState('');
      const [tweet, setTweet] = useState('');

      const reviewMaxLength = 500;
      const tweetMaxLength = 280;

      const getReviewStatus = () => {
        if (review.length === 0) return 'help';
        if (review.length < 50) return 'error';
        if (review.length > reviewMaxLength * 0.9) return 'warn';
        return 'success';
      };

      const getReviewMessage = () => {
        if (review.length === 0) return '최소 50자 이상 작성해주세요';
        if (review.length < 50)
          return `${50 - review.length}자 더 입력해주세요`;
        if (review.length > reviewMaxLength * 0.9)
          return `${reviewMaxLength - review.length}자 남았습니다`;
        return '적절한 길이입니다';
      };

      const getTweetStatus = () => {
        if (tweet.length > tweetMaxLength * 0.9) return 'warn';
        return 'help';
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '600px',
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 12px 0' }}>
              리뷰 작성 (최소 글자수 + 최대 글자수)
            </h4>
            <Textarea
              label='상품 리뷰'
              placeholder='상품 사용 후기를 자세히 작성해주세요'
              value={review}
              onChange={(e) => setReview(e.target.value)}
              maxLength={reviewMaxLength}
              rows={6}
              required
              showCharacterCount
              characterCountPosition='inside-right'
              status={getReviewStatus()}
              statusMessage={getReviewMessage()}
              showStatusIcon
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0' }}>
              짧은 글 작성 (Twitter 스타일)
            </h4>
            <Textarea
              label='트윗'
              placeholder='무슨 일이 일어나고 있나요?'
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              maxLength={tweetMaxLength}
              autoGrow
              minRows={2}
              maxRows={6}
              showCharacterCount
              characterCountPosition='inside-right'
              status={getTweetStatus()}
              statusMessage={
                tweet.length > tweetMaxLength * 0.9
                  ? '글자수 제한에 가까워지고 있습니다'
                  : undefined
              }
            />
          </div>
        </div>
      );
    };

    return <PracticalExample />;
  },
};
