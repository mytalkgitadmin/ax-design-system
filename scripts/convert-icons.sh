#!/bin/bash

# 아이콘 폴더 초기화
rm -rf src/stories/Icon/icons/*

# 1. 일반 아이콘 변환 (currentColor 사용)
echo "Converting icons..."
npx @svgr/cli --icon --typescript --out-dir src/stories/Icon/icons src/figma/icon

# 2. Export 파일 생성
echo "Generating exports..."
node scripts/generate-icon-exports.js

# 3. 하위 폴더의 index.ts 파일 삭제 (최상위 index.ts만 유지)
find src/stories/Icon/icons -name 'index.ts' -not -path '*/Icon/icons/index.ts' -delete

# 4. Lint & Type check
npm run lint:fix
npm run type-check

echo "Icon conversion completed!"
