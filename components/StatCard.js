export function StatCard({ label, value, color = "text-gray-900" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Pending: "status-pending",
    "In Progress": "status-progress",
    Resolved: "status-resolved",
  };
  return <span className={`status-badge ${map[status] || "status-pending"}`}>{status}</span>;
}
