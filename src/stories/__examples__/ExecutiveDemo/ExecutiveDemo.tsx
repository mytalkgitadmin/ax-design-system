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
import { Stepper } from '../../Stepper';
import { Table } from '../../Table';
import { Tabs } from '../../Tabs';
import { Text } from '../../Text';
import { Textarea } from '../../Textarea';
import { Thumbnail } from '../../Thumbnail';

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
                <Flex gap='8' className={styles.profileCard}>
                  <Avatar size='lg' name='홍' />
                  <Flex direction='column'>
                    <Text preset='subTitle2'>플랫폼사업본부 AX LAB</Text>
                    <Text preset='body2'>홍길동</Text>
                  </Flex>
                </Flex>

                <Flex gap='4' justify='between' className={styles.actionArea}>
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

                    <CheckboxGroup
                      label=''
                      name='billing'
                      value={checkboxValues}
                      onChange={setCheckboxValues}
                      size='md'
                      options={[{ value: 'same', label: '약관에 동의합니다.' }]}
                    />

                    <Flex gap='4' justify='end' className={styles.actionArea}>
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
                  gap='16'
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

                  <Text preset='subTitle3'>팀 멤버 없음</Text>
                  <Text
                    preset='body2'
                    color={color.text.secondary}
                    className={styles.description}
                  >
                    프로젝트 협업을 위해 팀원을 초대하세요
                  </Text>
                  <Button label='팀원 초대' size='sm' leftIcon='Plus' />
                </Flex>

                <Flex gap='4'>
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
                </Flex>

                <div className={styles.heroComponentCard}>
                  <Accordion
                    defaultValue='item-1'
                    type='single'
                    items={[
                      {
                        value: 'item-1',
                        category: 'Thumbnail',
                        title: '이미지',
                        content: (
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
                        ),
                      },
                      {
                        value: '2',
                        category: '왜 필요한가요?',
                        content:
                          '개발 속도 향상, 디자인 일관성 유지, 유지보수 비용 절감 등 다양한 이점이 있습니다.',
                      },
                      {
                        value: '3',
                        category: '어떻게 시작하나요?',
                        content:
                          '기존 컴포넌트를 분석하고, 공통 패턴을 찾아 표준화하는 것부터 시작합니다.',
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
                {/* Two-factor Authentication */}
                <div className={styles.heroComponentCard}>
                  <Flex
                    justify='between'
                    align='center'
                    className={styles.marginBottom16}
                  >
                    <Text preset='subTitle3'>2단계 인증</Text>
                    <Button
                      label='활성화'
                      variant='solid'
                      color='primary'
                      size='sm'
                    />
                  </Flex>

                  <Flex
                    justify='between'
                    align='center'
                    className={styles.marginBottom16}
                  >
                    <Text preset='body2'>프로필이 확인되었습니다</Text>
                    <Button
                      label='확인'
                      icon='Check'
                      variant='solid'
                      size='sm'
                    />
                  </Flex>

                  <Select
                    label='정렬'
                    options={[
                      { value: 'k8s', label: '최신순' },
                      { value: 'vm', label: '인기순' },
                      { value: 'vm', label: '등록순' },
                    ]}
                  />

                  <Flex justify='between' align='center'>
                    <Text preset='body2'>수량</Text>
                    <Stepper defaultValue={3} />
                  </Flex>
                </div>

                {/* Survey & Settings */}
                <div className={styles.heroComponentCard}>
                  <Tabs
                    variant='underlined'
                    items={[
                      { label: '전체', value: 'all' },
                      { label: '인기', value: 'popular' },
                      { label: '신상', value: 'new' },
                    ]}
                  />

                  {/* Project Status Table */}
                  <Table
                    caption='현재 진행 중인 프로젝트'
                    columns={[
                      { key: 'project', bgColor: true, width: '40%' },
                      { key: 'status', width: '30%' },
                      { key: 'progress', width: '30%' },
                    ]}
                    data={[
                      {
                        project: '디자인 시스템',
                        status: '진행중',
                        progress: '75%',
                      },
                      {
                        project: '모바일 앱',
                        status: '계획',
                        progress: '10%',
                      },
                    ]}
                  />
                  <Text preset='subTitle3'>옵션을 선택하세요</Text>

                  <RadioGroup
                    label=''
                    name='notification'
                    value={radioValue}
                    onChange={setRadioValue}
                    size='md'
                    options={[
                      { value: 'social', label: '소셜 미디어' },
                      { value: 'search', label: '검색 엔진' },
                    ]}
                  />
                </div>
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
