import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ABOUT_CONTENT = {
  title: "About Aetherion",
  subtitle:
    "Forged from imagination, built through code, and powered by passion — Aetherion is more than a project; it's a living world shaped by creativity, technology, and community.",
  heroTitle: "A World Reborn in Code",
  paragraphs: [
    "Aetherion began as a vision — a realm where art, storytelling, and engineering collide. Every guardian, every region, and every fragment of Aether has been carefully crafted by hand and code. We believe worlds should feel alive, immersive, and meaningful.",
    "Our mission is simple: to create an experience that blurs the line between a game and a story. Built with modern technologies like React, Node.js, and MongoDB, Aetherion is designed to evolve — just like the players who enter it.",
  ],
  philosophyTitle: "Our Philosophy",
  philosophyText:
    "We believe games aren't just played — they're felt. Every pixel, every mechanic, and every heartbeat of this world is built to inspire wonder and connection. Aetherion is our way of reminding you that magic still exists — if you dare to create it.",
  image: "/src/assets/images/World-space-v2.jpg",
};

const About = () => {
  return (
    <section className="relative min-h-screen bg-linear-to-b from-black via-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-24 right-32 w-96 h-96 bg-purple-700/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            {ABOUT_CONTENT.title.split(" ")[0]}{" "}
            <span className="text-cyan-400">{ABOUT_CONTENT.title.split(" ")[1]}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {ABOUT_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
          >
            <img
              src={ABOUT_CONTENT.image}
              alt="Aetherion Concept Art"
              className="w-full h-[450px] object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">
              {ABOUT_CONTENT.heroTitle}
            </h2>
            {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-400 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}

            <div className="pt-6">
              <Link
                to="/community"
                className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl text-base shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:gap-4 group"
              >
                <span>Join the Community</span>
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
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            {ABOUT_CONTENT.philosophyTitle}
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            {ABOUT_CONTENT.philosophyText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;