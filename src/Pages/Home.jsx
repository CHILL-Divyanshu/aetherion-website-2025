import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import GuardiansPreview from "../components/sections/GuardiansPreview";
import WorldPreview from "../components/sections/WorldPreview";
import CodexSection from "../components/sections/CodexSection";
import NewsSection from "../components/sections/NewsSection";
import { SITE_NAME, SITE_TAGLINE } from "../utils/constants";

const usePageObserver = () => {
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

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, []);
};

function Home() {
  usePageObserver();

  return (
    <>
      <Navbar />

      <HeroSection
        title={SITE_NAME}
        tagline={SITE_TAGLINE}
        buttonText="Enter the World"
        link="/world"
      />

      <main className="bg-bg-dark text-white overflow-hidden">
        <section id="guardians" className="fade-in-section">
          <GuardiansPreview />
        </section>

        <section id="world" className="fade-in-section">
          <WorldPreview />
        </section>

        <section id="codex" className="fade-in-section">
          <CodexSection />
        </section>

        <section id="news" className="fade-in-section">
          <NewsSection />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;