import React from "react";
import { motion } from "framer-motion";
import GuardianCard from "../ui/GuardianCard";

const GUARDIANS = [
  {
    name: "Aetherion",
    role: "Celestial Guardian",
    description:
      "Embodies the energy of stars and cosmic balance. Commands light and time to protect all realms.",
    image: "/assets/guardians/aetherion.png",
  },
  {
    name: "Nyxara",
    role: "Shadow Empress",
    description:
      "Ruler of the twilight realm, manipulating illusions and shadows to maintain equilibrium.",
    image: "/assets/guardians/nyxara.png",
  },
  {
    name: "Kaelion",
    role: "Infernal Sentinel",
    description:
      "Forged in eternal flame, Kaelion wields molten fury and guards the gates of rebirth.",
    image: "/assets/guardians/kaelion.png",
  },
  {
    name: "Lunaris",
    role: "Ethereal Watcher",
    description:
      "Silent observer of dreams, she channels the serenity of the moon to heal and guide lost souls.",
    image: "/assets/guardians/lunaris.png",
  },
];

const RosterSection = () => {
  return (
    <section
      id="roster"
      className="relative py-24 bg-linear-to-b from-gray-950 via-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-6 lg:px-10">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-orange-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Guardian Roster
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GUARDIANS.map((guardian, index) => (
            <motion.div
              key={guardian.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GuardianCard {...guardian} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-linear-to-t from-purple-800/10 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default RosterSection;