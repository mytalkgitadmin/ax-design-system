import { color } from '../../../../../tokens';
import { AvatarGroup } from '../../../../Avatar/AvatarGroup';
import { Button } from '../../../../Button';
import { Flex } from '../../../../Flex';
import { Text } from '../../../../Text';

import * as styles from '../../ExecutiveDemo.css';

/**
 * TeamCard
 * 팀 멤버 초대 카드
 */
export const TeamCard = () => {
  return (
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
  );
};
