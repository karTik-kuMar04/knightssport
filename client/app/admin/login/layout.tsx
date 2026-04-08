import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Log-in |  Knights Sports",
  description:
    "Manage registered players, track payments.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
