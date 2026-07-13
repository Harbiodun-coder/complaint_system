import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Complaint from "@/models/Complaint";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request, { params }) {
  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  await connectDB();

  const complaint = await Complaint.findById(params.id).populate(
    "student",
    "fullName email department level"
  );

  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  // Students can only view their own complaint
  if (user.role !== "admin" && complaint.student._id.toString() !== user.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  return NextResponse.json({ complaint });
}

// Only admins can update status / add a note
export async function PATCH(request, { params }) {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  try {
    const { status, adminNote } = await request.json();

    await connectDB();

    const complaint = await Complaint.findById(params.id);
    if (!complaint) {
      return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
    }

    if (status) complaint.status = status;
    if (adminNote !== undefined) complaint.adminNote = adminNote;
    await complaint.save();

    return NextResponse.json({ complaint });
  } catch (err) {
    console.error("Update complaint error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
