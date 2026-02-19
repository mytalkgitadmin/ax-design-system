/**
 * rename-icon-files.js
 *
 * SVGR 변환 후 "Name=X,Prop=Value.tsx" 형식으로 남은 파일들을
 * 올바른 PascalCase 컴포넌트명으로 rename합니다.
 *
 * 변환 규칙:
 *   1. Name 값     → 맨 앞
 *   2. 비불리언 값 → 중간  (Direction, Mode, Country 등)
 *   3. 불리언 키   → 마지막, Fill은 불리언 중 가장 마지막
 *
 *   Key=False    → 생략
 *   Key=True     → Key명 (Filled=True → "Fill" 정규화)
 *   Key=기타값   → 값만
 *
 * 예:
 *   Name=arrow,Direction=down.tsx          → ArrowDown.tsx
 *   Name=check,Thick=false.tsx             → Check.tsx
 *   Name=check,Thick=true.tsx             → CheckThick.tsx
 *   Name=eye,Fill=true,View=true.tsx      → EyeViewFill.tsx   (View 먼저, Fill 마지막)
 *   Name=more,tight=true,Direction=horizontal.tsx → MoreHorizontalTight.tsx
 *   Name=settings,Filled=true.tsx         → SettingsFill.tsx  (Filled → Fill)
 */

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../src/stories/Icon/icons');

// ─────────────────────────────────────────────
// generate-icon-exports.js와 동일한 변환 함수
// ─────────────────────────────────────────────

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

const KEY_NORMALIZE = {
  filled: 'Fill',
};

const VALUE_SKIP = new Set(['primary', 'default', 'base']);

function resolveParam(key, value) {
  const lower = value.toLowerCase();
  if (lower === 'false') return '';
  if (VALUE_SKIP.has(lower)) return '';
  if (lower === 'true') {
    return KEY_NORMALIZE[key.toLowerCase()] || toPascalCase(key);
  }
  return toPascalCase(value);
}

function parseFigmaParamName(baseName) {
  const params = baseName.split(/,\s*/);
  let nameValue = '';
  const valueParts = [];
  const boolParts = [];

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

  // Fill은 항상 불리언 중 마지막
  boolParts.sort((a, b) => {
    if (a === 'Fill') return 1;
    if (b === 'Fill') return -1;
    return 0;
  });

  return nameValue + valueParts.join('') + boolParts.join('');
}

function toComponentName(fileName) {
  const baseName = fileName.replace(/\.tsx?$/, '');
  if (baseName.includes('=')) return parseFigmaParamName(baseName);
  return toPascalCase(baseName.replace(/\s+/g, '-'));
}

// ─────────────────────────────────────────────
// 디렉토리 내 .tsx 파일 재귀 rename
// ─────────────────────────────────────────────

function renameFiles(dir) {
  const list = fs.readdirSync(dir);
  const usedNames = new Set();

  // 이미 올바른 이름(=없는 파일)을 먼저 등록
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) return;
    if (!file.endsWith('.tsx')) return;
    if (!file.includes('=')) usedNames.add(file);
  });

  let renamed = 0;
  let skipped = 0;

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      renameFiles(filePath);
      return;
    }

    if (!file.endsWith('.tsx')) return;
    if (!file.includes('=')) return;

    let newName = toComponentName(file) + '.tsx';

    // 충돌 시 숫자 suffix 추가
    let suffix = 1;
    const base = newName.replace('.tsx', '');
    while (usedNames.has(newName)) {
      newName = `${base}${suffix}.tsx`;
      suffix++;
    }

    const newPath = path.join(dir, newName);

    try {
      fs.renameSync(filePath, newPath);
      usedNames.add(newName);
      console.log(`  ✓ ${file} → ${newName}`);
      renamed++;
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
      skipped++;
    }
  });

  if (renamed > 0 || skipped > 0) {
    console.log(
      `  📁 ${dir.replace(process.cwd(), '.')}: ${renamed}개 rename, ${skipped}개 실패`
    );
  }
}

console.log('\n📝 Figma 파라미터 파일명 rename 중...');
renameFiles(iconsDir);
console.log('✅ Rename 완료\n');
