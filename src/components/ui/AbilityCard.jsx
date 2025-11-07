import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TYPE_COLORS = {
  offense: "from-[#ff4d4d] to-[#ffb84d]",
  defense: "from-[#4deeea] to-[#5f8df8]",
  utility: "from-[#b84dff] to-[#7d5fff]",
};

const AbilityCard = memo(({
  icon,
  name,
  description,
  type = "offense",
  aetherCost,
  image,
}) => {
  const typeColor = useMemo(() => TYPE_COLORS[type] || TYPE_COLORS.offense, [type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`relative bg-linear-to-b from-slate-900/70 to-slate-900/40 border border-white/10 
        rounded-2xl p-6 backdrop-blur-xl cursor-pointer overflow-hidden 
        transition-all duration-500 hover:shadow-[0_0_25px_rgba(77,238,234,0.3)]`}
    >
      {/* Optional Background Image */}
      {image && (
        <div className="absolute inset-0 opacity-20">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      )}

      {/* Subtle Gradient Border Glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-linear-to-r ${typeColor} 
          opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
      />

      {/* Inner Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Ability Icon */}
        <div className="mb-4">
          {icon ? (
            <img
              src={icon}
              alt={name}
              className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(77,238,234,0.6)]"
              loading="lazy"
            />
          ) : (
            <Sparkles className="text-cyan-400 w-10 h-10 drop-shadow-[0_0_10px_rgba(77,238,234,0.6)]" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>

        {/* Aether Cost */}
        {aetherCost && (
          <p className="text-sm text-cyan-400/80 mt-1 font-medium">
            Aether Cost: {aetherCost}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
    </motion.div>
  );
});

AbilityCard.displayName = "AbilityCard";

export default AbilityCard;