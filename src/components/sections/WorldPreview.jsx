import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const WorldPreview = () => {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-sm">Sector Analysis</span>
            <h2 className="text-5xl md:text-6xl font-black text-white mt-4 mb-6 leading-[1.1]" style={{ fontFamily: "AetherionV1, sans-serif" }}>
              THE SHATTERED <br /> ISLES
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              From the radiant peaks of the Crystal Spires to the abyssal ruins of the Sunken City. Every corner is alive with mystery.
            </p>
            
            <div className="flex gap-4">
              <Button>Explore World Map</Button>
            </div>
          </motion.div>

          {/* Visual: Map with Radar Effect */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-full aspect-square max-w-md mx-auto border border-white/10 bg-slate-900/50 p-4">
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
              <img 
                src="/src/assets/images/World-space-v2.jpg" 
                alt="World" 
                className="w-full h-full object-cover rounded-full opacity-80 grayscale hover:grayscale-0 transition-all duration-700" 
              />
              
              {/* Radar Sweep Animation */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                 <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/40 to-transparent absolute top-0 left-0 origin-bottom-right animate-spin-slow" />
              </div>
            </div>
            
            {/* Decorative Orbit Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-white/10 rounded-full animate-spin-reverse-slow pointer-events-none" />
          </motion.div>
        </div>
      </div>
      
      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-spin-reverse-slow { animation: spin 20s linear infinite reverse; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default WorldPreview;