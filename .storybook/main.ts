import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../ui/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    'storybook/viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // 기본값 'react-docgen'(babel 기반)은 로컬 `type X = {...}` 별칭을 이름이
    // 아니라 정의 전체(주석 포함)를 인라인으로 풀어서 보여준다 — TS 체커를
    // 쓰는 'react-docgen-typescript'로 바꿔야 Type 컬럼에 별칭 이름이 그대로 나온다.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
