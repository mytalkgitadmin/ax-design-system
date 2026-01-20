# 디자인 시스템 프로젝트 가이드 인덱스

> 디자인 시스템 관련 모든 문서의 인덱스입니다.

---

## 📚 문서 구조

### 1️⃣ 개발 가이드

컴포넌트 및 토큰 개발 시 참고하는 기술 문서

| 문서                                                               | 설명                 | 대상   |
| ------------------------------------------------------------------ | -------------------- | ------ |
| [CODE_CONVENTION.md](./CODE_CONVENTION.md)                         | 코드 작성 규칙       | 개발자 |
| [COMPONENT_DEVELOPMENT_GUIDE.md](./COMPONENT_DEVELOPMENT_GUIDE.md) | 컴포넌트 개발 가이드 | 개발자 |
| [ICON_COMPONENT.md](./ICON_COMPONENT.md)                           | Icon 컴포넌트 사용법 | 개발자 |
| [THEME_ARCHITECTURE.md](./THEME_ARCHITECTURE.md)                   | 테마 시스템 구조     | 개발자 |
| [TOKEN_GUIDE.md](./TOKEN_GUIDE.md)                                 | 디자인 토큰 가이드   | 개발자 |
| [TOKEN_USAGE_GUIDE.md](./TOKEN_USAGE_GUIDE.md)                     | 토큰 사용법          | 개발자 |

### 2️⃣ 템플릿 및 체크리스트

새 컴포넌트/Foundation 추가 시 사용하는 템플릿

| 문서                                                      | 설명                          | 대상   |
| --------------------------------------------------------- | ----------------------------- | ------ |
| ⭐ **[COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md)** | **컴포넌트 품질 체크리스트**  | 개발자 |
| ⭐ **[COMPONENT_TEMPLATE.md](./COMPONENT_TEMPLATE.md)**   | **컴포넌트 Stories 템플릿**   | 개발자 |
| ⭐ **[FOUNDATION_TEMPLATE.md](./FOUNDATION_TEMPLATE.md)** | **Foundation Stories 템플릿** | 개발자 |

### 3️⃣ 감사 및 개선 문서 (Artifact)

프로젝트 전체 점검 및 개선 계획 (`.gemini/antigravity/brain/` 디렉토리)

| 문서                         | 설명                         | 대상           |
| ---------------------------- | ---------------------------- | -------------- |
| design_system_audit_plan.md  | 전체 감사 및 개선 전략       | 관리자, 개발자 |
| component_audit_checklist.md | 26개 컴포넌트 상세 점검 결과 | 관리자, 개발자 |
| task.md                      | 4주 단계별 실행 계획         | 개발자         |

---

## 🚀 빠른 시작

### 새 컴포넌트 추가하기

1. **개발 가이드 읽기**
   - [COMPONENT_DEVELOPMENT_GUIDE.md](./COMPONENT_DEVELOPMENT_GUIDE.md) 숙지
   - [CODE_CONVENTION.md](./CODE_CONVENTION.md) 확인

2. **템플릿 사용**
   - [COMPONENT_TEMPLATE.md](./COMPONENT_TEMPLATE.md) 복사
   - Stories 파일 작성

3. **체크리스트 확인**
   - [COMPONENT_CHECKLIST.md](./COMPONENT_CHECKLIST.md) 실행
   - 14점 만점 중 12점 이상 목표

4. **참고 예시**
   - Button: `src/stories/Button/Button.stories.tsx` (13점)
   - Avatar: `src/stories/Avatar/Avatar.stories.tsx` (14점)
   - Input: `src/stories/Input/Input.stories.tsx` (12점)

---

### 새 Foundation 추가하기

1. **토큰 가이드 읽기**
   - [TOKEN_GUIDE.md](./TOKEN_GUIDE.md) 숙지
   - [TOKEN_USAGE_GUIDE.md](./TOKEN_USAGE_GUIDE.md) 확인

2. **템플릿 사용**
   - [FOUNDATION_TEMPLATE.md](./FOUNDATION_TEMPLATE.md) 복사
   - Stories 파일 작성

3. **참고 예시**
   - Colors: `src/stories/Colors/Colors.stories.tsx` (12점)
   - Spacing: `src/stories/Spacing/Spacing.stories.tsx` (13점)

---

## 📊 품질 기준

### 컴포넌트 평가 기준 (14점 만점)

| 등급                  | 점수    | 기준                                   |
| --------------------- | ------- | -------------------------------------- |
| ⭐⭐⭐⭐⭐ Gold       | 12-14점 | 출시 준비 완료 (Button, Avatar, Input) |
| ⭐⭐⭐⭐ Silver       | 9-11점  | 약간의 보완 필요 (Tabs)                |
| ⭐⭐⭐ Bronze         | 6-8점   | 개선 필요                              |
| ⭐⭐ Need Improvement | 3-5점   | 상당한 개선 필요                       |
| ⭐ Critical           | 0-2점   | 즉시 개선 필요                         |

### 평가 항목 (각 2점)

1. **개요** (Description): JSDoc 설명, 목적, 사용 시나리오
2. **Props API**: argTypes 카테고리 분류, 상세 설명
3. **시각적 예시**: Primary, Variants, Sizes, States Story 존재
4. **접근성**: ARIA, 키보드, 스크린 리더 가이드
5. **사용 가이드**: Do's/Don'ts, Best Practices
6. **코드 스니펫**: 기본/고급 사용 예시
7. **실전 예시**: Real World Example Story

---

## 🎯 개선 우선순위

### High Priority (즉시 개선)

- [ ] **Elevation**: 5점 → 12점 목표
- [ ] **Responsive**: 3점 → 12점 목표
- [ ] **ZIndex**: 4점 → 12점 목표
- [ ] **Form 컴포넌트**: Checkbox, Radio, Select, Textarea, FormField

### Medium Priority (1-2주 내)

- [ ] **Rounded**: 5점 → 10점 목표
- [ ] **Text**: 11점 → 13점 목표
- [ ] **Data Display**: Table, Badge, Accordion, Carousel

### Low Priority (장기)

- [ ] Grid, Flex 레이아웃 컴포넌트
- [ ] BreadCrumb, Thumbnail, Stepper
- [ ] 패턴 라이브러리 구축

---

## 📖 사용 시나리오

### 시나리오 1: 신규 컴포넌트 개발자

```
1. COMPONENT_DEVELOPMENT_GUIDE.md 읽기
2. COMPONENT_TEMPLATE.md 복사하여 Stories 작성
3. COMPONENT_CHECKLIST.md로 자가 점검
4. 12점 이상 달성 시 PR 제출
```

### 시나리오 2: 기존 컴포넌트 개선자

```
1. component_audit_checklist.md에서 현재 점수 확인
2. 부족한 항목 파악
3. COMPONENT_TEMPLATE.md 참고하여 개선
4. COMPONENT_CHECKLIST.md 재점검
```

### 시나리오 3: 프로젝트 관리자

```
1. design_system_audit_plan.md 전체 전략 확인
2. component_audit_checklist.md 현황 파악
3. task.md 실행 계획 검토
4. 우선순위 조정 및 리소스 배분
```

### 시나리오 4: 새 팀원 온보딩

```
1. README.md 프로젝트 개요 파악
2. CODE_CONVENTION.md 코드 규칙 학습
3. Button.stories.tsx Gold Standard 분석
4. COMPONENT_TEMPLATE.md로 첫 컴포넌트 작성
```

---

## 🔄 문서 업데이트 주기

| 문서 유형   | 업데이트 주기              | 담당          |
| ----------- | -------------------------- | ------------- |
| 개발 가이드 | 분기 1회                   | Tech Lead     |
| 템플릿      | 필요 시 (Breaking Changes) | Tech Lead     |
| 체크리스트  | 필요 시 (기준 변경)        | Tech Lead     |
| 감사 문서   | 분기 1회                   | PM, Tech Lead |

---

## 💬 문의 및 피드백

- **Jira**: `npm run jira:create`
- **GitHub Issues**: [design-system/issues](https://github.com/mytalkgitadmin/design-system/issues)
- **Storybook**: [Chromatic](https://www.chromatic.com/)

---

## 📝 문서 작성 기준

모든 문서는 다음 기준을 따릅니다:

### 구조

- Markdown 형식 사용
- 명확한 헤더 계층 (H1 → H2 → H3)
- 목차 제공 (3개 섹션 이상)

### 스타일

- 이모지 활용 (가독성 향상)
- 테이블 사용 (비교, 체크리스트)
- 코드 블록 사용 (예시)
- 강조: **굵게**, _기울임_, `코드`

### 내용

- 목적 명시 (맨 위)
- 대상 독자 명시
- 예시 포함
- 참고 자료 링크

---

## 🗂️ 파일 구조

```
design-system/
├── docs/                              # 📚 문서 디렉토리
│   ├── CODE_CONVENTION.md
│   ├── COMPONENT_DEVELOPMENT_GUIDE.md
│   ├── ICON_COMPONENT.md
│   ├── THEME_ARCHITECTURE.md
│   ├── TOKEN_GUIDE.md
│   ├── TOKEN_USAGE_GUIDE.md
│   ├── COMPONENT_CHECKLIST.md        # ⭐ 체크리스트
│   ├── COMPONENT_TEMPLATE.md         # ⭐ 컴포넌트 템플릿
│   ├── FOUNDATION_TEMPLATE.md        # ⭐ Foundation 템플릿
│   └── DOCS_INDEX.md                 # 📖 이 파일
│
├── .gemini/antigravity/brain/[id]/   # 🧠 감사 문서 (Artifact)
│   ├── design_system_audit_plan.md
│   ├── component_audit_checklist.md
│   └── task.md
│
├── src/
│   ├── stories/                      # 📖 Storybook
│   │   ├── Button/
│   │   │   └── Button.stories.tsx   # Gold Standard
│   │   ├── Avatar/
│   │   │   └── Avatar.stories.tsx   # Gold Standard
│   │   └── ...
│   ├── tokens/                       # 🎨 디자인 토큰
│   └── theme/                        # 🌈 테마
│
└── README.md                          # 📄 프로젝트 개요
```

---

## 🎯 다음 단계

1. [ ] 이 인덱스 파일을 README.md에 링크
2. [ ] Storybook에 "Getting Started" 페이지 추가 (MDX)
3. [ ] 접근성 가이드 통합 문서 작성 (ACCESSIBILITY_GUIDE.md)
4. [ ] 기여 가이드 작성 (CONTRIBUTION_GUIDE.md)
