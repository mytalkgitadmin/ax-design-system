import { IconType } from '../Icon';

export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionType = 'single' | 'multiple';

// AccordionItem 데이터 타입 (객체 배열로 전달 시)
export type AccordionItemData = {
  /** 고유 식별자 */
  value: string;

  /** 카테고리 텍스트 (선택적) */
  category?: string;

  /** 타이틀 텍스트 */
  title?: string;

  /** 왼쪽 아이콘 (선택적) */
  leftIcon?: IconType;

  /** 내용 (문자열 또는 JSX) */
  content: React.ReactNode;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 커스텀 트리거 콘텐츠 (title 대신 사용) */
  trigger?: React.ReactNode;
};

// Accordion (컨테이너)
export type AccordionProps = {
  /** 아코디언 크기 */
  size?: AccordionSize;

  /** 단일 선택 또는 다중 선택 */
  type?: AccordionType;

  /** 초기 펼침 아이템 (단일 선택 모드) */
  defaultValue?: string;

  /** 초기 펼침 아이템들 (다중 선택 모드) */
  defaultValues?: string[];

  /** 제어된 값 (단일 선택 모드) */
  value?: string;

  /** 제어된 값들 (다중 선택 모드) */
  values?: string[];

  /** 값 변경 핸들러 */
  onValueChange?: (value: string | string[]) => void;

  /** 아이템 배열 (객체로 전달 시 사용) */
  items?: AccordionItemData[];

  /** 자식 요소 (JSX로 전달 시 사용 - AccordionItem들) */
  children?: React.ReactNode;
};

// AccordionItem
export type AccordionItemProps = {
  /** 고유 식별자 */
  value: string;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 자식 요소 (AccordionTrigger + AccordionContent) */
  children: React.ReactNode;
};

// AccordionTrigger
export type AccordionTriggerProps = {
  /** 카테고리 텍스트 (선택적) */
  category?: string;

  /** 타이틀 텍스트 */
  title?: string;

  /** 왼쪽 아이콘 (선택적) */
  leftIcon?: IconType;

  /** 자식 요소 (커스텀 내용) */
  children?: React.ReactNode;
};

// AccordionContent
export type AccordionContentProps = {
  /** 자식 요소 */
  children: React.ReactNode;
};

// Storybook을 위한 options 배열
export const ACCORDION_SIZES: AccordionSize[] = ['sm', 'md', 'lg'];
export const ACCORDION_TYPES: AccordionType[] = ['single', 'multiple'];
