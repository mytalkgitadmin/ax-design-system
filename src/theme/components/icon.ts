/**
 * Icon 컴포넌트 테마
 * Icon의 기본 크기와 색상 정책을 정의
 *
 * 모든 컬러는 토큰에서 가져옵니다.
 */

import { color } from '../../tokens';

export type IconTheme = {
  defaultSize: number;
  defaultColor: string;

  colorPresets: {
    primary: string;
    warning: string;
    success: string;
    danger: string;
  };
};

export const iconTheme: IconTheme = {
  defaultSize: 20,
  defaultColor: color.icon.primary, // #4b5465

  colorPresets: {
    primary: color.blue['600'], // #4f7cff
    warning: color.yellow['600'], // #ffb020
    success: color.green['600'], // #1fa45c
    danger: color.red['600'], // #e6374f
  },
};
