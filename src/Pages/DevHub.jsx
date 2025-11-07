import React, { useEffect, useCallback, useMemo } from "react";
import PageHeader from "@/components/layout/PageHeader";
import { motion } from "framer-motion";

const PHILOSOPHY_POINTS = [
  {
    title: "Community First",
    description:
      "We build <strong>with</strong> our players, not just for them. Your feedback shapes the world.",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Every aspect, from art to code, is crafted with the <strong>highest attention</strong> to detail.",
  },
  {
    title: "Ethical Monetization",
    description:
      "No pay-to-win. We respect your time and money — <strong>cosmetics and expansions only.</strong>",
  },
  {
    title: "A Living World",
    description:
      "Launch is just the beginning. We're committed to a <strong>long-term</strong> roadmap of updates and stories.",
  },
];

const ROADMAP_ITEMS = [
  {
    phase: "Phase 1: Prototype",
    date: "Q4 2024",
    status: "Complete",
    color: "text-green-400",
    details: [
      "Core combat system validated",
      "Aether skill system proof-of-concept",
      "Basic enemy AI implemented",
    ],
  },
  {
    phase: "Phase 2: Vertical Slice",
    date: "Q1–Q3 2025",
    status: "In Progress",
    color: "text-cyan-400",
    details: [
      'First playable level: "The Crystal Spires"',
      "Valerius model & animations complete",
      "Community testers onboarding",
    ],
  },
  {
    phase: "Phase 3: Production",
    date: "Q4 2025 – 2026",
    status: "Upcoming",
    color: "text-gray-500",
    details: [
      "Full content creation begins",
      "Alpha and Beta testing phases",
      "Story and quests implementation",
    ],
  },
];

const useIntersectionObserver = () => {
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

const PhilosophyCard = ({ point, index }) => (
  <motion.div
    key={index}
    className="p-6 bg-black/30 backdrop-blur-md rounded-xl text-center border border-gray-700 hover:border-cyan-400 transition-all"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
    <p
      className="text-gray-400"
      dangerouslySetInnerHTML={{ __html: point.description }}
    />
  </motion.div>
);

const RoadmapCard = ({ item, index }) => (
  <div
    key={index}
    className={`relative mb-16 flex items-start ${
      index % 2 !== 0 ? "md:flex-row-reverse" : ""
    }`}
  >
    {/* Date */}
    <div
      className={`w-full md:w-1/2 ${
        index % 2 !== 0
          ? "md:pl-8 text-left"
          : "md:pr-8 text-right"
      } hidden md:block`}
    >
      <p className="text-gray-400">{item.date}</p>
    </div>

    {/* Roadmap Item */}
    <motion.div
      className={`w-full md:w-1/2 ${
        index % 2 !== 0
          ? "md:pr-8 md:text-right"
          : "md:pl-8 md:text-left"
      } ml-12 md:ml-0`}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className={`p-6 rounded-lg bg-gray-900/60 backdrop-blur border ${
          item.status === "In Progress"
            ? "border-cyan-400"
            : "border-gray-700"
        }`}
      >
        <h3 className="text-2xl font-bold text-white mb-1">{item.phase}</h3>
        <p className="text-gray-400 mb-2">
          Status:{" "}
          <span className={`${item.color} font-semibold`}>
            {item.status}
          </span>
        </p>
        <ul className="list-disc list-inside text-gray-400 text-sm">
          {item.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  </div>
);

const DevHubPage = () => {
  useIntersectionObserver();

  return (
    <>
      <PageHeader
        title="Development Hub"
        subtitle="Track the evolution of Aetherion and stay updated with our latest progress."
        marqueeText="THE DEV HUB"
      />

      <main className="bg-linear-to-b from-gray-950 via-gray-900 to-black py-20 text-gray-200">
        <div className="container mx-auto px-6 lg:px-10">
          {/* Development Philosophy */}
          <section id="philosophy" className="mb-28 fade-in-section">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                Our Development Philosophy
              </h2>
              <p className="text-lg text-gray-400 mt-2">
                More than just a game — it's a commitment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PHILOSOPHY_POINTS.map((point, index) => (
                <PhilosophyCard key={point.title} point={point} index={index} />
              ))}
            </div>
          </section>

          {/* Roadmap Section */}
          <section id="roadmap" className="fade-in-section">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                Development Roadmap
              </h2>
              <p className="text-lg text-gray-400 mt-2">
                Our journey toward launch and beyond. This roadmap evolves with
                every milestone we hit.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-cyan-400/30" />

              {ROADMAP_ITEMS.map((item, index) => (
                <RoadmapCard key={item.phase} item={item} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default DevHubPage;