function AuthCard({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white px-10 py-12 rounded-lg border border-slate-200 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-slate-800 text-center tracking-tight">
                    {title}
                </h1>
                <p className="text-slate-400 text-base text-center mt-2 mb-8">
                    {subtitle}
                </p>
                {children}
            </div>
        </div>
    );
}

export default AuthCard;