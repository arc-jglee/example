import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '스위치 크기. 생략하면 `md`(기존 크기)로 렌더링된다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
    </div>
  ),
};

export const Checked: Story = {
  tags: ['!dev'],
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div
      className="flex items-center justify-between gap-4"
      style={{ width: 320 }}
    >
      <Label htmlFor="airplane-mode">비행기 모드</Label>
      <Switch {...args} id="airplane-mode" />
    </div>
  ),
};
