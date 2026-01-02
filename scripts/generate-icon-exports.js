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
      const pathParts = relativePath.replace('.tsx', '').split('/');

      let componentName;
      let category;

      // 1. interface 폴더: 접두사 제거 (Check, User 등)
      if (pathParts[0] === 'interface') {
        category = 'interface';
        const fileName = pathParts[pathParts.length - 1];
        componentName = fileName.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      }
      // 2. circle 폴더: Circle + 파일명 (system/interface 제외)
      else if (pathParts[0] === 'circle') {
        category = 'circle';
        const fileName = pathParts[pathParts.length - 1];
        componentName = 'Circle' + fileName.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      }
      // 3. arrow/chevron 폴더: arrow 카테고리, Chevron + 파일명
      else if (pathParts[0] === 'arrow' && pathParts[1] === 'chevron') {
        category = 'arrow';
        const fileName = pathParts[pathParts.length - 1];
        componentName = 'Chevron' + fileName.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      }
      // 4. arrow 폴더: arrow 카테고리, 하위 경로만 조합
      // arrow/Down → Down, arrow/dropdown/Down → DropdownDown
      else if (pathParts[0] === 'arrow') {
        category = 'arrow';
        const partsWithoutRoot = pathParts.slice(1);
        componentName = partsWithoutRoot
          .map(part =>
            part.split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join('')
          )
          .join('');
      }
      // 5. shop 폴더: interface에 포함 (접두사 제거)
      else if (pathParts[0] === 'shop') {
        category = 'interface';
        const fileName = pathParts[pathParts.length - 1];
        componentName = fileName.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      }
      // 6. 나머지 (social 등): 파일명만 사용 (접두사 제거)
      else {
        category = pathParts[0];
        const fileName = pathParts[pathParts.length - 1];
        componentName = fileName.split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
      }

      results.push({ componentName, importPath, category });
    }
  });

  return results;
}

const icons = getAllTsxFiles(iconsDir);

// 카테고리별로 정렬: interface(shop 포함), social, circle, arrow(chevron, dropdown 포함)
const categoryOrder = ['interface', 'social', 'circle', 'arrow'];
const sortedIcons = icons.sort((a, b) => {
  const aIndex = categoryOrder.indexOf(a.category);
  const bIndex = categoryOrder.indexOf(b.category);

  if (aIndex !== bIndex) {
    return aIndex - bIndex;
  }

  // 같은 카테고리 내에서는 이름순 정렬
  return a.componentName.localeCompare(b.componentName);
});

// Generate exports
const exportStatements = sortedIcons.map(({ componentName, importPath }) =>
  `export { SvgComponent as ${componentName} } from '${importPath}';`
).join('\n');

fs.writeFileSync(outputFile, exportStatements + '\n');

console.log(`✅ Generated exports for ${icons.length} icons in ${outputFile}`);
