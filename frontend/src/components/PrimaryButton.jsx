function PrimaryButton({ children, type = "button", onClick, loading = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className="
                w-full
                mt-2
                bg-indigo-600
                text-white
                text-base
                font-medium
                py-3
                rounded-md
                hover:bg-indigo-700
                active:bg-indigo-800
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition
                duration-150
            "
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    {children}
                </span>
            ) : children}
        </button>
    );
}

export default PrimaryButton;