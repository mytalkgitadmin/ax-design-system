import { ReactNode } from 'react';

export type ThumbnailPosition = 'left' | 'right' | 'bottom' | 'top';

export type CarouselProps = {
  /** 캐러셀에 표시할 아이템 배열 */
  items: CarouselItem[];

  /** 한 화면에 표시할 슬라이드 수 (기본값: 1) */
  slidesPerView?: number;

  /**
   * 간격 설정 (px 단위)
   * - number: 슬라이드 간 간격만 설정 (메인/썸네일 간격은 16px 고정)
   * - [number, number]: [메인/썸네일 간격, 슬라이드 간격]
   * (기본값: 16)
   */
  spaceBetween?: number | [number, number];

  /** 자동 재생 활성화 여부 */
  autoplay?: boolean;

  /** 자동 재생 지연 시간 (ms 단위, 기본값: 3000) */
  autoplayDelay?: number;

  /** 루프 재생 여부 (기본값: true) */
  loop?: boolean;

  /** 네비게이션 버튼 표시 여부 (기본값: true) */
  showNavigation?: boolean;

  /** 썸네일 네비게이션 표시 여부 (기본값: true) */
  showThumbnails?: boolean;

  /** 썸네일 위치 (기본값: bottom) */
  thumbnailPosition?: ThumbnailPosition;

  /** 썸네일 크기 (px 단위, width/height 공통 사용, 기본값: 100) */
  thumbnailSize?: number;

  /** 화면에 보여질 썸네일 개수 (기본값: 5) */
  thumbnailCount?: number;

  /** 페이지네이션 표시 여부 (기본값: false) */
  showPagination?: boolean;

  /** 추가 CSS 클래스명 */
  className?: string;

  /** 인라인 스타일 */
  style?: React.CSSProperties;
};

export type CarouselItem = {
  /** 고유 ID */
  id: string;

  /** 이미지 URL */
  src: string;

  /** 이미지 대체 텍스트 */
  alt?: string;

  /** 썸네일 이미지 URL (없으면 src 사용) */
  thumbnail?: string;

  /** 추가 컨텐츠 (오버레이 등) */
  content?: ReactNode;
};
