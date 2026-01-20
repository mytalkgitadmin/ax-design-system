# Foundation Stories 작성 템플릿

> Foundation 토큰(Colors, Spacing, Typography 등)의 Storybook 문서를 작성할 때 사용하는 표준
> 템플릿입니다.

---

## 📋 Foundation vs Component 차이점

| 구분          | Foundation                  | Component                 |
| ------------- | --------------------------- | ------------------------- |
| **목적**      | 디자인 토큰 문서화          | UI 컴포넌트 문서화        |
| **예시**      | Colors, Spacing, Typography | Button, Input, Select     |
| **주요 내용** | 토큰 값, 사용법, 조합       | Props, Variants, 인터랙션 |
| **Story 수**  | 2-4개                       | 6개 이상                  |

---

## 📝 Stories 파일 템플릿

````tsx
import { useState } from 'react';

import { tokenName } from '../../tokens';
import { TokenDemo } from './TokenDemo';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * [TokenName]은 [목적]을 위한 디자인 토큰입니다.
 *
 * ## 📐 스케일 체계
 *
 * - **기준**: [예: 8px 배수, rem 단위 등]
 * - **범위**: [예: xs(4px) ~ xl(32px)]
 * - **수식**: [예: spacing[16] → 1rem (16px)]
 *
 * ## ✅ 사용 원칙
 *
 * 1. **[원칙 1]**: [설명]
 * 2. **[원칙 2]**: [설명]
 * 3. **[원칙 3]**: [설명]
 *
 * ## 💻 사용법
 *
 * ### 1️⃣ CSS-in-JS (vanilla-extract)
 *
 * ```typescript
 * import { tokenName } from '@/tokens/...';
 *
 * export const style = style({
 *   property: tokenName.value,
 * });
 * ```
 *
 * ### 2️⃣ CSS 변수
 *
 * ```css
 * .custom {
 *   property: var(--token-name);
 * }
 * ```
 *
 * ### 3️⃣ Utility Class (있다면)
 *
 * ```tsx
 * import { utilityClass } from '@/tokens/...';
 *
 * <div className={utilityClass[value]}>
 *   Content
 * </div>
 * ```
 *
 * ## 🎨 접근성 고려사항
 *
 * - **[접근성 항목 1]**: [설명, 예: 색상 대비 4.5:1 이상]
 * - **[접근성 항목 2]**: [설명]
 *
 * ## 📋 Best Practices
 *
 * ✅ **Do**:
 * - [권장사항 1]
 * - [권장사항 2]
 *
 * ❌ **Don't**:
 * - [비권장사항 1]
 * - [비권장사항 2]
 */
const meta = {
  title: 'Foundation/TokenName',
  component: TokenDemo,
  parameters: {
    layout: 'padded', // 또는 'centered'
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    // Interactive demo에 필요한 controls만 정의
  },
} satisfies Meta<typeof TokenDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================
// 1. Interactive Demo (인터랙티브 데모)
// ============================================================
/**
 * 토큰 값을 실시간으로 조절하여 효과를 확인할 수 있습니다.
 *
 * Controls 패널에서 값을 변경해보세요.
 */
export const Interactive: Story = {
  render: (args) => <TokenDemo {...args} />,
  args: {
    // 기본값
    value: 'md',
  },
  argTypes: {
    value: {
      control: { type: 'select' },
      options: Object.keys(tokenName),
      description: '토큰 값 선택',
    },
  },
};

// ============================================================
// 2. All Tokens (모든 토큰 시각화)
// ============================================================
/**
 * 모든 토큰 값을 한눈에 볼 수 있습니다.
 *
 * 각 토큰을 클릭하면 값이 클립보드에 복사됩니다.
 */
export const AllTokens: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}
    >
      {Object.entries(tokenName).map(([key, value]) => (
        <div
          key={key}
          style={{
            padding: '16px',
            border: '1px solid #e3e6ee',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigator.clipboard.writeText(value);
            alert(`Copied: ${value}`);
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>{key}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>{value}</div>

          {/* 토큰에 따라 시각적 표현 추가 */}
          {/* 예: 색상의 경우 */}
          <div
            style={{
              marginTop: '8px',
              width: '100%',
              height: '40px',
              backgroundColor: value,
              borderRadius: '4px',
            }}
          />
        </div>
      ))}
    </div>
  ),
};

// ============================================================
// 3. Usage Combinations (실전 조합 예시)
// ============================================================
/**
 * 실제 프로젝트에서 사용하는 조합 예시입니다.
 */
export const UsageCombinations: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>조합 1: Card</h3>
        <div
          style={{
            padding: tokenName.md,
            backgroundColor: '#fff',
            border: `1px solid ${tokenName.border}`,
            borderRadius: tokenName.rounded.md,
            boxShadow: tokenName.shadow.md,
          }}
        >
          Card 콘텐츠
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>조합 2: Button</h3>
        <button
          style={{
            padding: `${tokenName.sm} ${tokenName.md}`,
            backgroundColor: tokenName.primary,
            color: '#fff',
            border: 'none',
            borderRadius: tokenName.rounded.md,
            cursor: 'pointer',
          }}
        >
          Button
        </button>
      </div>

      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>조합 3: Typography</h3>
        <div
          style={{
            fontSize: tokenName.text.body1.fontSize,
            lineHeight: tokenName.text.body1.lineHeight,
            color: tokenName.text.primary,
          }}
        >
          본문 텍스트 예시
        </div>
      </div>
    </div>
  ),
};

// ============================================================
// 4. Accessibility Demo (접근성 데모) - 선택
// ============================================================
/**
 * 접근성 고려사항을 시각적으로 확인할 수 있습니다.
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>✅ Good: 대비율 4.5:1 이상</h3>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #e3e6ee',
          }}
        >
          읽기 쉬운 텍스트 (대비율: 21:1)
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>❌ Bad: 대비율 3:1 미만</h3>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff',
            color: '#ccc',
            border: '1px solid #e3e6ee',
          }}
        >
          읽기 어려운 텍스트 (대비율: 1.6:1)
        </div>
      </div>
    </div>
  ),
};
````

---

## 🎯 Foundation별 Story 가이드

### Colors

**필수 Stories**:

1. **Interactive**: 색상 복사 기능
2. **AllColors**: 전체 색상 팔레트
3. **SemanticColors**: 시맨틱 컬러 (primary, secondary 등)
4. **ContrastChecker**: 색상 대비 계산기

**Demo 컴포넌트**:

```tsx
// ColorPalette.tsx
- 색상 팔레트 그리드
- 클릭 시 복사
- Hex, RGB, CSS 변수 표시
```

---

### Spacing

**필수 Stories**:

1. **Interactive**: Margin/Padding/Gap 실시간 조절
2. **AllSpacing**: 전체 spacing 값
3. **ResponsiveSpacing**: clampSize 활용 예시
4. **ComponentSpacing**: 컴포넌트별 권장 spacing

**Demo 컴포넌트**:

```tsx
// SpacingDemo.tsx
- Box 모델 시각화
- Margin, Padding, Gap 조절 UI
- 픽셀 값 실시간 표시
```

---

### Typography

**필수 Stories**:

1. **Interactive**: Font size/weight/line-height 조절
2. **AllPresets**: 전체 타이포그래피 프리셋 (h1-h6, body, caption)
3. **Readability**: 가독성 가이드 (line-height, letter-spacing)
4. **ResponsiveTypography**: clampSize 활용

**Demo 컴포넌트**:

```tsx
// TypographyDemo.tsx
- Font scale 시각화
- 실시간 조절 UI
- 가독성 비교
```

---

### Elevation (Shadow)

**필수 Stories**:

1. **Interactive**: Shadow 레벨 조절
2. **AllElevations**: 모든 shadow 레벨
3. **LayerConcept**: Layer 개념 설명 (Card < Dropdown < Modal)
4. **WithZIndex**: elevation + z-index 조합

**Demo 컴포넌트**:

```tsx
// ElevationDemo.tsx
- Shadow 레벨 시각화
- Layer 겹침 데모
- z-index 연동
```

---

### Rounded (Border Radius)

**필수 Stories**:

1. **Interactive**: Border radius 조절
2. **AllRounded**: 모든 rounded 옵션
3. **ComponentRounded**: 컴포넌트별 권장 값

**Demo 컴포넌트**:

```tsx
// RoundedDemo.tsx
- Border radius 시각화
- 다양한 크기 Box
```

---

### Responsive (Breakpoint)

**필수 Stories**:

1. **Breakpoints**: 모든 breakpoint 시각화
2. **ClampSizeDemo**: clampSize 계산 예시
3. **ResponsiveLayout**: 반응형 레이아웃 패턴
4. **BestPractices**: 체크리스트

**Demo 컴포넌트**:

```tsx
// ResponsiveDemo.tsx
- 현재 breakpoint 표시
- Viewport 크기 실시간 표시
- clampSize 계산 결과
```

---

### ZIndex

**필수 Stories**:

1. **LayerStack**: z-index 계층 구조 시각화
2. **ComponentZIndex**: 컴포넌트별 권장 z-index
3. **InteractiveDemo**: 레이어 겹침 시뮬레이션

**Demo 컴포넌트**:

```tsx
// ZIndexDemo.tsx
- Layer 스택 시각화
- 레이어 순서 조절
- 겹침 데모
```

---

## 💡 작성 팁

### JSDoc 구조

1. **스케일 체계**: 기준, 범위, 수식
2. **사용 원칙**: 3-5개
3. **사용법**: CSS-in-JS, CSS 변수, Utility Class
4. **접근성**: WCAG 기준
5. **Best Practices**: Do's and Don'ts

### Story 개수

- **최소**: 2개 (Interactive + AllTokens)
- **권장**: 3-4개 (+ UsageCombinations + Accessibility)
- **최대**: 5개 이하 (너무 많으면 산만)

### Demo 컴포넌트

- 파일명: `[TokenName]Demo.tsx`
- Interactive controls 지원
- 시각적 피드백 제공
- Click-to-copy 기능

### 레이아웃

- Foundation은 `layout: 'padded'` 우선
- 넓은 영역 필요 시 `layout: 'fullscreen'`

---

## 📊 체크리스트

- [ ] JSDoc 주석 완성 (스케일, 원칙, 사용법, 접근성, Best Practices)
- [ ] Interactive Story 구현
- [ ] AllTokens Story 구현
- [ ] UsageCombinations Story 구현 (선택)
- [ ] AccessibilityDemo Story 구현 (색상의 경우 필수)
- [ ] Demo 컴포넌트 작성
- [ ] Click-to-copy 기능 추가
- [ ] 접근성 가이드 포함 (WCAG)

---

## 📚 참고 자료

- **Gold Standard 예시**:
  - `src/stories/Colors/Colors.stories.tsx`
  - `src/stories/Spacing/Spacing.stories.tsx`

- **체크리스트**: `docs/COMPONENT_CHECKLIST.md`
- **Foundation 가이드**: `docs/TOKEN_GUIDE.md`
