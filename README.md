Aetherion - Official Website

![Aetherion Banner](src/assets/images/Aetherion-World-v2.jpg)

Aetherion is an immersive, high-performance website for the upcoming sci-fi/fantasy game Aetherion. Built with modern web technologies, it serves as the central hub for lore, character rosters, development updates, and community engagement.

The site features a cinematic user interface with 3D parallax effects, holographic data visualizations, and a responsive, mobile-first design that reflects the game's "shattered world" aesthetic.

🚀 Tech Stack

Framework: React (v18+)

Build Tool: Vite

Styling: Tailwind CSS (v4.0)

Animations: Framer Motion

Routing: React Router DOM

Icons: Lucide React

3D/Canvas: HTML5 Canvas (Custom Particle System)

✨ Key Features

Immersive Hero Section: A custom HTML5 Canvas particle system that simulates the game's "Aether" energy field with mouse interaction.

Holographic World Map: An interactive 3D tilt map (WorldContext) that allows users to explore different regions of the shattered world with tooltip data.

Dynamic Character Roster: A filterable grid of Guardians with "Focus Mode" dimming effects and detailed profile pages including animated stat bars and ability breakdowns.

Cinematic Lore Pages: Dedicated lore entries (e.g., "The Fracture") featuring glitch text effects, full-screen parallax backgrounds, and glassmorphic UI.

Smart Navigation: A responsive navbar that auto-hides on scroll to maximize screen real estate and reappears on scroll up.

Performance Optimized: Uses IntersectionObserver and lazy loading strategies to ensure smooth 60fps animations even on lower-end devices.

📂 Project Structure

src/
├── assets/             # Static assets (Images, Fonts, Videos, Audio)
│   ├── fonts/          # Custom fonts (Aetherion-v1.otf)
│   └── images/         # Organized by feature (Guardians, World, News)
├── components/
│   ├── layout/         # Global layout components (Navbar, Footer, PageHeader)
│   ├── sections/       # Page-specific sections (Hero, News, WorldPreview)
│   └── ui/             # Reusable UI atoms (Button, Card, GridBackground)
├── data/               # JSON data layers (guardians.json, loreEntries.json, regions.json)
├── Pages/              # Route components
│   ├── Guardians/      # Roster Index & Detail pages
│   ├── World/          # World Map & Specific Location pages (Fracture)
│   └── General/        # Static pages (About, Contact, DevHub)
├── styles/             # CSS modules and global styles
│   ├── animation.css   # Custom keyframes
│   └── index.css       # Tailwind directives & global variables
└── App.jsx             # Main Router configuration


🛠️ Installation & Setup

Clone the repository:

git clone [https://github.com/your-username/aetherion-website.git](https://github.com/your-username/aetherion-website.git)
cd aetherion-website


Install dependencies:

npm install


Run the development server:

npm run dev


The site will be available at http://localhost:5173.

Build for production:

npm run build


🎨 Design System

Colors:

Cyan (Aether): #06b6d4 (Primary Glow)

Void (Background): #02060c (Deepest Black)

Gold (Legendary): #D4AF37

Typography:

Headings: AetherionV1 (Custom Font) or Rajdhani

Body: Inter (for readability)

Effects:

Glassmorphism (backdrop-blur)

Scanlines & Grid Overlays

Glitch Text

🤝 Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature/new-feature.

Commit your changes: git commit -m 'Add some feature'.

Push to the branch: git push origin feature/new-feature.

Open a Pull Request.

📄 License

This project is proprietary software for the Aetherion game project. All assets (images, lore text, audio) are copyright © 2025 Aetherion Project. Code is available for review purposes only.

Developed by @ChillDivyanshu