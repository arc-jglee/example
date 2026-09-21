import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../Input/Input';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Form/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: '이메일',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {};

export const WithInput: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="email">
        이메일
      </Label>
      <Input id="email" type="email" placeholder="name@arcsquare.ai" />
    </div>
  ),
};

export const Disabled: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="disabled-input">
        비활성
      </Label>
      <Input
        id="disabled-input"
        className="peer"
        placeholder="disabled"
        disabled
      />
    </div>
  ),
};
