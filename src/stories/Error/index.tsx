import { color } from '../../tokens';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { ErrorProps } from './types';

import { containerStyle, textContainerStyle } from './Error.css';

export type { ErrorProps } from './types';

const ERROR_SIZE_CONFIG = {
  sm: {
    iconSize: 48,
    titleSize: 16,
    descSize: 14,
    containerGap: '16',
    textGap: '4',
    buttonSize: 'sm' as const,
  },
  md: {
    iconSize: 60,
    titleSize: 20,
    descSize: 16,
    containerGap: '20',
    textGap: '4',
    buttonSize: 'md' as const,
  },
  lg: {
    iconSize: 72,
    titleSize: 28,
    descSize: 18,
    containerGap: '20',
    textGap: '8',
    buttonSize: 'lg' as const,
  },
} as const;

export const Error = ({
  icon,
  size = 'sm',
  iconSize,
  iconColor = color.icon.primary,
  title = '서비스 이용이 원활하지 않아요',
  description = '불편을 드려 죄송해요.\n잠시 후에 다시 시도해 주세요.',
  buttonText = '다시 시도하기',
  onRetry,
  buttonProps,
  className,
}: ErrorProps) => {
  const sizeConfig = ERROR_SIZE_CONFIG[size];
  const finalIconSize = iconSize ?? sizeConfig.iconSize;

  return (
    <Flex
      className={`${containerStyle} ${className || ''}`.trim()}
      direction='column'
      align='center'
      justify='center'
      gap={sizeConfig.containerGap}
    >
      {icon && <Icon name={icon} size={finalIconSize} color={iconColor} />}
      <Flex
        direction='column'
        align='center'
        gap={sizeConfig.textGap}
        className={textContainerStyle}
      >
        <Text
          size={sizeConfig.titleSize}
          weight='semibold'
          color={color.text.primary}
          align='center'
        >
          {title}
        </Text>
        <Text
          size={sizeConfig.descSize}
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
          size={sizeConfig.buttonSize}
          {...buttonProps}
          onClick={buttonProps?.onClick || onRetry}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
};
