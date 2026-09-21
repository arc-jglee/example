import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

import { Label } from '../Label/Label';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

// size는 RadioGroup이 아니라 RadioGroupItem의 prop이라, component를 RadioGroup에
// 맞춘 meta의 자동 args 테이블에는 안 잡힌다. 데모용으로만 args에 얹고, render
// 안에서 각 RadioGroupItem에 직접 넘긴다.
type RadioGroupStoryArgs = ComponentProps<typeof RadioGroup> & {
  size?: ComponentProps<typeof RadioGroupItem>['size'];
};

const meta: Meta<RadioGroupStoryArgs> = {
  title: 'Components/Toggles/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    defaultValue: 'standard',
    disabled: false,
    size: 'md',
  },
  argTypes: {
    defaultValue: {
      control: 'select',
      options: ['standard', 'express', 'pickup'],
      description: '초기 선택값. 아래 데모의 세 항목 중 하나를 고른다.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: '크기 조절. 생략하면 `md`(기존 크기)로 렌더링된다.',
    },
  },
  render: ({ size, ...args }) => (
    // defaultValue는 비제어 prop이라 최초 마운트 시에만 읽힌다. Controls에서
    // 값을 바꿔도 이미 마운트된 컴포넌트에는 반영되지 않으므로, key를 걸어
    // defaultValue가 바뀔 때마다 강제로 리마운트되게 한다.
    <RadioGroup key={args.defaultValue} {...args}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="standard" id="standard" size={size} />
        <Label htmlFor="standard">일반 배송</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="express" id="express" size={size} />
        <Label htmlFor="express">빠른 배송</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="pickup" id="pickup" size={size} />
        <Label htmlFor="pickup">매장 픽업</Label>
      </div>
    </RadioGroup>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
};

export const DisabledItem: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<RadioGroup defaultValue="standard">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="standard" id="disabled-item-standard" />
    <Label htmlFor="disabled-item-standard">일반 배송</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="express" id="disabled-item-express" disabled />
    <Label htmlFor="disabled-item-express">빠른 배송 (품절)</Label>
  </div>
</RadioGroup>`,
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="standard">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="standard" id="disabled-item-standard" />
        <Label htmlFor="disabled-item-standard">일반 배송</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="express" id="disabled-item-express" disabled />
        <Label htmlFor="disabled-item-express">빠른 배송 (품절)</Label>
      </div>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<RadioGroup defaultValue="sm" className="flex-row items-center gap-6">
  <RadioGroupItem value="sm" size="sm" id="size-sm" />
  <RadioGroupItem value="md" size="md" id="size-md" />
</RadioGroup>`,
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="sm" className="flex-row items-center gap-6">
      <RadioGroupItem value="sm" size="sm" id="size-sm" />
      <RadioGroupItem value="md" size="md" id="size-md" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<RadioGroup
  defaultValue="light"
  orientation="horizontal"
  className="flex-row gap-6"
>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="light" id="theme-light" />
    <Label htmlFor="theme-light">라이트</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="dark" id="theme-dark" />
    <Label htmlFor="theme-dark">다크</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="system" id="theme-system" />
    <Label htmlFor="theme-system">시스템</Label>
  </div>
</RadioGroup>`,
      },
    },
  },
  render: () => (
    <RadioGroup
      defaultValue="light"
      orientation="horizontal"
      className="flex-row gap-6"
    >
      <div className="flex items-center gap-3">
        <RadioGroupItem value="light" id="theme-light" />
        <Label htmlFor="theme-light">라이트</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="dark" id="theme-dark" />
        <Label htmlFor="theme-dark">다크</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="system" id="theme-system" />
        <Label htmlFor="theme-system">시스템</Label>
      </div>
    </RadioGroup>
  ),
};
