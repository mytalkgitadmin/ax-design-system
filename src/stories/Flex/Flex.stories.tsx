import { Button } from '../Button';
import { Text } from '../Text';
import { Thumbnail } from '../Thumbnail';
import { Flex } from './index';
import {
  FLEX_ALIGNS,
  FLEX_DIRECTIONS,
  FLEX_ELEMENTS,
  FLEX_GAPS,
  FLEX_JUSTIFIES,
  FLEX_WRAPS,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

import '../../tokens/dev/utils/rounded.global.css';
import '../../tokens/dev/utils/spacing.global.css';

// blue 계열 그라데이션 색상 배열
const colors = [
  '#8facff', // blue-400
  '#6f94ff', // blue-500
  '#4f7cff', // blue-600
  '#355fea', // blue-700
  '#2747be', // blue-800
  '#1a318b', // blue-900
];

// 순차적으로 색상을 할당하기 위한 카운터
let colorIndex = 0;

// 예제용 박스 스타일
const Box = ({
  children,
  width,
  height = '60px',
  color,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  color?: string;
}) => {
  // 색상이 명시적으로 전달되지 않으면 순차적으로 할당
  const backgroundColor = color || colors[colorIndex++ % colors.length];

  return (
    <div
      style={{
        width: width || '80px',
        height,
        backgroundColor,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '14px',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Flex 컴포넌트는 flexbox 레이아웃을 쉽게 구현할 수 있는 기본 레이아웃 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type |
 * |------|------|
 * | `as` | `div` \| `section` \| `article` \| `span` \| `header` \| `footer` \| `nav` \| `main` \| `aside` \| `p` \| `h1`-`h6` \| `ul` \| `ol` \| `li` \| `form` \| `label` |
 * | `direction` | `row` \| `column` \| `row-reverse` \| `column-reverse` |
 * | `justify` | `start` \| `center` \| `end` \| `between` \| `around` \| `evenly` |
 * | `align` | `start` \| `center` \| `end` |
 * | `gap` | `0` \| `4` \| `8` \| `12` \| `16` \| `20` \| `24` \| `32` \| `48` \| `64` |
 * | `wrap` | `wrap` \| `nowrap` |
 * | `flex` | `string` (CSS flex 속성) |
 * | `width` | `string` \| `number` |
 * | `height` | `string` \| `number` |
 * | `style` | `React.CSSProperties` |
 * | `className` | `string` |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Flex } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Flex gap='12'>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // 방향 및 정렬
 * <Flex direction='column' align='center' gap='16'>
 *   <div>수직 배치</div>
 *   <div>중앙 정렬</div>
 * </Flex>
 *
 * // 공간 분배
 * <Flex justify='between' gap='8'>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Flex>
 *
 * // flex 비율 사용
 * <Flex gap='12'>
 *   <Flex flex='1'>1배</Flex>
 *   <Flex flex='2'>2배 (넓음)</Flex>
 *   <Flex flex='1'>1배</Flex>
 * </Flex>
 *
 * // 크기 지정
 * <Flex width={600} height='200px' justify='center' align='center'>
 *   <div>고정 크기 컨테이너</div>
 * </Flex>
 *
 * // 줄바꿈
 * <Flex wrap='wrap' gap='12'>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 * ```
 */
const meta = {
  title: 'Foundation/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // HTML
    as: {
      control: { type: 'select' },
      options: FLEX_ELEMENTS,
      description: 'HTML 태그 변경',
      table: { category: 'HTML' },
    },
    // Flex 속성
    direction: {
      control: { type: 'select' },
      options: FLEX_DIRECTIONS,
      description: 'Flex 방향',
      table: { category: 'Flex' },
    },
    justify: {
      control: { type: 'select' },
      options: FLEX_JUSTIFIES,
      description: 'justify-content 정렬',
      table: { category: 'Flex' },
    },
    align: {
      control: { type: 'select' },
      options: FLEX_ALIGNS,
      description: 'align-items 정렬',
      table: { category: 'Flex' },
    },
    gap: {
      control: { type: 'select' },
      options: FLEX_GAPS,
      description: 'Gap 간격 (px)',
      table: { category: 'Flex' },
    },
    wrap: {
      control: { type: 'select' },
      options: FLEX_WRAPS,
      description: 'flex-wrap 설정',
      table: { category: 'Flex' },
    },
    // 스타일 속성
    flex: {
      control: { type: 'text' },
      description: 'CSS flex 속성',
      table: { category: 'Style' },
    },
    width: {
      control: { type: 'text' },
      description: '너비 (px, %, auto 등)',
      table: { category: 'Style' },
    },
    height: {
      control: { type: 'text' },
      description: '높이 (px, %, auto 등)',
      table: { category: 'Style' },
    },
    style: {
      control: false,
      description: 'React CSSProperties',
      table: { category: 'Style' },
    },
    className: {
      control: false,
      description: '추가 CSS 클래스',
      table: { category: 'HTML' },
    },
    children: {
      control: false,
      description: '자식 요소',
      table: { category: 'HTML' },
    },
  },
  args: {
    as: 'div',
    direction: 'row',
    justify: 'start',
    align: 'start',
    wrap: 'nowrap',
    gap: '8',
    className: undefined,
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Flex 컴포넌트입니다. 컨트롤을 사용해서 다양한 속성을 실시간으로 변경해보세요.
 */
export const Default: Story = {
  render: (args) => (
    <Flex
      {...args}
      width={600}
      height={200}
      style={{ border: '1px dashed #ccc' }}
    >
      <Box>Box 1</Box>
      <Box>Box 2</Box>
      <Box>Box 3</Box>
    </Flex>
  ),
};
/**
 * flex 속성 - flex 비율 지정 (1:2:1)
 */
export const FlexRatio: Story = {
  render: () => (
    <Flex
      width={600}
      height='200px'
      gap='12'
      style={{ border: '1px solid #eee' }}
    >
      <Flex
        flex='1'
        justify='center'
        align='center'
        style={{
          backgroundColor: colors[0],
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          height: '200px',
        }}
      >
        flex="1"
      </Flex>
      <Flex
        flex='2'
        justify='center'
        align='center'
        style={{
          backgroundColor: colors[1],
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          height: '200px',
        }}
      >
        flex="2"
      </Flex>
      <Flex
        flex='1'
        justify='center'
        align='center'
        style={{
          backgroundColor: colors[2],
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          height: '200px',
        }}
      >
        flex="1"
      </Flex>
    </Flex>
  ),
};

/**
 * 실제 UI 예제 - Thumbnail, Text, Button을 조합한 카드 레이아웃
 */
export const RealWorldCard: Story = {
  render: () => (
    <Flex
      width='600px'
      gap='32'
      align='center'
      className='rounded-lg pr-16'
      style={{
        border: '1px solid #eee',
        overflow: 'hidden',
      }}
    >
      <Thumbnail width={200} ratio='1' rounded='none' style={{ flex: '2' }} />
      <Flex direction='column' justify='center' gap='8' flex='3'>
        <Text preset='title3' color='primary' as='h3'>
          Lorem ipsum dolor sit amet.
        </Text>
        <Text preset='body2' color='secondary'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt minus
          quisquam voluptas totam ab, esse ducimus maiores cum
        </Text>
        <Flex gap='8' style={{ marginTop: '8px' }}>
          <Button label='Get Started' size='md' color='primary' />
          <Button
            label='Learn More'
            size='md'
            variant='outline'
            color='primary'
          />
        </Flex>
      </Flex>
    </Flex>
  ),
};
