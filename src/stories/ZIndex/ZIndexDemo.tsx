import {
  color,
  rounded,
  spacing,
  toRem,
  typography,
  zIndex,
} from '../../tokens';

export type ZIndexDemoProps = {
  level?: keyof typeof zIndex;
};

const layers = [
  {
    name: 'base',
    value: zIndex.base,
    color: color.gray[300],
    textColor: color.gray[800],
  },
  {
    name: 'docked',
    value: zIndex.docked,
    color: color.gray[400],
    textColor: color.gray[900],
  },
  {
    name: 'dropdown',
    value: zIndex.dropdown,
    color: color.blue[200],
    textColor: color.base.white,
  },
  {
    name: 'sticky',
    value: zIndex.sticky,
    color: color.blue[200],
    textColor: color.base.white,
  },
  {
    name: 'banner',
    value: zIndex.banner,
    color: color.blue[300],
    textColor: color.base.white,
  },
  {
    name: 'overlay',
    value: zIndex.overlay,
    color: color.blue[500],
    textColor: color.base.white,
  },
  {
    name: 'modal',
    value: zIndex.modal,
    color: color.blue[600],
    textColor: color.base.white,
  },
  {
    name: 'popover',
    value: zIndex.popover,
    color: color.blue[700],
    textColor: color.base.white,
  },
  {
    name: 'skipLink',
    value: zIndex.skipLink,
    color: color.blue[800],
    textColor: color.base.white,
  },
  {
    name: 'toast',
    value: zIndex.toast,
    color: color.blue[900],
    textColor: color.base.white,
  },
  {
    name: 'tooltip',
    value: zIndex.tooltip,
    color: color.blue[950],
    textColor: color.base.white,
  },
];

export const ZIndexDemo = ({ level = 'base' }: ZIndexDemoProps) => {
  const zValue = zIndex[level];

  return (
    <div
      style={{
        backgroundColor: color.gray[100],
        borderRadius: toRem(rounded.sm),
        padding: spacing[12],
        position: 'relative',
        height: '300px',
        width: '800px',
        display: 'flex',
      }}
    >
      {/* 배경 레이어 */}
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: layer.color,
            borderRadius: toRem(rounded.sm),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: layer.textColor,
            fontSize: toRem(typography.fontSize[14]),
            fontWeight: 600,
            boxShadow: index === 0 ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: layer.value,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {layer.name}
            <br />
            <span
              style={{
                fontSize: toRem(typography.fontSize[12]),
                opacity: 0.8,
              }}
            >
              {layer.value}
            </span>
          </div>
        </div>
      ))}

      {/* 선택된 레벨 레이어 */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: '40px',
          width: '750px',
          height: '150px',
          backgroundColor: color.blue[500],
          borderRadius: toRem(rounded.sm),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: parseInt(zValue),
          color: color.base.white,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: toRem(typography.fontSize[16]),
            fontWeight: 600,
          }}
        >
          {level}
          <br />
          <span
            style={{
              fontSize: toRem(typography.fontSize[14]),
              opacity: 0.9,
            }}
          >
            z-index: {zValue}
          </span>
        </div>
      </div>
    </div>
  );
};

export const LayerStack = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: spacing[4],
        alignItems: 'flex-end',
      }}
    >
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          style={{
            width: '80px',
            height: `${60 + index * 20}px`,
            backgroundColor: layer.color,
            borderRadius: toRem(rounded.sm),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: layer.textColor,
            fontSize: toRem(typography.fontSize[14]),
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {layer.name}
            <br />
            <span
              style={{
                fontSize: toRem(typography.fontSize[12]),
                opacity: 0.8,
              }}
            >
              {layer.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
