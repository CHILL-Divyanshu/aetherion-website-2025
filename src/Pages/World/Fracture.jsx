import React, { useMemo } from "react";

const FRACTURE_DATA = {
  title: "The Fracture",
  description:
    "The Fracture is where reality itself split under the weight of cosmic imbalance. Shards of energy float in defiance of gravity, and echoes of the ancient war hum through every gust of wind. Only the bravest dare step across its unstable surface — for within its glowing veins lies the key to Aetherion's rebirth... or ruin.",
  imageSrc: "/assets/world/fracture.jpg",
  imageAlt: "The Fracture",
};

const Fracture = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-950 via-slate-900 to-gray-800 text-gray-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-extrabold text-indigo-400 mb-6 tracking-wide">
        {FRACTURE_DATA.title}
      </h1>
      <p className="max-w-3xl text-center text-lg leading-relaxed text-slate-300">
        {FRACTURE_DATA.description}
      </p>
      <div className="mt-10">
        <img
          src={FRACTURE_DATA.imageSrc}
          alt={FRACTURE_DATA.imageAlt}
          className="rounded-2xl shadow-2xl max-w-2xl"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Fracture;