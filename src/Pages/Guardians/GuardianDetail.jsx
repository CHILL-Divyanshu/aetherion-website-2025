import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import guardians from "../../data/guardians.json";
import Button from "../../components/ui/Button";

const DEFAULT_THEME = {
  primary: "#6366f1",
  text: "#a5b4fc",
  border: "#4f46e5",
};

const GuardianDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const guardian = useMemo(
    () => guardians.find((g) => g.id === id),
    [id]
  );

  const colorTheme = useMemo(
    () => guardian?.theme || DEFAULT_THEME,
    [guardian]
  );

  const handleBackClick = () => navigate("/guardians");

  if (!guardian) {
    return (
      <div className="text-center text-gray-400 py-24">
        <h2 className="text-3xl font-bold mb-4">Guardian Not Found</h2>
        <Button variant="secondary" onClick={handleBackClick}>
          ← Back to Guardians
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24 px-6 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <img
            src={guardian.image}
            alt={guardian.name}
            className="rounded-2xl w-full h-[500px] object-cover shadow-2xl border transition-all duration-500"
            style={{ borderColor: colorTheme.border }}
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ backgroundColor: `${colorTheme.primary}20` }}
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-3"
            style={{ color: colorTheme.text }}
          >
            {guardian.name}
          </h1>
          <h2 className="text-2xl font-semibold italic mb-4 text-slate-400">
            {guardian.title}
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            {guardian.description}
          </p>

          {/* Guardian Meta Info */}
          <div className="pt-2 text-sm text-slate-400 space-y-1">
            <p>
              <span className="text-slate-300">Faction:</span> {guardian.faction}
            </p>
            <p>
              <span className="text-slate-300">Role:</span> {guardian.role}
            </p>
          </div>

          {/* Abilities */}
          {guardian.abilities?.length > 0 && (
            <ul className="pt-4 list-disc list-inside text-slate-300 text-sm space-y-1">
              {guardian.abilities.map((ability, i) => (
                <li key={i}>{ability}</li>
              ))}
            </ul>
          )}

          {/* Back Button */}
          <div className="pt-8">
            <Button
              variant="secondary"
              size="md"
              onClick={handleBackClick}
            >
              ← Back to Guardians
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuardianDetail;