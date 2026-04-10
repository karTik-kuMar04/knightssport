export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 border-t border-border/10 selection:bg-accent selection:text-white font-sans">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Headquarters */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              Headquarters
            </h4>
            <div className="text-sm text-background/80 leading-relaxed font-medium space-y-1">
              <p className="text-background font-bold uppercase tracking-widest text-xs mb-2">GT Road Tech Park</p>
              <p>Level 4, KnightsSport Tower</p>
              <p>Noida, Uttar Pradesh 201301</p>
              <p>India</p>
            </div>
          </div>

          {/* Column 2: Direct Contact (Text Only) */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              Office of the Director
            </h4>
            <div className="text-sm text-background/80 leading-relaxed font-medium space-y-5">
              <div>
                <p className="text-[10px] text-background/50 uppercase tracking-widest mb-1">Primary Dispatch</p>
                <p className="text-background font-bold tracking-widest">+91 89305 87292</p>
              </div>
              <div>
                <p className="text-[10px] text-background/50 uppercase tracking-widest mb-1">Electronic Mail</p>
                <p className="text-background font-bold">director@knightssport.in</p>
              </div>
            </div>
          </div>

          {/* Column 3: The Mandate */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-background/50 uppercase tracking-[0.2em] border-b border-background/20 pb-3">
              The Mandate
            </h4>
            <div className="text-sm text-background/80 leading-relaxed font-medium">
              <p>
                Forging the future of Indian cricket along the historic GT Road. 
                We bridge the gap between street ambition and professional stadiums. 
                We provide the platform, the premium gear, and the glory. You bring the grit.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Credits */}
        <div className="pt-8 border-t border-background/20 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-[10px] text-background/40 uppercase tracking-widest font-bold">
            &copy; {new Date().getFullYear()} KnightsSport Entertainment. All rights reserved.
          </p>
          
          <p className="text-[10px] text-background/40 uppercase tracking-widest font-bold">
            Designed &amp; Engineered by <span className="text-background">Kartik Kumar</span> 
            <span className="mx-3 opacity-30">|</span> 
            <a 
              href="tel:+918826395569" 
              className="text-background hover:text-accent transition-colors"
            >
              Contact Me
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}