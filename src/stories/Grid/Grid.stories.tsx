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
 * | Prop | Type |
 * |------|------|
 * | `as` | `div` \| `section` \| `article` \| `ul` |
 * | `columns` | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `8` \| `12` \| `auto-fill` \| `auto-fit` |
 * | `rows` | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `auto` |
 * | `gap` | `0` \| `4` \| `8` \| `12` \| `16` \| `20` \| `24` \| `32` \| `48` \| `64` |
 * | `columnGap` | `0` \| `4` \| `8` \| `12` \| `16` \| `20` \| `24` \| `32` \| `48` \| `64` |
 * | `rowGap` | `0` \| `4` \| `8` \| `12` \| `16` \| `20` \| `24` \| `32` \| `48` \| `64` |
 * | `autoFlow` | `row` \| `column` \| `row-dense` \| `column-dense` |
 * | `align` | `start` \| `center` \| `end` \| `stretch` |
 * | `justify` | `start` \| `center` \| `end` \| `stretch` \| `between` \| `around` \| `evenly` |
 * | `placeContent` | `center` \| `start` \| `end` \| `center center` 등 (shorthand) |
 * | `minColumnWidth` | `string` \| `number` (auto-fill/auto-fit 사용 시) |
 * | `areas` | `string[]` (grid-template-areas) |
 * | `width` | `string` \| `number` |
 * | `height` | `string` \| `number` |
 * | `style` | `React.CSSProperties` |
 * | `className` | `string` |
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
 * // 반응형 그리드 (auto-fill)
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
      description: '그리드 열 개수 (auto-fill, auto-fit은 반응형)',
      table: { category: 'Grid' },
    },
    rows: {
      control: { type: 'select' },
      options: GRID_ROWS,
      description: '그리드 행 개수 (auto는 자동 높이)',
      table: { category: 'Grid' },
    },
    gap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: 'Gap 간격 (px) - 행과 열 모두 적용',
      table: { category: 'Grid' },
    },
    columnGap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: '열 간격 (px)',
      table: { category: 'Grid' },
    },
    rowGap: {
      control: { type: 'select' },
      options: GRID_GAPS,
      description: '행 간격 (px)',
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
      description: 'auto-fill/auto-fit 사용 시 최소 열 너비 (기본: 200px)',
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
