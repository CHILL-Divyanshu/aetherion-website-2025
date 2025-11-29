import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";

const SOCIALS = [
  { name: "Discord", desc: "Chat with devs & fans", color: "border-indigo-500/50 text-indigo-400" },
  { name: "Twitter", desc: "Real-time updates", color: "border-sky-500/50 text-sky-400" },
  { name: "YouTube", desc: "Dev diaries & trailers", color: "border-red-500/50 text-red-400" },
  { name: "Instagram", desc: "Visual arts showcase", color: "border-pink-500/50 text-pink-400" },
];

const CommunityPage = () => {
  const [idea, setIdea] = useState("");
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForge = () => {
    if (!idea.trim()) return;
    setLoading(true);
    setGenerated(null);
    
    // Simulate AI "Thinking" time
    setTimeout(() => {
      setLoading(false);
      setGenerated({
        title: "The Sentinel's Echo",
        desc: "A shield forged from a fallen Guardian's memory. It absorbs kinetic energy and releases it as a devastating nova."
      });
    }, 2000);
  };

  return (
    <>
      <PageHeader
        title="Community Hub"
        subtitle="Connect, create, and shape the world of Aetherion."
        marqueeText="JOIN THE VANGUARD"
      />

      <main className="bg-black py-5 text-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* 1. Social Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {SOCIALS.map((social, idx) => (
              <motion.a
                key={social.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-8 rounded-xl bg-slate-900/50 backdrop-blur border ${social.color} hover:bg-white/5 transition-all cursor-pointer group`}
              >
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                  {social.name}
                </h3>
                <p className="text-sm text-gray-400 mt-2">{social.desc}</p>
              </motion.a>
            ))}
          </div>

          {/* 2. Idea Forge */}
          <section className="relative mb-32">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 blur-3xl -z-10" />
            
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-white mb-4">The Idea Forge</h2>
              <p className="text-gray-400">Submit a prompt, and let our system generate a game concept.</p>
            </div>

            <div className="max-w-2xl mx-auto bg-slate-900/80 border border-white/10 p-8 rounded-2xl shadow-2xl">
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. A sword made of starlight..."
                  className="flex-1 bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
                <Button onClick={handleForge} disabled={loading}>
                  {loading ? "Forging..." : "Generate"}
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {generated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-black/40 border border-cyan-500/30 p-6 rounded-xl"
                  >
                    <h4 className="text-xl font-bold text-cyan-400 mb-2">{generated.title}</h4>
                    <p className="text-gray-300">{generated.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default CommunityPage;