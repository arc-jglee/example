import {
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment } from 'react';

import { TONES } from '../components/shared';
import { ColorSwatch, MainColorBanner, TokenSection } from './TokenSwatch';

type TokenRowEntry = string | { name: string; backdrop: string };

function TokenRow({ names }: { names: TokenRowEntry[] }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {names.map((entry) => {
        const name = typeof entry === 'string' ? entry : entry.name;
        const backdrop = typeof entry === 'string' ? undefined : entry.backdrop;
        return (
          <ColorSwatch
            key={name}
            name={name}
            value={`var(--color-${name})`}
            backdrop={backdrop}
          />
        );
      })}
    </div>
  );
}

const cellStyle: React.CSSProperties = {
  padding: '8px 10px',
  textAlign: 'left',
  verticalAlign: 'top',
  borderBottom: '1px solid var(--color-border-default)',
  color: 'var(--color-text-secondary)',
};

const headerCellStyle: React.CSSProperties = {
  ...cellStyle,
  color: 'var(--color-text-primary)',
  fontWeight: 600,
};

type UsageRow = {
  token: string;
  usage: string;
  example: string;
  /**
   * 라이트/다크 관계없이 항상 같은 값인 토큰(`semantic.css`의 dark 블록에
   * 대응 항목이 없는 토큰)에 표시. 프로즈에 묻히지 않도록 토큰명 옆에
   * 별도 배지로 보여준다.
   */
  fixed?: boolean;
};

/** `usage`/`example` 문자열 안의 `<br/>` 마커를 실제 줄바꿈으로 렌더링한다. */
function renderWithBreaks(text: string) {
  return text.split('<br/>').map((line, i, lines) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function FixedBadge() {
  return (
    <span
      title="라이트/다크 관계없이 항상 같은 값 (semantic.css의 dark 블록에 대응 항목 없음)"
      style={{
        marginLeft: 6,
        padding: '1px 6px',
        fontSize: 10,
        fontWeight: 600,
        borderRadius: 999,
        background: 'var(--color-bg-error)',
        color: 'var(--color-text-on-solid)',
        cursor: 'default',
      }}
    >
      고정
    </span>
  );
}

function UsageTable({ rows }: { rows: UsageRow[] }) {
  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13,
        marginTop: 16,
      }}
    >
      <thead>
        <tr>
          <th style={headerCellStyle}>토큰</th>
          <th style={headerCellStyle}>용도</th>
          <th style={headerCellStyle}>대표 사용처</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.token}>
            <td style={cellStyle}>
              <code>{`--color-${row.token}`}</code>
              {row.fixed && <FixedBadge />}
            </td>
            <td style={cellStyle}>{renderWithBreaks(row.usage)}</td>
            <td style={cellStyle}>{renderWithBreaks(row.example)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const STATUS_SCALES = [
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
];

const SHADOWS = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const DocsPage = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <MainColorBanner
      name="bg-accent"
      value="var(--color-bg-accent)"
      label="브랜드 메인 컬러 — 라이트 --color-brand-600 · 다크 --color-brand-400"
    />
    <StoryBlock of={Accent} />
    <StoryBlock of={Background} />
    <StoryBlock of={Text} />
    <StoryBlock of={Border} />
    <StoryBlock of={Status} />
    <StoryBlock of={Tone} />
    <StoryBlock of={Shadow} />
  </>
);

const meta: Meta = {
  title: 'Tokens/Semantic',
  parameters: {
    layout: 'padded',
    docs: {
      page: DocsPage,
      description: {
        component:
          'Primitive Tokens를 역할 기준으로 재매핑한 토큰입니다. 컴포넌트가 이 토큰만 참조하면 다크테마가 값 재매핑만으로 동작합니다.<br/>' +
          '`libs/ui/src/primitives/semantic.css`에 정의되어 있으며, 상단 툴바의 테마 토글에 실시간으로 반응합니다.<br/>' +
          '토큰 네이밍 규칙: `(--{category}-{property}-{scale})`',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const BACKGROUND_ROWS: UsageRow[] = [
  {
    token: 'bg-base',
    usage: '페이지 최상위 배경',
    example: 'body, 앱 최상단 배경',
  },
  {
    token: 'bg-subtle',
    usage: 'base보다 한 단계 눈에 띄는 배경 (hover wash)',
    example: 'outline/ghost 버튼 hover',
  },
  {
    token: 'bg-surface',
    usage: '떠 있는 표면의 배경 (라이트=흰색, 다크=base보다 밝게)',
    example: 'Card, Dropdown/Select/ContextMenu 콘텐츠, Input, Checkbox',
  },
  {
    token: 'bg-muted',
    usage: '채움/hover용 배경',
    example: 'Ghost 버튼 hover, Dropdown/Select item hover, disabled 배경',
  },
  {
    token: 'bg-inverse',
    usage: '반전 배경 (같은 테마 안에서 반대 톤이 필요할 때)',
    example: '입력창 hover 시 반전 강조 등',
  },
  {
    token: 'bg-overlay',
    usage: '모달 뒤를 덮는 반투명 딤',
    example: 'Dialog · Sheet · AlertDialog 오버레이',
  },
];

const TEXT_ROWS: UsageRow[] = [
  { token: 'text-primary', usage: '기본 텍스트', example: '제목, 본문' },
  {
    token: 'text-secondary',
    usage: '보조 텍스트',
    example: 'Alert 설명, hover 텍스트',
  },
  {
    token: 'text-tertiary',
    usage: '가장 약한 텍스트',
    example: '캡션, 타임스탬프, placeholder 아이콘',
  },
  {
    token: 'text-disabled',
    usage: '비활성 상태 텍스트',
    example: 'disabled 인풋, placeholder',
  },
  {
    token: 'text-inverse',
    usage: 'bg-inverse 위에 올라가는 텍스트',
    example: '반전 배경 위 텍스트',
  },
];

const BORDER_ROWS: UsageRow[] = [
  {
    token: 'border-default',
    usage: '기본 구분선/테두리',
    example: 'Card, Divider, 테이블 셀 구분선',
  },
  {
    token: 'border-strong',
    usage: '더 뚜렷한 테두리',
    example: 'Input, outline 버튼 테두리',
  },
];

const TONE_ROWS: UsageRow[] = [
  {
    token: 'tone-{색}-bg',
    usage: '구분용 배경<br/>(라이트 `{색}-100` · 다크 `{색}-900`)',
    example: 'Badge/Button/AvatarFallback `variant="secondary"` + `tone`',
  },
  {
    token: 'tone-{색}-bg-hover',
    usage: 'bg hover<br/>(라이트 `{색}-200` · 다크 `{색}-800`)',
    example: 'Button secondary hover',
  },
  {
    token: 'tone-{색}-text',
    usage: '위에 올라가는 텍스트<br/>(라이트 `{색}-800` · 다크 `{색}-100`)',
    example: 'Badge/Button secondary 텍스트',
  },
];

const ACCENT_ROWS: UsageRow[] = [
  {
    token: 'bg-accent',
    usage: '브랜드 강조 배경 (주요 액션)',
    example: 'Button primary',
  },
  {
    token: 'bg-accent-hover',
    usage: 'bg-accent hover',
    example: 'Button primary hover',
  },
  {
    token: 'bg-accent-subtle',
    usage: 'accent 톤의 옅은 강조 배경',
    example: '선택된 항목 하이라이트 (Z-index 데모 등)',
  },
  {
    token: 'accent-muted',
    usage: 'accent보다 톤 다운된 브랜드 배경/텍스트',
    example: 'Badge/Avatar primary variant, Spinner primary',
  },
  {
    token: 'text-accent',
    usage: '브랜드 톤 텍스트',
    example: '문서 섹션 타이틀 등 강조 텍스트',
  },
  {
    token: 'border-accent',
    usage: '브랜드 톤 테두리 · 포커스 링',
    example: 'focus-visible ring, Select 열림 상태 테두리',
  },
  {
    token: 'text-on-solid',
    usage: 'accent/status의 solid 배경 위 텍스트·아이콘<br/>(흰색, 테마 무관)',
    example: 'Button primary/destructive 텍스트, Badge destructive 텍스트',
    fixed: true,
  },
  {
    token: 'text-on-solid-muted',
    usage: 'solid 배경 위의 흐린 보조 텍스트·아이콘<br/>(흰색 60% 불투명도)',
    example: '사이드바 섹션 라벨, 비활성 메뉴',
    fixed: true,
  },
];

function statusRows(key: string): UsageRow[] {
  return [
    {
      token: `bg-${key}`,
      usage: 'solid 배경',
      example: `Button destructive, Checkbox/Switch checked (${key})`,
    },
    {
      token: `bg-${key}-hover`,
      usage: 'solid 배경 hover',
      example: 'Button destructive hover',
    },
    {
      token: `bg-${key}-subtle`,
      usage: '옅은 배경',
      example: 'Badge, Alert',
    },
    {
      token: `text-${key}`,
      usage: '아이콘 · 텍스트',
      example: 'Alert 아이콘/텍스트, dropdown destructive 텍스트',
    },
    {
      token: `text-${key}-strong`,
      usage: 'subtle 배경 위에서 쓰는 진한 텍스트',
      example: 'Badge 텍스트, dropdown hover 텍스트',
    },
    {
      token: `border-${key}`,
      usage: '강조선 · 포커스 링',
      example: 'Alert 좌측 바, Checkbox/Switch focus ring',
    },
  ];
}

export const Accent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '브랜드(primary) 색의 role. `text-on-solid`는 accent/status의 solid 배경 위에 올라가는 텍스트·아이콘 색입니다.',
      },
    },
  },
  render: () => (
    <TokenSection title="Accent" description="`--color-bg-accent` 등">
      <TokenRow
        names={[
          'bg-accent',
          'bg-accent-hover',
          'bg-accent-subtle',
          'accent-muted',
          'text-accent',
          'border-accent',
          { name: 'text-on-solid', backdrop: 'var(--color-bg-accent)' },
          { name: 'text-on-solid-muted', backdrop: 'var(--color-bg-accent)' },
        ]}
      />
      <UsageTable rows={ACCENT_ROWS} />
    </TokenSection>
  ),
};

export const Background: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`base`(페이지) → `subtle`(hover wash) → `surface`(카드·팝오버·인풋) → `muted`(채움/hover) 순으로 갈수록 밝아지며, ' +
          '다크에서는 이 단계 차이로 그림자 없이도 입체감을 냅니다.',
      },
    },
  },
  render: () => (
    <TokenSection title="Background" description="`--color-bg-*`">
      <TokenRow
        names={[
          'bg-base',
          'bg-subtle',
          'bg-surface',
          'bg-muted',
          'bg-inverse',
          // 반투명 딤이라 흰 배경 위에서는 안 보인다. 밝은 색을 뒤에 깔아야
          // 알파가 드러난다(다른 bg-* 와 달리 color-mix 로 만든 반투명 값이다).
          { name: 'bg-overlay', backdrop: 'var(--color-bg-accent)' },
        ]}
      />
      <UsageTable rows={BACKGROUND_ROWS} />
    </TokenSection>
  ),
};

export const Text: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`primary` → `secondary` → `tertiary` → `disabled` 순으로 대비가 낮아지는 4단계 텍스트 위계입니다.',
      },
    },
  },
  render: () => (
    <TokenSection title="Text" description="`--color-text-*`">
      <TokenRow
        names={[
          'text-primary',
          'text-secondary',
          'text-tertiary',
          'text-disabled',
          'text-inverse',
        ]}
      />
      <UsageTable rows={TEXT_ROWS} />
    </TokenSection>
  ),
};

export const Border: Story = {
  render: () => (
    <TokenSection title="Border" description="`--color-border-*`">
      <TokenRow names={['border-default', 'border-strong']} />
      <UsageTable rows={BORDER_ROWS} />
    </TokenSection>
  ),
};

export const Status: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Success·Warning·Error 3종 상태 색상. 각 상태마다 solid 배경(`bg-{status}`), subtle 배경(`bg-{status}-subtle`), ' +
          '텍스트(`text-{status}`, `text-{status}-strong`), 강조선(`border-{status}`)을 제공합니다.',
      },
    },
  },
  render: () => (
    <TokenSection
      title="Status"
      description="`--color-{bg,text,border}-{status}*`"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {STATUS_SCALES.map(({ key, label }) => (
          <div key={key}>
            <code style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              {label}
            </code>
            <div style={{ marginTop: 6 }}>
              <TokenRow
                names={[
                  `bg-${key}`,
                  `bg-${key}-hover`,
                  `bg-${key}-subtle`,
                  `text-${key}`,
                  `text-${key}-strong`,
                  `border-${key}`,
                ]}
              />
            </div>
          </div>
        ))}
      </div>
      <UsageTable rows={statusRows('status')} />
    </TokenSection>
  ),
};

export const Tone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'status(success/warning/error)가 *의미*를 갖는 것과 달리, tone은 **여러 갈래를 색으로 구분하기만** 하는 용도입니다 — 부서, 카테고리, 태그.<br/>' +
          'ADS Secondary 16색이 컴포넌트로 들어오는 경로이며, `Button`·`Badge`·`AvatarFallback`의 `variant="secondary"`에 `tone` prop으로 지정합니다.<br/><br/>' +
          '**팔레트(`--color-teal-100`)를 컴포넌트에서 직접 참조하지 않는 이유**: 이 라이브러리에는 `dark:` 접두사를 쓰는 컴포넌트가 없고 테마 전환이 전부 이 레이어의 재매핑으로만 일어납니다. ' +
          '팔레트를 직접 쓰면 다크에서 밝은 배경이 그대로 남습니다.<br/><br/>' +
          '**텍스트가 700이 아니라 800인 이유**: 16색 전부에서 AA를 넘겨야 하는데 700은 green이 4.50으로 여유가 없습니다. 800이면 최소 6.37입니다.<br/>' +
          '**solid(진한 배경 + 흰 텍스트)가 아닌 이유**: 16색 중 8색(orange·yellow·lime·green·emerald·teal·cyan·sky)이 AA에 못 미치고, primary와 무게도 구분되지 않습니다.',
      },
    },
  },
  render: () => (
    <TokenSection
      title="Tone"
      description="`--color-tone-{색}-{bg,bg-hover,text}` — ADS Secondary 16색"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {TONES.map((tone) => (
          <div key={tone}>
            <code style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              {tone}
            </code>
            <div style={{ marginTop: 6 }}>
              <TokenRow
                names={[
                  `tone-${tone}-bg`,
                  `tone-${tone}-bg-hover`,
                  `tone-${tone}-text`,
                ]}
              />
            </div>
          </div>
        ))}
      </div>
      <UsageTable rows={TONE_ROWS} />
    </TokenSection>
  ),
};

export const Shadow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`--shadow-*`는 색 토큰은 아니지만 같은 방식으로 `[data-theme="dark"]`에서 재정의됩니다. ' +
          '라이트에서는 검은 그림자만으로 충분하지만, 다크에서는 이미 어두운 배경 위라 검은 그림자가 거의 안 보이므로 ' +
          '다크 전용 값은 불투명도를 높이고 흰색 rim light를 더해 입체감을 살립니다. `libs/ui/src/primitives/shadow.css`에 정의.',
      },
    },
  },
  render: () => (
    <TokenSection
      title="Shadow"
      description="`--shadow-*` (`primitives/shadow.css`)"
    >
      <div
        style={{
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
          padding: 24,
          background: 'var(--color-bg-muted)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        {SHADOWS.map((step) => (
          <div
            key={step}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 96,
                height: 64,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-surface)',
                boxShadow: `var(--shadow-${step})`,
              }}
            />
            <code
              style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}
            >
              {`shadow-${step}`}
            </code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};
