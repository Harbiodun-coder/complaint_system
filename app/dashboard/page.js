import Link from "next/link";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";
import { StatCard, StatusBadge } from "@/components/StatCard";
import { FiPlusCircle, FiSearch, FiBell } from "react-icons/fi";

export default async function StudentDashboard() {
  const currentUser = getCurrentUser();
  await connectDB();

  const [user, complaints] = await Promise.all([
    User.findById(currentUser.id).lean(),
    Complaint.find({ student: currentUser.id }).sort({ createdAt: -1 }).lean(),
  ]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const recent = complaints.slice(0, 5);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-gray-500">Welcome, {user?.fullName?.split(" ")[0] || "Student"}</p>
        <FiBell className="text-gray-400" />
      </div>

      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Complaints" value={stats.total} color="text-blue-600" />
        <StatCard label="Pending" value={stats.pending} color="text-amber-600" />
        <StatCard label="In Progress" value={stats.inProgress} color="text-blue-600" />
        <StatCard label="Resolved" value={stats.resolved} color="text-green-600" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Complaints</h2>
            <Link href="/dashboard/complaints" className="text-sm text-blue-600">
              View All
            </Link>
          </div>

          {recent.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">
              You haven&apos;t submitted any complaints yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="py-2 font-medium">ID</th>
                  <th className="py-2 font-medium">Category</th>
                  <th className="py-2 font-medium">Date Submitted</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 font-medium">{c.complaintId}</td>
                    <td className="py-3 text-gray-600">{c.category}</td>
                    <td className="py-3 text-gray-600">
                      {new Date(c.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/submit"
              className="flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md py-2.5 transition"
            >
              <FiPlusCircle /> Submit New Complaint
            </Link>
            <Link
              href="/dashboard/complaints"
              className="flex items-center gap-2 justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md py-2.5 transition"
            >
              <FiSearch /> Track Complaint
            </Link>
            <Link
              href="/dashboard/notifications"
              className="flex items-center gap-2 justify-center border border-gray-200 hover:bg-gray-50 text-sm font-medium rounded-md py-2.5 transition"
            >
              <FiBell /> View Notifications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
