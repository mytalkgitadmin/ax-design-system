import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { rounded, toRem } from '../../tokens';
import {
  formFieldVars,
  FormLabel,
  FormStatus,
  useFieldId,
  useFormField,
} from '../FormField';
import { TextareaProps } from './types';

import {
  characterCountInsideLeft,
  characterCountInsideRight,
  characterCountLeft,
  characterCountRight,
  characterCountWrapper,
  textareaContainerStyle,
  textareaStyle,
  textareaVars,
  textareaWrapper,
} from './Textarea.css';

export type { TextareaProps } from './types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      // Appearance
      size = 'md',
      color = 'primary',
      rounded: roundedProp,

      // Label & Helper Text
      hiddenLabel,
      label,
      required = false,

      // Status & Message
      status,
      statusMessage,
      showStatusIcon = false,

      // State
      disabled = false,
      error = false,

      // HTML Textarea Props
      placeholder = '텍스트를 입력하세요',
      value,
      defaultValue,
      name,
      id,
      rows = 4,
      maxLength,
      minLength,
      readOnly,

      // Auto-grow
      autoGrow = false,
      minRows = 1,
      maxRows,

      // Character Counter
      showCharacterCount = false,
      characterCountPosition = 'inside-right',

      // Style
      style,
      className,

      // Event Handlers
      onChange,
      onFocus,
      onBlur,
    }: TextareaProps,
    ref
  ) => {
    // 1. 공통 Hook 사용 (테마 값 가져오기)
    const {
      global,
      finalSize,
      finalRadius,
      finalFontWeight,
      finalLabelFontSize,
      finalColorScheme,
    } = useFormField(size, color, 'Textarea');

    // 2. rounded prop이 있으면 테마 설정을 덮어쓰기
    const actualRadius =
      roundedProp !== undefined ? rounded[roundedProp] : finalRadius;

    // 3. 내부 및 외부 Ref 관리
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const handleRef = useCallback(
      (node: HTMLTextAreaElement) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    // 4. 비제어 모드 글자수 카운트를 위한 내부 상태
    const [localValue, setLocalValue] = useState(
      String(value ?? defaultValue ?? '')
    );

    // Controlled prop 변경 시 동기화
    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(String(value));
      }
    }, [value]);

    // 5. Auto-grow 높이 조정 로직 (중복 제거를 위해 함수화)
    const adjustHeight = useCallback(() => {
      const textarea = internalRef.current;
      if (!textarea || !autoGrow) return;

      // 높이를 초기화해서 scrollHeight를 정확히 측정
      textarea.style.height = 'auto';

      // scrollHeight 계산
      const scrollHeight = textarea.scrollHeight;

      // lineHeight 계산 (폰트 크기 * 1.5 - CSS의 lineHeight와 동일)
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computedStyle.lineHeight);

      // minRows, maxRows에 따른 최소/최대 높이 계산
      const minHeight = lineHeight * minRows;
      const maxHeight = maxRows ? lineHeight * maxRows : Infinity;

      // 최종 높이 결정
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

      textarea.style.height = `${newHeight}px`;

      // maxRows 도달 시 스크롤 활성화
      if (maxRows && scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }, [autoGrow, minRows, maxRows]);

    // 값 변경 시마다 높이 조정
    useEffect(() => {
      adjustHeight();
    }, [localValue, adjustHeight]);

    // 6. 현재 글자수 계산 (내부 상태 localValue 기준)
    const currentLength = localValue.length;

    // 7. 글자수 카운터 렌더링 함수
    const renderCharacterCount = () => {
      if (!showCharacterCount) return null;

      const counterText = maxLength
        ? `${currentLength} / ${maxLength}`
        : `${currentLength}`;

      // 내부 위치 (inside-left, inside-right)
      if (
        characterCountPosition === 'inside-left' ||
        characterCountPosition === 'inside-right'
      ) {
        const insideClass =
          characterCountPosition === 'inside-left'
            ? characterCountInsideLeft
            : characterCountInsideRight;

        return <span className={insideClass}>{counterText}</span>;
      }

      // 외부 위치 (left, right) - FormStatus와 함께 표시
      return null;
    };

    // 8. CSS Variables 주입
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

      // Textarea 전용 변수
      [textareaVars.textColor]: global.color.text.secondary,
      [textareaVars.placeholderColor]: global.color.text.muted,
      [textareaVars.disabledTextColor]: global.color.text.disabled,
      [textareaVars.borderColor]: finalColorScheme.default,
      [textareaVars.hoverBorderColor]: finalColorScheme.hover,
      [textareaVars.focusBorderColor]: finalColorScheme.focus,
      [textareaVars.focusShadowColor]: finalColorScheme.focusShadow,
      [textareaVars.errorBorderColor]: finalColorScheme.error,
      [textareaVars.bgColor]: global.color.bg.default,
      [textareaVars.disabledBgColor]: global.color.bg.disabled,
      [textareaVars.fontWeight]: String(finalFontWeight),
      [textareaVars.fontFamily]: global.typography.fontFamily,
      [textareaVars.borderRadius]: `${toRem(actualRadius)}`,
    });

    // ID 생성 (label과 textarea 연결용)
    const textareaId = useFieldId('textarea', id);

    return (
      <div
        className={`${textareaWrapper} ${className || ''}`}
        style={{ ...vars, ...style }}
      >
        {/* FormLabel 컴포넌트 사용 */}
        <FormLabel
          htmlFor={textareaId}
          required={required}
          hiddenLabel={hiddenLabel}
          size={finalSize}
        >
          {label}
        </FormLabel>

        {/* Textarea Container */}
        <div
          className={textareaContainerStyle({
            error: error || status === 'error',
          })}
        >
          {/* Textarea Element */}
          <textarea
            ref={handleRef}
            id={textareaId}
            name={name}
            className={`${textareaStyle({
              size: finalSize,
            })}`}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            rows={autoGrow ? minRows : rows}
            maxLength={maxLength}
            minLength={minLength}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            onChange={(e) => {
              setLocalValue(e.target.value);
              onChange?.(e);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {/* Character Counter (inside position) */}
          {renderCharacterCount()}
        </div>

        {/* FormStatus 및 Character Counter (외부 위치) */}
        {showCharacterCount &&
        (characterCountPosition === 'left' ||
          characterCountPosition === 'right') ? (
          <div
            className={`${characterCountWrapper} ${
              characterCountPosition === 'left'
                ? characterCountLeft
                : characterCountRight
            }`}
          >
            {characterCountPosition === 'left' && (
              <span>
                {maxLength ? `${currentLength} / ${maxLength}` : currentLength}
              </span>
            )}

            {statusMessage && (
              <FormStatus
                status={status}
                message={statusMessage}
                showIcon={showStatusIcon}
              />
            )}

            {characterCountPosition === 'right' && (
              <span>
                {maxLength ? `${currentLength} / ${maxLength}` : currentLength}
              </span>
            )}
          </div>
        ) : (
          <FormStatus
            status={status}
            message={statusMessage}
            showIcon={showStatusIcon}
          />
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
