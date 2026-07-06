import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    async function handleLogin(event){
        event.preventDefault();

        try{
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);
            
            const response = await api.post("/auth/login", formData);
            localStorage.setItem("token", response.data.access_token);
            navigate("/applications")  ;
        }
        catch (error){
                console.log(error);
        }
    }
    
    return (
        <AuthCard 
        title="Application Tracker"
        subtitle="Sign in to manage your job applications.">
            
            {location.state?.message && (
            <div className="mb-4 rounded-lg bg-green-100 border border-green-300 px-4 py-3 text-green-700">
            {location.state.message}
            </div>
)}
            <form onSubmit={handleLogin}>
                <div>
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                </div>

                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />

                <PrimaryButton type="submit">
                    Login
                </PrimaryButton>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
        <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
            Register
            </Link>
</p>
        </AuthCard>
    );
}

export default Login;