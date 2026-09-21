import './preview.css';

import {
  DocsContainer,
  type DocsContainerProps,
} from '@storybook/addon-docs/blocks';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react-vite';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { create } from 'storybook/theming';

/**
 * Docs 페이지 컨테이너(`.sbdocs-wrapper`) 자체는 Storybook이 그리는 별도
 * 크롬이라 `data-theme`과 무관하게 항상 라이트로 고정되어 있었다.
 * `create()`는 넘긴 값을 실제 색상으로 파싱해서 파생값을 계산하므로
 * `var(--color-*)` 같은 CSS 변수 문자열은 못 쓰고, `semantic.css`의
 * 라이트/다크 블록에 있는 값을 리터럴 hex로 그대로 옮겨왔다 — 그 파일의
 * 값이 바뀌면 여기도 같이 맞춰야 한다 (manager.ts의 정적 테마와 같은 트레이드오프).
 */
const DOCS_THEME_SHARED = {
  appBorderRadius: 8,
  inputBorderRadius: 6,
  fontBase:
    '"Pretendard", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
} as const;

const docsLightTheme = create({
  base: 'light',
  ...DOCS_THEME_SHARED,
  colorPrimary: '#172a88', // --color-bg-accent (--color-brand-600)
  colorSecondary: '#1e37b3', // --color-accent-muted (--color-brand-500)
  appBg: '#fafafa', // --color-bg-subtle (--color-gray-50)
  appContentBg: '#ffffff', // --color-bg-surface
  appBorderColor: '#e8e8e8', // --color-border-default (--color-gray-200)
  textColor: '#1f1f1f', // --color-text-primary (--color-gray-900)
  textInverseColor: '#fafafa', // --color-text-inverse (--color-gray-50)
  barTextColor: '#4d4d4d', // --color-text-secondary (--color-gray-700)
  barSelectedColor: '#111f64', // --color-text-accent (--color-brand-700)
  barBg: '#ffffff', // --color-bg-surface
  inputBg: '#ffffff', // --color-bg-surface
  inputBorder: '#d4d4d4', // --color-border-strong (--color-gray-300)
  inputTextColor: '#1f1f1f', // --color-text-primary
});

const docsDarkTheme = create({
  base: 'dark',
  ...DOCS_THEME_SHARED,
  colorPrimary: '#2543da', // --color-bg-accent (--color-brand-400)
  colorSecondary: '#1e37b3', // --color-accent-muted (--color-brand-500)
  appBg: '#121212', // --color-bg-base (--color-gray-950)
  appContentBg: '#121212', // --color-bg-surface (--color-gray-800)
  appBorderColor: '#4d4d4d', // --color-border-default (--color-gray-700)
  textColor: '#fafafa', // --color-text-primary (--color-gray-50)
  textInverseColor: '#1f1f1f', // --color-text-inverse (--color-gray-900)
  barTextColor: '#d4d4d4', // --color-text-secondary (--color-gray-300)
  barSelectedColor: '#96a5ed', // --color-text-accent (--color-brand-200)
  barBg: '#333333', // --color-bg-surface
  inputBg: '#333333', // --color-bg-surface
  inputBorder: '#636363', // --color-border-strong (--color-gray-600)
  inputTextColor: '#fafafa', // --color-text-primary
});

/**
 * `docs.container`로 지정된 컴포넌트는 Storybook의 hooks 컨텍스트
 * (데코레이터/스토리 렌더 함수) 밖에서 렌더되어 `useGlobals()` 같은
 * preview-api 훅을 쓸 수 없다 ("hooks can only be called inside decorators
 * and story functions" 에러). 그래서 `withThemeByDataAttribute`가 실제로
 * 세팅하는 DOM 속성(`data-theme`)을 TokenSwatch.tsx의 `useResolvedHex`와
 * 같은 방식(MutationObserver)으로 직접 관찰한다 — 순수 React 훅만 쓰므로
 * 어디서든 안전하다.
 */
function useCurrentDataTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () =>
      (document.documentElement.getAttribute('data-theme') as
        | 'light'
        | 'dark'
        | null) ?? 'light',
  );

  useEffect(() => {
    const resolve = () =>
      setTheme(
        (document.documentElement.getAttribute('data-theme') as
          | 'light'
          | 'dark'
          | null) ?? 'light',
      );

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

function ThemedDocsContainer({
  children,
  context,
}: PropsWithChildren<DocsContainerProps>) {
  const dataTheme = useCurrentDataTheme();
  const theme = dataTheme === 'dark' ? docsDarkTheme : docsLightTheme;

  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
}

/**
 * addon-docs의 Docs 페이지 래퍼(.sbdocs-wrapper)는 자체 흰 배경을 깔기 때문에,
 * body에 건 --color-bg-base만으로는 Docs 뷰에서 다크테마가 반영되지 않음.
 * 스토리 렌더 결과 자체를 우리 semantic 배경/텍스트 색으로 감싸서
 * Docs/Canvas 어느 쪽에서 봐도 다크테마가 보이도록 함.
 */
const withThemedBackground: Decorator = (Story, context) => (
  <div
    style={{
      background: 'var(--color-bg-base)',
      color: 'var(--color-text-primary)',
      minHeight: '100%',
      padding: context.parameters.layout === 'fullscreen' ? 0 : 16,
    }}
  >
    <Story />
  </div>
);

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      container: ThemedDocsContainer,
    },
    layout: 'padded',
    options: {
      storySort: {
        order: ['Tokens', ['Semantic', '*'], '*'],
      },
    },
  },
  decorators: [
    withThemedBackground,
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
