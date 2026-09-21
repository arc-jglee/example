import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layouts/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: {
      control: { type: 'number', step: 0.1 },
      description:
        '가로/세로 비율(width / height).<br/>예: 16/9 ≈ 1.78 | 1 | 4/3 ≈ 1.33',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  render: (args) => (
    <div className="w-80">
      <AspectRatio
        {...args}
        className="rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)]"
      >
        <div className="text-md flex h-full w-full items-center justify-center text-[var(--color-text-tertiary)]">
          {args.ratio?.toFixed(2)}
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Ratios: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex gap-4">
  {([16 / 9, 4 / 3, 1] as const).map((ratio) => (
    <div key={ratio} className="w-48">
      <AspectRatio
        ratio={ratio}
        className="rounded-[var(--radius-lg)] bg-[var(--color-bg-accent-subtle)]"
      >
        <div className="text-md flex h-full w-full items-center justify-center text-[var(--color-text-accent)]">
          {ratio.toFixed(2)}
        </div>
      </AspectRatio>
    </div>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex gap-4">
      {([16 / 9, 4 / 3, 1] as const).map((ratio) => (
        <div key={ratio} className="w-48">
          <AspectRatio
            ratio={ratio}
            className="rounded-[var(--radius-lg)] bg-[var(--color-bg-accent-subtle)]"
          >
            <div className="text-md flex h-full w-full items-center justify-center text-[var(--color-text-accent)]">
              {ratio.toFixed(2)}
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};
