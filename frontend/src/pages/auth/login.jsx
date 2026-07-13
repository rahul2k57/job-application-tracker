import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { handleApiError } from "../../utils/handleApiError";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogin(event) {
        event.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email.");
            return;
        }
        if (!password) {
            toast.error("Please enter your password.");
            return;
        }

        setLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);
            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.access_token);
            toast.success("Logged in successfully.");
            navigate("/applications");
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard
            title="Application Tracker"
            subtitle="Sign in to manage your job applications."
        >
            {location.state?.message && (
                <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                    {location.state.message}
                </div>
            )}
            <form onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PrimaryButton type="submit" loading={loading}>
                    {loading ? "Logging in..." : "Login"}
                </PrimaryButton>
            </form>
            <p className="mt-6 text-center text-base text-slate-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Register
                </Link>
            </p>
        </AuthCard>
    );
}

export default Login;