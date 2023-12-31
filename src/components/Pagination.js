import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav>
      <ul className="flex items-center -space-x-px h-10 text-base flex-wrap">
        <li>
          <button
            className={`flex items-center justify-center px-3 sm:px-4 sm:text-base h-10 leading-tight border border-gray-300 text-white rounded-l-lg ${
              currentPage !== 1
              ? "enabled bg-blue-900 hover:text-white dark:hover:text-white hover:bg-primary-700 dark:bg-primaryDark-500 dark:hover:bg-primaryDark-200"
              : "bg-blue-200 dark:bg-slate-500"
            } `}
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-double-left text-[10px]"></i>
          </button>
        </li>

        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li key={index}>
                <span className="flex items-center justify-center px-3 text-[12px] sm:px-4 sm:text-base h-10 leading-tight text-gray-500 border dark:text-white dark:bg-slate-600">
                  &#8230;
                </span>
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => onPageChange(pageNumber)}
            >
              <span
                className={`flex items-center justify-center px-3 text-[10px] sm:px-4 sm:text-base h-10 leading-tight text-gray-500 hover:bg-blue-300 dark:hover:bg-accentDark-600 dark:hover:text-white hover:text-gray-700 border ${
                  currentPage === pageNumber ?
                  "bg-blue-800 text-white hover:bg-blue-800 hover:text-white dark:bg-primaryDark-500 dark:hover:bg-primaryDark-500" : "dark:bg-slate-600 dark:text-white"
                }`}
              >
                {pageNumber}
              </span>
            </li>
          );
        })}

        {/*  Right Navigation arrow */}
        <li>
          <button
            className={`flex items-center justify-center px-3 text-[10px] sm:px-4 sm:text-base h-10 leading-tight border border-gray-300 text-white rounded-r-lg ${
              currentPage !== lastPage
                ? "enabled bg-blue-900 hover:text-white dark:hover:text-white hover:bg-primary-700 dark:bg-primaryDark-500 dark:hover:bg-primaryDark-200"
                : "bg-blue-200 dark:bg-slate-500"
            } `}
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            <i className="bi bi-chevron-double-right text-[10px]"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
