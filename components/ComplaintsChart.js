"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// data shape: [{ date: "May 11", Pending: 12, "In Progress": 8, Resolved: 3 }, ...]
export default function ComplaintsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Pending" stroke="#d97706" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="In Progress" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="Resolved" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
