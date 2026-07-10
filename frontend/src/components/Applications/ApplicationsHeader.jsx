import SortControls from "./SortControls";
function ApplicationsHeader({search, setSearch, status, setStatus, sortBy,setSortBy,sortOrder, setSortOrder,handleAddApplication}) {
    return (
        <div className="mb-6">

            {/* First Row */}
            <div className="flex justify-between items-center mb-4">

                <h1 className="text-3xl font-bold">
                    Applications
                </h1>

                <button
                onClick={handleAddApplication}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Application
                </button>

            </div>

            {/* Second Row */}
            <div className="flex justify-between items-center gap-4">

                <input
                    type="text"
                    placeholder="Search by company or role..."
                    value={search}
                    onChange={(event)=>setSearch(event.target.value)}   
                    className="
                        flex-1
                        border
                        border-gray-300
                        rounded-lg
                        px-4
                        py-2
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />
                <div className="flex items-end gap-4">
                <select
                    value={status}
                    onChange={(event) => {
                        setStatus(event.target.value);
                        }}
                    className="
                        border
                        border-gray-300
                        rounded-lg
                        px-3
                        py-2
                    "
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

        </div>
    );
}

export default ApplicationsHeader;