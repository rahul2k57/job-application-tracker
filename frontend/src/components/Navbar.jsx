import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { handleApiError } from "../utils/handleApiError";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    function isActive(path) {
        return location.pathname === path;
    }

    async function fetchCurrentUser() {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function getInitials(fullName) {
        if (!fullName) return "?";
        return fullName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-10">

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

                {/* Profile dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
                            {getInitials(user?.full_name)}
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-sm z-50">

                            {/* Profile info */}
                            <div className="px-4 py-4">
                                <p className="text-base font-semibold text-slate-800">
                                    {user?.full_name}
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    @{user?.username}
                                </p>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    {user?.email}
                                </p>
                            </div>

                            <div className="border-t border-slate-100" />

                            {/* Logout */}
                            <div className="px-4 py-3">
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-red-500 hover:text-red-700 font-medium transition duration-150"
                                >
                                    Logout
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;