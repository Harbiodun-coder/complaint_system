import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-navy-950 text-white">
      <div className="flex items-center gap-2 font-bold text-sm leading-tight">
        <div className="w-9 h-9 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-xs">
          LASU
        </div>
        <span>
          LASU COMPLAINTS
          <br />
          <span className="font-normal text-[11px] tracking-wide text-gray-300">
            MANAGEMENT SYSTEM
          </span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm">
        <Link href="/">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#features">Features</Link>
        <Link href="#contact">Contact</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-medium transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-md bg-white text-navy-950 hover:bg-gray-100 text-sm font-medium transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
