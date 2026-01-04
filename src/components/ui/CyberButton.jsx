import React from 'react';
import { motion } from "framer-motion";

// --- ICONS ---
const DefaultIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 4.53a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L10.69 12 3.72 4.53a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
  </svg>
);

export const PlayIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.14v13.72a.5.5 0 00.757.429l11-6.86a.5.5 0 000-.858l-11-6.86A.5.5 0 008 5.14z" />
  </svg>
);

const CyberButton = ({
  text = 'INITIATE UPLINK',
  icon: Icon = DefaultIcon,
  variant = 'default',
  onClick,
  className = '',
  type = 'button',
}) => {
  
  // ==========================================
  // VARIANT: PLAY (RECTANGULAR 3D CONSOLE BUTTON)
  // ==========================================
  if (variant === 'play') {
    return (
      <div 
        style={{ perspective: "800px" }} 
        className={`flex justify-center items-center ${className}`}
      >
        <motion.button
          type={type}
          onClick={onClick}
          // Tilted back 30deg to show the "desk" perspective
          initial={{ rotateX: 30 }}
          whileHover={{ scale: 1.05, rotateX: 30 }}
          whileTap={{ scale: 0.98, rotateX: 30 }} // Subtle press
          style={{ transformStyle: "preserve-3d" }}
          className="relative group focus:outline-none z-10 w-80 h-28 flex items-center justify-center"
          aria-label={text}
        >
          {/* =========================================================
              LAYER 1: THE CHASSIS (Rounded Rectangle Base)
             ========================================================= */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{ 
              transform: "translateZ(0px)",
              // Linear gradient works better for rectangular metal bars
              background: 'linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 20%, #52525b 50%, #27272a 100%)',
              boxShadow: `
                0 20px 50px rgba(0,0,0,0.8),         
                inset 0 1px 1px rgba(255,255,255,0.9), 
                inset 0 -5px 15px rgba(0,0,0,0.5)   
              `
            }}
          ></div>

          {/* =========================================================
              LAYER 2: THE INNER HOUSING (Dark Metal Trench)
             ========================================================= */}
          <div 
            className="absolute rounded-2xl bg-[#18181b] flex items-center justify-center"
            style={{ 
              width: '92%', 
              height: '80%',
              transform: "translateZ(5px)",
              boxShadow: `
                inset 0 5px 15px rgba(0,0,0,1),      
                0 1px 0 rgba(6,182,212,0.3)      
              `
            }}
          >
            {/* The Neon Channel (Border Glow) */}
            <div className="absolute inset-0 rounded-2xl border-[3px] border-cyan-500 blur-[2px] opacity-100"></div>
            <div className="absolute inset-0 rounded-2xl border-[1px] border-cyan-200 opacity-80 mix-blend-screen"></div>
            
             {/* Floor Reflection */}
             <div className="absolute inset-0 rounded-2xl bg-cyan-600/20 blur-xl"></div>
          </div>

          {/* =========================================================
              LAYER 3: THE CAP (The Floating Bar)
             ========================================================= */}
          <div 
            className="
              absolute rounded-xl z-20 flex flex-row items-center justify-center gap-4
              bg-gradient-to-b from-[#3f3f46] via-[#18181b] to-black
              group-active:translate-y-1
            "
            style={{
              width: '84%', 
              height: '65%',
              transform: "translateZ(20px)",
              boxShadow: `
                0 10px 20px rgba(0,0,0,0.9),           
                0 0 0 1px #000,                      
                inset 0 1px 1px rgba(255,255,255,0.3), 
                inset 0 -5px 10px rgba(0,0,0,0.8)    
              `
            }}
          >
            {/* Cap Surface Gloss */}
            <div className="absolute top-[2%] left-[2%] w-[96%] h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-xl blur-[1px] pointer-events-none"></div>

            {/* =========================================================
                LAYER 4: CONTENT (Icon + Text)
               ========================================================= */}
            <div 
                className="relative flex flex-row items-center justify-center space-x-3"
                style={{ transform: "translateZ(5px)" }}
            >
              <div className="relative">
                 {/* Icon */}
                 <Icon className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] filter brightness-110" />
              </div>
              
              {/* Text */}
              <span 
                className="text-2xl font-black uppercase tracking-widest text-cyan-400"
                style={{ textShadow: '0 0 15px rgba(6,182,212,0.6)' }}
              >
                {text}
              </span>
            </div>
          </div>
          
          {/* Ground Ambient Reflection */}
           <div 
              className="absolute -z-10 w-[105%] h-[100%] rounded-3xl bg-cyan-500/20 blur-[60px]"
              style={{ transform: "translateZ(-10px) rotateX(-30deg) scaleY(0.8)" }}
          />

        </motion.button>
      </div>
    );
  }

  // ==========================================
  // VARIANT: DEFAULT CYBER (Standard - No Changes)
  // ==========================================
  const clipPath = 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative group flex items-center justify-center min-w-[240px] px-8 py-5 font-bold text-white uppercase tracking-wider focus:outline-none transition-all duration-100 active:scale-95 active:brightness-110 ${className}`}
      aria-label={text}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-900 to-black" style={{ clipPath, backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px), linear-gradient(to bottom, #374151, #111827)`, boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5)' }}></div>
      <div className="absolute inset-[4px] bg-[#020617] border-2 border-cyan-500/40 overflow-hidden transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-[#080c24] group-active:border-white/50" style={{ clipPath, boxShadow: 'inset 0 0 20px rgba(6,182,212,0.2)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-60"></div>
        <div className="absolute -top-[50%] left-0 w-full h-[50%] bg-gradient-to-b from-transparent via-cyan-300/40 to-transparent animate-scanline opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'blur(3px)' }}></div>
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
            <defs>
                <linearGradient id="border-light" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d="M20,1 H280 L299,20 V60 L280,79 H20 L1,60 V20 Z" fill="none" stroke="url(#border-light)" strokeWidth="2" strokeLinecap="round" className="animate-border-travel transition-opacity duration-300 group-hover:opacity-0" style={{ filter: 'drop-shadow(0 0 4px cyan)' }}/>
        </svg>
      </div>
      <div className="relative z-30 flex items-center space-x-3 text-cyan-50 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]">
        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-300" />
        <span className="text-base md:text-lg tracking-[0.1em] font-black transition-colors duration-300 group-hover:text-cyan-200 group-active:text-white">{text}</span>
      </div>
      <div style={{ clipPath }} className="absolute inset-0 -z-10 transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]"></div>
      <div className="absolute inset-0 pointer-events-none border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-500" style={{ clipPath, filter: 'blur(1px)' }}></div>
    </button>
  );
};

export default CyberButton;