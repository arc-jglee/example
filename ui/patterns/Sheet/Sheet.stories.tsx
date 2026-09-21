import {
  Controls,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../components/Button/Button';
import { toast } from '../Toast/toast-store';
import { Toaster } from '../Toast/Toaster';
import type { SheetContentProps } from './Sheet';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { SheetDemo } from './SheetDemo';

function sheetExampleCode(side: NonNullable<SheetContentProps['side']>) {
  return `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">프로필 수정</Button>
  </SheetTrigger>
  <SheetContent side="${side}">
    <SheetHeader>
      <SheetTitle>프로필 수정</SheetTitle>
      <SheetDescription>변경 후 저장 버튼을 눌러야 반영됩니다.</SheetDescription>
    </SheetHeader>

    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">이름</Label>
        <Input id="name" defaultValue="홍길동" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" defaultValue="hong@example.com" />
      </div>
    </div>

    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">취소</Button>
      </SheetClose>
      <Button>저장</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`;
}

const PARTS = [
  {
    name: 'SheetTrigger',
    description:
      '패널을 여는 트리거. `asChild`로 Button 등 원하는 요소와 조합한다 (제어 모드에서는 생략).',
    code: `<SheetTrigger asChild>
  <Button variant="outline">편집</Button>
</SheetTrigger>`,
  },
  {
    name: 'SheetContent',
    description:
      '오버레이 + 슬라이드 패널을 내장한 컨테이너. `side`(기본 `right`)로 등장 위치를 정한다.<br/>우상단 닫기(X) 버튼이 자동 포함된다.<br/>' +
      '오버레이는 내부에서만 렌더되어 직접 손댈 수 없는데, 이 Sheet 위에 다른 Sheet나 Dialog가 뜨는 경우처럼 ' +
      '오버레이 쪽도 커스터마이즈가 필요하면 `overlayClassName`으로 전달한다(z-index 오버라이드가 대표적 예시). ' +
      '콘텐츠 자체의 z-index 등은 기존 `className`으로 바로 덮어써도 된다.',
    code: `<SheetContent side="right">
  <SheetHeader>...</SheetHeader>
  {/* 본문 */}
  <SheetFooter>...</SheetFooter>
</SheetContent>

// 이 Sheet 위에 뜨는 Dialog/Sheet처럼 더 높은 레이어가 필요할 때
<SheetContent
  side="right"
  className="z-[var(--z-popover)]"
  overlayClassName="z-[var(--z-popover)]"
>
  ...
</SheetContent>`,
  },
  {
    name: 'SheetTitle / SheetDescription',
    description: '제목·설명. SheetTitle은 접근성을 위해 항상 포함해야 한다.',
    code: `<SheetHeader>
  <SheetTitle>프로필 수정</SheetTitle>
  <SheetDescription>변경 후 저장 버튼을 눌러야 반영됩니다.</SheetDescription>
</SheetHeader>`,
  },
  {
    name: 'SheetFooter / SheetClose',
    description:
      '액션 버튼 등을 배치하는 영역. SheetClose는 `asChild`로 Button과 조합해 닫는 용도로 쓴다.',
    code: `<SheetFooter>
  <SheetClose asChild>
    <Button variant="outline">취소</Button>
  </SheetClose>
  <Button>저장</Button>
</SheetFooter>`,
  },
  {
    name: 'Toast와 함께 쓸 때',
    description:
      'Sheet가 열려 있으면 Radix가 바깥 클릭을 막으려고 `<body>`에 `pointer-events: none`을 건다. `Toast`는 별도로 두면 이 잠금을 그대로 물려받아 닫기 버튼이 눌리지 않는데, `Toast`/`Toaster`가 이미 이걸 상쇄하도록 되어 있어 Sheet가 열린 채로도 그 위의 Toast를 정상적으로 닫을 수 있다. 별도 설정 없이 `Toaster`만 앱 루트에 두면 된다.',
    code: `<Sheet>
  <SheetContent>...</SheetContent>
</Sheet>
<Toaster /> {/* Sheet가 열려 있어도 여기서 뜨는 Toast는 바로 클릭 가능하다 */}`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
      {
        '우측(또는 다른 방향) 상세 패널, 빠른 편집 패널에 쓰는 슬라이드 패널.<br/>Dialog와 같은 소스를 쓰고, 위치만 `side` variant로 다르게 준다.'
      }
    </Markdown>
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

const meta: Meta<typeof SheetDemo> = {
  title: 'Patterns/Sheet',
  component: SheetDemo,
  args: {
    side: 'right',
  },
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: '패널이 나타나는 방향',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          '`@radix-ui/react-dialog` 기반 슬라이드 패널. Dialog와 동일한 프리미티브를 `side` variant로 재구성한 것.',
      },
      source: {
        type: 'code',
        code: sheetExampleCode('right'),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SheetDemo>;

export const Basic: Story = {};

export const WithToastOnTop: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Sheet가 열린 상태에서 액션 결과로 Toast가 뜨는 경우. Toast의 닫기 버튼을 눌러도 Toast만 닫히고 Sheet는 유지된다.',
      },
      source: {
        type: 'code',
        code: `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">패널 열기</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>구성원</SheetTitle>
    </SheetHeader>
    <Button
      onClick={() => toast({ variant: 'success', title: '순서가 변경되었습니다' })}
    >
      순서 변경
    </Button>
  </SheetContent>
</Sheet>
<Toaster />`,
      },
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">패널 열기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>구성원</SheetTitle>
        </SheetHeader>
        <Button
          onClick={() =>
            toast({ variant: 'success', title: '순서가 변경되었습니다' })
          }
        >
          순서 변경
        </Button>
      </SheetContent>
    </Sheet>
  ),
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};
