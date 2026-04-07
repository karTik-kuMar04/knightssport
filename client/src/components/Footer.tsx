import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-border/10 selection:bg-accent selection:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Large Branding */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-background/90">
            KnightsSport
          </h2>
          <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.3em] mt-2">
            Sports Management &amp; Entertainment
          </p>
        </div>

        {/* Middle Section: Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Headquarters */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              Headquarters
            </h4>
            <div className="text-sm text-background/80 leading-relaxed font-medium">
              <p>KnightsSport Tower</p>
              <p>Level 4, GT Road Tech Park</p>
              <p>Noida, Uttar Pradesh 201301</p>
              <p>India</p>
            </div>
          </div>

          {/* Column 2: Direct Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              Office of the Director
            </h4>
            <div className="text-sm text-background/80 leading-relaxed font-medium space-y-4">
              <div>
                <p className="text-[10px] text-background/50 uppercase tracking-widest mb-0.5">Primary Phone</p>
                <a href="tel:+918930587292" className="hover:text-accent transition-colors">+91 8930587292</a>
              </div>
              <div>
                <p className="text-[10px] text-background/50 uppercase tracking-widest mb-0.5">General Enquiries</p>
                <a href="mailto:director@knightssport.in" className="hover:text-accent transition-colors">director@knightssport.in</a>
              </div>
            </div>
          </div>

          {/* Column 3: League Navigation */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              League Access
            </h4>
            <nav className="flex flex-col space-y-3 text-sm text-background/80 font-medium">
              <Link href="" className="hover:text-accent transition-colors w-fit">Under-19 Registration</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Senior Registration</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Official Prospectus</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Scouting Criteria</Link>
            </nav>
          </div>

          {/* Column 4: Portals & Legal */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              Portals &amp; Legal
            </h4>
            <nav className="flex flex-col space-y-3 text-sm text-background/80 font-medium">
              <Link href="/admin" className="text-accent hover:text-white transition-colors w-fit">Administrator Panel</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Player Portal</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Terms of Service</Link>
              <Link href="" className="hover:text-accent transition-colors w-fit">Privacy Policy</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-background/40 uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} KnightsSport Entertainment. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}