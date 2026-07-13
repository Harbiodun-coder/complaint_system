import "./globals.css";

export const metadata = {
  title: "LASU Complaints Management System",
  description: "Submit, track and manage student complaints at Lagos State University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
