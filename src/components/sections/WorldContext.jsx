import React, { useMemo, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GridBackground from "../../components/ui/GridBackground"; // Checked path from your file structure
import regionsData from "../../data/regions.json"; // Assumed path based on previous uploads
import worldMap from "../../assets/images/Aetherion-World-v2.png"; // Assumed path based on previous uploads

const WORLD_DESCRIPTION =
  "Aetherion exists between realms of light and shadow, where cosmic forces collide and reshape existence itself. Each Guardian embodies a fragment of this balance—light, void, fire, and dreams.";
 
const WorldContext = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState(null);
  
  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse values (Spring physics)
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation degrees (Max 12 degrees tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Handle Mouse Move over the map container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    // Reset tilt when mouse leaves
    x.set(0);
    y.set(0);
    setActiveRegion(null);
  };

  const handleRegionClick = (region) => {
    navigate(`/world/${region.id}`, { state: { region } });
  };

  return (
    <section
      id="world"
      className="relative py-32 px-6 lg:px-10 bg-[#02060c] text-white overflow-hidden perspective-2000"
    >
      {/* 1. Background Layers */}
      <GridBackground /> {/* Your existing grid component */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#02060c]/50 to-[#02060c] pointer-events-none z-10" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. Content Container */}
      <div className="container mx-auto max-w-7xl relative z-20">
        
        {/* Header Text */}
        <div className="text-center mb-20">
           <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full bg-cyan-900/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md"
           >
             Holomap System v2.0
           </motion.span>
           
           <motion.h2
            className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Aetherion</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {WORLD_DESCRIPTION}
          </motion.p>
        </div>

        {/* 3. THE 3D MAP CONTAINER */}
        <div className="flex justify-center items-center perspective-1000">
          <motion.div
            className="relative w-full max-w-5xl"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d", // CRITICAL for 3D effect
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
            whileInView={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Map Frame/Border */}
            <div 
              className="relative rounded-2xl p-2 bg-slate-900/40 border border-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ transform: "translateZ(0px)" }}
            >
              
              {/* Corner Accents (Sci-Fi Look) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-500 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-bottom-2 border-cyan-500 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-bottom-2 border-cyan-500 rounded-br-lg" />

              {/* The Map Image */}
              <div className="relative rounded-xl overflow-hidden shadow-inner shadow-black/50">
                <img
                  src={worldMap}
                  alt="Aetherion Map"
                  className="w-full h-auto object-cover pointer-events-none"
                />
                
                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
              </div>

              {/* 4. FLOATING HOTSPOTS LAYER */}
              {/* We push this layer UP in Z-space so it floats above the map */}
              <div 
                className="absolute inset-0 z-30 pointer-events-none" 
                style={{ transform: "translateZ(40px)" }} 
              >
                {regionsData.map((region) => (
                  <div
                    key={region.id}
                    className="absolute pointer-events-auto"
                    style={{
                      left: `${region.position.x}%`,
                      top: `${region.position.y}%`,
                    }}
                  >
                    {/* The Hotspot Target */}
                    <button
                      onClick={() => handleRegionClick(region)}
                      onMouseEnter={() => setActiveRegion(region.id)}
                      className="relative group focus:outline-none"
                    >
                      {/* Pulsing Ring */}
                      <span className="absolute -inset-2 rounded-full border border-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                      
                      {/* Core Dot */}
                      <span className={`relative block w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] transition-all duration-300 ${activeRegion === region.id ? "bg-white scale-125" : "bg-cyan-500 hover:bg-cyan-400"}`} style={{ color: region.color || '#06b6d4' }} />
                    </button>

                    {/* 5. CINEMATIC TOOLTIP */}
                    <AnimatePresence>
                      {activeRegion === region.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-64 z-50 pointer-events-none"
                        >
                          <div className="bg-black/90 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            {/* Connector Line */}
                            <div className="absolute left-1/2 bottom-[-6px] w-2 h-2 bg-black border-r border-b border-cyan-500/30 rotate-45 -translate-x-1/2" />
                            
                            <h3 className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-1">
                              {region.name}
                            </h3>
                            <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-2" />
                            <p className="text-gray-300 text-xs leading-relaxed">
                              {region.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Realtime Shadow based on tilt (Optional advanced touch) */}
            <div 
               className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/50 blur-[30px] rounded-full pointer-events-none" 
               style={{ transform: "translateZ(-50px)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldContext;