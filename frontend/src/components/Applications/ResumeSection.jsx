import api from "../../api/axios";

import { useRef } from "react";

function ResumeSection({ application, onUploadSuccess }) {
    const fileInputRef = useRef(null);

    async function handleUploadResume(event){
        const file = event.target.files[0];
        if(!file){
            return;
        }
        const formData = new FormData();
        formData.append("file",file);
        try {
        await api.post(`/resume/${application.id}`,formData);
        await onUploadSuccess();
        event.target.value = "";
        }
        catch (error){
            console.log(error);
        }
    }




    async function handleDownloadResume() {
        try {
            const response = await api.get(`/resume/${application.id}`,
            {
                responseType: "blob",
            }
        );
        const url = window.URL.createObjectURL(response.data);

        const link = document.createElement("a");

        link.href = url;

        link.download = `application_${application.id}_resume.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>

            <div className="border-t my-6"></div>

            <h3 className="text-xl font-semibold mb-4">
                Resume
            </h3>

            {application.resume_url ? (
                <div className="flex items-center gap-4">

                    <p className="text-green-600 font-medium">
                        Resume Uploaded
                    </p>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleDownloadResume}
                    >
                        Download Resume
                    </button>

                    <button
                    onClick={()=>fileInputRef.current.click()}
                        className="border px-4 py-2 rounded-lg"
                    >
                        Replace Resume
                    </button>

                </div>
            ) : (
                <div>

                    <p className="text-gray-500 mb-4">
                        No Resume Uploaded
                    </p>

                    <button
                        onClick={()=>fileInputRef.current.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Upload Resume
                    </button>

                </div>
            )}
        <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleUploadResume}
        />
        </div>
    );
}

export default ResumeSection;