import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currentPage: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel='...'
      nextLabel='>'
      onPageChange={({ selected }: { selected: number }) => onPageChange(selected + 1)}
      pageRangeDisplayed={5}
      forcePage={currentPage - 1}
      pageCount={totalPages}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
}
