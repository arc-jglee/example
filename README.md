## Next 프로젝트 템플릿

- `main`: 기본적인 Next.js 프로젝트를 위한 템플릿
- `dev`: 별도의 새로운 툴을 다루기 위한 연습공간

### 구성

- Next.js(App Router) + Tailwind CSS v4
- `ui/`: Radix 기반 컴포넌트·패턴·레이아웃·앱 셸(`AppShell`/`AppHeader`/`AppSidebar`)로 구성된 자체 UI 라이브러리. `app/layout.tsx`에 `AppShell`이 기본으로 연결되어 있다.
- 기술 스택: `react-hook-form` + `zod`(폼/검증), `zustand`(상태관리), `@tanstack/react-table` + `@dnd-kit`(테이블/드래그앤드롭)
- `.storybook/`: `ui/` 컴포넌트를 확인하기 위한 Storybook 설정

### 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build` / `pnpm start`: 프로덕션 빌드/실행
- `pnpm lint`: eslint + prettier 검사
- `pnpm storybook`: Storybook 개발 서버
- `pnpm build-storybook`: Storybook 정적 빌드
