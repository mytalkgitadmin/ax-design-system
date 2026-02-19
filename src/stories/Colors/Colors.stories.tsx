import { useState } from 'react';

import { color, theme } from '../../tokens';
import { type CopyFormat, Palette } from './Palette';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Colors 컴포넌트는 디자인 시스템의 색상 팔레트를 보여줍니다.
 *
 * ## 사용법
 * 각 색상을 클릭하면 선택한 형식으로 복사됩니다.
 *
 * ### 1. Primitive Colors (기본 색상)
 * 50-950까지의 단계별 색상 팔레트입니다.
 * ```tsx
 * import { color } from '@/tokens';
 *
 * const blueColor = color.blue[500]; // "#6f94ff"
 * const grayColor = color.gray[900]; // "#2f3744"
 * ```
 *
 * ### 2. Semantic Colors (의미 기반 색상)
 * 용도에 따라 정의된 색상입니다. **컴포넌트에서는 Semantic 색상을 우선 사용하세요.**
 * ```tsx
 * import { color } from '@/tokens';
 *
 * // ✅ 권장: Semantic 색상 사용
 * const textColor = color.text.primary;    // "#2f3744"
 * const bgColor = color.bg.subtle;         // "#f8f9fc"
 * const borderColor = color.border.default; // "#e3e6ee"
 *
 * // ⚠️ 비권장: Primitive 색상 직접 사용
 * const textColor = color.gray[900];       // "#2f3744"
 * ```
 *
 * ### 3. Brand Colors (브랜드 색상)
 * Theme 시스템을 통해 프로젝트별로 변경 가능한 브랜드 색상입니다.
 * ```tsx
 * import { theme } from '@/tokens';
 *
 * const brandColor = theme.brand.default;  // "#4f7cff"
 * const strongBrand = theme.brand.strong;  // "#355fea"
 * ```
 *
 * ### 4. CSS 변수 사용
 * ```css
 * .custom {
 *   background-color: var(--blue-500);
 *   color: var(--text-primary);
 *   border: 1px solid var(--border-default);
 *   background: var(--brand-default);
 * }
 * ```
 */
const meta = {
  title: 'Foundation/Colors',
  component: Palette,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', '!dev'],
} satisfies Meta<typeof Palette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {
  args: {
    title: 'All Colors',
    colors: color.gray,
  },
  render: () => <ColorsStroy />,
};

const ColorsStroy = () => {
  const [copyFormat, setCopyFormat] = useState<CopyFormat>('hex');

  return (
    <div className='maxWidth'>
      {/* Header */}
      <section>
        <h1>Colors</h1>
        <p>
          디자인 시스템의 색상 팔레트입니다. 각 색상을 클릭하면 선택한 형식으로
          복사됩니다.
        </p>

        <div style={{ marginTop: '16px' }}>
          <label
            htmlFor='copy-format'
            style={{ marginRight: '8px', fontWeight: '500' }}
          >
            복사 형식:
          </label>
          <select
            id='copy-format'
            value={copyFormat}
            onChange={(e) => setCopyFormat(e.target.value as CopyFormat)}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              cursor: 'pointer',
              minWidth: '150px',
            }}
          >
            <option value='hex'>HEX (#6f94ff)</option>
            <option value='token'>Token (color.blue[500])</option>
            <option value='var'>CSS Variable (var(--blue-500))</option>
          </select>
        </div>
      </section>

      {/* Base Colors Section */}
      <section className='container'>
        <h2>Base</h2>

        <div className='grid2'>
          {Object.entries(color.base).map(([name, value]) => (
            <Palette
              key={name}
              color={value}
              name={name}
              isBorder={true}
              copyFormat={copyFormat}
            />
          ))}
        </div>
      </section>

      <section className='container'>
        <h2>Primitive Colors</h2>
        <p
          style={{
            fontSize: '14px',
            color: '#888e9c',
            marginBottom: '24px',
          }}
        >
          기본 색상 팔레트입니다. 50(가장 밝음)부터 950(가장 어두움)까지
          11단계로 구성됩니다.
        </p>

        {/* Color palettes */}
        <Palette
          title='Gray'
          colors={color.gray}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Blue'
          colors={color.blue}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Red'
          colors={color.red}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Green'
          colors={color.green}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Pink'
          colors={color.pink}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Indigo'
          colors={color.indigo}
          copyFormat={copyFormat}
          category='primitive'
        />
        <Palette
          title='Yellow'
          colors={color.yellow}
          copyFormat={copyFormat}
          category='primitive'
        />
      </section>

      {/* Semantic Colors Section */}
      <section className='container'>
        <h2>Semantic Colors</h2>
        <p
          style={{
            fontSize: '14px',
            color: '#888e9c',
            marginBottom: '24px',
          }}
        >
          의미에 따라 정의된 색상입니다. 컴포넌트에서 Primitive 색상 대신
          Semantic 색상을 사용하면 일관된 디자인을 유지할 수 있습니다.
        </p>

        <Palette
          title='Background'
          colors={color.bg}
          copyFormat={copyFormat}
          category='semantic'
          description='배경 색상: default(기본 흰색), subtle(은은한 회색), muted(희미한), disabled(비활성화), inverse(반전)'
        />

        <Palette
          title='Border'
          colors={color.border}
          copyFormat={copyFormat}
          category='semantic'
          description='테두리 색상: default(기본), strong(강조), disabled(비활성화), negative/positive/warning(상태별)'
        />

        <Palette
          title='Divider'
          colors={color.divider}
          copyFormat={copyFormat}
          category='semantic'
          description='구분선 색상: default(기본), soft(연한), strong(진한), inverse(반전)'
        />

        <Palette
          title='Text'
          colors={color.text}
          copyFormat={copyFormat}
          category='semantic'
          description='텍스트 색상: primary(주요), secondary(부차), tertiary(3차), muted(희미한), disabled(비활성화), link(링크), negative/positive/warning(상태별)'
        />

        <Palette
          title='Icon'
          colors={color.icon}
          copyFormat={copyFormat}
          category='semantic'
          description='아이콘 색상: primary(주요), secondary(부차), fill(채우기), disabled(비활성화), negative/positive/warning(상태별)'
        />
      </section>

      {/* Brand Colors Section */}
      <section className='container'>
        <h2>Brand Colors</h2>
        <p
          style={{
            fontSize: '14px',
            color: '#888e9c',
            marginBottom: '24px',
          }}
        >
          브랜드를 나타내는 주요 색상입니다. Theme 시스템을 통해 프로젝트별로
          다른 브랜드 색상을 적용할 수 있습니다.
        </p>

        <Palette
          title='Brand 1 (Blue)'
          colors={theme.brand1}
          copyFormat={copyFormat}
          category='brand'
          description='브랜드 1 (Blue): default(기본), subtle(연한), strong(강한), stronger(더 강한), strongest(가장 강한)'
        />

        <Palette
          title='Brand 2 (Pink)'
          colors={theme.brand2}
          copyFormat={copyFormat}
          category='brand'
          description='브랜드 2 (Pink): default(기본), subtle(연한), strong(강한), stronger(더 강한), strongest(가장 강한)'
        />
      </section>

      {/* Alpha Colors Section */}
      <section className='container'>
        <h2>Alpha Colors</h2>
        <p
          style={{
            fontSize: '14px',
            color: '#888e9c',
            marginBottom: '24px',
          }}
        >
          투명도가 적용된 흑백 색상입니다. 클릭하면 HEX 코드가 복사됩니다.
        </p>

        {/* White alpha colors */}

        <div
          className='grid7'
          style={{
            padding: '10px',
            background: '#000',
            color: '#fff',
          }}
        >
          {Object.entries(color.alpha)
            .filter(([name]) => name.startsWith('w'))
            .sort((a, b) => {
              const numA = parseInt(a[0].substring(1)) || 0;
              const numB = parseInt(b[0].substring(1)) || 0;
              return numA - numB;
            })
            .map(([name, value]) => (
              <Palette
                key={name}
                color={value}
                name={name}
                copyFormat={copyFormat}
              />
            ))}
        </div>

        {/* Black alpha colors */}
        <div
          className='grid7'
          style={{
            padding: '10px',
            border: '1px solid #eee',
          }}
        >
          {Object.entries(color.alpha)
            .filter(([name]) => name.startsWith('b'))
            .sort((a, b) => {
              const numA = parseInt(a[0].substring(1)) || 0;
              const numB = parseInt(b[0].substring(1)) || 0;
              return numA - numB;
            })
            .map(([name, value]) => (
              <Palette
                key={name}
                color={value}
                name={name}
                copyFormat={copyFormat}
              />
            ))}
        </div>
      </section>
    </div>
  );
};
