import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const SOCIAL_PLATFORMS = [
  {
    name: "Discord",
    description:
      "Join our main community hub for direct chat with the devs and other fans.",
    link: "#",
  },
  {
    name: "X / Twitter",
    description: "For real-time updates, sneak peeks, and daily content.",
    link: "#",
  },
  {
    name: "YouTube",
    description: "Watch trailers, dev diaries, and gameplay showcases.",
    link: "#",
  },
  {
    name: "Instagram",
    description: "A visual journey through the art and world of Aetherion.",
    link: "#",
  },
];

const FAN_ART_PLACEHOLDERS = [
  "Fan art of Valerius",
  "A landscape painting",
  "A weapon design",
  "Character sketch",
];

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

const CommunityPage = () => {
  const ideaInputRef = useRef(null);
  const [ideaOutput, setIdeaOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  usePageObserver();

  const handleGenerateIdea = useCallback(() => {
    const idea = ideaInputRef.current?.value?.trim();
    if (!idea) return;

    setIdeaOutput(`<p class="p-4">Forging your concept...</p>`);
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      const concept = `
        <h4 class="text-xl font-semibold text-cyan-400 mb-2">The Sentinel's Echo</h4>
        <p>A shield forged from a fallen Guardian's memory. It starts weak, but with every blow it successfully blocks, it "learns" the attack, gaining a shimmering, ethereal layer of that damage type. After absorbing enough energy, the wielder can unleash the stored power in a devastating nova, its element reflecting the last attack type learned.</p>
      `;
      setIdeaOutput(concept);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 flex items-center justify-center z-100 transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin" />
      </div>

      <PageHeader
        title="Join the Community"
        subtitle="Aetherion is built with its players. Connect with us, share your creativity, and become part of the journey."
        marqueeText="COMMUNITY HUB"
      />

      <main className="bg-linear-to-b from-slate-950 via-gray-900 to-slate-800 py-20">
        <div className="container mx-auto px-6 lg:px-10">
          {/* SOCIALS */}
          <section id="socials" className="mb-28 fade-in-section text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Connect With Us
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Follow our development, join the conversation, and be the first to
              see exclusive content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SOCIAL_PLATFORMS.map((platform) => (
                <Card key={platform.name} className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    {platform.name}
                  </h3>
                  <p className="text-gray-400 mt-2">{platform.description}</p>
                  <a
                    href={platform.link}
                    className="inline-block mt-4 text-sm text-cyan-300 hover:text-cyan-200 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit →
                  </a>
                </Card>
              ))}
            </div>
          </section>

          {/* SHAPE THE WORLD */}
          <section id="shape-the-world" className="mb-28 fade-in-section text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Shape The World
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Your creativity can inspire the future of Aetherion. Submit an idea
              and let our AI help forge it into a game-ready concept.
            </p>

            <div className="max-w-3xl mx-auto bg-black/20 p-8 rounded-xl shadow-xl">
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                  ref={ideaInputRef}
                  type="text"
                  placeholder="e.g., A sword that drinks starlight"
                  className="grow bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
                <Button onClick={handleGenerateIdea}>✨ Forge My Idea</Button>
              </div>

              <div
                className="bg-gray-900/40 border border-gray-700 rounded-lg p-4 text-gray-300 text-left"
                dangerouslySetInnerHTML={{ __html: ideaOutput }}
              />
            </div>
          </section>

          {/* FAN ART SHOWCASE */}
          <section id="fan-art" className="fade-in-section text-center">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Community Showcase
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              We're constantly amazed by your creativity. Share your art with{" "}
              <span className="text-cyan-400 font-semibold">#AetherionArt</span>!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {FAN_ART_PLACEHOLDERS.map((altText) => (
                <div
                  key={altText}
                  className="bg-gray-800/40 rounded-lg h-[250px] flex items-center justify-center border border-gray-700 hover:border-cyan-400 transition"
                >
                  <span className="text-gray-500 italic text-sm">{altText}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;