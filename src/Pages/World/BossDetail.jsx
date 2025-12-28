import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import bossData from "../../data/boss-roster.json"; // Adjust path if needed
import Button from "../../components/ui/Button";

// --- DYNAMIC ASSET LOADING ---
// Fix: Load images via Vite's glob import so they are bundled in production.
const bossAssets = import.meta.glob('../../assets/images/Bosses/*.{jpg,png,webp}', { 
  eager: true, 
  import: 'default' 
});

const getBossImage = (id) => {
  const path = Object.keys(bossAssets).find(key => key.includes(`/${id}.`));
  return path ? bossAssets[path] : null;
};

const getTheme = (elementArray) => {
  const primary = elementArray[0].toLowerCase();
  switch (primary) {
    case "fire": return { primary: "#ef4444", secondary: "#7f1d1d", glow: "rgba(239, 68, 68, 0.5)" };
    case "earth": return { primary: "#10b981", secondary: "#064e3b", glow: "rgba(16, 185, 129, 0.5)" };
    case "water": return { primary: "#3b82f6", secondary: "#1e3a8a", glow: "rgba(59, 130, 246, 0.5)" };
    case "arcane": return { primary: "#d946ef", secondary: "#701a75", glow: "rgba(217, 70, 239, 0.5)" };
    case "void": return { primary: "#6366f1", secondary: "#312e81", glow: "rgba(99, 102, 241, 0.5)" };
    default: return { primary: "#94a3b8", secondary: "#334155", glow: "rgba(148, 163, 184, 0.5)" };
  }
};

const BossDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Find boss data
  const boss = useMemo(() => bossData.bosses.find((b) => b.id === id), [id]);

  if (!boss) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
      <h1 className="text-4xl font-black text-red-600 tracking-widest">THREAT NOT FOUND</h1>
      <Button onClick={() => navigate("/world")}>Return to Intel</Button>
    </div>
  );

  const theme = getTheme(boss.element);
  const imagePath = getBossImage(boss.id);

  return (
    <div className="min-h-screen bg-[#02060c] text-white relative overflow-hidden font-sans selection:bg-red-500/30">
      
      {/* 1. Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-[#02060c]/90 to-[#02060c] z-10" />
         <motion.img 
            src={imagePath} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 blur-2xl scale-125" 
            style={{ y: backgroundY }}
          />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10 lg:py-16 max-w-7xl">
        
        {/* Nav Button */}
        <div className="mt-10 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} icon="←">
            Disengage
          </Button>
        </div>

        {/* 2. Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN (Visuals & Header) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-8">
             
             {/* A. HEADER */}
             <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="border-l-4 pl-6 py-2"
                style={{ borderColor: theme.primary }}
              >
                {/* Element Tags */}
                <div className="flex gap-2 mb-3">
                  {boss.element.map(el => (
                    <span key={el} className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 bg-white/5 border border-white/10 rounded-sm" 
                          style={{ color: theme.primary, borderColor: `${theme.primary}40` }}>
                      {el}
                    </span>
                  ))}
                </div>
                
                {/* Boss Name */}
                <h1
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-2"
                style={{
                    fontFamily: "AetherionV1, sans-serif",
                    background: `linear-gradient(90deg, ${boss.titleGradient.start}, ${boss.titleGradient.middle}, ${boss.titleGradient.end})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text", 
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                    textShadow: `0 0 50px ${theme.glow}`
                }}
                >
                {boss.name.split(",")[0]}
                </h1>

                {/* Title */}
                <h2 className="text-lg md:text-xl text-gray-400 uppercase tracking-[0.2em] font-bold">
                  {boss.name.split(",")[1] || "The Raid Boss"}
                </h2>
             </motion.div>

             {/* B. IMAGE CARD */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl group aspect-[9/16] bg-slate-950" 
                style={{ boxShadow: `0 0 40px -10px ${theme.glow}` }}
             >
                <img 
                  src={imagePath} 
                  alt={boss.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                
                {/* Image Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 border-2 border-white/5 rounded-lg" />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-green-950/10 border border-green-900/30 p-4 rounded-lg backdrop-blur-sm">
                   <div className="flex items-end justify-between border-t border-white/30 pt-4">
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Threat Level</div>
                        <div className="text-5xl font-black leading-none" style={{ color: theme.primary }}>
                          {boss.power_level}<span className="text-lg text-gray-400">/10</span>
                        </div>
                      </div>
                      <div className="mb-1">
                         <div className="flex gap-1">
                           {[...Array(10)].map((_, i) => (
                             <div key={i} className={`w-1 h-3 rounded-sm ${i < boss.power_level ? 'bg-current' : 'bg-gray-800'}`} style={{ color: i < boss.power_level ? theme.primary : undefined }} />
                           ))}
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* C. WEAKNESSES CARD */}
             <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-lg backdrop-blur-sm">
               <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 Tactical Vulnerabilities
               </h3>
               <ul className="space-y-3">
                 {boss.weakness.map((w, i) => (
                   <li key={i} className="flex items-start gap-3 text-sm text-red-200/70 font-mono">
                     <span className="mt-1.5 text-[10px] opacity-50">0{i+1} //</span>
                     {w}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* ================= RIGHT COLUMN (Content & Lore) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-10 pt-2">
            
            {/* A. DESCRIPTION */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-7 rounded-xl backdrop-blur-md"
            >
              <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-600" /> Entity Profile
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-normal">
                {boss.large_description}
              </p>
            </motion.div>

            {/* B. ABILITIES */}
            <div>
              <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-600" /> Signature Abilities
              </h3>
              <div className="grid gap-4">
                 {boss.abilities.map((ability, idx) => (
                   <div key={idx} className="group bg-slate-900/40 border border-white/5 hover:border-white/20 p-5 rounded-lg transition-all duration-300 hover:translate-x-2">
                     <div className="flex items-center gap-4">
                       <div className="text-2xl font-black opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: theme.primary }}>0{idx + 1}</div>
                       <div>
                         <span className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500 group-hover:text-white transition-colors">Ability Protocol</span>
                         <span className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{ability}</span>
                       </div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* C. MINIONS */}
            <div>
               <h3 className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                 <span className="w-8 h-[1px] bg-gray-600" /> Minion Support
               </h3>
               <div className="grid gap-6">
                 {boss.minions.map((minion) => (
                   <div key={minion.id} className="relative overflow-hidden bg-black/40 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors group">
                      <div className="absolute top-6 right-2 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                         <div className="text-6xl font-black">{minion.power_level}</div>
                      </div>
                      
                      <div className="relative z-10">   
                        {/* Header */}
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{minion.name}</h4>
                           <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white">PWR {minion.power_level}</span>
                        </div>
                        
                        {/* Desc */}
                        <p className="text-sm text-gray-400 mb-5 max-w-lg">{minion.description}</p>
                        
                        {/* Abilities */}
                        <div className="mb-4">
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 block">Abilities</span>
                          <div className="flex flex-wrap gap-2">
                            {minion.abilities.map((ab, i) => (
                              <span key={i} className="px-3 py-1 bg-slate-800/50 border border-white/5 text-slate-300 text-[10px] uppercase font-bold tracking-wider rounded-full">
                                {ab}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* NEW: Minion Weaknesses */}
                        {minion.weakness && minion.weakness.length > 0 && (
                          <div className="pt-4 border-t border-white/10">
                             <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest mb-2 block flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Vulnerabilities
                             </span>
                             <div className="flex flex-wrap gap-2">
                               {minion.weakness.map((weak, i) => (
                                 <span key={i} className="px-2 py-1 bg-red-950/20 border border-red-900/30 text-red-300/80 text-[10px] font-mono rounded-sm">
                                   {weak}
                                 </span>
                               ))}
                             </div>
                          </div>
                        )}
                      </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BossDetail;