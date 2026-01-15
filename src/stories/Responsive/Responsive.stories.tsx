import {
  ClampSpacingDemo,
  ClampTypographyDemo,
  ContainerQueryDemo,
  MediaQueryDemo,
} from './ResponsiveDemo';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * **반응형 디자인 시스템**을 위한 유틸리티와 실제 작동 예시입니다.
 *
 * ## 📐 개요
 *
 * 이 페이지에서는 다음을 확인할 수 있습니다:
 * - ✨ **Clamp Typography**: CSS `clamp()`를 활용한 유동적 폰트 크기
 * - 📱 **Media Queries**: 화면 크기별 레이아웃 변경
 * - 🎯 **Container Queries**: 컨테이너 크기 기반 반응형
 * - 📏 **Clamp Spacing**: 유동적 여백 시스템
 *
 * ## 🚀 빠른 시작
 *
 * ### Import
 *
 * ```typescript
 * import {
 *   clampSize,           // 핵심 함수
 *   clampTypography,     // 타이포그래피 프리셋
 *   clampSpacing,        // 여백 프리셋
 *   mq,                  // globalStyle용 미디어 쿼리
 *   mqConditions,        // vanilla-extract style()용
 *   breakpoints          // 브레이크포인트 값
 * } from '@/tokens';
 * ```
 *
 * ### 1. Clamp 활용 (권장 ⭐)
 *
 * CSS `clamp()`로 부드러운 반응형 크기 조절:
 *
 * ```typescript
 * import { style } from '@vanilla-extract/css';
 * import { clampSize, clampTypography } from '@/tokens';
 *
 * // 커스텀 크기
 * export const title = style({
 *   fontSize: clampSize(20, 40),  // 20px ~ 40px 유동적 변화
 * });
 *
 * // 프리셋 사용
 * export const hero = style({
 *   fontSize: clampTypography.display1,  // 32px ~ 72px
 * });
 * ```
 *
 * ### 2. Media Query
 *
 * 특정 지점에서 명확한 레이아웃 변경:
 *
 * ```typescript
 * import { style } from '@vanilla-extract/css';
 * import { mqConditions } from '@/tokens';
 *
 * export const container = style({
 *   padding: '1rem',      // 기본 (모바일)
 *   '@media': {
 *     [mqConditions.tablet]: {
 *       padding: '2rem',  // 태블릿 (≥768px)
 *     },
 *     [mqConditions.desktop]: {
 *       padding: '3rem',  // 데스크톱 (≥1024px)
 *     },
 *   },
 * });
 * ```
 *
 * #### mq vs mqConditions
 *
 * **중요:** vanilla-extract에서는 사용 함수에 따라 다른 미디어 쿼리를 사용해야 합니다.
 *
 * | 함수 | 사용 | 포함 내용 | 예시 |
 * |------|------|-----------|------|
 * | `style()` | `mqConditions` | 조건만 | `"screen and (min-width: 768px)"` |
 * | `globalStyle()` | `mq` | @media 포함 | `"@media (min-width: 768px)"` |
 *
 * ```typescript
 * // ✅ style() 함수 - mqConditions 사용
 * export const box = style({
 *   '@media': {
 *     [mqConditions.tablet]: { padding: '2rem' },
 *   },
 * });
 *
 * // ✅ globalStyle() 함수 - mq 사용
 * globalStyle('.box', {
 *   [mq.tablet]: { padding: '2rem' },
 * });
 * ```
 *
 * ### 3. Container Query (최신 기능)
 *
 * 부모 컨테이너 크기에 반응:
 *
 * ```typescript
 * import { style } from '@vanilla-extract/css';
 * import { containerQueries } from '@/tokens';
 *
 * export const card = style({
 *   containerType: 'inline-size',
 *   containerName: 'card',
 * });
 *
 * export const content = style({
 *   display: 'grid',
 *   '@container': {
 *     [containerQueries.md]: {
 *       gridTemplateColumns: 'repeat(2, 1fr)',
 *     },
 *   },
 * });
 * ```
 *
 * ## 🎯 언제 무엇을 사용할까?
 *
 * ### clampSize (권장 ⭐)
 *
 * **사용:**
 * - 여백 (padding, margin, gap)
 * - 대형 타이포그래피 (히어로, 제목)
 * - 카드 내부 간격
 * - 아이콘 크기
 *
 * **장점:**
 * - 부드러운 전환
 * - 미디어 쿼리 불필요
 * - 모든 화면 크기 자동 대응
 *
 * **예시:**
 * ```typescript
 * gap: clampSize(16, 32)        // 섹션 간격
 * padding: clampSize(24, 48)    // 컨테이너 여백
 * fontSize: clampSize(32, 72)   // 히어로 타이틀
 * ```
 *
 * ---
 *
 * ### Media Query
 *
 * **사용:**
 * - 레이아웃 구조 변경 (grid → stack)
 * - 요소 표시/숨김
 * - 명확한 지점에서 전환 필요시
 *
 * **장점:**
 * - 명확한 breakpoint
 * - 완전히 다른 레이아웃 가능
 *
 * **예시:**
 * ```typescript
 * '@media': {
 *   [mqConditions.tablet]: {
 *     gridTemplateColumns: '1fr 1fr',  // 모바일: 1열, 태블릿: 2열
 *     display: 'none',                 // 데스크톱에서 숨김
 *   },
 * }
 * ```
 *
 * ---
 *
 * ### Container Query (최신 🆕)
 *
 * **사용:**
 * - 재사용 가능한 컴포넌트
 * - 사이드바/메인 컨텐츠 등 가변 영역
 * - 뷰포트가 아닌 부모 크기에 반응
 *
 * **장점:**
 * - 컴포넌트가 어디 쓰이든 동일하게 작동
 * - 진정한 컴포넌트 재사용성
 *
 * **예시:**
 * ```typescript
 * containerType: 'inline-size',
 * '@container': {
 *   '(min-width: 400px)': {
 *     gridTemplateColumns: '1fr 1fr',
 *   },
 * }
 * ```
 *
 * ---
 *
 * ## 💡 실전 조합
 *
 * ```typescript
 * export const productCard = style({
 *   containerType: 'inline-size',
 *   padding: clampSize(16, 24),        // ⭐ clampSize: 부드러운 여백
 *   borderRadius: clampSize(8, 12),    // ⭐ clampSize: 모서리
 *
 *   '@container': {
 *     '(min-width: 300px)': {          // 🎯 Container: 카드 자체 크기
 *       display: 'grid',
 *       gridTemplateColumns: '1fr 2fr',
 *     },
 *   },
 *
 *   '@media': {
 *     [mqConditions.mobile]: {         // 📱 Media: 전역 설정
 *       boxShadow: 'none',
 *     },
 *   },
 * });
 * ```
 *
 * ## 📋 Breakpoints
 *
 * ```typescript
 * breakpoints = {
 *   mobile: 375,    // 모바일
 *   tablet: 768,    // 태블릿
 *   desktop: 1024,  // 데스크톱
 *   wide: 1440,     // 와이드
 * }
 * ```
 */
const meta = {
  title: 'Foundation/Responsive',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## ✨ Clamp Typography
 *
 * CSS `clamp()` 함수를 활용한 유동적 폰트 크기입니다.
 *
 * **테스트 방법:**
 * 1. 👀 **우측 상단의 파란색 인디케이터를 주목하세요** (현재 화면 너비 표시)
 * 2. 🖱️ **브라우저 창을 천천히 좌히보세요** (데스크톱 → 모바일)
 * 3. ✨ **폰트 크기가 부드럽게 작아지는 것을 확인하세요**
 * 4. 📱 개발자 도구 (F12) → 반응형 모드로 다양한 기기 테스트
 *
 * **사용 예시:**
 *
 * ```typescript
 * import { clampSize, clampTypography } from '@/tokens';
 *
 * // 커스텀 크기
 * export const heading = style({
 *   fontSize: clampSize(24, 48),  // 24px ~ 48px
 * });
 *
 * // 프리셋 사용
 * export const hero = style({
 *   fontSize: clampTypography.display1,  // 32px ~ 72px
 * });
 * ```
 *
 * **결과:**
 * - 모바일: 32px
 * - 태블릿: ~50px (화면 크기에 따라)
 * - 데스크톱: 72px
 */
export const ClampTypography: Story = {
  render: () => <ClampTypographyDemo />,
};

/**
 * ## 📱 Media Query
 *
 * 특정 화면 크기에서 명확한 레이아웃 변경을 원할 때 사용합니다.
 *
 * **Breakpoints:**
 * - 모바일: < 768px (Blue 50 배경)
 * - 태블릿: ≥ 768px (Blue 100 배경)
 * - 데스크톱: ≥ 1024px (Blue 200 배경)
 *
 * **테스트:**
 * 브라우저 창을 조절하면서 박스의 배경색과 패딩이 변하는 것을 확인하세요!
 *
 * 💡 사용법은 위 문서의 "Media Query" 섹션을 참고하세요.
 */
export const MediaQuery: Story = {
  render: () => <MediaQueryDemo />,
};

/**
 * ## 🎯 Container Query (최신 기능)
 *
 * 컨테이너 크기에 따라 내부 레이아웃이 변경됩니다.
 *
 * **동작:**
 * - 컨테이너 너비 < 600px: 1열 레이아웃
 * - 600px ~ 900px: 2열 그리드
 * - 900px 이상: 3열 그리드
 *
 * **사용 예시:**
 *
 * ```typescript
 * import { containerQueries } from '@/tokens';
 *
 * export const card = style({
 *   containerType: 'inline-size',
 *   containerName: 'myCard',
 * });
 *
 * export const content = style({
 *   display: 'grid',
 *   gridTemplateColumns: '1fr',  // 기본 1열
 *   '@container': {
 *     [containerQueries.md]: {  // 컨테이너 768px 이상
 *       gridTemplateColumns: 'repeat(2, 1fr)',
 *     },
 *   },
 * });
 * ```
 *
 * **테스트 방법:**
 * 1. 👇 초록색 박스의 **오른쪽 아래 모서리**를 잡고 드래그하세요 (resize 핸들)
 * 2. 박스 너비에 따라 내부 아이템의 레이아웃과 색상이 변합니다.
 * 3. 뷰포트 너비와 상관없이 **컨테이너 자체의 크기**에 반응합니다.
 */
export const ContainerQuery: Story = {
  render: () => <ContainerQueryDemo />,
};

/**
 * ## 📏 Clamp Spacing
 *
 * 화면 크기에 따라 여백(Gap, Padding)이 유동적으로 변합니다.
 *
 * **사용 예시:**
 *
 * ```typescript
 * import { clampSize, clampSpacing } from '@/tokens';
 *
 * // 커스텀 크기
 * export const section = style({
 *   gap: clampSize(16, 48),      // 16px ~ 48px
 *   padding: clampSize(24, 64),  // 24px ~ 64px
 * });
 *
 * // 프리셋 사용
 * export const layout = style({
 *   gap: clampSpacing.sectionGap,      // 32px ~ 64px
 *   padding: clampSpacing.componentGap, // 16px ~ 24px
 * });
 * ```
 *
 * **테스트 방법:**
 * 브라우저 창을 줄이면 주황색 박스들 사이의 간격(Gap)과 테두리 여백(Padding)이 줄어듭니다.
 *
 * - **Gap**: 16px ~ 64px
 * - **Padding**: 24px ~ 64px
 */
export const ClampSpacing: Story = {
  render: () => <ClampSpacingDemo />,
};
