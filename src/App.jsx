import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Home Page Sections
import HeroSection from "./components/sections/HeroSection";
import NewsSection from "./components/sections/NewsSection";
import GuardiansPreview from "./components/sections/GuardiansPreview";
import WorldPreview from "./components/sections/WorldPreview";

// Core Pages
import WorldPage from "./Pages/World/Index";
import GuardiansPage from "./Pages/Guardians/Index";
import DevHubPage from "./Pages/DevHub";
import CommunityPage from "./Pages/Community";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";

// Detail Pages
import GuardianDetail from "./Pages/Guardians/GuardianDetail";
// Updated path: Assuming Fracture.jsx is moved to the Pages/World folder
import FracturePage from "./Pages/World/Fracture"; 

function HomePageContent() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-bg-dark py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <NewsSection />
        <GuardiansPreview />
        <WorldPreview />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <HomePageContent />
            </>
          }
        />

        {/* World & Lore */}
        <Route path="/world" element={<WorldPage />} />
        <Route path="/world/fracture" element={<FracturePage />} />

        {/* Guardians */}
        <Route path="/guardians" element={<GuardiansPage />} />
        <Route path="/guardians/:id" element={<GuardianDetail />} />

        {/* General Pages */}
        <Route path="/dev-hub" element={<DevHubPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;