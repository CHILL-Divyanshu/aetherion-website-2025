import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GuardianCard from "../../components/ui/GuardianCard";
import guardiansData from "../../data/guardians.json";

// Extract unique roles for the filter
const ROLES = ["All", "Tank", "DPS", "Support", "Assassin"];

const GuardiansIndex = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  // Filter Logic
  const filteredGuardians = useMemo(() => {
    if (activeFilter === "All") return guardiansData;
    // Simple string matching for roles like "Tank / Protector"
    return guardiansData.filter((g) => g.role.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section className="min-h-screen py-24 px-6 bg-[#02060c] relative overflow-hidden text-gray-100">
      
      {/* 1. Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-black to-transparent z-10" />

      <div className="relative z-20 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* FIX: Removed text-transparent and bg-clip-text. Used solid white with a strong cyan text-shadow glow. */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            The <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Vanguard</span>
          </h1>
          <p className="text-cyan-500 font-mono text-sm uppercase tracking-[0.3em]">
            Select your Guardian
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`
                px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 border
                ${activeFilter === role 
                  ? "bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                  : "bg-black/50 border-white/10 text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400"}
              `}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          onMouseLeave={() => setHoveredId(null)}
        >
          <AnimatePresence mode="popLayout">
            {filteredGuardians.map((guardian) => {
              const isDimmed = hoveredId && hoveredId !== guardian.id;
              
              return (
                <motion.div
                  key={guardian.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isDimmed ? 0.3 : 1, scale: isDimmed ? 0.95 : 1, filter: isDimmed ? "grayscale(100%)" : "grayscale(0%)" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredId(guardian.id)}
                  className="relative group"
                >
                  <GuardianCard 
                    {...guardian} 
                    // Pass specific colors for card styling if needed
                    elementColor={guardian.theme?.primary}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredGuardians.length === 0 && (
          <div className="text-center py-20 text-gray-600 font-mono uppercase">
            // No Guardians Found matching protocol
          </div>
        )}
      </div>
    </section>
  );
};

export default GuardiansIndex;