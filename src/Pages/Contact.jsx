import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// FIX: Correct import paths
import Button from "../components/ui/Button";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="min-h-screen bg-black text-white relative flex items-center justify-center overflow-hidden py-24">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "AetherionV1, sans-serif" }}
           >
            Contact <span className="inline-block legend-gradient pr-2 [text-rendering:optimizeLegibility]">Command</span>
          </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you are reporting a bug, suggesting a feature, or looking to collaborate, our channels are open.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">✉️</span>
                <span>contact@aetherion.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">🌍</span>
                <span>New Delhi, India (HQ)</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                  <p className="text-gray-400">We will respond shortly, Guardian.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Identity</label>
                    <input type="text" required className="w-full bg-black/50 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Frequency</label>
                    <input type="email" required className="w-full bg-black/50 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                    <textarea rows="4" required className="w-full bg-black/50 border border-slate-700 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Transmission content..." />
                  </div>
                  <Button type="submit" className="w-full">Send Transmission</Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;