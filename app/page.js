import Link from "next/link";
import Navbar from "@/components/Navbar";
import { FiUpload, FiClock, FiEye } from "react-icons/fi";

const FEATURES = [
  {
    icon: FiUpload,
    title: "Easy Submission",
    body: "Submit your complaints in a few simple steps.",
  },
  {
    icon: FiClock,
    title: "Track Progress",
    body: "Monitor the status of your complaints in real-time.",
  },
  {
    icon: FiEye,
    title: "Transparent Process",
    body: "Ensuring accountability and improved communication.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <div className="relative bg-navy-950 text-white">
        <Navbar />
        <div className="relative px-6 py-24 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Student Complaint
            <br />
            Management System
          </h1>
          <p className="text-lg text-gray-200 mb-2">Lagos State University</p>
          <p className="text-gray-300 mb-10">
            A digital platform designed to help students submit, track and manage
            complaints efficiently and transparently.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-medium transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 rounded-md bg-white text-navy-950 hover:bg-gray-100 font-medium transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      <section id="features" className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 py-16">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
              <Icon />
            </div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
