import { useState } from 'react';

import { color } from '../../tokens';
import { ICON_NAMES } from '../Icon/types';
import { Input } from './index';
import {
  INPUT_COLOR_PRESETS,
  INPUT_ROUNDED,
  INPUT_SIZES,
  INPUT_TYPES,
  INPUT_VARIANTS,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Input 컴포넌트는 사용자로부터 텍스트 입력을 받는 기본 입력 필드입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `label` | `string` (required) |
 * | `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `type` | `text` \| `password` \| `email` \| `tel` \| `number` |
 * | `color` | `primary` \| `secondary` \| `string` (hex/rgb) |
 * | `rounded` | `none` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` |
 * | `full` | `boolean` |
 * | `disabled` | `boolean` |
 * | `required` | `boolean` |
 * | `placeholder` | `string` |
 * | `hiddenLabel` | `boolean` |
 * | `leftIcon` | `IconType` |
 * | `rightIcon` | `IconType` |
 * | `onLeftIconClick` | `() => void` |
 * | `onRightIconClick` | `() => void` |
 * | `status` | `help` \| `success` \| `warn` \| `error` |
 * | `statusMessage` | `string` |
 * | `showStatusIcon` | `boolean` |
 * | `value` | `string` \| `number` |
 * | `onChange` | `(e: ChangeEvent<HTMLInputElement>) => void` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Input } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Input label="이름" placeholder="이름을 입력하세요" />
 *
 * // 다양한 타입
 * <Input label="이메일" type="email" placeholder="email@example.com" />
 * <Input label="비밀번호" type="password" />
 * <Input label="전화번호" type="tel" />
 *
 * // 상태 메시지
 * <Input label="이메일" status="error" statusMessage="유효하지 않은 이메일입니다" />
 * <Input label="이름" status="success" statusMessage="사용 가능합니다" showStatusIcon />
 *
 * // 아이콘 포함
 * <Input label="검색" leftIcon="Search" placeholder="검색어 입력" />
 * <Input label="비밀번호" type="password" rightIcon="Eye" onRightIconClick={togglePassword} />
 *
 * // 전체 너비
 * <Input label="주소" full placeholder="주소를 입력하세요" />
 * ```
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: INPUT_SIZES,
      description: 'Input size',
      table: {
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: [
        ...INPUT_COLOR_PRESETS,
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
    variant: {
      control: 'select',
      options: INPUT_VARIANTS,
      description:
        'Input variant (outline: 전체 테두리, underline: 하단 테두리만)',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: INPUT_ROUNDED,
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
    onLeftIconClick: {
      control: false,
      description: '왼쪽 아이콘 클릭 핸들러',
      table: { category: 'Icon' },
    },
    onRightIconClick: {
      control: false,
      description: '오른쪽 아이콘 클릭 핸들러',
      table: { category: 'Icon' },
    },

    // Validation
    min: {
      control: 'number',
      description: 'Minimum value (type="number"일 때)',
      table: {
        category: 'Validation',
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value (type="number"일 때)',
      table: {
        category: 'Validation',
      },
    },

    // HTML Attributes
    type: {
      control: 'select',
      options: INPUT_TYPES,
      description: 'Input type',
      table: {
        category: 'HTML Attributes',
      },
    },
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
    textAlign: {
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
    variant: 'outline',
    full: false,

    label: '레이블',
    placeholder: '텍스트를 입력해 주세요',
    hiddenLabel: false,

    disabled: false,
    error: false,
    required: false,

    type: 'text',
    textAlign: 'left',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

/**
 * Input 사이즈
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Input label='XS' size='xs' />
      <Input label='SM' size='sm' />
      <Input label='MD' size='md' />
      <Input label='LG' size='lg' />
      <Input label='XL' size='xl' />
    </div>
  ),
};

/**
 * Variants
 * Outline (기본): 전체 테두리
 * Underline: 하단 테두리만
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <Input
        label='Outline (기본)'
        variant='outline'
        placeholder='전체 테두리가 있는 입력 필드'
      />
      <Input
        label='Underline'
        variant='underline'
        placeholder='하단 테두리만 있는 입력 필드'
      />
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
        display: 'grid',
        gap: '16px',
      }}
    >
      <Input
        label='None (0px)'
        rounded='none'
        placeholder='모서리 둥글기 없음'
      />
      <Input label='XS (4px)' rounded='xs' placeholder='아주 작은 둥글기' />
      <Input label='SM (8px)' rounded='sm' placeholder='작은 둥글기' />
      <Input label='MD (12px)' rounded='md' placeholder='중간 둥글기' />
      <Input label='LG (16px)' rounded='lg' placeholder='큰 둥글기' />
      <Input label='XL (24px)' rounded='xl' placeholder='아주 큰 둥글기' />
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
        display: 'grid',
        gap: '16px',
      }}
    >
      <Input label='default' />
      <Input label='filled' defaultValue='기본입력값' />
      <Input label='error' status='error' statusMessage='에러 상태입니다' />
      <Input disabled label='disabled' />
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
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input label='이름' placeholder='이름을 입력하세요' />
      <Input
        label='이메일'
        type='email'
        placeholder='email@example.com'
        required
      />
      <Input label='비밀번호' />
    </div>
  ),
};
/**
 * Full Width Input
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
      <Input label='Full Width' placeholder='Full Width Primary' full />
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
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}
    >
      {/* help */}
      <>
        <Input
          label='도움말'
          placeholder='입력하세요'
          status='help'
          statusMessage='도움말 메시지입니다'
        />

        <Input
          label='도움말 (아이콘)'
          placeholder='입력하세요'
          status='help'
          statusMessage='도움말 메시지입니다'
          showStatusIcon
        />
      </>

      {/* success */}
      <>
        <Input
          label='성공'
          type='password'
          placeholder='비밀번호 입력'
          status='success'
          statusMessage='사용 가능한 비밀번호입니다'
        />

        <Input
          label='성공 (아이콘)'
          type='password'
          placeholder='비밀번호 입력'
          status='success'
          statusMessage='사용 가능한 비밀번호입니다'
          showStatusIcon
        />
      </>

      {/* warn */}
      <>
        <Input
          label='경고'
          type='password'
          placeholder='비밀번호 입력'
          status='warn'
          statusMessage='비밀번호 강도가 약합니다'
        />

        <Input
          label='경고 (아이콘)'
          type='password'
          placeholder='비밀번호 입력'
          status='warn'
          statusMessage='비밀번호 강도가 약합니다'
          showStatusIcon
        />
      </>

      {/* error */}
      <>
        <Input
          label='에러'
          type='password'
          placeholder='비밀번호 입력'
          status='error'
          statusMessage='비밀번호는 최소 8자 이상이어야 합니다'
        />

        <Input
          label='에러 (아이콘)'
          type='password'
          placeholder='비밀번호 입력'
          status='error'
          statusMessage='비밀번호는 최소 8자 이상이어야 합니다'
          showStatusIcon
        />
      </>
    </div>
  ),
};

/**
 * 아이콘이 있는 Input
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input
        label='이메일'
        type='email'
        placeholder='email@example.com'
        leftIcon='Download'
      />
      <Input
        label='전화번호'
        type='tel'
        placeholder='010-1234-5678'
        leftIcon='Download'
      />
      <Input
        label='URL'
        type='text'
        placeholder='https://example.com'
        rightIcon='Download'
      />
    </div>
  ),
};

/**
 * Search Input with Auto Clear Button
 * search 타입 input은 자동으로 CircleXDuoFilled 아이콘의 clear 버튼이 표시됩니다.
 * 값이 있을 때만 버튼이 나타나며, 클릭 시 input이 초기화됩니다.
 */
export const SearchInput: Story = {
  render: () => {
    const SearchExample = () => {
      const [searchValue, setSearchValue] = useState('');

      const handleSearch = () => {
        alert(`입력된 검색어: ${searchValue}`);
      };

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '400px',
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Controlled Search Input (Left Icon)
            </h4>
            <Input
              label='검색'
              type='search'
              placeholder='검색어를 입력하세요'
              leftIcon='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              full
              status='help'
              statusMessage='텍스트 입력 시 자동으로 clear 버튼이 나타납니다'
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              현재 값: "{searchValue}"
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Interactive Search Input (Right Icon)
            </h4>
            <Input
              label='검색 (Enter or Click)'
              type='search'
              placeholder='검색어 입력 후 Enter 또는 아이콘 클릭'
              rightIcon='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onRightIconClick={handleSearch}
              full
              status='help'
              statusMessage='엔터키를 누르거나 돋보기를 클릭하면 알림이 뜹니다'
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Uncontrolled Search Input
            </h4>
            <Input
              label='검색 (Uncontrolled)'
              type='search'
              placeholder='검색어를 입력하세요'
              leftIcon='Search'
              defaultValue=''
              full
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Search Input with Initial Value
            </h4>
            <Input
              label='검색 (초기값 있음)'
              type='search'
              placeholder='검색어를 입력하세요'
              leftIcon='Search'
              defaultValue='React'
              full
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Disabled Search Input
            </h4>
            <Input
              label='검색 (비활성화)'
              type='search'
              placeholder='검색어를 입력하세요'
              leftIcon='Search'
              defaultValue='disabled 상태에서는 clear 버튼이 나타나지 않습니다'
              disabled
              full
            />
          </div>
        </div>
      );
    };

    return <SearchExample />;
  },
};

/**
 * 비밀번호 토글 예시
 */
export const PasswordToggle: Story = {
  render: () => {
    const PasswordInput = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [count, setCount] = useState(0);

      return (
        <div
          style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Input
            label='비밀번호'
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호를 입력하세요'
            rightIcon={showPassword ? 'User' : 'UserFilled'}
            onRightIconClick={() => setShowPassword(!showPassword)}
            status='help'
            statusMessage='아이콘을 클릭하여 비밀번호를 표시/숨김할 수 있습니다'
          />

          <Input
            label='수량'
            type='number'
            placeholder='0'
            leftIcon='Minus'
            rightIcon='Plus'
            value={count}
            min={0}
            max={100}
            textAlign='center'
            onLeftIconClick={() => setCount((prev) => Math.max(0, prev - 1))}
            onRightIconClick={() => setCount((prev) => Math.min(100, prev + 1))}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              setCount(Math.max(0, Math.min(100, value)));
            }}
            status='help'
            statusMessage='좌우 아이콘을 클릭하여 수량을 조절할 수 있습니다 (0-100)'
          />
        </div>
      );
    };

    return <PasswordInput />;
  },
};

/**
 * 종합 예제 - 회원가입 폼
 */
export const SignupForm: Story = {
  render: () => {
    const SignupFormComponent = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <Input
            label='이름'
            placeholder='홍길동'
            required
            full
            status='help'
            statusMessage='실명을 입력해주세요'
          />
          <Input
            label='이메일'
            type='email'
            placeholder='email@example.com'
            leftIcon='Download'
            required
            full
            status='help'
            statusMessage='로그인 시 사용할 이메일 주소입니다'
          />
          <Input
            label='비밀번호'
            type={showPassword ? 'text' : 'password'}
            placeholder='비밀번호 입력'
            rightIcon={showPassword ? 'User' : 'UserFilled'}
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
            full
            status='help'
            statusMessage='8자 이상, 영문/숫자/특수문자 조합'
          />
          <Input
            label='비밀번호 확인'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='비밀번호 재입력'
            rightIcon={showConfirmPassword ? 'User' : 'UserFilled'}
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            required
            full
            status='error'
            statusMessage='비밀번호가 일치하지 않습니다'
          />
          <Input
            label='전화번호'
            type='tel'
            placeholder='010-1234-5678'
            leftIcon='Download'
            full
          />
          <Input
            label='검색어'
            type='search'
            placeholder='검색어를 입력해주세요'
            leftIcon='Search'
            full
          />
        </div>
      );
    };

    return <SignupFormComponent />;
  },
};
