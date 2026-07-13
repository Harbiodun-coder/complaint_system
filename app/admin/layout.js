import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 min-h-screen bg-gray-50">{children}</div>
    </div>
  );
}
