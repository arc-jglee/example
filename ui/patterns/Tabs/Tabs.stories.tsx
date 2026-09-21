import {
  Controls,
  Description,
  Markdown,
  Primary,
  Source,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabsDemo } from './TabsDemo';

const PARTS = [
  {
    name: 'Tabs',
    description:
      '`defaultValue`/`value`/`onValueChange`/`orientation` 등 Radix의 props가 그대로 전달된다.',
    code: `<Tabs defaultValue="account" orientation="horizontal">
  ...
</Tabs>`,
  },
  {
    name: 'TabsList',
    description:
      '`variant`(`underline`/`pill`)를 지정하면 하위 `TabsTrigger`에 자동 전파된다. Trigger에 개별 variant를 지정하면 그 값을 우선시한다.',
    code: `<TabsList variant="pill">
  <TabsTrigger value="daily">일간</TabsTrigger>
</TabsList>`,
  },
  {
    name: 'TabsTrigger',
    description:
      '`data-state=active`일 때 강조 스타일이 적용된다. `disabled`를 주면 탭 메뉴를 비활성화한다.',
    code: `<TabsTrigger value="account" disabled>계정</TabsTrigger>`,
  },
  {
    name: 'TabsContent',
    description:
      '선택된 `value`와 일치하는 패널이 렌더링된다. 포커스 링(`focus-visible`)이 기본 포함된다.',
    code: `<TabsContent value="account">계정 설정 콘텐츠입니다.</TabsContent>`,
  },
  {
    name: '세로 방향 조합 orientation="vertical"',
    description:
      '`Tabs`의 `orientation="vertical"`만으로는 레이아웃이 안 바뀐다.<br/>`TabsList`/`TabsTrigger`/`TabsContent`에 세로 배치용 className을 함께 조합해야 한다.',
    code: `<Tabs orientation="vertical" className="flex gap-4">
  <TabsList className="flex-col border-r border-b-0 pr-4">
    <TabsTrigger value="tab1" className="w-full justify-start">
      첫 번째
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" className="mt-0">...</TabsContent>
</Tabs>`,
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
  </>
);

const meta: Meta<typeof TabsDemo> = {
  title: 'Patterns/Tabs',
  component: TabsDemo,
  args: {
    variant: 'underline',
    orientation: 'horizontal',
    disableThird: true,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['underline', 'pill'],
      description: '탭 메뉴 변형',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '탭 메뉴 방향',
    },
    disableThird: {
      control: 'boolean',
      description: '세 번째 탭("사용불가") 비활성화 여부',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          '`@radix-ui/react-tabs` 기반 탭. 여러 서브 컴포넌트를 조합해서 쓴다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabsDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">계정</TabsTrigger>
    <TabsTrigger value="password">비밀번호</TabsTrigger>
    <TabsTrigger value="disabled" disabled>
      사용불가
    </TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="flex flex-col gap-3">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="tabs-demo-name">이름</Label>
      <Input id="tabs-demo-name" defaultValue="홍길동" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="tabs-demo-email">이메일</Label>
      <Input id="tabs-demo-email" type="email" defaultValue="hong@example.com" />
    </div>
  </TabsContent>
  <TabsContent value="password" className="flex flex-col gap-3">
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="tabs-demo-current-password">현재 비밀번호</Label>
      <Input id="tabs-demo-current-password" type="password" />
    </div>
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="tabs-demo-new-password">새 비밀번호</Label>
      <Input id="tabs-demo-new-password" type="password" />
    </div>
    <Button className="self-start">변경</Button>
  </TabsContent>
  <TabsContent value="disabled">준비 중인 기능이라 아직 접근할 수 없습니다.</TabsContent>
</Tabs>`,
      },
    },
  },
};
