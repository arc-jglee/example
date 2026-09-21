import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: '메시지를 입력하세요...',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message">메시지</Label>
      <Textarea {...args} id="message" />
    </div>
  ),
};
