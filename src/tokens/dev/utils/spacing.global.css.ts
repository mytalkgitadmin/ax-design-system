/**
 * Spacing Utility Classes
 * spacing.ts에서 자동 생성되는 유틸리티 클래스
 *
 * @description
 * - CSS 모듈 방식: import { pr } from '...'; className={pr[16]}
 * - HTML 글로벌 클래스: className="pr-16"
 */
import { globalStyle, styleVariants } from '@vanilla-extract/css';

import * as spacingTokens from '../helpers/spacing';

// ===== CSS 모듈 방식 (기존) =====

// Margin utilities
export const m = styleVariants(spacingTokens.spacing, (value) => ({
  margin: value,
}));

export const mt = styleVariants(spacingTokens.spacing, (value) => ({
  marginTop: value,
}));

export const mr = styleVariants(spacingTokens.spacing, (value) => ({
  marginRight: value,
}));

export const mb = styleVariants(spacingTokens.spacing, (value) => ({
  marginBottom: value,
}));

export const ml = styleVariants(spacingTokens.spacing, (value) => ({
  marginLeft: value,
}));

export const mx = styleVariants(spacingTokens.spacing, (value) => ({
  marginLeft: value,
  marginRight: value,
}));

export const my = styleVariants(spacingTokens.spacing, (value) => ({
  marginTop: value,
  marginBottom: value,
}));

// Padding utilities
export const p = styleVariants(spacingTokens.spacing, (value) => ({
  padding: value,
}));

export const pt = styleVariants(spacingTokens.spacing, (value) => ({
  paddingTop: value,
}));

export const pr = styleVariants(spacingTokens.spacing, (value) => ({
  paddingRight: value,
}));

export const pb = styleVariants(spacingTokens.spacing, (value) => ({
  paddingBottom: value,
}));

export const pl = styleVariants(spacingTokens.spacing, (value) => ({
  paddingLeft: value,
}));

export const px = styleVariants(spacingTokens.spacing, (value) => ({
  paddingLeft: value,
  paddingRight: value,
}));

export const py = styleVariants(spacingTokens.spacing, (value) => ({
  paddingTop: value,
  paddingBottom: value,
}));

// Gap utilities (Flexbox/Grid)
export const gap = styleVariants(spacingTokens.spacing, (value) => ({
  gap: value,
}));

export const rowGap = styleVariants(spacingTokens.spacing, (value) => ({
  rowGap: value,
}));

export const columnGap = styleVariants(spacingTokens.spacing, (value) => ({
  columnGap: value,
}));

// Inset Spacing utilities
export const inset = styleVariants(spacingTokens.insetSpacing, (value) => ({
  paddingTop: value.y,
  paddingBottom: value.y,
  paddingLeft: value.x,
  paddingRight: value.x,
}));

// ===== HTML 글로벌 클래스 =====

type SpacingKey = keyof typeof spacingTokens.spacing;
const spacingSizes = Object.keys(
  spacingTokens.spacing
) as unknown as SpacingKey[];

// Margin - 전체 .m-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.m-${size}`, {
    margin: spacingTokens.spacing[size],
  });
});

// Margin Top .mt-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mt-${size}`, {
    marginTop: spacingTokens.spacing[size],
  });
});

// Margin Right .mr-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mr-${size}`, {
    marginRight: spacingTokens.spacing[size],
  });
});

// Margin Bottom .mb-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.mb-${size}`, {
    marginBottom: spacingTokens.spacing[size],
  });
});

// Margin Left .ml-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.ml-${size}`, {
    marginLeft: spacingTokens.spacing[size],
  });
});

// Margin X .mx-{size}
spacingSizes.forEach((size) => {
  const value = spacingTokens.spacing[size];
  globalStyle(`.mx-${size}`, {
    marginLeft: value,
    marginRight: value,
  });
});

// Margin Y .my-{size}
spacingSizes.forEach((size) => {
  const value = spacingTokens.spacing[size];
  globalStyle(`.my-${size}`, {
    marginTop: value,
    marginBottom: value,
  });
});

// Padding - 전체 .p-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.p-${size}`, {
    padding: spacingTokens.spacing[size],
  });
});

// Padding Top .pt-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pt-${size}`, {
    paddingTop: spacingTokens.spacing[size],
  });
});

// Padding Right .pr-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pr-${size}`, {
    paddingRight: spacingTokens.spacing[size],
  });
});

// Padding Bottom .pb-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pb-${size}`, {
    paddingBottom: spacingTokens.spacing[size],
  });
});

// Padding Left .pl-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.pl-${size}`, {
    paddingLeft: spacingTokens.spacing[size],
  });
});

// Padding X .px-{size}
spacingSizes.forEach((size) => {
  const value = spacingTokens.spacing[size];
  globalStyle(`.px-${size}`, {
    paddingLeft: value,
    paddingRight: value,
  });
});

// Padding Y .py-{size}
spacingSizes.forEach((size) => {
  const value = spacingTokens.spacing[size];
  globalStyle(`.py-${size}`, {
    paddingTop: value,
    paddingBottom: value,
  });
});

// Gap .gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.gap-${size}`, {
    gap: spacingTokens.spacing[size],
  });
});

// Row Gap .row-gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.row-gap-${size}`, {
    rowGap: spacingTokens.spacing[size],
  });
});

// Column Gap .column-gap-{size}
spacingSizes.forEach((size) => {
  globalStyle(`.column-gap-${size}`, {
    columnGap: spacingTokens.spacing[size],
  });
});
