/**
 * Style Dictionary 커스텀 Transform 정의
 */

const { cleanPath } = require('./utils/string-helpers');

/**
 * rounded 토큰의 type을 borderRadius로 변경하는 transform
 */
const roundedToBorderRadius = {
  type: 'attribute',
  name: 'attribute/rounded-to-border-radius',
  transform: (token) => {
    if (token.path[0] === 'rounded') {
      return {
        ...token.attributes,
        category: 'size',
        type: 'borderRadius',
      };
    }
    return token.attributes;
  },
};

/**
 * Tailwind 스타일의 CSS 변수명 생성 transform
 *
 * 변환 규칙:
 * - color prefix 제거: color.gray.50 → gray-50
 * - zIndex 축약: zIndex.hide → z-hide
 * - font-family 축약: font.font-family → font.family
 * - 괄호 제거: brand (1) → brand-1
 */
const tailwindNaming = {
  type: 'name',
  name: 'name/css/tailwind',
  transform: (token) => {
    let path = token.path.slice(); // 복사본 생성

    // 1. 'color' prefix 제거 (색상은 타입이 명확하므로)
    if (path[0] === 'color') {
      path.shift();
    }

    // 2. 'zIndex' → 'z'로 축약
    if (path[0] === 'zIndex') {
      path[0] = 'z';
    }

    // 3. 'font-family' → 'family'
    if (path.includes('font-family')) {
      const idx = path.indexOf('font-family');
      path[idx] = 'family';
    }

    // 4. 브랜드명에서 괄호 제거
    path = cleanPath(path);

    // 경로를 kebab-case로 연결
    return path.join('-');
  },
};

/**
 * Shadow 객체를 CSS box-shadow 문자열로 변환하는 transform
 */
const shadowToCss = {
  type: 'value',
  name: 'value/shadow-to-css',
  matcher: (token) => token.type === 'dropShadow' || token.type === 'boxShadow',
  transform: (token) => {
    // Defensive check: ensure we only transform shadow tokens
    if (token.type !== 'dropShadow' && token.type !== 'boxShadow') {
      return token.value;
    }

    const shadows = Array.isArray(token.value) ? token.value : [token.value];

    return shadows
      .map((shadow) => {
        const { x, y, blur, spread, color } = shadow;
        // x, y, blur, spread에 단위(px) 추가
        return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
      })
      .join(', ');
  },
};

module.exports = {
  roundedToBorderRadius,
  tailwindNaming,
  shadowToCss,
};
