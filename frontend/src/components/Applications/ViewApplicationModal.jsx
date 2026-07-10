import { useEffect,useState } from "react";
import ResumeSection from "./ResumeSection";
import api from "../../api/axios";

function ViewApplicationModal({
    application,
    setShowViewModal,
}) {
    const[statusHistory, setStatusHistory] = useState([]);

    const [applicationData, setApplicationData] = useState(application);

    async function fetchApplication() {
    try {
        const response = await api.get(
            `/applications/${application.id}`
        );

        setApplicationData(response.data);
    } catch (error) {
        console.error(error);
    }
    }
    useEffect(() => {
    setApplicationData(application);
    }, [application]);

    async function fetchStatusHistory() {
    try {
        const response = await api.get(
            `/applications/${application.id}/history`
        );

        setStatusHistory(response.data);
    } catch (error) {
        console.error(error);
    }
}
    useEffect(() => {
        fetchStatusHistory();
    }, [application]);

    function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">

                <h2 className="text-2xl font-bold mb-6">
                    Application Details
                </h2>

                <div className="grid grid-cols-2 gap-6">

                    <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{applicationData.company}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium">{applicationData.role}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Current Status</p>
                        <p className="font-medium">{applicationData.status}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Applied Date</p>
                        <p className="font-medium">
                            {formatDate(applicationData.applied_date)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Deadline</p>
                        <p className="font-medium">
                            {applicationData.deadline
                                ? formatDate(applicationData.deadline)
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Job Link</p>

                        {applicationData.job_link ? (
                            <a
                                href={applicationData.job_link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Open Job Posting
                            </a>
                        ) : (
                            <p>-</p>
                        )}
                    </div>
                </div>
                
                    <div className="mt-6">
                        <p className="text-sm text-gray-500">
                            Notes
                        </p>

                        <p className="whitespace-pre-wrap">
                            {applicationData.notes || "-"}
                        </p>

                    </div>

                <div className="border-t my-6"></div>
                <h3 className="text-xl font-semibold mb-4">
                Status History
                </h3>

                <div className="space-y-4">
                {statusHistory.length === 0 ? (
                    <p className="text-gray-500">
                        No status changes yet.
                    </p>
                ) :(
                statusHistory.map((history) => (
                    <div
                        key={history.id}
                        className="border-l-2 border-blue-500 pl-4"
                    >
                        <p className="font-semibold">
                            {history.old_status} → {history.new_status}
                        </p>

                        <p className="text-sm text-gray-500">
                            {formatDate(history.changed_at)}
                        </p>
                    </div>
                )
                ))}
            </div>
                <div>
                    <ResumeSection
                        application={applicationData}
                        onUploadSuccess={fetchApplication}
                    />
                </div>
                <div className="flex justify-end mt-8">

                    <button
                        onClick={() => setShowViewModal(false)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ViewApplicationModal;