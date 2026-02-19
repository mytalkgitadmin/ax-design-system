const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../src/stories/Icon/icons');
const outputFile = path.join(iconsDir, 'index.ts');

// ─────────────────────────────────────────────
// 공통 변환 함수 (rename-icon-files.js와 동일하게 유지)
// ─────────────────────────────────────────────

/**
 * 문자열을 PascalCase로 변환
 * - camelCase, kebab-case, snake_case, 공백 모두 처리
 * - 순수 숫자는 그대로 유지
 */
function toPascalCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .split(/[-_\s]+/)
    .map((word) => {
      if (!word) return '';
      if (/^\d+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/**
 * 불리언-true 키 정규화 맵
 * Figma에서 같은 의미인데 다르게 쓰인 키들을 통일
 * ex) Filled=True → "Fill"
 */
const KEY_NORMALIZE = {
  filled: 'Fill',
};

/**
 * 생략할 비불리언 값 목록
 * 기본(default)을 의미하는 값은 컴포넌트명에 포함하지 않음
 * ex) Mode=primary → 생략 (NaverPrimary → Naver)
 */
const VALUE_SKIP = new Set(['primary', 'default', 'base']);

/**
 * 파라미터 값 변환 규칙
 *
 *   Key=False          → '' (생략)
 *   Key=primary 등     → '' (기본값 생략)
 *   Key=True           → 정규화된 Key명  (Filled=True → "Fill")
 *   Key=기타값         → 값만            (Direction=down → "Down")
 */
function resolveParam(key, value) {
  const lower = value.toLowerCase();
  if (lower === 'false') return '';
  if (VALUE_SKIP.has(lower)) return ''; // primary 등 기본값 생략
  if (lower === 'true') {
    return KEY_NORMALIZE[key.toLowerCase()] || toPascalCase(key);
  }
  return toPascalCase(value);
}

/**
 * Figma 파라미터 형식 파일명 파싱
 *
 * 형식: "Name=X, Key=Value, Key2=Value2"
 *
 * 정렬 규칙 (파라미터 순서와 무관하게 일관성 보장):
 *   1. Name 값     → 항상 맨 앞
 *   2. 비불리언 값 → 중간  (Direction, Mode, Country, Horizontal, Vertical 등)
 *   3. 불리언 키   → 마지막, 단 'Fill'은 불리언 중 가장 마지막
 *
 * 예:
 *   "Name=search"                                   → "Search"
 *   "Name=arrow, Direction=down"                    → "ArrowDown"
 *   "Name=check, Thick=False"                       → "Check"
 *   "Name=check, Thick=True"                        → "CheckThick"
 *   "Name=heart, Fill=True"                         → "HeartFill"
 *   "Name=eye, Fill=False, View=False"              → "Eye"
 *   "Name=eye, Fill=False, View=True"               → "EyeView"
 *   "Name=eye, Fill=True, View=False"               → "EyeFill"
 *   "Name=eye, Fill=True, View=True"                → "EyeViewFill"   ← View 먼저, Fill 마지막
 *   "Name=more, tight=true, Direction=horizontal"   → "MoreHorizontalTight"
 *   "Name=more, direction=vertical, Tight=true"     → "MoreVerticalTight"
 *   "Name=circleChevron, fill=true, Direction=down" → "CircleChevronDownFill"
 *   "Name=settings, Filled=True"                    → "SettingsFill"  (Filled → Fill 정규화)
 *   "Name=language, Country=globe, Fill=True"       → "LanguageGlobeFill"
 *   "Name=Instagram, Mode=Black"                    → "InstagramBlack"
 */
function parseFigmaParamName(baseName) {
  const params = baseName.split(/,\s*/);

  let nameValue = '';
  const valueParts = []; // 비불리언 값 (Direction=down → "Down")
  const boolParts = []; // 불리언-true 키 (Fill=True → "Fill")

  params.forEach((param) => {
    param = param.trim();
    if (!param) return;

    const eqIndex = param.indexOf('=');
    if (eqIndex === -1) {
      if (param) valueParts.push(toPascalCase(param));
      return;
    }

    const key = param.slice(0, eqIndex).trim();
    const value = param.slice(eqIndex + 1).trim();

    if (key === 'Name') {
      nameValue = toPascalCase(value);
    } else {
      const lower = value.toLowerCase();
      if (lower === 'false') return;
      if (lower === 'true') {
        boolParts.push(resolveParam(key, value));
      } else {
        valueParts.push(resolveParam(key, value));
      }
    }
  });

  // 불리언 정렬: 'Fill'은 항상 마지막 (View, Thick, Tight 등은 Fill 앞에)
  boolParts.sort((a, b) => {
    if (a === 'Fill') return 1;
    if (b === 'Fill') return -1;
    return 0;
  });

  return nameValue + valueParts.join('') + boolParts.join('');
}

/**
 * 파일명 → 컴포넌트명 변환
 *
 * 지원 형식:
 *   1. Figma 파라미터: "Name=X, Prop=Value.tsx"
 *   2. kebab-case:     "chevron-down.tsx", "bell-fill.tsx"
 *   3. 기타:           "Tidal Logomark.tsx", "audiomack-icon 1.tsx"
 */
function toComponentName(fileName) {
  const baseName = fileName.replace(/\.tsx?$/, '');
  if (baseName.includes('=')) return parseFigmaParamName(baseName);
  return toPascalCase(baseName.replace(/\s+/g, '-'));
}

/**
 * 디렉토리에서 .tsx 파일 재귀 수집
 */
function getAllTsxFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(filePath, baseDir));
    } else if (file.endsWith('.tsx')) {
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      const importPath = './' + relativePath.replace('.tsx', '');
      const componentName = toComponentName(file);
      results.push({ componentName, importPath, file });
    }
  });

  return results;
}

const icons = getAllTsxFiles(iconsDir);

// 중복 컴포넌트명 감지 및 경고
const nameCount = {};
icons.forEach(({ componentName, file }) => {
  if (!nameCount[componentName]) nameCount[componentName] = [];
  nameCount[componentName].push(file);
});

const duplicates = Object.entries(nameCount).filter(
  ([, files]) => files.length > 1
);
if (duplicates.length > 0) {
  console.warn('\n⚠️  중복 컴포넌트명 발견:');
  duplicates.forEach(([name, files]) => {
    console.warn(`  - ${name}: ${files.join(', ')}`);
  });
  console.warn(
    '  → 파일명을 수정하거나 Figma에서 Name 파라미터를 확인하세요.\n'
  );
}

// 이름순 정렬
const sortedIcons = icons.sort((a, b) =>
  a.componentName.localeCompare(b.componentName)
);

// Export 구문 생성
const exportStatements = sortedIcons
  .map(
    ({ componentName, importPath }) =>
      `export { SvgComponent as ${componentName} } from '${importPath}';`
  )
  .join('\n');

fs.writeFileSync(outputFile, exportStatements + '\n');

console.log(`✅ Generated exports for ${icons.length} icons in ${outputFile}`);
if (duplicates.length > 0) {
  console.log(
    `⚠️  ${duplicates.length}개 중복 컴포넌트명이 있습니다. 위 경고를 확인하세요.`
  );
}
