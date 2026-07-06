function PrimaryButton({
    children,
    type = "button",
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-lg
                font-semibold
                hover:bg-blue-700
                transition
                duration-200
                shadow-md
            "
        >
            {children}
        </button>
    );
}

export default PrimaryButton;