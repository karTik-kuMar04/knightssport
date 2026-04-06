"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Home,
  FileText,
  CheckCircle,
  Clock,
  UserCheck,
  DollarSign,
  TrendingUp,
  Filter,
} from "lucide-react";

/* ---------- mock data ---------- */
interface Team {
  id: number;
  name: string;
  captain: string;
  contact: string;
  players: number;
  status: "Paid" | "Pending";
  registeredAt: string;
}

const mockTeams: Team[] = [
  { id: 1, name: "Thunder Bolts", captain: "Rahul Sharma", contact: "+91 98765 43210", players: 12, status: "Paid", registeredAt: "2026-04-01" },
  { id: 2, name: "Royal Strikers", captain: "Amit Patel", contact: "+91 87654 32109", players: 11, status: "Paid", registeredAt: "2026-04-01" },
  { id: 3, name: "Blaze Warriors", captain: "Vikram Singh", contact: "+91 76543 21098", players: 14, status: "Pending", registeredAt: "2026-04-02" },
  { id: 4, name: "Storm Chasers", captain: "Arun Kumar", contact: "+91 65432 10987", players: 13, status: "Paid", registeredAt: "2026-04-02" },
  { id: 5, name: "Night Hawks", captain: "Deepak Verma", contact: "+91 54321 09876", players: 11, status: "Pending", registeredAt: "2026-04-03" },
  { id: 6, name: "Falcon XI", captain: "Suresh Raina Jr", contact: "+91 43210 98765", players: 15, status: "Paid", registeredAt: "2026-04-03" },
  { id: 7, name: "Phoenix Rising", captain: "Karan Malhotra", contact: "+91 32109 87654", players: 12, status: "Paid", registeredAt: "2026-04-03" },
  { id: 8, name: "Urban Legends", captain: "Pradeep Rao", contact: "+91 21098 76543", players: 10, status: "Pending", registeredAt: "2026-04-04" },
  { id: 9, name: "Iron Wolves", captain: "Manish Tiwari", contact: "+91 10987 65432", players: 13, status: "Paid", registeredAt: "2026-04-04" },
  { id: 10, name: "Gladiators CC", captain: "Rohit Mehra", contact: "+91 09876 54321", players: 11, status: "Pending", registeredAt: "2026-04-04" },
  { id: 11, name: "Avalanche XI", captain: "Nikhil Joshi", contact: "+91 98712 34567", players: 14, status: "Paid", registeredAt: "2026-04-04" },
  { id: 12, name: "Spartans United", captain: "Ajay Chauhan", contact: "+91 87612 34568", players: 12, status: "Pending", registeredAt: "2026-04-04" },
];

/* ---------- sidebar nav items ---------- */
const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Teams", active: false },
  { icon: Trophy, label: "Matches", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
];

/* ---------- admin page ---------- */
export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Paid" | "Pending">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTeams = mockTeams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.captain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || team.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPaid = mockTeams.filter((t) => t.status === "Paid").length;
  const totalPending = mockTeams.filter((t) => t.status === "Pending").length;
  const totalPlayers = mockTeams.reduce((sum, t) => sum + t.players, 0);

  const handleDownloadCSV = () => {
    const headers = ["ID", "Team Name", "Captain", "Contact", "Players", "Status", "Registered"];
    const rows = mockTeams.map((t) => [t.id, t.name, t.captain, t.contact, t.players, t.status, t.registeredAt]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "antigravity_teams.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ===== SIDEBAR ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex w-72 flex-col bg-card border-r border-border transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-18 items-center justify-between px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-white">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-tight block leading-tight text-foreground">
                Antigravity
              </span>
              <span className="text-[9px] font-bold text-muted uppercase tracking-widest">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 rounded-xl text-muted hover:text-foreground hover:bg-foreground/5"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-5 space-y-1">
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {sidebarLinks.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-muted hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-muted transition-all duration-200 hover:text-foreground hover:bg-foreground/5"
          >
            <Home className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-18 items-center justify-between px-4 sm:px-8 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2.5 rounded-xl text-foreground hover:bg-foreground/5 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-foreground">Dashboard</h1>
              <p className="text-xs text-muted hidden sm:block">Manage your tournament teams and payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-soft text-accent text-xs font-bold">
              <TrendingUp className="h-3.5 w-3.5" />
              Season 2026
            </div>
            <div className="h-10 w-10 rounded-2xl bg-accent flex items-center justify-center shadow-md shadow-accent/20">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                label: "Total Teams",
                value: mockTeams.length.toString(),
                accent: "bg-accent-soft text-accent",
                border: "hover:border-accent/20",
              },
              {
                icon: CheckCircle,
                label: "Paid",
                value: totalPaid.toString(),
                accent: "bg-success/10 text-success",
                border: "hover:border-success/20",
              },
              {
                icon: Clock,
                label: "Pending",
                value: totalPending.toString(),
                accent: "bg-danger/10 text-danger",
                border: "hover:border-danger/20",
              },
              {
                icon: UserCheck,
                label: "Total Players",
                value: totalPlayers.toString(),
                accent: "bg-gold/10 text-gold",
                border: "hover:border-gold/20",
              },
            ].map(({ icon: Icon, label, value, accent, border }) => (
              <div
                key={label}
                className={`rounded-2xl bg-card border border-border p-5 transition-all duration-300 hover-lift ${border}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-foreground">{value}</p>
                <p className="text-xs text-muted font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Table Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              Registered Teams
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              {/* Status Filter */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-card border border-border">
                {(["all", "Paid", "Pending"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                      statusFilter === status
                        ? "bg-accent text-white"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {status === "all" ? "All" : status}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  id="admin-search"
                  type="text"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full sm:w-56 rounded-xl bg-card border border-border pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted/50 transition-all duration-300"
                />
              </div>

              {/* Download CSV */}
              <button
                id="download-csv-btn"
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-bold transition-all duration-300 hover:bg-accent-hover hover:scale-105 shadow-md shadow-accent/20 shrink-0"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download CSV</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-card border border-border overflow-hidden card-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background-alt/40">
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest">
                      #
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest">
                      Team
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest hidden md:table-cell">
                      Captain
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest hidden lg:table-cell">
                      Contact
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest hidden sm:table-cell">
                      Players
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-5 py-4 text-left text-[11px] font-bold text-muted uppercase tracking-widest hidden xl:table-cell">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeams.map((team, idx) => (
                    <tr
                      key={team.id}
                      className="border-b border-border/60 transition-colors hover:bg-accent-soft/30"
                    >
                      <td className="px-5 py-4 text-muted font-mono text-xs font-bold">
                        {String(team.id).padStart(2, "0")}
                      </td>
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-foreground">{team.name}</p>
                          <p className="text-xs text-muted md:hidden">{team.captain}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-foreground/80 font-medium hidden md:table-cell">
                        {team.captain}
                      </td>
                      <td className="px-5 py-4 text-muted font-mono text-xs hidden lg:table-cell">
                        {team.contact}
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="text-foreground font-bold">{team.players}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                            team.status === "Paid"
                              ? "bg-success/10 text-success"
                              : "bg-danger/10 text-danger"
                          }`}
                        >
                          {team.status === "Paid" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          {team.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted text-xs font-medium hidden xl:table-cell">
                        {team.registeredAt}
                      </td>
                    </tr>
                  ))}
                  {paginatedTeams.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-16 text-center text-muted">
                        <Filter className="h-8 w-8 mx-auto mb-3 text-border" />
                        <p className="font-medium">No teams found matching your filters.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-background-alt/30">
                <p className="text-xs text-muted font-medium">
                  Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredTeams.length)} of{" "}
                  {filteredTeams.length} teams
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl text-muted transition-all duration-200 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-xl text-xs font-bold transition-all duration-200 ${
                        page === currentPage
                          ? "bg-accent text-white shadow-md shadow-accent/20"
                          : "text-muted hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl text-muted transition-all duration-200 hover:text-foreground hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Revenue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-card border border-border p-6 card-shadow hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/10">
                  <DollarSign className="h-5 w-5 text-success" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  Revenue Collected
                </h3>
              </div>
              <p className="text-4xl font-extrabold text-success">
                INR {(totalPaid * 2000).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted font-medium mt-2">
                From {totalPaid} confirmed payments
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-6 card-shadow hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-danger/10">
                  <Clock className="h-5 w-5 text-danger" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  Pending Amount
                </h3>
              </div>
              <p className="text-4xl font-extrabold text-danger">
                INR {(totalPending * 2000).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted font-medium mt-2">
                From {totalPending} pending payments
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
