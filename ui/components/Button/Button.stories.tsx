import type { Meta, StoryObj } from '@storybook/react-vite';

import { TONES } from '../shared';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'success',
      ],
      description:
        '- **primary**: `--color-bg-accent` 배경,<br/>hover 시`--color-bg-accent-hover`\n' +
        '- **secondary**: primary보다 무게가 낮은 액션.<br/>`tone`으로 ADS Secondary 16색 중 하나를 고를 수 있고, 생략하면 중성(회색)\n' +
        '- **outline**: `--color-border-strong` 테두리,<br/>배경은 투명, hover 시 `--color-bg-subtle`\n' +
        '- **ghost**: 배경 투명,<br/>hover 시 `--color-bg-muted`\n' +
        '- **destructive**: `--color-bg-error` 배경,<br/>hover 시 `--color-bg-error-hover`\n' +
        '- **success**: `--color-bg-success` 배경,<br/>hover 시 `--color-bg-success-hover`\n\n',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        '- **sm**: `h-8`(32px) · `radius-md` · `text-sm`\n' +
        '- **md**: `h-10`(40px) · `radius-lg` · `text-sm`\n' +
        '- **lg**: `h-12`(48px) · `radius-lg` · `text-base`',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    variant: 'primary',
    children: 'Arcsquare',
    asChild: false,
  },
};

const VARIANTS: NonNullable<Story['args']>['variant'][] = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'success',
];

export const Variants: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
  {VARIANTS.map((variant) => (
    <Button key={variant} variant={variant}>
      {variant}
    </Button>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

const SIZES: NonNullable<Story['args']>['size'][] = ['sm', 'md', 'lg'];

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  {SIZES.map((size) => (
    <Button key={size} size={size}>
      {size}
    </Button>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {SIZES.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: { disabled: true },
};

export const SecondaryTones: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`variant="secondary"`는 `tone`으로 ADS Secondary 16색 중 하나를 고를 수 있습니다.<br/>' +
          '색에 *의미*를 담는 게 아니라 **갈래를 구분**하는 용도입니다. → 의미가 있는 상태는 `destructive`/`success`를 쓰세요.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button {...args} variant="secondary">
        (tone 없음)
      </Button>
      {TONES.map((tone) => (
        <Button {...args} key={tone} variant="secondary" tone={tone}>
          {tone}
        </Button>
      ))}
    </div>
  ),
};
