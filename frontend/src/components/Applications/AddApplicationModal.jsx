import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import InputField from "../InputField";
import PrimaryButton from "../PrimaryButton";
import api from "../../api/axios";
import { handleApiError } from "../../utils/handleApiError";

const selectClass = "w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-base text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";
const labelClass = "block text-base font-medium text-slate-700 mb-1.5";

function AddApplicationModal({ setShowModal, onSuccess, application }) {
    const initialFormData = { company: "", role: "", job_link: "", status: "Applied", deadline: "", notes: "" };
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    function validate() {
        if (!formData.company.trim()) { toast.error("Company name is required."); return false; }
        if (!formData.role.trim()) { toast.error("Role is required."); return false; }
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = { ...formData, deadline: formData.deadline || null };
            if (application) {
                await api.patch(`/applications/${application.id}`, payload);
                toast.success("Application updated successfully.");
            } else {
                await api.post("/applications", payload);
                toast.success("Application added successfully.");
            }
            onSuccess();
            setShowModal(false);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        if (application) {
            setFormData({
                company: application.company,
                role: application.role,
                job_link: application.job_link || "",
                status: application.status,
                deadline: application.deadline ? application.deadline.split("T")[0] : "",
                notes: application.notes || "",
            });
        } else {
            setFormData(initialFormData);
        }
    }, [application]);

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border border-slate-200 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold text-slate-800 mb-6">
                    {application ? "Edit Application" : "Add Application"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <InputField label="Company" type="text" placeholder="Enter company name" value={formData.company} name="company" onChange={handleChange} />
                    <InputField label="Role" type="text" placeholder="Enter role" value={formData.role} name="role" onChange={handleChange} />
                    <InputField label="Job Link" type="text" placeholder="Paste job posting URL" value={formData.job_link} name="job_link" onChange={handleChange} />

                    <div className="mb-4">
                        <label className={labelClass}>Status</label>
                        <select value={formData.status} name="status" onChange={handleChange} className={selectClass}>
                            <option value="Applied">Applied</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Interview">Interview</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Withdrawn">Withdrawn</option>
                            <option value="Offer">Offer</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className={labelClass}>Deadline</label>
                        <input type="date" value={formData.deadline} name="deadline" onChange={handleChange} className={selectClass} />
                    </div>

                    <div className="mb-4">
                        <label className={labelClass}>Notes</label>
                        <textarea rows="3" value={formData.notes} name="notes" onChange={handleChange} placeholder="Add any notes..." className={`${selectClass} resize-none`} />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition duration-150">
                            Cancel
                        </button>
                        <PrimaryButton type="submit" loading={loading}>
                            {loading ? "Saving..." : application ? "Update" : "Save"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddApplicationModal;