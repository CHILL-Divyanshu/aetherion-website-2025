import React from 'react';
import '/src/styles/GridBackground.css';

/**
 * Creates a futuristic, glowing grid with cyberpunk aesthetic
 * Should be placed inside a relative positioned container
 */
const GridBackground = () => {
  return (
    <div className="grid-background-wrapper">
      {/* Grid lines container */}
      <div className="grid-lines"></div>
      
      {/* Glow effect overlay */}
      <div className="grid-glow"></div>
      
      {/* Accent glow (purple) */}
      <div className="grid-accent"></div>
    </div>
  );
};

export default GridBackground;