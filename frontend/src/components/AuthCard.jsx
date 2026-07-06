function AuthCard({ title, subtitle, children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold text-center">
                    {title}
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-6">
                    {subtitle}
                </p>

                {children}

            </div>

        </div>
    );
}

export default AuthCard;