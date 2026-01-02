import { color } from '../../tokens';
import { Icon } from './index';
import { ICON_COLOR_PRESETS, ICON_NAMES } from './types';

import type { IconName } from './types';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Icon 컴포넌트는 커스텀 SVG 아이콘을 사용하는 아이콘 컴포넌트입니다.
 *
 * ## 주요 기능
 * - SVG 기반의 커스텀 아이콘 시스템
 * - 크기 조절이 자유로움
 * - 시맨틱 컬러 프리셋 (primary, warning, success, danger)
 * - 커스텀 hex/rgb 컬러 지원
 * - 웹 접근성 자동 처리
 *
 * ## 컬러 사용법
 * ### 시맨틱 토큰 (권장)
 * ```tsx
 * <Icon name="Check" color="primary" />
 * <Icon name="Check" color="success" />
 * <Icon name="Check" color="danger" />
 * ```
 *
 * ### 커스텀 컬러
 * ```tsx
 * <Icon name="Check" color="#8facff" />
 * <Icon name="Check" color="rgb(143, 172, 255)" />
 * ```
 *
 * ## 접근성 (Accessibility)
 * Icon 컴포넌트를 **직접 사용**할 때, aria-label 제공 여부에 따라 자동으로 접근성 속성을 설정합니다.
 *
 * ### 의미있는 아이콘 (aria-label 제공)
 * 아이콘이 유일한 정보 전달 수단인 경우 aria-label 필수
 * ```tsx
 * <div onClick={handleSearch}>
 *   <Icon name="Search" aria-label="검색" />
 * </div>
 * ```
 * 스크린리더: "검색" (role="img" 자동 적용)
 *
 * ### 장식용 아이콘 (aria-label 생략)
 * 텍스트와 함께 사용되어 시각적 강화 용도인 경우
 * ```tsx
 * <div>
 *   <Icon name="Check" />
 *   <span>완료됨</span>
 * </div>
 * ```
 * 스크린리더: "완료됨" (아이콘 무시, aria-hidden 자동 적용)
 *
 * ### 규칙
 * - **아이콘만 있는 경우**: aria-label 필수
 * - **텍스트와 함께 있는 경우**: aria-label 생략 (장식용)
 * - **상태 표시 아이콘**: aria-label 제공 권장
 *
 * **참고**: Button 컴포넌트 내부에서는 Icon이 자동으로 장식용으로 처리됩니다.
 *
 * ## 특별한 아이콘들
 * ### Circle Duotone/Filled 아이콘
 * `CircleNegativeDuotone`, `CirclePositiveFilled` 등의 아이콘은 **고정된 색상**을 사용합니다.
 * - `color` prop이 적용되지 않습니다
 * - 디자인 시스템의 시맨틱 컬러를 사용하도록 설계됨
 * ```tsx
 * <Icon name="CircleNegativeDuo" color="primary" /> // color prop 무시됨
 * <Icon name="CirclePositiveFilled" />              // 항상 초록색
 * ```
 */
const meta = {
  title: 'Foundation/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', '!dev'],
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
    },
    size: {
      control: { type: 'number', min: 12, max: 64, step: 4 },
    },
    color: {
      control: 'select',
      options: [
        ...ICON_COLOR_PRESETS,
        color.gray['500'],
        color.gray['700'],
        color.blue['600'],
        color.pink['600'],
        color.indigo['600'],
        color.green['600'],
      ],
      description:
        '시맨틱 프리셋(primary, warning 등) 또는 토큰 컬러 선택. 커스텀 hex 값은 직접 입력 가능',
    },
  },
  args: {
    name: 'Check',
    size: 20,
    color: 'primary',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * 시맨틱 컬러 프리셋 - 디자인 시스템에서 정의한 색상을 사용합니다.
 */
export const SemanticColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={32} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={32} color='warning' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Warning</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={32} color='success' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Success</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={32} color='danger' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Danger</p>
      </div>
    </div>
  ),
};

/**
 * 커스텀 컬러 - 토큰의 원시 컬러를 직접 사용할 수 있습니다.
 */
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          디자인 토큰 색상
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color={color.blue['600']} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Blue 600</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color={color.pink['600']} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Pink 600</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color={color.indigo['600']} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Indigo 600</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color={color.green['600']} />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Green 600</p>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          커스텀 Hex 값
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color='#8facff' />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Custom Blue</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color='#f159cb' />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Custom Pink</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon name='Check' size={32} color='#3fbe75' />
            <p style={{ marginTop: '8px', fontSize: '12px' }}>Custom Green</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 아이콘 사이즈
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={16} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>16px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={20} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>20px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={24} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>24px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={32} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>32px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name='Check' size={48} color='primary' />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>48px</p>
      </div>
    </div>
  ),
};

/**
 * 접근성 사용 예제 - aria-label 제공 여부에 따라 자동으로 접근성 속성이 설정됩니다.
 *
 * Storybook의 Accessibility 탭에서 a11y 검사 결과를 확인할 수 있습니다.
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 예제 1: 아이콘만 있는 클릭 가능한 요소 (aria-label 필수) */}
      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#333',
          }}
        >
          1. 아이콘만 있는 클릭 가능한 요소 (aria-label 필수)
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            onClick={() => {}}
            style={{
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <Icon name='Search' size={20} aria-label='검색' />
          </div>
          <div
            onClick={() => {}}
            style={{
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <Icon name='X' size={20} aria-label='닫기' />
          </div>
          <div
            onClick={() => {}}
            style={{
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            <Icon name='Hamburger' size={20} aria-label='메뉴' />
          </div>
          <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
            → 스크린리더: "검색", "닫기", "메뉴"
          </p>
        </div>
      </div>

      {/* 예제 2: 텍스트와 함께 있는 아이콘 (aria-label 생략) */}
      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#333',
          }}
        >
          2. 텍스트와 함께 있는 아이콘 (aria-label 생략 = 장식용)
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <Icon name='Search' size={16} />
            <span>검색</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <Icon name='Plus' size={16} />
            <span>추가</span>
          </div>
          <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
            → 스크린리더: "검색", "추가" (아이콘 무시)
          </p>
        </div>
      </div>

      {/* 예제 3: 상태 표시 아이콘 */}
      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#333',
          }}
        >
          3. 상태 표시 아이콘 (aria-label 제공 권장)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name='CirclePositiveFilled' size={20} aria-label='성공' />
            <span>파일 업로드가 완료되었습니다</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name='CircleNegativeFilled' size={20} aria-label='오류' />
            <span>파일 업로드에 실패했습니다</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name='CircleInfoFilled' size={20} aria-label='정보' />
            <span>최대 10MB까지 업로드 가능합니다</span>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: '#6c757d',
              margin: 0,
              marginTop: '4px',
            }}
          >
            → 스크린리더: "성공. 파일 업로드가 완료되었습니다"
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * 모든 아이콘 목록 - ICON_NAMES를 기반으로 자동 생성
 */
export const AllIcons: Story = {
  render: () => {
    // 아이콘 이름의 접두사로 카테고리 자동 분류
    const categorizeIcons = (iconNames: IconName[]) => {
      const categories: Record<string, IconName[]> = {
        Interface: [],
        Social: [],
        Circle: [],
        Arrow: [],
      };

      const arrowNames = ['Down', 'Up', 'Left', 'Right'];

      iconNames.forEach((name) => {
        if (name.startsWith('Circle')) {
          categories.Circle.push(name);
        } else if (
          name.startsWith('Chevron') ||
          name.startsWith('Dropdown') ||
          arrowNames.includes(name as string)
        ) {
          categories.Arrow.push(name);
        } else if (name === 'Instagram') {
          categories.Social.push(name);
        } else {
          categories.Interface.push(name);
        }
      });

      // 빈 카테고리 제거하고 순서 유지
      return Object.entries(categories)
        .filter(([, items]) => items.length > 0)
        .map(([category, items]) => ({
          category,
          items,
        }));
    };

    const iconCategories = categorizeIcons(ICON_NAMES);

    const handleCopy = (iconName: IconName) => {
      const code = `<Icon name="${iconName}" />`;
      navigator.clipboard.writeText(code);
    };

    return (
      <div style={{ width: '100%' }}>
        {iconCategories.map(({ category, items }) => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: '16px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '8px',
              }}
            >
              {category} ({items.length})
            </h3>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {items.map((name) => (
                <button
                  key={name}
                  onClick={() => handleCopy(name)}
                  style={{
                    background: 'none',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    width: '120px',
                    fontSize: '10px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#007bff';
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name={name} size={32} />
                  <p
                    style={{
                      fontSize: '11px',
                      margin: 0,
                      color: '#6c757d',
                      wordBreak: 'break-all',
                      textAlign: 'center',
                    }}
                  >
                    {name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
