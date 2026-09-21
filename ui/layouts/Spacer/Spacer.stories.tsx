import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spacer, type SpacerProps } from './Spacer';

type BasicArgs = SpacerProps & { showSpacer: boolean };

const meta: Meta<BasicArgs> = {
  title: 'Layouts/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  args: { showSpacer: true },
  argTypes: {
    showSpacer: {
      control: 'boolean',
      description: 'Spacer 유무에 따라 배치가 어떻게 달라지는지 비교',
    },
  },
};

export default meta;

export const Basic: StoryObj<BasicArgs> = {
  render: ({ showSpacer }) => (
    <div className="flex w-full items-center rounded-[var(--radius-lg)] bg-[var(--color-bg-subtle)] p-3">
      <img
        src={`${import.meta.env.BASE_URL}arcsquare_title_black.png`}
        alt="Arcsquare"
        className="h-6 w-auto [[data-theme=dark]_&]:hidden"
      />
      <img
        src={`${import.meta.env.BASE_URL}arcsquare_title_white.png`}
        alt="Arcsquare"
        className="hidden h-6 w-auto [[data-theme=dark]_&]:block"
      />
      {showSpacer && (
        <Spacer className="text-md flex items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-warning)] bg-[var(--color-bg-warning-subtle)] text-[var(--color-text-warning-strong)]">
          Spacer
        </Spacer>
      )}
      <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] px-4 py-2 text-sm text-[var(--color-text-on-solid)]">
        로그인
      </div>
    </div>
  ),
};
