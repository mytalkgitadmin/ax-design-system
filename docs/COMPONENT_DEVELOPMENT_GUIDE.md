# 🤖 디자인 시스템 컴포넌트 개발 가이드

> **개발자가 Claude에게 컴포넌트 개발을 지시할 때 사용하는 레퍼런스 문서**

---

## 📌 이 문서의 사용법

이 문서는 **개발자가 Claude(AI)에게 작업을 지시할 때** 참고하는 가이드입니다.

### 사용 시나리오

```
개발자: "Claude, Badge 컴포넌트를 만들어줘.
        COMPONENT_DEVELOPMENT_GUIDE.md를 참고해서
        프로젝트 구조와 규칙을 따라줘."

Claude: (이 문서를 참고하여 컴포넌트 개발)
```

### 주요 용도

- ✅ Claude에게 컴포넌트 개발 작업을 지시할 때
- ✅ 프로젝트 구조와 코딩 규칙 전달
- ✅ 일관된 코드 퀄리티 유지
- ✅ 토큰 시스템 사용 강제

---

## 📚 목차

1. [프로젝트 구조](#-프로젝트-구조)
2. [필수 규칙](#-필수-규칙)
3. [컴포넌트 개발 프로세스](#-컴포넌트-개발-프로세스)
4. [코드 작성 규칙](#-코드-작성-규칙)
5. [Storybook 작성 규칙](#-storybook-작성-규칙)
6. [디자인 업데이트 처리](#-디자인-업데이트-처리)
7. [Claude 지시 예시](#-claude-지시-예시)

---

## 📂 프로젝트 구조

### 전체 구조

```
design-system/
├── src/
│   ├── stories/              # 컴포넌트 디렉토리
│   │   ├── Button/
│   │   │   ├── index.tsx           # 컴포넌트 로직
│   │   │   ├── Button.css.ts       # Vanilla Extract 스타일
│   │   │   ├── Button.stories.tsx  # Storybook 문서
│   │   │   └── types.ts            # TypeScript 타입
│   │   └── ...
│   │
│   ├── tokens/              # 디자인 토큰
│   │   ├── index.ts                # 🚫 자동생성 (수정금지)
│   │   ├── dev/                    # 개발자 관리 토큰
│   │   └── design/                 # 🚫 Figma 자동생성 (수정금지)
│   │
│   ├── theme/               # 테마 시스템
│   └── index.ts             # 외부 export
│
├── docs/                    # 문서
└── scripts/                 # 자동화 스크립트
```

### 컴포넌트 폴더 구조

```
ComponentName/
├── index.tsx              # 컴포넌트 로직
├── ComponentName.css.ts   # Vanilla Extract 스타일
├── ComponentName.stories.tsx  # Storybook 문서
└── types.ts               # TypeScript 타입
```

---

## 🚨 필수 규칙

### 절대 금지 사항

```typescript
// ❌ 절대 금지 1: 하드코딩된 값 사용
const style = {
  height: '44px', // ❌
  fontSize: '14px', // ❌
  backgroundColor: '#4f7cff', // ❌
  padding: '0 20px', // ❌
};

// ✅ 올바른 방법: 토큰 사용
import { componentSize, color, spacing, rounded } from '../../tokens';

const style = {
  height: `${componentSize.md.height}px`, // ✅
  fontSize: `${componentSize.md.fontSize}px`, // ✅
  backgroundColor: color.blue[600], // ✅
  padding: `0 ${spacing[20]}px`, // ✅
  borderRadius: `${rounded.sm}px`, // ✅
};
```

```typescript
// ❌ 절대 금지 2: 자동생성 파일 수정
src/tokens/index.ts         // 🚫 수정금지
src/tokens/variables.css    // 🚫 수정금지
src/tokens/design/          // 🚫 수정금지
```

### 토큰 사용 의무화

**모든 디자인 값은 토큰으로 정의되어야 합니다.**

| 속성        | 토큰                           | 예시                             | 적용 대상         |
| ----------- | ------------------------------ | -------------------------------- | ----------------- |
| 높이        | `componentSize[size].height`   | `componentSize.md.height` → 44   | Form 컴포넌트만\* |
| 폰트 크기   | `componentSize[size].fontSize` | `componentSize.md.fontSize` → 14 | Form 컴포넌트만\* |
| 아이콘 크기 | `componentSize[size].iconSize` | `componentSize.md.iconSize` → 20 | Form 컴포넌트만\* |
| 색상        | `color[name][shade]`           | `color.blue[600]` → #4f7cff      | 모든 컴포넌트     |
| 간격        | `spacing[value]`               | `spacing[8]` → 8                 | 모든 컴포넌트     |
| 둥근 모서리 | `rounded[size]`                | `rounded.sm` → 8                 | 모든 컴포넌트     |

**\* Form 컴포넌트 (사용자 입력/액션):** Button, Input, Select, Checkbox, Radio, Switch, Textarea 등

**Display 컴포넌트 (정보 표시):** Badge, Tag, Chip, Card, Avatar, Alert 등

- 고정 크기 또는 컨텐츠 기반 크기 사용
- 필요시 자체 크기 값 정의 (토큰 또는 직접 정의)

---

## 🛠️ 컴포넌트 개발 프로세스

### 1단계: 파일 생성

```bash
src/stories/ComponentName/
├── index.tsx
├── ComponentName.css.ts
├── ComponentName.stories.tsx
└── types.ts
```

### 2단계: 타입 정의 (`types.ts`)

```typescript
// types.ts
export interface ComponentNameProps {
  /** 컴포넌트 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** 컴포넌트 색상 */
  color?: 'primary' | 'secondary' | 'success' | 'error';

  /** 스타일 변형 */
  variant?: 'solid' | 'outline' | 'ghost';

  /** 표시할 텍스트 */
  label?: string;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 전체 너비 사용 */
  full?: boolean;
}
```

**규칙:**

- 모든 props에 JSDoc 주석 (`/** ... */`) 필수
- 선택적 props는 `?` 사용
- 기본값은 컴포넌트에서 설정

### 3단계: 스타일 작성 (`ComponentName.css.ts`)

```typescript
// ComponentName.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { componentSize, color, spacing, rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

// 기본 스타일
const baseStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontWeight: 600,

  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
});

// Recipe로 변형 정의
export const componentStyle = recipe({
  base: baseStyle,

  variants: {
    // 크기 변형 - componentSize 토큰 사용
    size: {
      xs: {
        height: toRem(componentSize.xs.height),
        fontSize: toRem(componentSize.xs.fontSize),
        padding: `0 ${toRem(spacing[8])}`,
        gap: toRem(spacing[4]),
      },
      sm: {
        height: toRem(componentSize.sm.height),
        fontSize: toRem(componentSize.sm.fontSize),
        padding: `0 ${toRem(spacing[12])}`,
        gap: toRem(spacing[4]),
      },
      md: {
        height: toRem(componentSize.md.height),
        fontSize: toRem(componentSize.md.fontSize),
        padding: `0 ${toRem(spacing[20])}`,
        gap: toRem(spacing[8]),
      },
      lg: {
        height: toRem(componentSize.lg.height),
        fontSize: toRem(componentSize.lg.fontSize),
        padding: `0 ${toRem(spacing[24])}`,
        gap: toRem(spacing[8]),
      },
      xl: {
        height: toRem(componentSize.xl.height),
        fontSize: toRem(componentSize.xl.fontSize),
        padding: `0 ${toRem(spacing[32])}`,
        gap: toRem(spacing[8]),
      },
    },

    // 색상 변형
    color: {
      primary: {},
      secondary: {},
      success: {},
      error: {},
    },

    // 스타일 변형
    variant: {
      solid: {},
      outline: {},
      ghost: {},
    },

    // 전체 너비
    full: {
      true: { width: '100%' },
    },
  },

  // 복합 변형 (color + variant 조합)
  compoundVariants: [
    {
      variants: { color: 'primary', variant: 'solid' },
      style: {
        backgroundColor: color.blue[600],
        color: color.base.white,
        borderRadius: toRem(rounded.sm),
      },
    },
    {
      variants: { color: 'primary', variant: 'outline' },
      style: {
        backgroundColor: 'transparent',
        color: color.blue[600],
        border: `1px solid ${color.blue[600]}`,
        borderRadius: toRem(rounded.sm),
      },
    },
    // ... 다른 조합들
  ],

  defaultVariants: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
  },
});
```

**필수 규칙:**

- ✅ 크기 값: Form 컴포넌트는 `componentSize` 토큰 필수
- ✅ 색상 값: 모든 컴포넌트 `color` 토큰 사용
- ✅ 간격 값: 모든 컴포넌트 `spacing` 토큰 사용
- ✅ 둥근 모서리: 모든 컴포넌트 `rounded` 토큰 사용
- ✅ 단위 변환: `toRem()` 헬퍼 사용
- ✅ `defaultVariants` 반드시 설정

**컴포넌트 유형별 규칙:**

| 컴포넌트 유형                                                            | componentSize 사용 | 크기 정의 방법                                                                                   |
| ------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------ |
| **Form 컴포넌트**<br>(Button, Input, Select, Checkbox, Radio, Switch 등) | ✅ 필수            | `componentSize[size].height`<br>`componentSize[size].fontSize`<br>`componentSize[size].iconSize` |
| **Display 컴포넌트**<br>(Badge, Tag, Chip, Card, Avatar, Alert 등)       | ❌ 선택적          | 고정값 또는 컨텐츠 기반<br>필요시 자체 크기 정의                                                 |
| **Layout 컴포넌트**<br>(Container, Grid, Stack, Divider 등)              | ❌ 사용 안 함      | `spacing` 토큰만 사용                                                                            |

### 4단계: 컴포넌트 로직 (`index.tsx`)

```typescript
// index.tsx
import React from 'react';
import { Icon } from '../Icon';
import { componentSize } from '../../tokens';
import { ComponentNameProps } from './types';
import { componentStyle } from './ComponentName.css';

export type { ComponentNameProps } from './types';

export const ComponentName = ({
  size = 'md',
  color = 'primary',
  variant = 'solid',
  label,
  leftIcon,
  rightIcon,
  disabled = false,
  full = false,
  onClick,
}: ComponentNameProps) => {
  // componentSize 토큰에서 iconSize 가져오기
  const iconSize = Number(componentSize[size].iconSize);

  return (
    <button
      className={componentStyle({ size, color, variant, full })}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize} />}
      {label}
      {rightIcon && <Icon name={rightIcon} size={iconSize} />}
    </button>
  );
};
```

**필수 규칙:**

- ✅ 기본값 설정
- ✅ `export type` 포함
- ✅ 아이콘 크기는 `componentSize[size].iconSize` 사용

### 5단계: Export 추가 (`src/index.ts`)

```typescript
// src/index.ts
// ... 기존 코드 ...

export { ComponentName } from './stories/ComponentName';
export type { ComponentNameProps } from './stories/ComponentName';
```

---

## 📖 Storybook 작성 규칙

### 기본 구조

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './index';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs', '!dev'],  // ⚠️ 필수!
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '컴포넌트 크기',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: '컴포넌트 색상',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: '스타일 변형',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예시
export const Default: Story = {
  args: {
    label: '버튼',
    size: 'md',
    color: 'primary',
    variant: 'solid',
  },
};

// 크기 비교
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <ComponentName label="XS" size="xs" />
      <ComponentName label="SM" size="sm" />
      <ComponentName label="MD" size="md" />
      <ComponentName label="LG" size="lg" />
      <ComponentName label="XL" size="xl" />
    </div>
  ),
};

// 색상 비교
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ComponentName label="Primary" color="primary" />
      <ComponentName label="Secondary" color="secondary" />
      <ComponentName label="Success" color="success" />
      <ComponentName label="Error" color="error" />
    </div>
  ),
};

// 변형 비교
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ComponentName label="Solid" variant="solid" />
      <ComponentName label="Outline" variant="outline" />
      <ComponentName label="Ghost" variant="ghost" />
    </div>
  ),
};
```

### Storybook Tags 규칙

```typescript
tags: ['autodocs', '!dev'];
```

**Tags 설명:**

- `'autodocs'`: 자동으로 Props 문서 생성
- `'!dev'`: 개발 중인 컴포넌트 숨기기 (완성되면 제거)

**사용 규칙:**

- ✅ **개발 중**: `tags: ['autodocs', '!dev']` - Storybook에 안 보임
- ✅ **완성 후**: `tags: ['autodocs']` - Storybook에 표시됨
- ✅ **문서 불필요**: `tags: ['!dev']` - Props 문서 없이 숨김

---

## 🎨 디자인 업데이트 처리

### 시나리오 1: Figma에서 토큰 업데이트

디자이너가 Figma에서 토큰값을 변경했을 때

**프로세스:**

```bash
# 1. Figma Tokens Studio 플러그인에서 GitHub에 Push
# → 개발자가 Figma Tokens Studio 플러그인 사용
# → 변경사항(diff) 유무 확인
# → "Push to GitHub" 버튼 클릭
# → src/figma/tokens.json 파일이 자동으로 GitHub에 커밋됨

# 2. 로컬에서 변경사항 Pull
git pull origin develop

# 3. 토큰 빌드 (자동으로 lint, type-check 포함)
npm run build:tokens

# 4. 변경사항 확인
git diff src/tokens/design/

# 5. Storybook에서 시각적 확인
npm run storybook

# 6. 문제없으면 커밋
git add .
npm run commit
```

**Figma Tokens Studio 플러그인:**

- Figma에서 디자인 토큰을 관리하는 플러그인
- GitHub 연동으로 토큰을 직접 저장소에 Push 가능
- `src/figma/tokens.json` 파일에 모든 토큰 정의

**자동화된 파일:**

- `src/figma/tokens.json` - Figma Tokens Studio에서 생성 (원본, Git 추적)
- `src/tokens/design/primitives/color.json` - 색상 토큰 (자동생성)
- `src/tokens/design/primitives/font.json` - 폰트 토큰 (자동생성)
- `src/tokens/design/semantic/colors.json` - 시맨틱 색상 (자동생성)
- `src/tokens/index.ts` - 최종 빌드 파일 (자동생성)

### 시나리오 2: SVG 아이콘 추가/업데이트

새 아이콘 추가 또는 기존 아이콘 수정/교체 시

**프로세스:**

```bash
# 1. SVG 파일을 src/figma/icon/ 에 추가/수정
# - 카테고리별 폴더 구조 사용 (interface, arrow, circle, shop, social)
# - 새 아이콘 추가: src/figma/icon/interface/star.svg
# - 기존 수정: src/figma/icon/interface/check.svg 교체
# - 전체 업데이트: 폴더 내 여러 파일 수정/추가

# 2. 아이콘 생성 스크립트 실행 (완전 자동화)
npm run generate:icons

# 3. 자동 실행되는 작업들 ✅
# - 기존 src/stories/Icon/icons/* 전체 삭제
# - SVG → React 컴포넌트 변환 (SVGR)
# - src/stories/Icon/icons/index.ts 자동 생성
# - TypeScript 타입 자동 생성
# - lint 자동 실행 (npm run lint:fix)
# - 타입 체크 자동 실행 (npm run type-check)

# 4. Storybook에서 확인
npm run storybook

# 5. 커밋
git add .
npm run commit
```

**주의사항:**

- ✅ 스크립트가 매번 전체 재생성하므로 개별 추가/전체 교체 구분 불필요
- ✅ `src/stories/Icon/index.tsx` (메인 컴포넌트)는 자동 보호됨
- ✅ `src/figma/icon/` (SVG 원본)은 Git에서 무시됨 (.gitignore)

### 디자인 업데이트 체크리스트

**토큰 업데이트 시:**

- [ ] 디자이너가 Figma Tokens Studio에서 GitHub에 Push
- [ ] `git pull` 로 `src/figma/tokens.json` 받기
- [ ] `npm run build:tokens` 실행 (자동: lint + type-check)
- [ ] `src/tokens/design/` 변경사항 확인
- [ ] Storybook에서 시각적 검증
- [ ] 커밋

**아이콘 추가 시:**

- [ ] SVG 파일 `src/figma/icon/` 의 적절한 카테고리 폴더에 추가
  - Interface 아이콘: `src/figma/icon/interface/`
  - Arrow 아이콘: `src/figma/icon/arrow/`
  - Circle 아이콘: `src/figma/icon/circle/`
  - Shop 아이콘: `src/figma/icon/shop/`
  - Social 아이콘: `src/figma/icon/social/`
- [ ] `npm run generate:icons` 실행 (자동: 삭제 + 생성 + lint + type-check)
- [ ] 생성된 컴포넌트 확인
- [ ] Storybook에서 아이콘 확인
- [ ] 커밋

**아이콘 전체 재생성 시:**

- [ ] `src/figma/icon/` 폴더에 새 SVG 파일 복사/교체
- [ ] `npm run generate:icons` 실행 (자동: 모든 단계 포함)
- [ ] 모든 아이콘 Storybook 확인
- [ ] 커밋

---

## 🤖 Claude 지시 예시

### 예시 1: 새 컴포넌트 개발

```
Badge 컴포넌트를 개발해줘.

요구사항:
- 크기: sm, md, lg
- 색상: primary, success, error, warning
- 스타일: solid, outline
- 아이콘 지원 (선택적)

COMPONENT_DEVELOPMENT_GUIDE.md의 규칙을 따라서:
1. 모든 값은 토큰 사용 (하드코딩 금지)
2. Storybook tags: ['autodocs', '!dev']
3. componentSize 토큰으로 크기 정의
4. 완성 후 src/index.ts에 export 추가
```

### 예시 2: 기존 컴포넌트 수정

```
Button 컴포넌트에 'ghost' variant를 추가해줘.

요구사항:
- 배경 투명
- 텍스트 색상만 표시
- hover 시 약간의 배경색

COMPONENT_DEVELOPMENT_GUIDE.md 규칙:
- color 토큰만 사용
- compoundVariants에 추가
- Storybook에 예시 추가
```

### 예시 3: 디자인 업데이트

```
디자이너가 Figma Tokens Studio로 토큰을 업데이트했어.

다음 작업 수행:
1. git pull로 figma/tokens.json 변경사항 받기
2. npm run build:tokens 실행
3. 변경된 파일 확인
4. Storybook으로 시각적 검증
5. 문제없으면 커밋

COMPONENT_DEVELOPMENT_GUIDE.md의
"디자인 업데이트 처리 > 시나리오 1" 참고
```

### 예시 4: 아이콘 추가

```
새로운 아이콘 SVG 파일들을 추가해줘.

파일 위치: src/figma/icon/interface/
- star.svg
- bookmark.svg
- share.svg

작업:
1. npm run generate:icons 실행
2. 생성된 컴포넌트 확인
3. Storybook에서 테스트

참고:
- Interface 아이콘: src/figma/icon/interface/
- Arrow 아이콘: src/figma/icon/arrow/
- Circle 아이콘: src/figma/icon/circle/
- Shop 아이콘: src/figma/icon/shop/
- Social 아이콘: src/figma/icon/social/

COMPONENT_DEVELOPMENT_GUIDE.md의
"디자인 업데이트 처리 > 시나리오 2" 참고
```

---

## 📚 관련 문서

- [TOKEN_GUIDE.md](./TOKEN_GUIDE.md) - 토큰 시스템 상세 가이드
- [ICON_COMPONENT.md](./ICON_COMPONENT.md) - 아이콘 컴포넌트 가이드
- [CODE_CONVENTION.md](./CODE_CONVENTION.md) - 코드 컨벤션

---

## 💡 핵심 원칙

**Claude에게 작업을 지시할 때 이 원칙들을 명시하세요:**

1. 🎨 **토큰 우선**: 색상, 간격, 둥근 모서리는 항상 토큰 사용
2. 📏 **ComponentSize 구분**:
   - **Form 컴포넌트** (Button, Input, Select 등): `componentSize` 필수
   - **Display 컴포넌트** (Badge, Card, Alert 등): 선택적 또는 자체 크기 정의
   - **Layout 컴포넌트** (Container, Grid 등): `spacing` 토큰만 사용
3. 🔄 **단위 변환**: `toRem()` 헬퍼 필수
4. 📝 **문서화**: JSDoc 주석 필수
5. 🧪 **Storybook**: 모든 variants 예시 포함
6. 🚫 **자동생성 금지**: `src/tokens/index.ts`, `design/` 수정 금지

**이 가이드를 Claude에게 제공하면, 프로젝트 규칙에 맞는 일관된 코드를 생성합니다.**

---

## 🐛 컴포넌트 개발 중 흔한 에러

### TypeScript 타입 에러

#### Icon 컴포넌트 name 타입 에러

**에러:**

```
error TS2322: Type '"interface/x"' is not assignable to type 'IconName'
```

**원인:**

- Icon 이름을 Figma 경로 형식(`'interface/x'`)으로 작성
- 실제 IconName은 PascalCase 형식(`'X'`)

**해결:**

```tsx
// ❌ 잘못된 사용
<Icon name="interface/x" />

// ✅ 올바른 사용
<Icon name="X" />
```

**확인 방법:**

```bash
ls src/stories/Icon/icons/interface
# X.tsx 확인

# 또는 IconName 타입 확인
grep "export.*X" src/stories/Icon/icons/index.ts
```

---

#### Storybook Story args 타입 에러

**에러:**

```
error TS2322: Type '{}' is missing the following properties from type 'ModalProps': title, open, onClose
```

**원인:**

- Storybook Story에서 `args: {}` 사용 시 필수 props가 없어서 발생
- `render` 함수에서 컴포넌트를 직접 렌더링하는 경우

**해결:**

```tsx
// ❌ 타입 에러 발생
export const Example: Story = {
  args: {},
  render: () => <Component />,
};

// ✅ satisfies 제거
export const Example = {
  render: () => <Component />,
};

// ✅ 또는 parameters 사용
export const Example = {
  render: () => <Component />,
  parameters: {
    controls: { disable: true },
  },
};
```

---

### ESLint 에러

#### React Hooks 규칙 위반

**에러:**

```
error: React Hook "useState" is called in function "render" that is neither
a React function component nor a custom React Hook function
```

**원인:**

- Storybook Story의 `render` 함수에서 직접 `useState` 사용
- 함수 이름이 대문자로 시작하지 않아서 React가 컴포넌트로 인식하지 못함

**해결:**

```tsx
// ❌ 에러 발생
export const Example: Story = {
  render: () => {
    const [state, setState] = useState(false);
    return <Component />;
  },
};

// ✅ 별도 컴포넌트로 분리
const ExampleComponent = () => {
  const [state, setState] = useState(false);
  return <Component />;
};

export const Example = {
  render: () => <ExampleComponent />,
};
```

---

### 예방 체크리스트

컴포넌트 개발 완료 후 다음을 확인:

- [ ] React Hooks는 컴포넌트 최상위에서만 사용
- [ ] Storybook Story에서 hooks 사용 시 별도 컴포넌트로 분리
- [ ] Icon 이름은 PascalCase 사용 (Figma 경로 아님)
- [ ] 외부 라이브러리 사용 시 `@types/*` 패키지 설치
- [ ] `npm run type-check` 및 `npm run lint` 통과
