function UpcomingDeadlines({ upcomingDeadlines }) {
    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        });
    }

    function daysLeft(date) {
        const diff = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
        if (diff === 0) return "Today";
        if (diff === 1) return "Tomorrow";
        return `${diff}d left`;
    }

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
                Upcoming Deadlines
            </h2>
            {upcomingDeadlines.length === 0 ? (
                <p className="text-base text-slate-400">No upcoming deadlines.</p>
            ) : (
                <div className="divide-y divide-slate-100">
                    {upcomingDeadlines.map((application) => (
                        <div key={application.id} className="flex items-center justify-between py-4">
                            <div>
                                <p className="text-base font-medium text-slate-800">
                                    {application.company}
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    {application.role}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-red-500">
                                    {daysLeft(application.deadline)}
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    {formatDate(application.deadline)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UpcomingDeadlines;