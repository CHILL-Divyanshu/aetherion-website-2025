import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import WorldContext from "../../components/sections/WorldContext";
import RosterSection from "../../components/sections/RosterSection"; // Or rename to RegionDetails if appropriate
import GridBackground from "../../components/ui/GridBackground"; // Assuming this exists

const WorldIndex = () => {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-transparent text-gray-100 overflow-hidden">
        
        {/* 1. Global Background (Unified Atmosphere) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
           <GridBackground />
           <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-transparent to-[#02060c] opacity-90" />
        </div>

        {/* 2. Interactive Map Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <WorldContext />
        </motion.section>

        {/* 3. Transition Divider */}
        <div className="relative h-24 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02060c]" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />
        </div>

        {/* 4. Secondary Content (Roster/Regions) */}
        {/* We use Framer Motion 'whileInView' instead of custom hooks */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pb-20"
        >
          {/* NOTE: Ideally, this section on the "World" page should show 
             "Guardians by Region" or "Lore Entries". 
             If using RosterSection here, ensure it makes sense contextually.
          */}
          <RosterSection />
        </motion.section>

      </main>
    </>
  );
};

export default WorldIndex;