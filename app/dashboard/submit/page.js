"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Hostel Facilities",
  "Lectures & Timetable",
  "Examination",
  "Fees & Payments",
  "Library Services",
  "Other",
];

export default function SubmitComplaintPage() {
  const router = useRouter();
  const [form, setForm] = useState({ category: "", subject: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not submit complaint.");
        return;
      }

      router.push("/dashboard/complaints");
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Submit a Complaint</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
      >
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Category
          <select
            required
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4 text-sm font-medium text-gray-700">
          Subject
          <input
            type="text"
            required
            placeholder="Brief summary of your complaint"
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block mb-6 text-sm font-medium text-gray-700">
          Description
          <textarea
            required
            rows={5}
            placeholder="Describe your complaint in detail"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 resize-none"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium transition"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
