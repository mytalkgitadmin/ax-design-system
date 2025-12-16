const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 토큰을 재귀적으로 처리하여 변환
function processTokens(obj, parentPath = []) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (value && typeof value === 'object' && value.value !== undefined) {
      // 토큰 값이 있는 경우
      const tokenPath = [...parentPath, key];
      let current = result;

      tokenPath.forEach((segment, index) => {
        if (index === tokenPath.length - 1) {
          current[segment] = {
            value: value.value,
            type: value.type,
            description: value.description,
          };
        } else {
          if (!current[segment]) {
            current[segment] = {};
          }
          current = current[segment];
        }
      });
    } else if (value && typeof value === 'object') {
      // 중첩된 객체인 경우 재귀 처리
      const nested = processTokens(value, [...parentPath, key]);
      Object.assign(result, nested);
    }
  });

  return result;
}

// Primitives 토큰 분리
function separatePrimitives(primitiveTokens) {
  const separated = {
    color: {},
    font: {},
    spacing: {},
    rounded: {},
  };

  if (primitiveTokens.color) {
    separated.color = processTokens(primitiveTokens.color);
  }

  if (primitiveTokens.typo) {
    separated.font = processTokens(primitiveTokens.typo);
  }

  if (primitiveTokens.number) {
    const numbers = primitiveTokens.number;

    // rounded는 별도로 분리
    if (numbers.rounded) {
      separated.rounded = processTokens(numbers.rounded, ['rounded']);
    }

    // 나머지 숫자들은 spacing으로
    const spacingNumbers = { ...numbers };
    delete spacingNumbers.rounded;
    separated.spacing = processTokens(spacingNumbers);
  }

  return separated;
}

// Semantic 토큰 분리
function separateSemantics(figmaTokens) {
  const semanticColors = {};

  Object.keys(figmaTokens).forEach((setName) => {
    if (setName.startsWith('semantic/')) {
      const brandName = setName.replace('semantic/', '');
      const tokens = figmaTokens[setName];

      if (tokens.color) {
        // brandName을 키로 사용하지 않고 바로 color 토큰을 처리
        semanticColors[brandName] = processTokens(tokens.color);
      }
    }
  });

  return {
    colors: semanticColors,
  };
}

// Figma 토큰 읽기
const figmaTokensPath = path.join(__dirname, '../src/figma/tokens.json');
const figmaTokens = JSON.parse(fs.readFileSync(figmaTokensPath, 'utf8'));

// 토큰 디렉토리 생성
const tokensDir = path.join(__dirname, '../src/tokens');
const primitivesDir = path.join(tokensDir, 'primitives');
const semanticDir = path.join(tokensDir, 'semantic');

[tokensDir, primitivesDir, semanticDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Primitives 토큰 분리 및 저장
if (figmaTokens['primitive/value']) {
  const primitives = separatePrimitives(figmaTokens['primitive/value']);

  // color 네임스페이스로 감싸서 저장 (참조 해결을 위해)
  fs.writeFileSync(
    path.join(primitivesDir, 'color.json'),
    JSON.stringify({ color: primitives.color }, null, 2)
  );
  console.log('✅ Primitives: color.json 생성 완료');

  // typo 네임스페이스로 감싸서 저장
  fs.writeFileSync(
    path.join(primitivesDir, 'font.json'),
    JSON.stringify({ typo: primitives.font }, null, 2)
  );
  console.log('✅ Primitives: font.json 생성 완료');

  // number 네임스페이스로 감싸서 저장
  fs.writeFileSync(
    path.join(primitivesDir, 'spacing.json'),
    JSON.stringify({ number: primitives.spacing }, null, 2)
  );
  console.log('✅ Primitives: spacing.json 생성 완료');

  fs.writeFileSync(
    path.join(primitivesDir, 'rounded.json'),
    JSON.stringify({ number: primitives.rounded }, null, 2)
  );
  console.log('✅ Primitives: rounded.json 생성 완료');
}

// Semantic 토큰 분리 및 저장
const semantics = separateSemantics(figmaTokens);

fs.writeFileSync(
  path.join(semanticDir, 'colors.json'),
  JSON.stringify(semantics.colors, null, 2)
);
console.log('✅ Semantic: colors.json 생성 완료');

console.log('\n📦 토큰 타입별 분리 완료!');

// style-dictionary CLI를 사용하여 빌드
try {
  execSync('npx style-dictionary build --config style-dictionary.config.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });

  console.log('✅ 토큰 빌드가 완료되었습니다!');
  console.log('   - TypeScript: src/tokens/index.ts');
  console.log('   - CSS 변수: src/tokens/variables.css');
} catch (error) {
  console.error('❌ 토큰 빌드 중 오류 발생:', error.message);
  process.exit(1);
}
