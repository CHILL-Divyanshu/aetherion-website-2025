import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "Join us on Discord", icon: "fa-discord", href: "#" },
  { label: "Follow on X (Twitter)", icon: "fa-x-twitter", href: "#" },
  { label: "Watch on YouTube", icon: "fa-youtube", href: "#" },
  { label: "Explore Instagram", icon: "fa-instagram", href: "#" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  }, [formData]);

  const currentYear = new Date().getFullYear();

  return (
    <section className="relative min-h-screen bg-linear-to-b from-black via-slate-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-72 h-72 bg-cyan-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-24 right-24 w-96 h-96 bg-indigo-700/20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Contact <span className="text-cyan-400">Aetherion</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you're a player, developer, or dreamer — we'd love to hear from you.
            Reach out with your ideas, feedback, or collaboration inquiries.
          </p>
        </motion.div>

        {/* Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-black/40 backdrop-blur-xl border border-slate-800/60 p-8 rounded-2xl shadow-xl space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Valerius the Bone King"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@aetherion.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-900/60 border border-slate-700 rounded-lg text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full cta-button inline-flex items-center gap-3 group text-lg font-bold py-5 px-10 rounded-xl transition-all duration-300 hover:gap-4 active:scale-95"
            >
              Send Message
            </button>
          </motion.form>

          {/* Info / Social Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-cyan-300 mb-3">
                Connect with Us
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Join our creative circles and be part of the Aetherion community.
                Share your art, ideas, or even code. The world of Aetherion grows
                stronger with every mind that joins it.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition duration-300"
                >
                  <i className={`fa-brands ${link.icon} text-xl`} />
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-8 border-t border-slate-700/50">
              <p className="text-gray-500 text-sm">
                © {currentYear} Aetherion Interactive. Crafted with Aether
                and caffeine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;