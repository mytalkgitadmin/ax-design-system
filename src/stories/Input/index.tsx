import { assignInlineVars } from '@vanilla-extract/dynamic';

import { componentSize, rounded } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import {
  formFieldVars,
  FormLabel,
  FormStatus,
  generateFieldId,
  useFormField,
} from '../FormField';
import { Icon } from '../Icon';
import { InputProps } from './types';

import {
  iconContainer,
  inputContainerStyle,
  inputStyle,
  inputVars,
  inputWrapper,
  inputWrapperFull,
  leftIconContainer,
  rightIconContainer,
} from './Input.css';

export type { InputProps } from './types';

// 아이콘 버튼 공통 스타일
const iconButtonStyle = {
  pointerEvents: 'auto' as const,
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  padding: 0,
};

export const Input = ({
  // Appearance
  size = 'md',
  color = 'primary',
  full = false,
  rounded: roundedProp,

  // Label & Helper Text
  hiddenLabel,
  label,
  required = false,

  // Status & Message
  status,
  statusMessage,
  showStatusIcon = false,

  // Icons
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,

  // State
  disabled = false,
  error = false,

  // HTML Input Props
  type = 'text',
  placeholder = '텍스트를 입력하세요',
  value,
  defaultValue,
  name,
  id,
  min,
  max,

  // Style
  textAlign,

  // Event Handlers
  onChange,
  onFocus,
  onBlur,
}: InputProps) => {
  // 1. 공통 Hook 사용 (테마 값 가져오기)
  const {
    global,
    finalSize,
    finalRadius,
    finalFontWeight,
    finalLabelFontSize,
    finalColorScheme,
  } = useFormField(size, color);

  // 2. rounded prop이 있으면 테마 설정을 덮어쓰기
  const actualRadius =
    roundedProp !== undefined ? rounded[roundedProp] : finalRadius;

  // componentSize 토큰에서 iconSize 가져오기
  const iconSize = Number(componentSize[finalSize].iconSize);

  // ========================================
  // 2. CSS Variables 주입
  // ========================================
  const vars = assignInlineVars({
    // FormField 공통 변수
    [formFieldVars.labelColor]: global.color.text.tertiary,
    [formFieldVars.helperTextColor]: global.color.text.muted,
    [formFieldVars.successTextColor]: global.color.text.positive,
    [formFieldVars.errorTextColor]: global.color.text.negative,
    [formFieldVars.warnTextColor]: global.color.text.warning,
    [formFieldVars.fontFamily]: global.typography.fontFamily,
    [formFieldVars.labelFontSizeXs]: `${toRem(finalLabelFontSize.xs)}`,
    [formFieldVars.labelFontSizeSm]: `${toRem(finalLabelFontSize.sm)}`,
    [formFieldVars.labelFontSizeMd]: `${toRem(finalLabelFontSize.md)}`,
    [formFieldVars.labelFontSizeLg]: `${toRem(finalLabelFontSize.lg)}`,
    [formFieldVars.labelFontSizeXl]: `${toRem(finalLabelFontSize.xl)}`,

    // Input 전용 변수
    [inputVars.textColor]: global.color.text.secondary,
    [inputVars.placeholderColor]: global.color.text.muted,
    [inputVars.disabledTextColor]: global.color.text.disabled,
    [inputVars.borderColor]: finalColorScheme.default,
    [inputVars.hoverBorderColor]: finalColorScheme.hover,
    [inputVars.focusBorderColor]: finalColorScheme.focus,
    [inputVars.focusShadowColor]: finalColorScheme.focusShadow,
    [inputVars.errorBorderColor]: finalColorScheme.error,
    [inputVars.bgColor]: global.color.bg.default,
    [inputVars.disabledBgColor]: global.color.bg.disabled,
    [inputVars.fontWeight]: String(finalFontWeight),
    [inputVars.borderRadius]: `${toRem(actualRadius)}`,
  });

  // ID 생성 (label과 input 연결용)
  const inputId = generateFieldId('input', id);

  return (
    <div
      className={`${inputWrapper} ${full ? inputWrapperFull : ''}`}
      style={{ ...vars }}
    >
      {/* FormLabel 컴포넌트 사용 */}
      <FormLabel
        htmlFor={inputId}
        required={required}
        hiddenLabel={hiddenLabel}
        size={finalSize}
      >
        {label}
      </FormLabel>

      {/* Input Container */}
      <div
        className={inputContainerStyle({ error: error || status === 'error' })}
      >
        {/* left Icon */}
        {leftIcon && (
          <>
            {onLeftIconClick ? (
              <button
                type='button'
                className={`${iconContainer} ${leftIconContainer}`}
                style={iconButtonStyle}
                onClick={onLeftIconClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onLeftIconClick();
                  }
                }}
              >
                <Icon name={leftIcon} size={iconSize} />
              </button>
            ) : (
              <div className={`${iconContainer} ${leftIconContainer}`}>
                <Icon name={leftIcon} size={iconSize} />
              </div>
            )}
          </>
        )}

        {/* Input Element */}
        <input
          id={inputId}
          name={name}
          type={type}
          className={`${inputStyle({
            size: finalSize,
            full,
            leftIcon: !!leftIcon,
            rightIcon: !!rightIcon,
          })}`}
          style={{
            textAlign: textAlign,
          }}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {/* Right Icon */}
        {rightIcon && (
          <>
            {onRightIconClick ? (
              <button
                type='button'
                className={`${iconContainer} ${rightIconContainer}`}
                style={iconButtonStyle}
                onClick={onRightIconClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRightIconClick();
                  }
                }}
              >
                <Icon name={rightIcon} size={iconSize} />
              </button>
            ) : (
              <div className={`${iconContainer} ${rightIconContainer}`}>
                <Icon name={rightIcon} size={iconSize} />
              </div>
            )}
          </>
        )}
      </div>

      {/* FormStatus 컴포넌트 사용 */}
      <FormStatus
        status={status}
        message={statusMessage}
        showIcon={showStatusIcon}
      />
    </div>
  );
};
