import { useState } from 'react';

import { useTheme } from '../../../theme';
import { color, rounded, spacing, zIndex } from '../../../tokens';
import { toRem } from '../../../tokens/dev/helpers/units';
import { Accordion } from '../../Accordion';
import { Avatar } from '../../Avatar';
import { Badge } from '../../Badge';
import { BreadCrumb } from '../../BreadCrumb';
import { Button } from '../../Button';
import { Carousel } from '../../Carousel';
import { CheckboxGroup } from '../../Checkbox/CheckboxGroup';
import { Flex } from '../../Flex';
import { Icon } from '../../Icon';
import { Input } from '../../Input';
import { RadioGroup } from '../../Radio/RadioGroup';
import { Select } from '../../Select';
import { Stepper } from '../../Stepper';
import { Table } from '../../Table';
import { Tabs } from '../../Tabs';
import { Text } from '../../Text';
import { Textarea } from '../../Textarea';
import { StickyPurchaseBar } from '../StickyPurchaseBar';

import { py } from '../../../tokens/dev/utils/spacing.global.css';
import * as styles from './ProductDetailPage.css';
import detailImage from '../assets/detail.jpg';
import thumbnailImage from '../assets/thumbnail.jpg';

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
  const price = 9999999;

  // 옵션 선택 상태
  const [selectedOption, setSelectedOption] = useState('');
  const [showMobileOptionModal, setShowMobileOptionModal] = useState(false);

  // Checkbox state
  const [agreements, setAgreements] = useState<string[]>([]);

  // Radio state
  const [deliveryOption, setDeliveryOption] = useState('standard');

  // 옵션 데이터
  const productOptions = [
    {
      value: '1',
      label: '[옵션1] Product1',
      thumbnail: '',
      disabled: true,
    },
    {
      value: '2',
      label: '[옵션2] Product2',
      thumbnail: '',
    },
    {
      value: '3',
      label: '[옵션3] Product3',
      thumbnail: '',
    },
    {
      value: '4',
      label: '[옵션4] Product4',
      thumbnail: '',
    },
  ];

  return (
    <Flex direction='column' className={styles.pageContainer}>
      {/* 브레드크럼 */}
      <div className={styles.breadcrumbWrapper}>
        <BreadCrumb
          items={[
            { label: 'HOME', href: '#' },
            { label: '베스트', href: '#' },
            { label: '응원봉', href: '#' },
            { label: '악세사리', href: '#' },
            { label: '스티커', href: '#' },
          ]}
        />
      </div>

      <div className={styles.mainGrid}>
        {/* 왼쪽: 상품 이미지 영역 */}
        <div className={`${styles.imageSection} ${styles.carouselWrapper}`}>
          <Carousel
            items={[
              {
                id: '1',
                src: thumbnailImage,
                alt: '상품 이미지 1',
                thumbnail: thumbnailImage,
                content: <div>상품 상세 이미지 1</div>,
              },
              {
                id: '2',
                src: thumbnailImage,
                alt: '상품 이미지 2',
                thumbnail: thumbnailImage,
                content: <div>상품 상세 이미지 2</div>,
              },
              {
                id: '3',
                src: thumbnailImage,
                alt: '상품 이미지 3',
                thumbnail: thumbnailImage,
                content: <div>상품 상세 이미지 3</div>,
              },
              {
                id: '4',
                src: thumbnailImage,
                alt: '상품 이미지 4',
                thumbnail: thumbnailImage,
                content: <div>상품 상세 이미지 4</div>,
              },
              {
                id: '5',
                src: thumbnailImage,
                alt: '상품 이미지 5',
                thumbnail: thumbnailImage,
                content: <div>상품 상세 이미지 5</div>,
              },
            ]}
            spaceBetween={[24, 8]}
          />
        </div>

        {/* 오른쪽: 상품 정보 및 구매 영역 */}
        <div className={styles.infoSection}>
          <Flex direction='column'>
            <Flex direction='column' gap='12'>
              <Flex align='center' gap='8'>
                <Badge
                  label='이달의 베스트 3위'
                  leftIcon='Heart'
                  variant='soft'
                />
                <Badge label='무료배송' variant='soft' color='green' />
                <Badge label='특가' color='muted' />
              </Flex>

              <Flex align='center' justify='between'>
                <Flex align='center' gap='8'>
                  <Avatar
                    size='xs'
                    type='image'
                    src='https://mockmind-api.uifaces.co/content/human/222.jpg'
                    alt='Artist'
                  />
                  <Text preset='subTitle3'>Artist</Text>
                  <Icon name='ChevronRight' size={12} />
                </Flex>

                <Flex align='center' gap='8'>
                  <Button
                    variant='ghost'
                    size='xs'
                    label='0'
                    leftIcon='Heart'
                    color='secondary'
                  />
                  <Button
                    variant='ghost'
                    size='xs'
                    label='공유'
                    leftIcon='Share'
                    color='secondary'
                  />
                </Flex>
              </Flex>

              <Text preset='title3'>
                [노베라 단독 특전] 아일릿(ILLIT)_03.스티커팩 _ILLIT 3rd MINI
                ALBUM 'bomb' POP-UP STORE Merch.
              </Text>
              <Text preset='subTitle3' as='p' color={color.text.secondary}>
                결제일 기준 2-3일 이내 출고 예정
              </Text>

              <div>
                <Text color={color.text.disabled} through>
                  9,999,999원
                </Text>
              </div>
              <Flex gap='8'>
                {/* 할인률 */}
                <Text preset='title4' as='p' color={color.text.negative}>
                  10%
                </Text>

                {/* 가격 */}
                <Text preset='title4' as='p'>
                  {(price * quantity).toLocaleString()}
                  <Text preset='title4' as='span' color={color.text.secondary}>
                    원
                  </Text>
                </Text>
              </Flex>
            </Flex>
            <Flex
              align='center'
              justify='between'
              style={{
                backgroundColor: color.bg.subtle,
                padding: `${toRem(spacing[16])} ${toRem(spacing[24])}`,
                borderRadius: rounded.sm,
                margin: `${toRem(spacing[24])} 0`,
              }}
            >
              <Flex direction='column'>
                <Text preset='subTitle3' color={color.text.secondary}>
                  [노베라 단독 특전] 아일릿(ILLIT) 20% 할인 쿠폰
                </Text>
                <Text preset='caption1' color={color.text.secondary}>
                  쿠폰 사용 시 100,000원
                </Text>
              </Flex>
              <Button label='쿠폰받기' color='secondary' size='sm' />
            </Flex>
            <Select
              text='옵션을 선택해 주세요'
              options={[
                {
                  value: '1',
                  label: '[옵션1] Product1',
                  thumbnail: '',
                  disabled: true,
                },
                {
                  value: '2',
                  label: '[옵션2] Product2',
                  thumbnail: '',
                },
                {
                  value: '3',
                  label: '[옵션3] Product3',
                  thumbnail: '',
                },
                {
                  value: '4',
                  label: '[옵션4] Product4',
                  thumbnail: '',
                },
              ]}
            />

            {/* 데스크탑: 수량 선택 및 구매 옵션 */}
            <div className={styles.desktopOnly}>
              {/* 수량 선택 */}
              <Flex
                direction='column'
                style={{
                  backgroundColor: color.bg.subtle,
                  padding: `${toRem(spacing[16])} ${toRem(spacing[24])}`,
                  borderRadius: rounded.sm,
                  margin: `${toRem(spacing[24])} 0`,
                }}
              >
                <Text preset='subTitle3' weight='semibold' as='span'>
                  상품 금액
                </Text>
                {/*  handleDecrease */}
                <Flex justify='between' align='center' className={py[24]}>
                  <Stepper
                    value={quantity}
                    onChange={(val) => setQuantity(val ?? 1)}
                    min={1}
                    max={10}
                  />

                  <Text
                    preset='body1'
                    weight='semibold'
                    as='span'
                    style={{ marginLeft: '16px' }}
                  >
                    {(price * quantity).toLocaleString()}원
                  </Text>
                </Flex>
              </Flex>
              {/* 아코디언 */}
              <Accordion
                type='multiple'
                size='lg'
                items={[
                  {
                    value: '1',
                    category: '상품정보',
                    content: '상품정보 내용',
                  },

                  {
                    value: '2',
                    category: '배송',
                    content: '배송 내용',
                  },
                ]}
                defaultValue='shipping'
              />

              {/* 총 상품 금액 */}
              <Flex
                justify='between'
                align='center'
                style={{
                  borderTop: `1px solid ${color.divider.default}`,
                }}
                className={py[24]}
              >
                <Text preset='label1' as='span'>
                  총 상품금액
                </Text>

                <Text preset='title5'>
                  {(price * quantity).toLocaleString()}
                  <Text as='span'>원</Text>
                </Text>
              </Flex>
              {/* 구매 버튼 */}
              <Flex gap='12'>
                <Button
                  size='lg'
                  color='secondary'
                  label='장바구니'
                  icon='Bag'
                  style={{ flex: 0 }}
                />
                <Button
                  variant='solid'
                  size='lg'
                  color='primary'
                  label='구매하기'
                  style={{ flex: 1 }}
                />
              </Flex>
            </div>
          </Flex>
        </div>

        {/* 하단 컨텐츠 영역 (탭, 테이블 등) */}
        <div className={styles.contentSection}>
          <div className={styles.tabsWrapper}>
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
          </div>

          <img src={detailImage} alt='' style={{ maxWidth: '100%' }} />

          <Table
            caption='상품 주요 정보'
            columns={[
              { key: 'label1', bgColor: true, width: '15%', align: 'center' },
              { key: 'value1', width: '35%' },
              { key: 'label2', bgColor: true, width: '15%', align: 'center' },
              { key: 'value2', width: '35%' },
            ]}
            data={[
              {
                label1: '상품번호',
                value1: '3',
                label2: '상품구분',
                value2: '컴퓨터/노트북',
              },
              {
                label1: '모델명',
                value1: 'Z1C80003C',
                label2: '브랜드',
                value2: '홍소인',
              },
              {
                label1: '제조사',
                value1: 'Apple',
                label2: 'KC 인증',
                value2: 'KC 인증 있음',
              },
              {
                label1: '원산지',
                value1: '수입',
                label2: '미성년자 구매',
                value2: '가능',
              },
              {
                label1: '제조일자',
                value1: '2023.12.12.',
                label2: '유효일자',
                value2: '2024.05.10.',
              },
            ]}
          />

          <Flex gap='4' style={{ margin: '40px 0' }}>
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
          </Flex>
          <Flex direction='column' gap='4' style={{ margin: '40px 0' }}>
            <Textarea label='자기소개' maxLength={100} showCharacterCount />
            <Button
              variant='solid'
              size='md'
              color='primary'
              label='입력'
              full
            />
          </Flex>

          {/* 배송 옵션 선택 */}
          <Flex
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
          </Flex>

          {/* 구매 전 필수 약관 동의 */}
          <Flex
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
          </Flex>
        </div>
      </div>

      {/* 모바일 전용 스티키 구매 바 - 버튼만 */}
      <StickyPurchaseBar
        onCartClick={() => setShowMobileOptionModal(true)}
        onPurchaseClick={() => setShowMobileOptionModal(true)}
      />

      {/* 모바일 옵션 선택 Bottom Sheet */}
      {showMobileOptionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color.bg.dim,
            zIndex: Number(zIndex.modal),
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setShowMobileOptionModal(false)}
        >
          <div
            style={{
              width: '100%',
              backgroundColor: color.bg.default,
              borderTopLeftRadius: toRem(rounded.lg),
              borderTopRightRadius: toRem(rounded.lg),
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <Flex
              justify='between'
              align='center'
              style={{
                padding: toRem(spacing[16]),
                borderBottom: `1px solid ${color.divider.soft}`,
              }}
            >
              <Text preset='title5'>상품 선택</Text>
              <Button
                size='sm'
                icon='X'
                label='닫기'
                color='secondary'
                onClick={() => setShowMobileOptionModal(false)}
              />
            </Flex>

            {/* 스크롤 가능한 옵션 영역 */}
            <div
              style={{
                overflowY: 'auto',
                padding: toRem(spacing[24]),
                flex: 1,
              }}
            >
              {/* 옵션 선택 */}
              <div style={{ marginBottom: toRem(spacing[20]) }}>
                <Text
                  preset='body2'
                  weight='semibold'
                  style={{ marginBottom: toRem(spacing[8]) }}
                >
                  옵션
                </Text>
                <Select
                  text='옵션을 선택해 주세요'
                  options={productOptions}
                  value={selectedOption}
                  onChange={(value) => {
                    setSelectedOption(String(value));
                  }}
                />
              </div>

              {/* 수량 선택 */}
              <div>
                <Text
                  preset='body2'
                  weight='semibold'
                  style={{ marginBottom: toRem(spacing[8]) }}
                >
                  수량
                </Text>
                <Stepper
                  value={quantity}
                  onChange={(val) => setQuantity(val ?? 1)}
                  min={1}
                  max={10}
                />
              </div>
            </div>

            {/* 하단 고정 가격 및 버튼 영역 */}
            <div
              style={{
                borderTop: `1px solid ${color.divider.soft}`,
                padding: toRem(spacing[16]),
                backgroundColor: color.bg.default,
              }}
            >
              {/* 가격 요약 */}
              <Flex
                justify='between'
                align='center'
                style={{ marginBottom: toRem(spacing[12]) }}
              >
                <Text preset='body2' color={color.text.secondary}>
                  총 상품금액
                </Text>
                <Text preset='title5'>
                  {(price * quantity).toLocaleString()}
                  <Text as='span' color={color.text.secondary}>
                    원
                  </Text>
                </Text>
              </Flex>

              {/* 구매 버튼 */}
              <div style={{ display: 'flex', gap: toRem(spacing[8]) }}>
                <Button
                  size='lg'
                  color='secondary'
                  label='장바구니'
                  icon='Bag'
                  onClick={() => {
                    console.warn('장바구니 추가');
                    setShowMobileOptionModal(false);
                  }}
                  style={{ flex: 0 }}
                />
                <Button
                  variant='solid'
                  size='lg'
                  color='primary'
                  label='구매하기'
                  onClick={() => {
                    console.warn('구매하기');
                    setShowMobileOptionModal(false);
                  }}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Stepper defaultValue={1} />
        <Button label='button' />
        <Input label='input' hiddenLabel />
        <Select options={[]} />
      </div>
    </Flex>
  );
};
