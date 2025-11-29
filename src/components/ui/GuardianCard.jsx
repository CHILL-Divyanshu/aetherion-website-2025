import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// New Tech Corner Component that handles position automatically
const TechCorners = () => (
  <>
    {/* Top Left */}
    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/60 rounded-tl-sm transition-all group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400" />
    
    {/* Top Right */}
    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500/60 rounded-tr-sm transition-all group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400" />
    
    {/* Bottom Left */}
    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500/60 rounded-bl-sm transition-all group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400" />
    
    {/* Bottom Right */}
    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500/60 rounded-br-sm transition-all group-hover:w-6 group-hover:h-6 group-hover:border-cyan-400" />
  </>
);

// 1. Updated Component with 'basePath' Prop
const GuardianCard = memo(({ id, image, name, title, description, element, power, basePath = "/guardians" }) => {
  return (
    // 2. Dynamic Link using basePath
    <Link to={`${basePath}/${id}`} className="block h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative h-full bg-[#080c14] border border-white/5 group overflow-hidden cursor-pointer flex flex-col p-1"
      >
        {/* Render the Corners */}
        <TechCorners />

        {/* 3. Background Image & Visuals */}
        <div className="relative w-full h-64 overflow-hidden rounded-sm mt-2 mx-auto w-[95%]">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            variants={{
              rest: { scale: 1, filter: "grayscale(40%)" },
              hover: { scale: 1.1, filter: "grayscale(0%)" },
            }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] to-transparent opacity-90" />
           {/* Element Badge */}
           <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
            {element}
          </div>
        </div>

        {/* 4. Text Content */}
        <div className="p-5 relative z-10 flex flex-col grow text-left">
           <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-0">
              {name}
            </h3>
            <p className="text-cyan-600 text-xs font-bold uppercase tracking-[0.15em] mb-3">
              {title}
            </p>

          {/* Power Bar */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex justify-between text-[10px] uppercase text-gray-500 mb-1">
              <span>Power Level</span>
              <span className="text-cyan-400">{power}/10</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-500"
                variants={{ rest: { width: "0%" }, hover: { width: `${power * 10}%` } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

GuardianCard.displayName = "GuardianCard";
export default GuardianCard;