import React, { useMemo } from "react";
import { motion } from "framer-motion";
import GuardianCard from "../../components/ui/GuardianCard";
import guardiansData from "../../data/guardians.json";

const HEADER_CONTENT = {
  title: "The Guardians",
  description:
    "Legends forged from light, shadow, and Aether itself — each Guardian holds the power to shape the fate of worlds.",
};

const STAGGER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const GuardiansIndex = () => {
  const guardiansList = useMemo(() => guardiansData, []);

  return (
    <section className="min-h-screen py-24 px-6 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 text-indigo-300"
        style={{
            fontFamily: "AetherionV1, sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 0 30px rgba(6,182,212,0.4)",
          }}
        >
          {HEADER_CONTENT.title}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {HEADER_CONTENT.description}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={STAGGER_VARIANTS}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {guardiansList.map((guardian) => (
          <motion.div
            key={guardian.id}
            variants={ITEM_VARIANTS}
          >
            <GuardianCard {...guardian} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default GuardiansIndex;