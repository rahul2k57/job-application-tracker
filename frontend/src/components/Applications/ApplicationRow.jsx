    import { formatDate } from "../../utils/formatDate";

    function ApplicationRow({ application, handleEditApplication,handleDeleteApplication,handleViewApplication}) {
        const hasDeadline = application.deadline;
        return (
            <tr className="border-b hover:bg-gray-50">

                <td className="p-4">
                    {application.company}
                </td>

                <td className="p-4">
                    {application.role}
                </td>

                <td className="p-4">
                    {application.status}
                </td>

                <td className="p-4">
                    {formatDate(application.applied_date) || "-"}
                </td>

                <td className={`p-4 ${hasDeadline ? "" : "text-center"}`}>
                    {formatDate(application.deadline)}
                </td>

                <td className="p-4 space-x-3">

                    <button className="text-blue-600 hover:underline"
                    onClick={() => handleViewApplication(application)}>
                        View
                    </button>

                    <button 
                    className="text-green-600 hover:underline"
                    onClick={() => handleEditApplication(application)}
                    >
                        Edit
                    </button>

                    <button className="text-red-600 hover:underline"
                    onClick={() => handleDeleteApplication(application)}>
                        Delete
                    </button>

                </td>

            </tr>
        );
    }

    export default ApplicationRow;