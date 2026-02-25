import { Flex } from '../Flex';
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
  tags: ['autodocs', '!dev'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    buttonText: { control: 'text' },
    icon: {
      control: 'select',
      options: ICON_NAMES,
      table: {
        type: { summary: 'IconType' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '컴포넌트 전체 크기',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    iconSize: {
      control: 'number',
      description: '아이콘 크기 (px 단위)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '48' },
      },
    },
    iconColor: {
      control: 'color',
      description: '아이콘 색상 (CSS 색상 값 또는 color 토큰)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'color.icon.primary' },
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
    icon: 'CircleError',
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
    icon: 'CircleError',
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
          'icon, iconSize, iconColor 속성을 통해 에러 아이콘의 모양, 크기(기본값 48px), 색상을 상황에 맞게 변경할 수 있습니다.',
      },
    },
  },
  args: {
    icon: 'CircleInfoFill',
    iconSize: 64, // 큰 아이콘 크기 예시
    iconColor: '#3b82f6', // 커스텀 색상 예시
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
    icon: 'CircleError',
    title: '데이터를 불러올 수 없습니다',
    description: '네트워크 연결 상태를 확인해주세요.',
  },
};

export const WithoutIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'icon 속성을 생략하면 아이콘 없이 텍스트와 버튼만으로 구성된 간결한 에러 화면을 구성할 수 있습니다.',
      },
    },
  },
  args: {
    title: '아이콘 없는 에러 화면',
    description: '아이콘 속성을 입력하지 않으면 영역이 렌더링되지 않습니다.',
    buttonText: '확인',
  },
};

export const Size: Story = {
  render: () => (
    <Flex direction='column' gap='48' align='center' width='800px'>
      <Error
        size='sm'
        icon='CircleError'
        buttonText='다시 시도하기'
        onRetry={() => {}}
      />
      <Error
        size='md'
        icon='CircleError'
        buttonText='다시 시도하기'
        onRetry={() => {}}
      />
      <Error
        size='lg'
        icon='CircleError'
        buttonText='다시 시도하기'
        onRetry={() => {}}
        buttonProps={{
          full: true,
          leftIcon: 'Reset',
          variant: 'outline',
          color: 'blue',
        }}
      />
    </Flex>
  ),
};

export const ButtonWithIcon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`buttonProps`에 `leftIcon`, `rightIcon` 또는 `icon` 속성을 추가하여 에러 액션 버튼에 원하는 아이콘을 배치할 수 있습니다.',
      },
    },
  },
  args: {
    icon: 'CircleError',
    title: '동기화에 실패했습니다',
    description: '서버와 데이터를 동기화하는 도중 문제가 발생했습니다.',
    buttonText: '다시 동기화',
    buttonProps: {
      leftIcon: 'Reset',
      variant: 'outline',
      color: 'primary',
    },
    onRetry: () => console.warn('retry clicked'),
  },
};
