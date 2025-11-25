import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

// Micro-component for Tech Corners
const Corner = ({ className }) => (
  <svg className={`absolute w-6 h-6 text-cyan-500 ${className}`} viewBox="0 0 24 24" fill="none">
    <path d="M2 22V2H22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const StatBar = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-1">
      <span className="text-gray-400">{label}</span>
      <span className="text-cyan-400">{value}/10</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${value * 10}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
      />
    </div>
  </div>
);

const GuardiansPreview = () => {
  return (
    <section className="relative py-24 bg-[#050b14] overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Character Visual (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-900/50">
               {/* Tech Corners */}
               <Corner className="top-0 left-0" />
               <Corner className="top-0 right-0 rotate-90" />
               <Corner className="bottom-0 left-0 -rotate-90" />
               <Corner className="bottom-0 right-0 rotate-180" />
               
               <img
                src="/src/assets/images/guardians/valerius.jpg" // Check path
                alt="Valerius"
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* RIGHT: Data/Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 mb-4 border border-red-500/30 bg-red-500/10 rounded text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">
                Class: Juggernaut
              </div>
              <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none mb-2" style={{ fontFamily: "AetherionV1, sans-serif" }}>
                Valerius
              </h2>
              <h3 className="text-2xl text-cyan-400 font-bold uppercase tracking-widest mb-6">The Bone King</h3>
              
              <p className="text-gray-400 leading-relaxed mb-8 border-l-2 border-slate-700 pl-4">
                 Commands legions of skeletal warriors forged from remnants of shattered realms. High defense, devastating area-of-effect attacks.
              </p>

              {/* Dynamic Stats */}
              <div className="bg-slate-900/50 p-6 rounded-lg border border-white/5 backdrop-blur-sm mb-8">
                <StatBar label="Power" value={9} />
                <StatBar label="Mobility" value={4} />
                <StatBar label="Defense" value={10} />
              </div>

              <Button variant="primary" className="w-full sm:w-auto">
                 View Full Roster
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardiansPreview;