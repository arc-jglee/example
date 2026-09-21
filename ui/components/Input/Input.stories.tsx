import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Form/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    type: 'text',
    placeholder: 'name@arcsquare.ai',
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'search',
        'tel',
        'url',
        'number',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    type: 'email',
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    placeholder: 'disabled',
    disabled: true,
  },
};

export const WithLabel: Story = {
  tags: ['!dev'],
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">이메일</Label>
      <Input {...args} id="email" type="email" />
    </div>
  ),
};

const TYPE_EXAMPLES: {
  type: NonNullable<Story['args']>['type'];
  label: string;
  placeholder?: string;
}[] = [
  { type: 'text', label: '이름', placeholder: '홍길동' },
  { type: 'email', label: '이메일', placeholder: 'name@arcsquare.ai' },
  { type: 'password', label: '비밀번호', placeholder: '••••••••' },
  { type: 'search', label: '검색', placeholder: '검색어를 입력하세요' },
  { type: 'tel', label: '전화번호', placeholder: '010-1234-5678' },
  { type: 'url', label: 'URL', placeholder: 'https://arcsquare.ai' },
  { type: 'number', label: '수량', placeholder: '0' },
  { type: 'date', label: '날짜' },
  { type: 'time', label: '시간' },
  { type: 'datetime-local', label: '날짜와 시간' },
  { type: 'month', label: '월' },
  { type: 'week', label: '주' },
];

export const Types: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 420,
  }}
>
  {TYPE_EXAMPLES.map(({ type, label, placeholder }) => (
    <div key={type} className="flex flex-col gap-2">
      <Label htmlFor={\`type-\${type}\`}>{label}</Label>
      <Input id={\`type-\${type}\`} type={type} placeholder={placeholder} />
    </div>
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
        gap: 16,
        maxWidth: 420,
      }}
    >
      {TYPE_EXAMPLES.map(({ type, label, placeholder }) => (
        <div key={type} className="flex flex-col gap-2">
          <Label htmlFor={`type-${type}`}>{label}</Label>
          <Input id={`type-${type}`} type={type} placeholder={placeholder} />
        </div>
      ))}
    </div>
  ),
};
