function WorldPreview() {
  return (
    <section id="world-preview" className="mb-32 fade-in-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="image-placeholder min-h-[550px] lg:order-last rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 relative group">
          <img src="/src/assets/World-space-v2.jpg" alt="A World Shattered" className="w-full h-full object-cover rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
        <div className="lg:pr-12 space-y-6">
          <div className="section-title">
            <div className="inline-block mb-4">
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Discover</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
              A World Shattered
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore the beautiful but perilous ruins of a world broken by celestial power.
            </p>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            From the ethereal glow of the Crystal Spires to the shadowy depths of the Sunken City, 
            the Shattered Isles are filled with breathtaking vistas, hidden secrets, and formidable foes. 
            Each region is a handcrafted experience, designed to reward exploration and challenge even 
            the most seasoned adventurers.
          </p>
          <div className="pt-4">
            <a 
              href="/world" 
              className="inline-flex items-center gap-3 cta-button font-bold py-4 px-8 rounded-xl text-base transition-all duration-300 hover:gap-4 group"
            >
              <span>Explore the World</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorldPreview;
