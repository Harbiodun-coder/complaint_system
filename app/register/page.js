"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEPARTMENTS = [
  "Computer Science",
  "Mass Communication",
  "Accounting",
  "Law",
  "Microbiology",
  "Economics",
];

const LEVELS = ["100", "200", "300", "400", "500"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    level: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-between w-1/3 bg-navy-950 text-white p-10">
        <div>
          <div className="w-14 h-14 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-xs mb-6">
            LASU
          </div>
          <h2 className="text-2xl font-bold mb-3">Create Your Student Account</h2>
          <p className="text-gray-300 text-sm">
            Fill the form to register and start using the complaint management
            system.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <h1 className="text-xl font-bold mb-6">Student Registration</h1>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <Field label="Full Name">
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={update("fullName")}
              className="input"
            />
          </Field>

          <Field label="Email Address">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={form.email}
              onChange={update("email")}
              className="input"
            />
          </Field>

          <Field label="Department">
            <select
              required
              value={form.department}
              onChange={update("department")}
              className="input"
            >
              <option value="">Select your department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Level">
            <select
              required
              value={form.level}
              onChange={update("level")}
              className="input"
            >
              <option value="">Select your level</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l} Level
                </option>
              ))}
            </select>
          </Field>

          <Field label="Password">
            <input
              type="password"
              required
              placeholder="Create password"
              value={form.password}
              onChange={update("password")}
              className="input"
            />
          </Field>

          <Field label="Confirm Password">
            <input
              type="password"
              required
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              className="input"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.6rem 0.85rem;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-4 text-sm font-medium text-gray-700">
      {label}
      {children}
    </label>
  );
}
