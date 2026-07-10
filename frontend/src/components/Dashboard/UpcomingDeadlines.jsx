function UpcomingDeadlines({
    upcomingDeadlines,
}) {

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
                Upcoming Deadlines
            </h2>

            {upcomingDeadlines.length === 0 ? (

                <p className="text-gray-500">
                    No upcoming deadlines.
                </p>

            ) : (

                upcomingDeadlines.map((application) => (

                    <div
                        key={application.id}
                        className="flex justify-between py-3 border-b"
                    >

                        <div>

                            <p className="font-medium">
                                {application.company}
                            </p>

                            <p className="text-sm text-gray-500">
                                {application.role}
                            </p>

                        </div>

                        <span className="text-sm text-red-600 font-medium">
                            {formatDate(application.deadline)}
                        </span>

                    </div>

                ))

            )}

        </div>

    );
}

export default UpcomingDeadlines;