'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, Inbox } from 'lucide-react';
import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { Button } from '../../components/Button/Button';
import {
  Checkbox,
  type CheckboxProps,
} from '../../components/Checkbox/Checkbox';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Input } from '../../components/Input/Input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../../components/Pagination/Pagination';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { cn } from '../../utils/cn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../Table/Table';

/**
 * 행 선택을 켰을 때(`enableRowSelection`) 컬럼 배열 맨 앞에 자동으로
 * 끼워 넣는 체크박스 컬럼. 정렬 대상이 아니므로 `enableSorting: false`.
 */
function createSelectionColumn<TData>(
  checkboxSize: CheckboxProps['size'],
): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        size={checkboxSize}
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(checked === true)
        }
        aria-label="전체 행 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        size={checkboxSize}
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(checked === true)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** 행마다 고유 id를 직접 지정한다. 생략하면 원본 배열의 index를 쓴다. */
  getRowId?: (row: TData, index: number) => string;
  isLoading?: boolean;
  /** 로딩 중 보여줄 스켈레톤 행 개수 (기본 5). */
  skeletonRowCount?: number;
  /** 데이터가 없을 때 표시할 내용. 생략하면 기본 EmptyState가 표시된다. */
  emptyState?: ReactNode;
  enableRowSelection?: boolean;
  /** 선택 체크박스 크기 (기본 md) — `Checkbox`와 같은 `sm`/`md`. */
  checkboxSize?: CheckboxProps['size'];
  /** 선택된 행(원본 데이터)이 바뀔 때마다 호출된다. */
  onSelectionChange?: (rows: TData[]) => void;
  enableGlobalFilter?: boolean;
  searchPlaceholder?: string;
  /** 페이지네이션 자체를 끄고 싶을 때 false로 준다 (기본 true). */
  enablePagination?: boolean;
  pageSize?: number;
  /**
   * 서버가 알고 있는 전체 행 개수. 주어지면 `data`가 아직 일부(청크)만
   * 로드된 상태라도 이 값 기준으로 페이지 수를 계산한다(manual pagination).
   */
  total?: number;
  /** 현재 페이지(0-based)를 controlled로 관리하고 싶을 때 준다. */
  pageIndex?: number;
  /** 페이지가 바뀔 때 호출된다. 다음 청크를 가져오는 데 사용한다. */
  onPageChange?: (pageIndex: number) => void;
  className?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  isLoading = false,
  skeletonRowCount = 5,
  emptyState,
  enableRowSelection = false,
  checkboxSize,
  onSelectionChange,
  enableGlobalFilter = false,
  searchPlaceholder = '검색...',
  enablePagination = true,
  pageSize = 10,
  total,
  pageIndex: pageIndexProp,
  onPageChange,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [internalPageIndex, setInternalPageIndex] = useState(0);

  const isPageIndexControlled = pageIndexProp !== undefined;
  const pageIndex = isPageIndexControlled ? pageIndexProp : internalPageIndex;
  const isManualPagination = total !== undefined;

  const tableColumns = useMemo(
    () =>
      enableRowSelection
        ? [createSelectionColumn<TData>(checkboxSize), ...columns]
        : columns,
    [columns, enableRowSelection, checkboxSize],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getRowId,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;

      if (!isPageIndexControlled) {
        setInternalPageIndex(next.pageIndex);
      }
      onPageChange?.(next.pageIndex);
    },
    enableRowSelection,
    manualPagination: isManualPagination,
    pageCount: isManualPagination ? Math.ceil(total / pageSize) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // `data`가 바뀌어(예: 뮤테이션 후 목록 갱신) 이전에 선택했던 행이 더 이상
  // 없을 수 있다 — `table.getRow(id)`는 없는 id에 그냥 throw하므로, 안전한
  // `rowsById` 조회로 없는 행은 건너뛴다.
  const selectedRows = useMemo(() => {
    const rowsById = table.getRowModel().rowsById;
    return Object.keys(rowSelection)
      .filter((id) => rowSelection[id])
      .map((id) => rowsById[id]?.original)
      .filter((row): row is TData => row !== undefined);
  }, [rowSelection, table]);

  // 선택 상태 자체에도 사라진 행의 id가 남아 있으면 "N개 선택됨" 표시나
  // 다음 선택 계산이 계속 그 유령 id를 끌고 다니게 된다 — data가 바뀔
  // 때마다 더 이상 존재하지 않는 id는 선택에서 지운다.
  useEffect(() => {
    setRowSelection((current) => {
      const rowsById = table.getRowModel().rowsById;
      const next: RowSelectionState = {};
      let changed = false;
      for (const [id, value] of Object.entries(current)) {
        if (rowsById[id]) {
          next[id] = value;
        } else {
          changed = true;
        }
      }
      return changed ? next : current;
    });
  }, [data, table]);

  useEffect(() => {
    onSelectionChange?.(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const rows = table.getRowModel().rows;
  const columnCount = tableColumns.length;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {enableGlobalFilter && (
        <Input
          value={globalFilter}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          placeholder={searchPlaceholder}
          className="max-w-sm"
        />
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    aria-sort={
                      sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                          ? 'descending'
                          : undefined
                    }
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-auto gap-1 px-2 py-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sortDirection === 'asc' ? (
                          <ArrowUp className="size-3.5" />
                        ) : sortDirection === 'desc' ? (
                          <ArrowDown className="size-3.5" />
                        ) : (
                          <ChevronsUpDown className="size-3.5 text-[var(--color-text-tertiary)]" />
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRowCount }, (_, rowIndex) => (
              <TableRow
                key={`skeleton-${rowIndex}`}
                className="hover:bg-transparent"
              >
                {Array.from({ length: columnCount }, (_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columnCount}>
                {emptyState ?? (
                  <EmptyState icon={<Inbox />} title="데이터가 없습니다" />
                )}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? 'selected' : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {enablePagination && !isLoading && rows.length > 0 && (
        <div className="flex flex-col items-start gap-2 px-2 md:flex-row md:items-center md:justify-between">
          <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-tertiary)]">
            {enableRowSelection && `${selectedRows.length}개 선택됨 · `}
            전체 {total ?? table.getFilteredRowModel().rows.length}개
          </p>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={!table.getCanPreviousPage()}
                  className={cn(
                    !table.getCanPreviousPage() &&
                      'pointer-events-none opacity-50',
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    table.previousPage();
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-2 text-sm text-[var(--color-text-secondary)]">
                  {table.getState().pagination.pageIndex + 1} /{' '}
                  {table.getPageCount() || 1}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={!table.getCanNextPage()}
                  className={cn(
                    !table.getCanNextPage() && 'pointer-events-none opacity-50',
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    table.nextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
