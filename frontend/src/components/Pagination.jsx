function Pagination({ currentPage, totalPages, setPage }) {
    return (
        <div className="flex items-center justify-between mt-5">
            <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-sm text-slate-600 border border-slate-300 px-3.5 py-2 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition duration-150"
            >
                Previous
            </button>

            <p className="text-sm text-slate-400">
                Page <span className="text-slate-700 font-medium">{currentPage}</span> of <span className="text-slate-700 font-medium">{totalPages}</span>
            </p>

            <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-sm text-slate-600 border border-slate-300 px-3.5 py-2 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition duration-150"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;