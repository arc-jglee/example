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

import { DateRangePicker } from './DateRangePicker';

const PARTS = [
  {
    name: '비제어 모드',
    description:
      '`defaultValue`만 주면 DateRangePicker가 내부 상태로 선택된 기간을 관리한다. `onChange`는 선택 시점을 관찰하는 용도로만 쓴다.',
    code: `<DateRangePicker
  defaultValue={{ from: new Date(), to: undefined }}
  onChange={(range) => console.log(range)}
/>`,
  },
  {
    name: '제어 모드',
    description:
      '`value`+`onChange`를 함께 주면 선택 상태를 앱이 직접 소유한다.',
    code: `const [range, setRange] = useState<DateRange>();

<DateRangePicker value={range} onChange={setRange} />`,
  },
  {
    name: 'calendarProps',
    description:
      '내부 `Calendar`에 그대로 전달할 나머지 props. `mode`/`selected`/`onSelect` 그 외의 것만(`disabled`, `locale` 등) 넘길 수 있다.',
    code: `<DateRangePicker
  calendarProps={{ disabled: { dayOfWeek: [0, 6] } }}
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

const meta: Meta<typeof DateRangePicker> = {
  title: 'Patterns/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    className: {
      table: { disable: true },
    },
    value: {
      control: false,
      description: '제어 모드일 때 선택된 기간(`DateRange`).',
    },
    defaultValue: {
      control: false,
      description: '비제어 모드일 때 초기 선택 기간(`DateRange`).',
    },
    onChange: {
      control: false,
      description: '기간 선택 콜백 함수. 제어/비제어 둘 다 호출된다.',
    },
    calendarProps: {
      table: { disable: true },
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          'Popover(트리거) + Calendar(mode="range")를 조합한 조회 기간 필터용 날짜 범위 선택기.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {
  args: {
    placeholder: '조회 기간 선택',
  },
};

function ControlledDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 10),
    to: new Date(2026, 6, 17),
  });

  return <DateRangePicker value={range} onChange={setRange} />;
}

export const Controlled: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const [range, setRange] = useState<DateRange | undefined>({
  from: new Date(2026, 6, 10),
  to: new Date(2026, 6, 17),
});

<DateRangePicker value={range} onChange={setRange} />`,
      },
    },
  },
  render: () => <ControlledDemo />,
};

export const DisabledWeekends: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<DateRangePicker calendarProps={{ disabled: { dayOfWeek: [0, 6] } }} />`,
      },
    },
  },
  render: () => (
    <DateRangePicker calendarProps={{ disabled: { dayOfWeek: [0, 6] } }} />
  ),
};

export const Disabled: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<DateRangePicker disabled />`,
      },
    },
  },
  render: () => <DateRangePicker disabled />,
};
