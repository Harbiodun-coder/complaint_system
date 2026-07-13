import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const { fullName, email, department, level, password, confirmPassword } =
      await request.json();

    if (!fullName || !email || !department || !level || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      department,
      level,
      password: hashed,
      role: "student",
    });

    const token = signToken({ id: user._id.toString(), role: user.role });
    setAuthCookie(token);

    return NextResponse.json(
      {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
