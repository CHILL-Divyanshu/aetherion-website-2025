import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import WorldMapImage from "../../assets/images/World/Aetherion-World-v2.jpg";
import { Map, Compass, Crosshair } from "lucide-react";

const WorldPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-[#02060c]">
      {/* --- Background FX --- */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/src/assets/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          {/* Subtle hexagonal grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#080c14_1px,transparent_1px),linear-gradient(to_bottom,#080c14_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] bg-cyan-900/20 blur-[120px] rounded-full"></div>
          {/* Gradient Fade to blend with adjacent sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#02060c] via-transparent to-[#02060c]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* --- Section Header --- */}
          <motion.div variants={itemVariants} className="text-center mb-16 relative">
            {/* Decorative tech separator */}
            <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-cyan-500"></div>
                <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 mb-4"
                style={{ fontFamily: "AetherionV1, sans-serif", textShadow: "0 0 30px rgba(72, 202, 228, 0.3)" }}>
              Explore the <br className="md:hidden" /> Fractured World
            </h2>
            <p className="text-lg text-cyan-200/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Navigate the shattered remnants of Aetherion. From the neon-soaked Crystal Spires to the void-corrupted sunken cities, chart your path through a universe in chaos.
            </p>
          </motion.div>

          {/* --- The Holo-Terminal Container --- */}
          <motion.div variants={itemVariants} className="relative">
            {/* Outer Tech Frame with glowing corners */}
            <div className="relative bg-[#080c14] border border-cyan-900/50 rounded-xl p-2 md:p-4 shadow-[0_0_50px_-10px_rgba(72,202,228,0.15)] overflow-hidden group">
                
                {/* Corner Tech Decals */}
                <div className="absolute top-0.5 left-0.5 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-md z-20"></div>
                <div className="absolute top-0.5 right-0.5 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-md z-20"></div>
                <div className="absolute bottom-0.5 left-0.5 w-8 h-8 border-b-2 border-l-2 border-cyan-500 rounded-bl-md z-20"></div>
                <div className="absolute bottom-0.5 right-0.5 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-md z-20"></div>

                {/* Inner Screen Container */}
                <div className="relative rounded-lg overflow-hidden bg-black aspect-[16/9] md:aspect-[21/9] border border-white/5">
                    
                    {/* The Map Image (Hologram Style) */}
                    <img
                    src={WorldMapImage}
                    alt="World Map Hologram"
                    className="w-full h-full object-cover opacity-60 blur-[1px] scale-105 group-hover:scale-110 transition-transform duration-[2s]"
                    style={{ filter: "hue-rotate(190deg) sepia(20%) saturate(150%)" }} // Makes it blue/cyan
                    />

                    {/* Overlays & Effects */}
                    {/* 1. Digital Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(72,202,228,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(72,202,228,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-10 pointer-events-none"></div>
                    
                    {/* 2. Scanline Animation */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[5%]"
                        style={{
                            background: "linear-gradient(to bottom, transparent, rgba(72, 202, 228, 0.6), transparent)",
                            boxShadow: "0 0 20px rgba(72, 202, 228, 0.4)"
                        }}
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                    
                    {/* 3. Pulsing Points of Interest Markers (Fake Data Locations) */}
                    <div className="absolute top-[25%] left-[16%] z-10"> <MarkerPulse /> </div>
                    <div className="absolute top-[45%] right-[8%] z-10"> <MarkerPulse delay={1} /> </div>
                    <div className="absolute bottom-[25%] left-[45%] z-10"> <MarkerPulse delay={2} /> </div>
                    <div className="absolute top-[17%] right-[28%] z-10"> <MarkerPulse delay={3} /> </div>

                    {/* 4. Vignette & Screen Reflection */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(2,6,12,0.8)_100%)] z-0"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-[#02060c] via-transparent to-transparent opacity-80 z-0"></div>
                </div>
                
                {/* Control Panel / Status Bar below screen */}
                <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-4">
                    {/* Tech Readout */}
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-mono text-cyan-300/60 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <Crosshair className="w-4 h-4 animate-spin-slow" />
                            <span>System Status: Online</span>
                        </div>
                        {/* FIX: Removed 'hidden md:block' to make visible on mobile */}
                        <div className="h-4 w-[1px] bg-white/10"></div>
                        <div className="">Active Sectors: 04</div>
                    </div>

                    {/* CTA Button Container */}
                    <div className="relative group/btn">
                        <div className="absolute -inset-2 bg-cyan-500/20 rounded-md blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        <Link to="/world">
                        <Button className="relative z-10 flex items-center gap-2 pl-6 pr-8 py-4 text-lg" icon={<Map className="w-5 h-5" />}>
                            Initialize Holomap
                        </Button>
                        </Link>
                    </div>
                </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Simple sub-component for the pulsing map markers
const MarkerPulse = ({ delay = 0 }) => (
    <div className="relative flex items-center justify-center w-6 h-6">
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full z-10"></div>
        <motion.div
            className="absolute w-full h-full border-2 border-cyan-500 rounded-full"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2, delay: delay, ease: "easeOut" }}
        />
    </div>
);

export default WorldPreview;