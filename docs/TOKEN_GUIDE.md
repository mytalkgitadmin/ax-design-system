# 🎨 토큰 시스템 통합 가이드

> **디자인 시스템의 토큰 관리 규칙과 구조를 정의하는 종합 문서**

---

## 📚 목차

1. [디자인 시스템 반응형 철학](#-디자인-시스템-반응형-철학)
2. [토큰 시스템 개요](#-토큰-시스템-개요)
3. [핵심 개념](#-핵심-개념)
   - [구조 토큰 vs 감성 토큰](#-구조-토큰-vs-감성-토큰)
   - [ComponentSize vs Typography.responsive](#-componentsize-vs-typographyresponsive)
4. [디렉토리 구조](#-디렉토리-구조)
5. [토큰 계층 구조](#-토큰-계층-구조)
6. [토큰 관리 규칙](#-토큰-관리-규칙)
   - [Foundation 토큰 규칙](#-foundation-토큰-규칙)
   - [Semantic 토큰 규칙](#-semantic-토큰-규칙)
   - [Component Size 토큰 규칙](#-component-size-토큰-규칙)
7. [빌드 프로세스](#-빌드-프로세스)
8. [토큰 사용 방법](#-토큰-사용-방법)
9. [토큰 추가/수정 체크리스트](#-토큰-추가수정-체크리스트)
10. [절대 금지 사항](#-절대-금지-사항)
11. [토큰 카테고리별 출처 정리](#️-토큰-카테고리별-출처-정리)

---

## 🎯 디자인 시스템 반응형 철학

> **핵심 원칙: 레이아웃은 바꾸지 말고, 비율만 바꾼다.**

```
구조(Layout)는 공통이다
  → 모든 브랜드가 동일한 컴포넌트 구조와 높이를 공유

감성(비율, 크기감)만 브랜드별로 조정한다
  → fontSize, clamp 값 등으로 브랜드 개성 표현

이유:
  ✅ 일관된 사용자 경험
  ✅ 유지보수 비용 최소화
  ✅ 브랜드 전환 시 레이아웃 깨짐 방지
```

---

## 🎯 토큰 시스템 개요

### 핵심 원칙

```
1. Single Source of Truth (단일 출처)
   → 모든 디자인 값은 토큰으로 정의하고, 중복 정의 금지

2. Figma First (디자인 우선)
   → 색상, 폰트, 기본 spacing은 Figma에서 관리

3. Developer Extension (개발자 확장)
   → Figma에 없는 개발 편의 토큰은 dev/에서 수동 관리

4. Automated Build (자동화)
   → 토큰 JSON → TypeScript/CSS 변환은 자동화
```

---

## 💡 핵심 개념

> **토큰 시스템을 올바르게 사용하기 위해 반드시 이해해야 할 핵심 개념**

---

### 📘 구조 토큰 vs 감성 토큰

> **"깨지면 구조, 안 깨지면 감성이다."**

#### 브랜드 감성 토큰이란?

브랜드 감성 토큰은:
- ✅ 레이아웃과 구조에는 영향을 주지 않으며
- ✅ 브랜드별 시각적 인상과 톤을 조절하기 위한 값이다

**대표 예시:**
- 반응형 typography (clamp 값)
- 브랜드 컬러 (primary, secondary)
- tone에 따른 radius, contrast

#### 구조 vs 감성 비교표

| 구분 | 정의 | 예시 | 브랜드별 변경 |
|------|------|------|--------------|
| **구조 토큰** | 레이아웃, 크기, 간격 스케일 등 물리적 구조 | `componentSize.md.height`, `spacing` 스케일 자체 (0,4,8...) | ❌ 금지 (레이아웃 깨짐) |
| **감성 토큰** | 색상, 폰트 크기감, 곡률, 간격 선택 등 시각적 인상 | `brand1.default`, `typography.responsive.body`, 어떤 spacing 사용 | ✅ 허용 (브랜드 개성) |

**왜 중요한가?**
- 구조 토큰을 브랜드별로 바꾸면 → 레이아웃 깨짐, 유지보수 불가
- 감성 토큰만 조정하면 → 일관된 UX + 브랜드 개성 표현

**⚠️ Spacing의 특수성:**
```
spacing scale (0, 4, 8, 12, 16...) → 구조 토큰 (변경 금지)
어떤 spacing 단계를 사용하는지 → 감성 토큰 (브랜드별 선택 가능)

예시:
- 모든 브랜드: spacing.4, spacing.8 사용 가능 (공통 스케일)
- Brand A: 여유로운 느낌 → spacing.16 선호
- Brand B: 밀도 높은 느낌 → spacing.8 선호
```

spacing 값 자체는 foundation 구조 토큰이지만,
어떤 spacing 단계를 사용하는지는 브랜드 감성에 해당한다.

#### Semantic vs Brand 토큰

```
design/semantic/
├─ colors.json        # UI 의미 (bg, border, text, icon)
└─ brands.json        # 브랜드 아이덴티티 (brand1, brand2)
```

**brands.json은:**
- semantic의 하위 개념
- '제품 브랜드 컨텍스트'를 나타내는 토큰
- UI 의미가 아닌, 브랜드 감성을 표현

**⚠️ brands.json의 책임 범위:**

brands.json은 **색상 중심의 브랜드 아이덴티티만** 담당하며,
레이아웃, spacing, componentSize는 포함하지 않는다.

```
✅ brands.json에 포함:
- brand1.default (브랜드 주 색상)
- brand1.hover, brand1.active
- brand2.default, brand2.light, brand2.dark

❌ brands.json에 포함하지 않음:
- spacing (브랜드별 간격 변경 ❌)
- componentSize (브랜드별 높이 변경 ❌)
- breakpoint (브랜드별 반응형 기준 변경 ❌)
```

---

### ⚠️ ComponentSize vs Typography.responsive

**충돌 방지를 위한 명확한 역할 분리**

#### 사용 규칙

| 토큰 | 용도 | 예시 컴포넌트 |
|------|------|---------------|
| `componentSize.fontSize` | **인터랙티브 컴포넌트 전용** | Button, Input, Select, Checkbox |
| `typography.responsive.*` | **텍스트 콘텐츠 전용** | Text, Paragraph, Heading, Label |

#### 코드 예시

```typescript
// ✅ Button - componentSize 사용
import { componentSize } from '@/tokens';
fontSize: componentSize.md.fontSize;  // 14px (고정값)

// ✅ Text 컴포넌트 - typography.responsive 사용
import { typography } from '@/theme';
fontSize: typography.responsive.body;  // clamp(14px, 1vw, 16px)

// ❌ 절대 금지: Button에 responsive typography 사용
fontSize: typography.responsive.body;  // 레이아웃 깨짐!

// ❌ 절대 금지: Text에 componentSize 사용
fontSize: componentSize.md.fontSize;  // 반응형 동작 안 됨!
```

**왜 분리해야 하나요?**
- **인터랙티브 컴포넌트**: 높이와 fontSize가 물리적으로 강하게 결합됨 (구조)
- **텍스트 콘텐츠**: 유동적인 크기 조정이 필요함 (감성)

---

## 📁 디렉토리 구조

```
src/
├─ figma/                             # Figma 원본 파일 (Git 무시)
│  ├─ tokens.json                    # 🤖 Figma Tokens Studio가 GitHub에 푸시
│  └─ icon/                          # SVG 아이콘 원본 파일
│
├─ tokens/
│  ├─ design/                         # 🤖 자동생성 (수정 금지)
│  │  ├─ primitives/
│  │  │  ├─ color.json               # Figma 색상 토큰
│  │  │  ├─ font.json                # Figma 폰트 토큰
│  │  │  ├─ number.json              # Figma 숫자 값
│  │  │  └─ rounded.json             # Figma 라운드 값
│  │  └─ semantic/
│  │     ├─ colors.json              # 시맨틱 색상 (bg, border, text 등)
│  │     └─ brands.json              # 브랜드 색상 (brand1, brand2)
│  │
│  ├─ dev/                            # ✏️ 수동 관리 (개발자)
│  │  ├─ primitives/
│  │  │  ├─ breakpoints.json         # 반응형 breakpoint
│  │  │  ├─ componentSizes.json      # ⭐ height, fontSize, iconSize 세트
│  │  │  ├─ spacing.json             # 여백 스케일
│  │  │  ├─ typography.json          # 타이포그래피
│  │  │  └─ zIndex.json              # Z-Index
│  │  ├─ semantic/
│  │  │  └─ typography.base.json     # ⭐ 공통 반응형 타이포그래피 (default clamp)
│  │  ├─ helpers/
│  │  │  ├─ spacing.ts               # spacing 유틸리티 함수
│  │  │  ├─ typography.ts            # typography 프리셋
│  │  │  └─ typography.css.ts        # Vanilla Extract 스타일
│  │  └─ utils/
│  │     ├─ rounded.global.css.ts    # HTML 클래스: .rounded-md
│  │     ├─ spacing.global.css.ts    # HTML 클래스: .m-4, .p-8
│  │     ├─ typography.global.css.ts # HTML 클래스: .text-lg
│  │     └─ zIndex.global.css.ts     # HTML 클래스: .z-modal
│  │
│  ├─ index.ts                        # 🤖 자동생성 (수정 금지!)
│  ├─ variables.css                   # 🤖 자동생성 (CSS 변수)
│  │
│  ├─ Auto-Generated-Tokens.md        # 자동생성 토큰 문서
│  └─ Dev-Tokens.md                   # 수동관리 토큰 문서
│
└─ docs/
   ├─ TOKEN_GUIDE.md                  # 📖 이 문서
   ├─ COMPONENT_DEVELOPMENT_GUIDE.md  # 컴포넌트 개발 가이드
   └─ ICON_COMPONENT.md               # 아이콘 컴포넌트 가이드
```

---

## 🏗️ 토큰 계층 구조

### 3단계 토큰 시스템

```
1️⃣ Foundation (기초 토큰)
   ↓
2️⃣ Semantic (의미 토큰)
   ↓
3️⃣ Component (컴포넌트 토큰)
```

---

### 1️⃣ Foundation (Primitives)

**정의:** 가장 기본이 되는 원시 값

| 토큰              | 출처   | 파일 위치                      | 예시                            |
| ----------------- | ------ | ------------------------------ | ------------------------------- |
| `color`           | Figma  | design/primitives/color.json   | `gray.500`, `blue.600`          |
| `font`            | Figma  | design/primitives/font.json    | `family.Pretendard`, `weight.semibold` |
| `number`          | Figma  | design/primitives/number.json  | `4`, `8`, `12`, `16`, ...       |
| `rounded`         | Figma  | design/primitives/rounded.json | `sm: 8`, `md: 12`, `lg: 16`     |
| `breakpoint`      | 개발자 | dev/primitives/breakpoints.json| `sm: 640`, `md: 768`, `lg: 1024`|
| `componentSize`   | 개발자 | dev/primitives/componentSizes.json | `md: {height:44, fontSize:14, iconSize:20}` |
| `spacing`         | 개발자 | dev/primitives/spacing.json    | `0`, `4`, `8`, `12`, ...        |
| `zIndex`          | 개발자 | dev/primitives/zIndex.json     | `modal: 1400`, `tooltip: 1800`  |

**특징:**
- ✅ 컨텍스트 없는 순수 값 (예: `blue.600` = `#4f7cff`)
- ✅ 다른 토큰에서 참조 가능
- ❌ 직접 컴포넌트에서 사용 지양

---

### 2️⃣ Semantic (시맨틱 토큰)

**정의:** 사용 목적과 역할이 부여된 토큰

| 토큰              | 출처   | 파일 위치                      | 참조 예시                       |
| ----------------- | ------ | ------------------------------ | ------------------------------- |
| `bg`              | Figma  | design/semantic/colors.json    | `bg.default` → `{color.base.white}` |
| `border`          | Figma  | design/semantic/colors.json    | `border.default` → `{color.gray.300}` |
| `text`            | Figma  | design/semantic/colors.json    | `text.primary` → `{color.gray.900}` |
| `icon`            | Figma  | design/semantic/colors.json    | `icon.primary` → `{color.gray.800}` |
| `brand1`, `brand2`| Figma  | design/semantic/brands.json    | `brand1.default` → `{color.blue.600}` |
| `typography.base` | 개발자 | dev/semantic/typography.base.json | `fontSize.body` → `clamp(14px, 1vw, 16px)` |

**특징:**
- ✅ "용도"를 나타내는 이름 (예: `bg.default`, `text.primary`)
- ✅ Foundation 토큰 참조 (예: `{color.gray.300}`)
- ✅ 브랜드별 테마 변경 시 여기만 수정
- ✅ 컴포넌트에서 **권장하는 사용 방식**

---

### 3️⃣ Component (컴포넌트 토큰)

**정의:** 특정 컴포넌트의 기본 동작과 스타일 정책

**위치:** `src/theme/components/*` (토큰 아님, Theme 시스템)

```typescript
// src/theme/components/button.ts
export const buttonTheme = {
  defaultSize: 'md',           // componentSize 참조
  defaultVariant: 'solid',
  radius: undefined,           // global.radius.sm 사용
  colorSchemes: {
    primary: {
      default: '#4f7cff',      // brand1.default
      hover: '#2747be',
      active: '#1a318b',
      text: '#ffffff',
    },
  },
};
```

**특징:**
- ✅ Foundation + Semantic 조합
- ✅ 컴포넌트별 기본값 정의
- ✅ 브랜드별 override 가능 (`src/theme/brands/*`)

---

## 📏 토큰 관리 규칙

### 🟢 Foundation 토큰 규칙

#### 1. Figma 토큰 (design/primitives/)

**관리 주체:** 디자이너 (Figma Tokens 플러그인)

**수정 프로세스:**
```
Figma에서 토큰 수정
    ↓
Figma Tokens 플러그인에서 Export
    ↓
figma/tokens.json 업데이트
    ↓
npm run build:tokens
```

**절대 금지:**
- ❌ `design/` 폴더 직접 수정 (자동생성됨)
- ❌ Figma 없이 JSON만 수정 (동기화 깨짐)

---

#### 2. 개발자 토큰 (dev/primitives/)

**관리 주체:** 개발자 (수동)

**추가 기준:**
```
✅ 추가해야 하는 경우:
  - Figma에 없는 개발 편의 토큰 (breakpoint, zIndex)
  - 컴포넌트 간 공유 토큰 (componentSize)

❌ 추가하지 말아야 하는 경우:
  - Figma에 이미 있는 값 (색상, 폰트 등)
  - 일회성 값 (컴포넌트에 하드코딩하는 게 나음)
```

**파일 생성 규칙:**

```json
// dev/primitives/example.json
{
  "tokenName": {
    "variant": {
      "value": "실제값",
      "type": "토큰타입",        // color, sizing, fontSize, number 등
      "description": "설명"      // 선택사항
    }
  }
}
```

**예시:**
```json
{
  "breakpoint": {
    "sm": {
      "value": "640",
      "type": "number"
    },
    "md": {
      "value": "768",
      "type": "number"
    }
  }
}
```

---

### 🟡 Semantic 토큰 규칙

> 💡 **핵심 개념은 [구조 토큰 vs 감성 토큰](#-구조-토큰-vs-감성-토큰) 섹션을 참고하세요**

#### Figma Semantic (design/semantic/)

**자동생성됨.** Figma에서 관리.

---

#### 개발자 Semantic (dev/semantic/)

**용도:** 반응형 타이포그래피 등 Figma에 없는 시맨틱 토큰

> **⚠️ 중요: Clamp 값은 브랜드 감성이다**
> - `typography.base.json`은 공통 기본값만 정의
> - 브랜드별 감성 차이는 `src/theme/brands/`에서 override

**구조:**
```
dev/semantic/
└─ typography.base.json        # 공통 default clamp

src/theme/brands/
├─ brandA.typography.json      # brandA override
└─ brandB.typography.json      # brandB override

src/theme/
└─ typography 합성 로직 (merge)
```

**예시:**
```json
// dev/semantic/typography.base.json
{
  "typography": {
    "responsive": {
      "body": {
        "value": "clamp(14px, 1vw, 16px)",
        "type": "fontSize",
        "description": "공통 기본 반응형 본문 폰트"
      },
      "title": {
        "value": "clamp(20px, 2vw, 26px)",
        "type": "fontSize",
        "description": "공통 기본 반응형 제목 폰트"
      }
    }
  }
}
```

**브랜드별 override:**
```typescript
// src/theme/brands/brandA.typography.ts
export const brandATypography = {
  responsive: {
    body: 'clamp(15px, 1.2vw, 18px)',    // brandA는 더 크게
    title: 'clamp(22px, 2.2vw, 28px)',
  }
};

// src/theme/typography.ts (합성)
import { baseTypography } from '../tokens/dev/semantic/typography.base';
import { brandATypography } from './brands/brandA.typography';

export const typography = {
  ...baseTypography,
  ...brandATypography,  // 브랜드별 override
};
```

**이렇게 하면:**
- ✅ "왜 typography는 semantic인데 브랜드별이야?" 같은 질문 사라짐
- ✅ 토큰 레벨: 공통 시맨틱
- ✅ 테마 레벨: 브랜드 감성 차이

**💡 왜 typography는 토큰인데 theme에서 override하나요?**

`typography.base`는 토큰이지만, 브랜드별 typography는 **디자인 정책의 영역**이므로 theme 레벨에서 합성한다.

- 토큰: 기술적 값 정의 (clamp 문법, px 단위)
- 테마: 디자인 의사결정 (브랜드 감성, 사용 맥락)

---

### 🔷 Component Size 토큰 규칙

> 💡 **사용 규칙은 [ComponentSize vs Typography.responsive](#-componentsize-vs-typographyresponsive) 섹션을 참고하세요**

#### 핵심 원칙: Height, FontSize, IconSize는 하나의 세트

> **Button, Input 등 인터랙티브 컴포넌트의 size는 반드시 3가지 값을 함께 정의**

#### 토큰 정의

```json
// dev/primitives/componentSizes.json
{
  "componentSize": {
    "xs": {
      "height": { "value": "26", "type": "sizing" },
      "fontSize": { "value": "12", "type": "fontSize" },
      "iconSize": { "value": "14", "type": "sizing" }
    },
    "sm": {
      "height": { "value": "32", "type": "sizing" },
      "fontSize": { "value": "12", "type": "fontSize" },
      "iconSize": { "value": "16", "type": "sizing" }
    },
    "md": {
      "height": { "value": "44", "type": "sizing" },
      "fontSize": { "value": "14", "type": "fontSize" },
      "iconSize": { "value": "20", "type": "sizing" }
    },
    "lg": {
      "height": { "value": "56", "type": "sizing" },
      "fontSize": { "value": "16", "type": "fontSize" },
      "iconSize": { "value": "24", "type": "sizing" }
    },
    "xl": {
      "height": { "value": "64", "type": "sizing" },
      "fontSize": { "value": "16", "type": "fontSize" },
      "iconSize": { "value": "24", "type": "sizing" }
    }
  }
}
```

---

### 비율 가이드

| Size | Height | FontSize | IconSize | fontSize 비율 | iconSize 비율 |
| ---- | ------ | -------- | -------- | ------------- | ------------- |
| `xs` | 26px   | 12px     | 14px     | 46%           | 53%           |
| `sm` | 32px   | 12px     | 16px     | 37.5%         | 50%           |
| `md` | 44px   | 14px     | 20px     | 31.8%         | 45.5%         |
| `lg` | 56px   | 16px     | 24px     | 28.6%         | 42.9%         |
| `xl` | 64px   | 16px     | 24px     | 25%           | 37.5%         |

**권장 비율:**
- fontSize: height의 **28~35%**
- iconSize: height의 **38~50%**

---

### 사용 예시

```typescript
// src/stories/Button/Button.css.ts
import { componentSize } from '../../tokens';

export const buttonStyle = recipe({
  variants: {
    size: {
      md: {
        height: `${componentSize.md.height}px`,
        fontSize: `${componentSize.md.fontSize}px`,
      },
    },
  },
});

// src/stories/Button/index.tsx
import { componentSize } from '../../tokens';

export const Button = ({ size = 'md', leftIcon }) => {
  const iconSize = componentSize[size].iconSize;

  return (
    <button>
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {label}
    </button>
  );
};
```

---

### 절대 금지 사항

```typescript
// ❌ 절대 금지: 컴포넌트에서 하드코딩
const iconSize = { md: 20 };

// ❌ 절대 금지: 따로 따로 정의
{ "height": { "md": 44 } }
{ "fontSize": { "md": 14 } }  // 다른 파일

// ❌ 절대 금지: 브랜드별 height 변경 (레이아웃 깨짐)
brandA: { componentSize: { md: { height: 48 } } }

// ✅ 올바른 방법: 토큰 사용
import { componentSize } from '../../tokens';
const iconSize = componentSize[size].iconSize;

// ✅ 올바른 방법: 한 곳에서 세트로 정의
{
  "componentSize": {
    "md": {
      "height": 44,
      "fontSize": 14,
      "iconSize": 20
    }
  }
}

// ✅ 브랜드별 조정: fontSize만 (±1~2px 범위, 비율 준수 필수)
brandA: { customFontSize: { md: 15 } }  // height 44px 대비 34% (✅ 28~35% 범위 내)
```

**⚠️ 브랜드별 fontSize 조정 시 준수사항:**

```
1. fontSize 조정 허용 범위: ±1~2px
2. height 대비 비율 유지: 28~35% 범위 내
3. iconSize 함께 검토: fontSize 변경 시 iconSize 균형 확인

예시:
componentSize.md.height = 44px

✅ fontSize: 14px (31.8%) → 허용
✅ fontSize: 15px (34.1%) → 허용
❌ fontSize: 18px (40.9%) → 비율 초과, 레이아웃 깨짐
```

---

## 🔄 빌드 프로세스

### 자동화 파이프라인

```
1. Figma 디자이너 작업
   ↓
2. Figma Tokens 플러그인 Export
   ↓
3. figma/tokens.json 생성
   ↓
4. npm run build:tokens 실행
   ↓
5. scripts/build-tokens.js
   ├─ figma/tokens.json 파싱
   ├─ design/primitives/*.json 생성
   ├─ design/semantic/*.json 생성
   └─ npx style-dictionary build 실행
   ↓
6. Style Dictionary
   ├─ design/**/*.json + dev/**/*.json 읽기
   ├─ src/tokens/index.ts 생성 (TypeScript)
   └─ src/tokens/variables.css 생성 (CSS 변수)
```

---

### 빌드 명령어

```bash
# 토큰만 빌드
npm run build:tokens

# 토큰 + 컴포넌트 빌드
npm run build

# 타입 체크
npm run type-check
```

---

### 생성 결과물

#### index.ts (TypeScript)

```typescript
// src/tokens/index.ts (자동생성 - 수정 금지!)
export const color = {
  gray: { '50': '#f8f9fc', ... },
  blue: { '50': '#f9fbff', ... },
};

export const componentSize = {
  xs: { height: 26, fontSize: 12, iconSize: 14 },
  sm: { height: 32, fontSize: 12, iconSize: 16 },
  md: { height: 44, fontSize: 14, iconSize: 20 },
  lg: { height: 56, fontSize: 16, iconSize: 24 },
  xl: { height: 64, fontSize: 16, iconSize: 24 },
};

export const breakpoint = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};
```

---

#### variables.css (CSS 변수)

```css
/* src/tokens/variables.css (자동생성 - 수정 금지!) */
:root {
  /* Primitives */
  --gray-50: #f8f9fc;
  --blue-600: #4f7cff;

  /* Component Sizes */
  --component-size-md-height: 44;
  --component-size-md-font-size: 14;
  --component-size-md-icon-size: 20;

  /* Semantic */
  --bg-default: var(--base-white);
  --text-primary: var(--gray-900);

  /* Breakpoints */
  --breakpoint-sm: 640;
  --breakpoint-md: 768;
}
```

---

## 💻 토큰 사용 방법

### 1. TypeScript에서 사용

```typescript
import { color, componentSize, breakpoint } from '@/tokens';

// Primitive
const primaryColor = color.blue[600];  // '#4f7cff'

// Component Size
const buttonHeight = componentSize.md.height;      // 44
const buttonFontSize = componentSize.md.fontSize;  // 14
const buttonIconSize = componentSize.md.iconSize;  // 20

// Breakpoint
const mobileBreakpoint = breakpoint.sm;  // 640
```

---

### 2. CSS Variables로 사용

```css
.my-button {
  height: var(--component-size-md-height);
  font-size: var(--component-size-md-font-size);
  background-color: var(--blue-600);
}

/* ⚠️ 주의: Breakpoint는 CSS 변수 사용 제한적 */
@media (min-width: 768px) {  /* ✅ 권장: 하드코딩 */
  .my-button {
    height: var(--component-size-lg-height);
  }
}

/* ❌ 피해야 함: CSS spec 상 제한적 지원 */
@media (min-width: var(--breakpoint-md)) {
  /* Storybook, PostCSS 환경에서 깨질 수 있음 */
}
```

---

### ⚠️ Breakpoint 토큰 사용 가이드

**CSS media query에서 CSS 변수 사용은 제한적입니다.**

| 환경 | 권장 방법 | 예시 |
|------|----------|------|
| **순수 CSS** | 하드코딩 | `@media (min-width: 768px)` |
| **Vanilla Extract** | 토큰 임포트 | `import { breakpoint } from '@/tokens'` |
| **TypeScript/JS** | 토큰 사용 | `breakpoint.md` |

**권장 패턴:**
```typescript
// ✅ Vanilla Extract에서 사용
import { style } from '@vanilla-extract/css';
import { breakpoint } from '@/tokens';

export const button = style({
  '@media': {
    [`screen and (min-width: ${breakpoint.md}px)`]: {
      fontSize: '16px',
    },
  },
});

// ✅ TypeScript에서 사용
import { breakpoint } from '@/tokens';

export const mq = {
  sm: `@media (min-width: ${breakpoint.sm}px)`,
  md: `@media (min-width: ${breakpoint.md}px)`,
  lg: `@media (min-width: ${breakpoint.lg}px)`,
};
```

**주의사항:**
- ❌ CSS media query에서 `var(--breakpoint-md)` 사용 지양
- ✅ Build-time 상수로 사용 (Vanilla Extract, TypeScript)
- ✅ 순수 CSS 파일에서는 하드코딩 권장

---

### 3. Vanilla Extract에서 사용

```typescript
// Button.css.ts
import { style } from '@vanilla-extract/css';
import { componentSize, color } from '../../tokens';

export const button = style({
  height: `${componentSize.md.height}px`,
  fontSize: `${componentSize.md.fontSize}px`,
  backgroundColor: color.blue[600],
});
```

---

### 4. Theme에서 사용

```typescript
// src/theme/global/typography.ts
import { typography as tokenTypography } from '../../tokens';

export const typographyTheme = {
  fontFamily: 'Pretendard',
  fontSize: tokenTypography.fontSize,  // ← 토큰 재사용
  lineHeight: { tight: 1.2, normal: 1.5 },
};
```

---

## 📋 토큰 추가/수정 체크리스트

### 새 토큰 추가 전

- [ ] Figma 토큰에 이미 존재하는가? (`src/tokens/index.ts` 확인)
- [ ] CSS 변수로 대체 가능한가? (`src/tokens/variables.css` 확인)
- [ ] 여러 컴포넌트에서 재사용되는가? (한 곳에만 쓰이면 하드코딩 OK)

### Foundation 토큰 추가 시

- [ ] `dev/primitives/` 폴더에 JSON 파일 생성
- [ ] Style Dictionary 타입 지정 (`type: "color"`, `"sizing"` 등)
- [ ] `npm run build:tokens` 실행 후 `index.ts` 확인

### Component Size 토큰 추가/수정 시

- [ ] **height, fontSize, iconSize 세 값 모두 정의**
- [ ] 비율 확인 (fontSize ≈ height의 32%, iconSize ≈ height의 40%)
- [ ] 최소값 준수 (fontSize ≥ 12px, iconSize ≥ 14px)
- [ ] 터치 타겟 가이드라인 (height ≥ 32px 권장)

### Semantic 토큰 추가 시

- [ ] Foundation 토큰 참조 사용 (`{color.blue.600}` 형식)
- [ ] 시맨틱한 이름 사용 (`primary`, `default`, `hover` 등)
- [ ] 브랜드별 override 가능성 고려

### 빌드 및 검증

```bash
# 1. 토큰 JSON 수정
vim src/tokens/dev/primitives/componentSizes.json

# 2. 토큰 빌드
npm run build:tokens

# 3. TypeScript 타입 체크
npm run type-check

# 4. Storybook에서 시각적 확인
npm run storybook
```

---

## 🚫 절대 금지 사항

### ❌ 하면 안 되는 것들

1. **자동생성 파일 직접 수정**
   ```
   ❌ src/tokens/index.ts 수정
   ❌ src/tokens/variables.css 수정
   ❌ src/tokens/design/ 폴더 수정
   ```

2. **토큰 중복 정의**
   ```typescript
   ❌ const primaryColor = '#4f7cff';  // 토큰에 이미 있음
   ✅ import { color } from '@/tokens';
      const primaryColor = color.blue[600];
   ```

3. **컴포넌트에서 size 하드코딩**
   ```typescript
   ❌ const iconSize = { md: 20 };
   ✅ import { componentSize } from '@/tokens';
      const iconSize = componentSize[size].iconSize;
   ```

4. **브랜드별 구조 토큰 변경**
   ```typescript
   ❌ brandA: { componentSize: { md: { height: 48 } } }  // 레이아웃 깨짐
   ✅ brandA: { customFontSize: { md: 15 } }             // 감성만 조정
   ```

5. **Figma 토큰 우회**
   ```
   ❌ 색상을 dev/primitives/에 추가
   ✅ 디자이너에게 Figma 토큰 추가 요청
   ```

---

## 🗂️ 토큰 카테고리별 출처 정리

| 카테고리          | 출처   | 위치                          | 수정 방법            |
| ----------------- | ------ | ----------------------------- | -------------------- |
| 색상              | Figma  | design/primitives/color.json  | Figma에서 수정       |
| 폰트              | Figma  | design/primitives/font.json   | Figma에서 수정       |
| 라운드            | Figma  | design/primitives/rounded.json| Figma에서 수정       |
| 시맨틱 색상       | Figma  | design/semantic/colors.json   | Figma에서 수정       |
| 브랜드 색상       | Figma  | design/semantic/brands.json   | Figma에서 수정       |
| Breakpoint        | 개발자 | dev/primitives/breakpoints.json | JSON 직접 수정     |
| Component Size    | 개발자 | dev/primitives/componentSizes.json | JSON 직접 수정  |
| Spacing           | 개발자 | dev/primitives/spacing.json   | JSON 직접 수정       |
| Typography        | 개발자 | dev/primitives/typography.json| JSON 직접 수정       |
| Z-Index           | 개발자 | dev/primitives/zIndex.json    | JSON 직접 수정       |
| 반응형 Typography (Base) | 개발자 | dev/semantic/typography.base.json | JSON 직접 수정 |

---

## 📚 관련 문서

- [Auto-Generated-Tokens.md](../src/tokens/Auto-Generated-Tokens.md) - Figma 자동생성 토큰 상세
- [Dev-Tokens.md](../src/tokens/Dev-Tokens.md) - 개발자 수동관리 토큰 상세
- [Theme 아키텍처](./THEME_ARCHITECTURE.md) - 브랜드별 테마 적용 방법
- [토큰 사용 가이드](./TOKEN_USAGE_GUIDE.md) - Primitive vs Semantic 실전 사용법
- [Style Dictionary 공식 문서](https://amzn.github.io/style-dictionary/)
- [Vanilla Extract 공식 문서](https://vanilla-extract.style/)

---

## 📝 변경 이력

| 날짜       | 변경 내용                           | 작성자 |
| ---------- | ----------------------------------- | ------ |
| 2025-12-24 | 토큰 시스템 통합 가이드 초안 작성  | -      |
| 2025-12-30 | docs/ 폴더로 이동 및 링크 업데이트 | -      |
