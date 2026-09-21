'use client';

import { User } from 'lucide-react';
import { type ReactNode, useRef, useState } from 'react';

import { cn } from '../../utils/cn';

export type NotFoundShellProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  /** 사원증 상단에 표시하는 회사명 — 기본값 "arcsquare" */
  companyLabel?: string;
};

const DEFAULT_COMPANY_LABEL = 'arcsquare';

const MAX_TILT_DEG = 10;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * 사원증이 카드 리더기에서 인식되지 않는 모습을 형상화한 404 전용 Shell.
 * 목줄에 매달린 사원증이 커서를 따라 살짝 기울어지고(perspective tilt),
 * 커서가 떠나면 스프링처럼 되돌아온다 — 인터랙션은 이 한 곳에만 둔다.
 *
 * `FullPageEmptyState`보다 표현이 강한 버전이다. 일반적인 빈 상태(목록 없음
 * 등)에는 여전히 `EmptyState`/`FullPageEmptyState`를 쓰고, 이 Shell은 404처럼
 * 화면 전체가 하나의 특별한 순간인 경우에만 쓴다.
 */
export function NotFoundShell({
  title,
  description,
  action,
  className,
  companyLabel = DEFAULT_COMPANY_LABEL,
}: NotFoundShellProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion() || !cardRef.current) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * MAX_TILT_DEG * 2, y: px * MAX_TILT_DEG * 2 });
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  }

  return (
    <div
      className={cn(
        'flex min-h-full flex-1 flex-col items-center justify-center gap-8 px-6 py-10 text-center',
        className,
      )}
    >
      <div
        className="flex flex-col items-center"
        style={{ perspective: '800px' }}
      >
        {/* 목줄 — 장식용 */}
        <div
          aria-hidden
          className="h-14 w-1.5 rounded-full bg-[var(--color-border-strong)]"
        />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isHovering
              ? 'transform 60ms linear'
              : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="flex w-48 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-lg)] motion-reduce:transform-none"
        >
          <div aria-hidden className="h-3 w-full bg-[var(--color-bg-accent)]" />

          <div className="flex flex-col items-center gap-2 px-4 py-5">
            <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-bg-muted)] text-[var(--color-text-disabled)]">
              <User className="size-8" aria-hidden />
            </div>
            <div>
              <p className="text-md font-semibold text-[var(--color-text-tertiary)]">
                {companyLabel}
              </p>
              <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                404 NotFound
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 border-t border-[var(--color-border-default)] bg-[var(--color-bg-muted)] py-1.5">
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-[var(--color-bg-error)]"
            />
            <span className="text-[10px] text-[var(--color-text-tertiary)]">
              인식 실패
            </span>
          </div>
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
