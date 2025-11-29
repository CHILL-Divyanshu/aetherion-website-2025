import React, { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";

// Lazy load heavy components to improve performance
const WorldContext = lazy(() => import("../../components/sections/WorldContext"));
const RosterSection = lazy(() => import("../../components/sections/BossRoster"));
const Fracture = lazy(() => import("./Fracture")); 

// Reusable skeleton loaders for smooth loading states
const WorldContextSkeleton = () => (
  <div className="py-32 px-6 lg:px-10">
    <div className="container mx-auto max-w-7xl">
      <div className="text-center mb-20 space-y-4">
        <div className="h-8 w-48 bg-slate-700/50 rounded-full mx-auto animate-pulse" />
        <div className="h-16 w-full max-w-2xl bg-slate-700/50 rounded mx-auto animate-pulse" />
        <div className="h-6 w-full max-w-xl bg-slate-700/50 rounded mx-auto animate-pulse" />
      </div>
      <div className="w-full h-96 bg-slate-700/50 rounded-2xl animate-pulse" />
    </div>
  </div>
);

const FractureSkeleton = () => (
  <div className="w-full h-[80vh] bg-slate-900/20 animate-pulse flex items-center justify-center">
    <div className="text-cyan-500/50 font-mono text-sm tracking-widest">LOADING SECTOR DATA...</div>
  </div>
);

const RosterSectionSkeleton = () => (
  <div className="py-20 px-6 lg:px-10">
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-700/50 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

// Background component to prevent re-renders
const BackgroundLayers = React.memo(() => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-transparent to-[#02060c] opacity-90" />
  </div>
));

BackgroundLayers.displayName = "BackgroundLayers";

const WorldIndex = () => {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-transparent text-gray-100 overflow-hidden">
        {/* Fixed background */}
        <BackgroundLayers />

        {/* 1. Interactive Map Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 pt-24"
        >
          <Suspense fallback={<WorldContextSkeleton />}>
            <WorldContext />
          </Suspense>
        </motion.section>

        {/* 2. Transition Divider */}
        <div className="relative h-24 w-full overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02060c]" />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />
        </div>

        {/* 3. Fracture Section (Implemented Here) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 bg-[#02060c]"
        >
          <Suspense fallback={<FractureSkeleton />}>
             <Fracture />
          </Suspense>
        </motion.div>

        {/* 4. Roster/Defenders Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-20 pb-20 bg-[#02060c]"
        >
          <Suspense fallback={<RosterSectionSkeleton />}>
            <RosterSection />
          </Suspense>
        </motion.section>

      </main>
    </>
  );
};

export default WorldIndex;