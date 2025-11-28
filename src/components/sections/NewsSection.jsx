import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button"; // Standard Button Component

const NEWS_ITEMS = [
  {
    id: 1,
    date: "21 OCT 2025",
    category: "DEV LOG",
    title: "PROTOCOL: BONE KING UPDATE",
    imageSrc: "/src/assets/images/News/Valerius_helm.jpg",
    excerpt: "Deep dive into the design mechanics of the new Tank class Guardian.",
  },
  {
    id: 2,
    date: "15 OCT 2025",
    category: "MAP INTEL",
    title: "SECTOR ANALYSIS: CRYSTAL SPIRES",
    imageSrc: "/src/assets/images/News/shattered-isles.jpg",
    excerpt: "Exploring verticality and traversal in the upcoming region.",
  },
  {
    id: 3,
    date: "08 OCT 2025",
    category: "PATCH NOTES",
    title: "AETHER ENERGY SYSTEM 2.0",
    imageSrc: "/src/assets/images/News/aether-power-system.jpg",
    excerpt: "Overhauling resource management for high-stakes combat.",
  },
];

const NewsCard = memo(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative h-full bg-[#0a0f16]/80 backdrop-blur-sm border border-white/5 hover:border-cyan-500/50 transition-all duration-300 flex flex-col clip-path-slant"
  >
    {/* Image Area */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute top-3 left-3 z-10 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
        {item.category}
      </div>
      <img 
        src={item.imageSrc} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] to-transparent opacity-80" />
    </div>

    {/* Content Area */}
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-3">
        <Calendar size={12} /> {item.date}
      </div>
      <h3 className="text-xl font-black text-white uppercase leading-none mb-3 group-hover:text-cyan-400 transition-colors"
          style={{ fontFamily: "AetherionV1, sans-serif" }}>
        {item.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">
        {item.excerpt}
      </p>
      
      <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
        <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest group-hover:underline">
          Read Report
        </span>
        <ArrowRight className="w-4 h-4 text-cyan-500 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
));

const NewsSection = () => {
  return (
    <section id="news" className="py-32 px-6 relative">
        <div className="container mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-white/10">
                <div>
                    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2"
                        style={{ fontFamily: "AetherionV1, sans-serif" }}>
                        Comms <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Relay</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-sm tracking-widest">
                        // LATEST TRANSMISSIONS FROM HQ
                    </p>
                </div>
                {/* Standardized Button */}
                <Link to="/dev-hub" className="hidden md:block">
                    <Button variant="secondary" className="px-8 py-4 text-xs">
                        View Archive
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS_ITEMS.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                ))}
            </div>
            
            <div className="mt-8 md:hidden">
                <Link to="/dev-hub">
                    <Button variant="secondary" className="w-full text-xs">
                        View Archive
                    </Button>
                </Link>
            </div>
        </div>
    </section>
  );
};

export default NewsSection;