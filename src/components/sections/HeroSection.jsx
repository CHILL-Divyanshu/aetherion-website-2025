import React, { useCallback, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- IMPORTS ---
import heroBg from "../../assets/images/hero.jpg"; 
import CyberButton, { PlayIcon } from "../ui/CyberButton";

// --- GLITCH TEXT COMPONENT ---
const GlitchText = React.memo(({ text }) => {
  return (
    <div className="relative inline-block">
      {/* Main Text */}
      <span className="relative z-10 text-white">{text}</span>

      {/* Cyan Ghost */}
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400/80 select-none"
        initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
        animate={{
          opacity: [0, 0.3, 0.8, 0.2, 0],
          x: [0, -4, -10, -3, 0],
          y: [0, -1, 1, -1, 0],
          scale: [1, 1.02, 0.98, 1.01, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.15, 0.25, 0.4, 1],
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.span>

      {/* Red Ghost */}
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-red-500/80 select-none"
        initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
        animate={{
          opacity: [0, 0.4, 0.9, 0.3, 0],
          x: [0, 5, 12, 4, 0],
          y: [0, 1, -1, 1, 0],
          scale: [1, 1.03, 0.97, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.12, 0.22, 0.38, 1],
          delay: 0.2,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.span>
    </div>
  );
});

GlitchText.displayName = "GlitchText";

// --- ANIMATION VARIANTS ---
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

const HeroSection = React.memo(({ title, tagline, buttonText, link }) => {
  const animationVariants = useMemo(() => ANIMATION_VARIANTS, []);
  const navigate = useNavigate();
  
  // --- SUBTLE PARALLAX TILT LOGIC ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Increased stiffness/damping for heavier, smoother feel
  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  // CHANGE: Reduced range from 7deg to 2deg for subtle movement
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXPos);
    y.set(mouseYPos);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <header 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#02060c] perspective-1000"
    >
      
      {/* 1. Immersive Background Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#02060c]/80 to-[#02060c]" />
        
        {/* Ambient Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1),transparent_70%)] animate-pulse-slow mix-blend-screen" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500 rounded-full blur-[2px] animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-500 rounded-full blur-[4px] animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full blur-[1px] animate-ping-slow" />
      </div>

      {/* 2. Content Stack with Subtle 3D Tilt */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-30 container mx-auto px-6 flex flex-col items-center text-center"
      >
        
        {/* Status Badge */}
        <motion.div 
          {...animationVariants.badge}
          className="mb-12 cursor-default"
          // Reduced Z-depth for subtlety (was 30px)
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="group relative inline-flex items-center gap-3 px-5 py-2 border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md rounded-full transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-900/60 hover:px-8 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-bold text-cyan-300 tracking-[0.25em] uppercase group-hover:text-white transition-colors">
              System Online v2.0
            </span>
            <div className="absolute inset-0 rounded-full bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>

        {/* --- TITLE SECTION --- */}
        <motion.h1 
          {...animationVariants.title}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]"
          // Reduced Z-depth (was 60px)
          style={{ fontFamily: "AetherionV1, sans-serif", transform: "translateZ(40px)" }}
        >
          <GlitchText text="FORGE YOUR" />
          <br />
          <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">
            LEGEND
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          {...animationVariants.tagline}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-14 leading-relaxed font-light tracking-wide"
          // Reduced Z-depth (was 40px)
          style={{ transform: "translateZ(30px)" }}
        >
          {tagline || "Explore a world fractured by celestial power. Command the Void, master the Elements, and restore the balance."}
        </motion.p>

        {/* --- BUTTON LOGIC SPLIT --- */}
        <motion.div 
          {...animationVariants.button}
          // Reduced Z-depth (was 50px)
          style={{ transform: "translateZ(35px)" }}
          className="flex justify-center"
        >
          
          {/* 1. DESKTOP: Default CyberButton -> /world */}
          <div className="hidden lg:block">
            <CyberButton 
              text="INITIATE PROTOCOL"
              onClick={() => navigate('/world')}
            />
          </div>

          {/* 2. MOBILE/TABLET: Play Variant CyberButton -> /play */}
          <div className="lg:hidden transform scale-90">
            <CyberButton 
               variant="play"
               text="PLAY NOW"
               icon={PlayIcon}
               onClick={() => navigate('/play')}
            />
          </div>

        </motion.div>
      </motion.div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#02060c] to-transparent z-20 pointer-events-none" />

      {/* Styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </header>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;