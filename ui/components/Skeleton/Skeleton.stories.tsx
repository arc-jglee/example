import type { Meta, StoryObj } from '@storybook/react-vite';

import { CardDemo } from '../../patterns/Card/CardDemo';
import { CardSkeleton } from '../../patterns/Card/CardSkeleton';
import { Avatar, AvatarFallback } from '../Avatar/Avatar';
import { Label } from '../Label/Label';
import { Skeleton } from './Skeleton';

type SkeletonDemoProps = {
  loading?: boolean;
};

function SkeletonDemo({ loading = true }: SkeletonDemoProps) {
  if (!loading) {
    return (
      <div className="flex w-72 items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback variant="primary">JL</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <Label>이재건</Label>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            SW 엔지니어
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-72 items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

const meta: Meta<typeof SkeletonDemo> = {
  title: 'Components/Feedback/Skeleton',
  component: SkeletonDemo,
  tags: ['autodocs'],
  args: {
    loading: true,
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: '로딩 중 상태와 실제 콘텐츠 상태를 전환',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SkeletonDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex w-72 items-center gap-4">
  <Skeleton className="size-12 shrink-0 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-4 w-24" />
  </div>
</div>`,
      },
    },
  },
};

export const Loaded: Story = {
  tags: ['!dev'],
  args: {
    loading: false,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex w-72 items-center gap-4">
  <Avatar size="lg">
    <AvatarFallback variant="primary">JL</AvatarFallback>
  </Avatar>
  <div className="space-y-1">
    <Label>이재건</Label>
    <p className="text-sm text-[var(--color-text-tertiary)]">
      SW 엔지니어
    </p>
  </div>
</div>`,
      },
    },
  },
};

export const Card: Story = {
  tags: ['!dev'],
  render: (args) => (args.loading ? <CardSkeleton /> : <CardDemo />),
};
