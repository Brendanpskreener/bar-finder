const Pagination = ({currentPage, previousPage, nextPage, perPage, pageLength}) => {

  return (
    <div className="pagination">
      <button onClick={previousPage}>
        Prev
      </button>
      <div className="page">{currentPage}</div>
      <button onClick={nextPage} disabled={pageLength < perPage}>
        Next
      </button>
    </div>
  )
}

export default Pagination