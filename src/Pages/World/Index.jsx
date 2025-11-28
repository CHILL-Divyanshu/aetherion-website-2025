import React, { Suspense, lazy, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import GridBackground from "../../components/ui/GridBackground";

// Lazy load heavy components
const WorldContext = lazy(() => import("../../components/sections/WorldContext"));
const RosterSection = lazy(() => import("../../components/sections/RosterSection"));

// Reusable skeleton loaders
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

const RosterSectionSkeleton = () => (
  <div className="py-20 px-6 lg:px-10">
    <div className="container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-slate-700/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);

// Memoized background layers
const BackgroundLayers = React.memo(() => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <GridBackground />
    <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-transparent to-[#02060c] opacity-90" />
  </div>
));

BackgroundLayers.displayName = "BackgroundLayers";

// Memoized transition divider
const TransitionDivider = React.memo(() => (
  <div className="relative h-24 w-full overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#02060c]" />
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50" />
  </div>
));

TransitionDivider.displayName = "TransitionDivider";

// Memoized motion wrapper for WorldContext
const WorldContextSection = React.memo(() => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    // FIX: Added 'pt-24' (96px) to push content below the fixed Navbar
    className="relative z-10 pt-24"
  >
    <Suspense fallback={<WorldContextSkeleton />}>
      <WorldContext />
    </Suspense>
  </motion.section>
));

WorldContextSection.displayName = "WorldContextSection";

// Memoized motion wrapper for RosterSection
const RosterSectionWrapper = React.memo(() => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative z-10 pb-20"
  >
    <Suspense fallback={<RosterSectionSkeleton />}>
      <RosterSection />
    </Suspense>
  </motion.section>
));

RosterSectionWrapper.displayName = "RosterSectionWrapper";

const WorldIndex = () => {
  // Memoize the main section structure to prevent unnecessary re-renders
  const mainContent = useMemo(
    () => (
      <>
        <WorldContextSection />
        <TransitionDivider />
        <RosterSectionWrapper />
      </>
    ),
    []
  );

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-transparent text-gray-100 overflow-hidden">
        {/* Fixed background - only renders once */}
        <BackgroundLayers />

        {/* Main content with lazy loading */}
        {mainContent}
      </main>
    </>
  );
};

export default WorldIndex;