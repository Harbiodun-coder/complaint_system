import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="student" />
      <div className="flex-1 min-h-screen bg-gray-50">{children}</div>
    </div>
  );
}
