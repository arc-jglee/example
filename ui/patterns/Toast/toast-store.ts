import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export type ToastOptions = {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  action?: ReactNode;
  duration?: number;
};

export type ToastEntry = ToastOptions & { id: string };

type Listener = () => void;

let toasts: ToastEntry[] = [];
const listeners = new Set<Listener>();
let idCounter = 0;

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeToasts(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getToasts() {
  return toasts;
}

export function dismissToast(id: string) {
  toasts = toasts.filter((entry) => entry.id !== id);
  emit();
}

export function toast(options: ToastOptions) {
  const id = `toast-${++idCounter}`;
  toasts = [...toasts, { id, ...options }];
  emit();
  return id;
}
