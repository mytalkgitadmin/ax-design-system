import { Button } from '../../../../Button';
import { CheckboxGroup } from '../../../../Checkbox/CheckboxGroup';
import { Flex } from '../../../../Flex';
import { RadioGroup } from '../../../../Radio/RadioGroup';
import { Select } from '../../../../Select';
import { Text } from '../../../../Text';
import { Textarea } from '../../../../Textarea';

import * as styles from '../../ExecutiveDemo.css';

type PaymentFormCardProps = {
  radioValue: string;
  onRadioChange: (value: string) => void;
  checkboxValues: string[];
  onCheckboxChange: (values: string[]) => void;
};

/**
 * PaymentFormCard
 * 결제 수단 입력 폼 카드
 */
export const PaymentFormCard = ({
  radioValue,
  onRadioChange,
  checkboxValues,
  onCheckboxChange,
}: PaymentFormCardProps) => {
  return (
    <div className={styles.heroComponentCard}>
      <Text preset='subTitle2' className={styles.sectionTitle}>
        결제 수단
      </Text>

      <Flex direction='column' gap='12'>
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
          onChange={onRadioChange}
          size='md'
          options={[
            { value: 'social', label: '남성' },
            { value: 'search', label: '여성' },
            { value: 'other', label: '제공안함' },
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
          onChange={onCheckboxChange}
          size='md'
          options={[{ value: 'same', label: '약관에 동의합니다.' }]}
        />

        <Flex gap='4' justify='end'>
          <Button label='취소' variant='outline' color='tertiary' size='sm' />
          <Button label='제출' variant='solid' color='primary' size='sm' />
        </Flex>
      </Flex>
    </div>
  );
};
