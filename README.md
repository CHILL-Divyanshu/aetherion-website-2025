🌌 Aetherion - Official Website<!-- Tip: Replace the path above with your actual banner image path if different -->Aetherion is an immersive, high-performance website for the upcoming sci-fi/fantasy game Aetherion. Built with modern web technologies, it serves as the central hub for lore, character rosters, development updates, and community engagement.The site features a cinematic user interface with 3D parallax effects, holographic data visualizations, and a responsive, mobile-first design that reflects the game's "shattered world" aesthetic.📸 Project Screenshots<!-- Add your screenshots here! --><!-- Example:  -->Home PageGuardian RosterImmersive Hero SectionDynamic Character GridWorld MapLore DetailHolographic 3D Tilt MapCinematic Storytelling🚀 Tech StackThis project leverages a modern and robust technology stack:⚛️ Framework: React (v18+)⚡ Build Tool: Vite🎨 Styling: Tailwind CSS (v4.0)✨ Animations: Framer Motion🛣️ Routing: React Router DOM🧩 Icons: Lucide React🧊 3D/Canvas: HTML5 Canvas (Custom Particle System)✨ Key Features🎮 Immersive ExperienceHero Section: A custom HTML5 Canvas particle system that simulates the game's "Aether" energy field, reacting to mouse interactions.Holographic World Map: An interactive 3D tilt map (WorldContext) allowing users to explore different regions with detailed tooltips.👥 Character & LoreDynamic Roster: A filterable grid of Guardians with a "Focus Mode" dimming effect.Detailed Profiles: Character pages featuring animated stat bars, ability breakdowns, and immersive backgrounds.Cinematic Lore: Dedicated pages (e.g., "The Fracture") with glitch text effects, full-screen parallax backgrounds, and glassmorphic UI.💻 Technical ExcellenceSmart Navigation: A responsive navbar that auto-hides on scroll to maximize screen real estate.Performance Optimized: Utilizes IntersectionObserver and lazy loading to ensure smooth 60fps animations.Responsive Design: Fully optimized for mobile, tablet, and desktop devices.📂 Project StructureA quick look at the top-level files and directories:src/
├── assets/             # 🖼️ Static assets (Images, Fonts, Videos, Audio)
│   ├── fonts/          # Custom fonts (Aetherion-v1.otf)
│   └── images/         # Organized by feature (Guardians, World, News)
├── components/         # 🧩 Reusable React components
│   ├── layout/         # Global layout (Navbar, Footer, PageHeader)
│   ├── sections/       # Page-specific sections (Hero, News, WorldPreview)
│   └── ui/             # UI atoms (Button, Card, GridBackground)
├── data/               # 📄 JSON data layers (guardians.json, loreEntries.json)
├── Pages/              # 📄 Route components (Views)
│   ├── Guardians/      # Roster Index & Detail pages
│   ├── World/          # World Map & Specific Location pages
│   └── General/        # Static pages (About, Contact, DevHub)
├── styles/             # 🎨 CSS modules and global styles
└── App.jsx             # 🔀 Main Router configuration
🛠️ Installation & SetupFollow these steps to get the project running on your local machine:Clone the repository:git clone [https://github.com/your-username/aetherion-website.git](https://github.com/your-username/aetherion-website.git)
cd aetherion-website
Install dependencies:npm install
Run the development server:npm run dev
The site will be available at http://localhost:5173.Build for production:npm run build
🎨 Design System HighlightsColors:🔵 Cyan (Aether): #06b6d4 (Primary Glow)⚫ Void (Background): #02060c (Deepest Black)🟡 Gold (Legendary): #D4AF37Typography:Headings: AetherionV1 (Custom Font) or RajdhaniBody: Inter (for readability)Visual Effects: Glassmorphism, Scanlines, Grid Overlays, and Glitch Text.🤝 ContributingContributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📄 LicenseThis project is proprietary software for the Aetherion game project. All assets (images, lore text, audio) are copyright © 2025 Aetherion Project. Code is available for review purposes only.<p align="center">Developed with ❤️ by [Your Name/Team]</p>
### **How to add your own images:**

1.  **Capture Screenshots:** Take screenshots of your website (Home, Roster, World Map, etc.).
2.  **Save Images:** Save these images into your project, preferably in a folder like `public/screenshots/` or `src/assets/screenshots/`.
3.  **Update the README:**
      * Find the **"Project Screenshots"** section in the markdown code above.
      * Replace the placeholder URLs (like `https://placehold.co/600x400...`) with the relative path to your images.
      * **Example:**
        ```markdown
        | ![Home Page](public/screenshots/home-page.png) | ![Roster Page](public/screenshots/roster-page.png) |
        ```
