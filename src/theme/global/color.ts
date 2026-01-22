/**
 * Color 전역 테마
 * 브랜드 컬러, 텍스트 컬러, 배경 컬러 등을 정의
 *
 * 모든 값은 디자인 토큰에서 가져옵니다.
 * 하드코딩된 hex 값 대신 토큰을 사용하여 일관성을 유지합니다.
 */

import { color } from '../../tokens';

export type ColorTheme = {
  brand: {
    default: string;
    hover: string;
    active: string;
    subtle: string;
    strong: string;
    stronger: string;
    strongest: string;
    soft: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    muted: string;
    disabled: string;
    inverse: string;
    link: string;
    negative: string;
    positive: string;
    warning: string;
  };
  bg: {
    default: string;
    subtle: string;
    muted: string;
    disabled: string;
    inverse: string;
    gray: string;
    grayStrong: string;
    grayStrongest: string;
  };
  border: {
    default: string;
    strong: string;
    disabled: string;
    inverse: string;
  };
};

export const colorTheme: ColorTheme = {
  brand: {
    default: color.green['500'], // #8facff
    hover: color.green['600'], // #6f94ff
    active: color.green['700'], // #4f7cff
    subtle: color.green['300'], // #aec3ff
    strong: color.green['500'], // #6f94ff
    stronger: color.green['600'], // #4f7cff
    strongest: color.green['700'], // #355fea
    soft: color.green['50'], // #f9fbff
  },
  text: {
    primary: color.text.primary, // #2f3744
    secondary: color.text.secondary, // #697180
    tertiary: color.text.tertiary, // #888e9c
    muted: color.text.muted, // #a6acb7
    disabled: color.text.disabled, // #c5c9d3
    inverse: color.text.inverse, // #ffffff
    link: color.text.link, // #355fea
    negative: color.text.negative, // #e6374f
    positive: color.text.positive, // #1fa45c
    warning: color.text.warning, // #ffb020
  },
  bg: {
    default: color.bg.default, // #ffffff
    subtle: color.bg.subtle, // #f8f9fc
    muted: color.bg.muted, // #f4f6fb
    disabled: color.bg.disabled, // #e3e6ee
    inverse: color.bg.inverse, // #2f3744
    gray: color.bg.gray, // #edf0f5
    grayStrong: color.bg.grayStrong, // #e3e6ee
    grayStrongest: color.bg.grayStrongest, // #c5c9d3
  },
  border: {
    default: color.border.default, // #e3e6ee
    strong: color.border.strong, // #c5c9d3
    disabled: color.border.disabled, // #e3e6ee
    inverse: color.border.inverse, // #ffffff
  },
};
