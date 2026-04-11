export default function PlayerPerks() {
  const perks = [
    { title: "Pro Gear", desc: "Premium English willow bats and professional-grade spikes." },
    { title: "Nutrition", desc: "High-quality food supplements tailored for athletic endurance." },
    { title: "Direct Cash", desc: "Instant cash rewards and performance-based monetary incentives." },
    { title: "Exposure", desc: "Scouted pathways for regional and state-level representation." },
  ];

  return (
    <section className="py-24 bg-foreground text-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="space-y-12">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
                Categories
              </p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
                Tiered Divisions
              </h3>
              <div className="space-y-8">
                <div className="border-l-2 border-accent pl-6">
                  <h4 className="text-xl font-bold uppercase tracking-wide mb-2">Under-19 League</h4>
                  <p className="text-background/70 text-sm leading-relaxed max-w-md">
                    The ultimate launchpad for young prodigies looking to make their mark on the competitive circuit.
                  </p>
                </div>
                <div className="border-l-2 border-background/20 pl-6 hover:border-accent transition-colors duration-300">
                  <h4 className="text-xl font-bold uppercase tracking-wide mb-2">Regular League</h4>
                  <p className="text-background/70 text-sm leading-relaxed max-w-md">
                    High-stakes, high-intensity cricket for established local powerhouses in their prime.
                  </p>
                </div>
                <div className="border-l-2 border-background/20 pl-6 hover:border-accent transition-colors duration-300">
                  <h4 className="text-xl font-bold uppercase tracking-wide mb-2">35+ League</h4>
                  <p className="text-background/70 text-sm leading-relaxed max-w-md">
                    A dedicated battlefield for seasoned veterans to showcase their enduring mastery of the game.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
                {perks.map((perk, idx) => (
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
  );
}