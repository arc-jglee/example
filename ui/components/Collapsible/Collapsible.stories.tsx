import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

const NOTICES = [
  '7월 정기 점검 안내 (7/20 02:00~04:00)',
  '결제 시스템 업데이트 완료',
  '모바일 앱 v2.3.0 출시',
];

type CollapsibleDemoProps = {
  defaultOpen?: boolean;
  disabled?: boolean;
};

function CollapsibleDemo({ defaultOpen, disabled }: CollapsibleDemoProps) {
  return (
    <Collapsible
      key={String(defaultOpen)}
      defaultOpen={defaultOpen}
      disabled={disabled}
      className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4"
    >
      <CollapsibleTrigger>전체 공지사항 보기</CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="mt-2 space-y-2">
          {NOTICES.map((notice) => (
            <li
              key={notice}
              className="rounded-[var(--radius-md)] border border-[var(--color-border-default)] px-3 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-inverse)] hover:text-[var(--color-text-inverse)]"
            >
              {notice}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

const meta: Meta<typeof CollapsibleDemo> = {
  title: 'Components/Disclosure/Collapsible',
  component: CollapsibleDemo,
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    disabled: false,
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '초기 렌더링 시 콘텐츠가 펼쳐진 상태로 시작할지 여부',
    },
    disabled: {
      control: 'boolean',
      description: '펼치고 접는 동작을 비활성화할지 여부',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CollapsibleDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Collapsible className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4">
  <CollapsibleTrigger>전체 공지사항 보기</CollapsibleTrigger>
  <CollapsibleContent>
    <ul className="mt-2 space-y-2">
      <li>7월 정기 점검 안내 (7/20 02:00~04:00)</li>
      <li>결제 시스템 업데이트 완료</li>
      <li>모바일 앱 v2.3.0 출시</li>
    </ul>
  </CollapsibleContent>
</Collapsible>`,
      },
    },
  },
};

export const Open: Story = {
  tags: ['!dev'],
  args: {
    defaultOpen: true,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Collapsible defaultOpen className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4">
  <CollapsibleTrigger>전체 공지사항 보기</CollapsibleTrigger>
  <CollapsibleContent>
    <ul className="mt-2 space-y-2">
      <li>7월 정기 점검 안내 (7/20 02:00~04:00)</li>
      <li>결제 시스템 업데이트 완료</li>
      <li>모바일 앱 v2.3.0 출시</li>
    </ul>
  </CollapsibleContent>
</Collapsible>`,
      },
    },
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Collapsible disabled className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4">
  <CollapsibleTrigger>전체 공지사항 보기</CollapsibleTrigger>
  <CollapsibleContent>
    <ul className="mt-2 space-y-2">
      <li>7월 정기 점검 안내 (7/20 02:00~04:00)</li>
      <li>결제 시스템 업데이트 완료</li>
      <li>모바일 앱 v2.3.0 출시</li>
    </ul>
  </CollapsibleContent>
</Collapsible>`,
      },
    },
  },
};
