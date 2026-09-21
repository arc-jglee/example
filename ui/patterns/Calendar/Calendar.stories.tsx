import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Patterns/Calendar',
  component: Calendar,
  args: {
    showOutsideDays: true,
  },
  argTypes: {
    showOutsideDays: {
      control: 'boolean',
      description: '이전/다음 달의 날짜를 회색으로 표시할지 여부',
    },
    // react-day-picker의 mode/selected/onSelect 등은 서로 타입이 얽힌
    // discriminated union이라 컨트롤로 노출할 수 없어 각 스토리에서 직접 고정한다.
    mode: {
      control: false,
      description: '`"single" | "range" | "multiple"`. 선택 방식을 결정한다.',
    },
    selected: {
      control: false,
      description:
        '현재 선택된 날짜. `mode`에 따라 `Date`(single) / `DateRange`(range) / `Date[]`(multiple)로 타입이 달라진다.',
    },
    onSelect: {
      control: false,
      description:
        '선택 변경 콜백. `selected`와 마찬가지로 `mode`에 종속된 시그니처를 가진 함수다.',
    },
    defaultMonth: {
      control: false,
      description: '초기에 표시할 월(`Date`). 기본값은 현재 월이다.',
      table: {
        defaultValue: { summary: 'Current Month' },
      },
    },
    disabled: {
      control: false,
      description:
        '선택 불가 날짜 matcher. 요일 배열 `{ dayOfWeek: number[] }`로 불가 요일 추가. `DisabledDates` 스토리 참고.',
    },
    locale: {
      control: false,
      description: 'date-fns locale 객체. 기본값은 `ko`(한국어).',
      table: {
        // date-fns locale 객체를 그대로 두면 Default 컬럼에 전체 객체가
        // 덤프되어 지저분해지므로 요약 문자열로 대체한다.
        defaultValue: { summary: 'ko' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui 생태계의 사실상 표준인 `react-day-picker`를 채택하고 토큰/버튼 스타일로 재스타일링했다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

function SingleDemo({ showOutsideDays }: { showOutsideDays?: boolean }) {
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(2026, 6, 22),
  );

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={selected}
      showOutsideDays={showOutsideDays}
    />
  );
}

export const Basic: Story = {
  render: (args) => <SingleDemo showOutsideDays={args.showOutsideDays} />,
};

function RangeDemo({ showOutsideDays }: { showOutsideDays?: boolean }) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 10),
    to: new Date(2026, 6, 17),
  });

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={new Date(2026, 6, 1)}
      showOutsideDays={showOutsideDays}
    />
  );
}

export const Range: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`mode="range"`로 시작~종료 날짜 구간을 선택한다. 구간 중간 날짜는 `range_middle`, 양 끝은 `range_start`/`range_end` 토큰 배경으로 표시된다.',
      },
    },
  },
  render: (args) => <RangeDemo showOutsideDays={args.showOutsideDays} />,
};

export const DisabledDates: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`disabled` matcher로 특정 날짜(요일, 범위, 커스텀 함수 등)를 선택 불가 처리한다. 예시는 토요일/일요일을 비활성화한다.',
      },
    },
  },
  render: (args) => (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 6, 1)}
      disabled={{ dayOfWeek: [0, 6] }}
      showOutsideDays={args.showOutsideDays}
    />
  ),
};
