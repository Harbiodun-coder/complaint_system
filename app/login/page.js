"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-8"
      >
        <h1 className="text-xl font-bold mb-1">Welcome Back</h1>
        <p className="text-sm text-gray-500 mb-6">Login to your LASU Complaints account</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Email Address
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block mb-6 text-sm font-medium text-gray-700">
          Password
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
