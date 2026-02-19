# Icon 컴포넌트

SVG 기반의 커스텀 아이콘 시스템입니다.

## 📁 디렉토리 구조

### Figma 소스 (`src/figma/icon/`)

```
src/figma/icon/
├── company/                   # 외부 서비스/브랜드 로고
│   ├── KakaoTalk.svg
│   ├── KakaoTalkWhite.svg
│   ├── Name=Naver, Mode=Primary.svg
│   └── Name=Naver, Mode=White.svg
├── Name=search.svg            # 일반 아이콘 (Figma 파라미터 방식)
├── Name=heart, Fill=True,.svg
├── Name=check, Thick=False.svg
├── bell.svg                   # kebab-case 방식 (일부 구형 파일)
├── bell-fill.svg
└── ...
```

**파일명 형식:**

| 형식                | 예시                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| Figma 파라미터 방식 | `Name=search.svg`, `Name=heart, Fill=True,.svg`                         |
| 복합 파라미터       | `Name=arrow, Direction=down.svg`, `Name=eye, Fill=False, View=True.svg` |
| kebab-case (구형)   | `bell.svg`, `bell-fill.svg`, `chevron-down-wide.svg`                    |

### 빌드 출력 (`src/stories/Icon/icons/`)

```
icons/
├── index.ts               # 자동 생성된 export 파일
├── company/               # 브랜드 로고 (고정 컬러 유지)
│   ├── Naver.tsx
│   ├── NaverWhite.tsx
│   ├── KakaoTalk.tsx
│   └── KakaoTalkWhite.tsx
├── AlbumNormal.tsx        # 일반/Fill 아이콘 (currentColor 사용)
├── AlbumNormalFill.tsx
├── ArrowDown.tsx
├── Bell.tsx
├── BellFill.tsx
├── Check.tsx
├── Heart.tsx
├── HeartFill.tsx
└── ...                    # 총 144개 (flat 구조)
```

> **폴더 접두사 없음.** 컴포넌트명은 파일명에서 직접 변환됩니다. `company/` 서브폴더만 예외적으로
> 존재합니다.

## 📝 파일명 → 컴포넌트명 변환 규칙

### Figma 파라미터 형식 파싱

디자이너가 Figma에서 export할 때 파일명은 **파라미터=값** 형식입니다.

#### 정렬 규칙 (파라미터 순서와 무관하게 일관성 보장)

1. `Name` 값 → 항상 맨 앞
2. 비불리언 값 → 중간 (`Direction`, `Size`, `Country`, `Horizontal`, `Vertical` 등)
3. 불리언 키 → 마지막, 단 `Fill`은 불리언 중 가장 마지막

#### 변환 예시

| Figma 파일명                                      | 컴포넌트명                                |
| ------------------------------------------------- | ----------------------------------------- |
| `Name=search.svg`                                 | `Search`                                  |
| `Name=arrow, Direction=down.svg`                  | `ArrowDown`                               |
| `Name=check, Thick=False.svg`                     | `Check`                                   |
| `Name=check, Thick=True.svg`                      | `CheckThick`                              |
| `Name=heart, Fill=True,.svg`                      | `HeartFill`                               |
| `Name=eye, Fill=False, View=True.svg`             | `EyeView`                                 |
| `Name=eye, Fill=True, View=True.svg`              | `EyeViewFill`                             |
| `Name=more, Tight=True, Direction=horizontal.svg` | `MoreHorizontalTight`                     |
| `Name=language, Country=globe, Fill=True.svg`     | `LanguageGlobeFill`                       |
| `Name=settings, Filled=True.svg`                  | `SettingsFill` (`Filled` → `Fill` 정규화) |
| `Name=Naver, Mode=Primary.svg`                    | `Naver` (`primary`는 기본값으로 생략)     |
| `Name=Naver, Mode=White.svg`                      | `NaverWhite`                              |
| `bell.svg`                                        | `Bell` (kebab-case → PascalCase)          |
| `bell-fill.svg`                                   | `BellFill`                                |

#### 파라미터 처리 규칙

| 파라미터 값                              | 처리                                    |
| ---------------------------------------- | --------------------------------------- |
| `Key=False`                              | 생략                                    |
| `Key=primary`, `Key=default`, `Key=base` | 생략 (기본값)                           |
| `Key=True`                               | 키 이름으로 대체 (`Fill=True` → `Fill`) |
| `Key=기타값`                             | 값만 사용 (`Direction=down` → `Down`)   |
| `Filled=True`                            | `Fill`로 정규화                         |

## 🚀 새로운 아이콘 추가 방법

### 1. SVG 파일 준비

Figma에서 SVG를 export하여 `src/figma/icon/` 에 배치합니다.

- **일반 아이콘**: `src/figma/icon/` 루트에 배치
- **브랜드/소셜 로고**: `src/figma/icon/company/` 에 배치

**파일명 규칙:**

- Figma 파라미터 방식 권장: `Name=iconName, Fill=True.svg`
- kebab-case도 지원: `icon-name.svg` → `IconName`

**SVG 색상 준비:**

- 일반 아이콘: `#4B5465` 또는 `#888E9C`를 사용 → SVGR이 `currentColor`로 자동 변환
- Company 로고: 브랜드 고유 색상 그대로 유지 (`#03C75A` 등)

### 2. 자동 변환 실행

```bash
npm run generate:icons
```

이 명령어는:

1. `src/stories/Icon/icons/` 폴더 초기화
2. SVGR로 `src/figma/icon/` 전체 SVG → React 컴포넌트 변환
3. Figma 파라미터 파일명 rename (`scripts/rename-icon-files.js`)
4. `icons/index.ts` 자동 생성 (`scripts/generate-icon-exports.js`)
5. 하위 불필요 `index.ts` 삭제 (`company/index.ts` 등)
6. ESLint 자동 수정 + 타입 체크

### 3. 완료!

변환된 아이콘은 즉시 사용 가능합니다:

```tsx
import { Icon } from '@bemily/design-system';

<Icon name="Search" />
<Icon name="HeartFill" />
<Icon name="ArrowDown" />
<Icon name="Naver" />          // 브랜드 고유 색상 유지
```

## 🎨 아이콘 색상 규칙

### 일반 아이콘 (line / fill 모두)

`currentColor`를 사용하여 외부에서 컬러를 주입받습니다.

```svg
<!-- ✅ 올바른 SVG - currentColor 사용 -->
<path fill="currentColor" ... />
```

SVGR 설정에 의해 아래 색상들이 자동으로 `currentColor`로 변환됩니다:

| SVG 원본 색상 | 변환 결과      |
| ------------- | -------------- |
| `#4B5465`     | `currentColor` |
| `#4b5465`     | `currentColor` |
| `#888E9C`     | `currentColor` |
| `#000`        | `currentColor` |
| `#000000`     | `currentColor` |

```tsx
// 넘겨받은 color가 아이콘에 그대로 적용됨
<Icon name="Check" color="primary" />
<Icon name="HeartFill" color="#FF0000" />
```

### Company 아이콘 (브랜드 고유 색상)

`src/figma/icon/company/` 폴더의 아이콘은 브랜드 가이드라인에 따라 고유 색상을 유지합니다.

```svg
<!-- ✅ Naver - 브랜드 그린 고정 -->
<path fill="#03C75A" ... />

<!-- ✅ KakaoTalkWhite - 흰색 고정 -->
<path fill="#fff" ... />
```

```tsx
// color prop을 넘겨도 브랜드 색상 고정 (SVG 내부 하드코딩)
<Icon name="Naver" />
<Icon name="KakaoTalk" color="primary" />  // color 무시됨
```

> **Note:** Company 아이콘에 `color` prop을 전달해도 SVG 내부 색상이 하드코딩되어 있어 적용되지
> 않습니다. 의도된 동작입니다.

## 🔧 자동화 스크립트

### SVGR 설정 (`svgr.config.js`)

```javascript
module.exports = {
  typescript: true,
  icon: true,
  exportType: 'named',
  namedExport: 'SvgComponent',
  jsxRuntime: 'automatic',

  // 기본 색상 → currentColor 자동 변환
  replaceAttrValues: {
    '#4B5465': 'currentColor',
    '#4b5465': 'currentColor',
    '#000': 'currentColor',
    '#000000': 'currentColor',
    '#888E9C': 'currentColor',
    // Company 브랜드 고유 색상(#03C75A 등)은 변환하지 않음
  },

  dimensions: false, // width/height를 props로 제어
};
```

### `generate-icon-exports.js` 주요 로직

```
파일 경로 파싱 흐름:
  1. 파일명에 '=' 포함 여부로 Figma 파라미터 방식 판별
  2. Figma 파라미터 방식:
     - Name=Value    → 컴포넌트명 기반
     - 비불리언 파라미터 → 값만 추출 (Direction=down → Down)
     - 불리언 파라미터 → 키명 사용 (Fill=True → Fill)
     - Fill은 항상 마지막에 배치
  3. kebab-case 방식 → PascalCase 변환
  4. icons/index.ts에 export 구문 자동 생성
```

## 📊 타입 시스템

### 자동 생성되는 타입

```typescript
// types.ts
export type IconName = keyof typeof Icons; // icons/index.ts 기반 자동 추출
export const ICON_NAMES = Object.keys(Icons) as IconName[];
```

**장점:**

- 새 아이콘 추가 시 타입 자동 업데이트
- Storybook select options 자동 동기화
- 컴파일 타임 타입 안전성

## ♿️ 접근성 (Accessibility)

Icon 컴포넌트는 `aria-label` 제공 여부에 따라 자동으로 접근성 속성을 설정합니다.

**의미있는 아이콘 (aria-label 제공):**

```tsx
<Icon name='Search' aria-label='검색' />
// 결과: role="img", aria-label="검색"
```

**장식용 아이콘 (aria-label 생략):**

```tsx
<Icon name='Heart' />
// 결과: aria-hidden="true"
```

### 사용 규칙

| 상황                    | aria-label | 예시                                                  |
| ----------------------- | ---------- | ----------------------------------------------------- |
| 아이콘만 있는 클릭 요소 | ✅ 필수    | `<div onClick={...}><Icon aria-label="검색" /></div>` |
| 텍스트와 함께           | ❌ 생략    | `<div><Icon /><span>검색</span></div>`                |
| Button 컴포넌트 내부    | ❌ 생략    | `<Button icon="Search" label="검색" />`               |

## 🐛 트러블슈팅

### 새 아이콘이 타입에 없다고 나옴

```bash
# TypeScript 서버 재시작
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# 또는 다시 생성
npm run generate:icons
```

### 아이콘 색상이 변경되지 않음

**원인: SVG에 `currentColor`로 변환되지 않는 색상이 하드코딩된 경우**

```svg
<!-- ❌ 나쁜 예 - svgr.config.js replaceAttrValues에 없는 색상 -->
<path fill="#FF0000" ... />

<!-- ✅ 좋은 예 - 자동 변환 대상 색상 사용 -->
<path fill="#4B5465" ... />
<path fill="#888E9C" ... />
```

`svgr.config.js`의 `replaceAttrValues`에 해당 색상을 추가하거나, Figma에서 변환 대상 색상 중 하나로
교체 후 `npm run generate:icons` 재실행.

> **참고:** `company/` 폴더의 브랜드 로고는 의도적으로 고정 색상을 유지합니다.

### 아이콘이 렌더링되지 않음

**확인 사항:**

1. `npm run generate:icons` 실행했는지
2. `icons/index.ts`에 export되어 있는지
3. 컴포넌트명이 정확한지
4. 브라우저 콘솔에 경고 메시지 확인

### 컴포넌트명 중복

`generate-icon-exports.js` 실행 시 중복 컴포넌트명을 자동으로 감지하여 경고를 출력합니다.

```
⚠️  중복 컴포넌트명 발견:
  - Search: Name=search.svg, name=search-2.svg
  → 파일명을 수정하거나 Figma에서 Name 파라미터를 확인하세요.
```

## 📚 참고 자료

- [Storybook 문서](http://localhost:6006/?path=/docs/components-icon--docs)
- [SVGR 문서](https://react-svgr.com/)
- [WAI-ARIA: img role](https://www.w3.org/TR/wai-aria/#img)

## 🔄 버전 히스토리

### v0.3.0

- ✨ `#888E9C` → `currentColor` 자동 변환 추가 (`svgr.config.js`)
- 🔤 Figma 파라미터 파일명 자동 rename 스크립트 추가 (`rename-icon-files.js`)
- 🗂️ 폴더 접두사 제거 — flat 구조로 단일화 (`Bell`, `HeartFill` 등)
- 🐛 Fill 아이콘 색상 하드코딩 문제 해결 (`line` / `fill` 모두 `currentColor` 적용)

### v0.2.9

- ✨ 접근성 자동 처리 추가 (`aria-label` 기반)
- 📝 Storybook 문서 개선
- 🐛 `strokeWidth` prop 제거 (미사용)
