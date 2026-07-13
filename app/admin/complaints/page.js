import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import ComplaintsTable from "./ComplaintsTable";

export default async function AdminComplaintsPage() {
  await connectDB();

  const complaints = await Complaint.find({})
    .populate("student", "fullName email department level")
    .sort({ createdAt: -1 })
    .lean();

  // Server Components can't pass Mongoose documents/ObjectIds directly to Client
  // Components - serialize to plain JSON-safe objects first.
  const plain = complaints.map((c) => ({
    _id: c._id.toString(),
    complaintId: c.complaintId,
    category: c.category,
    subject: c.subject,
    description: c.description,
    status: c.status,
    adminNote: c.adminNote,
    createdAt: c.createdAt,
    student: c.student
      ? {
          fullName: c.student.fullName,
          email: c.student.email,
          department: c.student.department,
          level: c.student.level,
        }
      : null,
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Complaints</h1>
      <ComplaintsTable initialComplaints={plain} />
    </div>
  );
}
