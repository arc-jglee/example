import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClockAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../patterns/Form/Form';
import { AuthShell } from './AuthShell';

/**
 * 정적 자산은 절대경로가 아니라 `import.meta.env.BASE_URL` 기준으로 참조한다 —
 * 배포 시 Storybook이 서브패스로 서빙되기 때문이다 (AppHeader.stories.tsx와 동일 패턴).
 */
const assetUrl = (file: string) => `${import.meta.env.BASE_URL}${file}`;

/** 스토리 전용 데모 아트 — 실제 앱은 이 자리에 브랜드 일러스트를 넣는다 */
function DemoBrandArt() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--color-bg-accent-subtle)_0%,var(--color-bg-accent)_100%)]"></div>
  );
}

type EmailPasswordValues = {
  email: string;
  password: string;
};

/** 스토리 전용 데모 폼 — UI 플랫폼의 Form/Input을 그대로 사용한다 */
function EmailPasswordFormDemo() {
  const [submitted, setSubmitted] = useState<EmailPasswordValues | null>(null);
  const form = useForm<EmailPasswordValues>({
    defaultValues: { email: '', password: '' },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => setSubmitted(values))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: '이메일을 입력해주세요.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="사용자 이메일" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          rules={{ required: '비밀번호를 입력해주세요.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="비밀번호" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="md" className="h-10 w-full">
          로그인
        </Button>

        {submitted && (
          <p className="text-[length:var(--text-body-sm)] text-[var(--color-text-success)]">
            {submitted.email}(으)로 로그인을 시도했습니다.
          </p>
        )}
      </form>
    </Form>
  );
}

const meta: Meta<typeof AuthShell> = {
  title: 'Shell/AuthShell',
  component: AuthShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // AppHeader와 같은 이유로 셸의 실제 브레이크포인트(md: 768px)에 맞춘
    // 항목을 직접 등록한다 — 기본 viewport 목록은 이 경계값과 어긋난다.
    viewport: {
      options: {
        shellMobile: {
          name: '모바일 360px',
          styles: { width: '360px', height: '720px' },
        },
        shellDesktop: {
          name: '데스크탑 1024px',
          styles: { width: '1024px', height: '720px' },
        },
      },
    },
    docs: {
      description: {
        component:
          '로그인 화면 전용 Shell.<br/>태블릿 이상에서는 `aside` 장식 배경이 전체 폭에 깔리고, 그 위에 좌측 절반 폭의 로고+폼 컬럼이 카드처럼 겹쳐진다.<br/>모바일에서는 `aside`를 감추고 좌측 컬럼만 전체 폭으로 채운다.<br/>`aside`를 생략하면 태블릿 이상에서도 단일 컬럼이다.',
      },
    },
  },
  args: {
    title: '다시 오신 것을 환영합니다',
    description: '계속하려면 SSO 계정으로 로그인하세요.',
  },
  argTypes: {
    logo: { control: false },
    notice: { control: false },
    children: { control: false },
    aside: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof AuthShell>;

const SPLIT_ARGS = {
  logo: (
    <img src={assetUrl('arc_only_logo.png')} alt="arcsquare" className="h-7" />
  ),
  logoTitle: 'arcsquare',
  aside: <DemoBrandArt />,
  children: (
    <Button type="button" size="md" className="h-10 w-full">
      로그인 페이지로 이동
    </Button>
  ),
};

/** 태블릿 이상 — 브랜드 장식 배경 위에 로고+폼 컬럼이 카드처럼 겹쳐진다 */
export const SplitWithAside: Story = {
  args: SPLIT_ARGS,
};

/**
 * 좁은 화면 — `aside`가 있어도 자동으로 감춰지고 폼만 중앙에 남는다.
 * Docs 페이지는 iframe 없이 여러 스토리를 한 문서에 모아 렌더링해서
 * `globals.viewport`가 적용되지 않는다 — 사이드바에서 개별로 열어야 한다.
 */
export const Mobile: Story = {
  tags: ['!autodocs'],
  args: SPLIT_ARGS,
  globals: { viewport: { value: 'shellMobile' } },
};

/** 로그아웃/세션 만료 등 상단 공지가 있는 경우 */
export const WithNotice: Story = {
  args: {
    ...SPLIT_ARGS,
    notice: (
      <Alert
        icon={<ClockAlertIcon />}
        title="세션 만료"
        description="세션이 만료되었습니다. 다시 로그인해 주세요."
      />
    ),
  },
};

/** 이메일/비밀번호 폼형 — UI 플랫폼의 Form/Input으로 구성한 로그인 폼 */
export const EmailPasswordForm: Story = {
  args: {
    title: '안녕하세요 MLOps입니다',
    description: '프로젝트를 선택해 작업을 시작하세요.',
    logo: (
      <img
        src={assetUrl('arc_only_logo.png')}
        alt="arcsquare"
        className="h-7"
      />
    ),
    logoTitle: 'Arc MLOps',
    aside: <DemoBrandArt />,
    children: <EmailPasswordFormDemo />,
  },
};
