import { useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import {
  brandATheme,
  brandBTheme,
  defaultTheme,
  ThemeProvider,
} from '../../../theme';
import { color, toRem } from '../../../tokens';
import { Accordion } from '../../Accordion';
import { Avatar } from '../../Avatar';
import { AvatarGroup } from '../../Avatar/AvatarGroup';
import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { CheckboxGroup } from '../../Checkbox/CheckboxGroup';
import { Flex } from '../../Flex';
import { Input } from '../../Input';
import { Modal } from '../../Modal';
import { Pagination } from '../../Pagination';
import { RadioGroup } from '../../Radio/RadioGroup';
import { Select } from '../../Select';
import { Tabs } from '../../Tabs';
import { Text } from '../../Text';
import { Textarea } from '../../Textarea';
import { Thumbnail } from '../../Thumbnail';
import { ProductCard } from './components/ProductCard/ProductCard';

import type { Theme } from '../../../theme/types';

import * as styles from './ExecutiveDemo.css';

type ThemeOption = 'default' | 'brandA' | 'brandB';

const THEME_MAP: Record<ThemeOption, Theme> = {
  default: defaultTheme,
  brandA: brandATheme,
  brandB: brandBTheme,
};

const THEME_LABELS: Record<ThemeOption, string> = {
  default: 'Default',
  brandA: 'Brand A',
  brandB: 'Brand B',
};

const PRODUCT_DATA = [
  {
    id: 1,
    image: 'https://picsum.photos/400/400?random=1',
    title: '엘렌실라 에스카르고 오리지날 리페어 크림',
    price: 17800,
    originalPrice: 30000,
    discount: 41,
    tags: ['무료배송', '특가'],
    brand: 'Brand A',
  },
  {
    id: 2,
    image: 'https://picsum.photos/400/400?random=2',
    title: '알로에베라 수딩젤 300ml 피부진정 수분공급',
    price: 11900,
    originalPrice: 32000,
    discount: 63,
    tags: ['단독구성'],
    brand: 'Brand B',
  },
  {
    id: 3,
    image: 'https://picsum.photos/400/400?random=3',
    title: '에스카르고 오리지날 리페어 크림',
    price: 20900,
    originalPrice: 3300,
    discount: 63,
    tags: ['단독구성'],
    brand: 'Brand C',
  },
  {
    id: 4,
    image: 'https://picsum.photos/400/400?random=4',
    title: '',
    price: 20900,
    originalPrice: 3300,
    discount: 63,
    tags: ['단독구성'],
    brand: 'Brand D',
  },
];

/**
 * ExecutiveDemo
 * 경영진 대상 디자인 시스템 프레젠테이션 페이지
 *
 * 테마 전환을 통해 디자인 시스템의 효율성과 일관성을 시연합니다.
 */
export const ExecutiveDemo = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [radioValue, setRadioValue] = useState('social');
  const [checkboxValues, setCheckboxValues] = useState<string[]>(['same']);

  const currentThemeObject = THEME_MAP[selectedTheme];

  // 테마 CSS 변수 주입
  const themeVars = assignInlineVars({
    [styles.demoVars.cardBorderRadius]: toRem(
      currentThemeObject.global.radius.md
    ),
    [styles.demoVars.hover]: currentThemeObject.global.motion.hover,
    [styles.demoVars.entrance]: currentThemeObject.global.motion.entrance,
    [styles.demoVars.click]: currentThemeObject.global.motion.click,
  });

  return (
    <ThemeProvider theme={currentThemeObject}>
      <div
        className={styles.container}
        style={{
          fontFamily: currentThemeObject.global.typography.fontFamily,
          ...themeVars,
        }}
      >
        {/* Theme Switcher */}
        <div className={styles.themeSwitcher}>
          <Flex gap='8'>
            {(Object.keys(THEME_MAP) as ThemeOption[]).map((theme) => (
              <Button
                key={theme}
                label={THEME_LABELS[theme]}
                variant={selectedTheme === theme ? 'solid' : 'ghost'}
                color='primary'
                size='sm'
                onClick={() => setSelectedTheme(theme)}
              />
            ))}
          </Flex>
        </div>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Flex direction='column' gap='16' align='center'>
            <Badge label='디자인 시스템' variant='soft' color='primary' />
            <Text preset='title1' align='center'>
              DESIGN SYSTEM
            </Text>
            <Text preset='body1' align='center' color={color.text.secondary}>
              디자인시스템이란,재사용 가능한 컴포넌트과 디자인 규칙의 집합을
              의미합니다.
            </Text>

            {/* Visual Component Showcase Grid */}
            <div className={styles.heroShowcase}>
              {/* Left Column - Payment Method */}
              <div className={styles.heroColumn}>
                <Flex gap='8' align='center' className={styles.profileCard}>
                  <Avatar size='lg' name='홍' />
                  <Flex direction='column'>
                    <Text preset='subTitle2'>플랫폼사업본부 AX LAB</Text>
                    <Text preset='body3' color='gray'>
                      홍길동
                    </Text>
                  </Flex>
                </Flex>

                <Flex gap='4' justify='between'>
                  {/* className={styles.actionArea} */}
                  <Button
                    label='상세 보기'
                    variant='solid'
                    color='primary'
                    size='sm'
                    leftIcon='Search'
                    onClick={() => setIsModalOpen(true)}
                  />
                  <Button
                    label='Button'
                    variant='outline'
                    color='primary'
                    size='sm'
                    leftIcon='Edit'
                  />{' '}
                  <Button
                    label='Button'
                    variant='solid'
                    color='secondary'
                    size='sm'
                    leftIcon='User'
                  />
                  <Button
                    label='Button'
                    variant='solid'
                    color='tertiary'
                    size='sm'
                    leftIcon='Download'
                  />
                </Flex>
                <div className={styles.heroComponentCard}>
                  <Text preset='subTitle2' className={styles.sectionTitle}>
                    결제 수단
                  </Text>

                  <Flex direction='column' gap='12'>
                    <Input label='카드 소지자명' placeholder='이름' full />

                    <Flex gap='8'>
                      <Input label='지역' placeholder='02' full />
                      <Input label='전화번호' placeholder='000-0000' full />
                    </Flex>

                    <Flex gap='8'>
                      <Select
                        label='년'
                        options={[
                          { value: '2024', label: '2024' },
                          { value: '2025', label: '2025' },
                        ]}
                        text='년도 선택'
                        full
                      />
                      <Select
                        label='월'
                        options={[
                          { value: '01', label: '01' },
                          { value: '02', label: '02' },
                          { value: '03', label: '03' },
                        ]}
                        text='월 선택'
                        full
                      />
                    </Flex>

                    <Textarea
                      label='추가 의견'
                      placeholder='추가 의견 입력'
                      showCharacterCount
                      maxLength={100}
                    />

                    <RadioGroup
                      label='성별'
                      direction='horizontal'
                      name='notification'
                      value={radioValue}
                      onChange={setRadioValue}
                      size='md'
                      options={[
                        { value: 'social', label: '남성' },
                        { value: 'search', label: '여성' },
                        { value: 'search', label: '제공안함' },
                      ]}
                      style={{
                        paddingBottom: '8px',
                        marginBottom: '8px',
                        borderBottom: '1px solid #eee',
                      }}
                    />

                    <CheckboxGroup
                      label=''
                      name='billing'
                      value={checkboxValues}
                      onChange={setCheckboxValues}
                      size='md'
                      options={[{ value: 'same', label: '약관에 동의합니다.' }]}
                    />

                    <Flex gap='4' justify='end'>
                      {/* className={styles.actionArea} */}
                      <Button
                        label='취소'
                        variant='outline'
                        color='tertiary'
                        size='sm'
                      />
                      <Button
                        label='제출'
                        variant='solid'
                        color='primary'
                        size='sm'
                      />
                    </Flex>
                  </Flex>
                </div>
              </div>

              {/* Center Column - Team & Status */}
              <div className={styles.heroColumn}>
                {/* Team Members Card */}
                <Flex
                  direction='column'
                  gap='12'
                  align='center'
                  className={styles.heroComponentCard}
                >
                  <AvatarGroup
                    avatars={[
                      { type: 'text', name: 'F', size: 'sm' },
                      { type: 'text', name: 'B', size: 'sm' },
                      { type: 'text', name: '김', size: 'sm' },
                    ]}
                  />

                  <Flex direction='column' gap='4' align='center'>
                    <Text preset='subTitle3'>팀 멤버 없음</Text>
                    <Text preset='body2' color={color.text.secondary}>
                      프로젝트 협업을 위해 팀원을 초대하세요
                    </Text>
                  </Flex>
                  <Button label='팀원 초대' size='sm' leftIcon='Plus' />
                </Flex>

                {/* Badge Showcase */}
                <Flex gap='4' wrap='wrap'>
                  <Badge label='동기화' variant='solid' color='primary' />
                  <Badge
                    label='업데이트중'
                    variant='outline'
                    color='green'
                    leftIcon='CirclePositiveFilled'
                  />
                  <Badge
                    label='경고'
                    variant='outline'
                    color='red'
                    leftIcon='CircleNegativeFilled'
                  />
                  <Badge
                    label='검증됨'
                    variant='soft'
                    color='green'
                    rightIcon='Check'
                  />
                </Flex>

                <div className={styles.heroComponentCard}>
                  <Accordion
                    defaultValue='item-1'
                    type='single'
                    items={[
                      {
                        value: 'item-1',
                        leftIcon: 'Calendar',
                        category: 'Thumbnail',
                        title: '이미지',
                        content: (
                          <>
                            <Flex gap='4' wrap='wrap'>
                              <Thumbnail
                                src='https://picsum.photos/201'
                                alt='Product 2'
                                width={48}
                              />
                              <Thumbnail
                                src='https://picsum.photos/202'
                                alt='Product 3'
                                width={48}
                              />
                              <Thumbnail src={null} alt='No image' width={48} />
                              <Thumbnail
                                src={null}
                                alt='No image'
                                width={48}
                                color='gray'
                              />
                            </Flex>
                            <Text
                              preset='body3'
                              color='muted'
                              style={{ marginTop: '8px' }}
                            >
                              lorem ipsum dolor sit amet consectetur adipiscing
                              elit lorem ipsum dolor sit amet consectetur
                              adipiscing elit
                            </Text>
                          </>
                        ),
                      },
                      {
                        value: '2',
                        leftIcon: 'Bag',
                        category: '장바구니',
                        // title: '장바구니',
                        content:
                          'lorem ipsum dolor sit amet consectetur adipiscing elit',
                      },
                      {
                        value: '3',
                        leftIcon: 'Search',
                        category: 'FAQ',
                        title: '자주묻는질문',
                        content:
                          'lorem ipsum dolor sit amet consectetur adipiscing elit',
                      },
                    ]}
                  />
                </div>

                <Flex direction='column' gap='8' align='start'>
                  <Pagination totalPages={10} currentPage={1} />
                  <Pagination color='primary' totalPages={10} currentPage={5} />
                </Flex>
              </div>

              {/* Right Column - Authentication & Settings */}
              <div className={styles.heroColumn}>
                {/* Login Card - Create an account */}
                <div className={styles.loginCard}>
                  <Flex align='center' gap='8'>
                    <Text preset='subTitle2'>로그인</Text>
                    <Text preset='body4' color={color.text.tertiary}>
                      이메일을 입력하세요
                    </Text>
                  </Flex>
                  <Input
                    label='id'
                    hiddenLabel
                    placeholder='name@example.com'
                    full
                    type='email'
                    leftIcon='User'
                  />

                  <Button
                    label='로그인'
                    variant='solid'
                    color='primary'
                    size='md'
                    full
                  />
                </div>

                {/* Commerce UI Card (Replaces Board Card) */}
                <div
                  className={styles.boardCard}
                  style={{ maxHeight: '600px', overflowY: 'auto' }}
                >
                  <Flex direction='column' gap='8'>
                    <Tabs
                      variant='underlined'
                      items={[
                        { label: '추천', value: 'all' },
                        { label: '인기', value: 'popular' },
                        { label: '신상', value: 'new' },
                      ]}
                    />

                    <Flex
                      justify='between'
                      align='center'
                      gap='8'
                      style={{ margin: '10px 0 0 0' }}
                    >
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

                    {/* Dynamic Content Area */}
                    <div
                      className={
                        selectedTheme === 'default'
                          ? styles.commerceList
                          : selectedTheme === 'brandA'
                            ? styles.commerceGrid
                            : styles.commerceScroll
                      }
                    >
                      {PRODUCT_DATA.map((product) => (
                        <ProductCard
                          key={product.id}
                          layout={
                            selectedTheme === 'default'
                              ? 'horizontal'
                              : selectedTheme === 'brandA'
                                ? 'vertical'
                                : 'compact'
                          }
                          image={product.image}
                          brand={product.brand}
                          title={product.title}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          discount={product.discount}
                          tags={product.tags}
                          themeVars={{
                            borderRadius:
                              selectedTheme === 'brandA'
                                ? toRem(currentThemeObject.global.radius.lg)
                                : selectedTheme === 'brandB'
                                  ? toRem(currentThemeObject.global.radius.md)
                                  : toRem(currentThemeObject.global.radius.sm),
                          }}
                        />
                      ))}
                    </div>

                    <Flex justify='center' style={{ marginTop: 'auto' }}>
                      <Pagination totalPages={5} currentPage={1} />
                    </Flex>
                  </Flex>
                </div>

                {/* Survey & Settings */}
              </div>
            </div>
          </Flex>
        </section>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='상세 정보'
          description='선택하신 항목의 상세 정보입니다.'
          primaryAction={{
            label: '확인',
            onClick: () => setIsModalOpen(false),
          }}
          secondaryAction={{
            label: '취소',
            onClick: () => setIsModalOpen(false),
          }}
        >
          <Text>
            이 모달은 현재 테마({THEME_LABELS[selectedTheme]})의 모션 스타일을
            따릅니다.
          </Text>
          <Flex direction='column' gap='8' style={{ marginTop: '16px' }}>
            <Badge
              label={
                selectedTheme === 'brandA'
                  ? 'Bouncy (Elastic Pop)'
                  : selectedTheme === 'brandB'
                    ? 'Slide Up (Smooth)'
                    : 'Standard Zoom'
              }
              variant='soft'
              color='primary'
            />
          </Flex>
        </Modal>
      </div>
    </ThemeProvider>
  );
};
