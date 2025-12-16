import { useState } from 'react';

export type CopyFormat = 'hex' | 'ts-token' | 'css-class' | 'css-var';

export interface PaletteProps {
  color?: string;
  name?: string;
  isBorder?: boolean;
  title?: string;
  colors?: {
    [key: string]: string;
  };
  copyFormat?: CopyFormat;
}

const ColorBox: React.FC<{
  color: string;
  name: string;
  isBorder?: boolean;
  copyFormat: CopyFormat;
}> = ({ color, name, isBorder, copyFormat }) => {
  const [copied, setCopied] = useState(false);

  const getFormattedValue = (format: CopyFormat): string => {
    const nameParts = name.toLowerCase().split('-');

    switch (format) {
      case 'hex':
        return color;
      case 'ts-token':
        // gray-500 -> color.gray[500]
        if (nameParts.length === 2) {
          return `color.${nameParts[0]}[${nameParts[1]}]`;
        }
        // white, black 등
        return `color.base.${nameParts[0]}`;
      case 'css-class':
        // gray-500 -> bg-gray-500 또는 text-gray-500
        return `bg-${name.toLowerCase()}`;
      case 'css-var':
        // gray-500 -> var(--color-gray-500)
        return `var(--color-${name.toLowerCase()})`;
      default:
        return color;
    }
  };

  const handleClick = () => {
    const valueToCopy = getFormattedValue(copyFormat);
    navigator.clipboard.writeText(valueToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className='click' onClick={handleClick} style={{ position: 'relative' }}>
      <div
        className='box'
        style={{
          backgroundColor: color,
          border: isBorder ? '1px solid #eee' : '0',
        }}
      />

      <p className='text'>
        <strong>{name.toLowerCase()}</strong>
        <br />
        <span>{color}</span>
      </p>

      {copied && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            pointerEvents: 'none',
            zIndex: 10,
            maxWidth: '200px',
            wordBreak: 'break-all',
          }}
        >
          {getFormattedValue(copyFormat)}
        </div>
      )}
    </div>
  );
};

const Palette: React.FC<PaletteProps> = (props) => {
  const defaultCopyFormat: CopyFormat = props.copyFormat || 'hex';

  if (props.title && props.colors) {
    const shades = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
    ];

    return (
      <section>
        <h3>{props.title}</h3>

        <div className='grid11'>
          {shades.map((shade) => {
            const colorValue = props.colors![shade];
            return colorValue ? (
              <ColorBox
                key={shade}
                name={`${props.title}-${shade}`}
                color={colorValue}
                copyFormat={defaultCopyFormat}
              />
            ) : (
              <div key={shade} />
            );
          })}
        </div>
      </section>
    );
  }

  if (props.color && props.name) {
    return (
      <ColorBox
        color={props.color}
        name={props.name}
        isBorder={props.isBorder}
        copyFormat={defaultCopyFormat}
      />
    );
  }

  return null;
};

export default Palette;
