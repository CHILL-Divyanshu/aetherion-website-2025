import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SOCIAL_ICONS = [
  { name: "X / Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { name: "Discord", path: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" },
  { name: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
];

const LINKS = {
  explore: [
    { name: "World Map", path: "/world" },
    { name: "Guardians", path: "/guardians" },
    { name: "Chronicles", path: "/news" },
  ],
  support: [
    { name: "Patch Notes", path: "/dev-hub" },
    { name: "Community Guidelines", path: "/community" },
    { name: "Help Center", path: "/contact" },
  ]
};

function Footer() {
  return (
    <footer className="relative pt-20 pb-10 bg-[#02060c] overflow-hidden border-t border-cyan-900/30">
      
      {/* Optimized Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Grid: Adjusted for better mobile/tablet layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand (Full width on mobile, 4 cols on tablet/desktop) */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-400 tracking-wider">
                AETHERION
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Forge your legend in a world shattered by celestial power. 
              The fracture awaits, Guardian.
            </p>
            <div className="flex gap-4">
              {SOCIAL_ICONS.map((icon) => (
                <a
                  key={icon.name}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center text-gray-400 hover:bg-cyan-900/20 hover:text-cyan-400 hover:scale-110 transition-all duration-300 border border-white/5 hover:border-cyan-500/30"
                  aria-label={icon.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Container: Split into 2 cols on mobile/tablet */}
          <div className="md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-8">
            {/* Column 2: Explore */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">
                Explore
              </h4>
              <ul className="space-y-3">
                {LINKS.explore.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-cyan-500 pl-3">
                Support
              </h4>
              <ul className="space-y-3">
                {LINKS.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                       <span className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter (Full width on mobile/tablet, 4 cols on desktop) */}
          <div className="md:col-span-6 lg:col-span-4">
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm h-full">
              <h4 className="text-white font-bold mb-2">Join the Vanguard</h4>
              <p className="text-xs text-gray-400 mb-4">
                Get exclusive in-game rewards and development updates.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-black/50 border border-slate-700 text-sm text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-cyan-900/20">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2025 Aetherion Project. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;