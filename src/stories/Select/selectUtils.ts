import { assignInlineVars } from '@vanilla-extract/dynamic';

import { color } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';
import { formFieldVars } from '../FormField';

import type { GlobalTheme } from '../../theme/global';
import type { FormFieldColorScheme } from '../FormField/types';

import { selectVars } from './Select.css';

type LabelFontSize = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

/**
 * Select 컴포넌트용 CSS 변수 생성 유틸리티
 * 복잡한 CSS 변수 할당 로직을 별도 함수로 분리하여 가독성 향상
 */
export const getSelectCSSVars = (
  global: GlobalTheme,
  finalLabelFontSize: LabelFontSize,
  finalColorScheme: FormFieldColorScheme,
  finalFontWeight: number,
  actualRadius: number
) => {
  return assignInlineVars({
    // FormField 공통 변수 (Label 크기)
    [formFieldVars.labelFontSizeXs]: `${toRem(finalLabelFontSize.xs)}`,
    [formFieldVars.labelFontSizeSm]: `${toRem(finalLabelFontSize.sm)}`,
    [formFieldVars.labelFontSizeMd]: `${toRem(finalLabelFontSize.md)}`,
    [formFieldVars.labelFontSizeLg]: `${toRem(finalLabelFontSize.lg)}`,
    [formFieldVars.labelFontSizeXl]: `${toRem(finalLabelFontSize.xl)}`,
    [formFieldVars.labelColor]: global.color.text.primary,
    [formFieldVars.helperTextColor]: global.color.text.tertiary,
    [formFieldVars.successTextColor]: global.color.text.positive,
    [formFieldVars.errorTextColor]: global.color.text.negative,
    [formFieldVars.warnTextColor]: global.color.text.warning,
    [formFieldVars.fontFamily]: global.typography.fontFamily,

    // Select 전용 변수
    [selectVars.textColor]: global.color.text.secondary,
    [selectVars.placeholderColor]: global.color.text.muted,
    [selectVars.disabledTextColor]: global.color.text.disabled,
    [selectVars.iconColor]: global.color.text.muted,
    [selectVars.iconColorExpanded]: global.color.text.secondary,
    [selectVars.iconColorDisabled]: global.color.text.disabled,
    [selectVars.selectedOptionTextColor]: global.color.brand.default,
    [selectVars.borderColor]: finalColorScheme.default,
    [selectVars.hoverBorderColor]: finalColorScheme.hover,
    [selectVars.focusBorderColor]: finalColorScheme.focus,
    [selectVars.focusShadowColor]: finalColorScheme.focusShadow,
    [selectVars.errorBorderColor]: finalColorScheme.error,
    [selectVars.bgColor]: global.color.bg.default,
    [selectVars.disabledBgColor]: global.color.bg.disabled,
    [selectVars.fontWeight]: String(finalFontWeight),
    [selectVars.borderRadius]: `${toRem(actualRadius)}`,
    [selectVars.optionDividerColor]: color.divider.default,
  });
};
