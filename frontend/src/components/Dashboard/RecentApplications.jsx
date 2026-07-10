function RecentApplications({
    recentApplications,
}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
                Recent Applications
            </h2>

            {recentApplications.map((application) => (

                <div
                    key={application.id}
                    className="
                        flex
                        justify-between
                        py-3
                        border-b
                    "
                >

                    <div>

                        <p className="font-medium">
                            {application.company}
                        </p>

                        <p className="text-sm text-gray-500">
                            {application.role}
                        </p>

                    </div>

                    <span className="text-sm">
                        {application.status}
                    </span>

                </div>

            ))}

        </div>

    );
}

export default RecentApplications;