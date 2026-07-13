import SortControls from "./SortControls";

function ApplicationsHeader({ search, setSearch, status, setStatus, sortBy, setSortBy, sortOrder, setSortOrder, handleAddApplication }) {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Applications
                </h1>
                <button
                    onClick={handleAddApplication}
                    className="bg-indigo-600 text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-indigo-700 transition duration-150"
                >
                    + Add Application
                </button>
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="flex-1 border border-slate-300 rounded-md px-4 py-2.5 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                />
                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">All Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Online Assessment">Online Assessment</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                </select>
                <SortControls
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>
        </div>
    );
}

export default ApplicationsHeader;