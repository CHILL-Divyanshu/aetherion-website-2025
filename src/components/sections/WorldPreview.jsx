import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CyberButton from "../ui/CyberButton";
import worldMapImg from "../../assets/images/World/Aetherion-World-v2.jpg";

// --- SCAN MARKER COMPONENT (Unchanged) ---
const ScanMarker = ({ left, top, label, scanDuration = 4 }) => {
  const positionPercent = parseFloat(left) / 100;
  const appearanceDelay = positionPercent * scanDuration;
  const visibleDuration = 1.5 + Math.random(); 

  return (
    <div 
      className="absolute w-0 h-0"
      style={{ left, top }}
    >
      <motion.div
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
        }}
        transition={{
            duration: visibleDuration,
            delay: appearanceDelay,
            repeat: Infinity,
            repeatDelay: scanDuration - visibleDuration,
            ease: "easeInOut"
        }}
        className="relative flex flex-col items-center"
      >
        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse" />
        {label && (
            <div className="mt-2 px-2 py-1 bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded text-[10px] text-cyan-400 font-mono uppercase tracking-widest whitespace-nowrap">
                {label}
            </div>
        )}
        <div className="absolute top-0 left-0 w-3 h-3 border border-cyan-500 rounded-full animate-ping opacity-75" />
      </motion.div>
    </div>
  );
};

const WorldPreview = () => {
  const SCAN_DURATION = 5; 

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-2 opacity-70"
            >
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">
                    System Uplink Established
                </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                style={{ fontFamily: "AetherionV1, sans-serif" }}>
                Explore The Fractured <br/>
                <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">
                    World
                </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                Navigate the shattered remnants of Aetherion. From the neon-soaked Crystal Spires to the void-corrupted sunken cities, chart your path through a universe in chaos.
            </p>
        </div>

        {/* --- HOLOMAP CONTAINER --- */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl p-1 bg-gradient-to-b from-cyan-500/30 via-transparent to-blue-600/30"
        >
            <div className="relative rounded-lg overflow-hidden bg-[#080c14] aspect-video group border border-white/5 shadow-2xl">
                
                {/* 1. The Map Image */}
                <img 
                    src={worldMapImg} 
                    alt="Aetherion Map" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 grayscale-[30%] group-hover:grayscale-0"
                />

                {/* 2. Tactical Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30" 
                     style={{
                        backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                     }}
                />
                
                {/* 3. The Scanning Line Animation */}
                <motion.div 
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ 
                        duration: SCAN_DURATION, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="absolute top-0 bottom-0 w-[2px] bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
                >
                    <div className="absolute top-0 bottom-0 w-20 -left-10 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />
                </motion.div>

                {/* 4. Pulse Markers */}
                <ScanMarker left="20%" top="30%" label="Crystal Spires" scanDuration={SCAN_DURATION} />
                <ScanMarker left="48%" top="55%" label="Sunken City" scanDuration={SCAN_DURATION} />
                <ScanMarker left="85%" top="60%" label="Verdant Cradle" scanDuration={SCAN_DURATION} />
                <ScanMarker left="75%" top="20%" label="Premorn City" scanDuration={SCAN_DURATION} />

                {/* FIX: Improved Shadow Overlay 
                    - Reduced height to h-32 (was h-40)
                    - Uses theme color #02060c instead of pure black
                    - Fades via 40% opacity instead of 80% for a softer look
                */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02060c]/90 via-[#02060c]/40 to-transparent z-30 pointer-events-none" />

                {/* 5. UI Overlay (Bottom Bar) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-40">
                    
                    {/* Status Text - Added text shadow for readability */}
                    <div className="flex flex-col gap-1 text-[10px] font-mono text-cyan-500 uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_#22d3ee]"/>
                            System Status: Online
                        </div>
                        <div className="text-cyan-500/80">Active Sectors: 04</div>
                    </div>

                    {/* Desktop Button (Inside Map) */}
                    <div className="hidden md:block transform scale-90 origin-bottom-right">
                        <Link to="/world">
                            <CyberButton 
                                text="INITIALIZE HOLOMAP"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Mobile/Tablet Button (Outside Map) */}
        <div className="md:hidden mt-6 flex justify-center w-full">
             <Link to="/world" className="w-full">
                <CyberButton 
                    text="INITIALIZE HOLOMAP"
                    className="w-full"
                />
            </Link>
        </div>

      </div>
    </section>
  );
};

export default WorldPreview;