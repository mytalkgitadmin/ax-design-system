import { shadow } from '../../tokens';
import { ElevationBox, ElevationDemo } from './ElevationDemo';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * 디자인 시스템 전반에서 사용되는 **그림자(Elevation/Shadow)** 기준 값입니다.
 * 요소의 깊이감을 표현하고 계층 구조를 시각화하는 데 사용됩니다.
 *
 * ## 📐 스케일 체계
 *
 * | 이름 | 값 (CSS Variable) | 용도 | 설명 |
 * | --- | --- | --- | --- |
 * | **subtle** | `--shadow-subtle` | 리스트 아이템, 구분선 | 아주 약한 경계가 필요할 때 |
 * | **default** | `--shadow-default` | 카드, 버튼, 입력 필드 | 일반적인 컴포넌트의 기본 상태 |
 * | **raised** | `--shadow-raised` | Hover, Focus 상태 | 요소가 떠오르는 인터랙션 상태 |
 * | **overlay** | `--shadow-overlay` | 모달, 팝오버, 드롭다운 | 컨텐츠 위에 뜨는 오버레이 요소 |
 *
 * ## 🔄 토큰 소스
 *
 * - **소스**: Figma Tokens (primitive/value > Semantic > Shadow)
 * - **자동 생성**: src/tokens/design/primitives/shadow.json
 * - **빌드 결과**: src/tokens/index.ts, src/tokens/variables.css
 * - **빌드 명령**: `npm run build:tokens`
 *
 * ## ✅ 사용 원칙
 *
 * 1. **모든 그림자는 shadow 토큰을 사용합니다** (일관성 유지)
 * 2. **임의의 box-shadow 값 직접 사용을 지양합니다** (디자인 시스템 준수)
 * 3. **컴포넌트의 위계와 상태에 맞는 적절한 단계를 선택합니다**
 *
 * ## 💻 사용법
 *
 * ### 1️⃣ TypeScript/JavaScript - 자동 생성 토큰 (권장)
 *
 * Figma에서 자동 생성된 값을 사용합니다.
 *
 * ```typescript
 * import { shadow } from '@/tokens';
 *
 * // 인라인 스타일
 * const Card = () => (
 *   <div style={{ boxShadow: shadow.default }}>카드</div>
 * );
 *
 * // Vanilla Extract
 * export const card = style({
 *   boxShadow: shadow.default,
 * });
 * ```
 *
 * ### 2️⃣ CSS 변수 - CSS-in-JS에서 사용
 *
 * CSS 변수를 직접 참조합니다.
 *
 * ```typescript
 * // Vanilla Extract
 * export const card = style({
 *   boxShadow: 'var(--shadow-default)',
 * });
 *
 * // styled-components
 * const Button = styled.button`
 *   box-shadow: var(--shadow-raised);
 * `;
 * ```
 *
 * ### 3️⃣ CSS 변수 직접 사용 (순수 CSS)
 *
 * CSS 파일에서 직접 사용 가능합니다.
 *
 * ```css
 * .card {
 *   box-shadow: var(--shadow-default);
 * }
 *
 * .card:hover {
 *   box-shadow: var(--shadow-raised);
 * }
 * ```
 *
 * ## 🎨 사용 예시
 *
 * ### 컴포넌트별 권장 단계
 *
 * - **리스트 아이템**: subtle
 * - **카드**: default (기본) -> raised (Hover)
 * - **플로팅 버튼(FAB)**: raised
 * - **모달/다이얼로그**: overlay
 * - **드롭다운 메뉴**: overlay
 */

const meta = {
  title: 'Foundation/Elevation',
  component: ElevationDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {},
  args: {
    elevation: 'default',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 인터랙티브 Elevation 데모
 *
 * 우측 Controls 패널에서 elevation을 조절하여
 * 실시간으로 그림자 효과를 확인할 수 있습니다. 카드 클릭 시 CSS 변수명이 복사됩니다.
 */
export const Interactive: Story = {
  argTypes: {
    elevation: {
      control: { type: 'select' },
      options: Object.keys(shadow),
      description: '그림자 단계 (Elevation)',
    },
  },
};

export const All: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        padding: '20px',
      }}
    >
      <ElevationBox elevation='subtle' />
      <ElevationBox elevation='default' />
      <ElevationBox elevation='raised' />
      <ElevationBox elevation='overlay' />
    </div>
  ),
};
