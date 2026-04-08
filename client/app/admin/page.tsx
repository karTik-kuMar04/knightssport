"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

// --- INTERFACES ---
interface Player {
  _id: string;
  createdAt: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  dob: string;
  role: string;
  feeStatus: string;
  trialDistrict: string;
  address: string;
}

// --- HELPER FUNCTIONS ---
const getFullName = (player: Player) => {
  return [player.firstName, player.middleName, player.lastName]
    .filter(Boolean)
    .join(" ");
};

const formatDate = (isoString: string) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const calculateCategory = (dobString: string) => {
  if (!dobString) return "unknown";
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age < 19 ? "u19" : "senior";
};

// --- HELPER COMPONENTS ---
const RoleBadge = ({ role }: { role: string }) => {
  let shortCode = "UNK";
  if (!role) return <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">N/A</span>;
  if (role.toLowerCase().includes("keeper")) shortCode = "WKB";
  else if (role.toLowerCase().includes("all")) shortCode = "ALL";
  else if (role.toLowerCase().includes("bat")) shortCode = "BAT";
  else if (role.toLowerCase().includes("bowl")) shortCode = "BWL";

  return (
    <span className="inline-flex items-center justify-center px-2 py-1 bg-stone-200 text-stone-900 text-[10px] font-black uppercase tracking-widest rounded-sm">
      {shortCode}
    </span>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isPaid = status?.toLowerCase() === "paid";
  const isPending = status?.toLowerCase() === "pending";
  
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest ${isPaid ? 'text-green-700' : isPending ? 'text-amber-600' : 'text-red-700'}`}>
      {status || "Unknown"}
    </span>
  );
};

export default function AdminPanel() {
  const router = useRouter();
  
  // Auth & Loading State
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data State
  const [players, setPlayers] = useState<Player[]>([]);
  
  // Filter & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    } 

    setIsAuth(true);

    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/admin/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  // 2. Filter Logic
  const filteredPlayers = players.filter(player => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = getFullName(player).toLowerCase();
    
    const matchesSearch = fullName.includes(searchLower) || (player.phone && player.phone.includes(searchQuery));
    
    const category = calculateCategory(player.dob);
    const matchesCategory = categoryFilter === "all" || category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // 3. Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE));
  const currentPlayers = filteredPlayers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Authentication Lock Screen
  if (!isAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4 selection:bg-stone-900 selection:text-stone-50 font-sans">
        <div className="flex flex-col items-center animate-pulse duration-1000">
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mb-4 text-center">
            Secure Gateway
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-stone-900 uppercase tracking-widest text-center">
            Authenticating
          </h2>
          <div className="w-12 h-0.5 bg-stone-900 mt-6" />
        </div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row selection:bg-stone-900 selection:text-stone-50 text-stone-900 font-sans tracking-tight">
      
      {/* ===== SIDEBAR ===== */}
      <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-stone-300 bg-stone-100 flex flex-col z-20 sticky top-0">
        <div className="p-4 sm:p-6 md:p-8 border-b border-stone-300 flex justify-between items-center md:block bg-stone-100">
          <div>
            <p className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mb-1 md:mb-2">Control Center</p>
            <h1 className="text-lg sm:text-xl font-black uppercase tracking-widest">KnightsSport</h1>
          </div>
          <Link href="/" className="md:hidden text-[10px] font-bold text-stone-500 uppercase tracking-widest hover:text-stone-900 transition-colors">
            Exit
          </Link>
        </div>
        
        <nav className="flex-none p-2 md:flex-1 md:p-4 space-x-2 md:space-x-0 md:space-y-2 flex flex-row md:flex-col overflow-x-auto no-scrollbar bg-stone-100">
          <button className="flex-shrink-0 text-left px-4 py-3 text-xs font-bold uppercase tracking-widest transition-colors rounded-md md:rounded-none bg-stone-900 text-stone-50">
            Player Registry
          </button>
        </nav>

        <div className="p-8 border-t border-stone-300 hidden md:block">
          <button 
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/");
            }} 
            className="text-[10px] font-bold text-stone-500 uppercase tracking-widest hover:text-stone-900 transition-colors text-left"
          >
            &larr; Terminate Session
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-x-hidden min-h-screen flex flex-col">
        <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto w-full flex-1 flex flex-col">
          
          {/* Header */}
          <div className="mb-8 md:mb-12 md:flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-2">Live Database</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">Applicant Roster</h2>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <input 
              type="text"
              placeholder="Search by Name or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-stone-100 md:bg-transparent border border-stone-300 px-4 py-3.5 sm:py-3 text-sm focus:outline-none focus:border-stone-900 font-medium placeholder:text-stone-400 rounded-lg sm:rounded-none appearance-none disabled:opacity-50"
            />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              disabled={isLoading}
              className="bg-stone-100 md:bg-transparent border border-stone-300 px-4 py-3.5 sm:py-3 text-sm focus:outline-none focus:border-stone-900 font-bold uppercase tracking-widest appearance-none sm:min-w-[200px] rounded-lg sm:rounded-none disabled:opacity-50"
            >
              <option value="all">All Divisions</option>
              <option value="u19">Under-19 Division</option>
              <option value="senior">Senior Division</option>
            </select>
          </div>

          {/* ==== DESKTOP DATA TABLE ==== */}
          <div className="hidden lg:block overflow-x-auto border border-stone-300 bg-stone-50">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-300">
                  <th className="py-4 px-6 w-16 text-[10px] font-bold text-stone-500 uppercase tracking-widest">No.</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Full Name</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Contact</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Division</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Discipline</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-stone-500 uppercase tracking-widest">Fee Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // SKELETON LOADER FOR DESKTOP
                  Array.from({ length: 8 }).map((_, idx) => (
                    <tr key={`skel-${idx}`} className="border-b border-stone-200">
                      <td className="py-4 px-6"><div className="h-3 w-4 bg-stone-200 animate-pulse rounded-sm" /></td>
                      <td className="py-4 px-6"><div className="h-3 w-20 bg-stone-200 animate-pulse rounded-sm" /></td>
                      <td className="py-4 px-6"><div className="h-4 w-32 bg-stone-200 animate-pulse rounded-sm" /></td>
                      <td className="py-4 px-6"><div className="h-3 w-24 bg-stone-200 animate-pulse rounded-sm" /></td>
                      <td className="py-4 px-6"><div className="h-3 w-12 bg-stone-200 animate-pulse rounded-sm" /></td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-5 w-8 bg-stone-200 animate-pulse rounded-sm" />
                          <div className="h-3 w-16 bg-stone-200 animate-pulse rounded-sm" />
                        </div>
                      </td>
                      <td className="py-4 px-6"><div className="h-3 w-12 bg-stone-200 animate-pulse rounded-sm" /></td>
                    </tr>
                  ))
                ) : currentPlayers.length > 0 ? (
                  // ACTUAL DATA ROWS
                  currentPlayers.map((player, index) => {
                    const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    const category = calculateCategory(player.dob);
                    
                    return (
                      <tr key={player._id || absoluteIndex} className="border-b border-stone-200 hover:bg-stone-100 transition-colors">
                        <td className="py-4 px-6 text-xs text-stone-400 font-bold tracking-widest">{absoluteIndex < 10 ? `0${absoluteIndex}` : absoluteIndex}</td>
                        <td className="py-4 px-6 text-xs text-stone-500 font-medium whitespace-nowrap">{formatDate(player.createdAt)}</td>
                        <td className="py-4 px-6 text-sm font-bold uppercase">{getFullName(player)}</td>
                        <td className="py-4 px-6 text-xs text-stone-600 font-medium tracking-widest">{player.phone}</td>
                        <td className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-stone-600">
                          {category === "u19" ? "U-19" : "Senior"}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <RoleBadge role={player.role} />
                            <span className="text-xs font-medium text-stone-600 max-w-[120px] truncate" title={player.role}>{player.role}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6"><StatusBadge status={player.feeStatus} /></td>
                      </tr>
                    );
                  })
                ) : (
                  // NO RESULTS STATE
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs font-bold text-stone-400 uppercase tracking-widest">
                      No applicants found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ==== MOBILE DATA CARDS ==== */}
          <div className="block lg:hidden space-y-3">
            {isLoading ? (
              // SKELETON LOADER FOR MOBILE
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={`mskel-${idx}`} className="bg-stone-50 border border-stone-300 p-4 sm:p-5 flex flex-col gap-3 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-stone-200 h-5 w-8 rounded-br-lg z-10 animate-pulse" />
                  
                  <div className="flex justify-between items-start border-b border-stone-200 pb-3 mt-4">
                    <div className="space-y-2">
                      <div className="h-2 w-24 bg-stone-200 animate-pulse rounded-sm" />
                      <div className="h-4 w-36 bg-stone-200 animate-pulse rounded-sm" />
                    </div>
                    <div className="h-3 w-12 bg-stone-200 animate-pulse rounded-sm" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div className="space-y-1.5">
                      <div className="h-2 w-10 bg-stone-200 animate-pulse rounded-sm" />
                      <div className="h-3 w-12 bg-stone-200 animate-pulse rounded-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-10 bg-stone-200 animate-pulse rounded-sm" />
                      <div className="h-3 w-20 bg-stone-200 animate-pulse rounded-sm" />
                    </div>
                    <div className="col-span-2 flex justify-between items-center bg-stone-100 p-2.5 rounded border border-stone-200">
                      <div className="space-y-1.5">
                        <div className="h-2 w-10 bg-stone-200 animate-pulse rounded-sm" />
                        <div className="h-3 w-24 bg-stone-200 animate-pulse rounded-sm" />
                      </div>
                      <div className="h-5 w-8 bg-stone-200 animate-pulse rounded-sm" />
                    </div>
                  </div>
                </div>
              ))
            ) : currentPlayers.length > 0 ? (
              // ACTUAL DATA CARDS
              currentPlayers.map((player, index) => {
                const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                const category = calculateCategory(player.dob);
                
                return (
                  <div key={player._id || absoluteIndex} className="bg-stone-50 border border-stone-300 p-4 sm:p-5 flex flex-col gap-3 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-stone-900 text-stone-50 text-[9px] font-bold px-2 py-1 rounded-br-lg z-10">
                      #{absoluteIndex < 10 ? `0${absoluteIndex}` : absoluteIndex}
                    </div>
                    
                    <div className="flex justify-between items-start border-b border-stone-200 pb-3 mt-4">
                      <div>
                        <p className="text-[10px] text-stone-500 uppercase tracking-widest mb-0.5 truncate max-w-[150px]">{player._id}</p>
                        <p className="text-sm sm:text-base font-bold uppercase text-stone-900">{getFullName(player)}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={player.feeStatus} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                      <div>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Division</p>
                        <p className="text-xs font-bold uppercase text-stone-700">{category === "u19" ? "U-19" : "Senior"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Registered</p>
                        <p className="text-xs font-medium text-stone-700">{formatDate(player.createdAt)}</p>
                      </div>
                      <div className="col-span-2 flex justify-between items-center bg-stone-100 p-2.5 rounded border border-stone-200">
                        <div>
                          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Contact</p>
                          <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-900">{player.phone}</p>
                        </div>
                        <RoleBadge role={player.role} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // NO RESULTS STATE
              <div className="py-12 text-center border border-stone-300 bg-stone-50 rounded-lg">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">No applicants found.</p>
              </div>
            )}
          </div>

          {/* ==== PAGINATION CONTROLS ==== */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-stone-300 pt-6 gap-4">
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest order-2 sm:order-1">
              {isLoading ? (
                <span className="animate-pulse">Loading dataset...</span>
              ) : (
                `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + (currentPlayers.length > 0 ? 1 : 0)} - ${(currentPage - 1) * ITEMS_PER_PAGE + currentPlayers.length} of ${filteredPlayers.length}`
              )}
            </p>
            
            <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1 || isLoading}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-300 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-stone-900 hover:text-stone-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-900 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <div className="px-4 py-2 bg-stone-100 border border-stone-300 text-[10px] font-bold uppercase tracking-widest text-stone-500 flex items-center justify-center">
                {isLoading ? "-" : currentPage} / {isLoading ? "-" : totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0 || isLoading}
                className="flex-1 sm:flex-none px-4 py-2 border border-stone-300 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-stone-900 hover:text-stone-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-stone-900 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}