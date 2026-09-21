import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { fn } from 'storybook/test';

import { Button } from '../Button/Button';
import { Alert } from './Alert';

const ACTION_OPTIONS = ['none', 'cancel', 'confirm'] as const;

const ACTION_MAPPING: Record<(typeof ACTION_OPTIONS)[number], ReactNode> = {
  none: undefined,
  cancel: (
    <Button size="sm" variant="outline">
      취소
    </Button>
  ),
  confirm: (
    <Button size="sm" variant="primary">
      확인
    </Button>
  ),
};

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    title: '알림 제목',
    description: '알림에 대한 상세 설명이 여기에 표시됩니다.',
    action: 'none',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description:
        '- **default**: 좌측 색상 바 없음\n' +
        '- **success**: `--color-border-success` 좌측 바\n' +
        '- **warning**: `--color-border-warning` 좌측 바\n' +
        '- **error**: `--color-border-error` 좌측 바\n\n' +
        '정보성 알림은 상태가 아니므로 `default`로 표현합니다.',
    },
    icon: {
      control: false,
      description:
        '지정하지 않으면 variant별 기본 아이콘이 표시됩니다.\n' +
        '- **default**: 아이콘 없음\n' +
        '- **success**: `CheckCircle2`\n' +
        '- **warning**: `TriangleAlert`\n' +
        '- **error**: `XCircle`\n',
    },
    action: {
      control: 'select',
      options: ACTION_OPTIONS,
      mapping: ACTION_MAPPING,
      description:
        'Controls 패널에서는 예시로 취소/확인 버튼만 고를 수 있으며, 실제로는 임의의 ReactNode를 전달할 수 있습니다.',
    },
    onClose: { action: 'close' },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    variant: 'default',
  },
};

const VARIANT_EXAMPLES: Record<
  NonNullable<Story['args']>['variant'] & string,
  { title: string; description: string }
> = {
  default: {
    title: '알림',
    description: '색상 강조 없이 일반적인 안내를 전달할 때 사용합니다.',
  },
  success: {
    title: '저장되었습니다',
    description: '변경한 내용이 정상적으로 저장되었습니다.',
  },
  warning: {
    title: '저장 공간이 얼마 남지 않았습니다',
    description: '90% 이상 사용 중입니다. 불필요한 파일을 정리해주세요.',
  },
  error: {
    title: '전송에 실패했습니다',
    description:
      '네트워크 오류로 요청을 처리하지 못했습니다. 다시 시도해주세요.',
  },
};

const VARIANTS = Object.keys(
  VARIANT_EXAMPLES,
) as (keyof typeof VARIANT_EXAMPLES)[];

export const Variants: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 420,
  }}
>
  {VARIANTS.map((variant) => (
    <Alert
      key={variant}
      variant={variant}
      title={VARIANT_EXAMPLES[variant].title}
      description={VARIANT_EXAMPLES[variant].description}
    />
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        maxWidth: 420,
      }}
    >
      {VARIANTS.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          title={VARIANT_EXAMPLES[variant].title}
          description={VARIANT_EXAMPLES[variant].description}
        />
      ))}
    </div>
  ),
};

export const WithCloseButton: Story = {
  tags: ['!dev'],
  args: {
    variant: 'default',
    title: '닫기 버튼이 있는 알림',
    description: '닫기 버튼을 눌러 알림을 제거할 수 있습니다.',
    onClose: fn(),
  },
};

export const WithAction: Story = {
  tags: ['!dev'],
  args: {
    variant: 'error',
    title: '전송에 실패했습니다',
    description: '네트워크 오류로 요청을 처리하지 못했습니다.',
    action: (
      <Button size="sm" variant="outline">
        다시 시도
      </Button>
    ),
  },
};
