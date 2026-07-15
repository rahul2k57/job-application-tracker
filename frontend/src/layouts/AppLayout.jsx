import Navbar from "../components/Navbar";

function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">

            <Navbar />

            <main className="max-w-7xl mx-auto px-8 py-8">
                {children}
            </main>

        </div>
    );
}

export default AppLayout;