import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import noiseImg from "../assets/images/Texture/noise-v1.jpg";

const Section = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="mb-10 relative pl-8 border-l-2 border-white/10 hover:border-cyan-500 transition-colors duration-300"
  >
    <h3
      className="text-xl font-black text-white mb-3 uppercase tracking-wider"
      style={{ fontFamily: "AetherionV1, sans-serif" }}
    >
      {title}
    </h3>
    <div className="text-gray-400 leading-relaxed font-light text-sm md:text-base space-y-4">
      {children}
    </div>
  </motion.div>
);

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#02060c] text-white relative overflow-hidden font-sans selection:bg-cyan-500/30 py-24">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{ backgroundImage: `url(${noiseImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Header */}
        <div className="mb-16">
          <Link to="/">
            <Button variant="ghost" className="mb-8">← Return to Base</Button>
          </Link>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white"
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            Operational <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Terms</span>
          </motion.h1>

          <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-8"></div>

          <p className="text-gray-400 max-w-2xl">
            By entering the Aetherion Network, you’re basically saying “yeah, I’m cool with this.”
            If you’re not, that back button is your emergency exit.
          </p>
        </div>

        {/* Content */}
        <div className="bg-[#080c14] border border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

          <div className="relative z-10">

            <Section title="1. Agreeing to the Vibe" delay={0.1}>
              <p>
                Using Aetherion means you accept these terms. All of them.
                If you disagree, you’re free to log out and touch some grass.
              </p>
            </Section>

            <Section title="2. Accounts & Responsibility" delay={0.2}>
              <p>
                When you create an account, give real info and keep your password safe.
                If someone hijacks your account because you shared your login… that’s on you.
              </p>
              <p>
                Pro tip: “password123” is not elite Guardian behavior.
              </p>
            </Section>

            <Section title="3. Don’t Be That Person" delay={0.3}>
              <p>
                While you’re here, play fair and act normal. That means no:
              </p>
              <ul className="list-disc list-inside ml-4 marker:text-cyan-500 space-y-2 mt-2">
                <li>Hacking, exploiting, or trying to speedrun a ban.</li>
                <li>Harassing other players or starting unnecessary drama.</li>
                <li>Abusing bugs for unfair advantages. Yes, we can tell.</li>
              </ul>
              <p>
                Basically, don’t ruin the game for everyone else.
              </p>
            </Section>

            <Section title="4. Our Stuff Is Our Stuff" delay={0.4}>
              <p>
                All visuals, lore, characters, code, and vibes belong to the Aetherion Project.
                You can enjoy them, but you can’t steal, resell, or remix them like it’s a free NFT.
              </p>
            </Section>

            <Section title="5. Losing Access" delay={0.5}>
              <p>
                If you break these rules, we can suspend or remove your access.
                No dramatic trial arc required.
              </p>
            </Section>

            <Section title="6. Reality Check" delay={0.6}>
              <p>
                Aetherion is provided “as is.”
                We’re not responsible for lost data, downtime, lag spikes,
                or existential thoughts triggered at 3am.
              </p>
            </Section>

          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-600 font-mono">
          LAST PROTOCOL UPDATE: 2025.10.27 // SECTOR 7
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;
