import { useState } from 'react';

import { useTheme } from '../../theme';
import { color, rounded, spacing } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { Accordion } from '../Accordion';
import { Badge } from '../Badge';
import { BreadCrumb } from '../BreadCrumb';
import { Button } from '../Button';
import { Carousel } from '../Carousel';
import { CheckboxGroup } from '../Checkbox/CheckboxGroup';
import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { RadioGroup } from '../Radio/RadioGroup';
import { Select } from '../Select';
import { Stepper } from '../Stepper';
import { Table } from '../Table';
import { Tabs } from '../Tabs';
import { Text } from '../Text';
import { Textarea } from '../Textarea';
import { Thumbnail } from '../Thumbnail';

import { py } from '../../tokens/dev/utils/spacing.global.css';

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

  // Checkbox state
  const [agreements, setAgreements] = useState<string[]>([]);

  // Radio state
  const [deliveryOption, setDeliveryOption] = useState('standard');

  return (
    <Flex
      direction='column'
      style={{
        maxWidth: '1200px',
        width: 'calc(100% - 40px)',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* 브레드크럼 */}
      <BreadCrumb
        items={[
          { label: 'HOME', href: '#' },
          { label: '베스트', href: '#' },
          { label: '응원봉', href: '#' },
          { label: '악세사리', href: '#' },
          { label: '스티커', href: '#' },
        ]}
      />

      <Grid columns='68fr 48fr' gap='32'>
        {/* 왼쪽: 상품 이미지 영역 */}
        <Carousel
          items={[
            {
              id: '1',
              src: 'https://picsum.photos/seed/carousel1/800/450',
              alt: '샘플 이미지 1',
              thumbnail: 'https://picsum.photos/seed/carousel1/100/100',
              content: <div>슬라이드 1 - 아름다운 풍경</div>,
            },
            {
              id: '2',
              src: 'https://picsum.photos/seed/carousel2/800/450',
              alt: '샘플 이미지 2',
              thumbnail: 'https://picsum.photos/seed/carousel2/100/100',
              content: <div>슬라이드 2 - 멋진 장면</div>,
            },
            {
              id: '3',
              src: 'https://picsum.photos/seed/carousel3/800/450',
              alt: '샘플 이미지 3',
              thumbnail: 'https://picsum.photos/seed/carousel3/100/100',
              content: <div>슬라이드 3 - 환상적인 뷰</div>,
            },
            {
              id: '4',
              src: 'https://picsum.photos/seed/carousel4/800/450',
              alt: '샘플 이미지 4',
              thumbnail: 'https://picsum.photos/seed/carousel4/100/100',
              content: <div>슬라이드 4 - 놀라운 순간</div>,
            },
            {
              id: '5',
              src: 'https://picsum.photos/seed/carousel5/800/450',
              alt: '샘플 이미지 5',
              thumbnail: 'https://picsum.photos/seed/carousel5/100/100',
              content: <div>슬라이드 5 - 특별한 기억</div>,
            },
            {
              id: '6',
              src: 'https://picsum.photos/seed/carousel1/800/450',
              alt: '샘플 이미지 1',
              thumbnail: 'https://picsum.photos/seed/carousel1/100/100',
              content: <div>슬라이드 1 - 아름다운 풍경</div>,
            },
            {
              id: '7',
              src: 'https://picsum.photos/seed/carousel2/800/450',
              alt: '샘플 이미지 2',
              thumbnail: 'https://picsum.photos/seed/carousel2/100/100',
              content: <div>슬라이드 2 - 멋진 장면</div>,
            },
            {
              id: '8',
              src: 'https://picsum.photos/seed/carousel3/800/450',
              alt: '샘플 이미지 3',
              thumbnail: 'https://picsum.photos/seed/carousel3/100/100',
              content: <div>슬라이드 3 - 환상적인 뷰</div>,
            },
            {
              id: '9',
              src: 'https://picsum.photos/seed/carousel4/800/450',
              alt: '샘플 이미지 4',
              thumbnail: 'https://picsum.photos/seed/carousel4/100/100',
              content: <div>슬라이드 4 - 놀라운 순간</div>,
            },
            {
              id: '10',
              src: 'https://picsum.photos/seed/carousel5/800/450',
              alt: '샘플 이미지 5',
              thumbnail: 'https://picsum.photos/seed/carousel5/100/100',
              content: <div>슬라이드 5 - 특별한 기억</div>,
            },
          ]}
          spaceBetween={[24, 8]}
        />

        {/* 오른쪽: 상품 정보 및 구매 영역 */}

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
                <Thumbnail
                  width={16}
                  src='https://mockmind-api.uifaces.co/content/human/222.jpg'
                  rounded='full'
                />
                <Text preset='subTitle3'>Artist</Text>
                <Icon name='ChevronRight' size={12} />
              </Flex>

              <Flex align='center' gap='8'>
                <Button
                  size='xs'
                  label='0'
                  leftIcon='Heart'
                  color='secondary'
                />
                <Button
                  size='xs'
                  label='공유'
                  leftIcon='Share'
                  color='secondary'
                />
              </Flex>
            </Flex>

            <Text preset='title3'>
              [노베라 단독 특전] 아일릿(ILLIT)_03.스티커팩 _ILLIT 3rd MINI ALBUM
              'bomb' POP-UP STORE Merch.
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
        </Flex>

        <div>
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
      </Grid>

      <div>
        <Stepper defaultValue={1} />
        <Button label='button' />
        <Input label='input' hiddenLabel />
        <Select options={[]} />
      </div>
    </Flex>
  );
};
