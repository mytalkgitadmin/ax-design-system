import { assignInlineVars } from '@vanilla-extract/dynamic';

import { Badge } from '../../../../Badge';
import { Flex } from '../../../../Flex';
import { Thumbnail } from '../../../../Thumbnail';

import * as styles from './ProductCard.css';

export type ProductCardProps = {
  layout?: 'vertical' | 'horizontal' | 'compact';
  image: string;
  brand?: string;
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
  const formatPrice = (p: number) => p.toLocaleString() + '원';

  return (
    <div
      className={styles.productCard({ layout })}
      style={assignInlineVars({
        [styles.cardRadiusVar]: themeVars?.borderRadius || '8px',
        [styles.cardBgVar]: themeVars?.backgroundColor || 'transparent',
      })}
    >
      {/* Image Area */}
      <div className={styles.imageWrapper({ layout })}>
        <Thumbnail src={image} alt={title} className={styles.image} />
        {(layout === 'vertical' || layout === 'compact') &&
          tags &&
          tags.length > 0 && (
            <div style={{ position: 'absolute', top: 8, left: 8 }}>
              <Badge label={tags[0]} variant='solid' color='primary' />
            </div>
          )}
      </div>

      {/* Content Area */}
      <div className={styles.content({ layout })}>
        <div className={styles.title({ layout })}>{title}</div>

        <div>
          {discount && <span className={styles.discount}>{discount}%</span>}
          <span className={styles.price}>{formatPrice(price)}</span>
          {originalPrice && (
            <span className={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {layout === 'horizontal' && tags && (
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
