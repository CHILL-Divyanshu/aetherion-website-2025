import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Memoized Glitch Text Component
const GlitchText = React.memo(({ text }) => (
  <div className="relative inline-block group">
    <span className="relative z-10 text-white">{text}</span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400/80 opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] transition-all duration-75">
      {text}
    </span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500/80 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[3px] transition-all duration-75 delay-75">
      {text}
    </span>
  </div>
));

GlitchText.displayName = "GlitchText";

// Memoized animation variants
const ANIMATION_VARIANTS = {
  badge: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  },
  title: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, delay: 0.1 },
  },
  tagline: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.8 },
  },
  button: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.6, duration: 0.8 },
  },
};

const HeroSection = React.memo(
  ({ title, tagline, buttonText, link }) => {
    const animationVariants = useMemo(() => ANIMATION_VARIANTS, []);

    return (
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02060c]">
        
        {/* 1. Optimized Background with depth */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08),transparent_70%)]" />
        </div>

        {/* 2. Content Stack - Optimized Hierarchy */}
        <div className="relative z-30 container mx-auto px-6 flex flex-col items-center text-center">
          
          {/* Status Badge */}
          <motion.div 
            {...animationVariants.badge}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-md rounded-full">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-cyan-300 tracking-[0.2em] uppercase">
                System Online v2.0
              </span>
            </div>
          </motion.div>

          {/* Main Title - FIXED: Correct gradient syntax & visible colors */}
          <motion.h1 
            {...animationVariants.title}
            className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]"
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            <GlitchText text="FORGE YOUR" />
            <br />
            <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">
              LEGEND
            </span>
          </motion.h1>

          {/* Readable Description - Better contrast */}
          <motion.p 
            {...animationVariants.tagline}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {tagline || "Explore a world fractured by celestial power. Command the Void, master the Elements, and restore the balance."}
          </motion.p>

          {/* Strong CTA Button */}
          <motion.div 
            {...animationVariants.button}
          >
            <Link
              to={link || "/play"}
              className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-cyan-600 rounded-lg transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] overflow-hidden group"
            >
              {/* Hover ripple effect */}
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center gap-3">
                {buttonText || "INITIATE PROTOCOL"}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
        
        {/* Bottom Fade to merge with next section */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#02060c] to-transparent z-20 pointer-events-none" />
      </header>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;