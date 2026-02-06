export type StepperProps = {
  /**
   * 컴포넌트 크기
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 컴포넌트 색상 테마
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | string;

  /**
   * 테마 설정을 덮어쓰기 위한 rounded 옵션
   */
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 초기값 (비제어 컴포넌트)
   */
  defaultValue?: number;

  /**
   * 현재 값 (제어 컴포넌트)
   */
  value?: number;

  /**
   * 최소값
   */
  min?: number;

  /**
   * 최대값
   */
  max?: number;

  /**
   * 증감 단위
   * @default 1
   */
  step?: number;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 스타일 변형
   * @default 'outlined'
   */
  variant?: 'outlined' | 'filled';

  /**
   * 값 변경 시 콜백
   */
  onChange?: (value: number | null) => void;

  /**
   * 읽기 전용 여부
   * @default false
   */
  readOnly?: boolean;

  /**
   * 추가 스타일
   */
  style?: React.CSSProperties;

  /**
   * 추가 클래스
   */
  className?: string;
};
