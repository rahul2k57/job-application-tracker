import ApplicationRow from "./ApplicationRow";

function ApplicationsTable({ applications, handleEditApplication, handleDeleteApplication, handleViewApplication }) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Company</th>
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Role</th>
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Status</th>
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Applied</th>
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Deadline</th>
                        <th className="text-left px-5 py-4 text-sm font-medium text-slate-600">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-5 py-16 text-center">
                                <p className="text-slate-400 text-base">No applications found.</p>
                                <p className="text-slate-300 text-sm mt-1">Try adjusting your search or filters.</p>
                            </td>
                        </tr>
                    ) : (
                        applications.map((application) => (
                            <ApplicationRow
                                key={application.id}
                                application={application}
                                handleEditApplication={handleEditApplication}
                                handleDeleteApplication={handleDeleteApplication}
                                handleViewApplication={handleViewApplication}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicationsTable;