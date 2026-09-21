import {
  Controls,
  Description,
  Markdown,
  Primary,
  Source,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DatePicker } from './DatePicker';

const PARTS = [
  {
    name: '비제어 모드',
    description:
      '`defaultValue`만 주면 DatePicker가 내부 상태로 선택된 날짜를 관리한다. `onChange`는 선택 시점을 관찰하는 용도로만 쓴다.',
    code: `<DatePicker
  defaultValue={new Date()}
  onChange={(date) => console.log(date)}
/>`,
  },
  {
    name: '제어 모드',
    description:
      '`value`+`onChange`를 함께 주면 선택 상태를 앱이 직접 소유한다.',
    code: `const [date, setDate] = useState<Date>();

<DatePicker value={date} onChange={setDate} />`,
  },
  {
    name: 'calendarProps',
    description:
      '내부 `Calendar`에 그대로 전달할 나머지 props. `mode`/`selected`/`onSelect` 그 외의 것만(`disabled`, `locale` 등) 넘길 수 있다.',
    code: `<DatePicker
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
  </>
);

const meta: Meta<typeof DatePicker> = {
  title: 'Patterns/DatePicker',
  component: DatePicker,
  argTypes: {
    className: {
      table: { disable: true },
    },
    value: {
      control: false,
      description: '제어 모드일 때 선택된 날짜(`Date`).',
    },
    defaultValue: {
      control: false,
      description: '비제어 모드일 때 초기 선택 날짜(`Date`).',
    },
    onChange: {
      control: false,
      description: '날짜 선택 콜백 함수. 제어/비제어 둘 다 호출된다.',
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
          'Popover(트리거) + Calendar(단일 날짜 선택)를 조합한 날짜 선택기.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {
  args: {
    placeholder: '날짜 선택',
  },
};

function ControlledDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 22));

  return <DatePicker value={date} onChange={setDate} />;
}

export const Controlled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 22));

<DatePicker value={date} onChange={setDate} />`,
      },
    },
  },
  render: () => <ControlledDemo />,
};

export const DisabledWeekends: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<DatePicker calendarProps={{ disabled: { dayOfWeek: [0, 6] } }} />`,
      },
    },
  },
  render: () => (
    <DatePicker calendarProps={{ disabled: { dayOfWeek: [0, 6] } }} />
  ),
};

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<DatePicker disabled />`,
      },
    },
  },
  render: () => <DatePicker disabled />,
};
