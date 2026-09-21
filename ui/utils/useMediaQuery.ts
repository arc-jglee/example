'use client';

import { useEffect, useState } from 'react';

/**
 * 주어진 미디어 쿼리가 지금 매치하는지. 예: `useMediaQuery('(min-width: 768px)')`.
 *
 * 첫 렌더는 항상 `false`다 — 서버에는 뷰포트가 없어 SSR과 클라이언트 첫 렌더를
 * 맞추려면 그렇게 시작해야 하고, 실제 값은 클라이언트에서 effect로 동기화된다.
 * hydration 직후 값이 뒤집힐 수 있으니, 뒤집혔을 때 눈에 띄는 레이아웃 시프트가
 * 생기는 곳(페이지 최상단 레이아웃 등)에는 쓰지 않는다.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const sync = () => setMatches(mediaQueryList.matches);

    sync();
    mediaQueryList.addEventListener('change', sync);
    return () => mediaQueryList.removeEventListener('change', sync);
  }, [query]);

  return matches;
}
