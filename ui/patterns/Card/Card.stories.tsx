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

import { CardDemo } from './CardDemo';
import { CardSkeleton } from './CardSkeleton';

const PARTS = [
  {
    name: 'Card',
    description:
      '카드 전체를 감싸는 컨테이너. 배경·보더·radius·shadow를 제공하는 순수 레이아웃이다.',
    code: `<Card className="w-96">...</Card>`,
  },
  {
    name: 'CardHeader',
    description:
      '제목/설명 영역. 내부에 CardAction이 있으면 2열 그리드(제목 영역 + 우측 액션)로 전환된다.',
    code: `<CardHeader>
  <CardTitle>프로젝트 생성</CardTitle>
  <CardDescription>새 프로젝트의 기본 정보를 입력하세요.</CardDescription>
</CardHeader>`,
  },
  {
    name: 'CardTitle / CardDescription',
    description: '카드 제목과 보조 설명 텍스트.',
    code: `<CardTitle>프로젝트 생성</CardTitle>
<CardDescription>새 프로젝트의 기본 정보를 입력하세요.</CardDescription>`,
  },
  {
    name: 'CardAction',
    description:
      'CardHeader 우측에 배치되는 액션 영역. 항상 CardHeader 내부에 둬 액션을 감지할 수 있도록 한다.',
    code: `<CardHeader>
  <CardTitle>제목</CardTitle>
  <CardAction>
    <Button variant="ghost" size="sm">···</Button>
  </CardAction>
</CardHeader>`,
  },
  {
    name: 'CardContent',
    description: '카드 본문 영역. 좌우 패딩만 가진 순수 컨테이너.',
    code: `<CardContent>
  <p>본문 내용</p>
</CardContent>`,
  },
  {
    name: 'CardFooter',
    description:
      '액션 버튼 등을 배치하는 영역.<br/>좁은 화면(`sm` 미만, `<640px`)에서는 버튼이 세로로 쌓이고, 그 이상에서는 가로로 정렬된다(`Dialog`/`Sheet`의 Footer와 동일한 방식).',
    code: `<CardFooter>
  <Button variant="ghost">취소</Button>
  <Button variant="primary">배포</Button>
</CardFooter>`,
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

const meta: Meta<typeof CardDemo> = {
  title: 'Patterns/Card',
  component: CardDemo,
  args: {
    title: '프로젝트 생성',
    description: '새 프로젝트의 기본 정보를 입력하세요.',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'CardTitle에 표시되는 텍스트',
    },
    description: {
      control: 'text',
      description: 'CardDescription에 표시되는 텍스트',
    },
  },
  parameters: {
    docs: {
      page: DocsPage,
      description: {
        component:
          '여러 서브 컴포넌트를 조합해서 쓰는 카드 컨테이너. 순수 div 조합으로 구성된다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Card className="w-96">
  <CardHeader>
    <CardTitle>프로젝트 생성</CardTitle>
    <CardDescription>새 프로젝트의 기본 정보를 입력하세요.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col gap-2">
      <Label htmlFor="project-name">프로젝트 이름</Label>
      <Input id="project-name" placeholder="아크스퀘어 대시보드" />
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="ghost">취소</Button>
    <Button variant="primary">배포</Button>
  </CardFooter>
</Card>`,
      },
    },
  },
};

export const Skeleton: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div className="w-96 space-y-4 rounded-[var(--radius-xl)] border border-[var(--color-border-default)] p-6">
  <div className="space-y-2">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-4 w-56" />
  </div>
  <Skeleton className="h-10 w-full" />
  <div className="flex justify-end gap-2">
    <Skeleton className="h-10 w-16" />
    <Skeleton className="h-10 w-16" />
  </div>
</div>`,
      },
    },
  },
  render: () => <CardSkeleton />,
};
