import React, { useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import CyberButton, { PlayIcon } from "../ui/CyberButton";

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
  const navigate = useNavigate();

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
          
          {/* --- LEFT: LOGO --- */}
          {/* RESTORED: Text is now visible on ALL screens (removed 'hidden sm:flex') */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 relative z-50">
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

          {/* --- RIGHT SIDE CONTAINER --- */}
          <div className="flex flex-1 items-center justify-end gap-8 lg:ml-12">
            
            {/* 1. DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <DesktopNavLink key={link.name} link={link} />
              ))}
            </div>

            {/* 2. PLAY BUTTON WRAPPER (DESKTOP ONLY) */}
            {/* Hidden on Mobile/Tablet -> They use the Hero Section button instead */}
            <div className="hidden lg:flex relative items-center justify-center h-full w-[224px] shrink-0">
               <div className="absolute transform scale-[0.7]">
                  <CyberButton 
                    variant="play"
                    text="PLAY NOW"
                    icon={PlayIcon}
                    onClick={() => navigate('/play')}
                  />
               </div>
            </div>

            {/* 3. HAMBURGER (Mobile/Tablet Only) */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-1 ml-2">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

          </div>
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
            <div className="flex flex-col gap-8 items-center text-center mt-10">
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

// ... (Keep DesktopNavLink and MobileNavLink same as before)
const DesktopNavLink = ({ link }) => {
  const isActive = useLocation().pathname === link.path;
  const commonClasses = `whitespace-nowrap px-2 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${isActive ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`;
  return link.isAnchor ? <a href={link.path} className={commonClasses}>{link.name}</a> : <NavLink to={link.path} className={({ isActive }) => `whitespace-nowrap px-2 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-cyan-400 ${isActive ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400"}`}>{link.name}</NavLink>;
};

const MobileNavLink = ({ link, onClick }) => (
  <NavLink to={link.path} onClick={onClick} className="text-3xl font-black text-white uppercase tracking-tighter hover:text-cyan-400">
    {link.name}
  </NavLink>
);

export default Navbar;