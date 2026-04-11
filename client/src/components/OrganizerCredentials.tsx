import Link from "next/link";

export default function OrganizerCredentials() {
  return (
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
  );
}