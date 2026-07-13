const statusStyles = {
    "Applied":           "bg-slate-100 text-slate-600",
    "Online Assessment": "bg-violet-50 text-violet-700",
    "Interview":         "bg-amber-50 text-amber-700",
    "Offer":             "bg-emerald-50 text-emerald-700",
    "Rejected":          "bg-red-50 text-red-600",
    "Withdrawn":         "bg-slate-100 text-slate-400",
};

function RecentApplications({ recentApplications }) {
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
                Recent Applications
            </h2>
            {recentApplications.length === 0 ? (
                <p className="text-base text-slate-400">No applications yet.</p>
            ) : (
                <div className="divide-y divide-slate-100">
                    {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between py-4">
                            <div>
                                <p className="text-base font-medium text-slate-800">
                                    {application.company}
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    {application.role}
                                </p>
                            </div>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusStyles[application.status] || "bg-slate-100 text-slate-600"}`}>
                                {application.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentApplications;