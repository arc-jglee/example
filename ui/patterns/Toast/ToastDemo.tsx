'use client';

import type { ReactNode } from 'react';

import { Button } from '../../components/Button/Button';
import { toast, type ToastVariant } from './toast-store';
import { Toaster } from './Toaster';

export type ToastDemoProps = {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function ToastDemo({
  variant = 'default',
  title = '저장되었습니다',
  description,
  action,
}: ToastDemoProps) {
  return (
    <>
      <Button
        onClick={() =>
          toast({
            variant,
            title,
            description: description || undefined,
            action,
          })
        }
      >
        토스트 띄우기
      </Button>
      <Toaster />
    </>
  );
}
