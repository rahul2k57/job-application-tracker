import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function isActive(path) {
        return location.pathname === path;
    }

    return (
        <div className="h-18 bg-white border-b border-slate-200 flex items-center justify-between px-10 py-4">
            <span className="text-xl font-semibold text-slate-800 tracking-tight">
                Job Application Tracker
            </span>

            <nav className="flex items-center gap-10">
                <Link
                    to="/dashboard"
                    className={`text-base transition duration-150 ${
                        isActive("/dashboard")
                            ? "text-indigo-600 font-medium"
                            : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Dashboard
                </Link>

                <Link
                    to="/applications"
                    className={`text-base transition duration-150 ${
                        isActive("/applications")
                            ? "text-indigo-600 font-medium"
                            : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Applications
                </Link>

                <button
                    onClick={handleLogout}
                    className="text-base text-slate-500 hover:text-slate-800 transition duration-150"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
}

export default Navbar;