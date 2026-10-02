# Abeer Wael — Personal Portfolio Website

A modern, highly interactive, monochrome personal portfolio website engineered for **Abeer Wael**, Computer and Information Science student at Damanhour University.

Built with **pure HTML5, CSS3, and modern vanilla JavaScript** — zero external runtime dependencies, ultra-fast loading, and 100% faithful to the authentic CV.

---

## ✦ Key Features

- **Monochrome Design Aesthetic**: Deep blacks (`#050505`, `#0a0a0a`), pure whites, and nuanced grays with subtle ambient glow and micro-borders.
- **Custom Desktop Cursor**: Interactive dot and lag-smoothed ring with hover reaction on cards, links, and buttons (automatically disabled on mobile & touch devices).
- **Fullscreen Hero Section**: Real professional portrait integration, dynamic availability badge, quick academic metrics, and interactive particle constellation background.
- **Academic & Coursework Matrix**: Structured coursework badges (Discrete Math, Logic Design, AI, Computer Architecture, Data Communication, Data Structures, OOP, Database Systems).
- **Interactive Education Timeline**: Highlighting Damanhour University with an animated **GPA meter (3.44 / 4.00)**.
- **Network Infrastructure Experience**: Showcasing the **NTI (National Telecommunication Institute)** internship with Cisco Packet Tracer, VLAN segmentation, and Router-on-a-Stick architecture.
- **Projects Section & Interactive Modals**:
  1. **Escape Room Game (AI Project – Python)** — BFS pathfinding algorithm, OOP architecture, and team coordination. Now features real in-game screenshots and modal thumbnail gallery!
  2. **Educational Management System (Java Project)** — SQL Server database design, Java Swing GUI, and DAO pattern.
  3. **Pizza Restaurant Website (Frontend Project)** — 5-page layout with interactive rotating pizza animation in JavaScript.
  - Interactive project filtering by category (*All*, *AI & Algorithms*, *Desktop & Databases*, *Frontend Web*).
  - Deep-dive modals with problem statements, engineering solutions, Abeer's contributions, and feature lists.
- **Dedicated Project Photos & Gallery Section**:
  - Showcases authentic Python Tkinter game interface screenshots:
    1. Main Menu & Mode Selection (`Human Mode` vs `Watch AI Solve`)
    2. Level 1 (5×5 Maze with Robot agent, puzzle piece, skull hazard, and exit door)
    3. Mathematical Riddle Challenge (`5x + 7 = -33` equation solver)
    4. Level 2 (Advanced 6×7 maze grid with branching paths and obstacle placement)
  - Interactive fullscreen lightbox viewer with captions.
- **Certifications Lightbox**:
  - **Sprints Python Programming (40 Hours)** with authentic credential ID (`ID - SPR - 55TZ18`), direct online verification link, and full-resolution certificate image.
  - **Information Technology Institute (ITI) Python Programming (60 Hours)** with comprehensive curriculum breakdown.
- **Problem Solving & Competitive Programming**:
  - Codeforces and VJudge algorithmic practice.
  - Internal programming contests at Faculty of Computer and Information Science.
  - Language proficiencies: Arabic (Native), English (Very Good).
- **Dedicated CV Section**:
  - Direct download button for `assets/docs/Abeer_Wael_CV.pdf`.
  - In-browser modal viewer to inspect the CV without navigating away.
- **Contact & Communication**:
  - One-click copy-to-clipboard for email (`abeer.wael18@gmail.com`) and phone (`+201060931756`).
  - WhatsApp direct link and LinkedIn profile integration.
  - Validated contact form with instant toast notification.

---

## ✦ File Structure

```text
portoflio/
├── index.html                   # Semantic, accessible HTML5 structure with SEO metadata
├── README.md                    # Project documentation & run guide
└── assets/
    ├── css/
    │   └── style.css            # Modular monochrome design system & responsive layout
    ├── js/
    │   └── main.js              # Cursor, modals, lightbox, canvas, form validation
    ├── docs/
    │   └── Abeer_Wael_CV.pdf    # Official authentic CV document
    └── images/
        ├── profile.jpg          # High-resolution professional portrait
        ├── certificate_sprints.jpg # Sprints Python certification
        ├── certificate-iti.svg  # ITI Python certification preview
        ├── project-ai-escape.svg # AI Escape Room vector mockup
        ├── project-ems-java.svg # Educational Management System vector mockup
        ├── project-pizza-web.svg# Pizza Restaurant Website vector mockup
        ├── exp-cisco-network.svg# Cisco Packet Tracer network topology
        └── favicon.svg          # Monochrome AW monogram
```

---

## ✦ How to Run Locally

You can open the website in any modern browser directly:

### Option 1: Double-click
Simply double-click [index.html](file:///c:/Users/abeer/OneDrive/المستندات/portoflio/index.html).

### Option 2: Local HTTP Server (Python)
Run the following in PowerShell from the `portoflio` directory:

```powershell
python -m http.server 8000
```

Then navigate to: `http://localhost:8000/`

---

## ✦ How to Deploy to GitHub Pages

1. Initialize Git in the folder:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of Abeer Wael portfolio"
   ```
2. Create a repository on GitHub (e.g., `portfolio`).
3. Push to GitHub:
   ```powershell
   git remote add origin https://github.com/<your-username>/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository settings, go to **Pages** &rarr; select **main** branch &rarr; save. Your portfolio will be live in seconds!
