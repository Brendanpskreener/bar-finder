const Pagination = ({currentPage, previousPage, nextPage}) => {

  return (
    <section>
      <button onClick={previousPage}>
        Prev
      </button>
      <ul>{currentPage}</ul>
      <button onClick={nextPage}>
        Next
      </button>
    </section>
  )
}

export default Pagination