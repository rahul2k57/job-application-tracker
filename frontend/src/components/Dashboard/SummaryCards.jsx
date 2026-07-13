import SummaryCard from "./SummaryCard";

function SummaryCards({ summary }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard title="Total" value={summary.total_applications} />
            <SummaryCard title="Applied" value={summary.applied} />
            <SummaryCard title="Online Assessment" value={summary.online_assessment} />
            <SummaryCard title="Interview" value={summary.interview} color="text-amber-600" />
            <SummaryCard title="Offer" value={summary.offer} color="text-emerald-600" />
            <SummaryCard title="Rejected" value={summary.rejected} color="text-red-500" />
            <SummaryCard title="Withdrawn" value={summary.withdrawn} />
        </div>
    );
}

export default SummaryCards;