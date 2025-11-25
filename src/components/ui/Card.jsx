import React, { memo } from "react";
import { motion } from "framer-motion";

const Card = memo(({
  image,
  title,
  subtitle,
  description,
  onClick,
  className = "",
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, borderColor: "rgba(6,182,212,0.4)" }}
      className={`
        relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md 
        cursor-pointer transition-colors duration-300 group ${className}
      `}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
        </div>
      )}

      <div className="p-5">
        {subtitle && (
          <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2">
            {subtitle}
          </div>
        )}
        {title && (
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-gray-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      
      {/* Bottom Light Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
});

Card.displayName = "Card";
export default Card;