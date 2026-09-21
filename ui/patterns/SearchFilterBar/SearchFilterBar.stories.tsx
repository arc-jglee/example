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
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/Select/Select';
import { Combobox, type ComboboxOption } from '../Combobox/Combobox';
import { DateRangePicker } from '../DateRangePicker/DateRangePicker';
import {
  SearchFilterBar,
  SearchFilterBarActions,
  SearchFilterBarField,
} from './SearchFilterBar';

const PARTS = [
  {
    name: 'SearchFilterBar',
    description:
      '필터 필드들을 한 곳에 배치하는 순수 레이아웃 컨테이너. 좁은 화면에서는 필드가 자동으로 줄바꿈된다.',
    code: `<SearchFilterBar>...</SearchFilterBar>`,
  },
  {
    name: 'SearchFilterBarField',
    description:
      '필터 컨트롤 하나를 감싸는 단위. `htmlFor`를 컨트롤의 `id`와 맞추면 라벨-컨트롤 접근성이 연결된다.',
    code: `<SearchFilterBarField label="검색어" htmlFor="keyword">
  <Input id="keyword" placeholder="이름으로 검색" />
</SearchFilterBarField>`,
  },
  {
    name: 'SearchFilterBarActions',
    description: '검색/초기화 등 액션 버튼을 배치하는 영역.',
    code: `<SearchFilterBarActions>
  <Button variant="outline">초기화</Button>
  <Button>검색</Button>
</SearchFilterBarActions>`,
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

const DEPARTMENTS: ComboboxOption[] = [
  { value: 'dev', label: '개발팀' },
  { value: 'design', label: '디자인팀' },
  { value: 'hr', label: '인사팀' },
  { value: 'sales', label: '영업팀' },
];

/**
 * 검색어/기간/상태/부서 필터를 조합한 데모. 각 필드는 전부 이 라이브러리의
 * 기존 컴포넌트(Input/Select/DateRangePicker/Combobox) 그대로다 — 필터 종류나
 * 개수를 SearchFilterBar가 강제하지 않는다는 걸 보여주기 위한 예시일 뿐,
 * 실제로는 화면마다 다른 조합을 쓰면 된다.
 */
function SearchFilterBarDemo() {
  const [keyword, setKeyword] = useState('');
  const [period, setPeriod] = useState<DateRange | undefined>();
  const [status, setStatus] = useState('all');
  const [department, setDepartment] = useState<string | null>(null);

  return (
    <SearchFilterBar>
      <SearchFilterBarField label="검색어" htmlFor="keyword">
        <Input
          id="keyword"
          placeholder="사원 이름으로 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="w-56"
        />
      </SearchFilterBarField>

      <SearchFilterBarField label="기간">
        <DateRangePicker value={period} onChange={setPeriod} />
      </SearchFilterBarField>

      <SearchFilterBarField label="상태" htmlFor="status">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status" className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">재직중</SelectItem>
            <SelectItem value="leave">휴직중</SelectItem>
            <SelectItem value="retired">퇴사</SelectItem>
          </SelectContent>
        </Select>
      </SearchFilterBarField>

      <SearchFilterBarField label="부서">
        <Combobox
          options={DEPARTMENTS}
          value={department}
          onChange={setDepartment}
          placeholder="전체 부서"
        />
      </SearchFilterBarField>

      <SearchFilterBarActions>
        <Button
          variant="outline"
          onClick={() => {
            setKeyword('');
            setPeriod(undefined);
            setStatus('all');
            setDepartment(null);
          }}
        >
          초기화
        </Button>
        <Button>검색</Button>
      </SearchFilterBarActions>
    </SearchFilterBar>
  );
}

const meta: Meta<typeof SearchFilterBarDemo> = {
  title: 'Patterns/SearchFilterBar',
  component: SearchFilterBarDemo,
  parameters: {
    docs: {
      page: DocsPage,
      description: {
        component:
          '여러 필터 필드를 한 곳에 묶어 배치하는 순수 레이아웃 컴포넌트.<br/>필터 종류나 개수를 강제하지 않고, 이미 있는 Input/Select/Combobox/DateRangePicker 등을 자유롭게 조합한다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilterBarDemo>;

export const Basic: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<SearchFilterBar>
  <SearchFilterBarField label="검색어" htmlFor="keyword">
    <Input id="keyword" placeholder="사원 이름으로 검색" className="w-56" />
  </SearchFilterBarField>

  <SearchFilterBarField label="기간">
    <DateRangePicker value={period} onChange={setPeriod} />
  </SearchFilterBarField>

  <SearchFilterBarField label="상태" htmlFor="status">
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger id="status" className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">전체</SelectItem>
        <SelectItem value="active">재직중</SelectItem>
        <SelectItem value="leave">휴직중</SelectItem>
        <SelectItem value="retired">퇴사</SelectItem>
      </SelectContent>
    </Select>
  </SearchFilterBarField>

  <SearchFilterBarField label="부서">
    <Combobox options={DEPARTMENTS} value={department} onChange={setDepartment} placeholder="전체 부서" />
  </SearchFilterBarField>

  <SearchFilterBarActions>
    <Button variant="outline" onClick={handleReset}>
      초기화
    </Button>
    <Button>검색</Button>
  </SearchFilterBarActions>
</SearchFilterBar>`,
      },
    },
  },
};

export const Narrow: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '좁은 컨테이너에서는 필드가 자동으로 줄바꿈된다.',
      },
      source: {
        type: 'code',
        code: `<div style={{ width: 420 }}>
  <SearchFilterBar>
    <SearchFilterBarField label="검색어" htmlFor="keyword">
      <Input id="keyword" placeholder="사원 이름으로 검색" className="w-56" />
    </SearchFilterBarField>

    <SearchFilterBarField label="기간">
      <DateRangePicker value={period} onChange={setPeriod} />
    </SearchFilterBarField>

    <SearchFilterBarField label="상태" htmlFor="status">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger id="status" className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          <SelectItem value="active">재직중</SelectItem>
          <SelectItem value="leave">휴직중</SelectItem>
          <SelectItem value="retired">퇴사</SelectItem>
        </SelectContent>
      </Select>
    </SearchFilterBarField>

    <SearchFilterBarField label="부서">
      <Combobox options={DEPARTMENTS} value={department} onChange={setDepartment} placeholder="전체 부서" />
    </SearchFilterBarField>

    <SearchFilterBarActions>
      <Button variant="outline" onClick={handleReset}>
        초기화
      </Button>
      <Button>검색</Button>
    </SearchFilterBarActions>
  </SearchFilterBar>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ width: 420 }}>
      <SearchFilterBarDemo />
    </div>
  ),
};
