function PageHeader({ title, subtitle, marqueeText }) {
  return (
    <header className="page-header text-center relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
      {/* Background marquee with enhanced styling */}
      <div className="marquee-background-container absolute inset-0 z-0 opacity-30"> 
        <div className="marquee-stack">
          <div className="marquee-row row-1">
            <div className="marquee-content">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="marquee-text-stroke text-[clamp(4rem,12vw,10rem)] font-black">
                  {marqueeText}
                </span>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="marquee-text-stroke text-[clamp(4rem,12vw,10rem)] font-black">
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
          <div className="marquee-row row-2">
            <div className="marquee-content">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="marquee-text-stroke text-[clamp(4rem,12vw,10rem)] font-black">
                  {marqueeText}
                </span>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="marquee-text-stroke text-[clamp(4rem,12vw,10rem)] font-black">
                  {marqueeText}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950 z-[1] pointer-events-none"></div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black text-white tracking-tighter uppercase mb-8 leading-[0.9] drop-shadow-2xl">
          <span className="inline-block transform transition-transform duration-300 hover:scale-105">
            {title}
          </span>
        </h1>
        <div className="h-1 w-[150px] bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

export default PageHeader;
