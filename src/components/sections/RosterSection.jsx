import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuardianCard from "../ui/GuardianCard";

// Enhanced Data with Color Themes
const GUARDIANS = [
  {
    id: "aetherion",
    name: "Aetherion",
    role: "Celestial Guardian",
    description: "Embodies the energy of stars and cosmic balance.",
    image: "/assets/guardians/aetherion.png",
    themeColor: "from-blue-600/20 to-cyan-400/20", // Custom glow for background
  },
  {
    id: "nyxara",
    name: "Nyxara",
    role: "Shadow Empress",
    description: "Ruler of the twilight realm, manipulating illusions.",
    image: "/assets/guardians/nyxara.png",
    themeColor: "from-purple-900/30 to-fuchsia-600/20",
  },
  {
    id: "kaelion",
    name: "Kaelion",
    role: "Infernal Sentinel",
    description: "Forged in eternal flame, wielding molten fury.",
    image: "/assets/guardians/kaelion.png",
    themeColor: "from-orange-700/20 to-red-600/20",
  },
  {
    id: "lunaris",
    name: "Lunaris",
    role: "Ethereal Watcher",
    description: "Channels the serenity of the moon to heal lost souls.",
    image: "/assets/guardians/lunaris.png",
    themeColor: "from-indigo-900/30 to-slate-600/20",
  },
];

const RosterSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Find active theme or default to gray
  const activeTheme = GUARDIANS.find(g => g.id === hoveredId)?.themeColor || "from-gray-900 to-black";

  return (
    <section id="roster" className="relative py-32 bg-black text-white overflow-hidden transition-colors duration-700">
      
      {/* --- DYNAMIC BACKGROUND LAYER --- */}
      {/* This creates a large glowing orb behind the section that changes color */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${activeTheme} opacity-40 transition-all duration-700 blur-[150px]`} 
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-500 font-bold tracking-[0.3em] uppercase text-sm border border-cyan-500/20 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md"
          >
            Assemble Your Squad
          </motion.span>
          
          <motion.h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "AetherionV1, sans-serif", textShadow: "0 0 50px rgba(255,255,255,0.1)" }}
          >
            The Vanguard <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Roster
            </span>
          </motion.h2>
        </div>

        {/* --- INTERACTIVE GRID --- */}
        <div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 perspective-1000"
          onMouseLeave={() => setHoveredId(null)} // Reset when leaving grid
        >
          {GUARDIANS.map((guardian, index) => {
            const isHovered = hoveredId === guardian.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <motion.div
                key={guardian.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                
                // --- HOVER LOGIC ---
                onMouseEnter={() => setHoveredId(guardian.id)}
                className={`relative transition-all duration-500 ${isDimmed ? "opacity-40 scale-95 blur-[1px]" : "opacity-100 scale-100"}`}
              >
                {/* Note: Assuming GuardianCard accepts standard props. 
                   We wrap it to add the "Focus" effect handled by the parent.
                */}
                <div className={`relative group h-full rounded-2xl transition-all duration-300 ${isHovered ? "z-20 -translate-y-4 shadow-2xl shadow-cyan-500/20" : "z-10"}`}>
                   <GuardianCard {...guardian} />
                   
                   {/* Selection Indicator Ring (Only visible on hover) */}
                   {isHovered && (
                     <motion.div 
                       layoutId="selection-ring"
                       className="absolute -inset-1 border-2 border-cyan-500/50 rounded-2xl pointer-events-none"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.2 }}
                     />
                   )}
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                Select a Guardian to view details
            </p>
        </div>
      </div>
    </section>
  );
};

export default RosterSection;