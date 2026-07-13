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

    async function fetchRecentApplications() {
        try {
            const response = await api.get("/dashboard/recent-applications");
            setRecentApplications(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchUpcomingDeadlines() {
        try {
            const response = await api.get("/dashboard/recent-deadlines");
            setUpcomingDeadlines(response.data);
        } catch (error) {
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
                <div className="flex items-center justify-center h-64">
                    <p className="text-sm text-slate-400">Loading...</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-slate-800">Dashboard</h1>
                <p className="text-base text-slate-400 mt-1">Overview of your job applications</p>
            </div>

            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                <RecentApplications recentApplications={recentApplications} />
                <UpcomingDeadlines upcomingDeadlines={upcomingDeadlines} />
            </div>
        </AppLayout>
    );
}

export default Dashboard;