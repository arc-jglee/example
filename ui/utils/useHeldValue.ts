'use client';

/**
 * `Dialog`/`Sheet`의 종료 애니메이션을 살리려면 `open` prop만 토글해야
 * 한다 — `{value && <Dialog open ...>}`처럼 컴포넌트 자체를 조건부로
 * 렌더하면, `value`가 `undefined`가 되는 순간 React가 Dialog/Sheet를
 * 통째로 언마운트해버려 Radix가 `data-state="closed"` 애니메이션을 재생할
 * 틈이 없다(항상 "닫혀서 사라지는" 게 아니라 "뚝 끊겨 사라지는" 것처럼
 * 보이는 이유). 이 훅은 `value`가 `undefined`가 된 뒤에도 마지막 값을
 * 계속 들고 있어서, 컴포넌트를 조건부로 언마운트하지 않고 `open` prop만
 * 토글하는 패턴으로 바꿀 수 있게 해준다.
 *
 * 사용법:
 * ```tsx
 * const heldMember = useHeldValue(removingMember);
 * // ...
 * {heldMember && (
 *   <RemoveOrgMemberDialog
 *     member={heldMember}
 *     open={removingMember !== undefined}
 *     onOpenChange={(open) => !open && setRemovingMember(undefined)}
 *   />
 * )}
 * ```
 * `heldMember &&`는 처음 한 번도 열린 적이 없을 때만 걸러내는 가드다 —
 * 한 번 열리고 나면 `heldMember`는 다시 `undefined`가 되지 않으므로
 * 컴포넌트는 계속 마운트된 채 남고, 실제 표시 여부는 Radix가 `open` 값을
 * 보고 애니메이션과 함께 알아서 처리한다.
 */
import { useRef } from 'react';

export function useHeldValue<T>(value: T | undefined): T | undefined {
  const heldRef = useRef<T | undefined>(value);
  if (value !== undefined) {
    heldRef.current = value;
  }
  return heldRef.current;
}
