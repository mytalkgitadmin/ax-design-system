import { useState } from 'react';

import { Flex } from '../Flex';
import { Stepper } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs', '!dev'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '컴포넌트 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    min: {
      control: 'number',
      description: '최소값',
    },
    max: {
      control: 'number',
      description: '최대값',
    },
    step: {
      control: 'number',
      description: '증감 단위',
    },
    defaultValue: {
      control: 'number',
      description: '기본값',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    defaultValue: 0,
    min: 0,
    max: 10,
    step: 1,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <Flex gap='16' direction='column' align='start'>
      <Stepper size='xs' defaultValue={1} />
      <Stepper size='sm' defaultValue={1} />
      <Stepper size='md' defaultValue={1} />
      <Stepper size='lg' defaultValue={1} />
      <Stepper size='xl' defaultValue={1} />
    </Flex>
  ),
};

// Limits & Step
export const LimitsAndStep: Story = {
  args: {
    min: 0,
    max: 10,
    step: 5,
    defaultValue: 0,
  },
  render: (args) => (
    <div>
      <p style={{ marginBottom: 8 }}>
        Min: {args.min}, Max: {args.max}, Step: {args.step}
      </p>
      <Stepper {...args} />
    </div>
  ),
};

// Controlled
const ControlledExample = () => {
  const [value, setValue] = useState<number | null>(5);
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Stepper
        value={value ?? 0}
        onChange={(val) => setValue(val)}
        min={0}
        max={20}
      />
      <span>Current Value: {value}</span>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

// Disabled
export const Disabled: Story = {
  args: {
    defaultValue: 3,
    disabled: true,
  },
};
