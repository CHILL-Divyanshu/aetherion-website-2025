import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Youtube, Disc, Instagram } from "lucide-react";
import Button from "../ui/Button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const LINKS = {
    explore: [
      { name: "World Map", path: "/world" },
      { name: "Guardians", path: "/guardians" },
      { name: "News Section", path: "/news" },
    ],
    support: [
      { name: "Patch Notes", path: "/dev-hub" },
      { name: "Community Guidelines", path: "/community" },
      { name: "Help Center", path: "/contact" },
    ]
  };

  // Hover animation for links
  const linkVariants = {
    initial: { x: 0, color: "#9ca3af" }, // gray-400
    hover: { x: 5, color: "#22d3ee" }    // cyan-400
  };

  return (
    <footer className="relative bg-[#02060c] py-12 overflow-hidden border-t border-white/5">
      
      {/* Atmospheric Glows */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_cyan]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* RESPONSIVE GRID LAYOUT 
            - Mobile: 2 columns (Brand takes full width, Links split 1/2)
            - Tablet: Brand (Half), Links (Quarter each), Newsletter (Full bottom)
            - Desktop: 4 Columns straight across
        */}
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 lg:gap-8 mb-12 items-start">
          
          {/* BRAND COLUMN: Full on Mobile (12), Half on Tablet (6), 4 on Desktop */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-2"
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                 <span className="text-cyan-500">⚡</span> Aetherion
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Forge your legend in a world shattered by celestial power. The fracture awaits, Guardian.
              <br />
              <span className="text-xs text-gray-600 font-mono mt-2 block">// SYSTEM V2.0 ONLINE</span>
            </p>
            
            {/* Socials */}
            <div className="flex gap-3">
               {[<Twitter />, <Disc />, <Youtube />, <Instagram />].map((icon, i) => (
                 <motion.a 
                   key={i}
                   href="#"
                   whileHover={{ scale: 1.1, y: -2, color: "#22d3ee" }}
                   className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 border border-white/5 hover:bg-cyan-900/20 hover:border-cyan-500/30 transition-all"
                 >
                   {React.cloneElement(icon, { size: 16 })}
                 </motion.a>
               ))}
            </div>
          </div>

          {/* EXPLORE: Half on Mobile (6), Quarter on Tablet (3), 2 on Desktop */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-cyan-500 pl-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {LINKS.explore.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="block">
                    <motion.span 
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT: Half on Mobile (6), Quarter on Tablet (3), 2 on Desktop */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
             <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-l-2 border-purple-500 pl-3">
              Support
            </h3>
            <ul className="space-y-2">
              {LINKS.support.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="block">
                    <motion.span 
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER: Full on Mobile/Tablet (12), 4 on Desktop */}
          <div className="col-span-12 md:col-span-12 lg:col-span-4">
            <div className="relative bg-[#080c14] border border-white/10 p-5 rounded-xl overflow-hidden group">
               {/* Tech Decoration */}
               <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-xl" />
               <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-xl" />
               
               <h3 className="text-base font-black text-white uppercase italic tracking-wider mb-1">
                 Join the Vanguard
               </h3>
               <p className="text-[11px] text-gray-400 mb-4">
                 Get exclusive rewards & updates encrypted to your inbox.
               </p>

               <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                 <div className="relative">
                   <input 
                     type="email" 
                     placeholder="ENTER EMAIL ADDRESS..."
                     className="w-full bg-black/50 border border-white/10 rounded px-3 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                   />
                 </div>
                 <Button variant="primary" className="w-full text-xs py-2.5">
                    Initialize Uplink
                 </Button>
               </form>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono uppercase tracking-wide">
           <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <span>© {currentYear} Aetherion Project.</span>
              <span className="hidden sm:inline">|</span>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
           </div>
           
           {/* System Status Indicator */}
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-green-400 font-bold tracking-widest">
                System Operational
              </span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;