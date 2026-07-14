import { useEffect, useState } from "react";
import ResumeSection from "./ResumeSection";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";

const statusStyles = {
    "Applied":           "bg-slate-100 text-slate-700",
    "Online Assessment": "bg-violet-50 text-violet-700",
    "Interview":         "bg-amber-50 text-amber-700",
    "Offer":             "bg-emerald-50 text-emerald-700",
    "Rejected":          "bg-red-50 text-red-600",
    "Withdrawn":         "bg-slate-100 text-slate-500",
};

function ViewApplicationModal({ application, setShowViewModal, refreshApplications }) {
    const [statusHistory, setStatusHistory] = useState([]);
    const [applicationData, setApplicationData] = useState(application);

    async function fetchApplication() {
        try {
            const response = await api.get(`/applications/${application.id}`);
            setApplicationData(response.data);
            await refreshApplications();
        } catch (error) {
            handleApiError(error);
        }
    }

    async function fetchStatusHistory() {
        try {
            const response = await api.get(`/applications/${application.id}/history`);
            setStatusHistory(response.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    useEffect(() => { setApplicationData(application); }, [application]);
    useEffect(() => { fetchStatusHistory(); }, [application]);

    function formatDate(date) {
        if (!date) return "-";
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    }

    const badgeClass = statusStyles[applicationData.status] || "bg-slate-100 text-slate-600";

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-slate-200 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            {applicationData.company}
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">{applicationData.role}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeClass}`}>
                        {applicationData.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-xs text-slate-400 mb-1">Applied Date</p>
                        <p className="text-sm text-slate-700">{formatDate(applicationData.applied_date)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-1">Deadline</p>
                        <p className="text-sm text-slate-700">{formatDate(applicationData.deadline)}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-xs text-slate-400 mb-1">Job Link</p>
                        {applicationData.job_link ? (
                            <a href={applicationData.job_link} target="_blank" rel="noreferrer"
                                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline">
                                Open Job Posting
                            </a>
                        ) : (
                            <p className="text-sm text-slate-700">-</p>
                        )}
                    </div>
                    <div className="col-span-2">
                        <p className="text-xs text-slate-400 mb-1">Notes</p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">
                            {applicationData.notes || "-"}
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-5 mb-5">
                    <h3 className="text-sm font-medium text-slate-800 mb-4">Status History</h3>
                    {statusHistory.length === 0 ? (
                        <p className="text-sm text-slate-400">No status changes yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {statusHistory.map((history) => (
                                <div key={history.id} className="flex gap-3 items-start">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-slate-700 font-medium">
                                            {history.old_status} → {history.new_status}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {formatDate(history.changed_at)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <ResumeSection application={applicationData} onUploadSuccess={fetchApplication} />

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setShowViewModal(false)}
                        className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition duration-150"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewApplicationModal;