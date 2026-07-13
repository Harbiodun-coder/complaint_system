"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiGrid,
  FiPlusCircle,
  FiFileText,
  FiBell,
  FiUser,
  FiLock,
  FiLogOut,
} from "react-icons/fi";

const STUDENT_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/dashboard/submit", label: "Submit Complaint", icon: FiPlusCircle },
  { href: "/dashboard/complaints", label: "My Complaints", icon: FiFileText },
  { href: "/dashboard/notifications", label: "Notifications", icon: FiBell },
  { href: "/dashboard/profile", label: "Profile", icon: FiUser },
  { href: "/dashboard/change-password", label: "Change Password", icon: FiLock },
];

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/complaints", label: "Complaints", icon: FiFileText },
  { href: "/admin/notifications", label: "Notifications", icon: FiBell },
  { href: "/admin/profile", label: "Profile", icon: FiUser },
];

export default function Sidebar({ role = "student" }) {
  const pathname = usePathname();
  const router = useRouter();
  const links = role === "admin" ? ADMIN_LINKS : STUDENT_LINKS;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 min-h-screen bg-navy-950 text-gray-200 flex flex-col py-6">
      <div className="flex items-center gap-2 px-6 mb-8 font-bold text-sm leading-tight">
        <div className="w-9 h-9 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-[10px]">
          LASU
        </div>
        <span>
          LASU COMPLAINTS
          <br />
          <span className="font-normal text-[10px] tracking-wide text-gray-400">
            MANAGEMENT SYSTEM
          </span>
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <Icon /> {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-2.5 text-sm text-gray-300 hover:text-white transition"
      >
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}
