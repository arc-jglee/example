import {
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';
import { BreadcrumbDemo } from './BreadcrumbDemo';

const PARTS = [
  {
    name: 'Breadcrumb / BreadcrumbList',
    description:
      '전체를 감싸는 `nav`와 항목을 담는 `ol`. 순수 시맨틱 태그 조합이다.',
    code: `<Breadcrumb>
  <BreadcrumbList>...</BreadcrumbList>
</Breadcrumb>`,
  },
  {
    name: 'BreadcrumbItem / BreadcrumbLink',
    description:
      '경로 중간 항목.<br/>기본적으로 `a` 태그이지만, `asChild`를 주면 Next.js `Link` 같은 컴포넌트로 교체할 수 있다.',
    code: `<BreadcrumbItem>
  <BreadcrumbLink asChild>
    <Link href="/admin">관리자</Link>
  </BreadcrumbLink>
</BreadcrumbItem>`,
  },
  {
    name: 'BreadcrumbPage',
    description:
      '현재 위치(마지막 항목).<br/>링크가 아닌 `span`이며, `aria-current="page"`가 붙는다.',
    code: `<BreadcrumbItem>
  <BreadcrumbPage>상세</BreadcrumbPage>
</BreadcrumbItem>`,
  },
  {
    name: 'BreadcrumbSeparator',
    description:
      '항목 사이 구분자.<br/>기본 아이콘은 `ChevronRight`, children으로 교체 가능하다.',
    code: `<BreadcrumbSeparator />
<BreadcrumbSeparator>/</BreadcrumbSeparator>`,
  },
  {
    name: 'BreadcrumbEllipsis',
    description: '경로가 깊을 때 중간 구간을 접어서 보여주는 `···` 표시.',
    code: `<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Markdown style={{ color: '#333', fontSize: 13 }}>
      관리 화면처럼 계층이 깊어지는 페이지에서 현재 위치를 보여주는 내비게이션.
    </Markdown>

    <Primary />

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

const meta: Meta<typeof BreadcrumbDemo> = {
  title: 'Patterns/Breadcrumb',
  component: BreadcrumbDemo,
  args: {
    segments: ['관리자', '사용자 관리', '상세'],
  },
  argTypes: {
    segments: {
      control: 'object',
      description:
        '경로 세그먼트 배열. 마지막 항목만 BreadcrumbPage(현재 위치)로 렌더링되고, 나머지는 BreadcrumbLink로 렌더링된다.',
    },
  },
  parameters: {
    docs: {
      page: DocsPage,
      description: {
        component:
          '현재 위치를 계층적으로 보여주는 내비게이션. 순수 시맨틱 태그 조합으로 구성된다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BreadcrumbDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">관리자</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">사용자 관리</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>상세</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    },
  },
};

export const TwoLevels: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">관리자</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>사용자 관리</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    },
  },
  render: () => <BreadcrumbDemo segments={['관리자', '사용자 관리']} />,
};

export const WithEllipsis: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">관리자</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">사용자 관리</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>상세</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">관리자</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">사용자 관리</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>상세</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  tags: ['!dev'],
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">관리자</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>/</BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>사용자 관리</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    },
  },
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">관리자</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>사용자 관리</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
