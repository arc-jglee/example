import {
  Controls,
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TokenSection } from './TokenSwatch';

const RADII = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'];
const RADIUS_PX: Record<string, string> = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  '4xl': '32px',
  full: '9999px',
};
const SHADOWS = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

type HeroArgs = { radius: string; shadow: string };

export const HeroPreview: StoryObj<HeroArgs> = {
  tags: ['!dev'],
  args: { radius: 'xl', shadow: 'lg' },
  argTypes: {
    radius: {
      control: { type: 'select' },
      options: RADII,
      description: 'radius 토큰을 선택합니다.',
    },
    shadow: {
      control: { type: 'select' },
      options: SHADOWS,
      description: 'shadow 토큰을 선택합니다.',
    },
  },
  render: ({ radius, shadow }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--color-bg-muted)',
        borderRadius: 'var(--radius-lg)',
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          background: 'var(--color-bg-surface)',
          borderRadius: `var(--radius-${radius})`,
          boxShadow: `var(--shadow-${shadow})`,
        }}
      />
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
    <StoryBlock of={Radius} />
    <StoryBlock of={Shadow} />
  </>
);

const meta: Meta = {
  title: 'Tokens/Radius & Shadow',
  parameters: { layout: 'padded', docs: { page: DocsPage } },
};

export default meta;

type RadiusArgs = { radius: string };

export const Radius: StoryObj<RadiusArgs> = {
  args: { radius: 'md' },
  argTypes: {
    radius: {
      control: { type: 'select' },
      options: RADII,
      description: '미리 볼 radius 토큰을 선택합니다.',
    },
  },
  render: ({ radius: selected }) => (
    <TokenSection
      title="Radius"
      description={`sm~4xl은 Tailwind 기본 \`radius-*\`클래스를 참조합니다.\nnone/full은 \`primitives/radius.css\`에서 보강.`}
    >
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {RADII.map((radius) => (
          <div
            key={radius}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: 6,
              borderRadius: 'var(--radius-md)',
              border:
                radius === selected
                  ? '1px solid var(--color-border-accent)'
                  : '1px solid transparent',
              background:
                radius === selected ? 'var(--color-bg-muted)' : undefined,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: 'var(--color-blue-500)',
                borderRadius: `var(--radius-${radius})`,
              }}
            />
            <code style={{ fontSize: 11 }}>
              {`radius-${radius} (${RADIUS_PX[radius]})`}
            </code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};

type ShadowArgs = { shadow: string };

export const Shadow: StoryObj<ShadowArgs> = {
  args: { shadow: 'md' },
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: SHADOWS,
      description: '미리 볼 shadow 토큰을 선택합니다.',
    },
  },
  render: ({ shadow: selected }) => (
    <TokenSection
      title="Shadow"
      description="Tailwind 기본 `shadow-*`클래스를 참조합니다."
    >
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          padding: 16,
          background: 'var(--color-bg-muted)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        {SHADOWS.map((shadow) => (
          <div
            key={shadow}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 6,
              borderRadius: 'var(--radius-md)',
              border:
                shadow === selected
                  ? '1px solid var(--color-border-accent)'
                  : '1px solid transparent',
            }}
          >
            <div
              style={{
                width: 96,
                height: 64,
                background: 'var(--color-bg-surface)',
                borderRadius: 'var(--radius-md)',
                boxShadow: `var(--shadow-${shadow})`,
              }}
            />
            <code style={{ fontSize: 11 }}>{`shadow-${shadow}`}</code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};
