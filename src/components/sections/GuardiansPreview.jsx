import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const GuardiansPreview = () => {
  const handleNavigate = useCallback(() => {
    window.location.href = "/guardians";
  }, []);

  return (
    <section
      id="guardians-preview"
      className="relative w-full py-24 px-6 md:px-12 bg-linear-to-b from-black via-gray-950 to-gray-900 overflow-hidden text-gray-100"
    >
      {/* Background Glows - LOW Z-INDEX */}
      <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
        <div className="absolute top-24 left-20 w-72 h-72 bg-cyan-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-16 right-20 w-96 h-96 bg-blue-700/10 blur-3xl rounded-full" />
      </div>

      {/* Main Content Container - HIGHER Z-INDEX */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-20">
        {/* Guardian Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[500px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/40 border-2 border-cyan-500/60 z-20"
        >
          {/* Image */}
          <img
            src="/src/assets/images/guardians/valerius.jpg"
            alt="Valerius - The Bone King"
            className="w-full h-full object-cover rounded-2xl transition-all duration-700 hover:scale-105 hover:brightness-125"
            loading="lazy"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Hover Glow */}
          <motion.div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
            style={{ background: "radial-gradient(circle at center, rgba(6,182,212,0.3), transparent)" }} 
          />
        </motion.div>

        {/* Text Section - ENSURE PROPER Z-INDEX */}
        <div className="space-y-8 relative z-20">
          {/* Featured Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em] px-4 py-2 border border-cyan-400/30 rounded-full">
              ✦ Featured Guardian ✦
            </span> 
          </motion.div>

          {/* Guardian Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black text-indigo-100 tracking-tighter leading-tight"
              style={{
                fontFamily: "AetherionV1, sans-serif",
                letterSpacing: "0.02em",
                textShadow: "0 0 30px rgba(6,182,212,0.4)",
              }}
            >
              Valerius
            </h2>
            <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
              The Bone King
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-6 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-2xl">⚡</span>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Element</p>
                <p className="text-lg font-bold text-white">Fire</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-2xl">⚔️</span>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold">Power</p>
                <p className="text-lg font-bold text-white">9/10</p>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg leading-relaxed border-l-4 border-cyan-400/60 pl-6"
          >
            Among the eldest of the Guardians, Valerius commands legions of
            skeletal warriors forged from the remnants of shattered realms.
            Bound by duty, he wields the power of life and death to restore
            order in the wake of cosmic collapse.
          </motion.p>

          {/* Abilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-3 py-4"
          >
            <p className="text-xs text-cyan-400 uppercase font-bold tracking-widest">
              Abilities
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">
                <span className="text-cyan-400 font-bold">•</span> Inferno Slash - Ignite blade for heavy burning damage
              </li>
              <li className="text-sm text-gray-400">
                <span className="text-cyan-400 font-bold">•</span> Blazing Mirage - Dash forward leaving fiery illusions
              </li>
              <li className="text-sm text-gray-400">
                <span className="text-cyan-400 font-bold">•</span> Spectral Command - Summon skeletal warriors
              </li>
            </ul>
          </motion.div>

          {/* Button - MOST IMPORTANT: PROPER Z-INDEX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-8 relative z-50"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleNavigate}
              className="w-full sm:w-auto inline-flex items-center justify-center"
              icon={
                <svg
                  className="w-10 h-5 transform transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              }
            >
              Meet the Guardians
            </Button>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuardiansPreview;