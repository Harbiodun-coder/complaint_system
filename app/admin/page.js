import { connectDB } from "@/lib/db";
import Complaint, { COMPLAINT_CATEGORIES } from "@/models/Complaint";
import { StatCard } from "@/components/StatCard";
import ComplaintsChart from "@/components/ComplaintsChart";
import { FiBell } from "react-icons/fi";

// Builds the last-7-days trend the mockup's line chart shows, grouped by current status
function buildTrend(complaints) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }

  return days.map((day) => {
    const label = day.toLocaleDateString("en-GB", { month: "short", day: "2-digit" });
    const sameDay = complaints.filter((c) => {
      const created = new Date(c.createdAt);
      return created.toDateString() === day.toDateString();
    });
    return {
      date: label,
      Pending: sameDay.filter((c) => c.status === "Pending").length,
      "In Progress": sameDay.filter((c) => c.status === "In Progress").length,
      Resolved: sameDay.filter((c) => c.status === "Resolved").length,
    };
  });
}

function buildTopCategories(complaints) {
  const counts = COMPLAINT_CATEGORIES.map((category) => ({
    category,
    count: complaints.filter((c) => c.category === category).length,
  })).sort((a, b) => b.count - a.count);

  const max = Math.max(1, counts[0]?.count || 1);
  return counts.filter((c) => c.count > 0).map((c) => ({ ...c, pct: Math.round((c.count / max) * 100) }));
}

export default async function AdminDashboard() {
  await connectDB();
  const complaints = await Complaint.find({}).lean();

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const trend = buildTrend(complaints);
  const topCategories = buildTopCategories(complaints);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-gray-500">Administrator</p>
        <FiBell className="text-gray-400" />
      </div>

      <h1 className="text-2xl font-bold mb-6">Administrator Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Complaints" value={stats.total} color="text-blue-600" />
        <StatCard label="Pending" value={stats.pending} color="text-amber-600" />
        <StatCard label="In Progress" value={stats.inProgress} color="text-blue-600" />
        <StatCard label="Resolved" value={stats.resolved} color="text-green-600" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold mb-4">Complaints Overview</h2>
          <ComplaintsChart data={trend} />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold mb-4">Top Categories</h2>
          {topCategories.length === 0 ? (
            <p className="text-sm text-gray-400">No complaints yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {topCategories.map(({ category, count, pct }) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
