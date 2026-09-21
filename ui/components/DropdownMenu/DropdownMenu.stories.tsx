import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogOut, Settings, User } from 'lucide-react';

import { Button } from '../Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

type DropdownMenuDemoProps = {
  triggerLabel?: string;
  defaultOpen?: boolean;
  disabled?: boolean;
};

function DropdownMenuDemo({
  triggerLabel = '드롭다운',
  defaultOpen,
  disabled,
}: DropdownMenuDemoProps) {
  return (
    <DropdownMenu key={String(defaultOpen)} defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="md"
          className="w-24 data-[state=open]:border-[var(--color-border-accent)]"
        >
          {triggerLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>내 계정</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            프로필
          </DropdownMenuItem>
          <DropdownMenuItem disabled={disabled}>
            <Settings />
            설정
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta: Meta<typeof DropdownMenuDemo> = {
  title: 'Components/Overlays/DropdownMenu',
  component: DropdownMenuDemo,
  tags: ['autodocs'],
  args: {
    triggerLabel: '드롭다운',
    defaultOpen: false,
    disabled: false,
  },
  argTypes: {
    triggerLabel: {
      control: 'text',
      description: '트리거 버튼에 표시되는 텍스트',
    },
    defaultOpen: {
      control: 'boolean',
      description: '초기 렌더링 시 드롭다운이 열린 상태로 시작할지 여부',
    },
    disabled: {
      control: 'boolean',
      description: '"설정" 항목의 비활성화 여부',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenuDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="md"
      className="w-24 data-[state=open]:border-[var(--color-border-accent)]"
    >
      드롭다운
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-64">
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <User />
        프로필
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings />
        설정
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LogOut />
      로그아웃
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
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
        code: `<DropdownMenu defaultOpen>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="md"
      className="w-24 data-[state=open]:border-[var(--color-border-accent)]"
    >
      드롭다운
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-64">
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <User />
        프로필
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings />
        설정
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LogOut />
      로그아웃
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    },
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    defaultOpen: true,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<DropdownMenu defaultOpen>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="md"
      className="w-24 data-[state=open]:border-[var(--color-border-accent)]"
    >
      드롭다운
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-64">
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <User />
        프로필
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Settings />
        설정
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <LogOut />
      로그아웃
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    },
  },
};
