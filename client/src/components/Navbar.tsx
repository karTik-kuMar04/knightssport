"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Trophy } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/register", label: "Register" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground leading-tight">
                Antigravity
              </span>
              <span className="text-[10px] font-medium text-muted uppercase tracking-widest leading-none hidden sm:block">
                Cricket Tournament
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted transition-all duration-300 hover:text-foreground hover:bg-foreground/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="ml-4 px-6 py-2.5 rounded-2xl bg-accent text-white text-sm font-semibold transition-all duration-300 hover:bg-accent-hover hover:scale-105 shadow-md shadow-accent/20"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl text-foreground transition-colors hover:bg-foreground/5"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-card/95 backdrop-blur-lg ${
          mobileOpen ? "max-h-80 opacity-100 border-t border-border" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-4 py-3 rounded-2xl bg-accent text-white text-sm font-semibold text-center transition-colors hover:bg-accent-hover"
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
