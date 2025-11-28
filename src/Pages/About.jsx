import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button"; 

const ABOUT_CONTENT = {
  title: "About Aetherion",
  subtitle: "Forged from imagination, built through code, and powered by passion.",
  heroTitle: "A World Reborn",
  paragraphs: [
    "Aetherion began as a vision — a realm where art, storytelling, and engineering collide. Every guardian, every region, and every fragment of Aether has been carefully crafted by hand and code.",
    "Our mission is simple: to create an experience that blurs the line between a game and a story. Built with modern web technologies, Aetherion is designed to evolve — just like the players who enter it.",
  ],
  image: "/src/assets/images/World-space-v2.jpg",
};

const About = () => {
  return (
    <section className="relative min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            Project <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Aetherion</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {ABOUT_CONTENT.subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900">
              <img
                src={ABOUT_CONTENT.image}
                alt="Concept Art"
                className="w-full h-[500px] object-cover transform transition-transform duration-[20s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest">Status: In Development</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white border-l-4 border-cyan-500 pl-6">
              {ABOUT_CONTENT.heroTitle}
            </h2>
            
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              {ABOUT_CONTENT.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-6 flex gap-4">
              <Link to="/community">
                <Button variant="primary" size="lg">Join the Community</Button>
              </Link>
              <Link to="/dev-hub">
                <Button variant="ghost" size="lg">View Roadmap</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;