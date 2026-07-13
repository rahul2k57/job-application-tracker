import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <p className="text-6xl font-semibold text-slate-200">404</p>
                <h1 className="text-xl font-semibold text-slate-800 mt-4">
                    Page not found
                </h1>
                <p className="text-sm text-slate-400 mt-2">
                    The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-block mt-6 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default NotFound;