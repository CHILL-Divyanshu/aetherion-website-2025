import { motion } from "framer-motion";
import { memo } from "react";

const NEWS_ITEMS = [
  {
    date: "Oct 21, 2025",
    category: "Dev Diary",
    title: "Crafting the Bone King",
    imageSrc: "/src/assets/images/News/Valerius_helm.jpg",
    imageText: "Close-up of Valerius's helm.",
    link: "#",
  },
  {
    date: "Oct 15, 2025",
    category: "World Building",
    title: "Designing the Shattered Isles",
    imageSrc: "/src/assets/images/News/shattered-isles.jpg",
    imageText: "Concept art of the Shattered Isles.",
    link: "#",
  },
  {
    date: "Oct 08, 2025",
    category: "Gameplay",
    title: "Inside the Aether Power System",
    imageSrc: "/src/assets/images/News/aether-power-system.jpg",
    imageText: "A glowing Aether crystal.",
    link: "#",
  },
];

const NewsCard = memo(({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="group rounded-2xl overflow-hidden bg-linear-to-b from-slate-900/60 to-slate-900/30 border border-white/10 shadow-lg shadow-cyan-500/10 backdrop-blur-lg hover:-translate-y-2 transition-all duration-500"
  >
    <div className="relative overflow-hidden min-h-[250px]">
      <img
        src={item.imageSrc}
        alt={item.imageText}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-transparent" />
    </div>

    <div className="p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            {item.category}
          </span>
          <span className="text-gray-600">•</span>
          <time className="text-xs text-gray-500">{item.date}</time>
        </div>
        <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors duration-300">
          {item.title}
        </h3>
      </div>

      <a
        href={item.link}
        className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-semibold group/link hover:gap-3 transition-all duration-200"
      >
        <span>Read More</span>
        <svg
          className="w-4 h-4 transform transition-transform duration-200 group-hover/link:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  </motion.article>
));

NewsCard.displayName = "NewsCard";

function NewsSection() {
  return (
    <section
      id="intel"
      className="py-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-7xl font-bold text-indigo-100 tracking-tight mb-5"
          style={{
                fontFamily: "AetherionV1, sans-serif",
                letterSpacing: "0.02em",
                textShadow: "0 0 30px rgba(6,182,212,0.4)",
              }}
        >
          News & Updates
        </h2>
        <div className="h-1 w-[140px] bg-linear-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-5" />
        <p className="text-lg text-indigo-50">
          The latest intel from the front lines of development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {NEWS_ITEMS.map((item, index) => (
          <NewsCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;