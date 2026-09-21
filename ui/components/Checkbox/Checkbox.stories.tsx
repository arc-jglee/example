import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '크기 조절. 생략하면 `md`(기존 크기)로 렌더링된다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Checkbox size="sm" defaultChecked />
<Checkbox size="md" defaultChecked />`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox size="sm" defaultChecked />
      <Checkbox size="md" defaultChecked />
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
    <div className="flex items-center gap-3">
      <Checkbox {...args} id="terms" />
      <Label htmlFor="terms">이용약관에 동의합니다</Label>
    </div>
  ),
};

export const Group: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex flex-col gap-4">
  <div className="flex items-center gap-3">
    <Checkbox id="group-terms" defaultChecked />
    <Label htmlFor="group-terms">이용약관에 동의합니다</Label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox id="group-marketing" />
    <Label htmlFor="group-marketing">마케팅 수신 동의</Label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox id="group-disabled" disabled />
    <Label htmlFor="group-disabled">비활성 항목</Label>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="group-terms" defaultChecked />
        <Label htmlFor="group-terms">이용약관에 동의합니다</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="group-marketing" />
        <Label htmlFor="group-marketing">마케팅 수신 동의</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="group-disabled" disabled />
        <Label htmlFor="group-disabled">비활성 항목</Label>
      </div>
    </div>
  ),
};
