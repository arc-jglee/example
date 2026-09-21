'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, createContext, useContext } from 'react';

import { cn } from '../../utils/cn';

export const Tabs = TabsPrimitive.Root;

type TabsVariant = 'underline' | 'pill';

/**
 * Radix Tabs는 List→Trigger로 내려주는 공유 컨텍스트가 없어, variant를
 * List에만 지정해도 Trigger에 전파되도록 이 라이브러리에서 얇은 컨텍스트를
 * 추가한다. Trigger에 variant를 개별 지정하면 그 값이 우선한다.
 */
const TabsVariantContext = createContext<TabsVariant>('underline');

export const tabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      underline: 'gap-4 border-b border-[var(--color-border-default)]',
      pill: 'gap-1 rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)] p-1',
    },
  },
  defaultVariants: {
    variant: 'underline',
  },
});

export type TabsListProps = ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>;

export function TabsList({ className, variant, ...props }: TabsListProps) {
  const resolvedVariant: TabsVariant = variant ?? 'underline';

  return (
    <TabsVariantContext.Provider value={resolvedVariant}>
      <TabsPrimitive.List
        className={cn(
          tabsListVariants({ variant: resolvedVariant }),
          className,
        )}
        {...props}
      />
    </TabsVariantContext.Provider>
  );
}

export const tabsTriggerVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:outline-none',
  ].join(' '),
  {
    variants: {
      variant: {
        underline: [
          'border-b-2 border-transparent px-1 py-2 text-[var(--color-text-tertiary)]',
          'hover:text-[var(--color-text-secondary)]',
          'data-[state=active]:border-[var(--color-border-accent)] data-[state=active]:text-[var(--color-text-primary)]',
        ].join(' '),
        pill: [
          'rounded-[var(--radius-md)] px-3 py-1.5 text-[var(--color-text-tertiary)]',
          'hover:text-[var(--color-text-secondary)]',
          'data-[state=active]:bg-[var(--color-bg-surface)] data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:shadow-xs',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'underline',
    },
  },
);

export type TabsTriggerProps = ComponentProps<typeof TabsPrimitive.Trigger> &
  VariantProps<typeof tabsTriggerVariants>;

export function TabsTrigger({
  className,
  variant,
  ...props
}: TabsTriggerProps) {
  const inheritedVariant = useContext(TabsVariantContext);
  const resolvedVariant = variant ?? inheritedVariant;

  return (
    <TabsPrimitive.Trigger
      className={cn(
        tabsTriggerVariants({ variant: resolvedVariant }),
        className,
      )}
      {...props}
    />
  );
}

export type TabsContentProps = ComponentProps<typeof TabsPrimitive.Content>;

export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)]',
        className,
      )}
      {...props}
    />
  );
}
