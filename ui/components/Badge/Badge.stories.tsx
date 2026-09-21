import type { Meta, StoryObj } from '@storybook/react-vite';

import { TONES } from '../shared';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'error',
      ],
      description:
        '- **primary**: `--color-accent-muted` 배경,<br/>`--color-text-on-solid` 텍스트\n' +
        '- **secondary**: 갈래 구분용.<br/>`tone`으로 ADS Secondary 16색 중 하나를 고를 수 있고, 생략하면 중성(회색)\n' +
        '- **destructive**: `--color-bg-error` 배경,<br/>`--color-text-on-solid` 텍스트\n' +
        '- **outline**: 배경은 투명,<br/>`--color-border-strong` 테두리\n' +
        '- **success**: `--color-bg-success-subtle` 배경,<br/>`--color-text-success-strong` 텍스트\n' +
        '- **warning**: `--color-bg-warning-subtle` 배경,<br/>`--color-text-warning-strong` 텍스트\n' +
        '- **error**: `--color-bg-error-subtle` 배경,<br/>`--color-text-error-strong` 텍스트\n\n',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {
  args: {
    children: 'Arcsquare',
    variant: 'primary',
  },
};

const VARIANTS: NonNullable<Story['args']>['variant'][] = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'success',
  'warning',
  'error',
];

export const Variants: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {VARIANTS.map((variant) => (
    <Badge key={variant} variant={variant}>
      {variant}
    </Badge>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const SecondaryTones: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`variant="secondary"`에 `tone`을 주면 ADS Secondary 16색 중 하나로 바뀝니다.<br/>' +
          '부서·카테고리·태그처럼 **서로 다르다는 것만** 보여주면 되는 곳에 씁니다.<br/>' +
          '상태색(success/warning/error)은 의미가 고정이라 `tone`이 적용되지 않습니다.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge variant="secondary">(tone 없음)</Badge>
      {TONES.map((tone) => (
        <Badge key={tone} variant="secondary" tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};
