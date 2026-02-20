import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Props Table에서 표시할 속성만 필터링
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        // node_modules에서 온 props는 제외 (React.HTMLAttributes 등)
        if (prop.parent) {
          // node_modules에서 온 것이면 제외
          if (prop.parent.fileName.includes('node_modules')) {
            return false;
          }
          // HTML 기본 속성들 제외 (ComponentPropsWithoutRef에서 온 것들)
          if (
            prop.parent.fileName.includes('react/index.d.ts') ||
            prop.parent.fileName.includes('@types/react')
          ) {
            return false;
          }
        }
        return true;
      },
    },
  },

  async viteFinal(config) {
    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());
    return config;
  },
};

export default config;