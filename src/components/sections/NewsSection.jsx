import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

// --- ASSET IMPORTS ---
// Importing images ensures they are hashed and bundled correctly for production.
import helmImg from "../../assets/images/News/Valerius_helm.jpg";
// Note: Ensure these files exist in your folder, otherwise the build will fail.
// If they have different names, update the import paths below.
import islesImg from "../../assets/images/News/shattered-isles.jpg";
import aetherImg from "../../assets/images/News/aether-power-system.jpg";

const NEWS_ITEMS = [
  {
    id: 1,
    date: "21 OCT 2025",
    category: "DEV LOG",
    title: "PROTOCOL: BONE KING UPDATE",
    imageSrc: helmImg,
    excerpt: "Deep dive into the design mechanics of the new Tank class Guardian.",
  },
  {
    id: 2,
    date: "15 OCT 2025",
    category: "MAP INTEL",
    title: "SECTOR ANALYSIS: CRYSTAL SPIRES",
    imageSrc: islesImg,
    excerpt: "Exploring verticality and traversal in the upcoming region.",
  },
  {
    id: 3,
    date: "08 OCT 2025",
    category: "PATCH NOTES",
    title: "AETHER ENERGY SYSTEM 2.0",
    imageSrc: aetherImg,
    excerpt: "Overhauling resource management for high-stakes combat.",
  },
];

const NewsCard = memo(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    viewport={{ once: true }}
    className="group relative h-full flex flex-col overflow-hidden rounded-xl bg-[#0b121e] border border-white/5 hover:border-cyan-500/50 transition-all duration-500"
  >
    {/* Tech Corner Accents */}
    <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity z-20">
        <div className="w-2 h-2 border-t-2 border-r-2 border-cyan-500"></div>
    </div>
    <div className="absolute bottom-0 left-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity z-20">
        <div className="w-2 h-2 border-b-2 border-l-2 border-cyan-500"></div>
    </div>

    {/* Image Area with Glitch/Scan Effect */}
    <div className="relative h-60 overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <span className="inline-flex items-center px-3 py-1 bg-black/60 backdrop-blur-md border border-cyan-500/30 text-[10px] font-black uppercase tracking-widest text-cyan-400">
           <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
           {item.category}
        </span>
      </div>
      
      <img 
        src={item.imageSrc} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
      />
      
    </div>

    {/* Content Area */}
    <div className="p-6 pt-2 flex-1 flex flex-col relative z-10">
      <div className="flex items-center gap-3 text-cyan-500/60 text-[10px] font-mono mb-3 uppercase tracking-widest">
        <span className="flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
        <span className="w-px h-3 bg-white/10"></span>
        <span className="flex items-center gap-1"><Activity size={10} /> LOG_ID_0{item.id}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-[0.9] mb-4 group-hover:text-cyan-400 transition-colors duration-300"
          style={{ fontFamily: "AetherionV1, sans-serif" }}>
        {item.title}
      </h3>
      
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1 group-hover:text-slate-300 transition-colors">
        {item.excerpt}
      </p>
      
      <div className="mt-auto pt-2 border-t border-white/5 flex justify-between items-center group/btn">
        <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
          Initialize Read
        </span>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
            <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </motion.div>
));

const NewsSection = () => {
  return (
    <section id="news" className="py-24 px-6 relative bg-[#02060c] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-white/5">
                <div>
                    {/* --- PRESERVED CODE BLOCK START --- */}
                    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2"
                        style={{ fontFamily: "AetherionV1, sans-serif" }}>
                        Comms <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Relay</span>
                    </h2>
                    {/* --- PRESERVED CODE BLOCK END --- */}
                    
                    <p className="text-cyan-500/60 font-mono text-xs tracking-[0.3em] mt-2">
                        // INCOMING TRANSMISSIONS FROM HQ
                    </p>
                </div>
                {/* Standardized Button */}
                <Link to="/dev-hub" className="hidden md:block">
                    <Button variant="ghost" className="text-xs">
                        View Full Archive
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NEWS_ITEMS.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                ))}
            </div>
            
            <div className="mt-12 md:hidden flex justify-center">
                <Link to="/dev-hub" className="w-full">
                    <Button variant="secondary" className="w-full text-xs">
                        View Full Archive
                    </Button>
                </Link>
            </div>
        </div>
    </section>
  );
};

export default NewsSection;