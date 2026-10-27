# ⚡ Pixel Clicker Game

A retro-styled browser clicker and reflex mini-game built with **HTML5, CSS3 and JavaScript**, powered by a custom **Node.js & Express backend API** for real-time leaderboard rankings.

---

## ✨ Features

* **10-Sec Reflex Gameplay:** Rapid-click challenge with a real-time countdown timer.
* **Retro Audio Effects:** Dynamic arcade-style coin sound using Web Audio API.
* **Score & High Score Tracking:** Live scoring with local storage for personal bests.
* **Live Global Leaderboard:** Dynamically fetches and ranks top players via REST API.
* **Multi-Page Layout:** Smooth navigation between Game, How-to-Play, and Leaderboard.
* **Node.js REST Backend:** Lightweight Express server for score storage and ranking.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Web Audio API, Fetch API)
* **Backend:** Node.js, Express.js, CORS
* **Styling Assets:** FontAwesome Icons, Google Fonts

---

## 📂 Project Structure

```
pixel-clicker/
│── index.html            # Main game interface
│── play.html             # Game instructions page
│── style.css             # Global dark theme and pixel styling
│── script.js             # Frontend game loop, audio synthesis, and API calls
│── server.js             # Node.js Express backend REST API
│── package.json          # Node dependencies configuration
└── README.md             # Project documentation
```

---

## ⚙️ Installation & Setup Guide

1. **Clone or Download the Project:**
   ```bash
   Open project folder (Pixel Clicker) in your code editor (e.g., VS Code).
   ```
2. **Install Backend Dependencies:**
   ```bash
   npm install express cors
   ```
3. **Start the Backend API Server:**
   ```bash
   npm start
   ```   
4. **Run the Frontend Game:**
   - Keep the terminal running so the backend API stays active.
   - Open index.html in your browser (you can double-click the file or use the VS Code Live Server extension).
---
