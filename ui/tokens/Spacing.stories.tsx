import {
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SizeSwatch, TokenSection } from './TokenSwatch';

const STEP_NUMBERS = [
  0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64,
];
const STEPS = STEP_NUMBERS.map((n) => `space-${n}`);
const stepNumber = (step: string) => step.replace('space-', '');
const stepPx = (step: string) => Number(stepNumber(step)) * 4;

const DocsPage = () => (
  <>
    <Title />
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-subtle)',
        padding: '24px 28px',
        marginBottom: 32,
      }}
    >
      <code
        style={{
          display: 'block',
          fontSize: 12,
          color: 'var(--color-text-tertiary)',
          marginBottom: 12,
        }}
      >
        space-4 · calc(var(--spacing) * 4)
      </code>
      <SizeSwatch label="space-4" size="calc(var(--spacing) * 4)" />
    </div>
    <Subtitle />
    <Description />
    <StoryBlock of={Scale} />
  </>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  parameters: { layout: 'padded', docs: { page: DocsPage } },
};

export default meta;

type SpacingArgs = { step: string };

export const Scale: StoryObj<SpacingArgs> = {
  args: { step: 'space-16' },
  argTypes: {
    step: {
      control: { type: 'select' },
      options: STEPS,
      description: '미리 볼 spacing step을 선택합니다.',
    },
  },
  render: ({ step }) => (
    <TokenSection
      title="Spacing"
      description={`Tailwind 기본 \`spacing(0.25rem)\` 배수 스케일. \n\`p-*\`, \`m-*\`, \`gap-*\` 유틸리티가 모두 이 값을 참조합니다.`}
    >
      <div
        style={{
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-subtle)',
          padding: '24px 28px',
          marginBottom: 24,
        }}
      >
        <code
          style={{
            display: 'block',
            fontSize: 12,
            color: 'var(--color-text-tertiary)',
            marginBottom: 12,
          }}
        >
          {step} · {stepPx(step)}px
        </code>
        <SizeSwatch
          label={step}
          size={`calc(var(--spacing) * ${stepNumber(step)})`}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {STEPS.map((s) => (
          <div
            key={s}
            style={{
              background: s === step ? 'var(--color-bg-subtle)' : undefined,
              padding: '6px 8px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <SizeSwatch
              label={`${s} (${stepPx(s)}px)`}
              size={`calc(var(--spacing) * ${stepNumber(s)})`}
            />
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};
