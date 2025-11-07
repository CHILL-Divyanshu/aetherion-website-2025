import React, { memo } from "react";
import { motion } from "framer-motion";

const VARIANT_CLASSES = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/40 hover:shadow-[0_0_35px_rgba(77,238,234,0.6)] hover:brightness-125 active:scale-95 border-2 border-cyan-300/80 hover:border-cyan-200",
  secondary:
    "bg-slate-900/80 border-2 border-cyan-400/60 text-cyan-300 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(77,238,234,0.4)] hover:bg-slate-800/90",
  ghost:
    "text-cyan-400 border-2 border-cyan-400/50 hover:border-cyan-300 hover:bg-slate-800/50 shadow-md hover:shadow-cyan-500/30",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-bold",
};

const Button = memo(
  ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    icon,
  }) => {
    const baseSize = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;

    const classes = [
      "inline-flex items-center justify-center gap-3 rounded-xl font-bold tracking-wide select-none transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/60 disabled:opacity-60 disabled:cursor-not-allowed relative z-50",
      variantClass,
      baseSize,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <motion.button
        type="button"
        whileHover={!disabled ? { scale: 1.08, y: -3 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        className={classes}
        style={{
          pointerEvents: disabled ? "none" : "auto",
          boxShadow: !disabled
            ? "0 10px 30px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "none",
        }}
      >
        {/* Background shine */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Content wrapper ensures text + arrow stay inline */}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {icon && (
            <motion.span
              className="inline-flex w-5 h-5"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              {icon}
            </motion.span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;