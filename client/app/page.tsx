"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-background selection:bg-accent selection:text-white">
        {/* ===== PREMIUM HERO SECTION ===== */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20 border-b border-border">
  
          {/* ===== TOP LEFT ICON ===== */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
            <img 
              src="./knights-sports-icon-removebg.png" 
              alt="League Icon" 
              className="h-16 md:h-25 w-auto object-contain drop-shadow-md" 
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-b from-background via-background to-accent-soft/10 pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
            
            <p className="text-[10px] md:text-xs font-bold text-muted uppercase tracking-[0.3em]">
              Official Selection &middot; 2026 Season
            </p>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
              GT Road <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-accent">League</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-medium mt-8">
              The ultimate proving ground for the region's elite. Compete across Under-19 and Senior divisions. Defy the limits. Rule the pitch.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="#form-divisions" 
                className="w-full sm:w-auto px-10 py-4 bg-black border border-border text-white font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform outline-none"
              >
                Fill Form
              </Link>
              <Link 
                href="#blueprint" 
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-border text-foreground font-bold text-sm uppercase tracking-widest hover:bg-accent-soft transition-colors"
              >
                Read The Prospectus
              </Link>
            </div>
          </div>
        </section>

        {/* ===== OFFICIAL MEDIA (JUST BELOW HERO) ===== */}
        <section className="py-20 lg:py-32 bg-background border-b border-border overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Poster Image */}
              <div className="flex justify-center lg:justify-end">
                <img 
                  src="knights-sports.jpg" 
                  alt="Official GT Road League Poster" 
                  className="w-full max-w-md h-auto rounded-xl shadow-2xl border border-border/50" 
                />
              </div>

              {/* Logo / Badge Image */}
              <div className="flex flex-col items-center lg:items-start justify-center space-y-10">
                <img 
                  src="knights-sports-icon.jpg" 
                  alt="GT Road League Emblem" 
                  className="w-full max-w-sm h-auto drop-shadow-xl" 
                />
                <div className="text-center lg:text-left max-w-md">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-4 border-l-4 border-accent pl-4">
                    Ab Hai Local Ki Baari
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    Powered by Knights Sports. Register now to claim your spot in the most prestigious cricket league across the GT Road districts. Secure your kit, prove your worth, and rule the pitch.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== THE NUMBERS (STATS WIDGET) ===== */}
        <section id="blueprint" className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 md:flex md:justify-between md:items-end border-b border-border pb-8">
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-2">
                  League Structure
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                  The Blueprint
                </h2>
              </div>
              <p className="text-sm text-muted max-w-sm mt-6 md:mt-0 font-medium text-justify md:text-right">
                We are actively scouting top-tier talent from all local districts along the GT Road corridor. Only the best will advance.
              </p>
            </div>

            {/* Premium Typographic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
              {[
                { label: "Total Prize Pool", value: "₹4 Lakh", detail: "Maximum cumulative reward" },
                { label: "Match Bonus", value: "₹10,000", detail: "Awarded per individual match" },
                { label: "Scouting Quota", value: "Min. 6", detail: "Players selected per district" },
                { label: "Entry Fee", value: "₹499", detail: "Standard registration cost" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-card p-10 flex flex-col justify-between hover:bg-accent-soft/30 transition-colors duration-500">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-8">
                    0{idx + 1} &mdash; {stat.label}
                  </p>
                  <div>
                    <p className="text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted font-medium">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== REGISTRATION DIVISIONS WIDGETS ===== */}
        <section id="form-divisions" className="py-24 bg-background border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-2">
                Secure Your Slot
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
                Open Applications
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* U-19 Widget */}
              <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500">
                <div className="p-10 lg:p-12 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">
                      Under-19 <br /> Division
                    </h3>
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                      ₹499 Fee
                    </span>
                  </div>
                  
                  <div className="space-y-6 mb-10">
                    <div className="pb-4 border-b border-border/50">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Age Rule</p>
                      <p className="text-sm font-medium text-foreground">Strictly under 19 years of age as of cutoff date.</p>
                    </div>
                    <div className="pb-4 border-b border-border/50">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Availability</p>
                      <p className="text-sm font-bold text-foreground">42 <span className="text-muted font-medium">/ 150 Seats Remaining</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Deadline</p>
                      <p className="text-sm font-medium text-foreground">Valid till May 15, 2026</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-accent-soft/20 border-t border-border mt-auto">
                  <Link 
                    href="/register?category=u19" 
                    className="block w-full text-center py-4 bg-foreground text-background font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Apply Now &mdash; U19
                  </Link>
                </div>
              </div>

              {/* Senior Widget */}
              <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500">
                <div className="p-10 lg:p-12 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">
                      Senior <br /> Division
                    </h3>
                    <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                      ₹499 Fee
                    </span>
                  </div>
                  
                  <div className="space-y-6 mb-10">
                    <div className="pb-4 border-b border-border/50">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Age Rule</p>
                      <p className="text-sm font-medium text-foreground">19 years to 39 years of age strictly.</p>
                    </div>
                    <div className="pb-4 border-b border-border/50">
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Availability</p>
                      <p className="text-sm font-bold text-foreground">28 <span className="text-muted font-medium">/ 150 Seats Remaining</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Deadline</p>
                      <p className="text-sm font-medium text-foreground">Valid till May 15, 2026</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-accent-soft/20 border-t border-border mt-auto">
                  <Link 
                    href="/register?category=senior" 
                    className="block w-full text-center py-4 bg-foreground text-background font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
                  >
                    Apply Now &mdash; Senior
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== PLAYER PERKS & DIVISIONS ===== */}
        <section className="py-24 bg-foreground text-background border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left Column - Divisions */}
              <div className="space-y-12">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
                    Categories
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                    Dual Divisions
                  </h3>
                  <div className="space-y-8">
                    <div className="border-l-2 border-accent pl-6">
                      <h4 className="text-xl font-bold uppercase tracking-wide mb-2">Under-19 League</h4>
                      <p className="text-background/70 text-sm leading-relaxed max-w-md">
                        The ultimate launchpad for young prodigies looking to make their mark on the competitive circuit.
                      </p>
                    </div>
                    <div className="border-l-2 border-background/20 pl-6 hover:border-accent transition-colors duration-300">
                      <h4 className="text-xl font-bold uppercase tracking-wide mb-2">Senior League</h4>
                      <p className="text-background/70 text-sm leading-relaxed max-w-md">
                        High-stakes, high-intensity cricket for established local powerhouses and seasoned athletes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Player Benefits */}
              <div className="space-y-12">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
                    Player Benefits
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                    Beyond The Pitch
                  </h3>
                  <p className="text-background/70 text-sm leading-relaxed mb-10 max-w-md">
                    We invest directly into our athletes. Selected players receive comprehensive support packages designed to elevate their game to professional standards.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                    {[
                      { title: "Pro Gear", desc: "Premium English willow bats and professional-grade spikes." },
                      { title: "Nutrition", desc: "High-quality food supplements tailored for athletic endurance." },
                      { title: "Direct Cash", desc: "Instant cash rewards and performance-based monetary incentives." },
                      { title: "Exposure", desc: "Scouted pathways for regional and state-level representation." },
                    ].map((perk, idx) => (
                      <div key={idx}>
                        <h5 className="text-sm font-bold uppercase tracking-widest mb-2 text-accent">
                          {perk.title}
                        </h5>
                        <p className="text-xs text-background/60 leading-relaxed">
                          {perk.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===== ORGANIZER CREDENTIALS ===== */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-6">
              Authorized Management
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-widest mb-6">
              KnightsSport Entertainment
            </h3>
            <div className="w-12 h-0.5 bg-accent mx-auto mb-8" />
            <p className="text-sm md:text-base text-muted leading-relaxed font-medium">
              The GT Road League is strictly governed and operated by KnightsSport Entertainment. 
              Our mandate is absolute: to bridge the gap between street cricket and professional stadiums. 
              By providing unparalleled infrastructure, premium equipment, and substantial financial backing, 
              we are forging the next generation of cricketing excellence.
            </p>
            <div className="mt-12">
              <Link 
                href="#form-divisions" 
                className="inline-block border-b-2 border-foreground pb-1 text-sm font-bold text-foreground uppercase tracking-widest hover:text-accent hover:border-accent transition-colors"
              >
                Secure Your Trial Slot
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}