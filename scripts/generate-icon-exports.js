const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../src/stories/Icon/icons');
const outputFile = path.join(iconsDir, 'index.ts');

function getAllTsxFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsxFiles(filePath, baseDir));
    } else if (file.endsWith('.tsx')) {
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      const importPath = './' + relativePath.replace('.tsx', '');

      // 폴더 경로 + 파일명을 조합하여 컴포넌트 이름 생성
      // 예: chevron/down.tsx → ChevronDown
      //     circle/error-duotone.tsx → ErrorCircleDuotone
      const pathParts = relativePath.replace('.tsx', '').split('/');

      // 모든 경로 부분을 kebab-case에서 PascalCase로 변환 후 합치기
      const componentName = pathParts
        .map(part =>
          part.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('')
        )
        .join('');

      results.push({ componentName, importPath });
    }
  });

  return results;
}

const icons = getAllTsxFiles(iconsDir);

// Generate exports
const exportStatements = icons.map(({ componentName, importPath }) =>
  `export { SvgComponent as ${componentName} } from '${importPath}';`
).join('\n');

fs.writeFileSync(outputFile, exportStatements + '\n');

console.log(`✅ Generated exports for ${icons.length} icons in ${outputFile}`);
