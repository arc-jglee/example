import {
  Controls,
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TokenSection } from './TokenSwatch';

const WEIGHTS = [
  { name: 'thin', className: 'font-thin' },
  { name: 'extralight', className: 'font-extralight' },
  { name: 'light', className: 'font-light' },
  { name: 'normal', className: 'font-normal' },
  { name: 'medium', className: 'font-medium' },
  { name: 'semibold', className: 'font-semibold' },
  { name: 'bold', className: 'font-bold' },
  { name: 'extrabold', className: 'font-extrabold' },
  { name: 'black', className: 'font-black' },
];
const TRACKING = [
  { name: 'tight', className: 'tracking-tight' },
  { name: 'normal', className: 'tracking-normal' },
  { name: 'wide', className: 'tracking-wide' },
  { name: 'wider', className: 'tracking-wider' },
];
const LEADING = [
  { name: 'tight', className: 'leading-tight' },
  { name: 'snug', className: 'leading-snug' },
  { name: 'normal', className: 'leading-normal' },
  { name: 'relaxed', className: 'leading-relaxed' },
  { name: 'loose', className: 'leading-loose' },
];

const SAMPLE = 'Pretendard 프리텐다드글꼴 Aa 123';

const SEMANTIC_SIZES = [
  { token: 'heading-xl', core: 'text-[32px]', px: 32, usage: '섹션 대제목' },
  { token: 'heading-lg', core: 'text-[28px]', px: 28, usage: '페이지 타이틀' },
  {
    token: 'heading-md',
    core: 'text-2xl',
    px: 24,
    usage: '카드/모달 타이틀',
  },
  {
    token: 'heading-sm',
    core: 'text-xl',
    px: 20,
    usage: '패널/테이블 헤더',
  },
  {
    token: 'heading-xs',
    core: 'text-lg',
    px: 18,
    usage: '리스트 아이템 타이틀',
  },
  { token: 'body-lg', core: 'text-base', px: 16, usage: '강조 본문' },
  {
    token: 'body-md',
    core: 'text-sm',
    px: 14,
    usage: '기본 UI 텍스트 (base)',
  },
  { token: 'body-sm', core: 'text-[13px]', px: 13, usage: '보조 텍스트' },
  { token: 'caption', core: 'text-xs', px: 12, usage: '라벨/뱃지/헬퍼' },
];

const cellStyle: React.CSSProperties = {
  padding: '10px 12px',
  textAlign: 'left',
  borderBottom: '1px solid var(--color-border-default)',
};

type SemanticArgs = { token: string };
type HeroArgs = { size: string; weight: string };

export const HeroPreview: StoryObj<HeroArgs> = {
  tags: ['!dev'],
  args: { size: 'heading-xl', weight: 'normal' },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: SEMANTIC_SIZES.map((s) => s.token),
      description: 'font-size 토큰을 선택합니다.',
    },
    weight: {
      control: { type: 'select' },
      options: WEIGHTS.map((w) => w.name),
      description: 'font-weight 토큰을 선택합니다.',
    },
  },
  render: ({ size, weight }) => (
    <div className="flex flex-col gap-4 rounded-lg bg-[var(--color-bg-muted)] p-6 text-[var(--color-text-primary)]">
      <code
        style={{
          display: 'block',
          fontSize: 12,
          color: 'var(--color-text-tertiary)',
        }}
      >
        기본 글꼴
      </code>
      <div
        className={WEIGHTS.find((w) => w.name === weight)?.className}
        style={{ fontSize: `var(--text-${size})` }}
      >
        {SAMPLE}
      </div>
    </div>
  ),
};

const DocsPage = () => (
  <>
    <Title />
    <StoryBlock of={HeroPreview} />
    <Controls of={HeroPreview} />
    <Subtitle />
    <Description />
    <StoryBlock of={FontSize} />
    <StoryBlock of={FontWeight} />
    <StoryBlock of={LetterSpacing} />
    <StoryBlock of={LineHeight} />
  </>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  parameters: { layout: 'padded', docs: { page: DocsPage } },
};

export default meta;

export const FontSize: StoryObj<SemanticArgs> = {
  args: { token: 'heading-lg' },
  argTypes: {
    token: {
      control: { type: 'select' },
      options: SEMANTIC_SIZES.map((s) => s.token),
      description: '미리 볼 semantic 폰트 사이즈 토큰을 선택합니다.',
    },
  },
  render: ({ token }) => {
    const active = SEMANTIC_SIZES.find((s) => s.token === token);
    return (
      <TokenSection
        title="Font Size"
        description="용도 기반 semantic 토큰입니다. 각 토큰은 Tailwind 기본 `text-*` 클래스를 참조합니다."
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
            {token} · {active?.px}px
          </code>
          <div
            style={{
              fontSize: `var(--text-${token})`,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {SAMPLE}
          </div>
        </div>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
          }}
        >
          <thead>
            <tr>
              <th style={cellStyle}>Font 토큰</th>
              <th style={cellStyle}>Tailwind 클래스</th>
              <th style={cellStyle}>px</th>
              <th style={cellStyle}>용도</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_SIZES.map((row) => {
              const selected = row.token === token;
              return (
                <tr
                  key={row.token}
                  style={{
                    background: selected ? 'var(--color-bg-subtle)' : undefined,
                    fontWeight: selected ? 700 : 400,
                  }}
                >
                  <td style={cellStyle}>
                    <code>{row.token}</code>
                  </td>
                  <td style={cellStyle}>{row.core}</td>
                  <td style={cellStyle}>{row.px}px</td>
                  <td style={cellStyle}>{row.usage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TokenSection>
    );
  },
};

type WeightArgs = { weight: string };

export const FontWeight: StoryObj<WeightArgs> = {
  args: { weight: 'normal' },
  argTypes: {
    weight: {
      control: { type: 'select' },
      options: WEIGHTS.map((w) => w.name),
      description: '미리 볼 font-weight 토큰을 선택합니다.',
    },
  },
  render: ({ weight }) => {
    const active = WEIGHTS.find((w) => w.name === weight);
    return (
      <TokenSection
        title="Font Weight"
        description="Tailwind 기본 `font-weight-*`을 참조합니다."
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
            {`font-weight-${weight}`}
          </code>
          <div className={active?.className} style={{ fontSize: 24 }}>
            {SAMPLE}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {WEIGHTS.map(({ name, className }) => (
            <div
              key={name}
              className={className}
              style={{
                background:
                  name === weight ? 'var(--color-bg-subtle)' : undefined,
                padding: '6px 8px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {`font-weight-${name}`} — {SAMPLE}
            </div>
          ))}
        </div>
      </TokenSection>
    );
  },
};

const TRACKING_VALUES: Record<string, string> = {
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
};

type TrackingArgs = { tracking: string };

export const LetterSpacing: StoryObj<TrackingArgs> = {
  args: { tracking: 'normal' },
  argTypes: {
    tracking: {
      control: { type: 'select' },
      options: TRACKING.map((t) => t.name),
      description: '미리 볼 letter-spacing 토큰을 선택합니다.',
    },
  },
  render: ({ tracking }) => {
    const active = TRACKING.find((t) => t.name === tracking);
    return (
      <TokenSection
        title="Letter Spacing"
        description={`Tailwind 기본 \`tracking-*\`을 참조합니다.\nem 단위라 작은 글자에서는 차이가 잘 안 보이니, 큰 글자 크기 기준으로 확인하세요.`}
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
            {`tracking-${tracking}`} · {TRACKING_VALUES[tracking]}
          </code>
          <div
            className={active?.className}
            style={{ fontSize: 28, fontWeight: 600 }}
          >
            {SAMPLE}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TRACKING.map(({ name, className }) => (
            <div
              key={name}
              className={className}
              style={{
                fontSize: 20,
                background:
                  name === tracking ? 'var(--color-bg-subtle)' : undefined,
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              {`tracking-${name}`} — {SAMPLE}
            </div>
          ))}
        </div>
      </TokenSection>
    );
  },
};

const LEADING_VALUES: Record<string, string> = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
};

type LeadingArgs = { leading: string };

export const LineHeight: StoryObj<LeadingArgs> = {
  args: { leading: 'normal' },
  argTypes: {
    leading: {
      control: { type: 'select' },
      options: LEADING.map((l) => l.name),
      description: '미리 볼 line-height 토큰을 선택합니다.',
    },
  },
  render: ({ leading }) => {
    const active = LEADING.find((l) => l.name === leading);
    return (
      <TokenSection
        title="Line Height"
        description="Tailwind 기본 `leading-*`을 참조합니다."
      >
        <div
          style={{
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-subtle)',
            padding: '24px 28px',
            marginBottom: 24,
            maxWidth: 320,
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
            {`leading-${leading}`} · {LEADING_VALUES[leading]}
          </code>
          <p className={active?.className} style={{ margin: 0 }}>
            {SAMPLE} {SAMPLE} {SAMPLE}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LEADING.map(({ name, className }) => (
            <div
              key={name}
              style={{
                maxWidth: 320,
                background:
                  name === leading ? 'var(--color-bg-subtle)' : undefined,
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <code>{`leading-${name}`}</code>
              <p className={className} style={{ margin: 0 }}>
                {SAMPLE} {SAMPLE} {SAMPLE}
              </p>
            </div>
          ))}
        </div>
      </TokenSection>
    );
  },
};
