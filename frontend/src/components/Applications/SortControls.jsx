function SortControls({ sortBy, setSortBy, sortOrder, setSortOrder }) {
    const selectClass = "border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500";

    return (
        <div className="flex gap-3">
            <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className={selectClass}
            >
                <option value="">Sort by</option>
                <option value="company">Company</option>
                <option value="role">Role</option>
                <option value="status">Status</option>
                <option value="applied_date">Applied Date</option>
                <option value="deadline">Deadline</option>
            </select>

            <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className={selectClass}
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
}

export default SortControls;