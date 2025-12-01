# 🐍 Snake • 💧 Water • 🔫 Gun – Web Game

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-00c7b7?style=for-the-badge&logo=render&logoColor=white)](https://snake-water-gungame.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/srivastavHimanshu4503/snake-water-gun-game)

A simple and fun **Snake–Water–Gun** web game where you play against the computer through a clean web interface.
**🔗 Live URL:** https://snake-water-gungame.onrender.com/
---

## 🚀 Tech Stack

**Languages & Frameworks**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=000)

**Tools & Hosting**

![Render](https://img.shields.io/badge/Hosted_on-Render-00c7b7?style=for-the-badge&logo=render&logoColor=white)
![Git](https://img.shields.io/badge/Version_Control-Git-f05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/Editor-VS_Code-0078d7?style=for-the-badge&logo=visualstudiocode&logoColor=white)

---

## 🎮 Game Overview

**Snake–Water–Gun** is similar to Rock–Paper–Scissors:

- 🐍 **Snake**
- 💧 **Water**
- 🔫 **Gun**

The player selects one option, the computer randomly selects another, and the winner is decided based on the rules you’ve implemented in the Python backend.

You can play it live here:  
👉 **https://snake-water-gungame.onrender.com/**

---

## 📁 Project Structure

A high-level overview of the project:

```text
snake-water-gun-game/
├── app.py              # Flask application (routes & game logic)
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates (Jinja2)
│   └── index.html
└── static/             # Static assets (CSS, JS, images)
    ├── css/
    ├── js/
    └── img/
```

## ⚙️ Setup & Run Locally

1. Clone the repo
```bash
git clone https://github.com/srivastavHimanshu4503/snake-water-gun-game.git
cd snake-water-gun-game
```

2. Create & activate a virtual environment (optional but recommended)
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Run the Flask app
```bash
python app.py
```

5. Open your browser and visit:
```bash
http://127.0.0.1:5000/
```

## ☁️ Deployment (Render)
Typical Render setup for a Flask app:

  - Build Command: pip install -r requirements.txt

  - Start Command: something like gunicorn app:app (depending on how app.py is structured)

  - Environment: Python

 ## ✅ Features

- 🔁 Play against a computer with random choices
- 💻 Simple, responsive UI using HTML, CSS & JavaScript
- 🧠 Game logic handled on the server with Python & Flask
- ☁️ Deployed and accessible online via Render

## 📬 Contact

- If you like this project or have suggestions:
 GitHub: @srivastavHimanshu4503

- ⭐ Feel free to star the repository if you found this project interesting!
