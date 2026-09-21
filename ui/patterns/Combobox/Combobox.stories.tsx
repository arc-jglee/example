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
import { useMemo, useRef, useState } from 'react';

import { Combobox, type ComboboxOption } from './Combobox';

const EMPLOYEES: ComboboxOption[] = [
  { value: 'emp-1', label: '봉제종' },
  { value: 'emp-2', label: '전재영' },
  { value: 'emp-3', label: '김은혜' },
  { value: 'emp-4', label: '이재건' },
  { value: 'emp-5', label: '김인나' },
  { value: 'emp-6', label: '안나영' },
  { value: 'emp-7', label: '이민수' },
  { value: 'emp-8', label: '최아라' },
  { value: 'emp-9', label: '이유빈', disabled: true },
];

const PARTS = [
  {
    name: '비제어 모드',
    description:
      '`defaultValue`만 주면 Combobox가 내부 상태로 선택 값을 관리한다. `onChange`는 선택 시점을 관찰하는 용도로만 쓴다.',
    code: `<Combobox
  options={options}
  defaultValue="emp-1"
  onChange={(value) => console.log(value)}
/>`,
  },
  {
    name: '제어 모드',
    description:
      '`value`+`onChange`를 함께 주면 선택 상태를 앱이 직접 소유한다.',
    code: `const [value, setValue] = useState<string | null>(null);

<Combobox options={options} value={value} onChange={setValue} />`,
  },
  {
    name: '비동기(서버) 검색 모드',
    description:
      '`onSearchChange`를 주면 자체 필터링을 끄고, 검색어가 바뀔 때마다 콜백만 호출한다.<br/>옵션이 많아 서버에서 검색해야 하는 경우, 이 콜백에서 API를 호출하고 결과를 `options`에, 요청 중 상태를 `loading`에 반영한다.',
    code: `<Combobox
  onSearchChange={(search) => fetchEmployees(search)}
  options={searchResults}
  loading={isFetching}
/>`,
  },
  {
    name: '다중 선택 (multiple)',
    description:
      '`multiple`을 주면 `value`/`defaultValue`/`onChange`가 배열(`string[]`)로 동작한다.<br/>항목을 클릭하면 선택/해제만 토글하고, 트리거에는 첫 항목 라벨과 나머지 개수("김철수 외 2건")를 보여준다.',
    code: `<Combobox
  multiple
  options={options}
  defaultValue={['emp-1', 'emp-3']}
  onChange={(values) => console.log(values)}
/>`,
  },
  {
    name: 'renderOption',
    description:
      '옵션을 기본 label 텍스트가 아닌, 커스텀 UI로 렌더링하고 싶을 때 쓴다.',
    code: `<Combobox
  options={options}
  renderOption={(option) => (
    <div>
      <p>{option.label}</p>
      <p className="text-xs text-[var(--color-text-tertiary)]">개발팀</p>
    </div>
  )}
/>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />

    <Primary />
    <Controls />

    <h2>사용법</h2>
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

const meta: Meta<typeof Combobox> = {
  title: 'Patterns/Combobox',
  component: Combobox,
  args: {
    options: EMPLOYEES,
    placeholder: '사원 선택',
    searchPlaceholder: '이름으로 검색...',
    emptyText: '검색 결과가 없습니다',
    disabled: false,
    multiple: false,
  },
  argTypes: {
    options: { table: { disable: true } },
    value: {
      control: false,
      description: '제어 모드일 때 선택된 값.',
      table: { disable: true },
    },
    defaultValue: {
      control: false,
      description: '비제어 모드일 때 초기 선택 값.',
      table: { disable: true },
    },
    className: { table: { disable: true } },
    onChange: {
      control: false,
      description: '선택이 바뀔 때 호출된다.',
      table: { disable: true },
    },
    onSearchChange: { table: { disable: true } },
    multiple: {
      control: 'boolean',
      description:
        '다중 선택 모드. 켜면 value/defaultValue/onChange가 배열(string[])로 동작한다.',
    },
    renderOption: { table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    placeholder: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    emptyText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          'Popover(트리거) + cmdk(검색·필터링·키보드 탐색)를 조합한 검색형 단일 선택 콤보박스.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Basic: Story = {};

function ControlledDemo() {
  const [value, setValue] = useState<string | null>('emp-2');

  return <Combobox options={EMPLOYEES} value={value} onChange={setValue} />;
}

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const [value, setValue] = useState<string | null>('emp-2');

<Combobox options={EMPLOYEES} value={value} onChange={setValue} />`,
      },
    },
  },
  render: () => <ControlledDemo />,
};

function MultipleDemo() {
  const [values, setValues] = useState<string[]>(['emp-1', 'emp-3']);

  return (
    <Combobox
      multiple
      options={EMPLOYEES}
      value={values}
      onChange={setValues}
    />
  );
}

export const Multiple: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const [values, setValues] = useState<string[]>(['emp-1', 'emp-3']);

<Combobox multiple options={EMPLOYEES} value={values} onChange={setValues} />`,
      },
    },
  },
  render: () => <MultipleDemo />,
};

const DIRECTORY: ComboboxOption[] = Array.from({ length: 30 }, (_, i) => ({
  value: `dir-${i}`,
  label: `사원 ${String(i + 1).padStart(3, '0')}호`,
}));

function AsyncSearchDemo() {
  const [results, setResults] = useState<ComboboxOption[]>(DIRECTORY);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleSearchChange(search: string) {
    clearTimeout(timeoutRef.current);
    setLoading(true);
    // 실제로는 여기서 검색어로 서버 API를 호출한다. 데모에서는 디바운스 후
    // 로컬 목록을 필터링하는 것으로 서버 왕복을 흉내낸다.
    timeoutRef.current = setTimeout(() => {
      setResults(
        DIRECTORY.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 300);
  }

  return (
    <Combobox
      options={results}
      onSearchChange={handleSearchChange}
      loading={loading}
      placeholder="사원 검색 (서버 응답 시뮬레이션)"
    />
  );
}

export const AsyncSearch: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const [results, setResults] = useState<ComboboxOption[]>(DIRECTORY);
const [loading, setLoading] = useState(false);
const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

function handleSearchChange(search: string) {
  clearTimeout(timeoutRef.current);
  setLoading(true);
  // 실제로는 여기서 검색어로 서버 API를 호출한다. 데모에서는 디바운스 후
  // 로컬 목록을 필터링하는 것으로 서버 왕복을 흉내낸다.
  timeoutRef.current = setTimeout(() => {
    setResults(
      DIRECTORY.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setLoading(false);
  }, 300);
}

<Combobox
  options={results}
  onSearchChange={handleSearchChange}
  loading={loading}
  placeholder="사원 검색 (서버 응답 시뮬레이션)"
/>`,
      },
    },
  },
  render: () => <AsyncSearchDemo />,
};

function CustomRenderDemo() {
  const departmentByValue = useMemo(
    () =>
      new Map([
        ['emp-1', '개발팀'],
        ['emp-2', '디자인팀'],
        ['emp-3', '인사팀'],
        ['emp-4', '영업팀'],
      ]),
    [],
  );

  return (
    <Combobox
      options={EMPLOYEES}
      renderOption={(option) => (
        <div className="flex flex-col">
          <span>{option.label}</span>
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {departmentByValue.get(option.value) ?? '미배정'}
          </span>
        </div>
      )}
    />
  );
}

export const CustomRender: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const departmentByValue = useMemo(
  () =>
    new Map([
      ['emp-1', '개발팀'],
      ['emp-2', '디자인팀'],
      ['emp-3', '인사팀'],
      ['emp-4', '영업팀'],
    ]),
  [],
);

<Combobox
  options={EMPLOYEES}
  renderOption={(option) => (
    <div className="flex flex-col">
      <span>{option.label}</span>
      <span className="text-xs text-[var(--color-text-tertiary)]">
        {departmentByValue.get(option.value) ?? '미배정'}
      </span>
    </div>
  )}
/>`,
      },
    },
  },
  render: () => <CustomRenderDemo />,
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Combobox options={EMPLOYEES} disabled />`,
      },
    },
  },
  render: () => <Combobox options={EMPLOYEES} disabled />,
};
