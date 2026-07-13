function SummaryCard({ title, value, color }) {
    const valueColor = color || "text-slate-800";
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                {title}
            </p>
            <p className={`text-4xl font-semibold mt-3 ${valueColor}`}>
                {value ?? "-"}
            </p>
        </div>
    );
}

export default SummaryCard;