import { useEffect, useState } from "react";
import api from "../../api/axios";

import AppLayout from "../../layouts/AppLayout";
import SummaryCards from "../../components/Dashboard/SummaryCards";
import RecentApplications from "../../components/Dashboard/RecentApplications";
import UpcomingDeadlines from "../../components/Dashboard/UpcomingDeadlines";
function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

    async function fetchSummary() {
        try {
            const response = await api.get("/dashboard");
            setSummary(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchRecentApplications(){
        try { 
            const response = await api.get("/dashboard/recent-applications")
            setRecentApplications(response.data);
        }
        catch (error){
            console.error(error);
        }
    }
    async function fetchUpcomingDeadlines(){
        try { 
            const response = await api.get("/dashboard/recent-deadlines")
            setUpcomingDeadlines(response.data);
        }
        catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSummary();
        fetchRecentApplications();
        fetchUpcomingDeadlines();
    }, []);

    if (!summary) {
        return (
            <AppLayout>
                <p>Loading...</p>
            </AppLayout>
        );
    }

    return (
        <AppLayout>

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <SummaryCards summary={summary} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                <RecentApplications
                    recentApplications={recentApplications}
                />

                <UpcomingDeadlines
                    upcomingDeadlines={upcomingDeadlines}
                />

        </div>

        </AppLayout>
    );
}

export default Dashboard;