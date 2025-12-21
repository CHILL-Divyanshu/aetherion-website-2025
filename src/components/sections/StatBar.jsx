import React from "react";
import { motion } from "framer-motion";

const StatBar = ({ label, value }) => (
  <div className="mb-5 group">
    <div className="flex justify-between text-xs font-bold uppercase tracking-[0.2em] mb-2">
      <span className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300">{label}</span>
      <span className="text-cyan-500 font-mono text-sm">{value}/10</span>
    </div>
    <div className="flex gap-1 h-2">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2 }}
          whileInView={{ opacity: i < value ? 1 : 0.2 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className={`flex-1 rounded-[1px] ${i < value ? "bg-cyan-500 shadow-[0_0_10px_cyan]" : "bg-slate-800"}`}
        />
      ))}
    </div>
  </div>
);

export default StatBar;