// Tabs types

/**
 * 탭의 스타일 변형
 * - none: 스타일 없음 (텍스트만)
 * - underlined: 하단 언더라인 (디자인에서 'Underlined')
 * - rounded: 둥근 배경 (디자인에서 'Rounded')
 */
export type TabsVariant = 'none' | 'underlined' | 'rounded';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * 탭들의 정렬 방식 (justify-content)
 * - start: 왼쪽 정렬 (기본값)
 * - center: 중앙 정렬
 * - end: 오른쪽 정렬
 * - between: 양 끝 배치, 사이 균등 분배
 * - around: 탭 주변 균등 공간
 * - evenly: 완전 균등 분배
 */
export type TabsJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export type TabsColorScheme = {
  default: string;
  hover: string;
  active: string;
  text: string;
};

export type TabItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type TabsProps = {
  // 필수: 탭 목록
  items: TabItem[];

  // 스타일 옵션
  variant?: TabsVariant;
  size?: TabsSize;
  color?: string; // 시맨틱 토큰 이름 또는 커스텀 컬러 값
  rounded?: TabsRounded;
  justify?: TabsJustify; // 탭들의 정렬 방식

  // 상태 제어 (제어 컴포넌트 패턴)
  value?: string; // 현재 활성화된 탭 (제어 컴포넌트)
  defaultValue?: string; // 초기 활성 탭 (비제어 컴포넌트)
  onChange?: (value: string) => void; // 탭 변경 이벤트
};

// Storybook을 위한 options 배열
export const TABS_VARIANTS: TabsVariant[] = ['none', 'underlined', 'rounded'];
export const TABS_SIZES: TabsSize[] = ['sm', 'md', 'lg'];
export const TABS_ROUNDED: TabsRounded[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];
export const TABS_JUSTIFY: TabsJustify[] = [
  'start',
  'center',
  'end',
  'between',
  'around',
  'evenly',
];
