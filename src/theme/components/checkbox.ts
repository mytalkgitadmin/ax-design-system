/**
 * Checkbox 컴포넌트 테마
 * Checkbox의 기본 동작과 스타일 정책을 정의
 */

export type CheckboxSize = 'lg' | 'md';

export type CheckboxTheme = {
  radius: {
    lg: number;
    md: number;
  };
};

export const checkboxTheme: CheckboxTheme = {
  radius: {
    lg: 8, // lg 사이즈: 8px
    md: 6, // md 사이즈: 6px
  },
};
