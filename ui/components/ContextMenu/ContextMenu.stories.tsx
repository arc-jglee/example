import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from './ContextMenu';

type ContextMenuDemoProps = {
  modal?: boolean;
  disabled?: boolean;
};

function ContextMenuDemo({ modal, disabled }: ContextMenuDemoProps) {
  return (
    <ContextMenu modal={modal}>
      <ContextMenuTrigger className="flex h-40 w-96 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] text-sm text-[var(--color-text-disabled)] select-none">
        여기에서 마우스 오른쪽 클릭
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuItem>
            뒤로
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled={disabled}>
            새로고침
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>복사</ContextMenuItem>
          <ContextMenuItem variant="destructive">삭제</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const meta: Meta<typeof ContextMenuDemo> = {
  title: 'Components/Overlays/ContextMenu',
  component: ContextMenuDemo,
  tags: ['autodocs'],
  args: {
    modal: true,
    disabled: false,
  },
  argTypes: {
    modal: {
      control: 'boolean',
      description: '모달 여부 (열려 있는 동안 외부 스크롤 차단)',
    },
    disabled: {
      control: 'boolean',
      description: '"새로고침" 항목의 비활성화 여부',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenuDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<ContextMenu>
  <ContextMenuTrigger className="flex h-40 w-96 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] text-sm text-[var(--color-text-disabled)] select-none">
    여기에서 마우스 오른쪽 클릭
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuGroup>
      <ContextMenuItem>
        뒤로
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        새로고침
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem>복사</ContextMenuItem>
      <ContextMenuItem variant="destructive">삭제</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`,
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
        code: `<ContextMenu>
  <ContextMenuTrigger className="flex h-40 w-96 items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] text-sm text-[var(--color-text-disabled)] select-none">
    여기에서 마우스 오른쪽 클릭
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuGroup>
      <ContextMenuItem>
        뒤로
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem disabled>
        새로고침
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuItem>복사</ContextMenuItem>
      <ContextMenuItem variant="destructive">삭제</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuContent>
</ContextMenu>`,
      },
    },
  },
};
