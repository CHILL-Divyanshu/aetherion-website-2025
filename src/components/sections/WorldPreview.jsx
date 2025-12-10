import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const WorldPreview = () => {
  return (
    <section className="py-18 relative overflow-hidden border-t border-white/5">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-30" />
    
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
          
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
               <span className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-sm">Sector Analysis</span>
               <div className="h-1 w-12 bg-cyan-500 mt-2" />
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tight">
              THE SHATTERED <br /> 
              <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">ISLES</span>
            </h2>
            
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              From the radiant peaks of the Crystal Spires to the abyssal ruins of the Sunken City. Every corner is alive with mystery, danger, and ancient technology.
            </p>
            
            <Button>Explore Interactive Map</Button>
          </motion.div>

          {/* Visual: Radar Map */}
          <motion.div 
            className="lg:w-1/2 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Rotating Ring 1 */}
              <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
              {/* Rotating Ring 2 */}
              <div className="absolute inset-8 border border-cyan-500/20 rounded-full border-t-transparent animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Main Map Circle */}
              <div className="absolute inset-16 rounded-full overflow-hidden border-4 border-[#0f172a] shadow-[0_0_60px_rgba(6,182,212,0.2)] bg-[#0f172a]">
                <img 
                  src="/src/assets/images/World-space-v2.jpg" 
                  alt="World Map" 
                  className="w-full h-full object-cover opacity-80 hover:scale-110 transition-transform duration-1000" 
                />
                {/* Radar Scan Line */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-full w-full animate-[scan_4s_ease-in-out_infinite]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldPreview;