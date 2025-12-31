import { ReactNode } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { useTheme } from '../../theme';
import { FormLabel } from './FormLabel';

import type { Meta, StoryObj } from '@storybook/react';

import { formFieldVars } from './FormField.css';

/**
 * FormLabel을 위한 CSS 변수 래퍼
 * 단독으로 사용할 때 필요한 테마 값들을 주입합니다
 */
const FormLabelWrapper = ({ children }: { children: ReactNode }) => {
  const { global, components } = useTheme();
  const fieldTheme = components.Input;

  // Label 폰트 크기 계산
  const defaultLabelFontSize = {
    xs: global.typography.fontSize.sm,
    sm: global.typography.fontSize.sm,
    md: global.typography.fontSize.md,
    lg: global.typography.fontSize.lg,
    xl: global.typography.fontSize.lg,
  };
  const finalLabelFontSize = fieldTheme.labelFontSize ?? defaultLabelFontSize;

  // CSS 변수 주입
  const vars = assignInlineVars({
    [formFieldVars.labelColor]: global.color.text.tertiary,
    [formFieldVars.helperTextColor]: global.color.text.muted,
    [formFieldVars.successTextColor]: global.color.text.positive,
    [formFieldVars.errorTextColor]: global.color.text.negative,
    [formFieldVars.warnTextColor]: global.color.text.warning,
    [formFieldVars.fontFamily]: global.typography.fontFamily,
    [formFieldVars.labelFontSizeXs]: `${finalLabelFontSize.xs}px`,
    [formFieldVars.labelFontSizeSm]: `${finalLabelFontSize.sm}px`,
    [formFieldVars.labelFontSizeMd]: `${finalLabelFontSize.md}px`,
    [formFieldVars.labelFontSizeLg]: `${finalLabelFontSize.lg}px`,
    [formFieldVars.labelFontSizeXl]: `${finalLabelFontSize.xl}px`,
  });

  return <div style={{ ...vars }}>{children}</div>;
};

/**
 * FormLabel 컴포넌트는 Input, Textarea 등 폼 요소의 레이블을 표시하는 공통 컴포넌트입니다.
 *
 * ## 주요 기능
 * - **크기**: xs, sm, md, lg, xl - 폰트 크기 자동 조정
 * - **필수 표시**: required prop으로 별표(*) 자동 추가
 * - **접근성**: hiddenLabel로 시각적으로 숨기고 스크린 리더만 읽도록 설정
 * - **연결**: htmlFor로 입력 필드와 자동 연결
 *
 * ## 사용 예시
 * ```tsx
 * // 기본 사용
 * <FormLabel htmlFor="email">이메일</FormLabel>
 *
 * // 필수 입력 표시
 * <FormLabel htmlFor="password" required>비밀번호</FormLabel>
 *
 * // 접근성을 위한 숨김 레이블
 * <FormLabel htmlFor="search" hiddenLabel>검색</FormLabel>
 *
 * // 크기 지정
 * <FormLabel htmlFor="name" size="lg">이름</FormLabel>
 * ```
 */
const meta = {
  title: 'Components/FormField/FormLabel',
  component: FormLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Appearance
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Label 크기',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },

    // Content
    children: {
      control: 'text',
      description: 'Label 텍스트',
      table: {
        category: 'Content',
      },
    },
    hiddenLabel: {
      control: 'boolean',
      description: '시각적으로 숨김 (스크린 리더 전용)',
      table: {
        category: 'Content',
        defaultValue: { summary: 'false' },
      },
    },

    // State
    required: {
      control: 'boolean',
      description: '필수 입력 표시 (별표 표시)',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },

    // HTML Attributes
    htmlFor: {
      control: false,
      description: '연결할 입력 필드의 ID',
      table: {
        category: 'HTML Attributes',
      },
    },
    className: {
      control: false,
      description: '추가 CSS 클래스',
      table: {
        category: 'HTML Attributes',
      },
    },
  },

  args: {
    size: 'md',

    children: '레이블',
    hiddenLabel: false,

    required: false,

    htmlFor: 'example-input',
  },
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 FormLabel
 * 스토리북 컨트롤을 사용해서 props를 변경해보세요!
 */
export const Primary: Story = {
  render: (args) => (
    <FormLabelWrapper>
      <FormLabel {...args} />
    </FormLabelWrapper>
  ),
  args: {
    size: 'md',
    required: false,
    hiddenLabel: false,
    htmlFor: 'example-input',
    children: '레이블',
  },
};

/**
 * 다양한 크기의 FormLabel
 * 필수 입력 표시
 * required prop을 사용하면 별표(*)가 자동으로 추가됩니다
 */
export const Sizes: Story = {
  render: () => (
    <FormLabelWrapper>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 1fr',
          gap: '16px',
          fontSize: '12px',
          placeItems: 'center left',
        }}
      >
        <p></p>
        <p>기본값</p>
        <p>필수값</p>
        XS
        <FormLabel size='xs' htmlFor='input-xs' children='레이블' />
        <FormLabel size='xs' htmlFor='input-xs' children='레이블' required />
        SM
        <FormLabel size='sm' htmlFor='input-sm' children='레이블' />
        <FormLabel size='sm' htmlFor='input-sm' children='레이블' required />
        MD
        <FormLabel size='md' htmlFor='input-md' children='레이블' />
        <FormLabel size='md' htmlFor='input-md' children='레이블' required />
        LG
        <FormLabel size='lg' htmlFor='input-lg' children='레이블' />
        <FormLabel size='lg' htmlFor='input-lg' children='레이블' required />
        XL
        <FormLabel size='xl' htmlFor='input-xl' children='레이블' />
        <FormLabel size='xl' htmlFor='input-xl' children='레이블' required />
      </div>
    </FormLabelWrapper>
  ),
};
