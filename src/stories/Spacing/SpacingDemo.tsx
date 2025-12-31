import { color, rounded, typography } from '../../tokens';
import { spacing } from '../../tokens/dev/helpers/spacing';
import { toRem } from '../../tokens/dev/helpers/units';

export type SpacingDemoProps = {
  margin?: keyof typeof spacing;
  marginTop?: keyof typeof spacing;
  marginRight?: keyof typeof spacing;
  marginBottom?: keyof typeof spacing;
  marginLeft?: keyof typeof spacing;
  padding?: keyof typeof spacing;
  paddingTop?: keyof typeof spacing;
  paddingRight?: keyof typeof spacing;
  paddingBottom?: keyof typeof spacing;
  paddingLeft?: keyof typeof spacing;
  gap?: keyof typeof spacing;
  gapY?: keyof typeof spacing;
  gapX?: keyof typeof spacing;
};

export const SpacingDemo = ({
  margin = 0,
  marginTop: marginTopProp,
  marginRight: marginRightProp,
  marginBottom: marginBottomProp,
  marginLeft: marginLeftProp,
  padding = 0,
  paddingTop: paddingTopProp,
  paddingRight: paddingRightProp,
  paddingBottom: paddingBottomProp,
  paddingLeft: paddingLeftProp,
  gap = 0,
  gapY: gapYProp,
  gapX: gapXProp,
}: SpacingDemoProps) => {
  // 일괄 적용(margin)이 있으면 우선 사용, 없으면 개별 값 사용
  const marginTop = marginTopProp ?? margin;
  const marginRight = marginRightProp ?? margin;
  const marginBottom = marginBottomProp ?? margin;
  const marginLeft = marginLeftProp ?? margin;

  // 일괄 적용(padding)이 있으면 우선 사용, 없으면 개별 값 사용
  const paddingTop = paddingTopProp ?? padding;
  const paddingRight = paddingRightProp ?? padding;
  const paddingBottom = paddingBottomProp ?? padding;
  const paddingLeft = paddingLeftProp ?? padding;

  // 일괄 적용(gap)이 있으면 우선 사용, 없으면 개별 값 사용
  const gapY = gapYProp ?? gap;
  const gapX = gapXProp ?? gap;

  const hasMargin =
    marginTop > 0 || marginRight > 0 || marginBottom > 0 || marginLeft > 0;
  const hasPadding =
    paddingTop > 0 || paddingRight > 0 || paddingBottom > 0 || paddingLeft > 0;

  return (
    <div
      style={{
        width: '600px',
        maxWidth: '100%',
        backgroundColor: color.yellow[100],
        border: hasMargin ? `1px solid ${color.yellow[500]}` : 0,
        borderRadius: toRem(rounded.md),
      }}
    >
      <div
        style={{
          border: hasPadding ? `1px dashed ${color.indigo[400]}` : 0,
          marginTop: spacing[marginTop],
          marginRight: spacing[marginRight],
          marginBottom: spacing[marginBottom],
          marginLeft: spacing[marginLeft],
          paddingTop: spacing[paddingTop],
          paddingRight: spacing[paddingRight],
          paddingBottom: spacing[paddingBottom],
          paddingLeft: spacing[paddingLeft],
          backgroundColor: color.indigo[100],
          borderRadius: toRem(rounded.sm),
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: spacing[gapY],
            columnGap: spacing[gapX],
            background: `
              repeating-linear-gradient(
                -45deg,
                ${color.base.white},
                ${color.base.white} 8px,
                ${color.gray[300]} 8px,
                ${color.base.white} 9px
              )
            `,
            borderRadius: toRem(rounded.sm),
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px',
                backgroundColor: color.blue[500],
                border: `1px solid ${color.blue[600]}`,
                color: color.base.white,
                fontSize: toRem(typography.fontSize[22]),
                fontWeight: 700,
                borderRadius: toRem(rounded.sm),
              }}
            >
              {String(num).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
