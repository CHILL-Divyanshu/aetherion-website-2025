import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "../../styles/global.css";

const NAV_LINKS = [
  { name: "News", path: "/#intel", isAnchor: true },
  { name: "World", path: "/world" },
  { name: "Guardians", path: "/guardians" },
  { name: "Dev Hub", path: "/dev-hub" },
  { name: "Community", path: "/community" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      staggerChildren: 0.08,
    },
  },
  exit: { opacity: 0, x: "100%", transition: { stiffness: 100, damping: 20 } },
};

const LINK_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeMenu]);

  const NavLinkItem = ({ link }) => (
    link.isAnchor ? (
      <a href={link.path} className="nav-link">
        {link.name}
      </a>
    ) : (
      <NavLink
        to={link.path}
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        {link.name}
      </NavLink>
    )
  );

  const MobileNavLink = ({ link }) => (
    <motion.div variants={LINK_VARIANTS}>
      {link.isAnchor ? (
        <a
          href={link.path}
          onClick={closeMenu}
          className="text-xl text-gray-200 hover:text-cyan-400 transition-colors"
        >
          {link.name}
        </a>
      ) : (
        <NavLink
          to={link.path}
          onClick={closeMenu}
          className={({ isActive }) =>
            `text-xl ${
              isActive
                ? "text-cyan-400 font-semibold"
                : "text-gray-200 hover:text-cyan-400"
            } transition-colors`
          }
        >
          {link.name}
        </NavLink>
      )}
    </motion.div>
  );

  return (
    <nav className="navbar-glow fixed top-4 left-0 right-0 z-50 w-full max-w-6xl mx-auto rounded-xl px-5 py-3 backdrop-blur-md bg-black/40 border border-white/10 shadow-lg">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="logo flex items-center gap-3">
          <span className="text-2xl font-extrabold gradient-text tracking-wider">
            AETHERION
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-8 ml-auto">
          {NAV_LINKS.map(link => <NavLinkItem key={link.name} link={link} />)}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="flex md:hidden ml-auto p-3 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/60 transition text-white z-50"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
              onClick={closeMenu}
            />

            <motion.nav
              ref={menuRef}
              variants={CONTAINER_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-3/4 sm:w-2/5 bg-black/60 backdrop-blur-xl z-40 flex flex-col justify-center items-center space-y-8 border-l border-cyan-400/20"
            >
              {NAV_LINKS.map(link => <MobileNavLink key={link.name} link={link} />)}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;