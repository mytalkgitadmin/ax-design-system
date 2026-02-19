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
import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { Flex } from '../../Flex';
import { Grid } from '../../Grid';
import { Modal } from '../../Modal';
import { Pagination } from '../../Pagination';
import { Text } from '../../Text';
import { Thumbnail } from '../../Thumbnail';
import { CommerceSection } from './components/CommerceSection';
import { LoginCard } from './components/LoginCard';
import { PaymentFormCard } from './components/PaymentFormCard';
import { ProfileCard } from './components/ProfileCard';
import { TeamCard } from './components/TeamCard';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { PRODUCT_DATA } from './constants';

import type { Theme } from '../../../theme/types';
import type { ThemeOption } from './types';

import * as styles from './ExecutiveDemo.css';

const THEME_MAP: Record<ThemeOption, Theme> = {
  default: defaultTheme,
  brandA: brandATheme,
  brandB: brandBTheme,
};

const THEME_LABELS: Record<ThemeOption, string> = {
  default: 'type A',
  brandA: 'type B',
  brandB: 'type C',
};

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
        <Flex gap='8' className={styles.themeSwitcher}>
          <ThemeSwitcher
            selectedTheme={selectedTheme}
            onThemeChange={setSelectedTheme}
          />
        </Flex>

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
            <Grid
              columns='repeat(3, 1fr)'
              gap='24'
              style={{ maxWidth: '1200px', width: '100%', marginTop: '24px' }}
            >
              {/* Left Column - Payment Method */}
              <Flex direction='column' gap='16' style={{ minWidth: 0 }}>
                <ProfileCard />
                <LoginCard />
                <PaymentFormCard
                  radioValue={radioValue}
                  onRadioChange={setRadioValue}
                  checkboxValues={checkboxValues}
                  onCheckboxChange={setCheckboxValues}
                />
              </Flex>

              {/* Center Column - Team & Status */}
              <Flex direction='column' gap='16' style={{ minWidth: 0 }}>
                <TeamCard />

                {/* Badge Showcase */}
                <Flex gap='4' wrap='wrap'>
                  <Badge label='동기화' variant='solid' color='primary' />
                  <Badge
                    label='업데이트중'
                    variant='outline'
                    color='green'
                    leftIcon='CircleCheckFill'
                  />
                  <Badge
                    label='경고'
                    variant='outline'
                    color='red'
                    leftIcon='CircleErrorFill'
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
              </Flex>

              {/* Right Column - Authentication & Settings */}
              <Flex direction='column' gap='16' style={{ minWidth: 0 }}>
                <Flex gap='4' justify='between'>
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
                  />
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

                {/* Commerce UI Section */}
                <CommerceSection
                  selectedTheme={selectedTheme}
                  currentThemeObject={currentThemeObject}
                  productData={PRODUCT_DATA}
                />
              </Flex>
            </Grid>
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
