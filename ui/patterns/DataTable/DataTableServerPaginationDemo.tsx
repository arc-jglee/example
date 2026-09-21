'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { DataTable } from './DataTable';
import { EMPLOYEES } from './DataTableDemo';

type Employee = (typeof EMPLOYEES)[number];

const COLUMNS: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'department', header: '부서' },
  { accessorKey: 'role', header: '역할' },
];

const PAGE_SIZE = 5;

/**
 * 서버가 한 번에 `PAGE_SIZE`개씩만 내려주는 상황을 흉내낸다.
 * `data`에는 현재 페이지 청크만 담기지만, `total`(전체 개수)을 함께 주면
 * 아직 로드하지 않은 페이지까지 포함해 페이지 번호가 미리 구성된다.
 */
export function DataTableServerPaginationDemo() {
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const start = pageIndex * PAGE_SIZE;
  const chunk = EMPLOYEES.slice(start, start + PAGE_SIZE);

  const handlePageChange = (nextPageIndex: number) => {
    setIsLoading(true);
    setPageIndex(nextPageIndex);
    window.setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <DataTable
      columns={COLUMNS}
      data={chunk}
      total={EMPLOYEES.length}
      pageIndex={pageIndex}
      onPageChange={handlePageChange}
      isLoading={isLoading}
      pageSize={PAGE_SIZE}
      className="w-[640px]"
    />
  );
}
