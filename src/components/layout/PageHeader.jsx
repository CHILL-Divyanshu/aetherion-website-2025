import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function PageHeader({ 
  title, 
  subtitle, 
  marqueeText, 
  backgroundImage 
}) {
  const location = useLocation();

  // 1. Generate Breadcrumbs automatically from URL
  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return [
      { name: "HOME", path: "/" },
      ...pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        return { name: name.replace("-", " "), path: routeTo };
      }),
    ];
  }, [location]);

  return (
    <header className="relative w-full overflow-hidden bg-black flex flex-col justify-center items-center isolate">
      
      {/* --- LAYER 1: Dynamic Background Image (Optional) --- */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20 blur-sm scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-[#02060c]/80 to-transparent" />
        </div>
      )}

      {/* --- LAYER 2: Marquee Background (Optimized) --- */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.07] pointer-events-none select-none overflow-hidden">
        <div className="marquee-row animate-marquee-left whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
             <span key={i} className="text-[12vh] font-black uppercase italic tracking-tighter text-transparent stroke-text px-4">
               {marqueeText || title} &nbsp;
             </span>
          ))}
        </div>
        <div className="marquee-row animate-marquee-right whitespace-nowrap mt-[-2vh]">
          {[...Array(4)].map((_, i) => (
             <span key={i} className="text-[12vh] font-black uppercase italic tracking-tighter text-transparent stroke-text px-4">
               {marqueeText || title} &nbsp;
             </span>
          ))}
        </div>
      </div>

      {/* --- LAYER 3: Main Content --- */}
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 text-center">
        
        {/* Breadcrumbs */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center gap-2 text-xs font-mono text-cyan-500/60 mb-6 uppercase tracking-widest"
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="text-slate-700">/</span>}
              <Link 
                to={crumb.path} 
                className={`hover:text-cyan-400 transition-colors ${
                  index === breadcrumbs.length - 1 ? "text-cyan-400 font-bold" : ""
                }`}
              >
                {crumb.name}
              </Link>
            </React.Fragment>
          ))}
        </motion.nav>

        {/* Title with Glitch/Glow Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-none"
            style={{ 
              fontFamily: 'AetherionV1, sans-serif',
              textShadow: '0 0 40px rgba(6, 182, 212, 0.25)' 
            }}
          >
            {title}
          </h1>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Bottom Fade to Content */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#02060c] to-transparent z-10" />
    </header>
  );
}

export default PageHeader;