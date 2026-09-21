import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileX, FolderOpen, Inbox, SearchX } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

const ICON_OPTIONS = [
  'none',
  'inbox',
  'folderOpen',
  'searchX',
  'fileX',
] as const;

const ICON_MAPPING: Record<(typeof ICON_OPTIONS)[number], ReactNode> = {
  none: undefined,
  inbox: <Inbox />,
  folderOpen: <FolderOpen />,
  searchX: <SearchX />,
  fileX: <FileX />,
};

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    title: '데이터가 없습니다',
    description: '아직 등록된 항목이 없습니다.',
    icon: 'inbox',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      mapping: ICON_MAPPING,
      description:
        '임의의 ReactNode를 전달하여 아이콘을 나타냅니다. 지정하지 않으면 아이콘 없이 title/description만 표시됩니다.',
    },
    action: {
      control: false,
      description: '재시도/생성 등 다음 행동을 유도하는 버튼을 전달합니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  args: {
    icon: 'inbox',
  },
};

export const WithAction: Story = {
  tags: ['!dev'],
  args: {
    icon: <FolderOpen />,
    title: '프로젝트가 없습니다',
    description: '새 프로젝트를 만들어 시작해보세요.',
    action: (
      <Button size="sm" variant="primary">
        프로젝트 생성
      </Button>
    ),
  },
};

export const SearchNoResult: Story = {
  tags: ['!dev'],
  args: {
    icon: <SearchX />,
    title: '검색 결과가 없습니다',
    description: '다른 검색어로 다시 시도해보세요.',
  },
};

export const WithoutIcon: Story = {
  tags: ['!dev'],
  args: {
    title: '표시할 항목이 없습니다',
    description: undefined,
  },
};
