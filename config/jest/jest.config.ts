import path from 'path'

export default {
  globals: {
    __IS_DEV__: true,
    __API__: '',
    __PROJECT__: 'jest'
  },
  clearMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '\\.(s?css)$': 'identity-obj-proxy',
    '\\.svg': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
    '^@/(.*)$': '<rootDir>src/$1'
  },
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node'
  ],
  rootDir: '../../',
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  modulePaths: [
    '<rootDir>src'
  ],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: '<rootDir>/reports/unit',
      filename: 'report.html',
      openReport: true,
      inlineSource: true
    }]
  ]

}
