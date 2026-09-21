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
import type { ReactNode } from 'react';

import { Button } from '../../components/Button/Button';
import { Toast, ToastAction, ToastProvider, ToastViewport } from './Toast';
import { toast } from './toast-store';
import { ToastDemo } from './ToastDemo';
import { Toaster } from './Toaster';

const ACTION_OPTIONS = ['none', 'undo', 'retry'] as const;

const ACTION_MAPPING: Record<(typeof ACTION_OPTIONS)[number], ReactNode> = {
  none: undefined,
  undo: (
    <Button size="sm" variant="outline">
      취소
    </Button>
  ),
  retry: (
    <Button size="sm" variant="primary">
      재시도
    </Button>
  ),
};

const PARTS = [
  {
    name: 'Toaster',
    description:
      '앱 루트(레이아웃 최상단)에 한 번만 렌더한다. `toast()`로 쌓인 항목을 실제 화면에 그리는 컨테이너.',
    code: `// app/layout.tsx
<Toaster />`,
  },
  {
    name: 'toast()',
    description:
      '어디서든 호출 가능한 명령형 API. 이벤트 핸들러 안에서 바로 호출 가능하다.',
    code: `toast({
  variant: 'success',
  title: '저장되었습니다',
  description: '변경사항이 반영되었습니다.',
})`,
  },
  {
    name: 'Toast / ToastProvider / ToastViewport',
    description:
      '`toast()`/`Toaster` 없이 직접 조합하고 싶을 때 쓰는 저수준 조각.',
    code: `<ToastProvider>
  <Toast variant="success" title="저장되었습니다" onClose={() => {}} />
  <ToastViewport />
</ToastProvider>`,
  },
  {
    name: 'ToastAction',
    description:
      '닫기 버튼 대신 표시할 액션 버튼. `altText`는 스와이프 등으로 액션이 화면에서 사라졌을 때 스크린리더가 대체로 읽어줄 텍스트라 필수다.',
    code: `<Toast
  title="파일이 삭제되었습니다"
  action={
    <ToastAction altText="실행 취소" asChild>
      <Button variant="outline" size="sm">실행 취소</Button>
    </ToastAction>
  }
/>`,
  },
  {
    name: 'Dialog/Sheet가 열려 있을 때',
    description:
      'Dialog나 Sheet가 열려 있으면 Radix가 바깥 클릭을 막으려고 `<body>`에 `pointer-events: none`을 건다. Toast 카드가 `pointer-events-auto`라서, 별도 설정 없이도 열려 있는 Dialog/Sheet 위에 뜬 Toast를 그대로 클릭·닫기할 수 있다. Viewport 자체는 헤더를 가리지 않도록 `pointer-events-none`이다 (`Patterns/Sheet`의 `WithToastOnTop` 예시 참고).',
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

const meta: Meta<typeof ToastDemo> = {
  title: 'Patterns/Toast',
  component: ToastDemo,
  args: {
    variant: 'default',
    title: '저장되었습니다',
    description: '',
    action: 'none',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description:
        '`Alert`와 동일한 색상/아이콘 체계를 따른다.\n' +
        '- **default**: 좌측 색상 바 없음\n' +
        '- **success**: `--color-border-success` 좌측 바\n' +
        '- **warning**: `--color-border-warning` 좌측 바\n' +
        '- **error**: `--color-border-error` 좌측 바\n' +
        '정보성 토스트는 상태가 아니므로 `default`로 표현합니다.\n\n',
    },
    title: { control: 'text' },
    description: { control: 'text' },
    action: {
      control: 'select',
      options: ACTION_OPTIONS,
      mapping: ACTION_MAPPING,
      description:
        '예시는 실행 취소/다시 시도 버튼만 고를 수 있으며, 실제로는 임의의 ReactNode를 전달할 수 있습니다.',
    },
  },
  parameters: {
    docs: {
      page: DocsPage,
      description: {
        component:
          '디자인은 `Alert`와 같고, `@radix-ui/react-toast` 기반으로 구현했다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Button
  onClick={() =>
    toast({
      title: '저장되었습니다',
    })
  }
>
  토스트 띄우기
</Button>
<Toaster />`,
      },
    },
  },
};

export const WithAction: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        type: 'code',
        code: `<>
  <Button
    variant="destructive"
    onClick={() =>
      toast({
        variant: 'error',
        title: '파일이 삭제되었습니다',
        description: '취소 버튼을 눌러 복원할 수 있습니다.',
        action: (
          <ToastAction altText="취소" asChild>
            <Button variant="outline" size="sm">
              취소
            </Button>
          </ToastAction>
        ),
      })
    }
  >
    파일 삭제
  </Button>
  <Toaster />
</>`,
      },
    },
  },
  render: () => (
    <>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: 'error',
            title: '파일이 삭제되었습니다',
            description: '취소 버튼을 눌러 복원할 수 있습니다.',
            action: (
              <ToastAction altText="취소" asChild>
                <Button variant="outline" size="sm">
                  취소
                </Button>
              </ToastAction>
            ),
          })
        }
      >
        파일 삭제
      </Button>
      <Toaster />
    </>
  ),
};

export const ManualComposition: Story = {
  parameters: {
    docs: {
      description: {
        story: '`toast()`/`Toaster` 없이 `Toast`를 직접 제어하는 예시.',
      },
      source: {
        type: 'code',
        code: `<div className="relative h-40 w-full">
  <ToastProvider>
    <Toast
      open
      variant="default"
      title="새 버전이 있습니다"
      description="새로고침하면 최신 버전을 사용할 수 있습니다."
      onClose={() => undefined}
    />
    <ToastViewport className="absolute p-0" />
  </ToastProvider>
</div>`,
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div className="relative h-40 w-full">
      <ToastProvider>
        <Toast
          open
          variant="default"
          title="새 버전이 있습니다"
          description="새로고침하면 최신 버전을 사용할 수 있습니다."
          onClose={() => undefined}
        />
        <ToastViewport className="absolute p-0" />
      </ToastProvider>
    </div>
  ),
};
