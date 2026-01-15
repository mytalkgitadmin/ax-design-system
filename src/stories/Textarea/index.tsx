import { useEffect, useMemo, useRef } from 'react';

import { assignInlineVars } from '@vanilla-extract/dynamic';

import { rounded, toRem } from '../../tokens';
import {
  formFieldVars,
  FormLabel,
  FormStatus,
  generateFieldId,
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

export const Textarea = ({
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

  // Auto-grow
  autoGrow = false,
  minRows = 1,
  maxRows,

  // Character Counter
  showCharacterCount = false,
  characterCountPosition = 'inside-right',

  // Event Handlers
  onChange,
  onFocus,
  onBlur,
}: TextareaProps) => {
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

  // 3. Auto-grow 기능을 위한 ref
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 3. Auto-grow 로직 - value 변경 및 초기 렌더링 시 높이 조정
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autoGrow) return;

    const adjustHeight = () => {
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
    };

    adjustHeight();
  }, [value, autoGrow, minRows, maxRows]);

  // ========================================
  // 4. 현재 글자수 계산
  // ========================================
  const currentLength = useMemo(() => {
    if (value !== undefined) {
      return value.length;
    }
    return 0;
  }, [value]);

  // ========================================
  // 5. 글자수 카운터 렌더링 함수
  // ========================================
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
    return null; // 외부 위치는 나중에 FormStatus 영역에서 처리
  };

  // ========================================
  // 6. CSS Variables 주입
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
    [textareaVars.borderRadius]: `${toRem(actualRadius)}`,
  });

  // ID 생성 (label과 textarea 연결용)
  const textareaId = generateFieldId('textarea', id);

  return (
    <div className={`${textareaWrapper}`} style={{ ...vars }}>
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
          ref={textareaRef}
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
          required={required}
          onChange={(e) => {
            onChange?.(e);
            // autoGrow일 때는 onChange에서도 높이 조정
            if (autoGrow) {
              const textarea = textareaRef.current;
              if (textarea) {
                textarea.style.height = 'auto';
                const scrollHeight = textarea.scrollHeight;
                const computedStyle = window.getComputedStyle(textarea);
                const lineHeight = parseFloat(computedStyle.lineHeight);
                const minHeight = lineHeight * minRows;
                const maxHeight = maxRows ? lineHeight * maxRows : Infinity;
                const newHeight = Math.min(
                  Math.max(scrollHeight, minHeight),
                  maxHeight
                );
                textarea.style.height = `${newHeight}px`;
                textarea.style.overflowY =
                  maxRows && scrollHeight > maxHeight ? 'auto' : 'hidden';
              }
            }
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
};
