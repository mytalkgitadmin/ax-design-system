/**
 * Responsive Demo - Simple Version
 * 외부 CSS 파일 의존성 없이 즉시 작동하는 데모 모음
 */
import { useEffect, useState } from 'react';

// --- 유틸리티 ---
const ViewportIndicator = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = () => {
    if (width >= 1024) return 'Desktop 🖥️';
    if (width >= 768) return 'Tablet 📱';
    return 'Mobile 📱';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '0.75rem 1.25rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontFamily: 'monospace',
        fontSize: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        minWidth: '120px',
      }}
    >
      <strong style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        {width}px
      </strong>
      <span
        style={{
          fontSize: '0.75rem',
          opacity: 0.9,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {getBreakpoint()}
      </span>
    </div>
  );
};

// --- 1. Clamp Typography Demo ---
export const ClampTypographyDemo = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <ViewportIndicator />
      <h2
        style={{
          fontSize: 'clamp(3.2rem, 6vw, 7.2rem)',
          lineHeight: 1.2,
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        Clamp Typography 🎨
      </h2>
      <p
        style={{
          fontSize: 'clamp(1.4rem, 2vw, 2rem)',
          textAlign: 'center',
          color: '#666',
          marginBottom: '3rem',
        }}
      >
        👉 <strong>브라우저 창 크기를 천천히 조절해보세요!</strong>
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Display 1 - 노란색 */}
        <div
          style={{
            padding: '2rem',
            border: '3px solid #f59e0b',
            borderRadius: '16px',
            backgroundColor: '#fffbeb',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#92400e',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              backgroundColor: '#fef3c7',
              padding: '0.5rem',
              borderRadius: '8px',
            }}
          >
            Display 1
          </h3>
          <p
            style={{
              fontSize: 'clamp(3.2rem, 6vw, 7.2rem)',
              fontWeight: 'bold',
              margin: '1rem 0',
              color: '#78350f',
              lineHeight: 1.2,
              backgroundColor: '#fde68a',
              padding: '1rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
            }}
          >
            Aa
          </p>
          <code style={{ fontSize: '0.875rem', color: '#92400e' }}>
            32px ~ 72px
          </code>
        </div>
        {/* Title 1 - 파란색 */}
        <div
          style={{
            padding: '2rem',
            border: '3px solid #3b82f6',
            borderRadius: '16px',
            backgroundColor: '#eff6ff',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              backgroundColor: '#dbeafe',
              padding: '0.5rem',
              borderRadius: '8px',
            }}
          >
            Title 1
          </h3>
          <p
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.8rem)',
              fontWeight: 'bold',
              margin: '1rem 0',
              color: '#1e3a8a',
              lineHeight: 1.2,
              backgroundColor: '#93c5fd',
              padding: '1rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
            }}
          >
            Aa
          </p>
          <code style={{ fontSize: '0.875rem', color: '#1e40af' }}>
            24px ~ 48px
          </code>
        </div>
        {/* Title 2 - 보라색 */}
        <div
          style={{
            padding: '2rem',
            border: '3px solid #9333ea',
            borderRadius: '16px',
            backgroundColor: '#faf5ff',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#6b21a8',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              backgroundColor: '#f3e8ff',
              padding: '0.5rem',
              borderRadius: '8px',
            }}
          >
            Title 2
          </h3>
          <p
            style={{
              fontSize: 'clamp(2rem, 3vw, 3.6rem)',
              fontWeight: 'bold',
              margin: '1rem 0',
              color: '#581c87',
              lineHeight: 1.2,
              backgroundColor: '#c084fc',
              padding: '1rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
            }}
          >
            Aa
          </p>
          <code style={{ fontSize: '0.875rem', color: '#6b21a8' }}>
            20px ~ 36px
          </code>
        </div>
      </div>
    </div>
  );
};

// --- 2. Media Query Demo ---
export const MediaQueryDemo = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <ViewportIndicator />
      <style>
        {`
          .mq-container {
            padding: 1rem;
            background-color: #eff6ff; /* Mobile: Blue 50 */
            border: 4px dashed #3b82f6;
            border-radius: 16px;
            transition: all 0.5s ease;
            text-align: center;
          }
          .mq-text { font-size: 1.25rem; font-weight: bold; color: #1e3a8a; }
          .mq-badge { display: inline-block; padding: 0.5rem 1rem; border-radius: 9999px; background-color: #bfdbfe; margin-bottom: 1rem; }

          @media (min-width: 768px) {
            .mq-container {
              padding: 3rem;
              background-color: #dbeafe; /* Tablet: Blue 100 */
              border-color: #2563eb;
            }
            .mq-text { font-size: 2rem; }
            .mq-badge { background-color: #93c5fd; }
          }

          @media (min-width: 1024px) {
            .mq-container {
              padding: 5rem;
              background-color: #bfdbfe; /* Desktop: Blue 200 */
              border-color: #1d4ed8;
              max-width: 800px;
              margin: 0 auto;
            }
            .mq-text { font-size: 3rem; }
            .mq-badge { background-color: #60a5fa; color: white; }
          }
        `}
      </style>

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Media Queries 📱 → 💻
      </h2>

      <div className='mq-container'>
        <span className='mq-badge'>Resize Me!</span>
        <div className='mq-text'>
          <span style={{ display: 'block', marginBottom: '0.5rem' }}>
            현재 상태:
          </span>
          {/* CSS content로 제어하기 어려우므로 React로 텍스트 변경은 ViewportIndicator 참고 */}
          <span className='mq-label'>배경색과 패딩이 변합니다</span>
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(3, 1fr)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            padding: '1rem',
            background: '#eff6ff',
            borderRadius: '8px',
          }}
        >
          <strong>Mobile</strong> <br /> padding: 1rem
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#dbeafe',
            borderRadius: '8px',
          }}
        >
          <strong>Tablet</strong> (≥768px) <br /> padding: 3rem
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#bfdbfe',
            borderRadius: '8px',
          }}
        >
          <strong>Desktop</strong> (≥1024px) <br /> padding: 5rem
        </div>
      </div>
    </div>
  );
};

// --- 3. Container Query Demo ---
export const ContainerQueryDemo = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <style>
        {`
          .demo-container {
            container-type: inline-size;
            container-name: card;
            resize: horizontal;
            overflow: auto;
            border: 4px solid #10b981;
            padding: 1rem;
            border-radius: 12px;
            background-color: #ecfdf5;
            min-width: 300px;
            max-width: 100%;
          }
          
          .cq-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr; /* 기본 1열 */
            transition: all 0.3s ease;
          }

          .cq-item {
            padding: 2rem;
            background-color: white;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            font-size: 1.25rem;
          }

          /* 컨테이너 쿼리 */
          @container card (min-width: 600px) {
            .cq-grid {
              grid-template-columns: repeat(2, 1fr); /* 600px 이상에서 2열 */
              gap: 2rem;
            }
            .cq-item {
              background-color: #d1fae5;
              color: #065f46;
              font-size: 1.5rem;
            }
          }

          @container card (min-width: 900px) {
            .cq-grid {
              grid-template-columns: repeat(3, 1fr); /* 900px 이상에서 3열 */
            }
            .cq-item {
              background-color: #10b981;
              color: white;
            }
          }
        `}
      </style>

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Container Query 🎯
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        👇 초록색 박스의 <strong>오른쪽 아래 모서리를 잡고 드래그</strong>
        해보세요!
      </p>

      <div className='demo-container'>
        <div
          style={{
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#059669',
          }}
        >
          컨테이너 영역 (Drag Handle ↘️)
        </div>
        <div className='cq-grid'>
          <div className='cq-item'>I am Flexible 1</div>
          <div className='cq-item'>I am Flexible 2</div>
          <div className='cq-item'>I am Flexible 3</div>
        </div>
      </div>
    </div>
  );
};

// --- 4. Clamp Spacing Demo ---
export const ClampSpacingDemo = () => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
      }}
    >
      <ViewportIndicator />
      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        Clamp Spacing 📏
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 'clamp(1rem, 5vw, 4rem)', // Gap도 반응형!
          backgroundColor: '#fff7ed',
          border: '3px dashed #f97316',
          borderRadius: '16px',
          padding: 'clamp(1.5rem, 4vw, 4rem)', // Padding 반응형
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            style={{
              width: '100px',
              height: '100px',
              background: '#fdba74',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            {num}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ fontSize: '1.25rem' }}>
          <strong>Gap: </strong> <code>clamp(1rem, 5vw, 4rem)</code> <br />
          (16px ~ 64px)
        </p>
        <p style={{ fontSize: '1.25rem', marginTop: '1rem' }}>
          <strong>Padding: </strong> <code>clamp(1.5rem, 4vw, 4rem)</code>{' '}
          <br />
          (24px ~ 64px)
        </p>
      </div>
    </div>
  );
};
