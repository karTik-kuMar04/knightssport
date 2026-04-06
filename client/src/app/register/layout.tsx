import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Your Team | Antigravity Cricket",
  description:
    "Sign up your cricket team for the Antigravity Tournament 2026. Fill in your details and secure your spot.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
