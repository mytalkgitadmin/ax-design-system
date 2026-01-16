# 컴포넌트 체크리스트

> 새 컴포넌트를 추가하거나 기존 컴포넌트를 개선할 때 사용하는 표준 체크리스트입니다.

---

## 📊 평가 기준 (14점 만점)

### Gold Standard: 12-14점

Button, Avatar, Input 수준의 완벽한 문서화

### Silver Standard: 9-11점

대부분의 항목 구현, 접근성 기본 준수

### Bronze Standard: 6-8점

기본 항목 구현, 일부 개선 필요

---

## ✅ 체크리스트

### 1. 개요 (Description) - 2점

- [ ] **JSDoc 주석 작성** (컴포넌트 상단)

  ````tsx
  /**
   * [ComponentName]은 [목적]을 위한 컴포넌트입니다.
   *
   * ## Props
   * [Props 테이블 - argTypes에서 자동 생성]
   *
   * ## 접근성
   * - [ARIA 속성 설명]
   * - [키보드 네비게이션]
   *
   * ## 사용 예시
   * ```tsx
   * // 기본 사용
   * <ComponentName prop="value" />
   * ```
   */
  ````

- [ ] **목적 및 사용 시나리오 설명**
- [ ] **Props 요약 테이블** (자동 생성되도록 argTypes 작성)

**점수**:

- 2점: 완벽한 JSDoc + Props 테이블 + 사용 예시
- 1점: JSDoc만 있고 예시 부족
- 0점: 설명 거의 없음

---

### 2. Props API - 2점

- [ ] **argTypes 카테고리 분류**
  - Appearance: variant, size, color, rounded 등
  - Content: label, text, children 등
  - State: disabled, error, loading 등
  - Interaction: onClick, onChange 등
  - Accessibility: aria-label, role 등
  - HTML Attributes: type, id, name 등
  - Events: onFocus, onBlur 등

- [ ] **각 prop에 상세 description**
- [ ] **기본값 명시** (args)

**예시**:

```tsx
argTypes: {
  variant: {
    control: 'select',
    options: COMPONENT_VARIANTS,
    description: 'Component variant',
    table: {
      category: 'Appearance',
      defaultValue: { summary: 'solid' }
    },
  },
  // ...
}
```

**점수**:

- 2점: 모든 props 카테고리 분류 + 상세 설명 + 기본값
- 1점: 카테고리 분류만 되어 있음
- 0점: 기본 argTypes만 있음

---

### 3. 시각적 예시 (Visual Examples) - 2점

**필수 Stories** (최소 6개):

- [ ] **Primary** - 기본 예시

  ```tsx
  export const Primary: Story = {};
  ```

- [ ] **Variants** - 모든 variant 시각화

  ```tsx
  export const Variants: Story = {
    render: () => (
      <div style={{ display: 'flex', gap: '16px' }}>
        {VARIANTS.map((variant) => (
          <Component key={variant} variant={variant} />
        ))}
      </div>
    ),
  };
  ```

- [ ] **Sizes** - 모든 size 시각화

- [ ] **States** - 상태별 시각화 (default, hover, active, disabled)

- [ ] **Interactive** - 사용자 상호작용 데모 (useState 사용)

- [ ] **RealWorldExample** - 실제 사용 시나리오

**권장 추가 Stories**:

- Rounded (모서리 둥글기)
- WithIcon (아이콘 포함)
- FullWidth (전체 너비)
- 등 컴포넌트 특성에 맞게

**점수**:

- 2점: 6개 이상 Story + 다양한 조합
- 1점: 3-5개 Story
- 0점: Primary만 있음

---

### 4. 접근성 (Accessibility) - 2점

- [ ] **ARIA 속성 문서화**

  ```tsx
  /**
   * ## 접근성 (Accessibility)
   * - role="button" 자동 적용
   * - aria-label: icon-only일 때 필수
   * - aria-disabled: disabled 상태 표시
   */
  ```

- [ ] **키보드 네비게이션 설명**
  - Tab: 포커스 이동
  - Enter/Space: 활성화
  - Arrow keys: 옵션 선택 등

- [ ] **스크린 리더 지원 설명**

- [ ] **WCAG 기준 준수** (색상 대비, 크기 등)

**점수**:

- 2점: ARIA + 키보드 + 스크린 리더 + WCAG 모두 문서화
- 1점: ARIA 일부만 문서화
- 0점: 접근성 가이드 없음

---

### 5. 사용 가이드 (Usage Guidelines) - 2점

- [ ] **Do's and Don'ts**

  ```tsx
  /**
   * ## 사용 가이드
   *
   * ✅ Do: label을 항상 제공하세요
   * ✅ Do: 에러 시 statusMessage로 구체적 가이드 제공
   *
   * ❌ Don't: placeholder를 label 대신 사용하지 마세요
   * ❌ Don't: 너무 많은 variant를 혼용하지 마세요
   */
  ```

- [ ] **Best Practices**
  - 권장 사용 패턴
  - 성능 최적화 팁
  - 일반적인 실수 방지

- [ ] **주의사항** (Breaking Changes, Deprecated Props 등)

**점수**:

- 2점: Do's/Don'ts + Best Practices + 주의사항
- 1점: Do's/Don'ts만 있음
- 0점: 사용 가이드 없음

---

### 6. 코드 스니펫 (Code Snippets) - 2점

- [ ] **기본 사용법**

  ```tsx
  // 기본 사용
  <Component label='Label' />
  ```

- [ ] **고급 사용법**

  ```tsx
  // 제어 컴포넌트
  const [value, setValue] = useState('');
  <Component value={value} onChange={setValue} />

  // Polymorphic
  <Component as="a" href="https://example.com" />

  // 조합
  <Component leftIcon="Search" rightIcon="X" />
  ```

- [ ] **다양한 시나리오 예시** (최소 3-5개)

**점수**:

- 2점: 기본 + 고급 + 다양한 시나리오 (5개 이상)
- 1점: 기본 + 고급만
- 0점: 기본 예시만 있음

---

### 7. 실전 예시 (Real World Example) - 2점

- [ ] **실제 프로젝트에서 사용 가능한 예시**

  ```tsx
  export const LoginForm: Story = {
    render: () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      return (
        <form onSubmit={handleSubmit}>
          <Input
            label='이메일'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label='비밀번호'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit'>로그인</Button>
        </form>
      );
    },
  };
  ```

- [ ] **복잡한 사용 사례** (여러 컴포넌트 조합)

- [ ] **에러 처리 예시**

**점수**:

- 2점: 2개 이상의 실전 예시 + 에러 처리
- 1점: 1개의 실전 예시
- 0점: 실전 예시 없음

---

## 📋 총점 계산

| 항목           | 배점     | 획득 점수  |
| -------------- | -------- | ---------- |
| 1. 개요        | 2점      | \_\_\_     |
| 2. Props API   | 2점      | \_\_\_     |
| 3. 시각적 예시 | 2점      | \_\_\_     |
| 4. 접근성      | 2점      | \_\_\_     |
| 5. 사용 가이드 | 2점      | \_\_\_     |
| 6. 코드 스니펫 | 2점      | \_\_\_     |
| 7. 실전 예시   | 2점      | \_\_\_     |
| **총점**       | **14점** | **\_\_\_** |

---

## 🎯 등급 판정

- **⭐⭐⭐⭐⭐ Gold (12-14점)**: 출시 준비 완료
- **⭐⭐⭐⭐ Silver (9-11점)**: 약간의 보완 필요
- **⭐⭐⭐ Bronze (6-8점)**: 개선 필요
- **⭐⭐ Need Improvement (3-5점)**: 상당한 개선 필요
- **⭐ Critical (0-2점)**: 즉시 개선 필요

---

## 📝 추가 체크사항

### 파일 구조

- [ ] `index.tsx` - 컴포넌트 구현
- [ ] `types.ts` - TypeScript 타입 정의
- [ ] `[Component].css.ts` - Vanilla Extract 스타일
- [ ] `[Component].stories.tsx` - Storybook 문서
- [ ] `utils.ts` (선택) - 헬퍼 함수
- [ ] `README.md` (선택) - 상세 가이드

### 코드 품질

- [ ] TypeScript strict mode 준수
- [ ] ESLint 에러 0개
- [ ] 토큰 우선 사용 (하드코딩 금지)
- [ ] 일관된 명명 규칙

### 테스트

- [ ] Unit test 작성 (선택)
- [ ] Storybook a11y addon 통과
- [ ] Visual regression test (Chromatic)

---

## 📚 참고 자료

- **Gold Standard 예시**: Button, Avatar, Input
- **컴포넌트 템플릿**: `docs/COMPONENT_TEMPLATE.md`
- **Foundation 템플릿**: `docs/FOUNDATION_TEMPLATE.md`
- **개발 가이드**: `docs/COMPONENT_DEVELOPMENT_GUIDE.md`
