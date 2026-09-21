import {
  Controls,
  Description,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, Pencil, Trash2 } from 'lucide-react';

import { Button } from '../Button/Button';
import {
  Tooltip,
  TooltipContent,
  type TooltipContentProps,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const PARTS = [
  {
    name: 'TooltipProvider',
    description:
      '앱 루트에 한 번 감싸면 여러 Tooltip이 `delayDuration`/`skipDelayDuration`을 공유한다.',
    code: `<TooltipProvider delayDuration={300}>
  {/* 앱 전체 */}
</TooltipProvider>`,
  },
  {
    name: 'Tooltip / TooltipTrigger',
    description:
      '`Tooltip`이 열림/닫힘 상태를 관리한다. `TooltipTrigger`는 `asChild`로 아이콘 버튼 등과 조합한다.',
    code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="sm" aria-label="정보 보기">
      <Info className="size-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>변경 사항은 자동으로 저장됩니다.</TooltipContent>
</Tooltip>`,
  },
  {
    name: 'TooltipContent',
    description:
      '축약 정보를 짧게 보여주는 말풍선. 배경을 반전시켜 본문과 뚜렷하게 구분한다. `backgroundColor`/`color`로 색상을 덮어쓸 수 있으며, 배경색을 바꾸면 화살표 색도 함께 맞춰진다.',
    code: `<TooltipContent side="top" sideOffset={4}>
  설명 텍스트
</TooltipContent>

<TooltipContent backgroundColor="#2563eb" color="#ffffff">
  강조 설명 텍스트
</TooltipContent>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />

    <Primary />
    <Controls />

    <h2>구성 요소</h2>
    {PARTS.map((part) => (
      <div key={part.name} style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 4 }}>{part.name}</h3>
        <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
          {part.description}
        </Markdown>
        <Source code={part.code} language="tsx" />
      </div>
    ))}

    <Stories includePrimary={false} title="다른 예시" />
  </>
);

type TooltipDemoProps = {
  side?: NonNullable<TooltipContentProps['side']>;
  sideOffset?: number;
  delayDuration?: number;
  backgroundColor?: string;
  color?: string;
};

/**
 * side/sideOffset/delayDuration/backgroundColor/color를 Controls로 조정해볼 수 있는 데모.
 * Storybook 전용, 공개 API 아님 (PopoverDemo와 동일 패턴).
 */
function TooltipDemo({
  side = 'top',
  sideOffset = 4,
  delayDuration = 400,
  backgroundColor,
  color,
}: TooltipDemoProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            aria-label="정보 보기"
          >
            <Info className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          backgroundColor={backgroundColor}
          color={color}
        >
          변경 사항은 자동으로 저장됩니다.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const meta: Meta<typeof TooltipDemo> = {
  title: 'Components/Overlays/Tooltip',
  component: TooltipDemo,
  args: {
    side: 'top',
    sideOffset: 4,
    delayDuration: 400,
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'TooltipContent가 표시되는 방향',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'TooltipContent과의 간격(px)',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'hover/focus한 뒤 Tooltip이 뜨기까지의 지연 시간(ms)',
    },
    backgroundColor: {
      control: 'color',
      description: 'TooltipContent 배경색 (지정 시 화살표 색도 함께 바뀜)',
    },
    color: {
      control: 'color',
      description: 'TooltipContent 글자색',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          '`@radix-ui/react-tooltip` 기반 툴팁. 축약된 정보를 hover/focus 시 짧게 설명할 때 쓴다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TooltipDemo>;

export const Basic: Story = {
  args: {
    delayDuration: 400,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        aria-label="정보 보기"
      >
        <Info className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>변경 사항은 자동으로 저장됩니다.</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    },
  },
};

export const IconButtons: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<TooltipProvider>
  <div className="flex items-center gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="수정"
        >
          <Pencil className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>수정</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="삭제"
        >
          <Trash2 className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>삭제</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>`,
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="수정"
            >
              <Pencil className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>수정</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label="삭제"
            >
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>삭제</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

export const CustomColors: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="정보 보기">
        <Info className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent backgroundColor="#2563eb" color="#ffffff">
      강조 설명 텍스트
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            aria-label="정보 보기"
          >
            <Info className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent backgroundColor="#2563eb" color="#ffffff">
          강조 설명 텍스트
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
