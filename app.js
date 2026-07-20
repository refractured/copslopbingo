// Cop Slop Bingo - Bodycam Edition
// Lightweight vanilla JS. No deps. Large randomized pool.

const EVENTS = [
  // From original sample PDF (cleaned)

  "DWI",
  "Family Violence",
  "Major Collision (EMS)",
  "Minor Collision",
  "Public Intox Arrest",
  "Civil Standby",
  "Criminal Mischief",
  "Disturbance",
  "Fireworks Complaint",
  "Found Property",
  "Golf Cart Violation",
  "Motorist Assist",
  "Noise Complaint",
  "Theft Call",
  "Shoplifting Call",
  "Wanna-be Racer",
  "Warrant Arrest",

  // Bodycam classics & common disorderly moments
  "I know my rights",
  "Don't touch me!",
  "Am I free to go?",
  "Am I being detained?",
  "This is illegal",
  "You can't do that",
  "Sovereign Citizen",
  "No ID / Fake Name",
  "Suspended License",
  "No Insurance",
  "Resisting Arrest",
  "Foot Pursuit",
  "Spits on Officer",
  "Naked Subject",
  "Drugs Found",
  "Not my drugs!",
  "Weapon Found",
  "Taser Deployed",
  "You're hurting me",
  "I can't breathe",
  "Sobriety Test",
  "Kids Involved",
  "Don't tow my car",
  "Begging no jail",
  "Assaults Officer",
  "Tries to Escape",
  "Backup Requested",
  "Medical Needed",
  "Mental Health Crisis",
  "Overdose",
  "Refuses to Exit",
  "Locks the Doors",
  "Records the Stop",
  "Racial Profiling Claim",
  "Wrong person!",
  "Search Refused",
  "Lies about Name",
  "Outstanding Warrants",
  "DWI Refusal",
  "Odor of Alcohol",
  "Odor of Weed",
  "Paraphernalia Found",
  "Hides Evidence",
  "Swallows Something",
  "Bites Officer",
  "Stop resisting!",
  "You're under arrest",
  "For what?!",
  "This is bullshit",
  "I'm gonna sue",
  "Police brutality",
  "This will go viral",
  "Livestreams Stop",
  "I feel unsafe",
  "I'm pregnant",
  "I need my meds",
  "Loosen the cuffs",
  "Please let me go",
  "First time ever",
  "Clean record",
  "Defund the police",
  "Fuck the police",
  "Pig!",
  "Supervisor Demanded",
  "I have epilepsy",
  "Panic Attack Claim",
  "I can't feel my hands",
  "I need water",
  "I need to pee",
  "Call my wife/mom/family",
  "I'll do anything",
  "I do not consent",
  "I invoke my rights",
  "Badge number!",
  "Name and badge!",
  "I'm filing a complaint",
  "Excessive force",
  "Where's the bodycam?",
  "Turn bodycam on",
  "This is all on camera",
  "My phone is recording",
  "I live here",
  "It was an accident",
  "That's not mine",
  "I've never seen that",
  "I don't even smoke",
  "I only had two drinks",
  "I'm not drunk",
  "I can drive fine",
  "Just let me go home",
  "My kids are waiting",
  "I have court tomorrow",
  "Please officer",
  "Don't take me to jail",
  "I need medical attention",
  "My chest hurts",
  "I'm having an asthma attack",
  "I need my inhaler",
  "I'm diabetic",
  "I feel dizzy",
  "I can't kneel",
  "I have a disability",
  "You're profiling me",
  "This is harassment",
  "Leave me alone",
  "I wasn't doing anything",
  "I was going home",
  "I'm bleeding",
  "I want to press charges",
  "Go catch real criminals",
  "Priorities are messed up",
  "This is why people hate cops",
  "You escalated",
  "I was calm until you",
  "You put hands on me",
  "I wasn't resisting",
  "Power trip",
  "Coward/Pussy",
  "Karma",
  "All for a traffic stop",
  "All for a noise complaint",
  "All for a broken taillight",
  "All for expired tags",
  //Asmongold
  "Goylooping",
  "Didn't do nuffin",
  "Dont touch me",
  "Crying like a toddler",
  "I'll sue",
  "Race card",
  "I know my rights",
  "Resists arrest",
  "Refuses to show ID",
  "Makes simple situation worse",
  "I'm pregnant",
  "Refuses to exit vehicle",
  "Kicks backseat of car",
  "Talking on their phone",
  "Throws items",
  "Yells bitch!",
  "Going to call my lawyer",
  "I don't give a fuck",
  "Extra loud",
  "I need a supervisor",
  "Ignoring cops",
  "Arresting me for no reason",
  "Cuffs are too tight",
  "Call Chris Pratt",
  "Fat",
  "Wig/Hair falls off"
  
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

  // Update only the class of this cell for performance + keep state
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

  // Rows
  for (let r = 0; r < size; r++) {
    if (marked.slice(r * size, r * size + size).every(Boolean)) return true;
  }
  // Columns
  for (let c = 0; c < size; c++) {
    let ok = true;
    for (let r = 0; r < size; r++) {
      if (!marked[r * size + c]) { ok = false; break; }
    }
    if (ok) return true;
  }
  // Main diagonal
  if ([0, 6, 12, 18, 24].every(i => marked[i])) return true;
  // Anti diagonal
  if ([4, 8, 12, 16, 20].every(i => marked[i])) return true;

  return false;
}

function triggerBingo() {
  createConfetti();
  overlay.classList.remove("hidden");
}

function createConfetti() {
  confettiContainer.innerHTML = "";
  const colors = ["#00e5ff", "#ff3d71", "#ffd600", "#00e676", "#ff9100", "#e040fb", "#ffffff"];
  for (let i = 0; i < 90; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left = Math.random() * 100 + "%";
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (5 + Math.random() * 9) + "px";
    el.style.height = (5 + Math.random() * 9) + "px";
    el.style.borderRadius = Math.random() > 0.4 ? "50%" : "1px";
    el.style.animationDuration = (2.2 + Math.random() * 2.8) + "s";
    el.style.animationDelay = (Math.random() * 0.9) + "s";
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

// Wire up
dailyCardBtn.addEventListener("click", showDailyCard);
newCardBtn.addEventListener("click", showRandomCard);
playAgainBtn.addEventListener("click", dismissBingo);

howToBtn.addEventListener("click", () => howToEl.classList.toggle("hidden"));
closeHowTo.addEventListener("click", () => howToEl.classList.add("hidden"));

// Boot: Daily Card is the default so the whole chat sees the same board
showDailyCard();
