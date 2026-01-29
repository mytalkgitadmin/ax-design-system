import { toRem } from '../../../../../tokens';
import { Flex } from '../../../../Flex';
import { Grid } from '../../../../Grid';
import { Pagination } from '../../../../Pagination';
import { Select } from '../../../../Select';
import { Tabs } from '../../../../Tabs';
import { Text } from '../../../../Text';
import { ProductCard } from '../ProductCard/ProductCard';

import type { Theme } from '../../../../../theme/types';
import type { ProductData, ProductLayout, ThemeOption } from '../../types';

import * as styles from '../../ExecutiveDemo.css';

type CommerceSectionProps = {
  selectedTheme: ThemeOption;
  currentThemeObject: Theme;
  productData: ProductData[];
};

// 테마별 상품 표시 설정
const THEME_PRODUCT_DISPLAY = {
  default: { layout: 'horizontal' as ProductLayout, count: 6 },
  brandA: { layout: 'vertical' as ProductLayout, count: 4 },
  brandB: { layout: 'compact' as ProductLayout, count: 3 },
} as const;

/**
 * CommerceSection
 * 상품 목록 표시 섹션
 */
export const CommerceSection = ({
  selectedTheme,
  currentThemeObject,
  productData,
}: CommerceSectionProps) => {
  const getProductLayout = (): ProductLayout => {
    return THEME_PRODUCT_DISPLAY[selectedTheme].layout;
  };

  const getProductCount = (): number => {
    return THEME_PRODUCT_DISPLAY[selectedTheme].count;
  };

  const getProductBorderRadius = (): string => {
    const radiusMap = {
      default: currentThemeObject.global.radius.sm,
      brandA: currentThemeObject.global.radius.lg,
      brandB: currentThemeObject.global.radius.md,
    };
    return toRem(radiusMap[selectedTheme]);
  };

  return (
    <div className={styles.boardCard}>
      <Flex direction='column' gap='24'>
        <Tabs
          variant='underlined'
          items={[
            { label: '추천', value: 'all' },
            { label: '인기', value: 'popular' },
            { label: '신상', value: 'new' },
          ]}
        />

        <Flex justify='between' align='center'>
          <Text preset='subTitle1' style={{ flex: 3 }}>
            추천 상품
          </Text>

          <Select
            options={[
              { value: 'all', label: '최신순' },
              { value: 'best', label: '인기순' },
            ]}
            text='정렬'
            size='sm'
            style={{ flex: 1 }}
          />
        </Flex>

        {/* 상품 목록 영역 - 테마별 동적 레이아웃 */}
        {selectedTheme === 'brandA' ? (
          <Grid columns='repeat(2, 1fr)' gap='8'>
            {productData.slice(0, getProductCount()).map((product) => (
              <ProductCard
                key={product.id}
                layout={getProductLayout()}
                image={product.image}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                tags={product.tags}
                themeVars={{
                  borderRadius: getProductBorderRadius(),
                }}
              />
            ))}
          </Grid>
        ) : selectedTheme === 'brandB' ? (
          <Grid columns='1fr' gap='8'>
            {productData.slice(0, getProductCount()).map((product) => (
              <ProductCard
                key={product.id}
                layout={getProductLayout()}
                image={product.image}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                tags={product.tags}
                themeVars={{
                  borderRadius: getProductBorderRadius(),
                }}
              />
            ))}
          </Grid>
        ) : (
          <Flex direction='column' gap='8'>
            {productData.slice(0, getProductCount()).map((product) => (
              <ProductCard
                key={product.id}
                layout={getProductLayout()}
                image={product.image}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                tags={product.tags}
                themeVars={{
                  borderRadius: getProductBorderRadius(),
                }}
              />
            ))}
          </Flex>
        )}

        <Flex justify='center' style={{ marginTop: 'auto' }}>
          <Pagination totalPages={5} currentPage={1} />
        </Flex>
      </Flex>
    </div>
  );
};
