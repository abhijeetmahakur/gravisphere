# GraviSphere — Sci-Fi Artificial Gravity Control Station

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://abhijeetmahakur.github.io/gravisphere/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)

An experimental sci-fi station gravity control dashboard and telemetry monitoring suite. Built with React 19, Vite, Tailwind CSS, Recharts, Framer Motion, and an Express API with zero-configuration in-memory MongoDB simulation.

---

## 🚀 Download & Live Demo

### 🌐 1. Live Interactive Demo
Explore the station dashboard directly in your browser:  
👉 **[Open Live GraviSphere Demo](https://abhijeetmahakur.github.io/gravisphere/)**

### 💻 2. Run Full-Stack Locally on Windows

#### Step 1: Clone the Repository
```powershell
git clone https://github.com/abhijeetmahakur/gravisphere.git
cd gravisphere
```

#### Step 2: Start the Express Backend API
```powershell
cd backend
npm install
$env:JWT_SECRET = "supersecret_station_key_123"
npm start
```
*The API will start on `http://127.0.0.1:5000` with automated in-memory MongoDB database seeding.*

#### Step 3: Start the React + Vite Frontend (In a New Terminal)
```powershell
cd ../frontend
npm install
npm run dev
```
*Open the Vite URL (typically `http://localhost:5173`) in your browser.*

---

## 📸 Screenshots & UI Showcase

<!--
  PLACEHOLDER INSTRUCTION:
  1. Open http://localhost:5173 or the GitHub Pages live demo.
  2. Capture full-screen screenshots of the telemetry dashboard and zone controls.
  3. Save images into `frontend/public/assets/` or `docs/screenshots/` as `dashboard_view.png`.
-->

| Station Sector Telemetry | Dynamic Gravity Field Control |
| :---: | :---: |
| ![GraviSphere Main Dashboard](https://placehold.co/600x380/080B14/6366F1?text=GraviSphere+Station+Dashboard+Screenshot) | ![GraviSphere Zone Sliders](https://placehold.co/600x380/0F172A/10B981?text=Artificial+Gravity+Modulation+Screenshot) |
| *Real-time G-force telemetry across Living, Gym, Medical, and Agricultural sectors* | *Interactive modulation sliders, safety threshold alerts, and anomaly logs* |

---

## ✨ Key Features

- **Multi-Zone Artificial G-Force Control:** Independent gravitational calibration for Living (1.0g), Training/Gym (1.5g), Medical (0.3g), and Hydroponics (1.0g).
- **Live Environmental Sensor Feeds:** Recharts-powered telemetry charts showing gravitational variance, magnetic flux, and power consumption.
- **Spring Physics Animations:** Micro-interactions and fluid motion powered by Framer Motion.
- **Zero-Config Database Simulation:** Integrates `mongodb-memory-server` to automatically spin up a test database with pre-seeded station sectors.
- **Emergency Stabilization Protocol:** Instant failsafe override to restore standard 1.0g earth gravity during station anomalies.
- **Responsive Cyberpunk Aesthetic:** Glassmorphism, deep cosmic dark theme, and Lucide vector iconography.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router DOM v7 |
| **Build Tooling** | Vite 8.0, Modern ESM |
| **Styling & Icons** | Tailwind CSS v4, Lucide React, Clsx, Tailwind-Merge |
| **Animation & Charts** | Framer Motion v12, Recharts v3 |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB / Mongoose with `mongodb-memory-server` |
| **Deployment** | GitHub Pages (Frontend) & GitHub Actions CI/CD |

---

## 📂 Project Structure

```
gravisphere/
├── .github/
│   └── workflows/
│       ├── ci.yml               # Automated syntax and build verification
│       └── deploy-pages.yml     # Automated frontend deployment to GitHub Pages
├── backend/
│   ├── src/
│   │   ├── config/              # In-memory MongoDB initialization
│   │   ├── middleware/          # JWT authentication and authorization
│   │   ├── models/              # Station zones, telemetry logs, user models
│   │   ├── routes/              # Express API route controllers
│   │   └── server.js            # Express server entry point
│   └── package.json             # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # Station navigation, gauges, cards, charts
│   │   ├── pages/               # Dashboard, sector manager, alert consoles
│   │   ├── App.jsx              # Application router and state provider
│   │   └── main.jsx             # React DOM entry point
│   ├── index.html               # Frontend HTML root
│   ├── vite.config.js           # Vite configuration with relative base
│   └── package.json             # Frontend dependencies
├── .gitignore                   # Ignore node_modules, build outputs, environment files
├── LICENSE                      # MIT License
├── SECURITY.md                  # Security policies and responsible disclosure
└── README.md                    # Project documentation
```

---

## 🗺 Roadmap

- [ ] WebSockets / Server-Sent Events (SSE) for live multi-user telemetry syncing
- [ ] 3D Three.js orbital station visualizer
- [ ] Sound FX synthesis for gravity thruster engagement and alarm sirens
- [ ] Persistent cloud database connection profile (MongoDB Atlas)

---

## 👨‍💻 Author

**Abhijeet Mahakur**
- GitHub: [@abhijeetmahakur](https://github.com/abhijeetmahakur)
- LinkedIn: [Abhijeet Mahakur](https://www.linkedin.com/in/abhijeetmahakur/)
- Location: Bhubaneswar, India

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - Copyright (c) 2026 Abhijeet Mahakur.
