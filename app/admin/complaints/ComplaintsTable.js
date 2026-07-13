"use client";

import { useState, Fragment } from "react";
import { StatusBadge } from "@/components/StatCard";

const STATUS_OPTIONS = ["Pending", "In Progress", "Resolved"];

export default function ComplaintsTable({ initialComplaints }) {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [openId, setOpenId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function updateStatus(id, status) {
    setSaving(true);
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setComplaints((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status } : c))
        );
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {complaints.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">No complaints submitted yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium">ID</th>
              <th className="py-2 font-medium">Student</th>
              <th className="py-2 font-medium">Category</th>
              <th className="py-2 font-medium">Date</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <Fragment key={c._id}>
                <tr className="border-b border-gray-50">
                  <td className="py-3 font-medium">{c.complaintId}</td>
                  <td className="py-3 text-gray-600">{c.student?.fullName || "—"}</td>
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
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setOpenId(openId === c._id ? null : c._id)}
                      className="text-blue-600 text-xs font-medium"
                    >
                      {openId === c._id ? "Close" : "View"}
                    </button>
                  </td>
                </tr>
                {openId === c._id && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-4">
                      <p className="text-sm font-medium mb-1">{c.subject}</p>
                      <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                      <p className="text-xs text-gray-400 mb-3">
                        {c.student?.department} · {c.student?.level} Level · {c.student?.email}
                      </p>
                      <label className="text-xs font-medium text-gray-500 mr-2">
                        Update status:
                      </label>
                      <select
                        value={c.status}
                        disabled={saving}
                        onChange={(e) => updateStatus(c._id, e.target.value)}
                        className="border border-gray-200 rounded-md text-sm px-2 py-1"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
