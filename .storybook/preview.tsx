import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';
import '../src/styles/fonts.css'; // Pretendard 폰트 (선택적)
import './storybook.css'; // Storybook 전용 스타일 및 GMarketSans 폰트

import { ThemeProvider } from '../src/theme';
import { defaultTheme } from '../src/theme';
import { brandATheme } from '../src/theme/brands/brandA';
import { brandBTheme } from '../src/theme/brands/brandB';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Foundation',
          ['Colors', 'Spacing', 'Rounded', 'Icon', 'Typo', 'Zindex'],
          'Components',
          [
            'Button',
            'Label',
            'Input',
            'Textarea',
            'Select',
            'Input-Checkbox',
            'Input-Radio',
            'Tabs',
          ],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // HTML DOM 기본 속성들을 Controls에서 제외
      // 다형성(as prop) 컴포넌트의 수백 개 HTML 속성으로 인한 UI 복잡도 감소
      exclude: [
        // 이벤트 핸들러 (on으로 시작)
        /^on[A-Z].*/,
        // ARIA 속성 (일부 중요한 것들은 각 Story에서 명시적으로 포함)
        /^aria[A-Z].*/,
        // data 속성
        /^data[A-Z-].*/,
        // 기타 HTML 속성
        'tabIndex',
        'role',
        'id',
        'name',
        // CSS 관련 (각 컴포넌트에서 명시적으로 포함된 것만 표시)
        // 'className', 'style'은 각 Story에서 선택적으로 포함
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  globalTypes: {
    theme: {
      description: 'Project Theme',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default', icon: 'circle' },
          {
            value: 'brandA',
            title: 'Brand A',
            icon: 'circlehollow',
          },
          { value: 'brandB', title: 'Brand B', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme;

      let theme;
      switch (selectedTheme) {
        case 'brandA':
          theme = brandATheme;
          break;
        case 'brandB':
          theme = brandBTheme;
          break;
        default:
          theme = defaultTheme;
      }

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
