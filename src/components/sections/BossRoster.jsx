import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GuardianCard from "../ui/GuardianCard"; 
import bossData from "../../data/boss-roster.json"; // Ensure this path matches your folder structure

// --- DYNAMIC ASSET LOADING ---
// This ensures images are bundled correctly in production by Vite.
// It loads all images from the Bosses folder eagerly.
const bossAssets = import.meta.glob('../../assets/images/Bosses/*.{jpg,png,webp}', { 
  eager: true, 
  import: 'default' 
});

const getBossImage = (id) => {
  // Find the path that contains the boss ID (e.g., "path/to/1.jpg")
  const path = Object.keys(bossAssets).find(key => key.includes(`/${id}.`));
  return path ? bossAssets[path] : null;
};

// Helper to determine theme color based on the primary element
const getThemeColor = (elements) => {
  const primary = elements[0].toLowerCase();
  switch (primary) {
    case "fire":
      return "from-orange-700/20 to-red-600/20";
    case "earth":
      return "from-emerald-900/30 to-green-600/20";
    case "water":
      return "from-blue-900/30 to-cyan-600/20";
    case "arcane":
      return "from-fuchsia-900/30 to-purple-600/20";
    case "void":
      return "from-indigo-950/40 to-slate-800/30";
    default:
      return "from-gray-900 to-black";
  }
};

const BossRoster = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Transform JSON data into the format GuardianCard expects
  const bosses = useMemo(() => {
    return bossData.bosses.map((boss) => ({
      id: boss.id,
      // Split "Name, the Title" into separate parts
      name: boss.name.includes(",") ? boss.name.split(",")[0].trim() : boss.name,
      title: boss.name.includes(",") ? boss.name.split(",")[1].trim() : "Raid Boss",
      role: "Zone Boss", // Static role or derived from data
      description: boss.short_description,
      // Assumption: Images are stored with IDs as filenames
      image: getBossImage(boss.id), 
      element: boss.element[0], // Take primary element
      power: boss.power_level,
      themeColor: getThemeColor(boss.element),
    }));
  }, []);

  const activeTheme = bosses.find((b) => b.id === hoveredId)?.themeColor || "from-red-900/10 to-black";

  return (
    <section id="boss-roster" className="relative py-15 bg-black text-white overflow-hidden transition-colors duration-700">
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeTheme} opacity-40 transition-all duration-700 blur-[100px]`} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block py-1 px-3 border border-red-500/30 rounded-full bg-red-900/10 text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md"
          >
            Threat Level: Extreme
          </motion.span>
          <motion.h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "AetherionV1, sans-serif", textShadow: "0 0 50px rgba(220, 38, 38, 0.2)" }}
          >
            The <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Colossals</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 perspective-1000" onMouseLeave={() => setHoveredId(null)}>
          {bosses.map((boss, index) => {
            const isHovered = hoveredId === boss.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <motion.div
                key={boss.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(boss.id)}
                className={`relative transition-all duration-500 ${isDimmed ? "opacity-40 scale-95 blur-[1px]" : "opacity-100 scale-100"}`}
              >
                <div className={`relative group h-full transition-all duration-300 ${isHovered ? "z-20 -translate-y-4 shadow-2xl shadow-red-500/20" : "z-10"}`}>
                   {/* Reusing GuardianCard for Boss Layout */}
                   <GuardianCard {...boss} basePath="/bosses" />
                   
                   {/* Selection Ring Animation */}
                   {isHovered && (
                     <motion.div 
                       layoutId="selection-ring"
                       className="absolute -inset-1 border-2 border-red-500/50 pointer-events-none"
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
        
        <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm uppercase tracking-widest animate-pulse">
                Select a Boss to view intel
            </p>
        </div>
      </div>
    </section>
  );
};

export default BossRoster;