import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { TONES } from '../shared';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

const FALLBACK_IMAGE_SRC =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=128&h=128&fit=crop';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    size: 'lg',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description:
        '- **sm**: `size-8`(32px)\n' +
        '- **md**: `size-10`(40px)\n' +
        '- **lg**: `size-12`(48px)\n' +
        '- **xl**: `size-14`(56px)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback variant="primary">SB</AvatarFallback>
    </Avatar>
  ),
};

/**
 * 데모 이미지(`.storybook/public/profile.jpg`)는 Unsplash에서 가져왔다.
 * 원본: https://images.unsplash.com/photo-1494790108377-be9c29b29330
 * 받을 때 쓴 파라미터: `?w=512&h=512&fit=crop&crop=faces&q=82&fm=jpg`
 * (Unsplash License — 저작자 표기 의무는 없으나 추적 가능하도록 남긴다.)
 *
 * **512x512 정사각**인 것이 중요하다. 이전 애셋은 480x640 증명사진이었는데,
 * 아바타는 정사각 컨테이너라 `object-cover`가 세로를 잘라내면서 머리가 위에서
 * 잘리고 아래가 상의로 채워졌다. 정사각 원본은 크롭이 발생하지 않는다.
 * 얼굴 중심 크롭은 Unsplash CDN(imgix)의 `crop=faces`가 처리했다.
 */
function AvatarWithImage(args: ComponentProps<typeof Avatar>) {
  const [src, setSrc] = useState(`${import.meta.env.BASE_URL}profile.jpg`);

  return (
    <Avatar {...args}>
      <AvatarImage
        src={src}
        alt="사용자 프로필 이미지"
        onError={() => setSrc(FALLBACK_IMAGE_SRC)}
      />
      <AvatarFallback variant="primary">Arc</AvatarFallback>
    </Avatar>
  );
}

export const WithImage: Story = {
  tags: ['!dev'],
  render: (args) => <AvatarWithImage {...args} />,
};

const FALLBACK_VARIANTS: NonNullable<
  ComponentProps<typeof AvatarFallback>['variant']
>[] = ['primary', 'secondary', 'success', 'warning', 'error'];

export const FallbackVariants: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`primary`는 브랜드색, `success`/`warning`/`error`는 상태색입니다 — 셋 다 **의미가 고정**입니다.<br/>' +
          '`secondary`는 의미가 없는 중성(회색)이고, `tone`으로 색을 골라 갈래를 구분할 수 있습니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {FALLBACK_VARIANTS.map((variant) => (
        <Avatar key={variant} {...args}>
          <AvatarFallback variant={variant}>
            {variant.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

const SIZES: NonNullable<Story['args']>['size'][] = ['sm', 'md', 'lg', 'xl'];

export const Sizes: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  {SIZES.map((size) => (
    <Avatar key={size} size={size}>
      <AvatarFallback variant="primary">SB</AvatarFallback>
    </Avatar>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {SIZES.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback variant="primary">SB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Group: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<AvatarGroup size="md" max={3}>
  <Avatar>
    <AvatarFallback variant="primary">A</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="success">B</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="warning">C</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="error">D</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="primary">E</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="primary">F</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="success">G</AvatarFallback>
  </Avatar>
  <Avatar>
    <AvatarFallback variant="warning">H</AvatarFallback>
  </Avatar>
</AvatarGroup>`,
      },
    },
  },
  render: () => (
    <AvatarGroup size="md" max={3}>
      <Avatar>
        <AvatarFallback variant="primary">A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="success">B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="warning">C</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="error">D</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="primary">E</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="primary">F</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="success">G</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback variant="warning">H</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

/**
 * 사람·조직을 색으로 구분하는 경우. 아바타는 이름 이니셜만 남는 작은 원이라
 * 색이 사실상 유일한 식별 단서인데, 그렇다고 "김씨는 성공, 이씨는 경고"처럼
 * 상태색을 빌려 쓰면 뜻이 어긋난다. tone이 필요한 대표적인 자리다.
 */
export const SecondaryTones: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          '`variant="secondary"`에 `tone`을 주면 ADS Secondary 16색 중 하나로 바뀝니다. ' +
          '`tone`을 생략하면 중성(회색)입니다.<br/><br/>' +
          '아바타는 이니셜만 남는 작은 원이라 **색이 유일한 식별 단서**인데, 사람을 구분하려고 `success`/`error` 같은 상태색을 빌려 쓰면 뜻이 어긋납니다.<br/>' +
          '`primary`(브랜드)나 상태색에는 `tone`이 적용되지 않는 것도 같은 이유입니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Avatar {...args}>
        <AvatarFallback variant="secondary">--</AvatarFallback>
      </Avatar>
      {TONES.map((tone) => (
        <Avatar key={tone} {...args}>
          <AvatarFallback variant="secondary" tone={tone}>
            {tone.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** 이름 → tone 을 고정 배정해서, 같은 사람이 화면마다 같은 색으로 나오게 하는 예. */
const TEAM: { name: string; initials: string; tone: (typeof TONES)[number] }[] =
  [
    { name: '이재건', initials: 'JG', tone: 'indigo' },
    { name: '김인나', initials: 'IN', tone: 'teal' },
    { name: '전재영', initials: 'JY', tone: 'violet' },
    { name: '임호진', initials: 'HJ', tone: 'orange' },
    { name: '이승준', initials: 'SJ', tone: 'pink' },
  ];

export const TonePerPerson: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      description: {
        story:
          'tone을 사람마다 고정 배정한 예입니다.<br/>아바타 색이 이름을 대신하는 식별자로 동작하므로, ' +
          '**같은 사람은 어느 화면에서든 같은 색**이어야 합니다.',
      },
    },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {TEAM.map((member) => (
        <div
          key={member.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Avatar {...args}>
            <AvatarFallback variant="secondary" tone={member.tone}>
              {member.initials}
            </AvatarFallback>
          </Avatar>
          <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
            {member.name}
          </span>
        </div>
      ))}
    </div>
  ),
};
