import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

/**
 * Button 컴포넌트는 사용자 액션을 트리거하는 기본 버튼입니다.
 *
 * ## 주요 기능
 * - 2가지 variant (solid, outline)
 * - 4가지 사이즈 (xs, sm, md, lg)
 * - Tabler 아이콘 지원
 * - 디자인 토큰 기반 색상 시스템
 * - 전체 너비 옵션
 *
 * ## 사용법
 * ```tsx
 * import Button from './Button';
 *
 * function MyComponent() {
 *   return <Button label="Click me" color="primary" />;
 * }
 * ```
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'color',
    },
    leftIcon: {
      control: 'select',
      options: [
        undefined,
        'tabler:check',
        'tabler:plus',
        'tabler:search',
        'tabler:user',
        'tabler:home',
      ],
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    full: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'solid',
    color: '#007bff',
    size: 'md',
    label: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    color: '#007bff',
    size: 'md',
    label: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'solid',
    color: '#007bff',
    size: 'md',
    label: 'Search',
    leftIcon: 'tabler:search',
  },
};

export const Sizes: Story = {
  args: {
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="solid" color="#007bff" size="xs" label="Extra Small" />
      <Button variant="solid" color="#007bff" size="sm" label="Small" />
      <Button variant="solid" color="#007bff" size="md" label="Medium" />
      <Button variant="solid" color="#007bff" size="lg" label="Large" />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="solid" color="#007bff" size="md" label="Primary" />
        <Button variant="solid" color="#28a745" size="md" label="Success" />
        <Button variant="solid" color="#dc3545" size="md" label="Danger" />
        <Button variant="solid" color="#ffc107" size="md" label="Warning" />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button variant="outline" color="#007bff" size="md" label="Primary" />
        <Button variant="outline" color="#28a745" size="md" label="Success" />
        <Button variant="outline" color="#dc3545" size="md" label="Danger" />
        <Button variant="outline" color="#ffc107" size="md" label="Warning" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'solid',
    color: '#007bff',
    size: 'md',
    label: 'Disabled Button',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Button',
  },
  render: () => (
    <div style={{ width: '400px' }}>
      <Button
        variant="solid"
        color="#007bff"
        size="md"
        label="Full Width Button"
        full={true}
      />
    </div>
  ),
};

export const IconButtons: Story = {
  args: {
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button
          variant="solid"
          color="#007bff"
          size="md"
          label="Check"
          leftIcon="tabler:check"
        />
        <Button
          variant="solid"
          color="#28a745"
          size="md"
          label="Add"
          leftIcon="tabler:plus"
        />
        <Button
          variant="solid"
          color="#dc3545"
          size="md"
          label="Search"
          leftIcon="tabler:search"
        />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button
          variant="outline"
          color="#007bff"
          size="md"
          label="User"
          leftIcon="tabler:user"
        />
        <Button
          variant="outline"
          color="#28a745"
          size="md"
          label="Home"
          leftIcon="tabler:home"
        />
      </div>
    </div>
  ),
};
