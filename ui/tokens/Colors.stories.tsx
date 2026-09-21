import {
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColorSwatch, TokenSection } from './TokenSwatch';

/** ADS는 Tailwind에 없는 `25`를 포함해 12스텝이다. */
const ALL_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

type ScaleArgs = { steps: number[] };

const PRIMARY_SCALES = ['brand', 'error', 'warning', 'success'];
const NEUTRAL_SCALES = ['gray', 'neutral', 'stone', 'zinc', 'slate'];
const SECONDARY_SCALES = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];

function ScaleSwatches({ name, steps }: { name: string; steps: number[] }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {steps.map((step) => (
        <ColorSwatch
          key={step}
          name={`${name}-${step}`}
          value={`var(--color-${name}-${step})`}
        />
      ))}
    </div>
  );
}

/** 여러 팔레트를 이름표와 함께 세로로 쌓는다. */
function ScaleGroup({ names, steps }: { names: string[]; steps: number[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {names.map((name) => (
        <div key={name}>
          <code style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
            {name}
          </code>
          <div style={{ marginTop: 6 }}>
            <ScaleSwatches name={name} steps={steps} />
          </div>
        </div>
      ))}
    </div>
  );
}

const DocsPage = () => (
  <>
    <Title />
    <div
      style={{
        background: 'var(--color-brand-600)',
        color: '#fff',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 28px',
        marginBottom: 32,
      }}
    >
      <code
        style={{
          display: 'block',
          fontSize: 12,
          opacity: 0.7,
          marginBottom: 8,
        }}
      >
        --color-brand-600
      </code>
      <div style={{ fontSize: 'var(--text-heading-lg)', fontWeight: 700 }}>
        Brand
      </div>
    </div>
    <Subtitle />
    <Description />
    <StoryBlock of={Primary} />
    <StoryBlock of={Base} />
    <StoryBlock of={Neutral} />
    <StoryBlock of={Secondary} />
  </>
);

const meta: Meta<ScaleArgs> = {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          'Figma **ADS Colors**에서 새롭게 반영한 primitive 색상 토큰입니다.<br/>' +
          '`libs/ui/src/primitives/colors.css`에 CSS 커스텀 속성으로 정의되어 있는 단일 소스입니다.<br/><br/>' +
          '**이 레이어에는 의미가 없습니다.** 어떤 색을 어디에 쓸지는 `Tokens/Semantic`이 정하며,<br/>' +
          '다크테마 전환도 그 레이어에서만 일어납니다. 화면을 만들 때는 되도록 semantic 토큰을 먼저 찾아 쓰세요.<br/><br/>' +
          '⚠️ `25` 스텝은 Tailwind에 없어 `bg-red-25` 유틸리티가 생성되지 않습니다 — `bg-[var(--color-red-25)]`로 참조하세요.',
      },
    },
  },
  argTypes: {
    steps: {
      control: { type: 'inline-check' },
      options: ALL_STEPS,
      description: '화면에 표시할 step을 선택합니다.',
    },
  },
  args: {
    steps: ALL_STEPS,
  },
};

export default meta;
type Story = StoryObj<ScaleArgs>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '브랜드와 주요 상태를 표현하는 핵심 색상입니다. `brand`는 제품/브랜드에 따라 `data-brand` 속성으로 값이 달라지지만(`primitives/brands/*.css`), `error`·`warning`·`success`는 의미가 고정되어 브랜드와 무관하게 유지됩니다.',
      },
    },
  },
  render: ({ steps }) => (
    <TokenSection
      title="Primary"
      description="`brand`는 브랜드에 따라 달라지고, `error`·`warning`·`success`는 의미가 고정됩니다."
    >
      <ScaleGroup names={PRIMARY_SCALES} steps={steps} />
    </TokenSection>
  ),
};

export const Base: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '특정 색상 계열에 속하지 않는 절대 흑백입니다. White는 기본 배경이나 어두운 면 위의 텍스트/아이콘에, Black은 순수한 검정이 필요한 경우에만 제한적으로 사용합니다. 뉴트럴 스케일의 극단값(`gray-25`/`gray-950`)과는 다른 값입니다.',
      },
    },
  },
  render: () => (
    <TokenSection
      title="Base"
      description="절대 흑백. `gray-25`/`gray-950`과는 다른 값입니다."
    >
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <ColorSwatch name="white" value="var(--color-white)" />
        <ColorSwatch name="black" value="var(--color-black)" />
      </div>
    </TokenSection>
  ),
};

export const Neutral: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '텍스트·배경·테두리·아이콘 등 UI의 기본 구조에 쓰는 중성색입니다. `gray`가 ADS 기본값이고, 제품 성격에 따라 `zinc`(차가움)·`neutral`(순수 회색)·`stone`(따뜻함)·`slate`(푸른 기)를 고를 수 있습니다. **한 제품 안에서는 하나만 골라 일관되게 씁니다** — 여러 계열을 섞으면 회색끼리 미묘하게 어긋나 보입니다.',
      },
    },
  },
  render: ({ steps }) => (
    <TokenSection
      title="Neutral"
      description="`gray`가 기본값. 한 제품에서는 한 계열만 골라 일관되게 씁니다."
    >
      <ScaleGroup names={NEUTRAL_SCALES} steps={steps} />
    </TokenSection>
  ),
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '뱃지·태그·필터·카테고리·차트처럼 **정보의 유형이나 그룹을 색으로 구분**할 때 쓰는 보조색입니다. 보조 브랜드색 하나를 따로 지정하는 대신 16개 팔레트를 모두 제공하므로, 필요한 색을 골라 쓰면 됩니다. 다만 화면의 시각적 위계가 흐려지지 않도록 제한적으로 사용합니다.',
      },
    },
  },
  render: ({ steps }) => (
    <TokenSection
      title="Secondary"
      description="정보의 유형/그룹을 구분하는 보조색 16종. 위계를 흐리지 않게 제한적으로 씁니다."
    >
      <ScaleGroup names={SECONDARY_SCALES} steps={steps} />
    </TokenSection>
  ),
};
