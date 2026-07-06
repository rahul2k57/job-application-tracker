import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import AuthCard from "../../components/AuthCard";
import InputField from "../../components/InputField";
import PrimaryButton from "../../components/PrimaryButton";

function Register() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    async function handleRegister(event) {
    event.preventDefault(); 

    try {

    await api.post("/auth/register", {
        username,
        full_name: fullName,
        email,
        password,
    });

    navigate("/login", {
        state: {
            message: "Registration successful! Please login."
        }
    });


} catch (error) {
    console.error(error);
}
}
    
    return (
        <AuthCard
        title="Application Tracker"
        subtitle="Create Your Account">
            <form onSubmit={handleRegister}>

                    <InputField
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event)=>setUsername(event.target.value)}
                    />


                    <InputField
                        label="Full Name"
                        type="text"
                        placeholder="Enter your Full Name"
                        value={fullName}
                        onChange={(event)=>setFullName(event.target.value)}
                    />


                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                    />


                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />


                <PrimaryButton type="submit">
                    Register
                </PrimaryButton>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                    Login
                </Link>
            </p>
        </AuthCard>
    );
}

export default Register;