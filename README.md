# Aetherion – Dynamic Game Universe Website (V2)

Aetherion is a dynamic, fully-responsive web experience designed to showcase a living game universe through immersive visuals, animations, lore pages, and interactive UI components. This version focuses on scalable architecture, optimized performance, reusable components, and support for future expansions like community systems and development hubs.

---

## 🚀 Features

### 1. Dynamic & Responsive UI
- Fully responsive layout optimized for desktop, tablet, and mobile.
- Smooth transitions, animations, and fluid navigation.

### 2. Modular Component Architecture
- Reusable UI components stored in `/src/components`.
- Clean separation of layout, sections, and utilities.

### 3. Particle, Fracture & World Animations
- Custom particle animations optimized for performance.
- Interactive world map with optional fracture animation background.
- Efficient rendering loops to maintain stable FPS.

### 4. Page-Based Architecture
- Dedicated pages located in `/src/Pages`:
  - Home  
  - World  
  - DevHub  
  - Community  
  - Guardians  
- Each page structured for future CMS or API integration.

### 5. Asset Management
- Organized assets folder:
  - `images/`
  - `videos/`
  - `icons/`
  - `fonts/`

### 6. Modern Development Setup
- React JS (Vite) for fast development and builds.
- TailwindCSS for styling.
- Framer Motion for animations.
- Modular data handling through `/src/data`.

---

## 📁 Project Structure

aetherion-dynamic-site/
│
├── src/
│ ├── assets/
│ │ ├── images/
│ │ ├── videos/
│ │ ├── icons/
│ │ └── fonts/
│ │
│ ├── components/
│ │ ├── layout/
│ │ ├── sections/
│ │ └── ui/
│ │
│ ├── data/
│ ├── hooks/
│ ├── utils/
│ ├── styles/
│ │
│ ├── Pages/
│ │ ├── Home/
│ │ ├── World/
│ │ ├── Community/
│ │ ├── DevHub/
│ │ └── Guardians/
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md


---

## ⚙️ Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React JS (Vite) |
| Styling | TailwindCSS, custom CSS |
| Animations | Framer Motion, custom JS render loops |
| Utilities | Axios, custom hooks |
| Media Handling | Images, Lottie, sprites, WebM |
| Code Quality | ESLint, Prettier |

---

## 📦 Installation

```bash
git clone https://github.com/CHILL-Divyanshu/aetherion-website-2025
cd aetherion-dynamic-site
npm install
npm run dev
