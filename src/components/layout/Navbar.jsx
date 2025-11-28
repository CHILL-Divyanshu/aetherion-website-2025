import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { name: "Intel", path: "/#news", isAnchor: true },
  { name: "World Map", path: "/world" },
  { name: "Guardians", path: "/guardians" },
  { name: "Dev Log", path: "/dev-hub" },
  { name: "Community", path: "/community" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#02060c]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-white leading-none">
                AETHERION
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-500 uppercase">
                System v2.0
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink key={link.name} link={link} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/play" className="relative px-6 py-2 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors clip-path-slant">
              Play Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <MobileNavLink key={link.name} link={link} onClick={() => setIsOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DesktopNavLink = ({ link }) => {
  const isActive = useLocation().pathname === link.path;
  return (
    link.isAnchor ? 
    <a href={link.path} className={`px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${isActive ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}>
      {link.name}
    </a> :
    <NavLink to={link.path} className={({ isActive }) => `px-5 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${isActive ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}>
      {link.name}
    </NavLink>
  );
};

const MobileNavLink = ({ link, onClick }) => (
  <NavLink to={link.path} onClick={onClick} className="text-3xl font-black text-white uppercase tracking-tighter hover:text-cyan-400">
    {link.name}
  </NavLink>
);

export default Navbar;