import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Toggles/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    thumbSize: 'md',
  },
  argTypes: {
    thumbSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        '손잡이(동그라미) 크기\n' +
        '- **sm**: `size-3`(12px)\n' +
        '- **md**: `size-4`(16px, 기본값)\n' +
        '- **lg**: `size-5`(20px)',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`@radix-ui/react-slider` 기반 연속값 입력 컨트롤.<br/>밝기·대비·투명도·두께처럼 범위 안에서 값을 고르는 곳에 쓴다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    defaultValue: [50],
  },
};

const THUMB_SIZES: NonNullable<Story['args']>['thumbSize'][] = [
  'sm',
  'md',
  'lg',
];

export const ThumbSizes: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
  {THUMB_SIZES.map((thumbSize) => (
    <Slider key={thumbSize} defaultValue={[50]} thumbSize={thumbSize} />
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}
    >
      {THUMB_SIZES.map((thumbSize) => (
        <Slider key={thumbSize} defaultValue={[50]} thumbSize={thumbSize} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    defaultValue: [50],
    disabled: true,
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ width: 320 }}>
  <Label htmlFor="brightness">밝기</Label>
  <Slider id="brightness" defaultValue={[50]} className="mt-2" />
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ width: 320 }}>
      <Label htmlFor="brightness">밝기</Label>
      <Slider id="brightness" defaultValue={[50]} className="mt-2" />
    </div>
  ),
};

export const Range: Story = {
  tags: ['!dev'],
  args: {
    defaultValue: [20, 80],
  },
  argTypes: {
    defaultValue: {
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'defaultValue에 값을 두 개 주면 구간(range)을 선택하는 두 개의 손잡이가 렌더링된다.',
      },
      source: {
        type: 'code',
        code: `<Slider defaultValue={[20, 80]} />`,
      },
    },
  },
  render: (args) => (
    // defaultValue는 비제어 prop이라 최초 마운트 시에만 읽힌다.
    <div style={{ width: 320 }}>
      <Slider key={JSON.stringify(args.defaultValue)} {...args} />
    </div>
  ),
};
