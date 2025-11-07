import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GridBackground from "../../components/GridBackground";
import regionsData from "../../data/regions.json";
import worldMap from "../../assets/images/Aetherion-World-v2.png";

const WORLD_DESCRIPTION =
  "Aetherion exists between realms of light and shadow, where cosmic forces collide and reshape existence itself. Each Guardian embodies a fragment of this balance—light, void, fire, and dreams—forever intertwined in an eternal cycle of creation and collapse.";

const WorldContext = () => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState(null);

  const worldData = useMemo(
    () => ({
      title: "World of Aetherion",
      description: WORLD_DESCRIPTION,
      mapSrc: worldMap,
      mapAlt: "Aetherion World Map",
    }),
    []
  );

  const handleRegionClick = (region) => {
    navigate(`/world/${region.id}`, { state: { region } });
  };

  return (
    <section
      id="world"
      className="relative py-32 px-6 lg:px-10 bg-linear-to-b from-black via-gray-950 to-gray-900 text-white overflow-hidden"
    >
      {/* Grid Background - MUST be first child with z-0 */}
      <GridBackground />

      {/* Floating gradient overlay - z-5 */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      {/* Main content container - z-20 ensures visibility above grid */}
      <div className="container mx-auto max-w-6xl relative z-20">
        {/* Section Title */}
        <motion.h2
          className="text-4xl sm:text-7xl font-extrabold text-center mb-12 bg-clip-text text-indigo-300"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "AetherionV1, sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 0 30px rgba(6,182,212,0.4)",
          }}
        >
          {worldData.title}
        </motion.h2>

        {/* World Description */}
        <motion.p
          className="text-center text-lg sm:text-xl text-gray-300 max-w-5xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {worldData.description}
        </motion.p>

        {/* World Map Container */}
        <motion.div
          className="flex justify-center items-center relative z-20"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Map with decorative frame */}
          <div className="relative max-w-5xl w-full">
            {/* Main Image */}
            <div className="world-map-wrapper">
              <img
                src={worldData.mapSrc}
                alt={worldData.mapAlt}
                className="w-full rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.5)] border-2 border-cyan-500/40 hover:shadow-[0_0_80px_rgba(6,182,212,0.8)] transition-all duration-500 relative z-20"
                loading="lazy"
              />

              {/* Map Hotspots */}
              <div className="map-hotspots-container">
                {regionsData.map((region) => (
                  <div
                    key={region.id}
                    className="map-hotspot"
                    style={{
                      left: `${region.position.x}%`,
                      top: `${region.position.y}%`,
                      "--hotspot-color": region.color,
                    }}
                    onClick={() => handleRegionClick(region)}
                    onMouseEnter={() => setActiveRegion(region.id)}
                    onMouseLeave={() => setActiveRegion(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Region: ${region.name}`}
                  >
                    <div className="hotspot-dot" />
                    <div className={`hotspot-tooltip ${activeRegion === region.id ? "active" : ""}`}>
                      <h3 className="tooltip-title">{region.name}</h3>
                      <p className="tooltip-description">{region.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Realistic black ellipse shadow under the map */}
            <div
              className="absolute left-210 -bottom-35 -translate-x-1/2 w-[60%] h-[28%] rounded-full pointer-events-none z-20"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                filter: "blur(25px)",
                transform: "translateX(-50%) scaleY(0.45)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom vignette fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default WorldContext;