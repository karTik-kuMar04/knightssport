import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel |  Knights Sports",
  description:
    "Manage registered teams, track payments, and oversee tournament operations.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
