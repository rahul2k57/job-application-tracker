import SummaryCard from "./SummaryCard";

function SummaryCards({ summary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <SummaryCard
                title="Total Applications"
                value={summary.total_applications}
            />

            <SummaryCard
                title="Applied"
                value={summary.applied}
            />

            <SummaryCard
                title="Online Assessment"
                value={summary.online_assessment}
            />

            <SummaryCard
                title="Interview"
                value={summary.interview}
            />

            <SummaryCard
                title="Offer"
                value={summary.offer}
            />

            <SummaryCard
                title="Rejected"
                value={summary.rejected}
            />

            <SummaryCard
                title="Withdrawn"
                value={summary.withdrawn}
            />

        </div>
    );
}

export default SummaryCards;