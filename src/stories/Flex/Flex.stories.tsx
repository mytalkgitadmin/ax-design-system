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
 * | Prop | Type | 반응형 지원 |
 * |------|------|-----------|
 * | `as` | `div` \| `section` \| `article` \| `span` \| `header` \| `footer` \| `nav` \| `main` \| `aside` \| `p` \| `h1`-`h6` \| `ul` \| `ol` \| `li` \| `form` \| `label` | - |
 * | `direction` | `row` \| `column` \| `row-reverse` \| `column-reverse` | ✅ |
 * | `justify` | `start` \| `center` \| `end` \| `between` \| `around` \| `evenly` | - |
 * | `align` | `start` \| `center` \| `end` \| `stretch` | - |
 * | `gap` | `0` \| `4` \| `8` \| `12` \| `16` \| `20` \| `24` \| `32` \| `48` \| `64` | ✅ |
 * | `wrap` | `wrap` \| `nowrap` | - |
 * | `flex` | `string` (CSS flex 속성) | - |
 * | `width` | `string` \| `number` | - |
 * | `height` | `string` \| `number` | - |
 * | `style` | `React.CSSProperties` | - |
 * | `className` | `string` | - |
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
 *
 * // 반응형 direction (모바일: 세로, 데스크탑: 가로)
 * <Flex direction=&#123;&#123; base: 'column', md: 'row' &#125;&#125; gap='16'>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // 반응형 gap (화면 크기별 다른 간격)
 * <Flex gap=&#123;&#123; base: '8', md: '16', lg: '32' &#125;&#125;>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 *
 * // 주문/결제 페이지 레이아웃 (3:1 비율, 반응형 direction)
 * <Flex direction={{ base: 'column', lg: 'row' }} gap='32' align='start'>
 *   <Flex direction='column' flex='3'>
 *     <section>주문자 정보</section>
 *     <section>배송 정보</section>
 *   </Flex>
 *
 *   <Flex flex='1' direction='column'>
 *     <aside>결제 금액</aside>
 *   </Flex>
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

/**
 * 반응형 direction - 화면 크기에 따라 방향 전환
 *
 * 모바일에서는 세로, 데스크탑에서는 가로로 배치됩니다.
 */
export const ResponsiveDirection: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          direction=&#123;&#123; base: 'column', md: 'row' &#125;&#125; -
          모바일: 세로, 데스크탑: 가로
        </h4>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap='16'
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '800px',
          }}
        >
          <Box width='100%'>Box 1</Box>
          <Box width='100%'>Box 2</Box>
          <Box width='100%'>Box 3</Box>
        </Flex>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 브라우저 창 크기를 조절해서 반응형을 확인해보세요
        </p>
      </div>
    </div>
  ),
};

/**
 * 반응형 gap - 화면 크기에 따라 간격 조정
 *
 * 모바일에서는 좁게, 데스크탑에서는 넓게 간격을 설정합니다.
 */
export const ResponsiveGap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          gap=&#123;&#123; base: '8', md: '24', lg: '32' &#125;&#125; - 모바일:
          8px, 태블릿: 24px, 데스크탑: 32px
        </h4>
        <Flex
          gap={{ base: '8', md: '24', lg: '32' }}
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '800px',
          }}
        >
          <Box>Box 1</Box>
          <Box>Box 2</Box>
          <Box>Box 3</Box>
          <Box>Box 4</Box>
        </Flex>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 브라우저 창 크기를 조절해서 간격 변화를 확인해보세요
        </p>
      </div>
    </div>
  ),
};

/**
 * 실전 레이아웃 - 주문/결제 페이지
 *
 * 분할 비율 (왼쪽 3 : 오른쪽 1)
 * 화면이 넓을 때는 좌우로 배치되고, 좁아질 때(lg 미만)는 상하(컬럼)로 자연스럽게 배치됩니다.
 */
export const CheckoutLayout: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', width: '100%' }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap='32'
        align='start'
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* 왼쪽: 주문 정보 영역 (flex: 3) */}
        <Flex
          direction='column'
          gap='24'
          flex='3'
          style={{ minWidth: 0, width: '100%' }}
        >
          {/* 주문자 정보 */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <h3
              style={{
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              주문자 정보
            </h3>
            <Flex direction='column' gap='12'>
              <Box height='40px' color='#f5f5f5'>
                주문자
              </Box>
              <Box height='40px' color='#f5f5f5'>
                연락처
              </Box>
            </Flex>
          </div>

          {/* 배송 정보 */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <h3
              style={{
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              배송 정보
            </h3>
            <Flex direction='column' gap='12'>
              <Box height='40px' color='#f5f5f5'>
                수령인
              </Box>
              <Box height='80px' color='#f5f5f5'>
                배송지
              </Box>
            </Flex>
          </div>

          {/* 주문 상품 */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <h3
              style={{
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              주문 상품
            </h3>
            <Flex direction='column' gap='12'>
              <Box height='80px' color='#f5f5f5'>
                상품 1
              </Box>
              <Box height='80px' color='#f5f5f5'>
                상품 2
              </Box>
            </Flex>
          </div>
        </Flex>

        {/* 오른쪽: 결제 금액 (flex: 1) */}
        <Flex
          direction='column'
          flex='1'
          style={{ width: '100%', minWidth: '300px' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #eee',
              position: 'sticky',
              top: '20px',
            }}
          >
            <h3
              style={{
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              결제 금액
            </h3>
            <Flex direction='column' gap='12'>
              <Flex justify='between'>
                <span>총 상품 금액</span>
                <strong>18,100원</strong>
              </Flex>
              <Flex justify='between'>
                <span>총 배송비</span>
                <strong>0원</strong>
              </Flex>
              <Flex justify='between'>
                <span>쿠폰 사용</span>
                <strong>0원</strong>
              </Flex>
              <hr
                style={{
                  margin: '12px 0',
                  border: 'none',
                  borderTop: '1px solid #eee',
                }}
              />
              <Flex
                justify='between'
                style={{ fontSize: '18px', fontWeight: '700' }}
              >
                <span>최종 결제 금액</span>
                <span style={{ color: colors[3] }}>18,100원</span>
              </Flex>
              <Box height='48px' color={colors[4]} width='100%'>
                결제하기
              </Box>
            </Flex>
          </div>
        </Flex>
      </Flex>

      <p
        style={{
          marginTop: '16px',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
        }}
      >
        💡 브라우저 창 너비를 조절해서 레이아웃 변화를 확인해보세요. lg
        브레이크포인트 기준으로 화면이 좁아지면 위아래로 떨어집니다.
      </p>
    </div>
  ),
};
