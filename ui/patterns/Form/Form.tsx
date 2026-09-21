'use client';

import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  useContext,
  useId,
} from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';

import { Label } from '../../components/Label/Label';
import { cn } from '../../utils/cn';

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField는 FormField 내부에서만 사용할 수 있습니다.');
  }
  if (!itemContext) {
    throw new Error('useFormField는 FormItem 내부에서만 사용할 수 있습니다.');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

export type FormItemProps = HTMLAttributes<HTMLDivElement>;

export function FormItem({ className, ...props }: FormItemProps) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('flex flex-col gap-2', className)} {...props} />
    </FormItemContext.Provider>
  );
}

export type FormLabelProps = ComponentProps<typeof Label>;

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      htmlFor={formItemId}
      className={cn(error && 'text-[var(--color-text-error)]', className)}
      {...props}
    />
  );
}

export type FormControlProps = ComponentProps<typeof Slot>;

/**
 * children으로 받은 단일 컨트롤(Input/Select/... )에 id/aria-invalid/
 * aria-describedby를 주입한다. 래퍼 엘리먼트 없이 Slot으로 그대로
 * 병합하기 때문에, 컨트롤이 이미 갖고 있던 className/props와 충돌하지 않는다.
 */
export function FormControl({ ...props }: FormControlProps) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn(
        'text-[length:var(--text-body-sm)] text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;

/**
 * 필드 에러가 있으면 에러 메시지를, 없으면 children을 표시한다.
 * 표시할 내용이 둘 다 없으면 아예 렌더링하지 않는다.
 */
export function FormMessage({
  className,
  children,
  ...props
}: FormMessageProps) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? '') : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cn(
        'text-[length:var(--text-body-sm)] font-medium text-[var(--color-text-error)]',
        className,
      )}
      {...props}
    >
      {body}
    </p>
  );
}
