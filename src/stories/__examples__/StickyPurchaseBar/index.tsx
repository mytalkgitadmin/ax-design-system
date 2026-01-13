import { Button } from '../../Button';

import * as styles from './StickyPurchaseBar.css';

export type StickyPurchaseBarProps = {
  /** 장바구니 버튼 클릭 핸들러 */
  onCartClick?: () => void;
  /** 구매하기 버튼 클릭 핸들러 */
  onPurchaseClick?: () => void;
};

/**
 * StickyPurchaseBar 컴포넌트
 *
 * 모바일에서 화면 하단에 고정되는 구매 버튼 바
 * - md breakpoint(768px) 이하에서만 표시
 * - 장바구니/구매하기 버튼만 포함
 * - 버튼 클릭 시 상위 컴포넌트에서 Bottom Sheet 표시
 */
export const StickyPurchaseBar = ({
  onCartClick,
  onPurchaseClick,
}: StickyPurchaseBarProps) => {
  return (
    <div className={styles.stickyBar}>
      <div className={styles.stickyContent}>
        <div className={styles.buttonRow}>
          <Button
            size='lg'
            color='tertiary'
            label='장바구니'
            icon='Bag'
            onClick={onCartClick}
            style={{ flex: 0 }}
          />
          <Button
            variant='solid'
            size='lg'
            color='secondary'
            label='구매하기'
            onClick={onPurchaseClick}
            style={{ flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};
