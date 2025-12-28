import React from "react";
import { motion } from "framer-motion";

const StatBar = ({ label, value }) => (
  <div className="relative mb-5 group overflow-hidden">
    <div className="flex justify-between text-xs font-bold uppercase tracking-[0.2em] mb-2">
      <span className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">{label}</span>
      <span className="text-cyan-500 font-mono text-sm">{value}/10</span>
    </div>
    <div className="flex gap-1 h-2">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: i < value ? 1 : 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 + 0.2, duration: 0.4 }}
          className={`flex-1 rounded-[1px] ${i < value ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "bg-slate-800"}`}
        />
      ))}
    </div>
    {/* Shimmer/Scanline Effect */}
    <motion.div
      initial={{ x: "-100%" }}
      whileInView={{ x: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
    />
  </div>
);

export default StatBar;