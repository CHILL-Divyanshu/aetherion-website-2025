import React, { memo } from "react";
import { motion } from "framer-motion";

const Card = memo(({
  image,
  title,
  subtitle,
  description,
  onClick,
  hoverGlow = true,
  className = "",
}) => {
  const handleClick = () => onClick?.();

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative bg-[#0b0f19]/80 backdrop-blur-md rounded-2xl p-5 cursor-pointer border border-[#1b2333] 
        shadow-md transition-all duration-300 overflow-hidden group
        ${hoverGlow ? "hover:shadow-[0_0_25px_#4deeea66]" : ""}
        ${className}
      `}
    >
      {/* Card Image */}
      {image && (
        <div className="overflow-hidden rounded-xl mb-4">
          <motion.img
            src={image}
            alt={title || "Card image"}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}

      {/* Card Text Content */}
      <div className="text-center">
        {title && (
          <h3 className="text-xl font-semibold text-gray-100 mb-1 tracking-wide">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-[#4deeea] font-medium mb-2 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Glow Border Animation */}
      {hoverGlow && (
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#4deeea]/60 transition-colors duration-500 pointer-events-none" />
      )}
    </motion.div>
  );
});

Card.displayName = "Card";

export default Card;