import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "@/components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Home Page Sections
import HeroSection from "./components/sections/HeroSection";
import NewsSection from "./components/sections/NewsSection";
import GuardiansPreview from "./components/sections/GuardiansPreview";
import WorldPreview from "./components/sections/WorldPreview";

//World Pages
import WorldPage from "./Pages/World/WorldIndex";
import FracturePage from "@/Pages/World/Fracture"; 
import BossDetail from "./Pages/World/BossDetail";

//Guardian Pages
import GuardiansPage from "./Pages/Guardians/GuardianIndex";
import GuardianDetail from "./Pages/Guardians/GuardianDetail";

// Core Pages
import DevHubPage from "./Pages/DevHub";
import CommunityPage from "./Pages/Community";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService";

function HomePageContent() {
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
        <Route path="/bosses/:id" element={<BossDetail />} />

        {/* Guardians */}
        <Route path="/guardians" element={<GuardiansPage />} />
        <Route path="/guardians/:id" element={<GuardianDetail />} />

        {/* General Pages */}
        <Route path="/dev-hub" element={<DevHubPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;