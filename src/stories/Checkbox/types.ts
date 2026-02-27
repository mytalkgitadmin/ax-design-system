// Checkbox types
import { ComponentSize } from '../../types/component';

export type CheckboxSize = Extract<ComponentSize, 'md' | 'lg'>;
export type CheckboxLabelPlacement = 'start' | 'end';

export type CheckboxProps = {
  /**
   * 체크박스 크기
   * @default 'lg'
   */
  size?: CheckboxSize;

  /**
   * 체크 상태 (제어 컴포넌트)
   * @default false
   */
  checked?: boolean;

  /**
   * 기본 체크 상태 (비제어 컴포넌트)
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 필수 입력 여부
   * @default false
   */
  required?: boolean;

  /**
   * 라벨 위치
   * @default 'end'
   */
  labelPlacement?: CheckboxLabelPlacement;

  /**
   * 체크박스 레이블
   */
  label?: React.ReactNode;

  /**
   * 부가 설명 텍스트 (선택사항)
   */
  helpText?: string;

  /**
   * 체크 상태 변경 핸들러
   * react-hook-form 호환을 위해 표준 HTML input onChange 이벤트를 사용합니다
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * HTML id 속성
   */
  id?: string;

  /**
   * HTML name 속성
   */
  name?: string;

  /**
   * HTML value 속성
   */
  value?: string;

  /**
   * 추가 className
   */
  className?: string;

  /**
   * 추가 style
   */
  style?: React.CSSProperties;
};

// CheckboxGroup types

export type CheckboxDirection = 'vertical' | 'horizontal';

export type CheckboxOption = {
  /**
   * 체크박스의 value
   */
  value: string;

  /**
   * 체크박스 레이블
   */
  label?: React.ReactNode;

  /**
   * 부가 설명 텍스트 (선택사항)
   */
  helpText?: string;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  /**
   * CheckboxGroup 레이블
   */
  label?: string;

  /**
   * 체크박스 크기
   * @default 'lg'
   */
  size?: CheckboxSize;

  /**
   * HTML name 속성
   */
  name?: string;

  /**
   * 현재 체크된 value 배열
   */
  value?: string[];

  /**
   * 값 변경 핸들러
   */
  onChange?: (value: string[]) => void;

  /**
   * 체크박스 배치 방향
   * @default 'vertical'
   */
  direction?: CheckboxDirection;

  /**
   * options 배열 (children 대신 사용 가능)
   */
  options?: CheckboxOption[];

  /**
   * Checkbox 컴포넌트들 (options 대신 사용 가능)
   */
  children?: React.ReactNode;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 추가 className
   */
  className?: string;

  /**
   * 추가 style
   */
  style?: React.CSSProperties;
};

// Storybook을 위한 options 배열
export const CHECKBOX_SIZES: CheckboxSize[] = ['md', 'lg'];
export const CHECKBOX_DIRECTIONS: CheckboxDirection[] = [
  'vertical',
  'horizontal',
];
