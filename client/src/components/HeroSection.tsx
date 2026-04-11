import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20 border-b border-border">
      

      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-accent-soft/10 pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
        <p className="text-[10px] md:text-xs font-bold text-muted uppercase tracking-[0.3em]">
          Official Selection &middot; 2026 Season
        </p>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
          GT Road <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-foreground to-accent">
            League
          </span>
        </h1>

        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-medium mt-8">
          The ultimate proving ground for the region's elite. Compete across Under-19, Regular, and 35+ divisions. Defy the limits. Rule the pitch.
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
  );
}