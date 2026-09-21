import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination';

const TOTAL_PAGES = 10;

type PaginationDemoProps = {
  initialPage?: number;
};

function PaginationDemo({ initialPage = 1 }: PaginationDemoProps) {
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const goTo = (target: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    setPage(Math.min(Math.max(target, 1), TOTAL_PAGES));
  };

  const showLeftEllipsis = page > 3;
  const showRightEllipsis = page < TOTAL_PAGES - 2;

  const middlePages = Array.from(
    { length: TOTAL_PAGES },
    (_, index) => index + 1,
  ).filter((n) => n !== 1 && n !== TOTAL_PAGES && Math.abs(n - page) <= 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            onClick={goTo(page - 1)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" isActive={page === 1} onClick={goTo(1)}>
            1
          </PaginationLink>
        </PaginationItem>

        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {middlePages.map((n) => (
          <PaginationItem key={n}>
            <PaginationLink href="#" isActive={page === n} onClick={goTo(n)}>
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive={page === TOTAL_PAGES}
            onClick={goTo(TOTAL_PAGES)}
          >
            {TOTAL_PAGES}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === TOTAL_PAGES}
            className={
              page === TOTAL_PAGES ? 'pointer-events-none opacity-50' : ''
            }
            onClick={goTo(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const meta: Meta<typeof PaginationDemo> = {
  title: 'Components/Data Display/Pagination',
  component: PaginationDemo,
  tags: ['autodocs'],
  args: {
    initialPage: 1,
  },
  argTypes: {
    initialPage: {
      control: { type: 'range', min: 1, max: TOTAL_PAGES, step: 1 },
      description: '초기 활성 페이지 (총 10페이지)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PaginationDemo>;

export const Basic: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" aria-disabled className="pointer-events-none opacity-50" />
    </PaginationItem>

    <PaginationItem>
      <PaginationLink href="#" isActive>
        1
      </PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>

    <PaginationItem>
      <PaginationLink href="#">10</PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      },
    },
  },
};
