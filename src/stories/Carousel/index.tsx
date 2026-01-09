import { CSSProperties, useRef, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  A11y,
  Autoplay,
  FreeMode,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTheme } from '../../theme';
import { toRem } from '../../tokens/dev/helpers/units';
import { Icon } from '../Icon';
import { Thumbnail } from '../Thumbnail';
import { CarouselProps } from './types';

import type { Swiper as SwiperType } from 'swiper';

import {
  carouselVars,
  navButton,
  navButtonNext,
  navButtonPrev,
  navigationWrapper,
  thumbsSwiper as thumbsSwiperClass,
} from './Carousel.css';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export type { CarouselItem, CarouselProps } from './types';

export const Carousel = ({
  items,
  slidesPerView = 1,
  spaceBetween = 8,
  autoplay = false,
  autoplayDelay = 3000,
  loop = false,
  showNavigation = true,
  showThumbnails = true,
  thumbnailPosition = 'bottom',
  thumbnailSize = 100,
  thumbnailCount = 10,
  showPagination = false,
  className,
  style,
}: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // spaceBetween 파싱: [컨테이너 간격, 슬라이드 간격]
  const [containerGap, slideGap] = Array.isArray(spaceBetween)
    ? spaceBetween
    : [spaceBetween || 16, spaceBetween || 16];

  // 필요한 모듈 동적으로 추가
  const modules = [FreeMode, Navigation, Thumbs, A11y, Keyboard];
  if (autoplay) modules.push(Autoplay);
  if (showPagination && !showThumbnails) modules.push(Pagination);

  const { global, components } = useTheme();
  const themeRadius = components.Thumbnail?.radius ?? global.radius.lg;

  // Grid 레이아웃 스타일 계산
  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns:
      thumbnailPosition === 'left'
        ? `${thumbnailSize}px 1fr`
        : thumbnailPosition === 'right'
          ? `1fr ${thumbnailSize}px`
          : '1fr',
    gridTemplateRows:
      thumbnailPosition === 'top'
        ? `auto 1fr`
        : thumbnailPosition === 'bottom'
          ? `1fr auto`
          : '1fr',
    gridTemplateAreas:
      thumbnailPosition === 'left'
        ? `"thumb image"`
        : thumbnailPosition === 'right'
          ? `"image thumb"`
          : thumbnailPosition === 'top'
            ? `"thumb" "image"`
            : `"image" "thumb"`,
    gap: `${containerGap}px`,
    width: '100%',
    maxWidth: '100%',
    height:
      thumbnailPosition === 'left' || thumbnailPosition === 'right'
        ? `calc(${thumbnailCount * thumbnailSize}px + ${slideGap * (thumbnailCount - 1)}px)`
        : 'fit-content',
  };

  return (
    <div
      className={className}
      style={{
        ...assignInlineVars({
          [carouselVars.thumbnailActiveBorderColor]: global.color.brand.default,
          [carouselVars.borderRadius]: toRem(themeRadius),
          [carouselVars.focusShadowColor]: global.color.brand.subtle,
          [carouselVars.focusOutlineColor]: `${global.color.brand.subtle}50`,
        }),
        ...layoutStyle,
        ...style,
      }}
    >
      {/* 메인 캐러셀 래퍼 */}
      <div
        className={navigationWrapper}
        style={{
          gridArea: 'image',
        }}
      >
        <Swiper
          style={
            {
              '--swiper-pagination-color': '#fff',
              width: '100%',
              height: '100%',
            } as CSSProperties
          }
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              // @ts-expect-error - swiper type definition issue
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error - swiper type definition issue
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          keyboard={{ enabled: true }}
          slidesPerView={slidesPerView}
          spaceBetween={slideGap}
          loop={loop}
          pagination={
            showPagination && !showThumbnails && items.length > 1
              ? { clickable: true }
              : false
          }
          autoplay={
            autoplay
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
          thumbs={showThumbnails ? { swiper: thumbsSwiper } : undefined}
          modules={modules}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Thumbnail
                src={item.src}
                alt={item.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio:
                    thumbnailPosition === 'left' ||
                    thumbnailPosition === 'right'
                      ? 'auto'
                      : '1',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && items.length > 1 && (
          <>
            <button
              ref={prevRef}
              className={`${navButton} ${navButtonPrev}`}
              aria-label='이전 슬라이드'
            >
              <Icon name='ChevronLeft' size={24} />
            </button>
            <button
              ref={nextRef}
              className={`${navButton} ${navButtonNext}`}
              aria-label='다음 슬라이드'
            >
              <Icon name='ChevronRight' size={24} />
            </button>
          </>
        )}
      </div>

      {/* 썸네일 캐러셀 */}
      {showThumbnails && items.length > 1 && (
        <Swiper
          className={thumbsSwiperClass}
          onSwiper={setThumbsSwiper}
          style={{
            width: '100%',
            height: '100%',
            gridArea: 'thumb',
          }}
          direction={
            thumbnailPosition === 'left' || thumbnailPosition === 'right'
              ? 'vertical'
              : 'horizontal'
          }
          spaceBetween={slideGap}
          slidesPerView={thumbnailCount}
          freeMode={true}
          watchSlidesProgress={true}
          centerInsufficientSlides={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <Thumbnail src={item.src} alt={item.alt} ratio='1' />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
