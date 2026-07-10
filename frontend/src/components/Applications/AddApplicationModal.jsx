import { useState, useEffect} from "react";

import InputField from "../InputField";

import PrimaryButton from "../PrimaryButton";

import api from "../../api/axios";

function AddApplicationModal({ setShowModal, onSuccess, application }) {
    const initialFormData = {
    company: "",
    role: "",
    job_link: "",
    status: "Applied",
    deadline: "",
    notes: "",
    };
    const [formData, setFormData] = useState(initialFormData);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if(application){
                const payload = {
                ...formData,
                deadline: formData.deadline || null,
                };
            await api.patch(`/applications/${application.id}`,payload);
            }
            else {
                const payload = {
                ...formData,
                deadline: formData.deadline || null,
                };
            await api.post("/applications",payload);
            }
            
            onSuccess();
            setShowModal(false);
        }
        catch (error){
            console.error(error);
    }
}
    function handleChange(event) {

    setFormData({
        ...formData,
        [event.target.name]: event.target.value,
    });
}
    useEffect ( () =>{
        if (application){
            setFormData({
                company: application.company,
                role: application.role,
                job_link: application.job_link || "",
                status: application.status,
                deadline: application.deadline
                ? application.deadline.split("T")[0]
                : "",
                notes: application.notes || "",

            });
        }
        else{
        setFormData(initialFormData);
        }
    },[application]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">
                    {application ? "Edit Application" : "Add Application"}
                </h2>
                <form onSubmit={handleSubmit}>

                <InputField
                    label="Company"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.company}
                    name="company"
                    onChange={handleChange}
                />

                <InputField
                    label="Role"
                    type="text"
                    placeholder="Enter Role name"
                    value={formData.role}
                    name="role"
                    onChange={handleChange}
                />

                <InputField
                    label="Job Link"
                    type="text"
                    placeholder="Enter Job Link :"
                    value={formData.job_link}
                    name="job_link"
                    onChange={handleChange}
                    />

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            name="status"
                            onChange={handleChange}
                            className="
                            w-full
                            border
                            border-gray-300
                            rounded-lg
                            px-3
                            py-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        >
                        <option value="Applied">Applied</option>
                        <option value="Online Assessment">Online Assessment</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Offer">Offer</option>
                        </select>
                        </div>

                        <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Deadline
                        </label>
                        <input
                            type="date"
                            value={formData.deadline}
                            name="deadline"
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Notes
                        </label>

                        <textarea
                            rows="4"
                            value={formData.notes}
                            name="notes"
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-lg
                                px-3
                                py-2
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                            placeholder="Enter notes..."
                        />
                        </div>

                <div className="flex justify-end gap-3 mt-6">

                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <PrimaryButton type="submit">
                    {application ? "Update" : "Save"}
                </PrimaryButton>
                </div>
                </form>

            </div>

        </div>
    );
}

export default AddApplicationModal;