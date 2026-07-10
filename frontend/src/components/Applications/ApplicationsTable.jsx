import ApplicationRow from "./ApplicationRow";

function ApplicationsTable({ applications, handleEditApplication,handleDeleteApplication,handleViewApplication}) {
    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">

            <table className="min-w-full">

                <thead>

                    <tr className="border-b bg-gray-50">

                        <th className="text-left p-4">
                            Company
                        </th>

                        <th className="text-left p-4">
                            Role
                        </th>

                        <th className="text-left p-4">
                            Status
                        </th>

                        <th className="text-left p-4">
                            Applied
                        </th>

                        <th className="text-left p-4">
                            Deadline
                        </th>

                        <th className="text-left p-4">
                            Actions
                        </th>

                    </tr>

                </thead>

            <tbody>
                {applications.map((application) => (
                    <ApplicationRow 
                    key={application.id}
                    application={application}
                    handleEditApplication={handleEditApplication}
                    handleDeleteApplication={handleDeleteApplication}
                    handleViewApplication={handleViewApplication}
                    />
                ))}
            </tbody>

            </table>

        </div>
    );
}

export default ApplicationsTable;