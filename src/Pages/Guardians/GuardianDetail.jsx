import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import guardians from "../../data/guardians.json";
import Button from "../../components/ui/Button";

// Helper to parse "Name: Description" strings from your JSON
const parseAbility = (abilityString) => {
  const parts = abilityString.split(":");
  return {
    name: parts[0] || "Ability",
    desc: parts.slice(1).join(":").trim() || abilityString,
  };
};

const GuardianDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const guardian = useMemo(() => guardians.find((g) => g.id === id), [id]);
  
  if (!guardian) return <div className="text-white p-20">Guardian Not Found</div>;

  const theme = guardian.theme;

  return (
    <div className="min-h-screen bg-[#050b14] text-white relative overflow-hidden">
      
      {/* 1. Immersive Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/90 to-[#050b14]/40 z-10" />
        <img
          src={guardian.image}
          alt="Background"
          className="w-full h-full object-cover blur-md opacity-40 scale-110"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
        
        {/* Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/guardians")} 
          className="mb-12"
        >
          ← Return to Roster
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Character Visual (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Tech Frame around Image */}
            <div 
              className="relative rounded-xl overflow-hidden border-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              style={{ borderColor: theme.border, boxShadow: `0 0 30px ${theme.primary}40` }}
            >
              <img
                src={guardian.image}
                alt={guardian.name}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Element Badge */}
              <div 
                className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-widest text-black bg-white/90 backdrop-blur"
                style={{ color: theme.primary }}
              >
                // Element: {guardian.element}
              </div>
            </div>

            {/* Power Level Stat Bar */}
            <div className="mt-6 bg-slate-900/50 p-4 border border-white/10 rounded-lg backdrop-blur-sm">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">
                 <span>Power Level</span>
                 <span style={{ color: theme.text }}>{guardian.power}/10</span>
               </div>
               <div className="h-2 w-full bg-black rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${guardian.power * 10}%` }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="h-full relative"
                   style={{ backgroundColor: theme.primary }}
                 >
                   <div className="absolute inset-0 bg-white/30 animate-pulse" />
                 </motion.div>
               </div>
            </div>
          </motion.div>

          {/* RIGHT: Data & Lore (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Block */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-2 text-white opacity-90"
                  style={{ fontFamily: "AetherionV1, sans-serif" }}>
                {guardian.name}
              </h1>
              <h2 className="text-2xl font-bold uppercase tracking-[0.2em]" 
                  style={{ color: theme.primary }}>
                {guardian.title}
              </h2>
            </motion.div>

            {/* Description Card */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="p-6 bg-slate-900/40 border-l-4 backdrop-blur-sm"
               style={{ borderColor: theme.border }}
            >
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                {guardian.description}
              </p>
              <div className="mt-4 flex gap-4 text-xs font-mono text-gray-500 uppercase">
                <span>Faction: <span className="text-white">{guardian.faction}</span></span>
                <span>Role: <span className="text-white">{guardian.role}</span></span>
              </div>
            </motion.div>

            {/* Abilities Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800 pb-2">
                Combat Abilities
              </h3>
              
              <div className="space-y-4">
                {guardian.abilities.map((abilityStr, idx) => {
                  const { name, desc } = parseAbility(abilityStr);
                  
                  return (
                    <div 
                      key={idx} 
                      className="group relative bg-black/40 border border-white/5 p-4 rounded hover:bg-white/5 transition-colors"
                    >
                      {/* Hover Indicator */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-white transition-colors" style={{ backgroundColor: theme.primary }} />
                      
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:translate-x-2 transition-transform">
                        {name}
                      </h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

             {/* Meta Tags (Affinity/Weakness) */}
             <div className="flex gap-6 pt-4 border-t border-white/10">
                <div>
                   <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Affinities</span>
                   <div className="flex gap-2">
                     {guardian.affinity.map(aff => (
                       <span key={aff} className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-500/30">
                         {aff}
                       </span>
                     ))}
                   </div>
                </div>
                <div>
                   <span className="block text-[10px] uppercase text-gray-500 font-bold mb-1">Weakness</span>
                   <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-500/30">
                     {guardian.weakness}
                   </span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianDetail;