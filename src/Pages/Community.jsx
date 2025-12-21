import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2 } from "lucide-react";
import gameLore from "../data/context_aetherion.txt?raw";

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
  const [lastSubmitted, setLastSubmitted] = useState("");

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);
    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  const handleForge = async () => {
    const currentIdea = idea.trim();
    if (!currentIdea) return;
    if (currentIdea === lastSubmitted && generated) return;

    setLoading(true);
    setGenerated(null);
    
    try {
      // Initialize Gemini API
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Contextual Prompt for Aetherion
      const prompt = `
        You are the "Idea Forge" AI for the game "Aetherion".
        Here is the core context for the game universe:
        ---
        ${gameLore}
        ---

        Task: Generate a creative game item, ability, or lore snippet based on this user input: "${idea}"
        
        Output Format: Return ONLY a raw JSON object (no markdown) with these keys:
        - "title": A cool, lore-accurate name.
        - "desc": A short, exciting description (max 2 sentences).
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Robust JSON parsing: Extract JSON object from potential markdown/text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setGenerated(JSON.parse(jsonMatch[0]));
        setLastSubmitted(currentIdea);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (error) {
      console.error("Forge Error:", error);
      setGenerated({ title: "Forge Malfunction", desc: "The Aether currents are unstable. Please check your connection or API key." });
    } finally {
      setLoading(false);
    }
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
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g. A sword made of starlight..."
                    className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 pr-10 text-white focus:border-cyan-500 focus:outline-none"
                  />
                  {/* Status Dot */}
                  <div 
                    className={`absolute right-3 top-[30px] -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      isOnline 
                        ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" // Connected: Glowing
                        : "bg-gray-600 opacity-50" // Offline: Greyed out
                    }`}
                  />
                </div>
                <Button 
                  onClick={handleForge} 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Forging...
                    </span>
                  ) : "Generate"}
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