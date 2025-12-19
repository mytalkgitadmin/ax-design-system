# 📋 디자인 시스템 코드 컨벤션

> 작성일: 2025-12-16
> 목적: 일관된 컴포넌트 개발 및 Storybook 문서화

---

## 🎯 핵심 원칙

1. **Prettier**: 코드 포매팅 (자동)
2. **ESLint**: 코드 품질 검사 및 규칙 강제
3. **자동화**: VS Code 저장 시 자동 포맷 + 린트 수정
4. **Storybook**: 컴포넌트 문서화 및 테스트

---

## 📦 Import 자동 정렬 (✅ 린트 설정)

### 라이브러리: `eslint-plugin-simple-import-sort`

### Import 정렬 순서

```typescript
// 1. React 관련
import { useState } from 'react';
import { createRoot } from 'react-dom';

// 2. 외부 라이브러리
import { clsx } from 'clsx';
import { cva } from 'class-variance-authority';

// 3. 내부 모듈
import { cn } from '@/shared/lib/utils';

// 4. 상대 경로
import { helper } from './utils';
import { LocalComponent } from '../components/local';

// 5. 타입 import
import type { ButtonProps } from './types';

// 6. 스타일/에셋
import './styles.css';
import logo from './logo.png';
```

**ESLint 규칙:**

```javascript
'simple-import-sort/imports': ['error', { groups: [...] }]
'simple-import-sort/exports': 'error'
```

---

## ⚛️ React 컨벤션

### 1. 화살표 함수 사용 (✅ 린트 설정)

**규칙**: 모든 React 컴포넌트는 **화살표 함수**로 작성

```typescript
// ✅ 올바른 방식
export const Button = () => {
  return <button>Click me</button>;
};

// ❌ 잘못된 방식
export function Button() {
  return <button>Click me</button>;
}
```

**왜 화살표 함수를 사용하나?**

1. **일관성**: 프로젝트 전체에서 동일한 스타일 유지
2. **this 바인딩 문제 해결**: React에서 발생할 수 있는 `this` 바인딩 문제 방지
3. **Named Export와 호환성**: `export const`와 자연스럽게 결합

**ESLint 규칙:**

```javascript
'react/function-component-definition': ['error', {
  namedComponents: 'arrow-function',
  unnamedComponents: 'arrow-function'
}]
```

---

### 2. Named Export 사용 (✅ 린트 설정)

**규칙**: 컴포넌트는 **Named Export** 사용 (Default Export 금지)

```typescript
// ✅ Named Export (권장)
export const Button = () => {};
export const Input = () => {};

// ❌ Default Export (지양)
export default function Button() {}
```

**왜 Named Export를 사용하나?**

1. **리팩토링 안정성**: 파일명 변경 시 import 자동 업데이트
2. **명시성**: import 시 정확한 이름 사용, 오타 방지
3. **IDE 지원**: 자동완성, Go to Definition 등 더 나은 지원
4. **트리 쉐이킹**: 번들러가 미사용 export 제거 가능

**예시:**

```typescript
// Named Export: 리팩토링 시 안전
// Button.tsx
export const Button = () => {};

// other-file.tsx
import { Button } from './Button'; // ✅ 파일명 변경 시 자동 업데이트
```

**ESLint 규칙:**

```javascript
'import/no-default-export': 'error'
```

---

### 3. Props 타입 정의

**규칙**: 모든 컴포넌트는 Props 타입을 명시적으로 정의

```typescript
// ✅ 올바른 방식
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

// ❌ 잘못된 방식
export const Button = ({ variant, size, children }: any) => {
  return <button>{children}</button>;
};
```

---

### 4. Key Props 필수 (✅ 린트 설정)

```tsx
// ✅ 올바른 방식
{
  items.map((item) => <Item key={item.id} {...item} />);
}

// ❌ 잘못된 방식
{
  items.map((item) => <Item {...item} />);
}
```

**ESLint 규칙:**

```javascript
'react/jsx-key': 'error'
```

---

## 📘 TypeScript 컨벤션

### 1. Strict Mode 사용 (✅ 설정)

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

### 2. Type vs Interface (✅ 린트 설정)

**규칙**: 일관성을 위해 **type 우선 사용**

```typescript
// ✅ type 사용 (권장)
type ButtonProps = {
  label: string;
  onClick: () => void;
};

// ❌ interface 사용 (지양)
interface ButtonProps {
  label: string;
  onClick: () => void;
}
```

**왜 type을 우선 사용하나?**

1. **일관성 (Consistency)**

   ```typescript
   // type은 모든 경우에 사용 가능
   type Name = string;  // ✅ Primitive alias
   type Point = { x: number; y: number };  // ✅ Object
   type ID = string | number;  // ✅ Union

   // interface는 객체 형태만 가능
   interface Point { x: number; y: number }  // ✅
   interface ID = string | number;  // ❌ 불가능
   ```

2. **합성(Composition) 유연성**

   ```typescript
   // type: Union, Intersection 자유롭게
   type ButtonVariant = 'primary' | 'secondary' | 'outline';
   type ButtonSize = 'sm' | 'md' | 'lg';
   type ButtonProps = {
     variant?: ButtonVariant;
     size?: ButtonSize;
   };
   ```

**ESLint 규칙:**

```javascript
'@typescript-eslint/consistent-type-definitions': ['warn', 'type']
```

---

### 3. any 금지 (✅ 린트 설정)

```typescript
// ❌ any 사용 금지
const data: any = fetchData();

// ✅ 타입 정의 또는 unknown 사용
const data: ComponentProps = fetchData();
const data: unknown = fetchData(); // 타입 모를 때
```

**ESLint 규칙:**

```javascript
'@typescript-eslint/no-explicit-any': 'warn'
```

---

## 🎨 스타일링 컨벤션

### 1. Vanilla Extract 사용

**기본 원칙**: 타입 안전한 CSS-in-TS

```typescript
// Button.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const button = recipe({
  base: {
    borderRadius: '4px',
    padding: '8px 16px',
    fontWeight: 500,
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'blue',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'gray',
        color: 'black',
      },
    },
    size: {
      sm: { fontSize: '12px' },
      md: { fontSize: '14px' },
      lg: { fontSize: '16px' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

```typescript
// Button.tsx
import { button } from './Button.css';

export const Button = ({ variant, size, children }: ButtonProps) => {
  return <button className={button({ variant, size })}>{children}</button>;
};
```

---

### 2. Class Variance Authority (CVA) 사용

**규칙**: 복잡한 variant 관리는 CVA 사용

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-button-class', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
      outline: 'border border-gray-300',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
};

export const Button = ({ variant, size, children }: ButtonProps) => {
  return <button className={buttonVariants({ variant, size })}>{children}</button>;
};
```

---

### 3. cn() 유틸리티 사용

**규칙**: 조건부 클래스는 `cn()` 사용

```typescript
import { cn } from '@/shared/lib/utils';

<button
  className={cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
```

---

## 📚 Storybook 컨벤션

### 1. Story 파일 네이밍

**규칙**: `ComponentName.stories.tsx`

```
src/
  components/
    Button/
      Button.tsx
      Button.css.ts
      Button.stories.tsx  ← Storybook 파일
```

---

### 2. Story 작성 기본 구조

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: '버튼의 시각적 스타일을 지정합니다.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '버튼의 크기를 지정합니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Story
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

// Variant별 Story
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

// Size별 Story
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// 상태별 Story
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};
```

---

### 3. Story 작성 원칙

1. **모든 variant는 개별 Story로 작성**

   ```typescript
   export const Primary: Story = { args: { variant: 'primary' } };
   export const Secondary: Story = { args: { variant: 'secondary' } };
   export const Outline: Story = { args: { variant: 'outline' } };
   ```

2. **Interactive Controls 제공**

   ```typescript
   argTypes: {
     variant: {
       control: 'select',
       options: ['primary', 'secondary', 'outline'],
       description: '버튼 스타일',
     },
     disabled: {
       control: 'boolean',
       description: '버튼 비활성화',
     },
   }
   ```

3. **한글로 설명 작성**

   ```typescript
   argTypes: {
     variant: {
       description: '버튼의 시각적 스타일을 지정합니다.',
       table: {
         type: { summary: 'primary | secondary | outline' },
         defaultValue: { summary: 'primary' },
       },
     },
   }
   ```

---

### 4. Autodocs 활용

**규칙**: `tags: ['autodocs']`로 자동 문서 생성

```typescript
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // ← 자동 문서 생성
  argTypes: {
    variant: {
      description: '버튼 스타일',
      table: {
        type: { summary: 'primary | secondary | outline' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
} satisfies Meta<typeof Button>;
```

---

### 5. Play Function으로 인터랙션 테스트

```typescript
import { expect, userEvent, within } from '@storybook/test';

export const ClickTest: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toHaveClass('active');
  },
};
```

---

## 📂 파일명 컨벤션

### 1. React 컴포넌트: **PascalCase** ✅

```
✅ Button.tsx
✅ Input.tsx
✅ Card.tsx

❌ button.tsx
❌ input.tsx
```

**왜 PascalCase를 사용하나?**

1. **컴포넌트명과 파일명 일치**: 명확성과 직관성

   ```typescript
   // Button.tsx
   export const Button = () => { ... }

   // 다른 파일에서
   import { Button } from './Button';  // 이름이 일치!
   ```

---

### 2. 스타일 파일: **PascalCase.css.ts**

```
✅ Button.css.ts
✅ Input.css.ts

❌ button.styles.ts
❌ buttonStyles.ts
```

---

### 3. Storybook 파일: **PascalCase.stories.tsx**

```
✅ Button.stories.tsx
✅ Input.stories.tsx

❌ button.stories.tsx
```

---

### 4. 타입 정의 파일: **camelCase 또는 PascalCase**

```
✅ types.ts
✅ buttonTypes.ts
✅ ButtonTypes.ts
```

---

## 🛠️ Lint & Format 명령어

### 전체 검사

```bash
# ESLint 검사 (에러만 표시)
npm run lint

# ESLint 검사 + 자동 수정
npm run lint:fix

# Prettier 검사 (포맷팅 체크만)
npm run format:check

# Prettier 자동 수정
npm run format

# TypeScript 타입 체크
npm run type-check

# Storybook 빌드 테스트
npm run build-storybook
```

### 권장 워크플로우

1. **개발 중**: VS Code 저장 시 자동 포맷팅 + 린트 수정
2. **커밋 전**: `npm run lint` + `npm run type-check` 실행
3. **배포 전**: `npm run build-storybook` 성공 확인

---

## 🏗️ 컴포넌트 구조

### 기본 폴더 구조

```
src/
  components/
    Button/
      Button.tsx           # 컴포넌트
      Button.css.ts        # 스타일 (Vanilla Extract)
      Button.stories.tsx   # Storybook
      index.ts             # Re-export
    Input/
      Input.tsx
      Input.css.ts
      Input.stories.tsx
      index.ts
```

---

### index.ts 활용

```typescript
// src/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// 다른 파일에서 간단하게 import
import { Button, type ButtonProps } from '@/components/Button';
```

---

## 📚 참고 문서

- [Prettier 공식 문서](https://prettier.io/docs/en/)
- [ESLint 공식 문서](https://eslint.org/docs/latest/)
- [Storybook 공식 문서](https://storybook.js.org/docs)
- [Vanilla Extract 공식 문서](https://vanilla-extract.style/)
- [Class Variance Authority](https://cva.style/docs)
- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)

---

**작성일**: 2025-12-16
**최종 수정**: 2025-12-16
