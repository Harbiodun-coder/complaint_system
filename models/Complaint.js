import mongoose from "mongoose";

const CATEGORIES = [
  "Hostel Facilities",
  "Lectures & Timetable",
  "Examination",
  "Fees & Payments",
  "Library Services",
  "Other",
];

const ComplaintSchema = new mongoose.Schema(
  {
    complaintId: { type: String, required: true, unique: true }, // e.g. CMP-2024-001
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
    adminNote: { type: String, default: "" },
  },
  { timestamps: true }
);

export const COMPLAINT_CATEGORIES = CATEGORIES;
export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
