import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button"; // Standard button
import CyberButton, { PlayIcon } from "../components/ui/CyberButton"; // All-in-one button

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-[#02060c] text-white relative overflow-hidden font-sans selection:bg-cyan-500/30 py-15">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-15">
            <Link to="/">
                <Button variant="ghost" className="mb-8">← Return to Base</Button>
            </Link>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white"
                style={{ fontFamily: "AetherionV1, sans-serif" }}
            >
                Comms Relay // <span className="text-cyan-500">News</span>
            </motion.h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
                System Diagnostics & Component Testing
            </p>
        </div>

        {/* --- MAIN TEST CONTAINER --- */}
        <div className="bg-[#050810]/80 border border-white/5 rounded-3xl backdrop-blur-md p-10 md:p-20 shadow-2xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-16 uppercase tracking-widest border-b border-cyan-900/50 pb-4 inline-block">
                // CyberButton Component Variants
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* LEFT SIDE: Standard Buttons */}
                <div className="flex flex-col gap-12 items-center lg:items-end lg:border-r lg:border-white/10 lg:pr-16">
                    {/* 1. Default Variant */}
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500 mb-4 font-mono tracking-wider">VARIANT: DEFAULT</p>
                        <CyberButton onClick={() => console.log("Default Clicked")} />
                    </div>

                    {/* 2. Custom Text */}
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500 mb-4 font-mono tracking-wider">CUSTOM TEXT / SIZE</p>
                        <CyberButton 
                            text="DOWNLOAD PATCH v2.4" 
                            className="w-full"
                            onClick={() => console.log("Patch Download...")}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Premium Play Button */}
                <div className="flex flex-col items-center lg:items-start lg:pl-4">
                    <p className="text-xs text-orange-500/70 mb-8 font-mono tracking-wider">VARIANT: 'PLAY' (HIGH FIDELITY)</p>
                    <CyberButton 
                        variant="play"
                        text="PLAY NOW"
                        icon={PlayIcon}
                        onClick={() => console.log("Launching Game...")}
                    />
                </div>

            </div>

            <div className="mt-20 pt-8 border-t border-white/5 text-xs text-gray-600 font-mono">
                ALL SYSTEMS OPERATIONAL // REACT COMPONENT READY
            </div>
        </div>

      </div>
    </div>
  );
};

export default NewsPage;