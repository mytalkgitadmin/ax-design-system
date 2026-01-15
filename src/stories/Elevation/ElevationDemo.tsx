import { useState } from 'react';

import { color, shadow, toRem, typography } from '../../tokens';

export type ElevationDemoProps = {
  elevation?: keyof typeof shadow;
};

export const ElevationDemo = ({
  elevation = 'default',
}: ElevationDemoProps) => {
  return <ElevationBox elevation={elevation} />;
};

export const ElevationBox = ({
  width = 120,
  height = 120,
  elevation = 'default',
}: {
  width?: number;
  height?: number;
  elevation?: keyof typeof shadow;
}) => {
  const shadowValue = shadow[elevation];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `var(--shadow-${elevation})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color.base.white,
        boxShadow: shadowValue,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: color.text.primary,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {copied && (
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            backgroundColor: color.alpha.black80,
            color: color.base.white,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: toRem(typography.fontSize[12]),
            animation: 'fadeIn 0.2s',
          }}
        >
          Copied!
        </div>
      )}
      <p
        style={{
          fontSize: toRem(typography.fontSize[14]),
        }}
      >
        {elevation}
      </p>
    </div>
  );
};
