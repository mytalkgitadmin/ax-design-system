import { color } from '../../../../../tokens';
import { Button } from '../../../../Button';
import { Flex } from '../../../../Flex';
import { Input } from '../../../../Input';
import { Text } from '../../../../Text';

import * as styles from '../../ExecutiveDemo.css';

/**
 * LoginCard
 * 로그인 폼 카드
 */
export const LoginCard = () => {
  return (
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

      <Button label='로그인' variant='solid' color='primary' size='md' full />
    </div>
  );
};
