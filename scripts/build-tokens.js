const { execSync } = require('child_process');
const {
  FIGMA_TOKEN_SETS,
  TOKEN_CATEGORIES,
  PATHS,
  OUTPUT_FILES,
} = require('./style-dictionary/utils/constants');
const {
  resolveProjectPath,
  writeJsonFile,
  ensureDirectories,
  readJsonFile,
} = require('./style-dictionary/utils/file-helpers');
const {
  transformTokenReferences,
  isEmptyToken,
} = require('./style-dictionary/utils/token-helpers');

/**
 * 토큰을 재귀적으로 처리하여 필요한 필드만 추출
 * @param {Object} obj - 처리할 토큰 객체
 * @returns {Object} 정제된 토큰 객체
 */
function processTokens(obj) {
  const result = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value && typeof value === 'object' && value.value !== undefined) {
      // 토큰 리프 노드: value, type, description만 추출
      result[key] = {
        value: value.value,
        type: value.type,
        description: value.description,
      };
    } else if (value && typeof value === 'object') {
      // 중첩 객체: 재귀 처리
      result[key] = processTokens(value);
    }
  });

  return result;
}

/**
 * Primitive 토큰 분리
 * @param {Object} primitiveTokens - Primitive 토큰 셋
 * @returns {Object} 타입별로 분리된 토큰
 */
function separatePrimitives(primitiveTokens) {
  return {
    color: primitiveTokens.color ? processTokens(primitiveTokens.color) : {},
    font: primitiveTokens.typo ? processTokens(primitiveTokens.typo) : {},
    number: primitiveTokens.number
      ? processTokens(primitiveTokens.number.unit)
      : {},
    shadow: primitiveTokens.Semantic?.Shadow
      ? lowercaseKeys(processTokens(primitiveTokens.Semantic.Shadow))
      : {},
  };
}

/**
 * 객체의 키를 소문자로 변환
 * @param {Object} obj
 * @returns {Object}
 */
function lowercaseKeys(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[key.toLowerCase()] = obj[key];
  });
  return result;
}

/**
 * Semantic 토큰 분리
 * @param {Object} figmaTokens - Figma 토큰 전체
 * @returns {Object} { colors, rounded }
 */
// 헬퍼: px를 rem으로 변환
function toRem(value) {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) return value;
  if (numberValue === 0) return '0';
  return `${numberValue / 16}rem`;
}

/**
 * Semantic 토큰 분리
 * @param {Object} figmaTokens - Figma 토큰 전체
 * @returns {Object} { colors, rounded, spacing }
 */
function separateSemantics(figmaTokens) {
  const semanticColors = {};
  let roundedTokens = {};
  let spacingTokens = {};

  Object.keys(figmaTokens).forEach((setName) => {
    if (setName.startsWith(FIGMA_TOKEN_SETS.SEMANTIC_PREFIX)) {
      const tokens = figmaTokens[setName];

      // Semantic 색상 토큰
      if (tokens.color) {
        semanticColors.color = processTokens(tokens.color);
      }

      // Rounded 토큰
      if (tokens.shape?.rounded) {
        const processedRounded = processTokens(tokens.shape.rounded);
        roundedTokens = transformTokenReferences(
          processedRounded,
          /\{number\.unit\.(\d+)\}/g,
          '{number.$1}'
        );
      }

      // Spacing (Gap) 토큰 - REM 변환 적용
      // tokens.layout.gap 또는 tokens.gap 확인
      const gapTokens = tokens.layout?.gap || tokens.gap;

      if (gapTokens) {
        // 1. 기본 추출
        const processedGap = processTokens(gapTokens);

        // 2. 참조 변환 ({number.unit.16} -> {number.16})
        spacingTokens = transformTokenReferences(
          processedGap,
          /\{number\.unit\.(\d+)\}/g,
          '{number.$1}'
        );

        // 3. 값 REM 변환
        Object.keys(spacingTokens).forEach((key) => {
          const token = spacingTokens[key];
          if (!isNaN(key)) {
            token.value = toRem(key);
            token.type = 'dimension';
          }
        });
      }
    }
  });

  return {
    colors: semanticColors,
    rounded: roundedTokens,
    spacing: spacingTokens,
  };
}

/**
 * Brand 토큰 분리
 * @param {Object} figmaTokens
 * @returns {Object}
 */
function separateBrands(figmaTokens) {
  const brandTokens = {};
  let brandIndex = 1;

  Object.keys(figmaTokens).forEach((setName) => {
    if (setName.startsWith(FIGMA_TOKEN_SETS.BRAND_PREFIX)) {
      const tokens = figmaTokens[setName];

      if (tokens.brand) {
        const brandKey = `brand${brandIndex}`;
        brandTokens[brandKey] = processTokens(tokens.brand);
        brandIndex++;
      }
    }
  });

  return brandTokens;
}

/**
 * Primitive 토큰들을 파일로 저장
 * @param {Object} primitives
 * @param {string} outputDir
 */
function savePrimitiveTokens(primitives, outputDir) {
  const primitiveFiles = [
    {
      category: TOKEN_CATEGORIES.COLOR,
      fileName: OUTPUT_FILES.PRIMITIVES.COLOR,
      data: primitives.color,
    },
    {
      category: TOKEN_CATEGORIES.FONT,
      fileName: OUTPUT_FILES.PRIMITIVES.FONT,
      data: primitives.font,
    },
    {
      category: TOKEN_CATEGORIES.NUMBER,
      fileName: OUTPUT_FILES.PRIMITIVES.NUMBER,
      data: primitives.number,
    },
    {
      category: TOKEN_CATEGORIES.SHADOW,
      fileName: OUTPUT_FILES.PRIMITIVES.SHADOW,
      data: primitives.shadow,
    },
  ];

  primitiveFiles.forEach(({ category, fileName, data }) => {
    writeJsonFile(
      `${outputDir}/${fileName}`,
      { [category]: data },
      `✅ Primitives: ${fileName} 생성 완료`
    );
  });
}

/**
 * 메인 빌드 함수
 */
function buildTokens() {
  try {
    // 1. Figma 토큰 읽기
    const figmaTokensPath = resolveProjectPath(__dirname, PATHS.FIGMA_TOKENS);
    const figmaTokens = readJsonFile(figmaTokensPath);

    // 2. 출력 디렉토리 설정
    const primitivesDir = resolveProjectPath(__dirname, PATHS.PRIMITIVES_DIR);
    const semanticDir = resolveProjectPath(__dirname, PATHS.SEMANTIC_DIR);

    ensureDirectories([primitivesDir, semanticDir]);

    // 3. Primitives 토큰 분리 및 저장
    if (figmaTokens[FIGMA_TOKEN_SETS.PRIMITIVE]) {
      const primitives = separatePrimitives(
        figmaTokens[FIGMA_TOKEN_SETS.PRIMITIVE]
      );
      savePrimitiveTokens(primitives, primitivesDir);
    }

    // 5. Semantic 토큰 분리
    const semantics = separateSemantics(figmaTokens);

    // Colors 저장
    const transformedColors = transformTokenReferences(
      semantics.colors,
      /\{brand\./g,
      '{brand1.'
    );

    writeJsonFile(
      `${semanticDir}/${OUTPUT_FILES.SEMANTIC.COLORS}`,
      transformedColors,
      `✅ Semantic: ${OUTPUT_FILES.SEMANTIC.COLORS} 생성 완료`
    );

    // Rounded 저장
    if (!isEmptyToken(semantics.rounded)) {
      writeJsonFile(
        `${primitivesDir}/${OUTPUT_FILES.PRIMITIVES.ROUNDED}`,
        { [TOKEN_CATEGORIES.ROUNDED]: semantics.rounded },
        `✅ Primitives: ${OUTPUT_FILES.PRIMITIVES.ROUNDED} 생성 완료`
      );
    }

    // Spacing 저장 (NEW)
    if (!isEmptyToken(semantics.spacing)) {
      // spacing은 별도 파일로 저장하거나 primitives 폴더에 저장
      // 직접 primitives/spacing.json으로 저장
      writeJsonFile(
        `${primitivesDir}/spacing.json`,
        { [TOKEN_CATEGORIES.SPACING]: semantics.spacing },
        `✅ Primitives: spacing.json 생성 완료`
      );
    }

    console.log('\n📦 토큰 타입별 분리 완료!');

    // 4. Brand 토큰 분리 및 저장
    const brands = separateBrands(figmaTokens);

    if (!isEmptyToken(brands)) {
      writeJsonFile(
        `${semanticDir}/${OUTPUT_FILES.SEMANTIC.BRANDS}`,
        brands,
        `✅ Semantic: ${OUTPUT_FILES.SEMANTIC.BRANDS} 생성 완료`
      );
    }

    // 7. Style Dictionary 빌드 실행
    const projectRoot = resolveProjectPath(__dirname, '.');
    execSync('npx style-dictionary build --config style-dictionary.config.js', {
      stdio: 'inherit',
      cwd: projectRoot,
    });

    console.log(
      `✅ 토큰 빌드가 완료되었습니다!
  - TypeScript: src/tokens/index.ts
  - CSS 변수: src/tokens/variables.css`
    );
  } catch (error) {
    console.error('❌ 토큰 빌드 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
buildTokens();
