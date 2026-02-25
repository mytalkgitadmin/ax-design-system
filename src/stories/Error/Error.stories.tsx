import { ICON_NAMES } from '../Icon/types';
import { Error } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Error',
  component: Error,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`Error` 컴포넌트는 사용자가 예상치 못한 오류를 마주했을 때 표시되는 전용 UI 컴포넌트입니다.\n네트워크 오류, 데이터 로딩 실패 등 다양한 형태의 에러 상황에서 일관된 사용자 경험(UX)을 제공하기 위해 사용합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    iconName: {
      control: 'select',
      options: ICON_NAMES,
      table: {
        type: { summary: 'IconType' },
        defaultValue: { summary: "'CircleError'" },
      },
    },
    buttonProps: {
      control: 'object',
      description:
        '버튼의 속성 (size, variant, color 등)을 객체 형태로 제어합니다.',
    },
    onRetry: { action: 'clicked' },
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 에러 상태를 나타냅니다. 오류 제목과 상세 내용, 그리고 다시 시도할 수 있는 버튼을 제공합니다.',
      },
    },
  },
  args: {
    title: '서비스 이용이 원활하지 않아요',
    description: '불편을 드려 죄송해요.\n잠시 후에 다시 시도해 주세요.',
    buttonText: '다시 시도하기',
    onRetry: () => console.warn('retry clicked'),
  },
};
export const CustomButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'buttonProps를 통해 버튼의 크기, 색상, 스타일 등을 변경할 수 있습니다.',
      },
    },
  },
  args: {
    title: '연결 시간이 초과되었습니다',
    description: '서버 응답이 지연되고 있습니다.',
    buttonText: '메인으로 돌아가기',
    buttonProps: {
      variant: 'outline',
      color: 'primary',
      size: 'md',
      full: true,
    },
    onRetry: () => console.warn('retry clicked'),
  },
};

export const CustomIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'iconName 속성을 통해 에러 아이콘을 상황에 맞는 다른 아이콘으로 변경할 수 있습니다.',
      },
    },
  },
  args: {
    iconName: 'CircleInfoFill',
    title: '경고: 데이터를 찾을 수 없습니다',
    description: '요청하신 정보가 삭제되었거나 이동되었습니다.',
  },
};

export const WithoutButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '자동으로 해결되거나 추가 동작이 필요 없는 오류를 나타낼 때 버튼이 없는 형태로 구성될 수 있습니다.',
      },
    },
  },
  args: {
    title: '데이터를 불러올 수 없습니다',
    description: '네트워크 연결 상태를 확인해주세요.',
  },
};
