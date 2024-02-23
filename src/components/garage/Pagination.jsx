import "./pagination.css";

export default function Pagination({
  nPages,
  currentPage,
  setCurrentPage,
  paginate,
}) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="paginator">
      <ul>
        <li className="page-item">
          <a href="!#" onClick={goToPrevPage}>
            Prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="!#" onClick={goToNextPage}>
            Prev
          </a>
        </li>
      </ul>
    </div>
  );
}
