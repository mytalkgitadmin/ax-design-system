# 🎨 토큰 사용 가이드

> 작성일: 2025-12-23
> 목적: Primitive vs Semantic vs Brand 토큰 사용 시점 명확화

---

## 📖 목차

1. [토큰 개요](#토큰-개요)
2. [Primitive 색상](#primitive-색상)
3. [Semantic 색상](#semantic-색상)
4. [Brand 색상](#brand-색상)
5. [언제 무엇을 사용할까?](#언제-무엇을-사용할까)
6. [실전 예제](#실전-예제)

---

## 토큰 개요

디자인 시스템은 3가지 종류의 색상 토큰을 제공합니다:

```
📦 Primitive 색상 (color.gray, color.blue, ...)
   ↓ 참조
📦 Semantic 색상 (color.bg, color.text, color.border, ...)
   ↓ 참조
📦 Brand 색상 (theme.brand)
```

### 핵심 원칙

```typescript
// ✅ 권장: Semantic 색상 사용 (의미 기반)
background: color.bg.subtle

// ⚠️ 비권장: Primitive 색상 직접 사용 (값 기반)
background: color.gray[50]
```

**왜 Semantic을 사용해야 하나요?**
- ✅ **일관성**: 모든 컴포넌트가 동일한 의미를 사용
- ✅ **유지보수**: `color.gray[50]`을 `color.gray[100]`으로 변경하려면 모든 파일 수정 필요
- ✅ **확장성**: Theme 시스템과 호환
- ✅ **가독성**: `color.bg.subtle`이 `color.gray[50]`보다 의도가 명확

---

## Primitive 색상

### 정의
50-950까지의 단계별 색상 팔레트입니다.

### 제공 색상
```typescript
color.gray[50]    // #f8f9fc (가장 밝음)
color.gray[100]   // #f4f6fb
color.gray[200]   // #edf0f5
...
color.gray[900]   // #2f3744
color.gray[950]   // #171c24 (가장 어두움)

color.blue[50~950]
color.red[50~950]
color.green[50~950]
color.pink[50~950]
color.indigo[50~950]
color.yellow[50~950]
```

### 언제 사용하나?

#### ✅ 사용해야 하는 경우

**1. Semantic 색상으로 표현할 수 없는 특수한 경우**
```typescript
// 예: 차트 데이터 포인트 색상
const chartColors = [
  color.blue[500],
  color.green[500],
  color.yellow[500],
  color.pink[500],
];
```

**2. 일시적인 프로토타이핑**
```typescript
// 프로토타입에서 빠르게 테스트
<div style={{ background: color.blue[100] }}>
  임시 배경
</div>
```

#### ❌ 사용하지 말아야 하는 경우

**1. 컴포넌트 기본 스타일**
```typescript
// ❌ 나쁜 예
const Card = () => (
  <div style={{
    background: color.gray[50],
    border: `1px solid ${color.gray[300]}`,
    color: color.gray[900]
  }}>
    ...
  </div>
);

// ✅ 좋은 예
const Card = () => (
  <div style={{
    background: color.bg.subtle,
    border: `1px solid ${color.border.default}`,
    color: color.text.primary
  }}>
    ...
  </div>
);
```

---

## Semantic 색상

### 정의
용도(배경, 텍스트, 테두리 등)에 따라 정의된 의미 기반 색상입니다.

### 제공 색상 카테고리

#### 1. Background (`color.bg`)
```typescript
color.bg.default      // #ffffff - 기본 배경 (흰색)
color.bg.subtle       // #f8f9fc - 은은한 배경 (페이지 전체)
color.bg.muted        // #f4f6fb - 희미한 배경
color.bg.disabled     // #e3e6ee - 비활성화 배경
color.bg.inverse      // #2f3744 - 반전 배경 (다크)
color.bg.gray         // #edf0f5 - 회색 배경
color.bg.grayStrong   // #e3e6ee - 강조 회색 배경
color.bg.grayStrongest // #c5c9d3 - 가장 진한 회색 배경
color.bg.dim          // rgba(0,0,0,0.64) - 딤 처리 (모달 오버레이)
```

#### 2. Border (`color.border`)
```typescript
color.border.default        // #e3e6ee - 기본 테두리
color.border.strong         // #c5c9d3 - 강조 테두리
color.border.disabled       // #e3e6ee - 비활성화 테두리
color.border.inverse        // #ffffff - 반전 테두리
color.border.thumbnail      // rgba(0,0,0,0.08) - 썸네일 테두리

// 상태별 테두리
color.border.negativeSoft   // #ffc5cd - 연한 에러
color.border.negativeStrong // #e6374f - 진한 에러
color.border.positiveSoft   // #c0eed0 - 연한 성공
color.border.positiveStrong // #1fa45c - 진한 성공
color.border.warningSoft    // #ffedb8 - 연한 경고
color.border.warningStrong  // #ffb020 - 진한 경고
```

#### 3. Divider (`color.divider`)
```typescript
color.divider.default  // #edf0f5 - 기본 구분선
color.divider.soft     // #f4f6fb - 연한 구분선
color.divider.strong   // #e3e6ee - 진한 구분선
color.divider.inverse  // #ffffff - 반전 구분선
```

#### 4. Text (`color.text`)
```typescript
color.text.primary    // #2f3744 - 주요 텍스트 (제목, 헤더)
color.text.secondary  // #697180 - 부차 텍스트 (본문)
color.text.tertiary   // #888e9c - 3차 텍스트 (라벨)
color.text.muted      // #a6acb7 - 희미한 텍스트 (메타 정보)
color.text.disabled   // #c5c9d3 - 비활성화 텍스트
color.text.inverse    // #ffffff - 반전 텍스트
color.text.link       // #355fea - 링크

// 상태별 텍스트
color.text.negative   // #e6374f - 에러 메시지
color.text.positive   // #1fa45c - 성공 메시지
color.text.warning    // #ffb020 - 경고 메시지
```

#### 5. Icon (`color.icon`)
```typescript
color.icon.primary    // #4b5465 - 주요 아이콘
color.icon.secondary  // #888e9c - 부차 아이콘
color.icon.fill       // #e3e6ee - 채우기 아이콘
color.icon.disabled   // #c5c9d3 - 비활성화 아이콘
color.icon.muted      // #a6acb7 - 희미한 아이콘
color.icon.inverse    // #ffffff - 반전 아이콘

// 상태별 아이콘
color.icon.negative     // #e6374f - 에러 아이콘
color.icon.negativeSoft // #ffe3e6 - 연한 에러 배경
color.icon.positive     // #1fa45c - 성공 아이콘
color.icon.positiveSoft // #e0f7e6 - 연한 성공 배경
color.icon.warning      // #ffb020 - 경고 아이콘
color.icon.warningSoft  // #fff6df - 연한 경고 배경
```

### 언제 사용하나?

#### ✅ 항상 사용해야 하는 경우

**1. 컴포넌트 기본 스타일**
```typescript
const Button = () => (
  <button style={{
    background: color.bg.default,
    border: `1px solid ${color.border.default}`,
    color: color.text.primary
  }}>
    버튼
  </button>
);
```

**2. 레이아웃 배경**
```typescript
const Layout = () => (
  <div style={{ background: color.bg.subtle }}>
    <header style={{ borderBottom: `1px solid ${color.divider.default}` }}>
      헤더
    </header>
  </div>
);
```

**3. 상태 표시**
```typescript
const ErrorMessage = ({ children }) => (
  <p style={{ color: color.text.negative }}>
    {children}
  </p>
);
```

---

## Brand 색상

### 정의
브랜드를 나타내는 주요 색상입니다. Theme 시스템을 통해 프로젝트별로 변경 가능합니다.

### 제공 색상
```typescript
theme.brand.default   // #4f7cff - 기본 브랜드 색상
theme.brand.subtle    // #6f94ff - 연한 브랜드
theme.brand.strong    // #355fea - 강한 브랜드
theme.brand.stronger  // #2747be - 더 강한 브랜드
theme.brand.strongest // #1a318b - 가장 강한 브랜드
```

### 언제 사용하나?

#### ✅ 사용해야 하는 경우

**1. Primary 버튼**
```typescript
const PrimaryButton = () => (
  <button style={{
    background: theme.brand.default,
    color: color.text.inverse
  }}>
    Primary 버튼
  </button>
);
```

**2. 강조 요소**
```typescript
const Badge = () => (
  <span style={{
    background: theme.brand.subtle,
    color: theme.brand.strongest
  }}>
    NEW
  </span>
);
```

**3. 링크 (선택적)**
```typescript
// Option 1: Brand 색상 사용
<a style={{ color: theme.brand.default }}>링크</a>

// Option 2: Semantic 색상 사용 (권장)
<a style={{ color: color.text.link }}>링크</a>
```

---

## 언제 무엇을 사용할까?

### 의사결정 플로우차트

```
색상을 선택해야 한다면?
  ↓
① 브랜드를 강조하는 요소인가? (Primary 버튼, Badge 등)
  → YES: theme.brand 사용
  → NO: ②로

② Semantic 색상으로 표현 가능한가?
  → YES: color.bg / color.text / color.border 등 사용
  → NO: ③로

③ 차트, 그래프 등 특수한 용도인가?
  → YES: Primitive 색상(color.blue[500]) 사용
  → NO: 다시 ②로 돌아가서 재검토
```

### 빠른 참조 테이블

| 용도 | 사용할 토큰 | 예시 |
|------|------------|------|
| 페이지 배경 | `color.bg.subtle` | `#f8f9fc` |
| 카드 배경 | `color.bg.default` | `#ffffff` |
| 비활성화 배경 | `color.bg.disabled` | `#e3e6ee` |
| 제목 텍스트 | `color.text.primary` | `#2f3744` |
| 본문 텍스트 | `color.text.secondary` | `#697180` |
| 라벨 텍스트 | `color.text.tertiary` | `#888e9c` |
| 기본 테두리 | `color.border.default` | `#e3e6ee` |
| 강조 테두리 | `color.border.strong` | `#c5c9d3` |
| 구분선 | `color.divider.default` | `#edf0f5` |
| Primary 버튼 | `theme.brand.default` | `#4f7cff` |
| 에러 메시지 | `color.text.negative` | `#e6374f` |
| 성공 메시지 | `color.text.positive` | `#1fa45c` |

---

## 실전 예제

### 예제 1: 카드 컴포넌트

```typescript
// ❌ 나쁜 예: Primitive 색상 직접 사용
const Card = () => (
  <div style={{
    background: color.gray[50],      // ❌
    border: `1px solid ${color.gray[300]}`,  // ❌
    borderRadius: '12px',
  }}>
    <h3 style={{ color: color.gray[900] }}>제목</h3>  {/* ❌ */}
    <p style={{ color: color.gray[700] }}>본문</p>   {/* ❌ */}
  </div>
);

// ✅ 좋은 예: Semantic 색상 사용
const Card = () => (
  <div style={{
    background: color.bg.default,           // ✅
    border: `1px solid ${color.border.default}`,  // ✅
    borderRadius: '12px',
  }}>
    <h3 style={{ color: color.text.primary }}>제목</h3>    // ✅
    <p style={{ color: color.text.secondary }}>본문</p>    // ✅
  </div>
);
```

### 예제 2: 버튼 컴포넌트

```typescript
// ✅ Primary 버튼: Brand 색상 사용
const PrimaryButton = () => (
  <button style={{
    background: theme.brand.default,     // ✅ Brand
    color: color.text.inverse,           // ✅ Semantic
    border: 'none',
    padding: '12px 24px',
  }}>
    Primary 버튼
  </button>
);

// ✅ Secondary 버튼: Semantic 색상 사용
const SecondaryButton = () => (
  <button style={{
    background: color.bg.gray,           // ✅ Semantic
    color: color.text.secondary,         // ✅ Semantic
    border: `1px solid ${color.border.default}`,  // ✅ Semantic
    padding: '12px 24px',
  }}>
    Secondary 버튼
  </button>
);
```

### 예제 3: 알림 배너

```typescript
// ✅ 에러 알림
const ErrorBanner = ({ message }) => (
  <div style={{
    background: color.bg.default,
    border: `1px solid ${color.border.negativeStrong}`,  // ✅
    borderLeft: `4px solid ${color.border.negativeStrong}`,
    padding: '16px',
  }}>
    <p style={{ color: color.text.negative }}>  {/* ✅ */}
      {message}
    </p>
  </div>
);

// ✅ 성공 알림
const SuccessBanner = ({ message }) => (
  <div style={{
    background: color.bg.default,
    border: `1px solid ${color.border.positiveStrong}`,  // ✅
    borderLeft: `4px solid ${color.border.positiveStrong}`,
    padding: '16px',
  }}>
    <p style={{ color: color.text.positive }}>  {/* ✅ */}
      {message}
    </p>
  </div>
);
```

### 예제 4: 차트 색상 (Primitive 사용 예외)

```typescript
// ✅ 차트는 Primitive 색상 직접 사용 가능
const ChartComponent = () => {
  const chartData = [
    { label: '매출', value: 100, color: color.blue[500] },    // ✅
    { label: '비용', value: 80, color: color.red[500] },      // ✅
    { label: '이익', value: 20, color: color.green[500] },    // ✅
  ];

  return <Chart data={chartData} />;
};
```

---

## 📚 관련 문서

- [Theme Architecture](./THEME_ARCHITECTURE.md) - Theme 시스템 구조
- [Auto-Generated Tokens](../src/tokens/Auto-Generated-Tokens.md) - 자동 생성 토큰
- [Dev Tokens](../src/tokens/Dev-Tokens.md) - 수동 관리 토큰

---

## ✅ 체크리스트

새로운 컴포넌트를 만들 때 이 체크리스트를 확인하세요:

- [ ] 배경 색상은 `color.bg.*`를 사용했나?
- [ ] 텍스트 색상은 `color.text.*`를 사용했나?
- [ ] 테두리 색상은 `color.border.*`를 사용했나?
- [ ] 구분선은 `color.divider.*`를 사용했나?
- [ ] Primary 액션은 `theme.brand.*`를 사용했나?
- [ ] Primitive 색상을 직접 사용했다면 정당한 이유가 있나?

---

**최종 수정일**: 2025-12-23
