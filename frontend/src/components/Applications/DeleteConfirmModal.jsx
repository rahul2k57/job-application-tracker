import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";

function DeleteConfirmationModal({ application, setShowDeleteModal, onSuccess }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await api.delete(`/applications/${application.id}`);
            toast.success("Application deleted successfully.");
            onSuccess();
            setShowDeleteModal(false);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-slate-200 p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold text-slate-800 mb-1">Delete Application</h2>
                <p className="text-sm text-slate-500 mb-4">This action cannot be undone.</p>
                <div className="bg-slate-50 rounded-md px-4 py-3 mb-6">
                    <p className="text-base font-medium text-slate-800">{application.company}</p>
                    <p className="text-sm text-slate-500">{application.role}</p>
                </div>
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowDeleteModal(false)} disabled={loading}
                        className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 transition duration-150">
                        Cancel
                    </button>
                    <button onClick={handleDelete} disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150">
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;