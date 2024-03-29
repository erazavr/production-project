import path from 'path';
import webpack, { DefinePlugin } from 'webpack';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { BuildPaths } from '../build/types/config';

export default {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock/register',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config: webpack.Configuration) => {
    const paths: BuildPaths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      locales: '',
      buildLocales: '',
    };

    const rules = config.module!.rules as webpack.RuleSetRule[];

    config.resolve!.modules!.push(paths.src);
    config.resolve!.extensions?.push('.ts', '.tsx ');
    config.module!.rules?.push(buildCssLoaders(true));
    config.module!.rules = rules.map((rule: webpack.RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });
    config.module!.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.resolve!.alias = {
      ...config.resolve!.alias,
      '@': paths.src,
    };

    config.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('https://testapi.kg'),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );

    return config;
  },
};
