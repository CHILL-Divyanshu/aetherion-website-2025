import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GuardianCard = memo(({ id, image, name, title, description, element, power }) => {
  const path = `/guardians/${id}`;

  return (
    <Link to={path}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 220, damping: 15 }}
        className="relative bg-[#0b0f19]/80 border border-[#1b2333] rounded-2xl p-6 backdrop-blur-lg
          overflow-hidden shadow-[0_0_25px_#1b233344] text-center flex flex-col items-center
          hover:shadow-[0_0_25px_#6366f188] hover:border-[#6366f1]/60 transition-all duration-300 cursor-pointer"
      >
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-indigo-500/10 via-transparent to-slate-900/40 rounded-2xl opacity-70 pointer-events-none" />

        {/* Guardian Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-indigo-500/60 shadow-md mb-4 relative">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0f19]/40 to-transparent" />
        </div>

        {/* Info */}
        <h3 className="text-xl font-semibold text-indigo-300 mb-1 tracking-wide">
          {name}
        </h3>
        <p className="text-sm text-slate-400 italic mb-2">{title}</p>
        <p className="text-sm text-slate-300 leading-relaxed mb-3 px-2">
          {description}
        </p>

        {/* Element & Power */}
        <div className="flex justify-center gap-3 text-xs mt-auto">
          <span className="px-3 py-1 bg-slate-800/70 text-indigo-200 rounded-full border border-slate-700/60 shadow-sm">
            {element}
          </span>
          <span className="px-3 py-1 bg-indigo-700/60 text-slate-100 rounded-full border border-indigo-600/50 shadow-sm">
            Power: {power}
          </span>
        </div>
      </motion.div>
    </Link>
  );
});

GuardianCard.displayName = "GuardianCard";

export default GuardianCard;