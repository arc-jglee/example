import { ServerCrash } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../../utils/cn';

export type ErrorShellProps = {
  title: ReactNode;
  description?: ReactNode;
  /** 보통 "다시 시도" 버튼 */
  action?: ReactNode;
  className?: string;
};

/**
 * 예기치 않은 오류(500 등) 전용 Shell — Next.js `error.tsx`/`global-error.tsx`
 * 자리에 그대로 렌더한다. `NotFoundShell`과 같은 자리(라우트 레벨 완제품)지만
 * 톤은 다르게 잡았다: 404는 "사용자가 잘못된 주소로 왔다"는 명확한 상황이라
 * 인터랙티브한 사원증 일러스트로 기억에 남는 순간을 만들지만, 예기치 않은
 * 오류는 시스템이 실패했다는 신호라 인터랙션 없이 차분한 정적 카드로 표현한다.
 *
 * 단순히 "화면 전체가 하나의 상태"인 403·점검 안내 등은 `FullPageEmptyState`로
 * 충분하다 — `ErrorShell`은 `NotFoundShell`처럼 그 상태 자체가 앱 진입점일
 * 때만 쓴다.
 */
export function ErrorShell({
  title,
  description,
  action,
  className,
}: ErrorShellProps) {
  return (
    <div
      className={cn(
        'flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2.5">
        <div className="animate-in fade-in-0 zoom-in-90 flex size-30 items-center justify-center rounded-full border-[3px] border-[var(--color-border-error)] bg-[var(--color-bg-surface)] text-[var(--color-text-error)] duration-500 ease-out motion-reduce:animate-none">
          <ServerCrash className="size-12" aria-hidden />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[length:var(--text-heading-sm)] font-medium text-[var(--color-text-primary)]">
          {title}
        </p>
        {description && (
          <p className="text-[length:var(--text-body-md)] whitespace-pre-line text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
