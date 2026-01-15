/**
 * Spacing Utility Classes
 * spacing.ts에서 자동 생성되는 유틸리티 클래스
 *
 * @description
 * - CSS 모듈 방식: import { pr } from '...'; className={pr[16]}
 * - HTML 글로벌 클래스: className="pr-16"
 */
import { globalStyle, styleVariants } from '@vanilla-extract/css';

import { spacing } from '../../index';

// ===== CSS 모듈 방식 (기존) =====

// Margin utilities
export const m = styleVariants(spacing, (value) => ({
  margin: value,
}));

export const mt = styleVariants(spacing, (value) => ({
  marginTop: value,
}));

export const mr = styleVariants(spacing, (value) => ({
  marginRight: value,
}));

export const mb = styleVariants(spacing, (value) => ({
  marginBottom: value,
}));

export const ml = styleVariants(spacing, (value) => ({
  marginLeft: value,
}));

export const mx = styleVariants(spacing, (value) => ({
  marginLeft: value,
  marginRight: value,
}));

export const my = styleVariants(spacing, (value) => ({
  marginTop: value,
  marginBottom: value,
}));

// Padding utilities
export const p = styleVariants(spacing, (value) => ({
  padding: value,
}));

export const pt = styleVariants(spacing, (value) => ({
  paddingTop: value,
}));

export const pr = styleVariants(spacing, (value) => ({
  paddingRight: value,
}));

export const pb = styleVariants(spacing, (value) => ({
  paddingBottom: value,
}));

export const pl = styleVariants(spacing, (value) => ({
  paddingLeft: value,
}));

export const px = styleVariants(spacing, (value) => ({
  paddingLeft: value,
  paddingRight: value,
}));

export const py = styleVariants(spacing, (value) => ({
  paddingTop: value,
  paddingBottom: value,
}));

// Gap utilities (Flexbox/Grid)
export const gap = styleVariants(spacing, (value) => ({
  gap: value,
}));

export const rowGap = styleVariants(spacing, (value) => ({
  rowGap: value,
}));

export const columnGap = styleVariants(spacing, (value) => ({
  columnGap: value,
}));

// TODO: Inset Spacing 기능 추가 필요
// - spacing.ts에 insetSpacing 토큰 정의 필요
// - 형태: { x: string, y: string } - 2축 spacing (예: { x: '1rem', y: '0.5rem' })
// - 사용 예: export const inset = styleVariants(spacingTokens.insetSpacing, (value) => ({
//     padding: `${value.y} ${value.x}`,
//   }));

// ===== HTML 글로벌 클래스 =====

type SpacingKey = keyof typeof spacing;
const spacingSizes = Object.keys(spacing) as SpacingKey[];

// Margin - 전체 .m-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.m-${String(size)}`, {
    margin: spacing[size],
  });
});

// Margin Top .mt-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mt-${String(size)}`, {
    marginTop: spacing[size],
  });
});

// Margin Right .mr-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mr-${String(size)}`, {
    marginRight: spacing[size],
  });
});

// Margin Bottom .mb-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mb-${String(size)}`, {
    marginBottom: spacing[size],
  });
});

// Margin Left .ml-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.ml-${String(size)}`, {
    marginLeft: spacing[size],
  });
});

// Margin X .mx-{size}
spacingSizes.forEach((size) => {
  const value = spacing[size];
  globalStyle(`.mx-${String(size)}`, {
    marginLeft: value,
    marginRight: value,
  });
});

// Margin Y .my-{size}
spacingSizes.forEach((size) => {
  const value = spacing[size];
  globalStyle(`.my-${String(size)}`, {
    marginTop: value,
    marginBottom: value,
  });
});

// Padding - 전체 .p-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.p-${String(size)}`, {
    padding: spacing[size],
  });
});

// Padding Top .pt-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pt-${String(size)}`, {
    paddingTop: spacing[size],
  });
});

// Padding Right .pr-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pr-${String(size)}`, {
    paddingRight: spacing[size],
  });
});

// Padding Bottom .pb-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pb-${String(size)}`, {
    paddingBottom: spacing[size],
  });
});

// Padding Left .pl-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pl-${String(size)}`, {
    paddingLeft: spacing[size],
  });
});

// Padding X .px-{size}
spacingSizes.forEach((size) => {
  const value = spacing[size];
  globalStyle(`.px-${String(size)}`, {
    paddingLeft: value,
    paddingRight: value,
  });
});

// Padding Y .py-{size}
spacingSizes.forEach((size) => {
  const value = spacing[size];
  globalStyle(`.py-${String(size)}`, {
    paddingTop: value,
    paddingBottom: value,
  });
});

// Gap .gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.gap-${String(size)}`, {
    gap: spacing[size],
  });
});

// Row Gap .row-gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.row-gap-${String(size)}`, {
    rowGap: spacing[size],
  });
});

// Column Gap .column-gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.column-gap-${String(size)}`, {
    columnGap: spacing[size],
  });
});
