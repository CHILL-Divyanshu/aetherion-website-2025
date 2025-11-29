import React from "react";
import { motion } from "framer-motion";
// FIX: Adjusted import path. 
// If this file is in 'src/components/sections/', this path points to 'src/components/ui/Button'
import Button from "../../components/ui/Button";

// Ensure you have this image or update the path
const FRACTURE_IMAGE = "/src/assets/images/World/fracture.jpg"; 

const FRACTURE_DATA = {
  title: "The Fracture",
  subtitle: "Sector Zero // Unstable Reality",
  description:
    "The Fracture is where reality itself split under the weight of cosmic imbalance. Shards of energy float in defiance of gravity, and echoes of the ancient war hum through every gust of wind. Only the bravest dare step across its unstable surface.",
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
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-black text-gray-100 border-t border-white/10">
      
      {/* 1. Immersive Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-[#02060c]/80 to-transparent z-10" />
        {/* Fallback background color if image fails */}
        <div className="absolute inset-0 bg-indigo-950/20 z-0" /> 
        
        <img
          src={FRACTURE_IMAGE}
          alt="The Fracture Background"
          className="w-full h-full object-cover opacity-40 blur-sm scale-105"
        />
        
        {/* Floating Particles/Debris Effect */}
        <div className="absolute inset-0 bg-[url('/src/assets/images/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-20 container mx-auto grid lg:grid-cols-2 gap-16 items-center max-w-7xl">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
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
            <Button variant="secondary">
              Scan Area
            </Button>
          </div>
        </motion.div>

        {/* Right: Visual Hologram/Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Decorative Tech Borders */}
          <div className="absolute -inset-4 border border-indigo-500/20 rounded-xl" />
          <div className="absolute -inset-2 border border-indigo-500/40 rounded-lg" />
          
          <div className="relative rounded-lg overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.2)] border border-white/10">
            <img
              src={FRACTURE_IMAGE}
              alt="Fracture Detail"
              className="w-full h-auto object-cover hover:scale-110 transition-transform duration-[10s] ease-linear"
            />
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Fracture;