import React, { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Ability Type Config
const TYPE_CONFIG = {
  offense: { color: "text-red-400", border: "group-hover:border-red-500/50", bg: "group-hover:shadow-red-500/20" },
  defense: { color: "text-blue-400", border: "group-hover:border-blue-500/50", bg: "group-hover:shadow-blue-500/20" },
  utility: { color: "text-purple-400", border: "group-hover:border-purple-500/50", bg: "group-hover:shadow-purple-500/20" },
};

const AbilityCard = memo(({ icon, name, description, type = "offense", aetherCost }) => {
  const theme = TYPE_CONFIG[type] || TYPE_CONFIG.offense;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`
        relative group p-1 rounded-xl bg-gradient-to-b from-slate-800 to-black 
        ${theme.bg} transition-all duration-300
      `}
    >
      {/* Inner Container */}
      <div className={`
        relative h-full bg-slate-900/90 backdrop-blur-xl rounded-lg p-5 border border-white/5 
        ${theme.border} transition-colors duration-300 flex flex-col items-start
      `}>
        
        {/* Header: Icon + Cost */}
        <div className="w-full flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
            {icon ? (
              <img src={icon} alt={name} className="w-8 h-8 object-contain" />
            ) : (
              <Sparkles className={`w-8 h-8 ${theme.color}`} />
            )}
          </div>
          {aetherCost && (
            <span className="font-mono text-xs text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/30">
              {aetherCost} AP
            </span>
          )}
        </div>

        {/* Text */}
        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {name}
        </h4>
        <p className="text-sm text-gray-400 leading-relaxed">
            {description}
        </p>

        {/* Type Indicator (Bottom) */}
        <div className={`mt-4 text-[10px] uppercase font-bold tracking-widest opacity-60 ${theme.color}`}>
          // {type} Class
        </div>
      </div>
    </motion.div>
  );
});

AbilityCard.displayName = "AbilityCard";
export default AbilityCard;