import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '../../utils/cn';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layouts/Grid',
  component: Grid,
  tags: ['autodocs'],
  args: {
    columns: 3,
    gap: 4,
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12, step: 1 },
      description: '열 개수(1~12)',
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 6, 8],
      description: '셀 사이 간격(spacing 토큰)',
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch'],
      description: '셀의 교차축 정렬(align-items)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

const Cell = ({ n }: { n: number }) => (
  <div className="text-md rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] p-4 text-center text-[var(--color-text-accent)]">
    {n}
  </div>
);

const areaClassName =
  'rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)] p-4';

export const Basic: Story = {
  render: (args) => (
    <Grid {...args} className={cn(args.className, areaClassName)}>
      {Array.from({ length: 6 }, (_, i) => (
        <Cell key={i} n={i + 1} />
      ))}
    </Grid>
  ),
};

const AlignCell = ({
  label,
  tall = false,
}: {
  label: string;
  tall?: boolean;
}) => (
  <div
    className={cn(
      'flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-bg-accent-subtle)] text-sm text-[var(--color-text-accent)]',
      tall ? 'py-10' : 'py-2',
    )}
  >
    {label}
  </div>
);

export const AlignItems: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex flex-col gap-6">
  {(['stretch', 'start', 'center', 'end'] as const).map((align) => (
    <div key={align}>
      <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">
        align="{align}"
      </p>
      <Grid
        columns={3}
        gap={4}
        align={align}
        className="rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] p-4"
      >
        <AlignCell label="짧음" />
        <AlignCell label="긴 셀" tall />
        <AlignCell label="짧음" />
      </Grid>
    </div>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['stretch', 'start', 'center', 'end'] as const).map((align) => (
        <div key={align}>
          <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">
            align=&quot;{align}&quot;
          </p>
          <Grid
            columns={3}
            gap={4}
            align={align}
            className="rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] p-4"
          >
            <AlignCell label="짧음" />
            <AlignCell label="긴 셀" tall />
            <AlignCell label="짧음" />
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const Columns: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex flex-col gap-6">
  {([2, 3, 4] as const).map((columns) => (
    <div key={columns}>
      <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">
        columns={columns}
      </p>
      <Grid columns={columns} gap={3} className={areaClassName}>
        {Array.from({ length: columns * 2 }, (_, i) => (
          <Cell key={i} n={i + 1} />
        ))}
      </Grid>
    </div>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {([2, 3, 4] as const).map((columns) => (
        <div key={columns}>
          <p className="mb-2 text-xs text-[var(--color-text-tertiary)]">
            columns={columns}
          </p>
          <Grid columns={columns} gap={3} className={areaClassName}>
            {Array.from({ length: columns * 2 }, (_, i) => (
              <Cell key={i} n={i + 1} />
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
