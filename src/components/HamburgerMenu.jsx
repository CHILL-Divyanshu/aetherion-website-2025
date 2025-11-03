import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "News", path: "/#intel", isAnchor: true },
  { name: "World", path: "/world" },
  { name: "Guardians", path: "/guardians" },
  { name: "Dev Hub", path: "/dev-hub" },
  { name: "Community", path: "/community" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Detect clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const containerVariants = {
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
    exit: {
      opacity: 0,
      x: "100%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="text-white z-50 p-3 rounded-full bg-black/5 backdrop-blur-sm hover:bg-black/60 transition"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-200" />
        ) : (
          <Menu size={24} className="transition-transform duration-200" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay for outside click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 rounded-[12px]"
            />

            <motion.nav
              ref={menuRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hamburger-glow flex flex-col justify-start items-center py-12 space-y-6"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  {link.isAnchor ? (
                    <a
                      href={link.path}
                      onClick={closeMenu}
                      className="hamburger-link text-2xl"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `hamburger-link text-2xl ${isActive ? "active" : ""}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HamburgerMenu;
