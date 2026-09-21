import {
  Controls,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataTableDemo } from './DataTableDemo';
import { DataTableServerPaginationDemo } from './DataTableServerPaginationDemo';

const PARTS = [
  {
    name: 'columns / data',
    description:
      '`@tanstack/react-table`의 `ColumnDef[]`를 그대로 받는다.<br/>정렬/필터/선택 상태는 DataTable이 내부적으로 관리하고, 렌더링은 기존 `Table` 서브 컴포넌트를 그대로 쓴다.',
    code: `const columns: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'department', header: '부서' },
];

<DataTable columns={columns} data={employees} />`,
  },
  {
    name: '정렬',
    description:
      '헤더를 클릭하면 정렬된다.<br/>특정 컬럼을 정렬 대상에서 빼려면 `ColumnDef`에 `enableSorting: false`를 준다.',
    code: `{ accessorKey: 'action', header: '', enableSorting: false, cell: () => <Button size="sm">수정</Button> }`,
  },
  {
    name: 'enableGlobalFilter',
    description:
      '활성화하면 테이블 위에 검색 창이 나타나고, 입력한 검색어로 전체 컬럼을 필터링한다.',
    code: `<DataTable columns={columns} data={employees} enableGlobalFilter searchPlaceholder="이름으로 검색" />`,
  },
  {
    name: 'enableRowSelection / onSelectionChange',
    description:
      '활성화하면 체크박스 컬럼이 맨 앞에 자동으로 추가된다.<br/>선택된 행이 바뀔 때마다 `onSelectionChange`가 호출된다.',
    code: `<DataTable
  columns={columns}
  data={employees}
  enableRowSelection
  onSelectionChange={(rows) => console.log(rows)}
/>`,
  },
  {
    name: 'checkboxSize',
    description:
      '선택 체크박스 크기. `Checkbox`의 `size`와 같은 `sm`/`md`를 그대로 받으며, 생략하면 `md`이다.',
    code: `<DataTable columns={columns} data={employees} enableRowSelection checkboxSize="sm" />`,
  },
  {
    name: 'isLoading / emptyState',
    description:
      '`isLoading`이면 실제 행 대신 `skeletonRowCount`(기본 5)개의 스켈레톤 행을 보여준다.<br/>데이터가 없으면 기본 `EmptyState`가 표시되고, `emptyState` prop으로 교체할 수 있다.',
    code: `<DataTable columns={columns} data={[]} emptyState={<EmptyState title="사원이 없습니다" />} />`,
  },
  {
    name: 'total / pageIndex / onPageChange (서버 페이지네이션)',
    description:
      '서버가 데이터를 페이지 단위로 내려주는 경우, `total`(전체 개수)을 함께 주면 로드되지 않은 페이지까지 포함해 페이지 번호가 정확히 계산된다.<br/>`pageIndex`/`onPageChange`로 현재 페이지를 controlled로 관리하면, 페이지 이동 시 `onPageChange`에서 다음 청크를 요청할 수 있다.',
    code: `const [pageIndex, setPageIndex] = useState(0);
const { data: chunk, total, isLoading } = useEmployeesQuery(pageIndex);

<DataTable
  columns={columns}
  data={chunk}
  total={total}
  pageIndex={pageIndex}
  onPageChange={setPageIndex}
  isLoading={isLoading}
  pageSize={5}
/>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
      {
        '`Table`보다 한 단계 위의 목록 화면용 테이블. 정렬/전역 검색/행 선택/빈 상태/로딩을 `@tanstack/react-table` 기반으로 직접 관리한다.<br/>요소들은 기존 `Table`/`Checkbox`/`EmptyState`/`Skeleton`/`Pagination`을 그대로 조합해서 쓴다.'
      }
    </Markdown>

    <Primary />
    <Controls />

    <h2>구성 요소</h2>
    {PARTS.map((part) => (
      <div key={part.name} style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 4 }}>{part.name}</h3>
        <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
          {part.description}
        </Markdown>
        <Source code={part.code} language="tsx" />
      </div>
    ))}

    <Stories includePrimary={false} title="다른 예시" />
  </>
);

const meta: Meta<typeof DataTableDemo> = {
  title: 'Patterns/DataTable',
  component: DataTableDemo,
  args: {
    isLoading: false,
    isEmpty: false,
    enableRowSelection: false,
    checkboxSize: 'md',
    enableGlobalFilter: false,
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: '스켈레톤 행을 보여줄지 여부',
    },
    isEmpty: {
      control: 'boolean',
      description: 'data를 빈 배열로 바꿔 EmptyState를 확인',
    },
    enableRowSelection: {
      control: 'boolean',
      description: '체크박스 선택 컬럼 표시 여부',
    },
    checkboxSize: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '선택 체크박스 크기',
    },
    enableGlobalFilter: {
      control: 'boolean',
      description: '검색 입력 창 표시 여부',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          '정렬/필터/선택/빈 상태/로딩을 포함한 목록용 테이블. `@tanstack/react-table`을 헤드리스 엔진으로 쓴다.',
      },
      source: {
        type: 'code',
        code: `type Department = 'FrontEnd Chapter' | 'BackEnd Chapter' | 'Device Chapter';
type Employee = { id: string; name: string; department: Department; role: string };

const DEPARTMENT_VARIANT: Record<Department, 'success' | 'warning' | 'primary'> = {
  'FrontEnd Chapter': 'success',
  'BackEnd Chapter': 'warning',
  'Device Chapter': 'primary',
};

const columns: ColumnDef<Employee>[] = [
  { accessorKey: 'name', header: '이름' },
  {
    accessorKey: 'department',
    header: '부서',
    cell: ({ getValue }) => {
      const department = getValue<Department>();
      return <Badge variant={DEPARTMENT_VARIANT[department]}>{department}</Badge>;
    },
  },
  { accessorKey: 'role', header: '역할' },
];

<DataTable
  columns={columns}
  data={employees}
  searchPlaceholder="이름으로 검색"
  pageSize={5}
/>`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTableDemo>;

export const Basic: Story = {};

export const ServerPagination: Story = {
  render: () => <DataTableServerPaginationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          '`data`는 현재 페이지 청크(5개)만 담고, `total`로 전체 개수를 알려줘서 페이지 번호를 미리 구성한다.<br/>페이지를 이동하면 `onPageChange`가 다음 청크를 흉내내어 로딩 상태를 잠깐 보여준다.',
      },
      source: {
        type: 'code',
        code: `const [pageIndex, setPageIndex] = useState(0);
const [isLoading, setIsLoading] = useState(false);

const start = pageIndex * PAGE_SIZE;
const chunk = employees.slice(start, start + PAGE_SIZE);

const handlePageChange = (nextPageIndex: number) => {
  setIsLoading(true);
  setPageIndex(nextPageIndex);
  // 실제로는 여기서 서버에 다음 페이지를 요청한다.
  fetchEmployees(nextPageIndex).then(() => setIsLoading(false));
};

<DataTable
  columns={columns}
  data={chunk}
  total={employees.length}
  pageIndex={pageIndex}
  onPageChange={handlePageChange}
  isLoading={isLoading}
  pageSize={PAGE_SIZE}
/>`,
      },
    },
  },
};
