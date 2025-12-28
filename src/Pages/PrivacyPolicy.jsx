import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import noiseImg from "../assets/images/Texture/noise-v1.jpg";

const Section = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="mb-8 p-6 bg-[#080c14]/80 border border-white/5 rounded-lg hover:border-cyan-500/30 transition-colors duration-300"
  >
    <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
      {title}
    </h3>
    <div className="text-gray-400 leading-relaxed font-light text-sm md:text-base space-y-4">
      {children}
    </div>
  </motion.div>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#02060c] text-white relative overflow-hidden font-sans selection:bg-cyan-500/30 py-24">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: `url(${noiseImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Header */}
        <div className="mb-12 text-center">
          <Link to="/">
            <Button variant="ghost" className="mb-8">← Return to Base</Button>
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white"
            style={{ fontFamily: "AetherionV1, sans-serif" }}
          >
            Privacy <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Protocols</span>
          </motion.h1>

          <p className="text-cyan-500/60 font-mono text-xs uppercase tracking-[0.3em]">
            // TL;DR: We respect your data // Status: Chill
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">

          <Section title="1. What Data We Grab (And What We Don’t)" delay={0.1}>
            <p>
              When you roam around the Aetherion universe, we collect some basic tech stuff so the site doesn’t implode.
              Think browser type, device info, and how you interact with the UI.
            </p>
            <p>
              If you sign up, we store your alias, email, and login info securely.
              No stalking. No spying. Definitely no reading your thoughts at 3am.
            </p>
          </Section>

          <Section title="2. Why We Even Need Your Data" delay={0.2}>
            <p>
              Your data is used strictly for making things work and not feel broken. That includes:
            </p>
            <ul className="list-disc list-inside ml-4 marker:text-cyan-500">
              <li>Keeping the site fast, smooth, and not embarrassing.</li>
              <li>Protecting your account from random chaos.</li>
              <li>Sending legit updates about features, events, or changes.</li>
            </ul>
            <p>
              We are not farming data for weird reasons. That’s not our arc.
            </p>
          </Section>

          <Section title="3. Cookies (No Calories Included)" delay={0.3}>
            <p>
              Yep, we use cookies. The boring digital kind.
              They help remember your session so you don’t have to log in every five seconds.
            </p>
            <p>
              You can turn them off in your browser, but some features may start acting… quirky.
            </p>
          </Section>

          <Section title="4. Third-Party Tools (Trusted Allies)" delay={0.4}>
            <p>
              We do NOT sell your data. Not now. Not ever. Not for a bag.
            </p>
            <p>
              We do use trusted third-party services for things like hosting and analytics so the platform stays alive and improves.
              They only get what’s necessary and are required to keep it locked down.
            </p>
          </Section>

          <Section title="5. How We Protect Your Info" delay={0.5}>
            <p>
              Your data is protected using modern security practices and encryption.
              Is the internet 100% hack-proof? No. Anyone saying that is lying.
            </p>
            <p>
              But we actively monitor, update, and take security seriously.
              If something goes wrong, we move fast. No ignoring, no excuses.
            </p>
          </Section>

          <div className="text-center pt-10 border-t border-white/10 mt-12">
            <p className="text-gray-500 text-sm mb-4">
              Got questions, concerns, or just want the lore-accurate explanation?
            </p>
            <a
              href="mailto:support@aetherion.com"
              className="text-cyan-400 font-bold hover:text-white transition-colors"
            >
              support@aetherion.com
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
