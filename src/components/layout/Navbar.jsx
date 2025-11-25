import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

// RESTORED: All original links
const NAV_LINKS = [
  { name: "News", path: "/#intel", isAnchor: true },
  { name: "World", path: "/world" },
  { name: "Guardians", path: "/guardians" },
  { name: "Dev Hub", path: "/dev-hub" },
  { name: "Community", path: "/community" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const location = useLocation();

  // Smart Scroll Logic (Kept this as it improves UX without changing style)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    if (latest > previous && latest > 150) {
      setIsHidden(true); // Hide on scroll down
    } else {
      setIsHidden(false); // Show on scroll up
    }
    lastYRef.current = latest;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 w-full max-w-7xl mx-auto px-4"
      >
        {/* RESTORED: Original Glassmorphism Classes */}
        <div className="navbar-glow relative flex items-center justify-between px-6 py-4 rounded-xl backdrop-blur-md bg-black/40 border border-white/10 shadow-lg transition-all duration-300">
          
          {/* RESTORED: Original Text-Only Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-extrabold gradient-text tracking-wider group-hover:opacity-80 transition-opacity">
              AETHERION
            </span>
          </Link>

          {/* Desktop Navigation - Full List */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <DesktopNavLink key={link.name} link={link} />
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-cyan-400 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl pt-28 px-6"
          >
            <div className="flex flex-col gap-8 items-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <MobileNavLink link={link} onClick={() => setIsOpen(false)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper: Desktop Link with Active State Glow
const DesktopNavLink = ({ link }) => {
  // Check if link is active
  const isActive = useLocation().pathname === link.path;
  
  const content = (
    <span className={`relative text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-gray-300 hover:text-white"}`}>
      {link.name}
      {/* The Glow Dot/Line from your original design preference */}
      {isActive && (
        <motion.span 
          layoutId="nav-glow"
          className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </span>
  );

  return link.isAnchor ? (
    <a href={link.path} className="py-2">{content}</a>
  ) : (
    <NavLink to={link.path} className="py-2">{content}</NavLink>
  );
};

// Helper: Mobile Link
const MobileNavLink = ({ link, onClick }) => {
  const content = (
    <span className="text-2xl font-bold uppercase tracking-widest text-gray-300 hover:text-cyan-400 transition-colors">
      {link.name}
    </span>
  );

  return link.isAnchor ? (
    <a href={link.path} onClick={onClick}>{content}</a>
  ) : (
    <NavLink to={link.path} onClick={onClick}>{content}</NavLink>
  );
};

export default Navbar;