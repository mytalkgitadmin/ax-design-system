# 컴포넌트 Stories 작성 템플릿

> 새 컴포넌트의 Storybook 문서를 작성할 때 사용하는 표준 템플릿입니다.

---

## 📋 파일 구조

```
ComponentName/
├── index.tsx                    # 컴포넌트 구현
├── types.ts                     # TypeScript 타입 정의
├── ComponentName.css.ts         # Vanilla Extract 스타일
├── ComponentName.stories.tsx    # Storybook 문서 (이 템플릿)
└── utils.ts                     # (선택) 헬퍼 함수
```

---

## 📝 Stories 파일 템플릿

````tsx
import { useState } from 'react';

import { color } from '../../tokens';
import { ICON_NAMES } from '../Icon/types';
import { ComponentName } from './index';
import {
  COMPONENT_VARIANTS,
  COMPONENT_SIZES,
  COMPONENT_COLORS,
  // ... 필요한 타입/상수 import
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * ComponentName은 [목적]을 위한 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type | Required | Default |
 * |------|------|----------|---------|
 * | `variant` | `'solid' \| 'outline' \| 'ghost'` | No | `'solid'` |
 * | `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` |
 * | `color` | `string` | No | `'primary'` |
 * | `disabled` | `boolean` | No | `false` |
 * | `onClick` | `() => void` | No | - |
 *
 * ## 접근성 (Accessibility)
 *
 * - **ARIA**: role="button", aria-label 지원
 * - **키보드**: Tab으로 포커스, Enter/Space로 활성화
 * - **스크린 리더**: 레이블과 상태 안내
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { ComponentName } from '@bemily/design-system';
 *
 * // 기본 사용
 * <ComponentName label="Click me" onClick={handleClick} />
 *
 * // Variant 변경
 * <ComponentName label="Outline" variant="outline" />
 *
 * // 커스텀 색상
 * <ComponentName label="Custom" color="#FF5722" />
 *
 * // 전체 너비
 * <ComponentName label="Full Width" full />
 * ```
 *
 * ## 사용 가이드
 *
 * ✅ **Do**:
 * - 명확한 label 제공
 * - 적절한 variant 선택
 * - 키보드 접근성 확인
 *
 * ❌ **Don't**:
 * - label 없이 사용 (아이콘만 있을 경우 aria-label 필수)
 * - 너무 많은 variant 혼용
 * - 과도한 커스텀 색상 사용
 */
const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],

  argTypes: {
    // ========================================
    // Appearance
    // ========================================
    variant: {
      control: 'select',
      options: COMPONENT_VARIANTS,
      description: 'Component variant (solid, outline, ghost)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: COMPONENT_SIZES,
      description: 'Component size',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: [...COMPONENT_COLORS, color.blue['500'], color.pink['500'], color.indigo['500']],
      description: '시맨틱 프리셋(primary, secondary) 또는 커스텀 컬러',
      table: {
        category: 'Appearance',
      },
    },
    rounded: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
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
      },
    },

    // ========================================
    // Content
    // ========================================
    label: {
      control: 'text',
      description: 'Label text',
      table: {
        category: 'Content',
      },
    },
    children: {
      control: false,
      description: 'Child elements',
      table: {
        category: 'Content',
      },
    },

    // ========================================
    // State
    // ========================================
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        category: 'State',
      },
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
      table: {
        category: 'State',
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state',
      table: {
        category: 'State',
      },
    },

    // ========================================
    // Icon
    // ========================================
    leftIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '왼쪽 아이콘',
      table: {
        category: 'Icon',
      },
    },
    rightIcon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: '오른쪽 아이콘',
      table: {
        category: 'Icon',
      },
    },

    // ========================================
    // HTML Attributes
    // ========================================
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type',
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
    className: {
      control: false,
      table: {
        category: 'HTML Attributes',
      },
    },

    // ========================================
    // Accessibility
    // ========================================
    'aria-label': {
      control: 'text',
      description: '접근성 레이블 (아이콘 전용 버튼 등)',
      table: {
        category: 'Accessibility',
      },
    },

    // ========================================
    // Events
    // ========================================
    onClick: {
      control: false,
      description: '클릭 이벤트 핸들러',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      control: false,
      description: '변경 이벤트 핸들러',
      table: {
        category: 'Events',
      },
    },
  },

  args: {
    // 기본값 설정
    variant: 'solid',
    size: 'md',
    color: 'primary',
    full: false,

    label: 'Label',

    disabled: false,
    loading: false,
    error: false,

    type: 'button',
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// 1. Primary (기본 예시)
// ============================================================
export const Primary: Story = {};

// ============================================================
// 2. Variants (모든 variant 시각화)
// ============================================================
/**
 * 모든 variant를 한눈에 볼 수 있습니다.
 */
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <ComponentName variant='solid' label='Solid' />
      <ComponentName variant='outline' label='Outline' />
      <ComponentName variant='ghost' label='Ghost' />
    </div>
  ),
};

// ============================================================
// 3. Sizes (모든 size 시각화)
// ============================================================
/**
 * 5가지 크기를 제공합니다.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <ComponentName size='xs' label='XS' />
      <ComponentName size='sm' label='SM' />
      <ComponentName size='md' label='MD' />
      <ComponentName size='lg' label='LG' />
      <ComponentName size='xl' label='XL' />
    </div>
  ),
};

// ============================================================
// 4. Colors (시맨틱 컬러)
// ============================================================
/**
 * 시맨틱 컬러 프리셋을 사용합니다.
 */
export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <ComponentName color='primary' label='Primary' />
      <ComponentName color='secondary' label='Secondary' />
      <ComponentName color='tertiary' label='Tertiary' />
    </div>
  ),
};

// ============================================================
// 5. States (상태별 시각화)
// ============================================================
/**
 * 다양한 상태를 확인할 수 있습니다.
 */
export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}
    >
      {/* Variant별 상태 */}
      {COMPONENT_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>{variant}</p>
          <ComponentName variant={variant} label='Default' />
          <ComponentName variant={variant} label='Disabled' disabled />
          <ComponentName variant={variant} label='Loading' loading />
          <ComponentName variant={variant} label='Error' error />
        </div>
      ))}
    </div>
  ),
};

// ============================================================
// 6. Rounded (모서리 둥글기)
// ============================================================
/**
 * 테마 설정을 덮어쓰기하여 모서리 둥글기를 조정할 수 있습니다.
 */
export const Rounded: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <ComponentName rounded='none' label='None (0px)' />
      <ComponentName rounded='xs' label='XS (4px)' />
      <ComponentName rounded='sm' label='SM (8px)' />
      <ComponentName rounded='md' label='MD (12px)' />
      <ComponentName rounded='lg' label='LG (16px)' />
      <ComponentName rounded='xl' label='XL (24px)' />
      <ComponentName rounded='full' label='Full (999px)' />
    </div>
  ),
};

// ============================================================
// 7. With Icons (아이콘 포함)
// ============================================================
/**
 * 아이콘을 포함할 수 있습니다.
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '16px',
      }}
    >
      <ComponentName label='Left Icon' leftIcon='Search' />
      <ComponentName label='Right Icon' rightIcon='Download' />
      <ComponentName label='Both Icons' leftIcon='Search' rightIcon='Download' />
    </div>
  ),
};

// ============================================================
// 8. Full Width
// ============================================================
/**
 * 전체 너비를 차지할 수 있습니다.
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
      <ComponentName label='Full Width' full />
      <ComponentName label='Full Width Outline' variant='outline' full />
      <ComponentName label='Full Width Ghost' variant='ghost' full />
    </div>
  ),
};

// ============================================================
// 9. Interactive (제어 컴포넌트)
// ============================================================
/**
 * 상태를 제어하는 인터랙티브 예시입니다.
 */
export const Interactive: Story = {
  render: () => {
    const InteractiveComponent = () => {
      const [value, setValue] = useState('');
      const [loading, setLoading] = useState(false);

      const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setValue('Completed!');
        }, 2000);
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ComponentName
            label={loading ? 'Loading...' : 'Click me'}
            onClick={handleClick}
            loading={loading}
          />
          {value && <p>Result: {value}</p>}
        </div>
      );
    };

    return <InteractiveComponent />;
  },
};

// ============================================================
// 10. Real World Example (실전 예시)
// ============================================================
/**
 * 실제 프로젝트에서 사용할 수 있는 예시입니다.
 */
export const RealWorldExample: Story = {
  render: () => {
    const ExampleComponent = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [error, setError] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        // 시뮬레이션: API 호출
        setTimeout(() => {
          if (!formData.name || !formData.email) {
            setError('모든 필드를 입력해주세요');
          } else {
            alert(`제출 완료: ${formData.name} (${formData.email})`);
          }
          setIsSubmitting(false);
        }, 1500);
      };

      return (
        <div
          style={{
            width: '400px',
            padding: '24px',
            border: '1px solid #e3e6ee',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0' }}>회원가입</h3>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* 여기에 Input 등 다른 컴포넌트 조합 */}

            {error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>}

            <ComponentName
              type='submit'
              label={isSubmitting ? '처리 중...' : '가입하기'}
              loading={isSubmitting}
              full
            />
          </form>
        </div>
      );
    };

    return <ExampleComponent />;
  },
};
````

---

## 🎯 Story 작성 가이드

### 필수 Stories (최소 6개)

1. **Primary**: 기본 예시
2. **Variants**: 모든 variant 시각화
3. **Sizes**: 모든 size 시각화
4. **States**: 상태별 시각화 (default, disabled, loading, error)
5. **Interactive**: 제어 컴포넌트 예시
6. **RealWorldExample**: 실제 사용 시나리오

### 권장 추가 Stories

- **Rounded**: 모서리 둥글기 옵션
- **WithIcons**: 아이콘 조합
- **FullWidth**: 전체 너비
- **Colors**: 시맨틱 컬러
- **CustomColor**: 커스텀 컬러
- **Accessibility**: 접근성 데모

---

## 💡 작성 팁

### JSDoc 주석

- 컴포넌트 목적 명확히
- Props 테이블 포함
- 접근성 가이드 추가
- Do's and Don'ts 명시

### argTypes 카테고리

일관된 순서 유지:

1. Appearance
2. Content
3. State
4. Icon
5. HTML Attributes
6. Accessibility
7. Events

### Story 순서

중요도 순으로 배치:

1. Primary (가장 먼저)
2. 기본 옵션 (Variants, Sizes, Colors)
3. 고급 옵션 (States, Rounded, Icons)
4. 인터랙티브
5. 실전 예시 (마지막)

### 스타일

- inline style 사용 (Storybook 호환성)
- gap, flexbox, grid 활용
- 일관된 spacing (8px 배수)

---

## 📚 참고 자료

- **Gold Standard 예시**:
  - `src/stories/Button/Button.stories.tsx`
  - `src/stories/Avatar/Avatar.stories.tsx`
  - `src/stories/Input/Input.stories.tsx`

- **체크리스트**: `docs/COMPONENT_CHECKLIST.md`
- **개발 가이드**: `docs/COMPONENT_DEVELOPMENT_GUIDE.md`
