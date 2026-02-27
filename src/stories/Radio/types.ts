// Radio types
import { ComponentSize } from '../../types/component';

export type RadioSize = Extract<ComponentSize, 'md' | 'lg'>;
export type RadioLabelPlacement = 'start' | 'end';

export type RadioProps = {
  /**
   * 라디오 버튼 크기
   * @default 'lg'
   */
  size?: RadioSize;

  /**
   * 선택 상태 (제어 컴포넌트)
   * @default false
   */
  checked?: boolean;

  /**
   * 기본 선택 상태 (비제어 컴포넌트)
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * 비활성화 상태
   * @default false
   */
  disabled?: boolean;

  /**
   * 라벨 위치
   * @default 'end'
   */
  labelPlacement?: RadioLabelPlacement;

  /**
   * 라디오 버튼 레이블
   */
  label: string;

  /**
   * 부가 설명 텍스트 (선택사항)
   */
  helpText?: string;

  /**
   * 선택 상태 변경 핸들러
   * react-hook-form 호환을 위해 표준 HTML input onChange 이벤트를 사용합니다
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * HTML id 속성
   */
  id?: string;

  /**
   * HTML name 속성 (라디오 그룹화에 필수)
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
};

// RadioGroup types

export type RadioDirection = 'vertical' | 'horizontal';

export type RadioOption = {
  /**
   * 라디오 버튼의 value
   */
  value: string;

  /**
   * 라디오 버튼 레이블
   */
  label: string;

  /**
   * 부가 설명 텍스트 (선택사항)
   */
  helpText?: string;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;
};

export type RadioGroupProps = {
  /**
   * RadioGroup 레이블
   */
  label?: string;

  /**
   * 라디오 버튼 크기
   * @default 'lg'
   */
  size?: RadioSize;

  /**
   * HTML name 속성 (라디오 그룹화에 필수)
   */
  name: string;

  /**
   * 현재 선택된 value
   */
  value?: string;

  /**
   * 값 변경 핸들러
   */
  onChange?: (value: string) => void;

  /**
   * 라디오 버튼 배치 방향
   * @default 'vertical'
   */
  direction?: RadioDirection;

  /**
   * options 배열 (children 대신 사용 가능)
   */
  options?: RadioOption[];

  /**
   * Radio 컴포넌트들 (options 대신 사용 가능)
   */
  children?: React.ReactNode;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 필수 입력 여부
   * @default false
   */
  required?: boolean;

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
export const RADIO_SIZES: RadioSize[] = ['md', 'lg'];
export const RADIO_DIRECTIONS: RadioDirection[] = ['vertical', 'horizontal'];
