import {
  Controls,
  Description,
  Story as StoryBlock,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TokenSection } from './TokenSwatch';

const Z_INDEX = [
  'dropdown',
  'sticky',
  'overlay',
  'modal',
  'popover',
  'tooltip',
  'toast',
];
const Z_INDEX_VALUES: Record<string, number> = {
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
};
const Z_INDEX_USAGE: Record<string, string> = {
  dropdown: '셀렉트/메뉴 등 드롭다운 패널',
  sticky: '스크롤 시 고정되는 헤더/사이드바',
  overlay: '모달 뒤 배경(딤 레이어)',
  modal: '모달/다이얼로그 콘텐츠',
  popover: '트리거 요소에 붙는 팝오버/컨텍스트 메뉴',
  tooltip: '호버/포커스 시 나타나는 툴팁',
  toast: '화면 최상단에 떠야 하는 토스트/알림',
};
const BORDER_WIDTHS = [0, 1, 2, 4, 8];
const BORDER_COLORS = [
  'gray-300',
  'gray-500',
  'primary-500',
  'success-500',
  'warning-500',
  'error-500',
  'info-500',
];

type HeroArgs = { borderWidth: number; borderColor: string };

export const HeroPreview: StoryObj<HeroArgs> = {
  tags: ['!dev'],
  args: { borderWidth: 2, borderColor: 'primary-500' },
  argTypes: {
    borderWidth: {
      control: { type: 'select' },
      options: BORDER_WIDTHS,
      description: 'border-width 토큰을 선택합니다.',
    },
    borderColor: {
      control: { type: 'select' },
      options: BORDER_COLORS,
      description: 'border-color로 쓸 색상 토큰을 선택합니다.',
    },
  },
  render: ({ borderWidth, borderColor }) => (
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
          borderRadius: 'var(--radius-xl)',
          borderStyle: 'solid',
          borderColor: `var(--color-${borderColor})`,
          borderWidth: `var(--border-width-${borderWidth})`,
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
    <StoryBlock of={ZIndex} />
    <StoryBlock of={BorderWidth} />
  </>
);

const meta: Meta = {
  title: 'Tokens/Z-index & Border',
  parameters: { layout: 'padded', docs: { page: DocsPage } },
};

export default meta;

type ZIndexArgs = { zIndex: string };

export const ZIndex: StoryObj<ZIndexArgs> = {
  args: { zIndex: 'modal' },
  argTypes: {
    zIndex: {
      control: { type: 'select' },
      options: Z_INDEX,
      description: '강조해서 볼 z-index 토큰을 선택합니다.',
    },
  },
  render: ({ zIndex: selected }) => (
    <TokenSection
      title="Z-index"
      description="`primitives/z-index.css`에서 직접 정의. 값이 클수록 위 레이어에 쌓입니다."
    >
      <div
        style={{
          position: 'relative',
          height: 260,
          marginBottom: 24,
          background: 'var(--color-bg-muted)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {/* DOM 순서를 일부러 뒤집어 렌더링해도, z-index 값이 실제 쌓임 순서를 결정함을 보여줌 */}
        {[...Z_INDEX].reverse().map((name, reversedIndex) => {
          const index = Z_INDEX.length - 1 - reversedIndex;
          const isSelected = name === selected;
          return (
            <div
              key={name}
              style={{
                position: 'absolute',
                top: isSelected ? 94 : 16 + index * 24,
                left: isSelected ? 480 : 16 + index * 48,
                width: isSelected ? 200 : 140,
                height: isSelected ? 120 : 72,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                padding: 10,
                borderRadius: 'var(--radius-md)',
                background: isSelected
                  ? 'var(--color-bg-accent-subtle)'
                  : 'var(--color-bg-surface)',
                border: isSelected
                  ? '1px solid var(--color-border-accent)'
                  : '1px solid transparent',
                boxShadow: isSelected ? 'var(--shadow-xl)' : 'var(--shadow-md)',
                zIndex: `var(--z-${name})`,
                transition:
                  'top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease',
              }}
            >
              <code style={{ fontSize: 12, fontWeight: 600 }}>
                {`z-${name} (${Z_INDEX_VALUES[name]})`}
              </code>
              {isSelected && (
                <span
                  style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}
                >
                  {Z_INDEX_USAGE[name]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Z_INDEX.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <code style={{ width: 100 }}>{`z-${name}`}</code>
            <code style={{ width: 60, color: 'var(--color-text-tertiary)' }}>
              {Z_INDEX_VALUES[name]}
            </code>
            <span
              style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}
            >
              {Z_INDEX_USAGE[name]}
            </span>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};

type BorderWidthArgs = { borderWidth: number };

export const BorderWidth: StoryObj<BorderWidthArgs> = {
  args: { borderWidth: 1 },
  argTypes: {
    borderWidth: {
      control: { type: 'select' },
      options: BORDER_WIDTHS,
      description: '미리 볼 border-width 토큰을 선택합니다.',
    },
  },
  render: ({ borderWidth: selected }) => (
    <TokenSection
      title="Border Width"
      description="`primitives/border.css`에서 직접 정의. border-color는 Color Tokens를 그대로 사용."
    >
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {BORDER_WIDTHS.map((width) => (
          <div
            key={width}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 6,
              borderRadius: 'var(--radius-md)',
              border:
                width === selected
                  ? '1px solid var(--color-border-accent)'
                  : '1px solid transparent',
              background:
                width === selected ? 'var(--color-bg-muted)' : undefined,
            }}
          >
            <div
              style={{
                width: 88,
                height: 56,
                borderRadius: 6,
                borderStyle: 'solid',
                background: 'var(--color-gray-300)',
                borderColor: 'var(--color-blue-500)',
                borderWidth: `var(--border-width-${width})`,
              }}
            />
            <code style={{ fontSize: 11 }}>{`border-width-${width}`}</code>
          </div>
        ))}
      </div>
    </TokenSection>
  ),
};
