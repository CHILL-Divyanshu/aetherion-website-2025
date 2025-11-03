function NewsSection() {
  const newsItems = [
    {
      date: 'Oct 21, 2025',
      category: 'Dev Diary',
      title: 'Crafting the Bone King',
      imageSrc: '/src/assets/News/Valerius_helm.jpg',
      imageText: 'Close-up of Valerius\'s helm.',
      link: '#'
    },
    {
      date: 'Oct 15, 2025',
      category: 'World Building',
      title: 'Designing the Shattered Isles',
      imageSrc: '/src/assets/News/shattered-isles.jpg',
      imageText: 'Concept art of the Shattered Isles.',
      link: '#'
    },
    {
      date: 'Oct 08, 2025',
      category: 'Gameplay',
      title: 'Inside the Aether Power System',
      imageSrc: '/src/assets/News/aether-power-system.jpg',
      imageText: 'A glowing Aether crystal.',
      link: '#'
    }
  ];

  return (
    <section id="intel" className="mb-32 fade-in-section">
      <div className="section-title mb-16">
        <h2 className="text-5xl font-black text-white tracking-tight mb-3">
          News & Updates
        </h2>
        <p className="text-lg text-gray-400">
          The latest intel from the front lines of development.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <article 
            key={index} 
            className="group glass-card rounded-xl overflow-hidden flex flex-col transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="min-h-[240px] relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
              <img
                src={item.imageSrc}
                alt={item.imageText}
                className="w-full h-full min-h-[240px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-colors duration-500"></div>
            </div>
            <div className="p-7 flex-grow flex flex-col bg-gradient-to-b from-slate-900/50 to-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-gray-600">•</span>
                <time className="text-xs text-gray-500">{item.date}</time>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1 flex-grow leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                {item.title}
              </h3>
              <a 
                href={item.link} 
                className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-semibold group/link"
              >
                <span>Read More</span>
                <svg 
                  className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-120" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;