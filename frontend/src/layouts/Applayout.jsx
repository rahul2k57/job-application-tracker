import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function AppLayout({ children }) {
    const navigate = useNavigate();

    function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
}
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Right Side */}
            <div className="flex-1">

                {/* Navbar */}
                <div className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">

                    <h1 className="text-xl font-semibold">
                        Job Application Tracker
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                </div>

                {/* Page Content */}
                <div className="p-6">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AppLayout;