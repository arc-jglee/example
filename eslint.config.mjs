import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const tsconfigRootDir = process.cwd();

export default defineConfig([
  // Next 기본 규칙들
  ...nextVitals,
  ...nextTs,

  // Prettier를 ESLint 안에서 돌리기
  eslintPluginPrettierRecommended,

  // 공통 ignore
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'public/**',
    'next-env.d.ts',
  ]),

  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir,
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  // ui/는 arc-frontend-platform의 libs/ui를 그대로 옮겨온 디자인 시스템으로,
  // 원본 저장소는 eslint-config-next를 쓰지 않아 React Compiler 기반
  // react-hooks/refs, react-hooks/set-state-in-effect 규칙의 적용을 받지 않았다.
  // 동작은 원본과 동일하므로 이 두 규칙만 낮춘다.
  {
    files: ['ui/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      // TanStack Table의 useReactTable()이 메모이즈 불가능한 함수를 반환하는
      // 것은 라이브러리 특성이라 코드로 고칠 수 없는 정보성 경고다.
      'react-hooks/incompatible-library': 'off',
    },
  },

  // Storybook 스토리의 데모용 <img>는 실제 페이지가 아니라 next/image 최적화
  // 대상이 아니다.
  {
    files: ['ui/**/*.stories.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]);
