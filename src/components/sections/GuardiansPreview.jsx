import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// CHANGE: Imported CyberButton
import CyberButton from "../ui/CyberButton";
import valeriusImg from "../../assets/images/Guardians/valerius.jpg";
import StatBar from "./StatBar";

const GuardiansPreview = () => {
  return (
    // FIX 1: Changed to bg-transparent and removed 'overflow-hidden' to prevent clipping 3D elements if any
    <section className="relative py-24 bg-transparent">
      
      {/* DEAD CODE REMOVED: 
          - Removed background ambient blobs
          - Removed Top/Bottom Gradient Fades (The dark bars)
      */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Character Visual (Holographic Projection Style) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative z-20"
          >
            {/* Image Frame */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20">
               <div className="relative rounded-xl overflow-hidden bg-[#080c14]/80 backdrop-blur-sm border border-white/10 shadow-2xl aspect-[4/5] group">
                  
                  <img
                    src={valeriusImg}
                    alt="Valerius"
                    className="relative w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent opacity-60" />
                  
                  {/* Tech Decals */}
                  <div className="absolute top-4 left-4 w-2 h-8 border-l border-t border-cyan-500/50" />
                  <div className="absolute bottom-4 right-4 w-2 h-8 border-r border-b border-cyan-500/50" />
               </div>
            </div>
          </motion.div>

          {/* RIGHT: Data/Stats */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >

              <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-2" 
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                Valerius
              </h2>
              <h3 className="text-3xl text-cyan-400 font-bold uppercase tracking-widest mb-6"
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                The Bone King
              </h3>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light border-l-2 border-cyan-500/30 pl-6">
                 An ancient warlord resurrected to command legions of skeletal warriors. He dominates the battlefield with high defense and devastating area-of-effect necromancy.
              </p>

              {/* FIX 2: Modernized Stats Box (More Glass, Less Solid) */}
              <div className="bg-black/40 p-8 rounded-xl border border-white/10 backdrop-blur-md mb-10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-500">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                
                <StatBar label="Power" value={9} />
                <StatBar label="Mobility" value={4} />
                <StatBar label="Defense" value={10} />
              </div>

              {/* FIX 3: Action Area with CyberButton */}
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Link to="/guardians">
                  {/* Scaled down to 80% (scale-90 on desktop) so it doesn't look gigantic next to the text */}
                  <div className="transform scale-90 origin-left">
                    <CyberButton 
                        text="VIEW FULL ROSTER"
                    />
                  </div>
                </Link>
                <span className="text-xs text-gray-500 font-mono tracking-widest uppercase animate-pulse">
                    // Accessing Database...
                </span>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardiansPreview;