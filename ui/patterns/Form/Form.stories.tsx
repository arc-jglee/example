import {
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormDemo } from './FormDemo';

const PARTS = [
  {
    name: 'Form',
    description:
      'react-hook-form의 `FormProvider`를 re-export한 것. `useForm()`이 반환한 객체를 그대로 펼쳐서 넘긴다.',
    code: `const form = useForm({ defaultValues: { name: '' } });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>...</form>
</Form>`,
  },
  {
    name: 'FormField',
    description:
      'react-hook-form의 `Controller`를 감싼 것. `name`으로 필드를 식별해 하위 `FormItem` 트리에 Context로 전달한다.',
    code: `<FormField
  control={form.control}
  name="email"
  rules={{ required: '이메일을 입력해주세요.' }}
  render={({ field }) => (
    <FormItem>...</FormItem>
  )}
/>`,
  },
  {
    name: 'FormItem / FormLabel / FormControl',
    description:
      '`FormItem`이 `useId()`로 만든 고유 id를 하위에 Context로 내려준다.<br/>`FormLabel`은 그 id를 `htmlFor`로, `FormControl`은 감싼 컨트롤에 `id`를 Slot으로 주입한다.',
    code: `<FormItem>
  <FormLabel>이메일</FormLabel>
  <FormControl>
    <Input {...field} type="email" />
  </FormControl>
</FormItem>`,
  },
  {
    name: 'FormDescription / FormMessage',
    description:
      '`FormDescription`은 항상 보이는 보조 설명.<br/>`FormMessage`는 필드에 에러가 있으면 에러 메시지를 표시하고 없으면 children을 표시한다.',
    code: `<FormDescription>알림을 받을 이메일 주소입니다.</FormDescription>
<FormMessage />`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Markdown style={{ color: 'var(--color-text-tertiary)', fontSize: 13 }}>
      react-hook-form과 조합해 입력 검증 메시지·레이아웃을 표준화하는 패턴이다.
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

const meta: Meta<typeof FormDemo> = {
  title: 'Patterns/Form',
  component: FormDemo,
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component: 'react-hook-form 기반 폼 레이아웃/검증 메시지 표준화 패턴.',
      },
      source: {
        type: 'code',
        code: `const form = useForm({ defaultValues: { name: '', email: '' } });

<Form {...form}>
  <form onSubmit={form.handleSubmit((values) => save(values))} className="flex w-80 flex-col gap-6">
    <FormField
      control={form.control}
      name="name"
      rules={{ required: '이름을 입력해주세요.' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Input {...field} placeholder="홍길동" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="email"
      rules={{
        required: '이메일을 입력해주세요.',
        pattern: { value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: '올바른 이메일 형식이 아닙니다.' },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input {...field} type="email" placeholder="hong@example.com" />
          </FormControl>
          <FormDescription>알림을 받을 이메일 주소입니다.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />

    <Button type="submit">저장</Button>
  </form>
</Form>`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormDemo>;

export const Basic: Story = {};
