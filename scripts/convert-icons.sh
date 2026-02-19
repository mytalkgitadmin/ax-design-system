#!/bin/bash

# 아이콘 폴더 초기화
rm -rf src/stories/Icon/icons/*

# 1. SVG → TSX 변환 (SVGR)
echo "Converting icons..."
npx @svgr/cli --icon --typescript --out-dir src/stories/Icon/icons src/figma/icon

# 2. SVGR이 그대로 둔 "Name=X, Prop=Value.tsx" 파일들을 올바른 컴포넌트명으로 rename
echo "Renaming Figma parameter filenames..."
node scripts/rename-icon-files.js

# 3. Export 파일 생성
echo "Generating exports..."
node scripts/generate-icon-exports.js

# 4. 하위 폴더의 index.ts 파일 삭제 (최상위 index.ts만 유지)
find src/stories/Icon/icons -name 'index.ts' -not -path '*/Icon/icons/index.ts' -delete

# 5. Lint & Type check
npm run lint:fix
npm run type-check

echo "Icon conversion completed!"
