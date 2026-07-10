import api from "../../api/axios";


function DeleteConfirmationModal({
    application,
    setShowDeleteModal,
    onSuccess,
}) {
    async function handleDelete() {
        try {
            await api.delete(`/applications/${application.id}`)
            onSuccess();
            setShowDeleteModal(false);
        }
        catch (error){
            console.error(error);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-4">
                    Delete Application
                </h2>

                <p className="text-gray-600 mb-3">
                Are you sure you want to delete this application?
                </p>

                <p className="font-semibold">
                    {application.company}
                </p>

                <p className="text-gray-500 mb-6">
                    {application.role}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(false)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteConfirmationModal;