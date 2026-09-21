'use client';

import {
  Children,
  cloneElement,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
} from 'react';

import { cn } from '../../utils/cn';
import { Avatar, AvatarFallback, type AvatarProps } from './Avatar';

const OVERLAP_CLASSNAMES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: '-space-x-2',
  md: '-space-x-3',
  lg: '-space-x-3',
  xl: '-space-x-4',
};

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  max?: number;
  size?: AvatarProps['size'];
};

export function AvatarGroup({
  children,
  max,
  size = 'md',
  className,
  ...props
}: AvatarGroupProps) {
  const items = Children.toArray(children) as ReactElement<AvatarProps>[];
  const visible = max ? items.slice(0, max) : items;
  const hiddenCount = max ? Math.max(items.length - max, 0) : 0;

  return (
    <div
      className={cn(
        'flex items-center',
        OVERLAP_CLASSNAMES[size ?? 'md'],
        className,
      )}
      {...props}
    >
      {visible.map((child, index) =>
        isValidElement(child)
          ? cloneElement(child, {
              key: child.key ?? index,
              className: cn('ring-2 ring-white', child.props.className),
            })
          : child,
      )}
      {hiddenCount > 0 && (
        <Avatar size={size} className="ring-2 ring-white">
          <AvatarFallback size={size}>+{hiddenCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
