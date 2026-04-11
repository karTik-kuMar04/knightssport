export default function BlueprintStats() {
  const stats = [
    { label: "Total Prize Pool", value: "₹6 Lakh", detail: "Maximum cumulative reward" },
    { label: "Match Bonus", value: "₹20,000", detail: "Awarded per individual match" },
    { label: "Scouting Quota", value: "Min. 8", detail: "Players selected per district" },
    { label: "Entry Fee", value: "₹499", detail: "Standard registration cost" },
  ];

  return (
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {stats.map((stat, idx) => (
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
  );
}