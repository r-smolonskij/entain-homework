import Button from "../Button/Button";
import "./Pagination.scss";
import { buildPageItems, clampPage } from "./pagination.helpers";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrent = clampPage(currentPage, totalPages);
  const items = buildPageItems(safeCurrent, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <Button
        className="pagination__button pagination__button--nav"
        variant="outlined"
        size="sm"
        onClick={() => onPageChange(safeCurrent - 1)}
        disabled={safeCurrent === 1}
      >
        Prev
      </Button>

      <div className="pagination__pages">
        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                …
              </span>
            );
          }

          const isActive = item === safeCurrent;

          return (
            <Button
              key={item}
              className={`pagination__button pagination__button--page${
                isActive ? " pagination__button--active" : ""
              }`}
              variant="outlined"
              size="sm"
              onClick={() => onPageChange(item)}
              aria-current={isActive ? "page" : undefined}
              disabled={isActive}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <Button
        className="pagination__button pagination__button--nav"
        variant="outlined"
        size="sm"
        onClick={() => onPageChange(safeCurrent + 1)}
        disabled={safeCurrent === totalPages}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;
