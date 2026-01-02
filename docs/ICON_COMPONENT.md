# Icon 컴포넌트

SVG 기반의 커스텀 아이콘 시스템입니다.

## 📁 디렉토리 구조

```
Icon/
├── icons/                  # SVG 컴포넌트들 (카테고리별 폴더 구조)
│   ├── index.ts           # 자동 생성된 export 파일
│   ├── interface/         # 인터페이스 아이콘
│   │   ├── Check.tsx
│   │   ├── Search.tsx
│   │   └── ...
│   ├── arrow/             # 화살표 아이콘
│   │   ├── Down.tsx
│   │   ├── chevron/       # Chevron 하위 폴더
│   │   └── dropdown/      # Dropdown 하위 폴더
│   ├── circle/            # Circle 아이콘 (Duotone/Filled)
│   │   ├── system/        # 시스템 상태 아이콘
│   │   └── interface/     # 인터페이스 아이콘
│   ├── shop/              # 쇼핑 관련 아이콘
│   └── social/            # 소셜 미디어 아이콘
├── index.tsx              # Icon 메인 컴포넌트
├── types.ts               # 타입 정의
└── Icon.stories.tsx       # Storybook 문서
```

## 🚀 새로운 아이콘 추가 방법

### 1. SVG 파일 준비

SVG 파일을 `src/figma/icon/` 디렉토리에 추가합니다.

**파일명 규칙:**
- `kebab-case` 사용 (예: `search.svg`, `chevron-down.svg`)
- 서브 디렉토리 사용 가능 (예: `chevron/down.svg`)

**SVG 최적화:**
- 불필요한 메타데이터 제거
- `width`, `height` 속성 제거 (props로 제어)
- 색상은 `currentColor` 사용 (동적 색상 제어)

### 2. 자동 변환 실행

```bash
npm run generate:icons
```

이 명령어는:
1. SVG 파일을 React 컴포넌트로 변환 (SVGR)
2. `icons/index.ts`에 자동으로 export 추가
3. 타입 자동 생성

### 3. 완료!

변환된 아이콘은 즉시 사용 가능합니다:

```tsx
import { Icon } from '@bemily/design-system';

<Icon name="YourNewIcon" />
```

## 📝 명명 규칙

### 파일명 → 컴포넌트명 변환 규칙

| 파일 경로 | 컴포넌트명 | 카테고리 | 설명 |
|-----------|-----------|---------|------|
| `interface/search.svg` | `Search` | Interface | 접두사 제거 |
| `interface/check.svg` | `Check` | Interface | 접두사 제거 |
| `shop/bag.svg` | `Bag` | Interface | Shop → Interface 포함 |
| `social/instagram.svg` | `Instagram` | Social | 접두사 제거 |
| `circle/system/info-duo.svg` | `CircleInfoDuo` | Circle | Circle 접두사 유지 |
| `circle/system/negative-filled.svg` | `CircleNegativeFilled` | Circle | Circle 접두사 유지 |
| `arrow/chevron/down.svg` | `ChevronDown` | Arrow | Chevron 접두사 유지 |
| `arrow/chevron/down-sm.svg` | `ChevronDownSm` | Arrow | Chevron 접두사 유지 |
| `arrow/dropdown/down.svg` | `DropdownDown` | Arrow | Dropdown 접두사 유지 |
| `arrow/down.svg` | `Down` | Arrow | 기본 화살표 |

**카테고리별 변환 규칙:**
1. **Interface 카테고리** (`interface/`, `shop/` 폴더)
   - 폴더명 접두사 제거
   - 파일명만 PascalCase로 변환
   - Shop 아이콘은 Interface에 포함

2. **Social 카테고리** (`social/` 폴더)
   - 폴더명 접두사 제거
   - 파일명만 PascalCase로 변환

3. **Circle 카테고리** (`circle/` 폴더)
   - "Circle" 접두사 유지
   - 하위 폴더 구조 무시
   - 예: `circle/system/info-duo.svg` → `CircleInfoDuo`

4. **Arrow 카테고리** (`arrow/` 폴더)
   - Chevron, Dropdown 하위 폴더는 접두사 유지
   - 기본 화살표(Down, Up, Left, Right)는 파일명만 사용
   - 예: `arrow/chevron/down.svg` → `ChevronDown`
   - 예: `arrow/down.svg` → `Down`

**공통 규칙:**
- `-`(하이픈)으로 구분된 단어를 대문자로 변환
- Storybook에서는 카테고리별로 그룹화됨 (Interface → Social → Circle → Arrow)

## 🎨 아이콘 스타일 가이드

### 색상 처리

**일반 아이콘 (권장):**
```svg
<!-- currentColor 사용 - 동적 색상 제어 가능 -->
<path fill="currentColor" ... />
```

**특수 아이콘 (Circle Duotone/Filled):**
```svg
<!-- 고정 색상 사용 - 디자인 시스템 고유 색상 -->
<circle fill="#E3E6EE" ... />  <!-- Duotone 배경색 (밝은 회색) -->
<path fill="#888E9C" ... />    <!-- Duotone 전경색 (진한 회색) -->
```

**참고:** CircleNegativeFilled, CirclePositiveFilled 등의 Filled 아이콘은 시맨틱 색상을 사용하며, Duotone 아이콘(`*Duo`)은 위의 두 가지 고정 색상을 사용합니다.

### SVG 속성

**제거해야 할 속성:**
- `width`, `height` → props로 제어
- `id` (충돌 방지)
- `class`

**유지해야 할 속성:**
- `viewBox` (필수)
- `xmlns`
- `fill`, `stroke`

## 🔧 자동화 스크립트

### `generate:icons` 스크립트 동작

```bash
npm run generate:icons
```

**내부 동작:**
1. SVGR로 SVG → React 컴포넌트 변환
2. `scripts/generate-icon-exports.js` 실행
   - 모든 `.tsx` 파일 스캔
   - `icons/index.ts` 자동 생성
3. 불필요한 `index.ts` 삭제 (서브 디렉토리)
4. ESLint 자동 수정

### SVGR 설정 (`svgr.config.js`)

```javascript
{
  typescript: true,
  icon: true,
  exportType: 'named',
  namedExport: 'SvgComponent',
  replaceAttrValues: {
    '#4B5465': 'currentColor',  // 기본 색상 → currentColor 변환
    '#4b5465': 'currentColor',  // 소문자 변형
    '#000': 'currentColor',     // 검정색
    '#000000': 'currentColor',  // 검정색 (6자리)
    // Duotone 색상(#E3E6EE, #888E9C)은 포함하지 않음 → 고정 색상 유지
  },
  dimensions: false,
}
```

**색상 변환 규칙:**
- 일반 아이콘: `replaceAttrValues`에 정의된 색상 → `currentColor` 변환
- Duotone 아이콘: `replaceAttrValues`에 없는 색상 → 고정 색상 유지

## 📊 타입 시스템

### 자동 생성되는 타입

```typescript
// types.ts
export type IconName = keyof typeof Icons;  // 자동 추출
export const ICON_NAMES = Object.keys(Icons) as IconName[];
```

**장점:**
- 새 아이콘 추가 시 타입 자동 업데이트
- Storybook select options 자동 동기화
- 컴파일 타임 타입 안전성

## ♿️ 접근성 (Accessibility)

### 자동 처리 규칙

Icon 컴포넌트는 `aria-label` 제공 여부에 따라 자동으로 접근성 속성을 설정합니다.

**의미있는 아이콘:**
```tsx
<Icon name="Search" aria-label="검색" />
// 결과: role="img", aria-label="검색"
```

**장식용 아이콘:**
```tsx
<Icon name="Check" />
// 결과: aria-hidden="true"
```

### 사용 규칙

| 상황 | aria-label | 예시 |
|------|-----------|------|
| 아이콘만 있는 클릭 요소 | ✅ 필수 | `<div onClick={...}><Icon aria-label="검색" /></div>` |
| 텍스트와 함께 | ❌ 생략 | `<div><Icon /><span>검색</span></div>` |
| Button 컴포넌트 내부 | ❌ 생략 | `<Button icon="Search" label="검색" />` |

## 🐛 트러블슈팅

### 새 아이콘이 타입에 없다고 나옴

```bash
# TypeScript 서버 재시작
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"

# 또는 다시 생성
npm run generate:icons
```

### 아이콘 색상이 변경되지 않음

**원인 1: Circle Duotone/Filled 아이콘**
- 이 아이콘들은 의도적으로 고정 색상 사용
- `color` prop이 적용되지 않음

**원인 2: SVG에 하드코딩된 색상**
```svg
<!-- ❌ 나쁜 예 -->
<path fill="#000000" ... />

<!-- ✅ 좋은 예 -->
<path fill="currentColor" ... />
```

### 아이콘이 렌더링되지 않음

**확인 사항:**
1. `npm run generate:icons` 실행했는지
2. `icons/index.ts`에 export되어 있는지
3. 브라우저 콘솔에 경고 메시지 확인

## 📚 참고 자료

- [Storybook 문서](http://localhost:6006/?path=/docs/components-icon--docs)
- [SVGR 문서](https://react-svgr.com/)
- [WAI-ARIA: img role](https://www.w3.org/TR/wai-aria/#img)

## 🔄 버전 히스토리

### v0.2.9
- ✨ 접근성 자동 처리 추가 (`aria-label` 기반)
- 📝 Storybook 문서 개선
- 🐛 `strokeWidth` prop 제거 (미사용)
- 📚 Circle 아이콘 특별 케이스 문서화
