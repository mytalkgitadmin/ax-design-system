// Checkbox types

export type CheckboxSize = 'md' | 'lg';

export type CheckboxProps = {
  /**
   * 체크박스 크기
   * @default 'lg'
   */
  size?: CheckboxSize;

  /**
   * 체크 상태
   * @default false
   */
  checked?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 체크박스 레이블
   */
  label: string;

  /**
   * 부가 설명 텍스트 (선택사항)
   */
  helpText?: string;

  /**
   * 체크 상태 변경 핸들러
   */
  onChange?: (checked: boolean) => void;

  /**
   * HTML id 속성
   */
  id?: string;

  /**
   * HTML name 속성
   */
  name?: string;

  /**
   * 추가 className
   */
  className?: string;
};

// Storybook을 위한 options 배열
export const CHECKBOX_SIZES: CheckboxSize[] = ['md', 'lg'];
