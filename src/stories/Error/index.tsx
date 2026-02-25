import { color } from '../../tokens';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { ErrorProps } from './types';

import { containerStyle, textContainerStyle } from './Error.css';

export type { ErrorProps } from './types';

export const Error = ({
  iconName = 'CircleError',
  title = '서비스 이용이 원활하지 않아요',
  description = '불편을 드려 죄송해요.\n잠시 후에 다시 시도해 주세요.',
  buttonText = '다시 시도하기',
  onRetry,
  buttonProps,
  className,
}: ErrorProps) => {
  return (
    <Flex
      className={`${containerStyle} ${className || ''}`.trim()}
      direction='column'
      align='center'
      justify='center'
      gap='24'
    >
      <Icon name={iconName} size={48} color={color.icon.negative} />

      <Flex
        direction='column'
        align='center'
        gap='8'
        className={textContainerStyle}
      >
        <Text
          size={16}
          weight='semibold'
          color={color.text.primary}
          align='center'
        >
          {title}
        </Text>
        <Text
          size={14}
          weight='regular'
          color={color.text.secondary}
          align='center'
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {description}
        </Text>
      </Flex>

      {(onRetry || buttonProps) && (
        <Button
          variant='solid'
          color='tertiary'
          size='sm'
          {...buttonProps}
          onClick={buttonProps?.onClick || onRetry}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};
