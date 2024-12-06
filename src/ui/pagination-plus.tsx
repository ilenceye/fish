import { createContext, useContext, useState } from 'react';

import { cn } from '~/lib/cn';
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
} from '~/ui/pagination';

type PaginationContextValue = {
  currentPage: number;
  length: number;
  go: (next: number) => void;
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
};

const PaginationContext = createContext<PaginationContextValue | null>(null);

const usePagination = () => {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error('usePagination should be used within <PaginationContext>');
  }

  return context;
};

type ProviderProps = {
  children: React.ReactNode;
  total: number;
  size: number;
};

const PaginationProvider = ({ children, total, size }: ProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * size;
  const end = start + size - 1;
  const length = Math.ceil(total / size);

  const go = (next: number) => {
    if (next <= 0) {
      return;
    }

    if (next > length) {
      return;
    }

    setCurrentPage(next);
  };

  return (
    <PaginationContext.Provider value={{ currentPage, length, go, start, end }}>
      {children}
    </PaginationContext.Provider>
  );
};

type PaginationProps = {
  max?: number;
};

const Pagination = ({ max = 5 }: PaginationProps) => {
  const { currentPage, length, go } = usePagination();

  const [offset, setOffset] = useState(0);
  const visibleFirstPage = offset + 1;

  const pages = Array.from({ length }, (_, k) => k + 1).slice(
    offset,
    offset + max,
  );

  const back = () => {
    const next = currentPage - 1;
    if (next < visibleFirstPage && next > 0) setOffset((o) => o - 1);
    go(next);
  };

  const forward = () => {
    const next = currentPage + 1;
    if (next - visibleFirstPage >= max) setOffset((o) => o + 1);
    go(next);
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'cursor-pointer',
              currentPage === 1 && 'pointer-events-none opacity-50',
            )}
            onClick={back}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="cursor-pointer"
              {...(page === currentPage && { isActive: true })}
              onClick={() => go(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={cn(
              'cursor-pointer',
              currentPage === length && 'pointer-events-none opacity-50',
            )}
            onClick={forward}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

export { PaginationProvider, Pagination, usePagination };
