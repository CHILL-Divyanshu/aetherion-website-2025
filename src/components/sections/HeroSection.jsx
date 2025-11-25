import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// --- MICRO-COMPONENT: GLITCH TEXT EFFECT ---
const GlitchText = ({ text }) => {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 animate-pulse delay-75">
        {text}
      </span>
    </div>
  );
};

const CONFIG = {
  PARTICLE_COUNT: 60, // Reduced slightly for performance
  PARTICLE_COUNT_MOBILE: 30,
  CONNECTION_DISTANCE: 120,
  PARTICLE_COLOR: "rgba(6, 182, 212, 0.9)",
  LINE_COLOR_RGB: "6, 182, 212",
};

function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef); // PERFORMANCE: Only animate when visible
  const mouseRef = useRef({ x: null, y: null });
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // ... (Keep your existing Particle Class logic here for brevity, it was good) ...
  // ... Or stick to the lighter implementation below ...

  class Particle {
     constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
     }
     update(ctx, w, h) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.PARTICLE_COLOR;
        ctx.fill();
     }
  }

  const initParticles = useCallback((canvas) => {
    const count = window.innerWidth < 768 ? CONFIG.PARTICLE_COUNT_MOBILE : CONFIG.PARTICLE_COUNT;
    particlesRef.current = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height));
  }, []);

  const animate = useCallback(() => {
    if (!isInView) return; // Stop animation if off-screen
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Simple Connection Logic
    particlesRef.current.forEach((p, i) => {
       p.update(ctx, canvas.width, canvas.height);
       for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONFIG.CONNECTION_DISTANCE) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(${CONFIG.LINE_COLOR_RGB}, ${1 - dist/CONFIG.CONNECTION_DISTANCE})`;
             ctx.lineWidth = 0.5;
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
          }
       }
    });
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    
    const handleResize = () => {
       canvas.width = parent.clientWidth;
       canvas.height = parent.clientHeight;
       initParticles(canvas);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    if (isInView) animate();
    
    return () => {
       window.removeEventListener("resize", handleResize);
       cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate, isInView, initParticles]);

  return (
    <header ref={containerRef} className="hero-section relative overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Layer 0: Deep Space Background */}
      <div className="absolute inset-0 bg-[#02060c]" />
      
      {/* Layer 1: Particles (Canvas) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-60" />

      {/* Layer 2: Vignette & Scanlines */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} 
      />

      {/* Layer 3: Content */}
      <div className="relative z-30 text-center px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-full bg-cyan-900/10 backdrop-blur-sm">
             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
             <span className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase">System Online</span>
          </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]"
            style={{ fontFamily: "AetherionV1, sans-serif", textShadow: "0 0 40px rgba(6,182,212,0.3)" }}>
          <GlitchText text="FORGE YOUR" /> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
             LEGEND
          </span>
        </h1>

        <motion.p 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 0.4 }}
           className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Explore a world fractured by celestial power. Command the Void, master the Elements, and restore the balance.
        </motion.p>

        <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ delay: 0.6 }}
        >
          <Link to="/play" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-600 font-lg rounded-sm hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] overflow-hidden">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-3">
              INITIATE PROTOCOL
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

export default HeroSection;