'use client';

import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandList as CommandListPrimitive,
  CommandLoading as CommandLoadingPrimitive,
} from 'cmdk';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/Popover/Popover';
import { Spinner } from '../../components/Spinner/Spinner';
import { cn } from '../../utils/cn';

export type ComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ComboboxRootProps = ComponentProps<typeof CommandPrimitive>;

/**
 * Radix에 대응 프리미티브가 없어 커맨드 팔레트 계열의 사실상 표준 엔진인
 * `cmdk`(Command)를 감쌌다. `shouldFilter={false}`로 두면(비동기 검색 모드)
 * 자동 필터링/정렬을 끄고, 소비자가 넘겨준 옵션을 그대로 렌더링한다.
 */
export function ComboboxRoot({ className, ...props }: ComboboxRootProps) {
  return (
    <CommandPrimitive
      className={cn('flex w-full flex-col overflow-hidden', className)}
      {...props}
    />
  );
}

export type ComboboxInputProps = ComponentProps<typeof CommandInputPrimitive>;

export function ComboboxInput({ className, ...props }: ComboboxInputProps) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-border-default)] px-3">
      <Search className="size-4 shrink-0 text-[var(--color-text-tertiary)]" />
      <CommandInputPrimitive
        className={cn(
          'h-11 w-full bg-transparent text-sm outline-none',
          'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)]',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export type ComboboxListProps = ComponentProps<typeof CommandListPrimitive>;

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <CommandListPrimitive
      className={cn('max-h-64 overflow-y-auto p-1', className)}
      {...props}
    />
  );
}

export type ComboboxEmptyProps = ComponentProps<typeof CommandEmptyPrimitive>;

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <CommandEmptyPrimitive
      className={cn(
        'py-6 text-center text-sm text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type ComboboxLoadingProps = ComponentProps<
  typeof CommandLoadingPrimitive
>;

export function ComboboxLoading({
  className,
  children,
  ...props
}: ComboboxLoadingProps) {
  return (
    <CommandLoadingPrimitive
      className={cn('flex justify-center py-6', className)}
      {...props}
    >
      {children ?? <Spinner size="sm" />}
    </CommandLoadingPrimitive>
  );
}

export type ComboboxGroupProps = ComponentProps<typeof CommandGroupPrimitive>;

export function ComboboxGroup({ className, ...props }: ComboboxGroupProps) {
  return (
    <CommandGroupPrimitive
      className={cn(
        '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
        '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-[var(--color-text-tertiary)]',
        className,
      )}
      {...props}
    />
  );
}

export type ComboboxItemProps = ComponentProps<typeof CommandItemPrimitive> & {
  selected?: boolean;
};

export function ComboboxItem({
  className,
  selected,
  children,
  ...props
}: ComboboxItemProps) {
  return (
    <CommandItemPrimitive
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-[var(--radius-md)] py-2.5 pr-8 pl-3 text-sm outline-none select-none',
        'data-[selected=true]:bg-[var(--color-bg-subtle)]',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      {selected && (
        <span className="absolute right-3 flex size-4 items-center justify-center">
          <Check
            className="size-4 text-[var(--color-text-success)]"
            strokeWidth={2.5}
          />
        </span>
      )}
    </CommandItemPrimitive>
  );
}

type ComboboxBaseProps = {
  options: ComboboxOption[];
  /**
   * 검색어가 바뀔 때마다 호출된다. 넘기면 비동기(서버) 검색 모드로 동작해서
   * `options`를 그대로 렌더링하고(자체 필터링 끔), 넘기지 않으면 label 기준
   * 클라이언트 사이드 필터링을 자동으로 한다.
   */
  onSearchChange?: (search: string) => void;
  loading?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  renderOption?: (option: ComboboxOption) => ReactNode;
};

export type ComboboxSingleProps = ComboboxBaseProps & {
  multiple?: false;
  /** 제어 모드일 때 선택된 값. `null`은 "선택 없음"을 의미한다. */
  value?: string | null;
  /** 비제어 모드일 때 초기 선택 값. */
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export type ComboboxMultipleProps = ComboboxBaseProps & {
  multiple: true;
  /** 제어 모드일 때 선택된 값 목록. */
  value?: string[];
  /** 비제어 모드일 때 초기 선택 값 목록. */
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

function normalizeToArray(raw: string | string[] | null | undefined): string[] {
  if (!raw) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

/**
 * Popover(트리거) + cmdk(검색/필터링/키보드 탐색)를 조합한 검색형 콤보박스.
 * 사원/부서/공정/품목/설비 같은 큰 목록을 검색해서 고르는 용도.
 * `multiple`이 없거나 `false`면 단일 선택(`value`/`defaultValue`가 `string | null`)이고,
 * 항목을 선택하면 팝오버가 닫힌다. `multiple`이 `true`면 다중 선택
 * (`value`/`defaultValue`가 `string[]`)이고, 항목을 클릭할 때마다 선택/해제만
 * 토글되고 팝오버는 열린 채로 유지된다.
 * value/onChange를 주면 제어 모드, defaultValue만 주면 비제어 모드로 동작한다(두 모드 공통).
 */
export function Combobox(props: ComboboxProps) {
  const {
    options,
    onSearchChange,
    loading = false,
    placeholder = '선택하세요',
    searchPlaceholder = '검색...',
    emptyText = '검색 결과가 없습니다',
    disabled,
    className,
    renderOption,
  } = props;

  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(() =>
    normalizeToArray(props.defaultValue),
  );
  const isControlled = props.value !== undefined;
  const selectedValues = isControlled
    ? normalizeToArray(props.value)
    : internalValues;
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );
  const isAsync = onSearchChange !== undefined;

  /**
   * cmdk의 기본 필터는 CommandItem의 `value`를 검색어와 비교한다. 필터링 대상은
   * 사람이 읽는 label(예: 사원 이름)이어야 하지만, `value`에는 중복될 수 없는
   * option.value(id)를 그대로 써야 cmdk 내부 저장소에서 항목이 충돌하지 않는다
   * (동명이인처럼 label이 겹치는 경우). 그래서 value=id를 유지하고, label로
   * 매칭하는 커스텀 filter를 넘긴다.
   */
  function filterByLabel(itemValue: string, search: string) {
    const label = options.find((option) => option.value === itemValue)?.label;
    return label?.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
  }

  function handleSelect(optionValue: string) {
    if (props.multiple) {
      const next = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];
      if (!isControlled) {
        setInternalValues(next);
      }
      props.onChange?.(next);
      return;
    }

    if (!isControlled) {
      setInternalValues(optionValue ? [optionValue] : []);
    }
    if (optionValue !== selectedValues[0]) {
      props.onChange?.(optionValue);
    }
    setOpen(false);
  }

  const triggerLabel =
    selectedOptions.length === 0
      ? placeholder
      : selectedOptions.length === 1
        ? selectedOptions[0].label
        : `${selectedOptions[0].label} 외 ${selectedOptions.length - 1}건`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex h-12 w-full min-w-[240px] items-center justify-between gap-2 rounded-[var(--radius-lg)] border px-4 py-3 text-sm',
            'border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
            'transition-colors outline-none',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-border-accent)] focus-visible:ring-offset-1',
            'data-[state=open]:border-[var(--color-border-accent)]',
            'disabled:cursor-not-allowed disabled:border-[var(--color-border-default)] disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-disabled)]',
            selectedOptions.length === 0 && 'text-[var(--color-text-disabled)]',
            className,
          )}
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronsUpDown className="size-4 shrink-0 text-[var(--color-text-tertiary)]" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <ComboboxRoot
          shouldFilter={!isAsync}
          filter={isAsync ? undefined : filterByLabel}
        >
          <ComboboxInput
            placeholder={searchPlaceholder}
            onValueChange={onSearchChange}
          />
          <ComboboxList>
            {loading ? (
              <ComboboxLoading />
            ) : (
              <>
                <ComboboxEmpty>{emptyText}</ComboboxEmpty>
                {options.map((option) => (
                  <ComboboxItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    selected={selectedValues.includes(option.value)}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {renderOption ? renderOption(option) : option.label}
                  </ComboboxItem>
                ))}
              </>
            )}
          </ComboboxList>
        </ComboboxRoot>
      </PopoverContent>
    </Popover>
  );
}
