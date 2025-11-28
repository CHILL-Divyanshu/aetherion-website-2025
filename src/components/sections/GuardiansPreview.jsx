import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button"; // Standard Button

const Corner = ({ className }) => (
  <svg className={`absolute w-6 h-6 text-cyan-500 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M2 22V2H22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const StatBar = ({ label, value }) => (
  <div className="mb-4 group">
    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
      <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">{label}</span>
      <span className="text-cyan-400 font-mono">{value}/10</span>
    </div>
    <div className="h-2 w-full bg-slate-800/50 rounded-sm overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value * 10}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-cyan-500 relative"
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      </motion.div>
    </div>
  </div>
);

const GuardiansPreview = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Character Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-900/50 shadow-2xl">
               <Corner className="top-0 left-0" />
               <Corner className="top-0 right-0 rotate-90" />
               <Corner className="bottom-0 left-0 -rotate-90" />
               <Corner className="bottom-0 right-0 rotate-180" />
               
               <img
                src="/src/assets/images/guardians/valerius.jpg" 
                alt="Valerius"
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-cyan-500/30">
                    Threat Level: Extreme
                 </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Data/Stats */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-px w-8 bg-red-500" />
                 <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">Class: Juggernaut</span>
              </div>
              
              {/* FIXED FONT: AetherionV1 */}
              <h2 className="text-6xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-2" 
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                Valerius
              </h2>
              <h3 className="text-3xl text-cyan-400 font-bold uppercase tracking-widest mb-6"
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                The Bone King
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-white/10 pl-6 text-lg">
                 Commands legions of skeletal warriors forged from remnants of shattered realms. High defense, devastating area-of-effect attacks.
              </p>

              {/* Dynamic Stats Box */}
              <div className="bg-slate-900/40 p-8 rounded-lg border border-white/5 backdrop-blur-sm mb-10 relative">
                <StatBar label="Power" value={9} />
                <StatBar label="Mobility" value={4} />
                <StatBar label="Defense" value={10} />
              </div>

              {/* FIXED LINK & BUTTON STYLE */}
              <Link to="/guardians">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-4">
                   View Full Roster
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardiansPreview;