import { useState } from 'react';

import { useTheme } from '../../theme';
import { color, spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { CheckboxGroup } from '../Checkbox/CheckboxGroup';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { RadioGroup } from '../Radio/RadioGroup';
import { Tabs } from '../Tabs';
import { Text } from '../Text';
import { Textarea } from '../Textarea';
import { Thumbnail } from '../Thumbnail';

import { gap, py } from '../../tokens/dev/utils/spacing.global.css';

/**
 * 실제 상품 상세 페이지와 유사한 레이아웃으로 디자인 시스템 컴포넌트들을 테스트합니다.
 *
 * 현재 사용 중인 컴포넌트:
 * - Button: 네비게이션, 액션 버튼, 수량 조절, 구매 버튼
 * - Text: 브랜드명, 상품명, 가격, 배송비, 라벨 등 모든 텍스트
 * - Icon: 브레드크럼 아이콘, 네비게이션 화살표
 *
 * 향후 추가 예정:
 * - Badge: 타임딜 뱃지, 할인율 뱃지
 * - Input/Select: 수량 입력, 옵션 선택
 * - 기타 완성되는 컴포넌트들
 */
export const ProductDetailPage = () => {
  const { global, components } = useTheme();
  const buttonTheme = components.Button;

  const [quantity, setQuantity] = useState(1);
  const price = 110;

  // Checkbox state
  const [agreements, setAgreements] = useState<string[]>([]);

  // Radio state
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 브레드크럼 */}
      <nav
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          alignItems: 'center',
        }}
      >
        <Icon name='ChevronRight' size={16} color={color.icon.secondary} />
        <Text preset='body2' as='span' color={color.text.secondary}>
          홈
        </Text>
        <Icon name='ChevronRight' size={14} color={color.icon.muted} />
        <Text preset='body2' as='span' color={color.text.secondary}>
          전자기기
        </Text>
        <Icon name='ChevronRight' size={14} color={color.icon.muted} />
        <Text preset='body2' as='span' color={color.text.secondary}>
          컴퓨터
        </Text>
      </nav>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
        }}
      >
        {/* 왼쪽: 상품 이미지 영역 */}
        <div>
          <Thumbnail />

          {/* 썸네일 이미지 */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            {[1, 2, 3, 4].map((i) => (
              <Thumbnail key={i} width={56} />
            ))}
          </div>
        </div>

        {/* 오른쪽: 상품 정보 및 구매 영역 */}

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${toRem(spacing[8])}`,
            }}
          >
            <Badge label='이달의 베스트 3위' leftIcon='Heart' variant='soft' />
            <Badge label='무료배송' variant='soft' color='green' />
            <Badge label='특가' color='muted' />
          </div>
          <Text preset='label1' color='brand1'>
            스토어명 Apple
          </Text>

          <Text preset='title2'>상품명 2025 맥북 프로 14 M3 PRO</Text>

          {/* 원가 */}
          <Text preset='title2' as='p'>
            2,390,000원
          </Text>

          {/* 할인률 */}
          <Text preset='title2' as='p' color='brand1'>
            10%
          </Text>

          {/* 가격 */}
          <Text preset='title2' as='p'>
            {(price * quantity).toLocaleString()}
            <Text preset='body2' as='span'>
              원
            </Text>
          </Text>

          {/* 배송비 */}
          <Text preset='body1' as='p'>
            배송비
            <Text preset='body1' as='strong'>
              3,000원
            </Text>
          </Text>

          {/* [!] 셀렉트 - 옵션 */}

          {/* 수량 선택 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${color.divider.default}`,
            }}
            className={py[24]}
          >
            <Text preset='body1' weight='semibold' as='span'>
              상품 금액
            </Text>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button
                icon='Minus'
                label='감소'
                variant='outline'
                size='md'
                onClick={handleDecrease}
                disabled={quantity <= 1}
              />
              <input
                type='number'
                value={quantity}
                readOnly
                style={{
                  width: '60px',
                  textAlign: 'center',
                  fontSize: '16px',
                  border: `1px solid ${color.border.default}`,
                  borderRadius: `${buttonTheme.radius ?? global.radius.sm}px`,
                  padding: '8px',
                }}
              />
              <Button
                icon='Plus'
                label='증가'
                variant='outline'
                size='md'
                onClick={handleIncrease}
              />

              <Text
                preset='body1'
                weight='semibold'
                as='span'
                style={{ marginLeft: '16px' }}
              >
                {(price * quantity).toLocaleString()}원
              </Text>
            </div>
          </div>

          {/* 총 상품 금액 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${color.divider.default}`,
            }}
            className={py[24]}
          >
            <Text as='span'>총 수량 {quantity}개</Text>

            <Text preset='title2' color='brand1'>
              {(price * quantity).toLocaleString()}
              <Text as='span'>원</Text>
            </Text>
          </div>

          {/* 구매 버튼 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
            }}
            className={gap[4]}
          >
            <Button
              variant='outline'
              size='lg'
              color='primary'
              label='장바구니'
              icon='Heart'
            />
            <Button
              size='lg'
              color='secondary'
              label='장바구니'
              leftIcon='Bag'
            />
            <Button
              variant='solid'
              size='lg'
              color='primary'
              leftIcon='Bag'
              label='바로 구매'
            />
          </div>
        </div>
      </div>

      <Tabs
        variant='underlined'
        size='lg'
        items={[
          { label: '상품정보', value: 'tab1' },
          { label: '리뷰', value: 'tab2' },
          { label: '문의', value: 'tab3' },
          { label: '교환/반품', value: 'tab4' },
        ]}
        justify='between'
      />

      <div style={{ display: 'flex', gap: '4px', margin: '40px 0' }}>
        <Input
          size='lg'
          placeholder='검색어를 입력하세요'
          label='검색'
          hiddenLabel
        />
        <Button
          variant='solid'
          size='lg'
          color='primary'
          icon='Search'
          label='검색'
        />
      </div>
      <div style={{ display: 'grid', gap: '4px', margin: '40px 0' }}>
        <Textarea label='자기소개' maxLength={100} showCharacterCount />
        <Button variant='solid' size='md' color='primary' label='입력' full />
      </div>

      {/* 배송 옵션 선택 */}
      <div
        style={{
          padding: '24px',
          border: `1px solid ${color.border.default}`,
          borderRadius: `${buttonTheme.radius ?? global.radius.sm}px`,
          marginBottom: '24px',
        }}
      >
        <RadioGroup
          label='배송 옵션 선택'
          name='delivery'
          size='lg'
          value={deliveryOption}
          onChange={setDeliveryOption}
          options={[
            {
              value: 'standard',
              label: '일반 배송 (무료)',
              helpText: '3-5일 소요',
            },
            {
              value: 'express',
              label: '빠른 배송 (+3,000원)',
              helpText: '1-2일 소요',
            },
            {
              value: 'dawn',
              label: '새벽 배송 (+5,000원)',
              helpText: '오전 7시 전 도착',
            },
          ]}
        />
      </div>

      {/* 구매 전 필수 약관 동의 */}
      <div
        style={{
          padding: '24px',
          border: `1px solid ${color.border.default}`,
          borderRadius: `${buttonTheme.radius ?? global.radius.sm}px`,
          backgroundColor: color.bg.subtle,
        }}
      >
        <CheckboxGroup
          label='구매 전 필수 약관 동의'
          name='agreements'
          size='lg'
          value={agreements}
          onChange={setAgreements}
          options={[
            {
              value: 'terms',
              label: '[필수] 구매 조건 및 결제 진행 동의',
              helpText:
                '상품, 가격, 배송정보 등을 확인하였으며 구매에 동의합니다.',
            },
            {
              value: 'privacy',
              label: '[필수] 개인정보 수집 및 이용 동의',
              helpText: '주문 및 배송을 위한 개인정보 수집에 동의합니다.',
            },
            {
              value: 'marketing',
              label: '[선택] 마케팅 정보 수신 동의',
              helpText: '할인 쿠폰 및 이벤트 정보를 받아보실 수 있습니다.',
            },
          ]}
        />
      </div>
    </div>
  );
};
