import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutGrid, List } from 'lucide-react';
import type { ComponentProps } from 'react';

import { TONES } from '../shared';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

/** `tone`/`size`는 `ToggleGroup`(Root)이 아니라 `ToggleGroupItem` 각각의
 * prop이다 — 컨트롤에서 만지기 쉽게 메타에 얹어 두고 렌더에서 모든 아이템에
 * 그대로 넘긴다. */
type StoryArgs = ComponentProps<typeof ToggleGroup> & {
  tone?: ComponentProps<typeof ToggleGroupItem>['tone'];
  size?: ComponentProps<typeof ToggleGroupItem>['size'];
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Toggles/ToggleGroup',
  component: ToggleGroup as unknown as Meta<StoryArgs>['component'],
  tags: ['autodocs'],
  args: {
    type: 'single',
    defaultValue: 'all',
    disabled: false,
    tone: 'default',
    size: 'md',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description:
        '`single`이면 하나만,<br/>`multiple`이면 여러 개를 동시에 선택 가능.',
    },
    tone: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', ...TONES],
      description:
        '상태 색 — `ToggleGroupItem`의 속성.<br/>기본은 브랜드 accent.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        '`ToggleGroupItem`의 속성.<br/>높이·좌우 패딩(자세한 예시는 Sizes 참고).',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`@radix-ui/react-toggle-group` 기반 컨트롤. 여러 옵션 중 하나만 강조 표시하고 싶을 때 쓴다.<br/>`type="single"`이면 하나만, `type="multiple"`이면 여러 개를 동시에 선택할 수 있다.',
      },
    },
  },
  render: ({ tone, size, ...args }) => (
    // defaultValue는 비제어 prop이라 최초 마운트 시에만 읽힌다.
    <ToggleGroup key={String(args.defaultValue)} {...args}>
      <ToggleGroupItem value="all" tone={tone} size={size}>
        전체
      </ToggleGroupItem>
      <ToggleGroupItem value="active" tone={tone} size={size}>
        진행중
      </ToggleGroupItem>
      <ToggleGroupItem value="done" tone={tone} size={size}>
        완료
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Basic: Story = {};

export const Disabled: Story = {
  tags: ['!dev'],
  args: {
    disabled: true,
  },
};

export const IconOnly: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<ToggleGroup type="single" defaultValue="list">
  <ToggleGroupItem value="list" aria-label="리스트 보기">
    <List className="size-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="이미지 보기">
    <LayoutGrid className="size-4" />
  </ToggleGroupItem>
</ToggleGroup>`,
      },
    },
  },
  render: () => (
    <ToggleGroup type="single" defaultValue="list">
      <ToggleGroupItem value="list" aria-label="리스트 보기">
        <List className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="이미지 보기">
        <LayoutGrid className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Tones: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '기본은 브랜드 accent, 나머지 셋은 상태색(error/warning/success)이다.<br/>항목(`ToggleGroupItem`)마다 다르게 줄 수 있다. — 예: "겸직"만 success로 강조.',
      },
      source: {
        type: 'code',
        code: `<ToggleGroup type="single" defaultValue="success">
  <ToggleGroupItem value="default" tone="default">기본</ToggleGroupItem>
  <ToggleGroupItem value="success" tone="success">success</ToggleGroupItem>
  <ToggleGroupItem value="warning" tone="warning">warning</ToggleGroupItem>
  <ToggleGroupItem value="error" tone="error">error</ToggleGroupItem>
</ToggleGroup>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(['default', 'success', 'warning', 'error'] as const).map((tone) => (
        <ToggleGroup key={tone} type="single" defaultValue={tone}>
          <ToggleGroupItem value={tone} tone={tone}>
            {tone}
          </ToggleGroupItem>
          <ToggleGroupItem value="off" tone={tone}>
            off
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const SecondaryTones: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'ADS Secondary 팔레트 16색<br/>' +
          '부서·카테고리처럼 "서로 다르다"만 보여주면 되는 곳에 쓴다.',
      },
      source: {
        type: 'code',
        code: `<ToggleGroup type="single" defaultValue="blue">
  <ToggleGroupItem value="blue" tone="blue">blue</ToggleGroupItem>
  <ToggleGroupItem value="off" tone="blue">off</ToggleGroupItem>
</ToggleGroup>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {TONES.map((tone) => (
        <ToggleGroup key={tone} type="single" defaultValue={tone}>
          <ToggleGroupItem value={tone} tone={tone}>
            {tone}
          </ToggleGroupItem>
          <ToggleGroupItem value="off" tone={tone}>
            off
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<ToggleGroup type="single" defaultValue="all">
  <ToggleGroupItem value="all" size="sm">전체</ToggleGroupItem>
  <ToggleGroupItem value="active" size="sm">진행중</ToggleGroupItem>
  <ToggleGroupItem value="done" size="sm">완료</ToggleGroupItem>
</ToggleGroup>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ToggleGroup key={size} type="single" defaultValue="all">
          <ToggleGroupItem value="all" size={size}>
            전체
          </ToggleGroupItem>
          <ToggleGroupItem value="active" size={size}>
            진행중
          </ToggleGroupItem>
          <ToggleGroupItem value="done" size={size}>
            완료
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};
