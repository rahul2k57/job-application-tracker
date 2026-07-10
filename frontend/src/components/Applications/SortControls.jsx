function SortControls({
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
}) {
    return (
        <div className="flex gap-4">

            <div>

                <select
                    value={sortBy}
                    onChange={(event) =>
                        setSortBy(event.target.value)
                    }
                    className="
                        border
                        rounded-lg
                        px-3
                        py-2
                    "
                >
                    <option value="">SortBy</option>
                    <option value="company">Company</option>
                    <option value="role">Role</option>
                    <option value="status">Status</option>
                    <option value="applied_date">Applied Date</option>
                    <option value="deadline">Deadline</option>
                </select>
            </div>

            <div>

                <select
                    value={sortOrder}
                    onChange={(event) =>
                        setSortOrder(event.target.value)
                    }
                    className="
                        border
                        rounded-lg
                        px-3
                        py-2
                    "
                >
                    <option value="asc">
                        Ascending
                    </option>

                    <option value="desc">
                        Descending
                    </option>

                </select>
            </div>

        </div>
    );
}

export default SortControls;