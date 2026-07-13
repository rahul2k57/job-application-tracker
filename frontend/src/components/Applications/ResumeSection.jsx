import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";

function ResumeSection({ application, onUploadSuccess }) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    async function handleUploadResume(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Resume must be a PDF file.");
            event.target.value = "";
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Resume must be smaller than 5 MB.");
            event.target.value = "";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);
        try {
            await api.post(`/resume/${application.id}`, formData);
            toast.success("Resume uploaded successfully.");
            await onUploadSuccess();
            event.target.value = "";
        } catch (error) {
            handleApiError(error);
        } finally {
            setUploading(false);
        }
    }

    async function handleDownloadResume() {
        try {
            const response = await api.get(`/resume/${application.id}`, { responseType: "blob" });
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `application_${application.id}_resume.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            handleApiError(error);
        }
    }

    return (
        <div className="border-t border-slate-100 pt-5">
            <h3 className="text-base font-medium text-slate-800 mb-3">Resume</h3>

            {application.resume_url ? (
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        Uploaded
                    </span>
                    <button onClick={handleDownloadResume}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-150">
                        Download
                    </button>
                    <button onClick={() => fileInputRef.current.click()} disabled={uploading}
                        className="text-sm text-slate-500 hover:text-slate-700 disabled:opacity-50 transition duration-150">
                        {uploading ? "Uploading..." : "Replace"}
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">No resume uploaded</span>
                    <button onClick={() => fileInputRef.current.click()} disabled={uploading}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-50 transition duration-150">
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            )}

            <input type="file" accept=".pdf" ref={fileInputRef} className="hidden" onChange={handleUploadResume} />
        </div>
    );
}

export default ResumeSection;