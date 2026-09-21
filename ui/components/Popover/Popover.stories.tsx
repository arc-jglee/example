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

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import {
  Popover,
  PopoverContent,
  type PopoverContentProps,
  PopoverTrigger,
} from './Popover';

const PARTS = [
  {
    name: 'Popover',
    description:
      '열림/닫힘 상태를 내부적으로 관리하며, `useState`를 통한 제어도 가능하다.',
    code: `<Popover>...</Popover>
// 또는 제어 모드
<Popover open={open} onOpenChange={setOpen}>...</Popover>`,
  },
  {
    name: 'PopoverTrigger',
    description:
      '팝오버를 여는 트리거. `asChild`로 Button과 같은 요소와 조합한다.',
    code: `<PopoverTrigger asChild>
  <Button variant="outline">열기</Button>
</PopoverTrigger>`,
  },
  {
    name: 'PopoverAnchor',
    description:
      '트리거와 별개로 팝오버가 붙을 기준 위치만 지정하고 싶을 때 쓴다 (예: 입력 커서 위치에 자동완성 팝오버를 띄우되, 클릭은 다른 요소가 트리거하는 경우).<br/>생략하면 `PopoverTrigger`가 기준이 된다.',
    code: `<Popover>
  <PopoverAnchor asChild>
    <input />
  </PopoverAnchor>
  <PopoverTrigger asChild>
    <button>옵션</button>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`,
  },
  {
    name: 'PopoverClose',
    description:
      '팝오버를 닫는 트리거. `asChild`로 Button과 조합해서 콘텐츠 내부의 닫기/확인 버튼에 쓴다.',
    code: `<PopoverClose asChild>
  <Button size="sm">닫기</Button>
</PopoverClose>`,
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

type PopoverDemoProps = {
  align?: NonNullable<PopoverContentProps['align']>;
  sideOffset?: number;
};

/**
 * PopoverContent의 align/sideOffset을 Controls로 조정해볼 수 있는 데모.
 * Storybook 전용, 공개 API 아님 (CardDemo/TableDemo/TabsDemo와 동일 패턴).
 */
function PopoverDemo({ align = 'center', sideOffset = 4 }: PopoverDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">치수 설정</Button>
      </PopoverTrigger>
      <PopoverContent align={align} sideOffset={sideOffset}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
              치수
            </h4>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              레이어의 크기를 설정하세요.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="width" className="w-16">
                너비
              </Label>
              <Input id="width" defaultValue="100%" className="h-8" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="height" className="w-16">
                높이
              </Label>
              <Input id="height" defaultValue="25px" className="h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const meta: Meta<typeof PopoverDemo> = {
  title: 'Components/Overlays/Popover',
  component: PopoverDemo,
  args: {
    align: 'center',
    sideOffset: 4,
  },
  argTypes: {
    align: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description: 'PopoverContent가 정렬되는 위치',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'PopoverContent와 트리거 사이 간격(px)',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          '`@radix-ui/react-popover` 기반 팝오버. 여러 서브 컴포넌트를 조합해서 쓴다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PopoverDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">치수 설정</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
          치수
        </h4>
        <p className="text-sm text-[var(--color-text-tertiary)]">
          레이어의 크기를 설정하세요.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="width" className="w-16">
            너비
          </Label>
          <Input id="width" defaultValue="100%" className="h-8" />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="height" className="w-16">
            높이
          </Label>
          <Input id="height" defaultValue="25px" className="h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>`,
      },
    },
  },
};
