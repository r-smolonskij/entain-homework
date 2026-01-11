export type PaginationItem = number | "ellipsis";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const clampPage = (page: number, totalPages: number) =>
  Math.min(Math.max(page, 1), totalPages);

export const buildPageItems = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  const maxVisible = 5;

  if (totalPages <= maxVisible + 2) return range(1, totalPages);

  const items: PaginationItem[] = [1];

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);
  const expand = maxVisible - 2 - (end - start + 1);
  if (expand > 0) {
    const before = Math.floor(expand / 2);
    const after = expand - before;
    start = Math.max(2, start - before);
    end = Math.min(totalPages - 1, end + after);
  }

  if (start > 2) items.push("ellipsis");

  items.push(...range(start, end));

  if (end < totalPages - 1) items.push("ellipsis");

  items.push(totalPages);

  return items;
};
