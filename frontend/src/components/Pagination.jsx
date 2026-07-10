function Pagination({
    currentPage,
    totalPages,
    setPage,
}) {
    return (
        <div className="flex justify-between items-center mt-6">

            <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                Previous
            </button>

            <p>
                Page {currentPage} of {totalPages}
            </p>

            <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
            >
                Next
            </button>

        </div>
    );
}

export default Pagination;