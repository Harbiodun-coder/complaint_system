import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getCurrentUser } from "@/lib/auth";

// Generates the next sequential ID like CMP-2024-004
async function generateComplaintId() {
  const year = new Date().getFullYear();
  const count = await Complaint.countDocuments({
    complaintId: { $regex: `^CMP-${year}-` },
  });
  const next = String(count + 1).padStart(3, "0");
  return `CMP-${year}-${next}`;
}

export async function GET(request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await connectDB();

  // Students only see their own complaints; admins see everything
  const filter = user.role === "admin" ? {} : { student: user.id };

  const complaints = await Complaint.find(filter)
    .populate("student", "fullName email department level")
    .sort({ createdAt: -1 });

  return NextResponse.json({ complaints });
}

export async function POST(request) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { category, subject, description } = await request.json();

    if (!category || !subject || !description) {
      return NextResponse.json(
        { error: "Category, subject and description are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const complaintId = await generateComplaintId();

    const complaint = await Complaint.create({
      complaintId,
      student: user.id,
      category,
      subject,
      description,
      status: "Pending",
    });

    return NextResponse.json({ complaint }, { status: 201 });
  } catch (err) {
    console.error("Create complaint error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
