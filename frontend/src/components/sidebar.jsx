import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-72 bg-slate-800 text-white min-h-screen p-5">

            <h2 className="text-xl font-bold mb-8">
                Job Application Tracker
            </h2>

            <nav className="space-y-4">

                <Link
                    to="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>

                <Link
                    to="/applications"
                    className="block hover:text-blue-400"
                >
                    Applications
                </Link>
            </nav>

        </div>
    );
}

export default Sidebar;