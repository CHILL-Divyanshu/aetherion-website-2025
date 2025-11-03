import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CONFIG = {
  PARTICLE_COUNT: 80,
  PARTICLE_COUNT_MOBILE: 45,
  MAX_VELOCITY: 0.25,
  MIN_PARTICLE_SIZE: 0.8,
  MAX_PARTICLE_SIZE: 3.5,
  CONNECTION_DISTANCE: 120,
  LINE_WIDTH: 0.4,
  LINE_OPACITY_BASE: 0.6,
  PARTICLE_COLOR: 'rgba(6, 182, 212, 0.9)',
  LINE_COLOR_RGB: '6, 182, 212',
  MOUSE_RADIUS: 180,
  MOUSE_REPULSION_FORCE: 1.8
};

function HeroSection() {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particlesArray = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? CONFIG.PARTICLE_COUNT_MOBILE : CONFIG.PARTICLE_COUNT;

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.baseDirectionX = directionX;
        this.baseDirectionY = directionY;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        const mouse = mouseRef.current;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < CONFIG.MOUSE_RADIUS) {
            const force = (CONFIG.MOUSE_RADIUS - distance) / CONFIG.MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            this.directionX += Math.cos(angle) * force * CONFIG.MOUSE_REPULSION_FORCE;
            this.directionY += Math.sin(angle) * force * CONFIG.MOUSE_REPULSION_FORCE;
          }
        }

        this.directionX += (this.baseDirectionX - this.directionX) * 0.05;
        this.directionY += (this.baseDirectionY - this.directionY) * 0.05;

        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
          this.baseDirectionX = -this.baseDirectionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
          this.baseDirectionY = -this.baseDirectionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (CONFIG.MAX_PARTICLE_SIZE - CONFIG.MIN_PARTICLE_SIZE) + CONFIG.MIN_PARTICLE_SIZE;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = (Math.random() * CONFIG.MAX_VELOCITY * 2) - CONFIG.MAX_VELOCITY;
        const directionY = (Math.random() * CONFIG.MAX_VELOCITY * 2) - CONFIG.MAX_VELOCITY;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, CONFIG.PARTICLE_COLOR));
      }
    }

    function connectParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
          const p1 = particlesArray[i];
          const p2 = particlesArray[j];
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distance < CONFIG.CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = Math.max(0, CONFIG.LINE_OPACITY_BASE - (distance / CONFIG.CONNECTION_DISTANCE));
            ctx.strokeStyle = `rgba(${CONFIG.LINE_COLOR_RGB}, ${opacity})`;
            ctx.lineWidth = CONFIG.LINE_WIDTH;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      animationFrameId.current = requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connectParticles();
      particlesArray.forEach(particle => particle.update());
    }

    const handleResize = () => {
      if (!canvas) return;
      const headerElement = canvas.parentElement;
      if (headerElement) {
        canvas.width = headerElement.clientWidth;
        canvas.height = headerElement.clientHeight;
        initParticles();
      }
    };

    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    handleResize();
    animateParticles();
    window.addEventListener('resize', throttledResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', throttledResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <header className="hero-section relative overflow-hidden">
      <canvas
        id="particle-canvas"
        ref={canvasRef}
        className="particle-canvas"
        style={{ display: prefersReducedMotion ? 'none' : 'block' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 pointer-events-none"></div>

      <div className="hero-content relative z-20">
        <div className="inline-block mb-6 animate-fade-in">
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em] px-4 py-2 border border-cyan-400/30 rounded-full backdrop-blur-sm">
            Enter the Shattered World
          </span>
        </div>
        <h1 className="hero-title text-[clamp(3rem,10vw,7rem)] font-black tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
          Forge Your Legend
        </h1>
        <p className="hero-description text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-12 animate-fade-in-up animation-delay-200">
          Welcome to Aetherion, a world shattered by celestial power. Explore the ruins, 
          command immense power, and uncover the truth behind the Fracture.
        </p>
        <div className="hero-cta animate-fade-in-up animation-delay-400">
          <Link 
            to="/community" 
            className="cta-button inline-flex items-center gap-3 group text-lg font-bold py-5 px-10 rounded-xl transition-all duration-300 hover:gap-4 hover:scale-105"
          >
            <span>Join The Community</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
