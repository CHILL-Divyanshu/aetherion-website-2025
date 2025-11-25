import { motion } from "framer-motion";
import { memo } from "react";

const NEWS_ITEMS = [
  /* ... Keep your existing data ... */
  {
    date: "Oct 21, 2025",
    category: "Dev Diary",
    title: "Crafting the Bone King",
    imageSrc: "/src/assets/images/News/Valerius_helm.jpg", // Ensure path is correct
    imageText: "Close-up of Valerius's helm.",
    link: "#",
  },
  // ... others
];

const NewsCard = memo(({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group relative bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden rounded-xl"
  >
    {/* Image Container */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={item.imageSrc}
        alt={item.imageText}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* SCANNER EFFECT ON HOVER */}
      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#06b6d4] opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:animate-scan" />
    </div>

    <div className="p-6 relative z-10 bg-slate-900/90 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
          {item.category}
        </span>
        <time className="text-xs text-slate-500">{item.date}</time>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors line-clamp-2">
        {item.title}
      </h3>

      <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-white transition-colors">
        Read Transmission 
        <motion.span 
          className="ml-2" 
          initial={{ x: 0 }} 
          whileHover={{ x: 5 }}
        >
          →
        </motion.span>
      </div>
    </div>
  </motion.article>
));

NewsCard.displayName = "NewsCard";

function NewsSection() {
  return (
    <section id="intel" className="py-24 px-6 relative bg-black">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "AetherionV1, sans-serif" }}>
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Intel</span>
            </h2>
            <p className="text-slate-400 max-w-lg">Updates from the development frontlines.</p>
          </div>
          <button className="hidden md:block px-6 py-2 border border-white/20 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
            View Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, index) => (
            <NewsCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
      
      {/* CSS for the scanner animation */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(250px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default NewsSection;