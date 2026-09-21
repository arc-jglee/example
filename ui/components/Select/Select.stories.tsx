import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '../Label/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './Select';

type SelectDemoProps = {
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
};

function SelectDemo({ defaultValue, disabled, placeholder }: SelectDemoProps) {
  return (
    <Select
      key={defaultValue}
      defaultValue={defaultValue || undefined}
      disabled={disabled}
    >
      <SelectTrigger className="w-64">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">사과</SelectItem>
        <SelectItem value="banana">바나나</SelectItem>
        <SelectItem value="grape">포도</SelectItem>
      </SelectContent>
    </Select>
  );
}

const meta: Meta<typeof SelectDemo> = {
  title: 'Components/Form/Select',
  component: SelectDemo,
  tags: ['autodocs'],
  args: {
    defaultValue: 'apple',
    disabled: false,
    placeholder: '과일을 선택하세요',
  },
  argTypes: {
    defaultValue: {
      control: {
        type: 'select',
        labels: {
          '': '(없음)',
          apple: '사과',
          banana: '바나나',
          grape: '포도',
        },
      },
      options: ['', 'apple', 'banana', 'grape'],
      description: '초기 선택 값이 표시됩니다.',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
      description: '아무 값도 선택되지 않았을 때 표시되는 안내 문구',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectDemo>;

export const Basic: Story = {
  args: {
    defaultValue: '',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Select>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="과일을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">사과</SelectItem>
    <SelectItem value="banana">바나나</SelectItem>
    <SelectItem value="grape">포도</SelectItem>
  </SelectContent>
</Select>`,
      },
    },
  },
};

export const Placeholder: Story = {
  tags: ['!dev'],
  args: {
    defaultValue: undefined,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Select>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="과일을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">사과</SelectItem>
    <SelectItem value="banana">바나나</SelectItem>
    <SelectItem value="grape">포도</SelectItem>
  </SelectContent>
</Select>`,
      },
    },
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Select defaultValue="apple" disabled>
  <SelectTrigger className="w-64">
    <SelectValue placeholder="과일을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">사과</SelectItem>
    <SelectItem value="banana">바나나</SelectItem>
    <SelectItem value="grape">포도</SelectItem>
  </SelectContent>
</Select>`,
      },
    },
  },
};

export const WithGroupsAndLabel: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Select defaultValue="apple">
  <SelectTrigger className="w-64">
    <SelectValue placeholder="과일을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>과일</SelectLabel>
      <SelectItem value="apple">사과</SelectItem>
      <SelectItem value="banana">바나나</SelectItem>
      <SelectItem value="grape">포도</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>채소</SelectLabel>
      <SelectItem value="carrot">당근</SelectItem>
      <SelectItem value="potato">감자</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`,
      },
    },
  },
  render: () => (
    <Select defaultValue="apple">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="과일을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>과일</SelectLabel>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="grape">포도</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>채소</SelectLabel>
          <SelectItem value="carrot">당근</SelectItem>
          <SelectItem value="potato">감자</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<div className="flex flex-col gap-2">
  <Label htmlFor="fruit">과일</Label>
  <Select defaultValue="apple">
    <SelectTrigger id="fruit" className="w-64">
      <SelectValue placeholder="과일을 선택하세요" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">사과</SelectItem>
      <SelectItem value="banana">바나나</SelectItem>
      <SelectItem value="grape">포도</SelectItem>
    </SelectContent>
  </Select>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="fruit">과일</Label>
      <Select defaultValue="apple">
        <SelectTrigger id="fruit" className="w-64">
          <SelectValue placeholder="과일을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">사과</SelectItem>
          <SelectItem value="banana">바나나</SelectItem>
          <SelectItem value="grape">포도</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
