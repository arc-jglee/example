'use client';

import { useEffect, useState } from 'react';

import { SHELL_BREAKPOINTS } from './shared';

const DESKTOP_QUERY = `(min-width: ${SHELL_BREAKPOINTS.desktop}px)`;

/**
 * 지금 데스크탑 폭인지. Tailwind `lg:`와 같은 기준점(`SHELL_BREAKPOINTS`)을 쓴다.
 *
 * 셸의 반응형은 되도록 CSS만으로 처리한다 — SSR에서 깜빡임이 없기 때문이다.
 * 모바일 드로어는 그 원칙의 **예외**다. Radix Dialog는 열려 있는 동안 body
 * 스크롤을 잠그고 포커스를 가두므로, `lg:hidden`으로 "보이지만 않게" 하면
 * 태블릿에서 드로어를 열어둔 채 데스크탑으로 리사이즈했을 때 보이지 않는
 * 모달이 화면을 붙잡는다. 감추는 것으로는 안 되고 언마운트해야 한다.
 *
 * 첫 렌더는 항상 `false`(데스크탑 아님)다. 닫힌 드로어는 DOM에 아무것도 남기지
 * 않으므로 hydration 시점에 값이 뒤집혀도 눈에 보이는 변화가 없다 — 이 훅을
 * 레이아웃 자체에 쓰면 안 되는 이유이기도 하다.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(query.matches);

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return isDesktop;
}
