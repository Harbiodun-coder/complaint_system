import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getCurrentUser } from "@/lib/auth";
import { StatusBadge } from "@/components/StatCard";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

export default async function MyComplaintsPage() {
  const currentUser = getCurrentUser();
  await connectDB();

  const complaints = await Complaint.find({ student: currentUser.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Complaints</h1>
        <Link
          href="/dashboard/submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2.5 transition"
        >
          <FiPlusCircle /> Submit New Complaint
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        {complaints.length === 0 ? (
          <p className="text-sm text-gray-400 py-8 text-center">
            You haven&apos;t submitted any complaints yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="py-2 font-medium">ID</th>
                <th className="py-2 font-medium">Subject</th>
                <th className="py-2 font-medium">Category</th>
                <th className="py-2 font-medium">Date Submitted</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 font-medium">{c.complaintId}</td>
                  <td className="py-3 text-gray-600">{c.subject}</td>
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
    </div>
  );
}
