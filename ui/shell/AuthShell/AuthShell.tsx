import type { ReactNode } from 'react';

import { Stack } from '../../layouts/Stack/Stack';
import { cn } from '../../utils/cn';

export type AuthShellProps = {
  /** 좌측 컬럼 좌상단에 고정될 로고.*/
  logo?: ReactNode;
  /** 로고 옆에 나란히 놓일 서비스명.<br/>`logo`와 함께 좌측 상단에 고정된다. */
  logoTitle?: string;
  /** 폼 위 제목. 짧은 문구를 헤딩 크기로 그린다. */
  title?: ReactNode;
  /** 제목 아래 한 줄 설명. */
  description?: ReactNode;
  /**
   * 로그아웃/세션 만료 안내처럼 폼 위에 뜨는 공지.<br/>
   * `Alert` 등을 그대로 전달한다.
   */
  notice?: ReactNode;
  /** SSO 리다이렉트 버튼이든 이메일/비밀번호 폼이든,<br/>실제 로그인 액션 영역. */
  children: ReactNode;
  className?: string;
  /**
   * 태블릿 이상에서 셸 전체 폭을 채우는 장식 배경.<br/>
   * 생략하면 배경 자체를 그리지 않는다.
   */
  aside?: ReactNode;
  asideClassName?: string;
};

/**
 * 로그인 화면 전용 Shell. 태블릿 이상(`md:`)에서는 `aside` 장식 배경이
 * 셸 전체 폭에 깔리고, 그 위에 좌측 절반 폭의 로고+폼 컬럼이 카드처럼
 * 겹쳐진다 — 컬럼 오른쪽의 둥근 모서리 너머로 `aside`가 드러나 보인다.
 * 모바일에서는 `aside`를 감추고 좌측 컬럼만 전체 폭으로 채운다. `logo`
 * (+ `logoTitle`)는 좌측 컬럼 좌상단에 고정되고, 그 아래 제목/폼은
 * 좌측 컬럼 안에서 항상 가로·세로 중앙에 온다.
 *
 * 초광폭 화면(`xl:` 이상)에서는 폼 컬럼 폭을 `2/5`로 줄여 `aside`가 더 넓은
 * 비중을 차지한다 — 컬럼을 억지로 넓히는 대신 장식 영역 쪽으로 여백을 흡수시켜
 * 폼이 텅 비어 보이지 않게 한다. `2xl:` 이상에서는 대신 폼 내용물(`max-w-sm` →
 * `max-w-md`)과 `title`/`description` 글자 크기를 한 단계씩 키운다.
 *
 * `aside`는 브랜드마다 다른 그림이라 셸이 기본값을 갖지 않는다 — 앱이 직접
 * 채우거나, 생략해서 단순한 단일 컬럼 로그인 화면으로 쓴다.
 *
 * `logo`/`title`/`description`은 있는 것만 그린다 — 이메일/비밀번호 폼처럼
 * 자체 헤딩이 있는 화면은 셋 다 생략하고 `children`에 폼 전체를 넣는다.
 */
export function AuthShell({
  logo,
  logoTitle,
  title,
  description,
  notice,
  children,
  className,
  aside,
  asideClassName,
}: AuthShellProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]',
        className,
      )}
    >
      {aside && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 hidden overflow-hidden bg-[var(--color-bg-accent-subtle)] md:block',
            asideClassName,
          )}
        >
          {aside}
        </div>
      )}

      <main
        className={cn(
          'relative z-10 flex w-full flex-col items-center justify-center bg-[var(--color-bg-base)] px-6 py-8 sm:px-8 md:px-10 lg:px-16',
          aside &&
            'md:w-1/2 md:rounded-r-[var(--radius-3xl)] md:shadow-2xl xl:w-2/5',
        )}
      >
        {logo && (
          <div className="absolute top-8 left-6 flex shrink-0 items-center gap-2 sm:left-8 md:left-10 lg:left-16">
            {logo}
            {logoTitle && (
              <span className="text-[length:var(--text-heading-sm)] font-semibold text-[var(--color-text-accent)] md:text-[length:var(--text-heading-md)] 2xl:text-[length:var(--text-heading-lg)]">
                {logoTitle}
              </span>
            )}
          </div>
        )}

        <div id="auth-main" className="w-full max-w-sm 2xl:max-w-md">
          <Stack gap={6}>
            {(title || description) && (
              <Stack gap={2}>
                {title && (
                  <h1 className="text-[length:var(--text-heading-md)] font-semibold text-[var(--color-text-primary)] md:text-[length:var(--text-heading-lg)] 2xl:text-[length:var(--text-heading-xl)]">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-secondary)] md:text-[length:var(--text-body-md)] 2xl:text-[length:var(--text-body-lg)]">
                    {description}
                  </p>
                )}
              </Stack>
            )}

            {notice}

            {children}
          </Stack>
        </div>
      </main>
    </div>
  );
}
