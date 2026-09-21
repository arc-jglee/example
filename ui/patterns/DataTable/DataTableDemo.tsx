'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '../../components/Badge/Badge';
import type { Tone } from '../../components/shared';
import { DataTable } from './DataTable';

type Department =
  | '경영전략실'
  | 'R&D 센터'
  | 'FrontEnd'
  | 'BackEnd'
  | 'Device'
  | '기획/UX';

type Employee = {
  id: string;
  name: string;
  department: Department;
  role: string;
};

export const EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: '김은혜',
    department: 'BackEnd',
    role: 'Backend engineer',
  },
  {
    id: 'EMP002',
    name: '봉제종',
    department: 'BackEnd',
    role: 'Backend engineer lead',
  },
  {
    id: 'EMP003',
    name: '임호진',
    department: 'Device',
    role: 'Device engineer',
  },
  {
    id: 'EMP004',
    name: '김혜민',
    department: 'R&D 센터',
    role: 'Research Engineer',
  },
  {
    id: 'EMP005',
    name: '전재영',
    department: 'FrontEnd',
    role: 'Frontend engineer lead',
  },
  {
    id: 'EMP006',
    name: '이민수',
    department: 'BackEnd',
    role: 'Backend engineer',
  },
  {
    id: 'EMP007',
    name: '최아라',
    department: 'Device',
    role: 'Device engineer',
  },
  {
    id: 'EMP008',
    name: '이재건',
    department: 'FrontEnd',
    role: 'Frontend engineer',
  },
  {
    id: 'EMP009',
    name: '구본혁',
    department: '경영전략실',
    role: '총무/경영지원 과장',
  },
  {
    id: 'EMP010',
    name: '김예지',
    department: '경영전략실',
    role: 'HR/재무 차장',
  },
  {
    id: 'EMP011',
    name: '김인나',
    department: 'FrontEnd',
    role: 'Frontend engineer',
  },
  {
    id: 'EMP012',
    name: '국주옥',
    department: '기획/UX',
    role: 'Product engineer',
  },
  {
    id: 'EMP013',
    name: '이승준',
    department: 'Device',
    role: 'Device engineer lead',
  },
  {
    id: 'EMP014',
    name: '안나영',
    department: 'BackEnd',
    role: 'Backend engineer',
  },
  {
    id: 'EMP015',
    name: '이유빈',
    department: 'R&D 센터',
    role: 'Research Engineer',
  },
  {
    id: 'EMP016',
    name: '김소형',
    department: 'R&D 센터',
    role: 'R&D 센터 lead',
  },
  {
    id: 'EMP017',
    name: '정아라',
    department: '기획/UX',
    role: 'Product lead',
  },
];

/**
 * 부서를 색으로 구분하는 데모. 부서는 "좋다/나쁘다"가 아니라 서로 다른 갈래일
 * 뿐이므로 상태색(success/error)이 아니라 `tone`을 쓴다 — ADS Secondary 16색
 * 중에서 고른다.
 */
const DEPARTMENT_TONE: Record<Department, Tone> = {
  경영전략실: 'indigo',
  'R&D 센터': 'teal',
  FrontEnd: 'sky',
  BackEnd: 'violet',
  Device: 'orange',
  '기획/UX': 'pink',
};

const COLUMNS: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: '이름' },
  {
    accessorKey: 'department',
    header: '부서',
    cell: ({ getValue }) => {
      const department = getValue<Department>();
      return (
        <Badge variant="secondary" tone={DEPARTMENT_TONE[department]}>
          {department}
        </Badge>
      );
    },
  },
  { accessorKey: 'role', header: '역할' },
];

export type DataTableDemoProps = {
  isLoading?: boolean;
  isEmpty?: boolean;
  enableRowSelection?: boolean;
  checkboxSize?: 'sm' | 'md';
  enableGlobalFilter?: boolean;
};

export function DataTableDemo({
  isLoading = false,
  isEmpty = false,
  enableRowSelection = false,
  checkboxSize,
  enableGlobalFilter = false,
}: DataTableDemoProps) {
  return (
    <DataTable
      columns={COLUMNS}
      data={isEmpty ? [] : EMPLOYEES}
      isLoading={isLoading}
      enableRowSelection={enableRowSelection}
      checkboxSize={checkboxSize}
      enableGlobalFilter={enableGlobalFilter}
      searchPlaceholder="이름으로 검색"
      pageSize={5}
      className="w-[640px]"
    />
  );
}
