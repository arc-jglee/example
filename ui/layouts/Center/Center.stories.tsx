import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Spinner } from '../../components/Spinner/Spinner';
import { Center } from './Center';

const meta: Meta<typeof Center> = {
  title: 'Layouts/Center',
  component: Center,
  tags: ['autodocs'],
  args: {
    inline: false,
  },
  argTypes: {
    inline: { control: 'boolean', description: 'inline-flex 사용' },
  },
};

export default meta;

type Story = StoryObj<typeof Center>;

export const Basic: Story = {
  render: (args) => (
    <Center
      {...args}
      className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)]"
    >
      <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] px-4 py-2 text-sm text-[var(--color-text-on-solid)]">
        Centered
      </div>
    </Center>
  ),
};

export const LoadingSpinner: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Center
      {...args}
      className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)]"
    >
      <Spinner size="xl" variant="primary" />
    </Center>
  ),
};

export const LoadingSkeleton: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Center
      {...args}
      className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] p-6"
    >
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </Center>
  ),
};
