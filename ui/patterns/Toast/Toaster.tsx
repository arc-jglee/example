'use client';

import { useSyncExternalStore } from 'react';

import { Toast, ToastProvider, ToastViewport } from './Toast';
import { dismissToast, getToasts, subscribeToasts } from './toast-store';

/** `toast()`로 쌓인 항목을 실제로 그리는 컨테이너. 앱 루트에 한 번만 둔다. */
export function Toaster() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getToasts);

  return (
    <ToastProvider>
      {toasts.map(({ id, ...toastProps }) => (
        <Toast key={id} onClose={() => dismissToast(id)} {...toastProps} />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
