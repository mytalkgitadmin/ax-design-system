import { useEffect, useRef, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { componentSize, rounded, toRem } from '../../tokens';
import {
  formFieldVars,
  FormLabel,
  FormStatus,
  generateFieldId,
  useFormField,
} from '../FormField';
import { Icon, IconType } from '../Icon';
import { InputProps } from './types';

import {
  clearButtonContainer,
  iconContainer,
  inputContainerStyle,
  inputStyle,
  inputVars,
  inputWrapper,
  inputWrapperFull,
  leftIconContainer,
  searchButtonContainer,
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
  variant = 'outline',
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
  style,
  className,

  // Event Handlers
  onChange,
  onFocus,
  onBlur,
}: InputProps) => {
  // ID 생성 (label과 input 연결용)
  const inputId = generateFieldId('input', id);

  // search 타입 여부
  const isSearchType = type === 'search';

  // search 타입일 때 내부 상태 관리 (clear 버튼 표시 여부 판단용)
  const [internalValue, setInternalValue] = useState(
    (value ?? defaultValue ?? '') as string
  );

  // Input element ref (clear 기능을 위해 필요)
  const inputRef = useRef<HTMLInputElement>(null);

  // value prop이 변경되면 내부 상태도 동기화 (Controlled Component 지원)
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(String(value));
    }
  }, [value]);

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
    [inputVars.disabledIconColor]: global.color.icon.disabled,
    [inputVars.borderColor]: finalColorScheme.default,
    [inputVars.hoverBorderColor]: finalColorScheme.hover,
    [inputVars.focusBorderColor]: finalColorScheme.focus,
    [inputVars.focusShadowColor]: finalColorScheme.focusShadow,
    [inputVars.errorBorderColor]: finalColorScheme.error,
    [inputVars.bgColor]: global.color.bg.default,
    [inputVars.disabledBgColor]: global.color.bg.disabled,
    [inputVars.fontWeight]: String(finalFontWeight),
    [inputVars.fontFamily]: global.typography.fontFamily,
    [inputVars.borderRadius]: `${toRem(actualRadius)}`,
  });

  // ========================================
  // 3. Search Type 전용 로직
  // ========================================
  // Input onChange 핸들러 (내부 상태 업데이트 + 외부 onChange 호출)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  // Clear 버튼 핸들러
  const handleClear = () => {
    if (!inputRef.current) return;

    // 1. 내부 상태 초기화
    setInternalValue('');

    // 2. Input DOM 값 직접 변경
    const input = inputRef.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, '');
    } else {
      input.value = '';
    }

    // 3. React가 인식할 수 있는 input 이벤트 디스패치
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);

    // 4. onChange 핸들러도 호출 (controlled component 대응)
    onChange?.({
      target: input,
      currentTarget: input,
    } as React.ChangeEvent<HTMLInputElement>);

    // 5. focus 유지
    input.focus();
  };

  // search 타입일 때 자동으로 clear 버튼 추가
  const hasValue =
    value !== undefined ? String(value).length > 0 : internalValue.length > 0;
  const showClearButton = isSearchType && hasValue && !disabled;

  // rightIcon 개수 계산 (padding 조정용)
  const rightIconCount = (showClearButton ? 1 : 0) + (rightIcon ? 1 : 0);

  // KeyDown Handler (Enter key support for Search)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onRightIconClick) {
      e.preventDefault();
      onRightIconClick();
    }
  };

  return (
    <div
      className={`${inputWrapper} ${full ? inputWrapperFull : ''} ${className || ''}`}
      style={{ ...vars, ...style }}
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
        className={inputContainerStyle({
          size: finalSize,
          variant: variant,
          error: error || status === 'error',
        })}
      >
        {/* left Icon */}
        {leftIcon && (
          <>
            {/* ReactNode인 경우 */}
            {typeof leftIcon !== 'string' && typeof leftIcon === 'object' ? (
              <div
                className={`${iconContainer} ${leftIconContainer}`}
                style={{ pointerEvents: 'auto' }}
              >
                {leftIcon}
              </div>
            ) : (
              /* IconType인 경우 */
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
                    <Icon name={leftIcon as IconType} size={iconSize} />
                  </button>
                ) : (
                  <div className={`${iconContainer} ${leftIconContainer}`}>
                    <Icon name={leftIcon as IconType} size={iconSize} />
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Input Element */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={type}
          className={`${inputStyle({
            size: finalSize,
            full,
            leftIcon: !!leftIcon,
            rightIcon: rightIconCount > 0,
          })}`}
          style={{
            textAlign: textAlign,
            // right icon이 2개일 때만 추가 padding (1개일 때는 CSS가 처리)
            paddingRight:
              rightIconCount === 2
                ? `calc(${toRem(iconSize * 2)} + 2.4em)` // iconSize * 2 + 1.6em(edge) + 0.8em(gap)
                : undefined,
          }}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
        />

        {/* Right Icons - Clear 버튼과 rightIcon을 함께 표시 */}
        {/* Clear 버튼 (search 타입, 값이 있을 때) */}
        {showClearButton && (
          <button
            type='button'
            className={`${iconContainer} ${clearButtonContainer}`}
            style={{
              ...iconButtonStyle,
              // rightIcon이 있으면 더 왼쪽에 배치
              right: rightIcon
                ? `calc(1em + ${toRem(iconSize)} + 0.5em)`
                : '1em',
            }}
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClear();
              }
            }}
            aria-label='Clear input'
          >
            <Icon name='CircleXDuoFilled' size={iconSize} />
          </button>
        )}

        {/* User-provided Right Icon */}
        {rightIcon && (
          <>
            {/* ReactNode인 경우 */}
            {typeof rightIcon !== 'string' && typeof rightIcon === 'object' ? (
              <div
                className={`${iconContainer} ${searchButtonContainer}`}
                style={{ pointerEvents: 'auto' }}
              >
                {rightIcon}
              </div>
            ) : (
              /* IconType인 경우 (일반 아이콘 또는 검색 버튼) */
              <>
                {/* Search 타입이거나 핸들러가 있으면 버튼으로 렌더링 */}
                {onRightIconClick || isSearchType ? (
                  <button
                    type='button'
                    className={`${iconContainer} ${searchButtonContainer}`}
                    style={{
                      ...iconButtonStyle,
                      cursor: onRightIconClick ? 'pointer' : 'default', // 핸들러 없으면 커서 기본
                    }}
                    onClick={onRightIconClick}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRightIconClick?.();
                      }
                    }}
                    aria-label={isSearchType ? 'Search' : undefined}
                  >
                    <Icon name={rightIcon as IconType} size={iconSize} />
                  </button>
                ) : (
                  <div className={`${iconContainer} ${searchButtonContainer}`}>
                    <Icon name={rightIcon as IconType} size={iconSize} />
                  </div>
                )}
              </>
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
