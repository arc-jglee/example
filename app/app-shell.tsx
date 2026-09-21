'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import type { SidebarNavEntry } from '@/ui';
import { AppHeader, AppShell, AppSidebar } from '@/ui';

const NAV_ITEMS: SidebarNavEntry[] = [
  { id: 'home', label: '홈', icon: Home, href: '/' },
];

export function AppShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell
      header={<AppHeader title="Example" />}
      sidebar={
        <AppSidebar
          items={NAV_ITEMS}
          activeItemId={pathname === '/' ? 'home' : undefined}
          linkComponent={Link}
          label="Example"
        />
      }
      variant="separate"
    >
      {children}
    </AppShell>
  );
}
