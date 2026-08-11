// Cop Slop Chase Bingo - Smoke-n-Scan Edition
// Lightweight vanilla JS. No deps. Live chase pool.

const EVENTS = [
  // Vehicle Types
  "Box Truck",
  "Nissan Altima",
  "Kia Soul",
  "Dodge Challenger",
  "Tesla",

  // Events
  "Spike Strip",
  "Missed Spike Strip",
  "Carjacking",
  "Runs Red Lights",
  "Smashes multiple cars",
  "Passenger bails",
  "Restricted Airspace",
  "Stop and Go",
  "Stops for Gas",
  "Wrong side of road",

  // SNS
  "Duke Boy",
  "The Professor",
  "Martinez Shoutout",
  "The Fig",

  // Suspect
  "ADW Suspect",
  "Murder Suspect",

  // End of Chase
  "Suspect Runs",
  "Suspect Bar",
  "Ends in t-bone",
  "Ends in a crash",
  "K-9 used",
  "Dogpile perp",
  "Bearcats called in"
];

// --- Seeded RNG for deterministic daily cards ---
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function seededShuffle(array, seed) {
  const random = mulberry32(seed);
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// UTC-based daily seed so every viewer worldwide gets the same card on the same calendar day
function getDailySeed() {
  const now = new Date();
  return now.getUTCFullYear() * 10000 + (now.getUTCMonth() + 1) * 100 + now.getUTCDate();
}

// Fisher-Yates shuffle (true random)
function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard(selected) {
  const board = [];
  let idx = 0;
  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      board.push({ text: "FREE", free: true, marked: true });
    } else {
      board.push({ text: selected[idx++], free: false, marked: false });
    }
  }
  return board;
}

function generateDailyCard() {
  const seed = getDailySeed();
  const shuffled = seededShuffle(EVENTS, seed);
  const selected = shuffled.slice(0, 24);
  return buildBoard(selected);
}

function generateRandomCard() {
  const shuffled = shuffle(EVENTS);
  const selected = shuffled.slice(0, 24);
  return buildBoard(selected);
}

let currentBoard = [];
let bingoAchieved = false;

const boardEl = document.getElementById("bingo-board");
const dailyCardBtn = document.getElementById("daily-card-btn");
const newCardBtn = document.getElementById("new-card-btn");
const howToBtn = document.getElementById("how-to-btn");
const howToEl = document.getElementById("how-to");
const closeHowTo = document.getElementById("close-how-to");
const overlay = document.getElementById("bingo-overlay");
const playAgainBtn = document.getElementById("play-again-btn");
const confettiContainer = document.getElementById("confetti");
const themeAudio = document.getElementById("sns-theme");
const themeToggle = document.getElementById("theme-toggle");

function renderBoard() {
  boardEl.innerHTML = "";
  boardEl.classList.remove("won");
  bingoAchieved = false;

  currentBoard.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "cell";
    if (cell.free) div.classList.add("free");
    if (cell.marked) div.classList.add("marked");

    const span = document.createElement("span");
    span.textContent = cell.text;
    div.appendChild(span);

    if (!cell.free) {
      div.addEventListener("click", () => toggleCell(index));
    }

    boardEl.appendChild(div);
  });
}

function toggleCell(index) {
  const cell = currentBoard[index];
  if (cell.free) return;

  cell.marked = !cell.marked;

  const cells = boardEl.querySelectorAll(".cell");
  if (cell.marked) {
    cells[index].classList.add("marked");
  } else {
    cells[index].classList.remove("marked");
  }

  if (cell.marked && checkBingo() && !bingoAchieved) {
    bingoAchieved = true;
    triggerBingo();
  }
}

function checkBingo() {
  const size = 5;
  const marked = currentBoard.map(c => c.marked);

  for (let r = 0; r < size; r++) {
    if (marked.slice(r * size, r * size + size).every(Boolean)) return true;
  }
  for (let c = 0; c < size; c++) {
    let ok = true;
    for (let r = 0; r < size; r++) {
      if (!marked[r * size + c]) { ok = false; break; }
    }
    if (ok) return true;
  }
  if ([0, 6, 12, 18, 24].every(i => marked[i])) return true;
  if ([4, 8, 12, 16, 20].every(i => marked[i])) return true;

  return false;
}

function triggerBingo() {
  createConfetti();
  overlay.classList.remove("hidden");
}

function createConfetti() {
  confettiContainer.innerHTML = "";
  const emojis = ["🚓", "🚨", "🚗", "🚔", "💨", "🐕", "🛑", "⛽", "💥"];
  const colors = ["#00a8ff", "#ff2a2a", "#ffd600", "#ffffff", "#00a8ff", "#ff2a2a"];

  for (let i = 0; i < 70; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = (2.0 + Math.random() * 2.8) + "s";
    el.style.animationDelay = (Math.random() * 0.85) + "s";

    if (i % 3 === 0) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.fontSize = (0.9 + Math.random() * 0.7) + "rem";
    } else {
      el.classList.add("dot");
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.width = (6 + Math.random() * 8) + "px";
      el.style.height = el.style.width;
      el.style.borderRadius = Math.random() > 0.35 ? "50%" : "2px";
    }

    confettiContainer.appendChild(el);
  }
}

function showDailyCard() {
  overlay.classList.add("hidden");
  confettiContainer.innerHTML = "";
  currentBoard = generateDailyCard();
  renderBoard();
}

function showRandomCard() {
  overlay.classList.add("hidden");
  confettiContainer.innerHTML = "";
  currentBoard = generateRandomCard();
  renderBoard();
}

function dismissBingo() {
  overlay.classList.add("hidden");
  confettiContainer.innerHTML = "";
}

function setThemePlaying(playing) {
  if (playing) {
    themeToggle.textContent = "⏸";
    themeToggle.setAttribute("aria-label", "Pause SNS theme");
    themeToggle.title = "Pause SNS theme";
    themeToggle.classList.add("playing");
  } else {
    themeToggle.textContent = "▶";
    themeToggle.setAttribute("aria-label", "Play SNS theme");
    themeToggle.title = "Play SNS theme";
    themeToggle.classList.remove("playing");
  }
}

function toggleTheme() {
  if (themeAudio.paused) {
    themeAudio.play().then(() => setThemePlaying(true)).catch(() => {
      setThemePlaying(false);
    });
  } else {
    themeAudio.pause();
    setThemePlaying(false);
  }
}

// Wire up
dailyCardBtn.addEventListener("click", showDailyCard);
newCardBtn.addEventListener("click", showRandomCard);
playAgainBtn.addEventListener("click", dismissBingo);
howToBtn.addEventListener("click", () => howToEl.classList.toggle("hidden"));
closeHowTo.addEventListener("click", () => howToEl.classList.add("hidden"));
themeToggle.addEventListener("click", toggleTheme);
themeAudio.addEventListener("ended", () => setThemePlaying(false));
themeAudio.addEventListener("pause", () => {
  if (themeAudio.currentTime === 0 || themeAudio.ended) setThemePlaying(false);
});

// Boot: Daily Card is the default so the whole chat sees the same board
showDailyCard();
