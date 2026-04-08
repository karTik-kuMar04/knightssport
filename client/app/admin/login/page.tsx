"use client";



import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";



const Toast = ({ message, type, isVisible, onClose }: { message: string, type: "success" | "error" | null, isVisible: boolean, onClose: () => void }) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-5`}>
      <div className="bg-stone-900 text-stone-50 border border-stone-700 shadow-2xl p-6 min-w-[300px] max-w-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 ${type === "error" ? "bg-red-900/50 text-red-200" : "bg-stone-50 text-stone-900"}`}>
            {type === "error" ? "Error" : "System"}
          </span>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-50 text-xs font-bold uppercase tracking-widest transition-colors">
            Close
          </button>
        </div>
        <p className="text-sm font-medium tracking-wide leading-relaxed mt-2">
          {message}
        </p>
      </div>
    </div>
  );
};

export default function AdminLogin() {
  const router = useRouter();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" | null, isVisible: boolean }>({
    message: "",
    type: null,
    isVisible: false,
  });

  // Helper to trigger toast
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

        try {
            const response = await api.post("/api/admin/login", {
                email,
                password,
            });

            const data = response.data;

            localStorage.setItem("adminToken", data.token);


            showToast("Access granted. Redirecting to control panel...", "success");

            setTimeout(() => {
            router.push("/admin");
            }, 1000);

        } catch (err: any) {
            console.log(err);

            const message =
            err?.response?.data?.message || "Authentication failed";

            showToast(message, "error");

        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-stone-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 font-sans tracking-tight">
      
      {/* Toast Notification Mount */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      {/* Main Login Card */}
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <p className="text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-[0.3em] mb-4">
            Authorized Personnel Only
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter">
            System <br /> Access
          </h1>
        </div>

        <form onSubmit={handleLogin} className="bg-stone-100 sm:bg-transparent border sm:border-none border-stone-200 p-6 sm:p-0 rounded-lg sm:rounded-none space-y-8">
          
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">
              Administrative Email
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
              placeholder="e.g. director@knightssport.in"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-2">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                Secure Password
              </label>
            </div>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4 space-y-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 sm:py-5 bg-stone-900 text-stone-50 font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors rounded-lg sm:rounded-none disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Establish Connection"}
            </button>

            <Link 
              href="/"
              className="block w-full py-4 border border-stone-300 text-stone-500 text-center font-bold text-[10px] uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-colors rounded-lg sm:rounded-none"
            >
              &larr; Return to Public Portal
            </Link>
          </div>
        </form>

        {/* Footer info for mock purposes */}
        <div className="mt-12 text-center">
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
            Mock Credentials: admin@knightssport.in / admin123
          </p>
        </div>
      </div>
    </div>
  );
}