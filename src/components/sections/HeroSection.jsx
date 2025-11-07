import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const CONFIG = {
  PARTICLE_COUNT: 80,
  PARTICLE_COUNT_MOBILE: 45,
  MAX_VELOCITY: 0.25,
  MIN_PARTICLE_SIZE: 0.8,
  MAX_PARTICLE_SIZE: 3.5,
  CONNECTION_DISTANCE: 120,
  LINE_WIDTH: 0.4,
  LINE_OPACITY_BASE: 0.6,
  PARTICLE_COLOR: "rgba(6, 182, 212, 0.9)",
  LINE_COLOR_RGB: "6, 182, 212",
  MOUSE_RADIUS: 180,
  MOUSE_REPULSION_FORCE: 1.8,
};

class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
    this.baseDX = dx;
    this.baseDY = dy;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.shadowBlur = 8;
    ctx.shadowColor = "rgba(6,182,212,0.8)";
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update(ctx, canvas, mouse) {
    if (mouse.x && mouse.y) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < CONFIG.MOUSE_RADIUS) {
        const force = (CONFIG.MOUSE_RADIUS - dist) / CONFIG.MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        this.dx += Math.cos(angle) * force * CONFIG.MOUSE_REPULSION_FORCE;
        this.dy += Math.sin(angle) * force * CONFIG.MOUSE_REPULSION_FORCE;
      }
    }

    this.dx += (this.baseDX - this.dx) * 0.05;
    this.dy += (this.baseDY - this.dy) * 0.05;

    if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}

function HeroSection() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const initParticles = useCallback((canvas, isMobile) => {
    const count = isMobile
      ? CONFIG.PARTICLE_COUNT_MOBILE
      : CONFIG.PARTICLE_COUNT;
    particlesRef.current = Array.from({ length: count }, () => {
      const size =
        Math.random() * (CONFIG.MAX_PARTICLE_SIZE - CONFIG.MIN_PARTICLE_SIZE) +
        CONFIG.MIN_PARTICLE_SIZE;
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * CONFIG.MAX_VELOCITY * 2 - CONFIG.MAX_VELOCITY,
        Math.random() * CONFIG.MAX_VELOCITY * 2 - CONFIG.MAX_VELOCITY,
        size,
        CONFIG.PARTICLE_COLOR
      );
    });
  }, []);

  const connectParticles = useCallback((ctx, canvas) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.CONNECTION_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity =
            CONFIG.LINE_OPACITY_BASE - dist / CONFIG.CONNECTION_DISTANCE / 1.5;
          ctx.strokeStyle = `rgba(${CONFIG.LINE_COLOR_RGB}, ${opacity})`;
          ctx.lineWidth = CONFIG.LINE_WIDTH;
          ctx.stroke();
        }
      }
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    animationFrameRef.current = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    connectParticles(ctx, canvas);
    particlesRef.current.forEach(p => p.update(ctx, canvas, mouseRef.current));
  }, [connectParticles]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    initParticles(canvas, window.innerWidth < 768);
  }, [initParticles]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);
    const canvas = canvasRef.current;
    canvas?.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    });
    canvas?.addEventListener("mouseleave", () => {
      mouseRef.current = { x: null, y: null };
    });

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion, animate, resizeCanvas]);

  return (
    <header className="hero-section relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: prefersReducedMotion ? "none" : "block" }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/40 to-slate-950 z-1" />

      <div className="hero-content relative z-10 text-center px-6 py-20">
        <div className="inline-block mb-6 animate-fade-in">
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em] px-4 py-2 border border-cyan-400/30 rounded-full">
            Enter the Shattered World
          </span>
        </div>

        <h1
          className="text-[clamp(3rem,10vw,7rem)] tracking-tight leading-[0.9] mb-8 text-white animate-fade-in-up"
          style={{
            fontFamily: "AetherionV1, sans-serif",
            letterSpacing: "0.02em",
            textShadow: "0 0 30px rgba(6,182,212,0.4)",
          }}
        >
          Forge Your Legend
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-12 animate-fade-in-up animation-delay-200">
          Welcome to Aetherion, a world shattered by celestial power. Explore
          the ruins, command immense power, and uncover the truth behind the
          Fracture.
        </p>

        <div className="animate-fade-in-up animation-delay-400">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;