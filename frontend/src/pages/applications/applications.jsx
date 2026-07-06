import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Applications(){
    const [applications,setApplications] = useState([]);
    const navigate = useNavigate();
    function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
}
    useEffect(() => {

    async function fetchApplications() {
        const response = await api.get("/applications");
        setApplications(response.data.items);
    }
    fetchApplications();
    
}, []);

    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
            <h1>Applications</h1>
            {applications.map((application)=> (
                <div key={application.id}>
                    <h3>{application.company}</h3>
                    <p>{application.role}</p>
                    </div>
            ))}
        </div>
    );
}
export default Applications;