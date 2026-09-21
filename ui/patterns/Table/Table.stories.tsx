import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Controls,
  Description,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowDown, ArrowUp, GripVertical, Inbox } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { cn } from '../../utils/cn';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';
import { INVOICES, TableDemo } from './TableDemo';

const PARTS = [
  {
    name: 'Table',
    description:
      '가로 스크롤 wrapper로 감싼 `<table>`. 좁은 화면에서 컬럼이 넘치면 표 영역만 스크롤된다.',
    code: `<Table>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
  <TableCaption>...</TableCaption>
</Table>`,
  },
  {
    name: 'TableHeader / TableBody / TableFooter',
    description:
      '각각 `<thead>`/`<tbody>`/`<tfoot>`. TableBody는 마지막 행의 하단 구분선을 제거하고, TableFooter는 배경색으로 행을 구분한다.',
    code: `<TableHeader>
  <TableRow>
    <TableHead scope="col">청구서</TableHead>
  </TableRow>
</TableHeader>
<TableBody>...</TableBody>
<TableFooter>
  <TableRow>
    <TableCell>합계</TableCell>
  </TableRow>
</TableFooter>`,
  },
  {
    name: 'TableRow',
    description:
      '`<tr>`. hover 시 배경이 옅게 바뀌고, `data-state="selected"`를 지정하면 선택된 행 스타일이 적용된다.<br/>`ref`를 그대로 전달하므로 dnd-kit의 `useSortable` 등 실제 `<tr>` DOM 노드가 필요한 곳에도 바로 감싸서 쓸 수 있다.',
    code: `<TableRow data-state={isSelected ? 'selected' : undefined}>
  <TableCell>내용</TableCell>
</TableRow>

// 드래그 정렬처럼 DOM 노드가 필요한 경우
const { setNodeRef, ...sortable } = useSortable({ id });
<TableRow ref={setNodeRef} style={{ transform: ... }}>
  <TableCell>내용</TableCell>
</TableRow>`,
  },
  {
    name: 'TableHead',
    description:
      '`<th>`. 열 헤더가 흔하므로 `scope="col"`이 기본값이며, 행 헤더로 쓸 때만 `scope="row"`로 덮어쓴다.',
    code: `<TableHead scope="col">청구서</TableHead>
<TableHead scope="row">합계</TableHead> {/* 행 헤더인 경우 */}`,
  },
  {
    name: 'TableCell',
    description: '`<td>`. 데이터 셀.',
    code: `<TableCell className="text-right">25,000원</TableCell>`,
  },
  {
    name: 'TableCaption',
    description:
      '`<caption>`. 표에 대한 설명을 붙이는 접근성 요소로, 사용자에게 표의 목적을 알려준다.',
    code: `<TableCaption>최근 결제 내역 목록입니다.</TableCaption>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />

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

const meta: Meta<typeof TableDemo> = {
  title: 'Patterns/Table',
  component: TableDemo,
  args: {
    rowCount: 4,
    showCaption: true,
    showFooter: false,
  },
  argTypes: {
    rowCount: {
      control: { type: 'range', min: 1, max: INVOICES.length, step: 1 },
      description: '표시할 행 개수',
    },
    showCaption: {
      control: 'boolean',
      description: 'TableCaption 표시 여부',
    },
    showFooter: {
      control: 'boolean',
      description: 'TableFooter(합계 행) 표시 여부',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          '순수 `<table>` 시맨틱 태그를 감싼 서브 컴포넌트 세트로 구성된다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Table>
  <TableCaption>최근 결제 내역 목록입니다.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">청구서</TableHead>
      <TableHead scope="col">상태</TableHead>
      <TableHead scope="col">결제 수단</TableHead>
      <TableHead scope="col" className="text-right">
        금액
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {INVOICES.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell>{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">
          {invoice.amount.toLocaleString()}원
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
    },
  },
};

export const WithFooter: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">청구서</TableHead>
      <TableHead scope="col" className="text-right">
        금액
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {INVOICES.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell>{invoice.id}</TableCell>
        <TableCell className="text-right">
          {invoice.amount.toLocaleString()}원
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>합계</TableCell>
      <TableCell className="text-right">
        {INVOICES.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}원
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
      },
    },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">청구서</TableHead>
          <TableHead scope="col" className="text-right">
            금액
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell className="text-right">
              {invoice.amount.toLocaleString()}원
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>합계</TableCell>
          <TableCell className="text-right">
            {INVOICES.reduce((sum, i) => sum + i.amount, 0).toLocaleString()}원
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const EmptyResult: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '데이터가 없을 때는 헤더는 유지하고, 본문 안에 `EmptyState`를 배치한다.',
      },
      source: {
        type: 'code',
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">청구서</TableHead>
      <TableHead scope="col" className="text-right">
        금액
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={2}>
        <EmptyState
          icon={<Inbox />}
          title="청구서가 없습니다"
          description="새 청구서를 등록하면 여기에 표시됩니다."
        />
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">청구서</TableHead>
          <TableHead scope="col" className="text-right">
            금액
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={2}>
            <EmptyState
              icon={<Inbox />}
              title="청구서가 없습니다"
              description="새 청구서를 등록하면 여기에 표시됩니다."
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const SelectedRow: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '선택 상태는 `data-state="selected"`를 직접 제어해서 부여한다.',
      },
      source: {
        type: 'code',
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">청구서</TableHead>
      <TableHead scope="col">상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {INVOICES.map((invoice, index) => (
      <TableRow
        key={invoice.id}
        data-state={index === 1 ? 'selected' : undefined}
      >
        <TableCell>{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
    },
  },
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">청구서</TableHead>
          <TableHead scope="col">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice, index) => (
          <TableRow
            key={invoice.id}
            data-state={index === 1 ? 'selected' : undefined}
          >
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

type SortDirection = 'asc' | 'desc';

function SortableHeaderDemo() {
  const [direction, setDirection] = useState<SortDirection>('asc');

  const sorted = [...INVOICES].sort((a, b) =>
    direction === 'asc' ? a.amount - b.amount : b.amount - a.amount,
  );
  const Icon = direction === 'asc' ? ArrowUp : ArrowDown;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            scope="col"
            aria-sort={direction === 'asc' ? 'ascending' : 'descending'}
          >
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-auto gap-1 px-2 py-1"
              onClick={() =>
                setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
              }
            >
              금액
              <Icon className="size-3.5" />
            </Button>
          </TableHead>
          <TableHead scope="col">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.amount.toLocaleString()}원</TableCell>
            <TableCell>{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const SortableHeader: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '정렬 상태/토글 로직은 직접 구현한다. `TableHead` 안에 버튼을 넣고 `aria-sort`를 부여하는 조합의 예. 버튼을 클릭하면 오름차순/내림차순이 토글된다.',
      },
      source: {
        type: 'code',
        code: `const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

const sorted = [...INVOICES].sort((a, b) =>
  direction === 'asc' ? a.amount - b.amount : b.amount - a.amount,
);
const Icon = direction === 'asc' ? ArrowUp : ArrowDown;

<Table>
  <TableHeader>
    <TableRow>
      <TableHead
        scope="col"
        aria-sort={direction === 'asc' ? 'ascending' : 'descending'}
      >
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-auto gap-1 px-2 py-1"
          onClick={() =>
            setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          금액
          <Icon className="size-3.5" />
        </Button>
      </TableHead>
      <TableHead scope="col">상태</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sorted.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell>{invoice.amount.toLocaleString()}원</TableCell>
        <TableCell>{invoice.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
    },
  },
  render: () => <SortableHeaderDemo />,
};

export const HorizontalScroll: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '컬럼이 많아 넘칠 때, `Table`이 기본 제공하는 `overflow-x-auto` 덕분에 표 영역만 가로 스크롤된다.',
      },
      source: {
        type: 'code',
        code: `<div style={{ maxWidth: 360 }}>
  <Table>
    <TableHeader>
      <TableRow>
        {Array.from({ length: 8 }, (_, i) => (
          <TableHead key={i} scope="col" className="whitespace-nowrap">
            컬럼 {i + 1}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        {Array.from({ length: 8 }, (_, i) => (
          <TableCell key={i} className="whitespace-nowrap">
            값 {i + 1}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  </Table>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 8 }, (_, i) => (
              <TableHead key={i} scope="col" className="whitespace-nowrap">
                컬럼 {i + 1}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {Array.from({ length: 8 }, (_, i) => (
              <TableCell key={i} className="whitespace-nowrap">
                값 {i + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

type SortableInvoiceRowProps = {
  invoice: (typeof INVOICES)[number];
};

/** 왼쪽 손잡이를 드래그해서 순서를 바꾸는 행. `TableRow`가 ref를 그대로 전달해서 `useSortable`의 DOM 노드로 바로 쓸 수 있다. */
function SortableInvoiceRow({ invoice }: SortableInvoiceRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: invoice.id });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        isDragging && 'relative z-10 bg-[var(--color-bg-surface)] shadow-md',
      )}
    >
      <TableCell className="w-8 px-2">
        <button
          type="button"
          className="flex cursor-grab items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] active:cursor-grabbing"
          aria-label="드래그해서 순서 변경"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" aria-hidden />
        </button>
      </TableCell>
      <TableCell>{invoice.id}</TableCell>
      <TableCell>{invoice.status}</TableCell>
      <TableCell className="text-right">
        {invoice.amount.toLocaleString()}원
      </TableCell>
    </TableRow>
  );
}

function DraggableRowsDemo() {
  const [rows, setRows] = useState(INVOICES);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    setRows((current) => {
      const oldIndex = current.findIndex((row) => row.id === active.id);
      const newIndex = current.findIndex((row) => row.id === over.id);
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead scope="col" className="w-8" />
            <TableHead scope="col">청구서</TableHead>
            <TableHead scope="col">상태</TableHead>
            <TableHead scope="col" className="text-right">
              금액
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SortableContext
            items={rows.map((row) => row.id)}
            strategy={verticalListSortingStrategy}
          >
            {rows.map((invoice) => (
              <SortableInvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  );
}

export const DraggableRows: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`@dnd-kit`으로 행을 드래그해서 순서를 바꾸는 예시.<br/>`TableRow`가 ref를 그대로 넘겨주기 때문에 `useSortable`의 `setNodeRef`를 바로 연결할 수 있다.<br/>실제 서버 반영은 `onDragEnd`에서 직접 처리한다(이 예시는 로컬 상태만 바꾼다).',
      },
      source: {
        type: 'code',
        code: `function SortableInvoiceRow({ invoice }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: invoice.id });

  return (
    <TableRow
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <TableCell>
        <button aria-label="드래그해서 순서 변경" {...attributes} {...listeners}>
          <GripVertical className="size-4" />
        </button>
      </TableCell>
      <TableCell>{invoice.id}</TableCell>
      {/* ... */}
    </TableRow>
  );
}

<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <Table>
    <TableBody>
      <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        {rows.map((invoice) => (
          <SortableInvoiceRow key={invoice.id} invoice={invoice} />
        ))}
      </SortableContext>
    </TableBody>
  </Table>
</DndContext>`,
      },
    },
  },
  render: () => <DraggableRowsDemo />,
};
