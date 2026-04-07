"use client";

import { useState } from "react";
import Link from "next/link";

// --- MOCK DATA ---
const MOCK_PLAYERS = [
  { id: "AP-001", date: "2026-04-01", name: "Virat Sharma", phone: "9876543210", category: "senior", role: "Batsman", status: "Paid" },
  { id: "AP-002", date: "2026-04-02", name: "Aarav Singh", phone: "9123456780", category: "u19", role: "Bowler", status: "Paid" },
  { id: "AP-003", date: "2026-04-03", name: "Rahul Verma", phone: "9988776655", category: "senior", role: "Wicket Keeper & Batsman", status: "Pending" },
  { id: "AP-004", date: "2026-04-04", name: "Ishaan Patel", phone: "9871122334", category: "u19", role: "All-rounder", status: "Paid" },
  { id: "AP-005", date: "2026-04-05", name: "Rishabh Das", phone: "9000111222", category: "senior", role: "Batsman", status: "Failed" },
];

const MOCK_FORMS = [
  { id: "F-01", name: "GT Road League 2026", status: "Active", responses: 142, lastEdited: "2026-03-15" },
  { id: "F-02", name: "Summer Scouting Camp", status: "Draft", responses: 0, lastEdited: "2026-04-05" },
];

// --- HELPER COMPONENTS ---
const RoleBadge = ({ role }: { role: string }) => {
  let shortCode = "UNK";
  if (role.includes("Keeper")) shortCode = "WKB";
  else if (role.includes("All")) shortCode = "ALL";
  else if (role.includes("Bat")) shortCode = "BAT";
  else if (role.includes("Bowl")) shortCode = "BWL";

  return (
    <span className="inline-flex items-center justify-center px-2 py-1 bg-stone-200 text-stone-900 text-[10px] font-black uppercase tracking-widest rounded-sm">
      {shortCode}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isPaid = status.toLowerCase() === "paid";
  const isPending = status.toLowerCase() === "pending";
  
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest ${isPaid ? 'text-green-700' : isPending ? 'text-amber-600' : 'text-red-700'}`}>
      {status}
    </span>
  );
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "forms" | "settings">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Filter Logic
  const filteredPlayers = MOCK_PLAYERS.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || player.phone.includes(searchQuery);
    const matchesCategory = categoryFilter === "all" || player.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row selection:bg-stone-900 selection:text-stone-50 text-stone-900 font-sans tracking-tight">
      
      {/* ===== SIDEBAR & MOBILE NAV ===== */}
      <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-stone-300 bg-stone-100 flex flex-col z-20 sticky top-0">
        <div className="p-4 sm:p-6 md:p-8 border-b border-stone-300 flex justify-between items-center md:block bg-stone-100">
          <div>
            <p className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mb-1 md:mb-2">Control Center</p>
            <h1 className="text-lg sm:text-xl font-black uppercase tracking-widest">KnightsSport</h1>
          </div>
          {/* Mobile exit link */}
          <Link href="/" className="md:hidden text-[10px] font-bold text-stone-500 uppercase tracking-widest hover:text-stone-900 transition-colors">
            Exit
          </Link>
        </div>
        
        {/* Navigation Tabs - Horizontally scrollable on mobile */}
        <nav className="flex-none p-2 md:flex-1 md:p-4 space-x-2 md:space-x-0 md:space-y-2 flex flex-row md:flex-col overflow-x-auto no-scrollbar bg-stone-100">
          {[
            { id: "dashboard", label: "Player Registry" },
            { id: "forms", label: "My Forms" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-md md:rounded-none ${
                activeTab === tab.id 
                  ? "bg-stone-900 text-stone-50" 
                  : "text-stone-500 hover:bg-stone-200 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Desktop exit link */}
        <div className="p-8 border-t border-stone-300 hidden md:block">
          <Link href="/" className="text-[10px] font-bold text-stone-500 uppercase tracking-widest hover:text-stone-900 transition-colors">
            &larr; Exit to Live Site
          </Link>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-x-hidden min-h-screen">
        
        {/* VIEW: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 md:flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Live Database</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">Applicant Roster</h2>
              </div>
            </div>

            {/* Filters & Search - Stack on very small screens */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <input 
                type="text"
                placeholder="Search by Name or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-stone-100 md:bg-transparent border border-stone-300 px-4 py-3.5 sm:py-3 text-sm focus:outline-none focus:border-stone-900 font-medium placeholder:text-stone-400 rounded-lg sm:rounded-none appearance-none"
              />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-stone-100 md:bg-transparent border border-stone-300 px-4 py-3.5 sm:py-3 text-sm focus:outline-none focus:border-stone-900 font-bold uppercase tracking-widest appearance-none sm:min-w-[200px] rounded-lg sm:rounded-none"
              >
                <option value="all">All Divisions</option>
                <option value="u19">Under-19 Division</option>
                <option value="senior">Senior Division</option>
              </select>
            </div>

            {/* ==== DESKTOP DATA TABLE (Hidden on Mobile) ==== */}
            <div className="hidden lg:block overflow-x-auto border border-stone-300 bg-stone-50">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-300">
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Date</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Full Name</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Contact</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Division</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Discipline</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Fee Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <tr key={player.id} className="border-b border-stone-200 hover:bg-stone-100 transition-colors">
                        <td className="py-4 px-6 text-xs text-stone-500 font-medium">{player.date}</td>
                        <td className="py-4 px-6 text-sm font-bold uppercase">{player.name}</td>
                        <td className="py-4 px-6 text-xs text-stone-600 font-medium tracking-widest">{player.phone}</td>
                        <td className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-stone-600">
                          {player.category === "u19" ? "U-19" : "Senior"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <RoleBadge role={player.role} />
                            <span className="text-xs font-medium text-stone-600">{player.role}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6"><StatusBadge status={player.status} /></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-xs font-bold text-stone-400 uppercase tracking-widest">
                        No applicants found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ==== MOBILE DATA CARDS (Hidden on Desktop) ==== */}
            <div className="block lg:hidden space-y-3">
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player) => (
                  <div key={player.id} className="bg-stone-50 border border-stone-300 p-4 sm:p-5 flex flex-col gap-3 rounded-lg">
                    {/* Header: Name and Status */}
                    <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                      <div>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-0.5">{player.id}</p>
                        <p className="text-sm sm:text-base font-bold uppercase text-stone-900">{player.name}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={player.status} />
                      </div>
                    </div>
                    
                    {/* Body: Details */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                      <div>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Division</p>
                        <p className="text-xs font-bold uppercase text-stone-700">{player.category === "u19" ? "U-19" : "Senior"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Date</p>
                        <p className="text-xs font-medium text-stone-700">{player.date}</p>
                      </div>
                      <div className="col-span-2 flex justify-between items-center bg-stone-100 p-2.5 rounded">
                        <div>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Contact</p>
                          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-900">{player.phone}</p>
                        </div>
                        <RoleBadge role={player.role} />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border border-stone-300 bg-stone-50 rounded-lg">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">No applicants found.</p>
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-6 text-center md:text-right">
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Results: {filteredPlayers.length}</p>
            </div>
          </div>
        )}

        {/* VIEW: MY FORMS */}
        {activeTab === "forms" && (
          <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto">
            <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-end border-b border-stone-300 pb-6 sm:pb-8">
              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Form Builder</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">Active Specifications</h2>
              </div>
              <button className="mt-4 md:mt-0 w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-3 bg-stone-900 text-stone-50 font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors rounded-lg sm:rounded-none">
                + Create New Form
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {MOCK_FORMS.map((form) => (
                <div key={form.id} className="border border-stone-300 bg-stone-50 p-6 sm:p-8 hover:border-stone-900 transition-colors flex flex-col h-full rounded-lg sm:rounded-none">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${form.status === 'Active' ? 'bg-stone-200 text-stone-900' : 'bg-transparent border border-stone-300 text-stone-500'}`}>
                      {form.status}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">{form.id}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-wide mb-2 leading-tight">{form.name}</h3>
                  <div className="mt-auto space-y-2 pt-6">
                    <p className="text-[11px] sm:text-xs text-stone-500 font-medium flex justify-between border-b border-stone-200 pb-2">
                      <span className="uppercase tracking-widest font-bold">Responses</span> 
                      <span className="text-stone-900 font-black">{form.responses}</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-medium flex justify-between border-b border-stone-200 pb-2">
                      <span className="uppercase tracking-widest font-bold">Last Edited</span> 
                      <span className="text-stone-900 font-bold">{form.lastEdited}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6">
                    <button className="py-2.5 sm:py-2 border border-stone-300 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors rounded sm:rounded-none">Edit</button>
                    <button className="py-2.5 sm:py-2 bg-stone-900 text-stone-50 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors rounded sm:rounded-none">View Data</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: SETTINGS */}
        {activeTab === "settings" && (
          <div className="p-4 sm:p-8 lg:p-12 max-w-3xl mx-auto">
            <div className="mb-8 md:mb-12 border-b border-stone-300 pb-6 sm:pb-8">
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Configuration</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">System Settings</h2>
            </div>

            <form className="space-y-6 sm:space-y-8 bg-stone-50 sm:bg-transparent p-4 sm:p-0 rounded-lg border sm:border-none border-stone-200" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Administrator Name</label>
                <input 
                  defaultValue="Director of Operations"
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-3.5 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Administrative Email</label>
                <input 
                  type="email"
                  defaultValue="director@knightssport.in"
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-3.5 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Secure Password Reset</label>
                <input 
                  type="password"
                  placeholder="Enter new password"
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-3.5 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                />
              </div>

              <div className="pt-6 sm:pt-8">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-stone-900 text-stone-50 font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors rounded-lg sm:rounded-none">
                  Save Configurations
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}