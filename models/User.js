import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // stored hashed, never plain text
    department: { type: String, required: true },
    level: { type: String, required: true }, // e.g. "100", "200", "300", "400"
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

// Prevents "OverwriteModelError" when Next.js hot-reloads this file in dev
export default mongoose.models.User || mongoose.model("User", UserSchema);
