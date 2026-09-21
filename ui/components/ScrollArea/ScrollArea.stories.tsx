import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '../Separator/Separator';
import { ScrollArea, ScrollBar } from './ScrollArea';

const TAGS = Array.from({ length: 50 }, (_, index) => `태그 ${index + 1}`);

function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium text-[var(--color-text-primary)]">
          태그 목록
        </h4>
        {TAGS.map((tag) => (
          <div key={tag}>
            <div className="py-2 text-sm text-[var(--color-text-secondary)]">
              {tag}
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

const ARTWORKS = Array.from({ length: 8 }, (_, index) => index + 1);

function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {ARTWORKS.map((artwork) => (
          <div
            key={artwork}
            className="flex size-24 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] text-sm font-medium text-[var(--color-text-accent)]"
          >
            작품 {artwork}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

const meta: Meta<typeof ScrollAreaDemo> = {
  title: 'Components/Data Display/ScrollArea',
  component: ScrollAreaDemo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ScrollAreaDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<ScrollArea className="h-72 w-48 rounded-[var(--radius-lg)] border border-[var(--color-border-default)]">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium text-[var(--color-text-primary)]">
      태그 목록
    </h4>
    {tags.map((tag) => (
      <div key={tag}>
        <div className="py-2 text-sm text-[var(--color-text-secondary)]">
          {tag}
        </div>
        <Separator />
      </div>
    ))}
  </div>
</ScrollArea>`,
      },
    },
  },
};

export const Horizontal: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<ScrollArea className="w-96 rounded-[var(--radius-lg)] border border-[var(--color-border-default)] whitespace-nowrap">
  <div className="flex w-max gap-4 p-4">
    {artworks.map((artwork) => (
      <div
        key={artwork}
        className="flex size-24 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] text-sm font-medium text-[var(--color-text-accent)]"
      >
        작품 {artwork}
      </div>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`,
      },
    },
  },
  render: () => <ScrollAreaHorizontalDemo />,
};
