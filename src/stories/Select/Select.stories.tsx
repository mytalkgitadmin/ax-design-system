import { useState } from 'react';

import { color } from '../../tokens';
import { ICON_NAMES } from '../Icon/types';
import { Select } from './index';
import {
  SELECT_COLOR_PRESETS,
  SELECT_PLACEMENTS,
  SELECT_ROUNDED,
  SELECT_SIZES,
  SelectOption,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Select 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있는 드롭다운 선택 필드입니다.
 *
 * ## 주요 기능
 * - **크기**: xs, sm, md, lg, xl (Label 폰트 크기도 자동 조정)
 * - **rounded**: none, xs, sm, md, lg, xl, full (기본값: sm)
 * - **컬러**: 시맨틱 프리셋(primary, secondary) 및 커스텀 hex/rgb
 * - **상태**: hover, focus, disabled, error 자동 처리
 * - **레이아웃**: full width 옵션
 *
 * ## Label & 접근성
 * - **label**: 접근성을 위해 제공 권장
 * - **required**: 필수 입력 표시 (*)
 * - **hiddenLabel**: 시각적으로 숨기고 스크린 리더만 읽음
 *
 * ## 아이콘
 * - **leadingIcon**: 왼쪽 아이콘 표시
 * - **trailingIcon**: 오른쪽 아이콘 표시 (caret 이전)
 * - **showCaret**: caret 아이콘 표시 여부 (기본: true)
 *
 * ## 드롭다운
 * - **placement**: 드롭다운 위치 (bottom, top) - 기본값: bottom
 * - **options**: 옵션 목록 (value, label, disabled, icon, thumbnail)
 *
 * ## 상태 메시지
 * ```tsx
 * <Select label="옵션" options={options} status="help" statusMessage="도움말 메시지" />
 * <Select label="옵션" options={options} status="success" statusMessage="성공 메시지" />
 * <Select label="옵션" options={options} status="warn" statusMessage="경고 메시지" />
 * <Select label="옵션" options={options} status="error" statusMessage="에러 메시지" />
 *
 * // 아이콘 표시
 * <Select label="옵션" options={options} status="success" statusMessage="성공!" showStatusIcon />
 * ```
 *
 * ## 컬러 사용법
 * ```tsx
 * // 시맨틱 프리셋
 * <Select label="옵션" options={options} color="primary" />
 * <Select label="옵션" options={options} color="secondary" />
 *
 * // 커스텀 컬러
 * <Select label="옵션" options={options} color="#8facff" />
 * <Select label="옵션" options={options} color="rgb(143, 172, 255)" />
 * ```
 *
 * ## Rounded 사용법
 * ```tsx
 * // 기본값 사용 (sm = 8px)
 * <Select label="옵션" options={options} />
 *
 * // rounded prop으로 덮어쓰기
 * <Select label="옵션" options={options} rounded="full" />  // 완전히 둥근 모서리
 * <Select label="옵션" options={options} rounded="none" />  // 모서리 둥글기 없음
 * ```
 */
const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: SELECT_SIZES,
      description: 'Select size',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: [
        ...SELECT_COLOR_PRESETS,
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
      options: SELECT_ROUNDED,
      description: 'Border radius (테마 설정 덮어쓰기)',
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
    text: {
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
    showLabel: {
      control: 'boolean',
      description: 'Label 표시 여부',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      description: '설명 텍스트',
      table: {
        category: 'Content',
      },
    },
    showDescription: {
      control: 'boolean',
      description: '설명 텍스트 표시 여부',
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

    // Icon
    leadingIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '왼쪽 아이콘',
      table: { category: 'Icon' },
    },
    trailingIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '오른쪽 아이콘 (caret 이전)',
      table: { category: 'Icon' },
    },
    showCaret: {
      control: 'boolean',
      description: 'Caret 아이콘 표시 여부',
      table: { category: 'Icon' },
    },

    // Dropdown
    placement: {
      control: 'select',
      options: SELECT_PLACEMENTS,
      description: '드롭다운 위치 (bottom, top)',
      table: {
        category: 'Dropdown',
      },
    },
    expanded: {
      control: 'boolean',
      description: '드롭다운 열림/닫힘 상태 (제어 컴포넌트)',
      table: {
        category: 'Dropdown',
      },
    },
    options: {
      control: false,
      description: '옵션 목록',
      table: {
        category: 'Dropdown',
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
    onToggle: {
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

    label: '레이블',
    text: '옵션을 선택해 주세요',
    showLabel: true,
    hiddenLabel: false,

    disabled: false,
    error: false,
    required: false,

    showCaret: true,
    // placement: 기본값 없음 (자동 계산)
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const productOptions: SelectOption[] = [
  { value: '1', label: '[옵션1] Product1. AB' },
  { value: '2', label: '[옵션1] Product2. CD' },
  { value: '3', label: '[옵션1] Product3. EF' },
  { value: '4', label: '[옵션1] Product4. GH' },
];

export const Primary: Story = {
  args: {
    options: productOptions,
  },
};

/**
 * Select 사이즈
 */
export const Sizes: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Select label='XS' size='xs' options={productOptions} />
      <Select label='SM' size='sm' options={productOptions} />
      <Select label='MD' size='md' options={productOptions} />
      <Select label='LG' size='lg' options={productOptions} />
      <Select label='XL' size='xl' options={productOptions} />
    </div>
  ),
};

/**
 * Rounded (모서리 둥글기)
 * 테마 설정을 덮어쓰기하여 원하는 모서리 둥글기를 적용할 수 있습니다.
 */
export const Rounded: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Select
        label='None (0px)'
        rounded='none'
        text='모서리 둥글기 없음'
        options={productOptions}
      />
      <Select
        label='XS (4px)'
        rounded='xs'
        text='아주 작은 둥글기'
        options={productOptions}
      />
      <Select
        label='SM (8px)'
        rounded='sm'
        text='작은 둥글기'
        options={productOptions}
      />
      <Select
        label='MD (12px)'
        rounded='md'
        text='중간 둥글기'
        options={productOptions}
      />
      <Select
        label='LG (16px)'
        rounded='lg'
        text='큰 둥글기'
        options={productOptions}
      />
      <Select
        label='XL (24px)'
        rounded='xl'
        text='아주 큰 둥글기'
        options={productOptions}
      />
      <Select
        label='Full (999px)'
        rounded='full'
        text='완전히 둥근 모서리'
        options={productOptions}
      />
    </div>
  ),
};

/**
 * 상태
 */
export const State: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Select label='default' options={productOptions} />
      <Select label='filled' defaultValue='2' options={productOptions} />
      <Select
        label='error'
        status='error'
        statusMessage='에러 상태입니다'
        options={productOptions}
      />
      <Select disabled label='disabled' options={productOptions} />
    </div>
  ),
};

/**
 * 컬러 (Color Variants)
 * 시맨틱 프리셋 또는 커스텀 컬러를 사용할 수 있습니다.
 */
export const ColorVariants: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Select
        label='Primary (기본)'
        color='primary'
        options={productOptions}
        text='Primary 컬러'
      />
      <Select
        label='Secondary'
        color='secondary'
        options={productOptions}
        text='Secondary 컬러'
      />
      <Select
        label='커스텀 블루'
        color={color.blue['500']}
        options={productOptions}
        text='커스텀 블루 컬러'
      />
      <Select
        label='커스텀 핑크'
        color={color.pink['500']}
        options={productOptions}
        text='커스텀 핑크 컬러'
      />
      <Select
        label='커스텀 그린'
        color={color.green['600']}
        options={productOptions}
        text='커스텀 그린 컬러'
      />
    </div>
  ),
};

/**
 * Label과 Required
 */
export const WithLabel: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Select label='카테고리' options={productOptions} />
      <Select label='옵션' options={productOptions} required />
      <Select label='타입' options={productOptions} />
    </div>
  ),
};

/**
 * Full Width Select
 */
export const FullWidth: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Select label='Full Width' options={productOptions} full />
    </div>
  ),
};

/**
 * 상태 메시지
 * status와 statusMessage를 사용하여 다양한 피드백 제공
 */
export const StatusMessages: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}
    >
      {/* help */}
      <>
        <Select
          label='도움말'
          options={productOptions}
          status='help'
          statusMessage='도움말 메시지입니다'
        />

        <Select
          label='도움말 (아이콘)'
          options={productOptions}
          status='help'
          statusMessage='도움말 메시지입니다'
          showStatusIcon
        />
      </>

      {/* success */}
      <>
        <Select
          label='성공'
          options={productOptions}
          status='success'
          statusMessage='올바르게 선택되었습니다'
        />

        <Select
          label='성공 (아이콘)'
          options={productOptions}
          status='success'
          statusMessage='올바르게 선택되었습니다'
          showStatusIcon
        />
      </>

      {/* warn */}
      <>
        <Select
          label='경고'
          options={productOptions}
          status='warn'
          statusMessage='이 옵션은 권장하지 않습니다'
        />

        <Select
          label='경고 (아이콘)'
          options={productOptions}
          status='warn'
          statusMessage='이 옵션은 권장하지 않습니다'
          showStatusIcon
        />
      </>

      {/* error */}
      <>
        <Select
          label='에러'
          options={productOptions}
          status='error'
          statusMessage='필수 항목입니다'
        />

        <Select
          label='에러 (아이콘)'
          options={productOptions}
          status='error'
          statusMessage='필수 항목입니다'
          showStatusIcon
        />
      </>
    </div>
  ),
};

/**
 * 아이콘이 있는 Select
 */
export const WithIcons: Story = {
  args: {
    options: productOptions,
  },
  render: () => {
    const iconOptions: SelectOption[] = [
      { value: '1', label: '사용자', icon: 'User' },
      { value: '2', label: '검색', icon: 'Search' },
      { value: '3', label: '다운로드', icon: 'Download' },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '300px',
        }}
      >
        <Select
          label='Leading Icon'
          leadingIcon='Search'
          options={productOptions}
        />
        <Select
          label='Trailing Icon'
          trailingIcon='User'
          options={productOptions}
        />
        <Select
          label='Both Icons'
          leadingIcon='Search'
          trailingIcon='User'
          options={productOptions}
        />
        <Select
          label='Option Icons'
          options={iconOptions}
          text='아이콘이 있는 옵션'
        />
        <Select
          label='No Caret'
          showCaret={false}
          options={productOptions}
          text='Caret 없음'
        />
      </div>
    );
  },
};

/**
 * Placement (드롭다운 위치)
 */
export const Placement: Story = {
  args: {
    options: productOptions,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '200px',
        padding: '100px 0',
      }}
    >
      <Select
        label='Bottom Placement (기본)'
        placement='bottom'
        options={productOptions}
      />
      <Select label='Top Placement' placement='top' options={productOptions} />
    </div>
  ),
};

/**
 * 제어 컴포넌트 예시
 */
export const ControlledComponent: Story = {
  args: {
    options: productOptions,
  },
  render: () => {
    const ControlledSelect = () => {
      const [value, setValue] = useState<string | number>('');
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Select
            label='제어 컴포넌트'
            value={value}
            expanded={isOpen}
            options={productOptions}
            onChange={(newValue) => setValue(newValue)}
            onToggle={(open) => setIsOpen(open)}
            status='help'
            statusMessage={`선택된 값: ${value || '없음'}, 드롭다운: ${isOpen ? '열림' : '닫힘'}`}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setValue('2')}>옵션 2 선택</button>
            <button onClick={() => setValue('')}>초기화</button>
            <button onClick={() => setIsOpen(!isOpen)}>토글</button>
          </div>
        </div>
      );
    };

    return <ControlledSelect />;
  },
};

/**
 * 비활성화된 옵션
 */
export const DisabledOptions: Story = {
  args: {
    options: productOptions,
  },
  render: () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: '1', label: '옵션 1 (활성)' },
      { value: '2', label: '옵션 2 (비활성)', disabled: true },
      { value: '3', label: '옵션 3 (활성)' },
      { value: '4', label: '옵션 4 (비활성)', disabled: true },
      { value: '5', label: '옵션 5 (활성)' },
    ];

    return (
      <div
        style={{
          width: '300px',
        }}
      >
        <Select
          label='일부 옵션 비활성화'
          options={optionsWithDisabled}
          status='help'
          statusMessage='비활성화된 옵션은 선택할 수 없습니다'
        />
      </div>
    );
  },
};

/**
 * 종합 예제 - 회원가입 폼
 */
export const SignupForm: Story = {
  args: {
    options: productOptions,
  },
  render: () => {
    const SignupFormComponent = () => {
      const countryOptions: SelectOption[] = [
        { value: 'kr', label: '대한민국' },
        { value: 'us', label: '미국' },
        { value: 'jp', label: '일본' },
        { value: 'cn', label: '중국' },
      ];

      const genderOptions: SelectOption[] = [
        { value: 'male', label: '남성' },
        { value: 'female', label: '여성' },
        { value: 'other', label: '기타' },
      ];

      const jobOptions: SelectOption[] = [
        { value: 'dev', label: '개발자', icon: 'User' },
        { value: 'designer', label: '디자이너', icon: 'User' },
        { value: 'pm', label: '프로젝트 매니저', icon: 'User' },
        { value: 'other', label: '기타', icon: 'User' },
      ];

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '400px',
            padding: '24px',
            border: '1px solid #e3e6ee',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>회원가입</h3>

          <Select
            label='국가'
            options={countryOptions}
            required
            full
            status='help'
            statusMessage='거주 국가를 선택해주세요'
            leadingIcon='Download'
          />

          <Select
            label='성별'
            options={genderOptions}
            required
            full
            status='help'
            statusMessage='성별을 선택해주세요'
          />

          <Select
            label='직업'
            options={jobOptions}
            required
            full
            status='help'
            statusMessage='현재 직업을 선택해주세요'
          />

          <Select
            label='관심 분야'
            options={productOptions}
            full
            status='error'
            statusMessage='필수 항목입니다'
          />
        </div>
      );
    };

    return <SignupFormComponent />;
  },
};

/**
 * 썸네일이 포함된 옵션
 */
export const WithThumbnails: Story = {
  args: {
    options: productOptions,
  },
  render: () => {
    const productOptionsWithThumbnails: SelectOption[] = [
      {
        value: '1',
        label: '[옵션1] Product1',
        thumbnail: '',
        disabled: true,
      },
      {
        value: '2',
        label: '[옵션2] Product2',
        thumbnail: '',
      },
      {
        value: '3',
        label: '[옵션3] Product3',
        thumbnail: '',
      },
      {
        value: '4',
        label: '[옵션4] Product4',
        thumbnail: '',
      },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gap: '16px',
          width: '400px',
          height: '600px',
        }}
      >
        <Select
          label='제품 선택'
          text='옵션을 선택해 주세요'
          options={productOptionsWithThumbnails}
        />
      </div>
    );
  },
};
