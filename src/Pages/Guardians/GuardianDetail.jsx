import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import guardians from "../../data/guardians.json";
import bossData from "../../data/boss-roster.json";
import Button from "../../components/ui/Button";

// --- Helpers ---
const parseAbility = (abilityString) => {
  const parts = abilityString.split(":");
  return {
    name: parts[0] ? parts[0].trim() : "Ability",
    desc: parts.length > 1 ? parts.slice(1).join(":").trim() : "Combat data unavailable.",
  };
};

const getBossTheme = (elementArray) => {
  const primaryElem = elementArray && elementArray.length > 0 ? elementArray[0].toLowerCase() : "void";
  switch (primaryElem) {
    case "fire": return { primary: "#ef4444", border: "#b91c1c", text: "#fca5a5", bgGlow: "rgba(239, 68, 68, 0.2)" };
    case "earth": return { primary: "#10b981", border: "#047857", text: "#6ee7b7", bgGlow: "rgba(16, 185, 129, 0.2)" };
    case "water": return { primary: "#3b82f6", border: "#1d4ed8", text: "#93c5fd", bgGlow: "rgba(59, 130, 246, 0.2)" };
    case "arcane": return { primary: "#d946ef", border: "#a21caf", text: "#f0abfc", bgGlow: "rgba(217, 70, 239, 0.2)" };
    case "void": return { primary: "#6366f1", border: "#4338ca", text: "#a5b4fc", bgGlow: "rgba(99, 102, 241, 0.2)" };
    default: return { primary: "#94a3b8", border: "#475569", text: "#cbd5e1", bgGlow: "rgba(148, 163, 184, 0.2)" };
  }
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const GuardianDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- Data Retrieval Logic ---
  const entity = useMemo(() => {
    const guardianFound = guardians.find((g) => g.id === id);
    if (guardianFound) {
      const enhancedTheme = {
          ...guardianFound.theme,
          bgGlow: `${guardianFound.theme.primary}33`
      };
      return { ...guardianFound, theme: enhancedTheme, type: 'guardian' };
    }

    if (bossData && bossData.bosses) {
      const bossFound = bossData.bosses.find((b) => b.id === id);
      if (bossFound) {
        const bossTheme = getBossTheme(bossFound.element);
        return {
          id: bossFound.id,
          name: bossFound.name.split(",")[0].trim(),
          title: bossFound.name.split(",")[1]?.trim() || "Raid Boss",
          description: bossFound.large_description || bossFound.short_description,
          image: `/src/assets/images/Bosses/${bossFound.id}.jpg`,
          faction: "Hostile Entity",
          role: "Raid Boss",
          power: bossFound.power_level,
          element: bossFound.element[0],
          abilities: bossFound.abilities,
          affinity: bossFound.element,
          weakness: bossFound.weakness ? bossFound.weakness[0] : "None",
          theme: bossTheme,
          type: 'boss'
        };
      }
    }
    return null;
  }, [id]);
  
  if (!entity) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-red-500 tracking-widest">CRITICAL ERROR</h1>
            <p className="text-gray-400 font-mono">Entity ID "{id}" not found in database.</p>
            <Button onClick={() => navigate(-1)}>Return to Roster</Button>
        </div>
    </div>
  );

  const theme = entity.theme;

  return (
    <div className="min-h-screen bg-[#02060c] text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* --- Dynamic Background Ambience --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 mix-blend-screen"
             style={{ backgroundColor: theme.primary }} />
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-[#02060c]/80 to-[#02060c] z-10" />
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          src={entity.image}
          alt="Background Visual"
          className="w-full h-full object-cover blur-2xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-20"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6 py-20 lg:py-24 max-w-7xl"
      >
        
        {/* --- Navigation --- */}
        <motion.div variants={itemVariants} className="mb-10">
             <Button variant="ghost" onClick={() => navigate(-1)} icon="←" className="hover:text-white">
               Back to Roster
             </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN (Visuals) ================= */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative group z-20">
            
            {/* --- Tech Frame Image Container (9:16 Ratio) --- */}
            <div 
              className="relative rounded-xl overflow-hidden border-2 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-[9/16]"
              style={{ borderColor: theme.border, boxShadow: `0 0 30px -10px ${theme.bgGlow}` }}
            >
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.2)_3px)] bg-[size:100%_4px] z-10 pointer-events-none opacity-40 mix-blend-overlay"></div>
              
              <img
                src={entity.image}
                alt={entity.name}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Holographic Element Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] bg-[#02060c]/90 backdrop-blur-md border border-white/20 rounded-sm shadow-lg z-20 flex items-center gap-2"
                style={{ color: theme.primary, borderColor: theme.primary }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }}></span>
                {entity.element || entity.affinity[0]}
              </div>

              {/* Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent opacity-90 z-10" />

              {/* --- Synchro Level (Integrated Inside Image) --- */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-black/60 backdrop-blur-md border-t border-white/10">
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Synchro Level</span>
                   <div className="text-2xl font-black italic leading-none" style={{ color: theme.text }}>
                      {entity.power}<span className="text-sm text-gray-500">/10</span>
                   </div>
                 </div>
                 {/* Segmented Power Bar */}
                 <div className="h-2 w-full bg-black/50 rounded-full flex gap-1">
                   {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="h-full flex-1 rounded-sm transition-all duration-500"
                        style={{ backgroundColor: i < entity.power ? theme.primary : '#1f2937' }}
                      />
                   ))}
                 </div>
              </div>

            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN (Data & Lore) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* --- Header Block --- */}
            <motion.div variants={itemVariants} className="relative mt-4">
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-3" 
                  style={{ color: theme.primary }}>
                <span className="h-[2px] w-6 inline-block" style={{ backgroundColor: theme.primary }}></span>
                {entity.title}
              </h2>
              {/* Reduced Name Size */}
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6 text-white"
                  style={{ 
                      fontFamily: "AetherionV1, sans-serif", 
                      textShadow: `0 0 30px ${theme.bgGlow}`
                  }}>
                {entity.name}
              </h1>

              {/* Faction/Role Pills */}
              <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-wider">
                <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm flex items-center gap-2">
                    <span className="text-gray-500">Faction:</span> 
                    <span className="font-bold text-gray-200">{entity.faction}</span>
                </div>
                <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm flex items-center gap-2">
                    <span className="text-gray-500">Role:</span> 
                    <span className="font-bold text-gray-200">{entity.role}</span>
                </div>
              </div>
            </motion.div>

            {/* --- Holographic Description Panel --- */}
            <motion.div 
               variants={itemVariants}
               className="p-6 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(0,0,0,0.2))] border-l-2 backdrop-blur-md rounded-r-lg relative overflow-hidden"
               style={{ borderColor: theme.primary }}
            >
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light relative z-10">
                {entity.description}
              </p>
            </motion.div>

            {/* --- Data Grid: Abilities & Stats --- */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1: Combat Protocols */}
                <div className="space-y-6">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 pb-2 border-b border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }}></span>
                        Combat Protocols
                      </h3>
                    
                    <div className="space-y-3">
                        {entity.abilities.map((abilityStr, idx) => {
                        const { name, desc } = parseAbility(abilityStr);
                        return (
                            <motion.div 
                            key={idx} 
                            whileHover={{ scale: 1.02, x: 2 }}
                            className="group relative bg-[#080c14] border border-white/10 p-4 rounded-md transition-all duration-300 overflow-hidden"
                            >
                                {/* Permanent Side Strip */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5 group-hover:brightness-150" 
                                     style={{ backgroundColor: theme.primary }} />
                                
                                <div className="pl-3 relative z-10">
                                    <h4 className="text-sm font-black uppercase tracking-wider text-white mb-1 group-hover:text-cyan-100 transition-colors">
                                        {name}
                                    </h4>
                                    <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                        })}
                    </div>
                </div>

                {/* Column 2: System Diagnostics */}
                <div className="space-y-6">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 pb-2 border-b border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        System Diagnostics
                    </h3>

                     {/* Affinities */}
                    <div className="bg-blue-950/10 border border-blue-900/30 p-4 rounded-md backdrop-blur-sm">
                        <span className="block text-[10px] uppercase text-blue-400 font-bold tracking-widest mb-2">Elemental Affinity</span>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(entity.affinity) ? entity.affinity.map(aff => (
                            <span key={aff} className="px-2 py-1 bg-blue-900/40 text-blue-200 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-blue-500/30">
                                {aff}
                            </span>
                            )) : (
                                <span className="text-gray-500 text-xs">None detected.</span>
                            )}
                        </div>
                    </div>

                    {/* Critical Weakness */}
                    <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-md backdrop-blur-sm relative overflow-hidden">
                        <span className="block text-[10px] uppercase text-red-500 font-bold tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                            Critical Weakness
                        </span>
                        <span className="inline-block px-3 py-1 bg-red-600/10 text-red-200 font-black uppercase tracking-widest text-xs rounded-sm border border-red-900/50">
                            {entity.weakness || "Unknown"}
                        </span>
                    </div>
                </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GuardianDetail;