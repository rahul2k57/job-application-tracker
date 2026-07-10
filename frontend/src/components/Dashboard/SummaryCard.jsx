function SummaryCard({ title, value }) {
    return (
        <div
            className="
                bg-white
                rounded-xl
                shadow
                p-6
                flex
                flex-col
                justify-center
            "
        >
            <p className="text-sm text-gray-500">
                {title}
            </p>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}

export default SummaryCard;