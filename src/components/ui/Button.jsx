import React, { memo } from "react";
import { motion } from "framer-motion";

const Button = memo(({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
}) => {
  // CONFIG: Visual Styles
  const variants = {
    primary: "bg-cyan-600 text-white border-transparent hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    secondary: "bg-slate-900/80 text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/50",
    ghost: "bg-transparent text-slate-300 border-transparent hover:text-cyan-400 hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-8 py-3 text-sm",
    lg: "px-10 py-4 text-base tracking-widest",
  };

  return (
    <motion.button
      type="button"
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      className={`
        relative group overflow-hidden font-bold uppercase tracking-wider
        border transition-all duration-300
        ${variants[variant]} ${sizes[size]} ${className}
        ${disabled ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer"}
      `}
      // The "Cut Corner" Shape
      style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
    >
      {/* 1. Scanline Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-10" />

      {/* 2. Content */}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {icon && (
          <motion.span 
            className="block"
            transition={{ type: "spring", stiffness: 300 }}
            group-hover={{ x: 3 }} // Icon nudges on hover
          >
            {icon}
          </motion.span>
        )}
        {children}
      </span>

      {/* 3. Tech Corner Accents (SVG overlay for sharper details) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 L10 0 L0 10 Z" fill="currentColor" />
        <path d="M100 100 L90 100 L100 90 Z" fill="currentColor" />
      </svg>
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;