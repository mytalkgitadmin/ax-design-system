import { Grid, GridItem } from './index';
import {
  GRID_ALIGNS,
  GRID_AUTO_FLOWS,
  GRID_COLUMNS,
  GRID_ELEMENTS,
  GRID_GAPS,
  GRID_JUSTIFIES,
  GRID_PLACE_CONTENTS,
  GRID_ROWS,
} from './types';

import type { Meta, StoryObj } from '@storybook/react';

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
  height = '80px',
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
        width: width || '100%',
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
 * Grid 컴포넌트는 CSS Grid 레이아웃을 쉽게 구현할 수 있는 기본 레이아웃 컴포넌트입니다.
 *
 * ## Props
 *
 * | Prop | Type | 반응형 지원 |
 * |------|------|-----------|
 * | `as` | `div` \| `section` \| `article` \| `ul` \| `ol` \| `li` \| `nav` \| `main` \| `aside` \| `header` \| `footer` \| `form` | - |
 * | `columns` | `Responsive<GridColumns>` | ✅ |
 * | `rows` | `Responsive<GridRows>` | ✅ |
 * | `gap` | `Responsive<GridGap>` | ✅ |
 * | `columnGap` | `Responsive<GridGap>` | ✅ |
 * | `rowGap` | `Responsive<GridGap>` | ✅ |
 * | `autoFlow` | `GridAutoFlow` | - |
 * | `align` | `GridAlign` | - |
 * | `justify` | `GridJustify` | - |
 * | `placeContent` | `GridPlaceContent` | - |
 * | `minColumnWidth` | `Responsive<string \| number>` | ✅ |
 * | `areas` | `string[]` (grid-template-areas) | - |
 * | `width` | `string` \| `number` | - |
 * | `height` | `string` \| `number` | - |
 * | `style` | `React.CSSProperties` | - |
 * | `className` | `string` | - |
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { Grid, GridItem } from '@bemily/design-system';
 *
 * // 기본 사용
 * <Grid columns='3' gap='12'>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 *
 * // 반응형 그리드 (모바일 1열 → 태블릿 2열 → 데스크탑 4열)
 * <Grid columns=&#123;&#123; base: '1', sm: '2', md: '3', lg: '4' &#125;&#125; gap='16'>
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 *   <div>Card 3</div>
 * </Grid>
 *
 * // 반응형 gap (화면 크기별 다른 간격)
 * <Grid columns='3' gap=&#123;&#123; base: '8', md: '16', lg: '24' &#125;&#125;>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Grid>
 *
 * // auto-fill로 자동 반응형
 * <Grid columns='auto-fill' minColumnWidth='200px' gap='16'>
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 *   <div>Card 3</div>
 * </Grid>
 *
 * // grid-template-areas 사용
 * <Grid
 *   areas={['header header', 'sidebar main', 'footer footer']}
 *   columns='2'
 *   gap='12'
 * >
 *   <GridItem area='header'>Header</GridItem>
 *   <GridItem area='sidebar'>Sidebar</GridItem>
 *   <GridItem area='main'>Main</GridItem>
 *   <GridItem area='footer'>Footer</GridItem>
 * </Grid>
 *
 * // GridItem으로 span 제어
 * <Grid columns='4' gap='12'>
 *   <GridItem colSpan={2}>2 columns wide</GridItem>
 *   <GridItem colSpan={2}>2 columns wide</GridItem>
 *   <GridItem colSpan={4}>4 columns wide (full)</GridItem>
 * </Grid>
 *
 * // placeContent로 그리드 전체 정렬
 * <Grid columns='3' gap='12' placeContent='center' width='600px' height='400px'>
 *   <div>Centered Grid</div>
 * </Grid>
 * ```
 */
const meta = {
  title: 'Foundation/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // HTML
    as: {
      control: { type: 'select' },
      options: GRID_ELEMENTS,
      description: 'HTML 태그 변경',
      table: { category: 'HTML' },
    },
    // Grid 속성
    columns: {
      control: { type: 'select' },
      options: GRID_COLUMNS,
      description:
        '그리드 열 개수 (객체를 통해 반응형 설정 가능: `{ base: "1", md: "2" }`)',
      table: { category: 'Grid' },
    },
    rows: {
      control: { type: 'select' },
      options: GRID_ROWS,
      description:
        '그리드 행 개수 (객체를 통해 반응형 설정 가능: `{ base: "auto", lg: "3" }`)',
      table: { category: 'Grid' },
    },
    gap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: 'Gap 간격 (px) - 행과 열 모두 적용 (반응형 객체 가능)',
      table: { category: 'Grid' },
    },
    columnGap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: '열 간격 (px) (반응형 객체 가능)',
      table: { category: 'Grid' },
    },
    rowGap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: '행 간격 (px) (반응형 객체 가능)',
      table: { category: 'Grid' },
    },
    autoFlow: {
      control: { type: 'select' },
      options: GRID_AUTO_FLOWS,
      description: 'Grid 자동 배치 방향 및 밀집도',
      table: { category: 'Grid' },
    },
    align: {
      control: { type: 'select' },
      options: GRID_ALIGNS,
      description: 'align-items 정렬',
      table: { category: 'Grid' },
    },
    justify: {
      control: { type: 'select' },
      options: GRID_JUSTIFIES,
      description: 'justify-content 정렬',
      table: { category: 'Grid' },
    },
    minColumnWidth: {
      control: { type: 'text' },
      description:
        'auto-fill/auto-fit 사용 시 최소 열 너비 (기본: 200px, 반응형 객체 사용 가능)',
      table: { category: 'Grid' },
    },
    areas: {
      control: false,
      description: 'grid-template-areas 문자열 배열',
      table: { category: 'Grid' },
    },
    placeContent: {
      control: { type: 'select' },
      options: GRID_PLACE_CONTENTS,
      description: 'place-content (align-content + justify-content shorthand)',
      table: { category: 'Grid' },
    },
    // 스타일 속성
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
    columns: '3',
    align: 'stretch',
    justify: 'start',
    autoFlow: 'row',
    gap: '12',
    className: undefined,
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Grid 컴포넌트입니다. 컨트롤을 사용해서 다양한 속성을 실시간으로 변경해보세요.
 */
export const Default: Story = {
  render: (args) => (
    <Grid {...args} width={600} style={{ border: '1px dashed #ccc' }}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Grid>
  ),
};

/**
 * 다양한 열 개수 - 1열부터 12열까지
 */
export const Columns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          2 Columns
        </h4>
        <Grid columns='2' gap='12' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          3 Columns
        </h4>
        <Grid columns='3' gap='12' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          4 Columns
        </h4>
        <Grid columns='4' gap='12' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
          <Box>7</Box>
          <Box>8</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          6 Columns
        </h4>
        <Grid columns='6' gap='12' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * 반응형 그리드 - auto-fill vs auto-fit
 *
 * - **auto-fill**: 가능한 많은 열을 생성하고, 빈 공간에도 열을 유지
 * - **auto-fit**: 빈 열을 collapse하여 아이템이 더 넓게 차지
 */
export const ResponsiveGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          auto-fill (최소 150px, 빈 공간에도 열 유지)
        </h4>
        <Grid
          columns='auto-fill'
          minColumnWidth='150px'
          gap='12'
          width='100%'
          style={{
            maxWidth: '800px',
            border: '1px solid #eee',
            padding: '12px',
          }}
        >
          <Box>Card 1</Box>
          <Box>Card 2</Box>
          <Box>Card 3</Box>
          <Box>Card 4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          auto-fit (최소 150px, 빈 열 collapse하여 아이템 확장)
        </h4>
        <Grid
          columns='auto-fit'
          minColumnWidth='150px'
          gap='12'
          width='100%'
          style={{
            maxWidth: '800px',
            border: '1px solid #eee',
            padding: '12px',
          }}
        >
          <Box>Card 1</Box>
          <Box>Card 2</Box>
          <Box>Card 3</Box>
          <Box>Card 4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          auto-fit (최소 200px) - 더 큰 카드
        </h4>
        <Grid
          columns='auto-fit'
          minColumnWidth={200}
          gap='16'
          width='100%'
          style={{
            maxWidth: '900px',
            border: '1px solid #eee',
            padding: '12px',
          }}
        >
          <Box height='120px'>Product 1</Box>
          <Box height='120px'>Product 2</Box>
          <Box height='120px'>Product 3</Box>
          <Box height='120px'>Product 4</Box>
          <Box height='120px'>Product 5</Box>
          <Box height='120px'>Product 6</Box>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * grid-template-areas를 사용한 복잡한 레이아웃
 * 전통적인 헤더-사이드바-메인-푸터 구조를 쉽게 구현할 수 있습니다.
 */
export const GridAreas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          전통적인 레이아웃 (Header - Sidebar - Main - Footer)
        </h4>
        <Grid
          areas={[
            'header header header',
            'sidebar main main',
            'footer footer footer',
          ]}
          columns='3'
          rows='3'
          gap='12'
          width={600}
          height='400px'
        >
          <GridItem area='header'>
            <Box height='100%'>Header</Box>
          </GridItem>
          <GridItem area='sidebar'>
            <Box height='100%'>Sidebar</Box>
          </GridItem>
          <GridItem area='main'>
            <Box height='100%'>Main Content</Box>
          </GridItem>
          <GridItem area='footer'>
            <Box height='100%'>Footer</Box>
          </GridItem>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          대시보드 레이아웃
        </h4>
        <Grid
          areas={[
            'header header header header',
            'sidebar stats stats stats',
            'sidebar chart chart chart',
            'sidebar chart chart chart',
          ]}
          columns='4'
          rows='4'
          gap='12'
          width={700}
          height='500px'
        >
          <GridItem area='header'>
            <Box height='100%'>Dashboard Header</Box>
          </GridItem>
          <GridItem area='sidebar'>
            <Box height='100%'>Navigation</Box>
          </GridItem>
          <GridItem area='stats'>
            <Box height='100%'>Statistics</Box>
          </GridItem>
          <GridItem area='chart'>
            <Box height='100%'>Chart Area</Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * GridItem으로 개별 아이템의 크기 제어
 * colSpan, rowSpan으로 아이템이 차지하는 공간을 쉽게 제어할 수 있습니다.
 */
export const GridItemSpan: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          colSpan으로 열 크기 제어
        </h4>
        <Grid columns='4' gap='12' width={600}>
          <GridItem colSpan={2}>
            <Box>Span 2 columns</Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box>Span 2 columns</Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box>1</Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Box>Span 3 columns</Box>
          </GridItem>
          <GridItem colSpan={4}>
            <Box>Full Width (Span 4)</Box>
          </GridItem>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          colSpan + rowSpan 조합
        </h4>
        <Grid columns='3' rows='3' gap='12' width={500} height='400px'>
          <GridItem colSpan={2} rowSpan={2}>
            <Box height='100%'>Main (2x2)</Box>
          </GridItem>
          <GridItem rowSpan={2}>
            <Box height='100%'>Sidebar (1x2)</Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Box>Footer (Full Width)</Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * Gap 간격 조정 - gap, columnGap, rowGap
 */
export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          gap='4' (4px)
        </h4>
        <Grid columns='3' gap='4' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          gap='16' (16px)
        </h4>
        <Grid columns='3' gap='16' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          columnGap='24', rowGap='8' (열 간격 24px, 행 간격 8px)
        </h4>
        <Grid columns='3' columnGap='24' rowGap='8' width={600}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * 정렬 - align, justify
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          align='center', justify='center'
        </h4>
        <Grid
          columns='3'
          gap='12'
          align='center'
          justify='center'
          width={600}
          height='200px'
          style={{ border: '1px solid #eee' }}
        >
          <Box height='40px'>Small</Box>
          <Box height='60px'>Medium</Box>
          <Box height='40px'>Small</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          align='start'
        </h4>
        <Grid
          columns='3'
          gap='12'
          align='start'
          width={600}
          height='200px'
          style={{ border: '1px solid #eee' }}
        >
          <Box height='40px'>Small</Box>
          <Box height='60px'>Medium</Box>
          <Box height='40px'>Small</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          align='stretch' (기본값 - 높이가 자동으로 늘어남)
        </h4>
        <Grid
          columns='3'
          gap='12'
          align='stretch'
          width={600}
          height='200px'
          style={{ border: '1px solid #eee' }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Grid>
      </div>
    </div>
  ),
};
/**
 * 반응형 Grid - columns를 breakpoint별로 변경
 *
 * 모바일: 1열, 태블릿: 2열, 데스크탑: 3-4열로 자동 조정됩니다.
 */
export const ResponsiveColumns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          columns=&#123;&#123; base: '1', sm: '2', md: '3', lg: '4' &#125;&#125;
        </h4>
        <Grid
          columns={{ base: '1', sm: '2', md: '3', lg: '4' }}
          gap='16'
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '1000px',
          }}
        >
          <Box>Item 1</Box>
          <Box>Item 2</Box>
          <Box>Item 3</Box>
          <Box>Item 4</Box>
          <Box>Item 5</Box>
          <Box>Item 6</Box>
          <Box>Item 7</Box>
          <Box>Item 8</Box>
        </Grid>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 브라우저 창 크기를 조절해서 열 개수 변화를 확인해보세요
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
export const ResponsiveGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          gap=&#123;&#123; base: '8', md: '16', lg: '24' &#125;&#125;
        </h4>
        <Grid
          columns='3'
          gap={{ base: '8', md: '16', lg: '24' }}
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '800px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 브라우저 창 크기를 조절해서 간격 변화를 확인해보세요
        </p>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          columnGap / rowGap 개별 조정
        </h4>
        <Grid
          columns='3'
          columnGap={{ base: '8', md: '24' }}
          rowGap={{ base: '8', md: '16' }}
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '800px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          모바일: 8px, 데스크탑: 열 간격 24px / 행 간격 16px
        </p>
      </div>
    </div>
  ),
};

/**
 * 반응형 rows - 화면 크기에 따라 행 개수 조정
 *
 * 모바일에서는 자동 높이(auto), 데스크탑에서는 고정 행 개수로 설정할 수 있습니다.
 */
export const ResponsiveRows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          rows=&#123;&#123; base: 'auto', lg: '3' &#125;&#125; - 모바일: 자동,
          데스크탑: 3행 고정
        </h4>
        <Grid
          columns={{ base: '2', md: '3' }}
          rows={{ base: 'auto', lg: '3' }}
          gap='12'
          style={{
            border: '1px solid #eee',
            padding: '16px',
            maxWidth: '800px',
            minHeight: '300px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
          <Box>5</Box>
          <Box>6</Box>
        </Grid>
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
          💡 큰 화면에서는 3행으로 고정, 작은 화면에서는 자동 높이
        </p>
      </div>
    </div>
  ),
};

/**
 * 실전 예제 - 반응형 카드 그리드
 *
 * 실제 상품 목록이나 블로그 카드 레이아웃에 적합한 반응형 그리드입니다.
 */
export const ResponsiveCardGrid: Story = {
  render: () => (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <Grid
        columns={{ base: '1', sm: '2', md: '3', lg: '4' }}
        gap={{ base: '16', md: '24' }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <div
            key={num}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #eee',
            }}
          >
            <Box height='180px'>{`Product ${num}`}</Box>
            <div style={{ padding: '16px' }}>
              <h4
                style={{
                  marginBottom: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                상품명 {num}
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '12px',
                }}
              >
                상품 설명이 들어갑니다.
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: colors[3],
                  }}
                >
                  {(num * 10000).toLocaleString()}원
                </span>
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: colors[4],
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  장바구니
                </button>
              </div>
            </div>
          </div>
        ))}
      </Grid>

      <p
        style={{
          marginTop: '24px',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
        }}
      >
        💡 브라우저 창 크기를 조절해서 열 개수가 자동으로 변하는 것을
        확인해보세요
      </p>
    </div>
  ),
};

/**
 * placeContent - Grid 전체를 컨테이너 내에서 정렬
 *
 * `place-content`는 `align-content`와 `justify-content`의 shorthand입니다.
 * Grid의 전체 콘텐츠를 컨테이너 중앙이나 특정 위치에 정렬할 때 유용합니다.
 *
 * **중요**: placeContent가 제대로 작동하려면 Grid의 tracks가 컨테이너보다 작아야 합니다.
 */
export const PlaceContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='center' - 그리드 전체를 중앙에 배치
        </h4>
        <Grid
          gap='12'
          placeContent='center'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='start' - 좌상단에 배치
        </h4>
        <Grid
          gap='12'
          placeContent='start'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='end' - 우하단에 배치
        </h4>
        <Grid
          gap='12'
          placeContent='end'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='center start' - 세로 중앙, 가로 좌측
        </h4>
        <Grid
          gap='12'
          placeContent='center start'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='center end' - 세로 중앙, 가로 우측
        </h4>
        <Grid
          gap='12'
          placeContent='center end'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          placeContent='space-between' - 행/열 사이 공간 균등 분배
        </h4>
        <Grid
          gap='12'
          placeContent='space-between'
          width={600}
          height='300px'
          style={{
            border: '2px dashed #ccc',
            backgroundColor: '#f9f9f9',
            gridTemplateColumns: '140px 140px',
            gridTemplateRows: '80px 80px',
          }}
        >
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
          <Box>4</Box>
        </Grid>
      </div>
    </div>
  ),
};

/**
 * 반응형 GridItem - 화면 크기에 따라 아이템의 크기와 위치 조정
 *
 * 모바일에서는 1열씩 차지하다가, 데스크탑에서는 여러 열을 차지하거나 위치가 바뀝니다.
 */
export const ResponsiveGridItem: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          colSpan=&#123;&#123; base: 1, md: 2 &#125;&#125; - 큰 화면에서 더 넓게
          차지
        </h4>
        <Grid columns='2' gap='16' width={600}>
          <GridItem colSpan={{ base: 1, md: 2 }}>
            <Box>모바일: 1열, 데스크탑: 2열</Box>
          </GridItem>
          <Box>Next Item</Box>
          <Box>Next Item</Box>
        </Grid>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
          colStart=&#123;&#123; base: 1, lg: 2 &#125;&#125; - 화면 크기에 따른
          시작 위치 변경
        </h4>
        <Grid columns='3' gap='16' width={600}>
          <GridItem colStart={{ base: 1, lg: 2 }}>
            <Box>모바일: 1번 열 시작, 데스크탑: 2번 열 시작</Box>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
};
