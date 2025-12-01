const startBtn = document.getElementById("startBtn");
const choicesDiv = document.getElementById("choices");
const status = document.getElementById("status");
const attemptsEl = document.getElementById("attempts");
const historyEl = document.getElementById("history");
const choiceButtons = document.querySelectorAll(".weapon-card");
const userIcon = document.getElementById("userIcon");
const cpuIcon = document.getElementById("cpuIcon");

// Grab the raw SVG HTML from the buttons to reuse in the arena
const SVGS = {
  Snake: document.querySelector('[data-choice="Snake"] .weapon-logo').outerHTML,
  Water: document.querySelector('[data-choice="Water"] .weapon-logo').outerHTML,
  Gun: document.querySelector('[data-choice="Gun"] .weapon-logo').outerHTML
};

function setChoicesEnabled(enabled) {
  if (enabled) {
    choicesDiv.classList.remove("hidden");
    choiceButtons.forEach(btn => btn.style.pointerEvents = "auto");
    startBtn.textContent = "RESTART";
  } else {
    choiceButtons.forEach(btn => btn.style.pointerEvents = "none");
  }
}

async function startGame() {
  const resp = await fetch("/start", { method: "POST" });
  const data = await resp.json();
  if (data.status === "ok") {
    status.textContent = "SELECT YOUR WEAPON";
    attemptsEl.textContent = "0";
    historyEl.textContent = "";
    userIcon.innerHTML = '<div class="placeholder">?</div>';
    cpuIcon.innerHTML = '<div class="placeholder">?</div>';
    setChoicesEnabled(true);
  } else {
    status.textContent = "System Error";
  }
}

function renderHistory(history) {
  if (!history || history.length === 0) return;
  const lines = history.map(h => {
    const res = h.result === "win" ? "VICTORY" : (h.result === "lose" ? "DEFEAT" : "DRAW");
    return `> #${h.attempt} [${h.you}] vs [${h.computer}] : ${res}`;
  });
  historyEl.textContent = lines.join("\n");
  historyEl.scrollTop = historyEl.scrollHeight;
}

// --- VISUAL LOGIC ---
function animateFight(user, cpu) {
  // 1. Place Icons
  userIcon.innerHTML = SVGS[user];
  cpuIcon.innerHTML = SVGS[cpu];

  // 2. Reset Animations
  userIcon.className = "fighter-icon";
  cpuIcon.className = "fighter-icon";
  void userIcon.offsetWidth; // Force reflow

  if (user === cpu) return; // Draw

  // 3. Apply Animations
  // Snake vs Water (Snake drinks Water)
  if ((user === "Snake" && cpu === "Water")) {
    userIcon.classList.add("anim-bite");
    cpuIcon.classList.add("anim-shrink");
  } else if (user === "Water" && cpu === "Snake") {
    userIcon.classList.add("anim-shrink");
    cpuIcon.classList.add("anim-bite");
  }

  // Water vs Gun (Water rusts Gun)
  else if ((user === "Water" && cpu === "Gun")) {
    userIcon.classList.add("anim-splash");
    cpuIcon.classList.add("anim-rust");
  } else if (user === "Gun" && cpu === "Water") {
    userIcon.classList.add("anim-rust");
    cpuIcon.classList.add("anim-splash");
  }

  // Gun vs Snake (Gun shoots Snake)
  else if ((user === "Gun" && cpu === "Snake")) {
    userIcon.classList.add("anim-shoot");
    cpuIcon.classList.add("anim-die");
  } else if (user === "Snake" && cpu === "Gun") {
    userIcon.classList.add("anim-die");
    cpuIcon.classList.add("anim-shoot");
  }
}

async function play(choice) {
  const resp = await fetch("/play", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choice })
  });

  const data = await resp.json();
  if (data.status !== "ok") return;

  attemptsEl.textContent = data.attempts || 0;
  renderHistory(data.history);
  
  // Trigger Animation using the latest computer move
  if(data.history.length > 0) {
     // Find the log for this specific attempt
     const round = data.history.find(h => h.attempt === data.attempts);
     if(round) animateFight(choice, round.computer);
  }

  if (data.game_over) {
    status.textContent = data.message;
    setChoicesEnabled(false);
  } else {
    status.textContent = data.message;
  }
}

startBtn.addEventListener("click", startGame);
choiceButtons.forEach(btn => btn.addEventListener("click", () => play(btn.dataset.choice)));