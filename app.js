// Cop Sloop Bingo - Bodycam Edition
// Lightweight vanilla JS. No deps. Large randomized pool.

const EVENTS = [
  // From original sample PDF (cleaned)
  "Assault Report (not FV)",
  "County Arrest",
  "DWI",
  "DWI Blood Draw",
  "Family Violence",
  "Major Collision (EMS)",
  "Minor Collision",
  "Public Intox Arrest",
  "Report Taken",
  "911 Hang Up",
  "Alarm Call",
  "Assist FD/EMS",
  "Civil Standby",
  "Criminal Mischief",
  "Disturbance",
  "Fireworks Complaint",
  "Found Property",
  "Golf Cart Violation",
  "Motorist Assist",
  "Noise Complaint",
  "Theft Call",
  "Wanna-be Racer",
  "Warrant Arrest",
  "Welfare Check",

  // Bodycam classics & common disorderly moments
  "I know my rights",
  "Don't touch me!",
  "Am I free to go?",
  "Am I being detained?",
  "Call my mom",
  "This is illegal",
  "You can't do that",
  "Sovereign Citizen",
  "No ID / Fake Name",
  "Suspended License",
  "No Insurance",
  "Resisting Arrest",
  "Foot Pursuit",
  "Spits on Officer",
  "Kicks at Officer",
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
  "Public Urination",
  "Refuses to Exit",
  "Locks the Doors",
  "Records the Stop",
  "I pay your salary",
  "My cousin is a cop",
  "Racial Profiling Claim",
  "Wrong person!",
  "I know the law",
  "Get a warrant",
  "Search Refused",
  "Invokes 5th",
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
  "Can I smoke?",
  "One last cigarette",
  "Tell my kids I love them",
  "This ruins my life",
  "I'll lose my job",
  "Please let me go",
  "First time ever",
  "Clean record",
  "I go to church",
  "You're the criminals",
  "Defund the police",
  "ACAB shouted",
  "Fuck the police",
  "Pig!",
  "Supervisor Demanded",
  "Bodycam Requested",
  "Hands up!",
  "On the ground!",
  "Step out of the car",
  "Don't move!",
  "K9 Called",
  "Spotlight in face",
  "I have a heart condition",
  "I have epilepsy",
  "Panic Attack Claim",
  "I can't feel my hands",
  "I need water",
  "I need to pee",
  "Call my wife/mom/family",
  "CPS will take them",
  "I'll do anything",
  "Never again",
  "This is crazy",
  "You're gonna get fired",
  "I know the chief",
  "I know the mayor",
  "I'm recording this",
  "Everyone watching",
  "This is entrapment",
  "I do not consent",
  "I invoke my rights",
  "Right to remain silent",
  "Badge number!",
  "Name and badge!",
  "I'm filing a complaint",
  "Excessive force",
  "Unlawful arrest",
  "You got nothing",
  "Prove it",
  "Where's the bodycam?",
  "Turn bodycam on",
  "This is all on camera",
  "My phone is recording",
  "Going live",
  "You're finished",
  "I pay taxes",
  "This is America",
  "I know my Constitution",
  "You need PC",
  "No consent to search",
  "Miranda me",
  "I refuse to answer",
  "That's not my name",
  "I was just walking",
  "I live here",
  "Get off my land",
  "I have a permit",
  "This is self defense",
  "He swung first",
  "It was an accident",
  "I was joking",
  "I thought it was my car",
  "I borrowed it",
  "I found it",
  "Someone planted it",
  "That's not mine",
  "I've never seen that",
  "I don't even smoke",
  "I only had two beers",
  "I'm not drunk",
  "I can drive fine",
  "Just let me go home",
  "My kids are waiting",
  "I have court tomorrow",
  "This will ruin everything",
  "Please officer",
  "Have mercy",
  "I'm sorry",
  "I made a mistake",
  "It won't happen again",
  "I'll go to AA",
  "Just write me a ticket",
  "Don't take me to jail",
  "I can't go to jail",
  "I need medical attention",
  "My chest hurts",
  "I'm having an asthma attack",
  "I need my inhaler",
  "I'm diabetic",
  "I feel dizzy",
  "I have a bad back",
  "I can't kneel",
  "I have a disability",
  "You're profiling me",
  "This is harassment",
  "Leave me alone",
  "I wasn't doing anything",
  "I was waiting for someone",
  "I was going home",
  "I'm from out of town",
  "They started it",
  "I was trying to help",
  "I'm the victim",
  "Look at my face",
  "I'm bleeding",
  "I want to press charges",
  "Arrest him instead",
  "I'm the good guy",
  "I support the blue",
  "My dad was a cop",
  "I know officers",
  "I'm a business owner",
  "This will hurt the community",
  "Think of my family",
  "The neighbors are watching",
  "This is going to be all over the news",
  "You're making a mistake",
  "I'll see you in court",
  "My lawyer is the best",
  "We'll sue for millions",
  "I'm documenting everything",
  "There are cameras everywhere",
  "Ring doorbell",
  "My friend is recording",
  "This is 2026",
  "You can't get away with this",
  "Go catch real criminals",
  "Priorities are messed up",
  "This is why people hate cops",
  "You escalated",
  "I was calm until you",
  "You put hands on me",
  "You didn't have to",
  "There was no threat",
  "I wasn't resisting",
  "I was complying",
  "I had my hands up",
  "I was already down",
  "You kept going",
  "Power trip",
  "Without the badge you're nothing",
  "Take off the badge",
  "Fight me fair",
  "You're scared",
  "You need five guys",
  "Coward",
  "Watch your back",
  "You'll get yours",
  "Karma",
  "I hope you lose sleep",
  "I hope this haunts you",
  "You're done",
  "Career over",
  "All for a traffic stop",
  "All for a noise complaint",
  "All for a broken taillight",
  "All for expired tags",
  "All for looking at you",
  "All for existing",
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
  "Call Chris Pratt"
  
];

// Fisher-Yates shuffle
function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCard() {
  // Unique selection of 24 from the large pool
  const shuffled = shuffle(EVENTS);
  const selected = shuffled.slice(0, 24);

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

let currentBoard = [];
let hasBingo = false;

const boardEl = document.getElementById("bingo-board");
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
  hasBingo = false;

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
  if (hasBingo) return;
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

  if (cell.marked && checkBingo()) {
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
  hasBingo = true;
  boardEl.classList.add("won");
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

function newCard() {
  overlay.classList.add("hidden");
  confettiContainer.innerHTML = "";
  currentBoard = generateCard();
  renderBoard();
}

// Wire up
newCardBtn.addEventListener("click", newCard);
playAgainBtn.addEventListener("click", newCard);

howToBtn.addEventListener("click", () => howToEl.classList.toggle("hidden"));
closeHowTo.addEventListener("click", () => howToEl.classList.add("hidden"));

// Boot
newCard();