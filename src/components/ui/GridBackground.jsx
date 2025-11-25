import React from 'react';

const GridBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-black perspective-1000">
      
      {/* 1. The Moving Grid Plane */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:50px_50px] [transform-origin:center_top] [transform:rotateX(60deg)_translateY(-100px)] animate-grid-flow opacity-20" />

      {/* 2. Horizon Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black via-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      
      {/* 3. Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)]" />

      {/* Animation Style Injection */}
      <style>{`
        @keyframes grid-flow {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(50px); }
        }
        .animate-grid-flow {
          animation: grid-flow 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GridBackground;