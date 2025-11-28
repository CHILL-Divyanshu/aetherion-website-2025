import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/sections/HeroSection";
import GuardiansPreview from "../../components/sections/GuardiansPreview";
import WorldPreview from "../../components/sections/WorldPreview";
import NewsSection from "../../components/sections/NewsSection";
import { SITE_NAME, SITE_TAGLINE } from "../../utils/constants"; 

// Global Set to track visited sections during the current session.
const visitedSections = new Set();

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Home = () => {
  const getAnimationProps = (id) => {
    const isVisited = visitedSections.has(id);
    
    return {
      id,
      initial: isVisited ? "visible" : "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-50px" },
      variants: sectionVariants,
      onViewportEnter: () => visitedSections.add(id),
      className: "relative z-10"
    };
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section (Unique Design) */}
      <HeroSection
        title={SITE_NAME}
        tagline={SITE_TAGLINE}
        buttonText="INITIATE PROTOCOL"
        link="/world"
      />

      <main className="bg-[#02060c] text-white overflow-hidden relative">
        
        {/* --- GLOBAL GRAIN TEXTURE --- */}
        {/* This applies a noise/grain effect over the entire background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
             style={{ 
               backgroundImage: "url('/src/assets/images/noise.png')", 
               backgroundRepeat: "repeat",
               backgroundSize: "100px 100px"
             }} 
        />
        
        {/* Background Gradient Mesh */}
        <div className="fixed inset-0 pointer-events-none z-0" 
             style={{ 
               background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))", 
               backgroundSize: "100% 2px, 3px 100%" 
             }} 
        />

        {/* --- SECTIONS (Equal Spacing applied in components) --- */}
        
        <motion.section {...getAnimationProps("news")}>
          <NewsSection />
        </motion.section>

        <motion.section {...getAnimationProps("guardians")} className="border-t border-white/5">
          <GuardiansPreview />
        </motion.section>

        <motion.section {...getAnimationProps("world")} className="border-t border-white/5">
          <WorldPreview />
        </motion.section>

      </main>

      <Footer />
    </>
  );
}

export default Home;