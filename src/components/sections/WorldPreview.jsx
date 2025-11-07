import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

const WorldPreview = () => {
  const handleExplore = useCallback(() => {
    window.location.href = "/world";
  }, []);

  return (
    <section
      id="world-preview"
      className="relative py-24 px-6 lg:px-12 text-gray-100 bg-[#0b0f19]/80 backdrop-blur-lg overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative min-h-[60vh] rounded-2xl overflow-hidden border border-[#1b2333] shadow-[0_0_30px_#4deeea33] group z-10"
        >
          <img
            src="/src/assets/images/World-space-v2.jpg"
            alt="A World Shattered"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#4deeea33] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-linear-to-t from-[#0b0f19]/70 via-transparent to-transparent" />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:pr-12 space-y-6 relative z-10"
        >
          <div className="space-y-4">
            <span className="text-sm font-bold text-[#4deeea] uppercase tracking-widest">
              Discover
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              A World Shattered
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Explore the haunting beauty and peril of a realm fractured by
              celestial power and reborn through Aether.
            </p>
          </div>

          <p className="text-gray-400 text-base leading-relaxed">
            From the radiant peaks of the Crystal Spires to the abyssal ruins of
            the Sunken City, the Shattered Isles beckon explorers with secrets,
            dangers, and forgotten relics. Every corner is alive with mystery,
            waiting for the brave to uncover its truth.
          </p>

          <div className="pt-4 relative z-20">
            <Button
              variant="primary"
              size="md"
              className="inline-flex items-center gap-2 relative z-20"
              onClick={handleExplore}
            >
              Explore the World
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorldPreview;