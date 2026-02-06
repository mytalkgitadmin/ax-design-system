import { Avatar } from '../../../../Avatar';
import { Flex } from '../../../../Flex';
import { Text } from '../../../../Text';

import * as styles from '../../ExecutiveDemo.css';

/**
 * ProfileCard
 * 사용자 프로필 표시 카드
 */
export const ProfileCard = () => {
  return (
    <Flex gap='8' align='center' className={styles.profileCard}>
      <Avatar size='lg' name='홍' />
      <Flex direction='column'>
        <Text preset='subTitle2'>플랫폼사업본부 AX LAB</Text>
        <Text preset='body3' color='gray'>
          홍길동
        </Text>
      </Flex>
    </Flex>
  );
};
