'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SidebarDisclosure = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarDisclosureContext = createContext<SidebarDisclosure | null>(null);

/**
 * 헤더의 햄버거와 사이드바의 드로어가 같은 상태를 보게 묶어준다. `AppShell`이
 * 렌더한다.
 *
 * prop drilling이 아니라 context인 이유: `AppShell`은 헤더·사이드바를 **완성된
 * ReactNode**로 받는다(`header={<AppHeader … />}`). 이미 만들어진 엘리먼트에
 * prop을 끼워 넣으려면 `cloneElement`밖에 없고, 그러면 앱이 헤더를 한 겹만
 * 감싸도(`<div><AppHeader/></div>`) 조용히 깨진다. context는 슬롯 API를
 * 그대로 두면서 두 컴포넌트를 잇는 유일한 방법이다.
 */
export function SidebarDisclosureProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SidebarDisclosureContext.Provider value={value}>
      {children}
    </SidebarDisclosureContext.Provider>
  );
}

/**
 * provider가 없으면 `null`. `AppHeader`가 햄버거를 그릴지 결정하는 데 쓴다 —
 * 열 대상이 없는 버튼은 아예 없는 게 맞다.
 */
export function useOptionalSidebarDisclosure() {
  return useContext(SidebarDisclosureContext);
}

/**
 * provider가 있으면 공유 상태를, 없으면 자기 지역 상태를 쓴다.
 *
 * `AppSidebar`를 `AppShell` 없이 단독으로 써도 태블릿 레일의 펼치기 버튼이
 * 동작해야 하기 때문이다(그 버튼은 사이드바 안에 있어서 지역 상태로 충분하다).
 * 다만 모바일 햄버거는 헤더에 있으므로, **모바일 드로어를 열려면 `AppShell`이
 * 필요하다.**
 */
export function useSidebarDisclosure(): SidebarDisclosure {
  const shared = useContext(SidebarDisclosureContext);
  const [open, setOpen] = useState(false);
  const local = useMemo(() => ({ open, setOpen }), [open]);

  return shared ?? local;
}
