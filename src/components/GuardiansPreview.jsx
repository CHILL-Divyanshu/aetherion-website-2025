function GuardiansPreview() {
  return (
    <section id="guardians-preview" className="mb-32 fade-in-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="lg:pr-12 space-y-6">
          <div className="section-title">
            <div className="inline-block mb-4">
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Heroes</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
              The Guardians
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Powerful heroes who walk the shattered world.
            </p>
          </div>
          
          <div className="pt-6 border-l-4 border-cyan-500 pl-6 space-y-4">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Valerius
            </h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              The Bone King
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              An ancient sentinel awakened by the Fracture, Valerius is a master of bone and Aether. 
              He seeks to restore balance, using his control over life and death to protect the 
              remaining fragments of the world.
            </p>
          </div>
          
          <div className="pt-4">
            <a 
              href="/guardians" 
              className="inline-flex items-center gap-3 cta-button font-bold py-4 px-8 rounded-xl text-base transition-all duration-300 hover:gap-4 group"
            >
              <span>Meet the Guardians</span>
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
        
        <div className={`image-placeholder min-h-[60vh]`}>
          {/* === IMPORTANT: Update image path === */}
          <img src="/src/assets/Guardians/Valerius.jpg" alt="Valerius - The Bone King" className="w-full h-full object-cover rounded-lg" />
          
                                </div>
      </div>
    </section>
  );
}

export default GuardiansPreview;
