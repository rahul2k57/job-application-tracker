import toast from "react-hot-toast";

export function handleApiError(error) {
    if (!error.response) {
        toast.error("Unable to connect to the server. Please try again later.");
        return;
    }

    const status = error.response.status;
    const detail = error.response.data?.detail;

    if (status === 401) {
        toast.error("Invalid email or password.");
        return;
    }
    if (status === 403) {
        toast.error("You are not authorized to perform this action.");
        return;
    }
    if (status === 404) {
        toast.error("Resource not found.");
        return;
    }
    if (status === 422) {
        toast.error("Please check your inputs and try again.");
        return;
    }
    if (typeof detail === "string") {
        toast.error(detail);
        return;
    }

    toast.error("Something went wrong. Please try again.");
}