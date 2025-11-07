import React, { useMemo } from "react";

function PageHeader({ title, subtitle, marqueeText }) {
  const marqueeRows = useMemo(
    () =>
      [1, 2].map(rowIndex => (
        <div key={rowIndex} className={`marquee-row row-${rowIndex}`}>
          {[0, 1].map((_, idx) => (
            <div
              key={idx}
              className="marquee-content"
              aria-hidden={idx === 1}
            >
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="marquee-text-stroke text-[clamp(4rem,12vw,10rem)] font-black uppercase tracking-tighter"
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          ))}
        </div>
      )),
    [marqueeText]
  );

  return (
    <header className="page-header relative flex flex-col justify-center text-center overflow-hidden min-h-[70vh]">
      <div className="marquee-background-container absolute inset-0 z-0 opacity-30">
        <div className="marquee-stack">{marqueeRows}</div>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-transparent to-slate-950 z-1 pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black text-indigo-300 tracking-tighter uppercase mb-8 leading-[0.9] drop-shadow-2xl hover:scale-105 transition-transform duration-300">
          {title}
        </h1>

        <div className="h-1 w-[150px] bg-linear-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full" />

        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}

export default PageHeader;