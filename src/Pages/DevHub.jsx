import React from "react";
import { motion } from "framer-motion";
// FIX: Correct import paths
import PageHeader from "../components/layout/PageHeader";

const ROADMAP = [
  { phase: "Phase 1", title: "Prototype", status: "complete", items: ["Core Combat", "Skill System"] },
  { phase: "Phase 2", title: "Vertical Slice", status: "active", items: ["Crystal Spires Level", "Valerius Model"] },
  { phase: "Phase 3", title: "Production", status: "pending", items: ["Full Story Mode", "Multiplayer Alpha"] },
];

const StatusBadge = ({ status }) => {
  const styles = {
    complete: "bg-green-500/20 text-green-400 border-green-500/50",
    active: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50 animate-pulse",
    pending: "bg-gray-700/20 text-gray-500 border-gray-700/50"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

const DevHubPage = () => {
  return (
    <>
      <PageHeader 
        title="Developer Hub" 
        subtitle="Tracking the evolution of the Aetherion universe."
        marqueeText="SYSTEM LOGS"
      />

      <main className="bg-black py-24 text-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Timeline Container */}
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 space-y-16">
            
            {ROADMAP.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Node */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${item.status === 'active' ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_15px_cyan]' : 'bg-slate-900 border-slate-600'}`} />

                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl backdrop-blur-sm hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{item.phase}</span>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  
                  <ul className="space-y-2">
                    {item.items.map((task, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'complete' ? 'bg-green-500' : 'bg-slate-600'}`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </main>
    </>
  );
};

export default DevHubPage;