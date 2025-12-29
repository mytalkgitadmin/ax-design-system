import { color, rounded, spacing, typography } from '../../tokens';
import { toRem } from '../../tokens/dev/helpers/units';

export type RoundedDemoProps = {
  rounded?: keyof typeof rounded;
};

export const RoundedDemo = ({
  rounded: roundedSize = 'none',
}: RoundedDemoProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: toRem(spacing[24]),
      }}
    >
      <Box width={100} height={100} rounded={roundedSize} />
      <Box width={200} height={100} rounded={roundedSize} />
    </div>
  );
};

export const Box = ({
  width = 80,
  height = 80,
  rounded: roundedSize = 'none',
}: {
  width?: number;
  height?: number;
  rounded?: keyof typeof rounded;
}) => {
  const radiusValue = rounded[roundedSize];

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color.blue[400],
        borderRadius: toRem(radiusValue),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color.base.white,
        fontSize: toRem(typography.fontSize[16]),
        fontWeight: 600,
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: toRem(typography.fontSize[14]),
        }}
      >
        {radiusValue}px
        <br />
        <span
          style={{
            fontSize: toRem(typography.fontSize[12]),
            opacity: 0.8,
          }}
        >
          {roundedSize}
        </span>
      </div>
    </div>
  );
};
