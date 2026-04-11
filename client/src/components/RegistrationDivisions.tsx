import Link from "next/link";

export default function RegistrationDivisions() {
  return (
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Regular Widget */}
          <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500 shadow-xl border-accent/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-b-md">
              Most Popular
            </div>
            <div className="p-8 lg:p-10 flex-1 pt-12">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                  Regular <br /> Division
                </h3>
                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                  ₹499 Fee
                </span>
              </div>
              <div className="space-y-6 mb-10">
                <div className="pb-4 border-b border-border/50">
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Age Criteria</p>
                  <p className="text-sm font-bold text-foreground">Between 19 and 35 years of age.</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Deadline</p>
                  <p className="text-sm font-medium text-foreground">Valid till May 15, 2026</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-accent border-t border-accent mt-auto">
              <Link href="/register?category=regular" className="block w-full text-center py-4 bg-white text-accent font-black text-sm uppercase tracking-widest hover:bg-background hover:text-foreground transition-colors">
                Apply Now &mdash; Regular
              </Link>
            </div>
          </div>

          {/* U-19 Widget */}
          <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500">
            <div className="p-8 lg:p-10 flex-1">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                  Under-19 <br /> Division
                </h3>
                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                  ₹499 Fee
                </span>
              </div>
              <div className="space-y-6 mb-10">
                <div className="pb-4 border-b border-border/50">
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Age Criteria</p>
                  <p className="text-sm font-bold text-foreground">Strictly below 19 years of age.</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Deadline</p>
                  <p className="text-sm font-medium text-foreground">Valid till May 15, 2026</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-accent-soft/20 border-t border-border mt-auto">
              <Link href="/register?category=u19" className="block w-full text-center py-4 bg-foreground text-background font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                Apply Now &mdash; U19
              </Link>
            </div>
          </div>

          {/* 35+ Widget */}
          <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-accent transition-colors duration-500">
            <div className="p-8 lg:p-10 flex-1">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                  35+ <br /> Division
                </h3>
                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20">
                  ₹499 Fee
                </span>
              </div>
              <div className="space-y-6 mb-10">
                <div className="pb-4 border-b border-border/50">
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Age Criteria</p>
                  <p className="text-sm font-bold text-foreground">Strictly 35 years of age and above.</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-[0.2em] mb-1">Deadline</p>
                  <p className="text-sm font-medium text-foreground">Valid till May 15, 2026</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-accent-soft/20 border-t border-border mt-auto">
              <Link href="/register?category=35plus" className="block w-full text-center py-4 bg-foreground text-background font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                Apply Now &mdash; 35+
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}