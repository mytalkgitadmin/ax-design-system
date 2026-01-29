import { assignInlineVars } from '@vanilla-extract/dynamic';

import { Badge } from '../../../../Badge';
import { Flex } from '../../../../Flex';
import { Thumbnail } from '../../../../Thumbnail';

import * as styles from './ProductCard.css';

// Constants
const DEFAULT_BORDER_RADIUS = '8px';
const DEFAULT_BACKGROUND_COLOR = 'transparent';
const BADGE_POSITION = { top: 8, left: 8 };

// Utilities
const formatPrice = (price: number): string => `${price.toLocaleString()}원`;

export type ProductCardProps = {
  layout?: 'vertical' | 'horizontal' | 'compact';
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  tags?: string[];
  themeVars?: {
    borderRadius?: string;
    backgroundColor?: string;
  };
};

export const ProductCard = ({
  layout = 'vertical',
  image,
  title,
  price,
  originalPrice,
  discount,
  tags,
  themeVars,
}: ProductCardProps) => {
  // 뱃지 표시 여부 결정
  const shouldShowBadgeOverlay =
    (layout === 'vertical' || layout === 'compact') && tags && tags.length > 0;

  const shouldShowBadgeList = layout === 'horizontal' && tags;

  return (
    <div
      className={styles.productCard({ layout })}
      style={assignInlineVars({
        [styles.cardRadiusVar]:
          themeVars?.borderRadius || DEFAULT_BORDER_RADIUS,
        [styles.cardBgVar]:
          themeVars?.backgroundColor || DEFAULT_BACKGROUND_COLOR,
      })}
    >
      {/* 이미지 영역 */}
      <div className={styles.imageWrapper({ layout })}>
        <Thumbnail src={image} alt={title} className={styles.image} />
        {shouldShowBadgeOverlay && (
          <Flex
            style={{
              position: 'absolute',
              ...BADGE_POSITION,
            }}
          >
            <Badge label={tags[0]} variant='solid' color='primary' />
          </Flex>
        )}
      </div>

      {/* 컨텐츠 영역 */}
      <div className={styles.content({ layout })}>
        <div className={styles.title({ layout })}>{title}</div>

        {/* 가격 정보 */}
        <Flex gap='8' align='center' wrap='wrap'>
          {discount && <span className={styles.discount}>{discount}%</span>}
          {originalPrice && (
            <span className={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className={styles.price}>{formatPrice(price)}</span>
        </Flex>

        {/* 태그 리스트 (horizontal 레이아웃) */}
        {shouldShowBadgeList && (
          <Flex gap='4' style={{ marginTop: 'auto' }}>
            {tags.map((tag) => (
              <Badge key={tag} label={tag} variant='soft' color='primary' />
            ))}
          </Flex>
        )}
      </div>
    </div>
  );
};
