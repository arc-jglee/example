import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart } from 'lucide-react';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggles/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    count: {
      control: 'number',
      description:
        'children 옆에 표시할 숫자.<br/>생략하면 숫자 영역이 렌더링되지 않는다.',
    },
    children: {
      control: false,
      description:
        '토글 안에 표시할 내용.<br/>텍스트뿐 아니라 아이콘 등..<br/>임의의 ReactNode를 조합할 수 있다.',
    },
    'aria-label': { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`@radix-ui/react-toggle`기반 눌림/안눌림 두 상태를 유지하는 버튼. 좋아요·즐겨찾기·음소거와 같은 상태를 표시해야 하는 곳에 쓴다.<br/>`Button`과 달리 `aria-pressed`/`data-state`가 자동으로 붙어, 상태를 스크린 리더에도 정확히 전달한다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  args: {
    'aria-label': '좋아요',
    children: (
      <>
        <Heart className="size-4 fill-current" />
        좋아요
      </>
    ),
  },
};

export const Outline: Story = {
  tags: ['!dev'],
  args: {
    variant: 'outline',
    'aria-label': '좋아요',
    children: (
      <>
        <Heart className="size-4 fill-current" />
        좋아요
      </>
    ),
  },
};

export const Pressed: Story = {
  tags: ['!dev'],
  args: {
    defaultPressed: true,
    'aria-label': '좋아요',
    children: (
      <>
        <Heart className="size-4 fill-current" />
        좋아요
      </>
    ),
  },
};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
    'aria-label': '좋아요',
    children: (
      <>
        <Heart className="size-4 fill-current" />
        좋아요
      </>
    ),
  },
};

export const LikeButton: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`count`를 주면 children 옆에 좋아요 수가 함께 표시된다.<br/>눌린 상태의 색은 `Toggle`이 이미 처리하므로, 숫자도 `Toggle`의 텍스트 색을 그대로 상속받는다.<br/>하트 아이콘도 lucide 아이콘의 기본 `fill="none"`을 `[&_svg]:fill-transparent`로 명시하고,<br/>눌렸을 때만 `data-[state=on]:[&_svg]:fill-current`로 덮어쓴다.',
      },
      source: {
        type: 'code',
        code: `<Toggle
  aria-label="좋아요"
  count={128}
  className="gap-1.5 [&_svg]:fill-transparent data-[state=on]:[&_svg]:fill-current"
>
  <Heart className="size-4" />
</Toggle>`,
      },
    },
  },
  render: () => (
    <Toggle
      aria-label="좋아요"
      count={128}
      className="gap-1.5 [&_svg]:fill-transparent data-[state=on]:[&_svg]:fill-current"
    >
      <Heart className="size-4" />
    </Toggle>
  ),
};
