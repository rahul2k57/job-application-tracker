import { formatDate } from "../../utils/formatDate";

const statusStyles = {
    "Applied":            "bg-slate-100 text-slate-700",
    "Online Assessment":  "bg-violet-50 text-violet-700",
    "Interview":          "bg-amber-50 text-amber-700",
    "Offer":              "bg-emerald-50 text-emerald-700",
    "Rejected":           "bg-red-50 text-red-600",
    "Withdrawn":          "bg-slate-100 text-slate-500",
};

function ApplicationRow({ application, handleEditApplication, handleDeleteApplication, handleViewApplication }) {
    const badgeClass = statusStyles[application.status] || "bg-slate-100 text-slate-600";

    return (
        <tr className="hover:bg-slate-50 transition duration-100">
            <td className="px-5 py-4 text-base text-slate-800 font-medium">{application.company}</td>
            <td className="px-5 py-4 text-base text-slate-600">{application.role}</td>
            <td className="px-5 py-4">
                <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${badgeClass}`}>
                    {application.status}
                </span>
            </td>
            <td className="px-5 py-4 text-sm text-slate-500">{formatDate(application.applied_date) || "-"}</td>
            <td className="px-5 py-4 text-sm text-slate-500">{formatDate(application.deadline) || "-"}</td>
            <td className="px-5 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => handleViewApplication(application)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                    >
                        View
                    </button>
                    <button
                        onClick={() => handleEditApplication(application)}
                        className="text-sm text-slate-500 hover:text-slate-800 font-medium transition duration-150"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteApplication(application)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium transition duration-150"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default ApplicationRow;