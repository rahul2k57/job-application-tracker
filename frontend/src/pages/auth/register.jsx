import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";
import { handleApiError } from "../../utils/handleApiError";

function Register() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function validate() {
        if (!username.trim()) { toast.error("Username is required."); return false; }
        if (!fullName.trim()) { toast.error("Full name is required."); return false; }
        if (!email.trim()) { toast.error("Email is required."); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email address."); return false; }
        if (!password) { toast.error("Password is required."); return false; }
        if (password.length < 8) { toast.error("Password must be at least 8 characters."); return false; }
        return true;
    }

    async function handleRegister(event) {
        event.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await api.post("/auth/register", { username, full_name: fullName, email, password });
            navigate("/login", { state: { message: "Registration successful! Please login." } });
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard title="Application Tracker" subtitle="Create your account">
            <form onSubmit={handleRegister}>
                <InputField label="Username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <InputField label="Full Name" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <InputField label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
                <PrimaryButton type="submit" loading={loading}>
                    {loading ? "Creating account..." : "Register"}
                </PrimaryButton>
            </form>
            <p className="mt-6 text-center text-base text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Login
                </Link>
            </p>
        </AuthCard>
    );
}

export default Register;