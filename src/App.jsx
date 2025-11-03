import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import WorldPreview from './components/WorldPreview';
import GuardiansPreview from './components/GuardiansPreview';
import Footer from './components/Footer';

import WorldPage from './Pages/WorldPage';
import GuardiansPage from './Pages/GuardiansPage';
import DevHubPage from './Pages/DevHubPage';
import CommunityPage from './Pages/CommunityPage';

function HomePageContent() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const sections = document.querySelectorAll('.fade-in-section');

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <HomePageContent />
              <Footer />
            </>
          }
        />
        <Route path="/world" element={<WorldPage />} />
        <Route path="/guardians" element={<GuardiansPage />} />
        <Route path="/dev-hub" element={<DevHubPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
