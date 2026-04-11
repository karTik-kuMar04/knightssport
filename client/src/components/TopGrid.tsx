export default function TopAssetsGrid() {
  return (
    <section className="bg-background pt-16 px-4 sm:px-6 lg:px-8 border-b border-border">
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <img
          src="./knights-sports-icon-removebg.png"
          alt="League Icon"
          className="h-16 md:h-25 w-auto object-contain drop-shadow-md"
        />
      </div>
      <div className="max-w-7xl mx-auto mb-16">
        
        {/* Tagline */}
        <div className="mb-12 text-center">
          <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.3em] mb-1">
            GT Road League Mandate
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground uppercase tracking-tight leading-[0.9]">
            Ab hai <br className="hidden sm:block" />
            locals <span className="text-accent">ki bari</span>
          </h2>
        </div>

        {/* 4-Column Long Portrait Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          
          {/* 1. First Portrait (Bats) */}
          <div className="h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-border group relative">
            <img
              src="./IMG_1146.jpeg"
              alt="Aman Malik SAI polo cricket bats"
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* 2. Second Portrait (Logo) */}
          <div className="h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-border flex items-center justify-center bg-card relative group">
            <div className="absolute inset-0 bg-linear-to-b from-background via-background to-accent-soft/10 pointer-events-none" />
            <img
              src="./gt_road_league_local.jpeg"
              alt="GT Road League Logo"
              // object-contain keeps the whole logo visible inside the tall box without stretching
              className="w-full h-full object-contain drop-shadow-xl z-10 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
            
          {/* 3. Third Portrait (SUV) */}
          <div className="h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-border group relative">
            <img
              src="./IMG_3315.jpg" 
              alt="Aman Malik Thar SUV"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* 4. Fourth Portrait (Bat Wall) */}
          <div className="h-[450px] md:h-[600px] rounded-2xl overflow-hidden border border-border group relative">
            <img
              src="./IMG_1343.jpeg"
              alt="Aman Malik bat wall"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
          </div>

        </div>
      </div>
    </section>
  );
}