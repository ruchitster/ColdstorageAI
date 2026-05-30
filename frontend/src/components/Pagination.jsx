export default function Pagination({ page, setPage }) {
  return (
    <div className="pagination" data-testid="report-pagination">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span>Page {page}</span>

      <button onClick={() => setPage(page + 1)}>
        Next
      </button>

    </div>
  );
}
