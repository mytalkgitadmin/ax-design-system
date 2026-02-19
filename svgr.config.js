module.exports = {
  typescript: true,
  icon: true,
  exportType: 'named', // Named Export 사용
  namedExport: 'SvgComponent',
  jsxRuntime: 'automatic', // React import 제거

  // 기본 색상만 currentColor로 변환
  replaceAttrValues: {
    '#4B5465': 'currentColor',
    '#4b5465': 'currentColor',
    '#000': 'currentColor',
    '#000000': 'currentColor',
    '#888E9C': 'currentColor',
  },

  dimensions: false, // width/height를 props로 받을 수 있게
};
