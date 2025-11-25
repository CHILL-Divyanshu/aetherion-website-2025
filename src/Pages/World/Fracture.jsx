import React from "react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button"; // Assuming you have this from previous steps
import { useNavigate } from "react-router-dom";

const FRACTURE_DATA = {
  title: "The Fracture",
  subtitle: "Sector Zero // Unstable Reality",
  description:
    "The Fracture is where reality itself split under the weight of cosmic imbalance. Shards of energy float in defiance of gravity, and echoes of the ancient war hum through every gust of wind. Only the bravest dare step across its unstable surface.",
  imageSrc: "/assets/world/fracture.jpg",
};

// Micro-component: Glitch Text Wrapper
const GlitchTitle = ({ text }) => (
  <div className="relative inline-block group cursor-default">
    <h1 className="relative z-10 text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-200 tracking-tighter"
        style={{ fontFamily: "AetherionV1, sans-serif" }}>
      {text}
    </h1>
    {/* Glitch Layers */}
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[3px] transition-all duration-75"
          style={{ fontFamily: "AetherionV1, sans-serif" }}>
      {text}
    </span>
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[3px] transition-all duration-75 delay-75"
          style={{ fontFamily: "AetherionV1, sans-serif" }}>
      {text}
    </span>
  </div>
);

const Fracture = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-gray-100">
      
      {/* 1. Immersive Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={FRACTURE_DATA.imageSrc}
          alt="Background"
          className="w-full h-full object-cover opacity-30 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-[#02060c]/80 to-transparent" />
        
        {/* Floating Particles/Debris Effect */}
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="inline-block px-3 py-1 border border-indigo-500/50 rounded bg-indigo-950/30 backdrop-blur-md">
            <span className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
              ⚠️ Warning: High Radiation
            </span>
          </div>

          <div>
            <GlitchTitle text={FRACTURE_DATA.title} />
            <h2 className="text-xl text-indigo-400 font-mono mt-2 tracking-widest uppercase">
              {FRACTURE_DATA.subtitle}
            </h2>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-indigo-500/30 pl-6 max-w-xl">
            {FRACTURE_DATA.description}
          </p>

          <div className="pt-4">
            <Button onClick={() => navigate('/world')}>
              ← Return to Map
            </Button>
          </div>
        </motion.div>

        {/* Right: Visual Hologram/Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Decorative Tech Borders */}
          <div className="absolute -inset-4 border border-indigo-500/20 rounded-xl" />
          <div className="absolute -inset-2 border border-indigo-500/40 rounded-lg" />
          
          <div className="relative rounded-lg overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)]">
            <img
              src={FRACTURE_DATA.imageSrc}
              alt={FRACTURE_DATA.imageAlt}
              className="w-full h-auto object-cover hover:scale-110 transition-transform duration-[10s] ease-linear"
            />
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Fracture;