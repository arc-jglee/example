import {
  Description,
  Markdown,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {
  Form as FormRoot,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form/Form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const PARTS = [
  {
    name: 'DialogTrigger',
    description:
      '다이얼로그를 여는 트리거. `asChild`로 Button 등 원하는 요소와 조합한다 (제어 모드에서는 생략).',
    code: `<DialogTrigger asChild>
  <Button>열기</Button>
</DialogTrigger>`,
  },
  {
    name: 'DialogContent',
    description:
      '컨텐츠와 오버레이를 내장한 중앙 패널. 우상단 닫기(X) 버튼이 자동 포함한다. ' +
      '오버레이는 내부에서만 렌더되어 직접 손댈 수 없는데, 이미 열린 Sheet 위에 ' +
      'Dialog를 띄우는 경우처럼 오버레이 쪽도 커스터마이즈가 필요하면 `overlayClassName`으로 ' +
      '전달한다(z-index 오버라이드가 대표적 예시). 콘텐츠 자체의 z-index 등은 기존 `className`으로 바로 덮어써도 된다.',
    code: `<DialogContent>
  <DialogHeader>...</DialogHeader>
  {/* 본문 */}
  <DialogFooter>...</DialogFooter>
</DialogContent>

// Sheet 위에 뜨는 Dialog처럼 더 높은 레이어가 필요할 때
<DialogContent
  className="z-[var(--z-popover)]"
  overlayClassName="z-[var(--z-popover)]"
>
  ...
</DialogContent>`,
  },
  {
    name: 'DialogTitle / DialogDescription',
    description: '제목·설명. DialogTitle은 접근성을 위해 항상 포함해야 한다.',
    code: `<DialogHeader>
  <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
  <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
</DialogHeader>`,
  },
  {
    name: 'DialogFooter / DialogClose',
    description:
      '액션 버튼 등을 배치하는 영역. DialogClose는 `asChild`로 Button과 조합해 닫는 용도로 쓴다.',
    code: `<DialogFooter>
  <DialogClose asChild>
    <Button variant="outline">취소</Button>
  </DialogClose>
  <Button variant="destructive">삭제</Button>
</DialogFooter>`,
  },
] as const;

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />

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

const meta: Meta<typeof Dialog> = {
  title: 'Patterns/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      page: DocsPage,
      description: {
        component:
          '`@radix-ui/react-dialog`기반 모달. 여러 서브 컴포넌트를 조합해서 쓴다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Confirm: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">계정 삭제</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
      <DialogDescription>
        이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로
        삭제됩니다.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">취소</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="destructive">삭제</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">계정 삭제</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로
            삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">삭제</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

type ProfileFormValues = {
  name: string;
  email: string;
};

function noop() {
  /* 데모용 — 실제로는 저장 API 호출 등을 여기서 처리한다 */
}

/**
 * Form 패턴(FormField/FormItem/FormLabel/FormControl/FormMessage)과의 조합
 * 예시. Dialog 안에서 검증 메시지·aria 배선이 자동으로 되는 걸 보여준다.
 */
function DialogFormDemo() {
  const form = useForm<ProfileFormValues>({
    defaultValues: { name: '홍길동', email: 'hong@example.com' },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>프로필 수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            변경 후 저장 버튼을 눌러야 반영됩니다.
          </DialogDescription>
        </DialogHeader>

        <FormRoot {...form}>
          <form
            onSubmit={form.handleSubmit(noop)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              rules={{ required: '이름을 입력해주세요.' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormDescription>
                    알림을 받을 이메일 주소입니다.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  취소
                </Button>
              </DialogClose>
              <Button type="submit">저장</Button>
            </DialogFooter>
          </form>
        </FormRoot>
      </DialogContent>
    </Dialog>
  );
}

export const Form: Story = {
  parameters: {
    docs: {
      description: {
        story: '`Form`을 그대로 가져다 써서 적용했다.',
      },
      source: {
        type: 'code',
        code: `type ProfileFormValues = { name: string; email: string };

const form = useForm<ProfileFormValues>({
  defaultValues: { name: '홍길동', email: 'hong@example.com' },
});

<Dialog>
  <DialogTrigger asChild>
    <Button>프로필 수정</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>프로필 수정</DialogTitle>
      <DialogDescription>
        변경 후 저장 버튼을 눌러야 반영됩니다.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: '이름을 입력해주세요.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} type="email" />
              </FormControl>
              <FormDescription>알림을 받을 이메일 주소입니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit">저장</Button>
        </DialogFooter>
      </form>
    </Form>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: () => <DialogFormDemo />,
};

export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '긴 컨텐츠는 스크롤을 DialogContent가 아니라 내부의 별도 컨테이너에 줘야 한다.<br/>DialogContent에 직접 overflow를 걸면 닫기 버튼도 스크롤 컨텐츠에 함께 딸려가는 문제가 발생한다.',
      },
      source: {
        type: 'code',
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">약관 보기</Button>
  </DialogTrigger>
  <DialogContent className="max-h-[80vh]">
    <DialogHeader>
      <DialogTitle>이용약관</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-3 overflow-y-auto text-sm text-[var(--color-text-secondary)]">
      {Array.from({ length: 15 }, (_, i) => (
        <p key={i}>
          제{i + 1}조. 이것은 스크롤 동작을 확인하기 위한 샘플 문단입니다.
        </p>
      ))}
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button>확인</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">약관 보기</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>이용약관</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 overflow-y-auto text-sm text-[var(--color-text-secondary)]">
          {Array.from({ length: 15 }, (_, i) => (
            <p key={i}>
              제{i + 1}조. 이것은 스크롤 동작을 확인하기 위한 샘플 문단입니다.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>제어 모드</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>제어 모드 다이얼로그</DialogTitle>
            <DialogDescription>
              useState로 앱 상태를 직접 제어하는 예시입니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '제어 모드. DialogTrigger를 사용하지 않고, useState로 앱 상태를 직접 제어하는 예시입니다.',
      },
      source: {
        type: 'code',
        code: `const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>제어 모드</Button>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>제어 모드 다이얼로그</DialogTitle>
        <DialogDescription>
          useState로 앱 상태를 직접 제어하는 예시입니다.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => setOpen(false)}>닫기</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</>`,
      },
    },
  },
  render: () => <ControlledDemo />,
};
