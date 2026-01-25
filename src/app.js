
// --- CACHED DOM ELEMENTS ---
const UI = {
    day: document.getElementById('current-day'),
    timePill: document.getElementById('time-context'),
    weeklyTitle: document.getElementById('weekly-title'),
    xpDisplay: document.getElementById('daily-xp-display'),
    status: document.getElementById('daily-status'),
    streak: document.getElementById('streak-display'),
    weekRow: document.getElementById('week-row'),
    forecast: document.getElementById('forecast-display'),
    muscle: document.getElementById('muscle-group'),
    masai: document.getElementById('masai-indicator'),
    exList: document.getElementById('exercise-list'),
    wBtn: document.getElementById('workout-btn'),
    nutList: document.getElementById('nutrition-list'),
    posList: document.getElementById('posture-list'),
    sBtn: document.getElementById('sleep-btn'),
    sleepCard: document.getElementById('sleep-card'),
    tierName: document.getElementById('tier-name'),
    userTitle: document.getElementById('user-title'),
    rankStreak: document.getElementById('rank-streak-display'),
    rankSub: document.getElementById('rank-subtitle'),
    rankTool: document.getElementById('rank-tooltip'),
    xpCont: document.getElementById('xp-container'),
    xpText: document.getElementById('xp-text-row'),
    curXP: document.getElementById('current-xp'),
    nextXP: document.getElementById('next-xp'),
    xpBar: document.getElementById('xp-bar'),
    animCont: document.getElementById('badge-anim-container'),
    badgeShape: document.getElementById('rank-badge-shape'),
    statTotal: document.getElementById('stat-total-xp'),
    statPerf: document.getElementById('stat-perfect'),
    statTime: document.getElementById('stat-time'),
    screens: document.querySelectorAll('.screen'),
    navItems: document.querySelectorAll('.nav-item'),
    timer: document.getElementById('timer-display'),
    manualModal: document.getElementById('manual-modal'),
    manualDate: document.getElementById('manual-date'),
    manualWorkout: document.getElementById('manual-workout'),
    manualSleep: document.getElementById('manual-sleep')
};

const STORAGE_KEY = "fitness_identity_v2";
let lastActionTime = 0;
let undoStack = []; // UNDO STACK

const CHAPTER_NAMES = ["Genesis", "Friction", "Momentum", "Pressure", "Threshold", "Stability", "Flow", "Iron", "Ascent"];

const workoutPlans = {
    Monday: { muscle: "Training Focus: Chest / Triceps", exercises: ["Push-ups: 3 × 12–15", "Incline Push-ups: 3 × 10–12", "Floor DB Fly: 3 × 12", "Close-grip Push-ups: 3 × 8–10", "Overhead DB Tricep Ext: 3 × 12"], masai: false },
    Tuesday: { muscle: "Training Focus: Back / Biceps", exercises: ["Pull-ups / Door Rows: 3 × 6–10", "One-arm DB Row: 3 × 10", "DB RDL (light): 2 × 12", "DB Curl: 3 × 12", "Hammer Curl: 3 × 10–12"], masai: false },
    Wednesday: { muscle: "Training Focus: Legs / Abs / Impact", exercises: ["Squats: 3 × 15", "Forward Lunges: 3 × 10", "Glute Bridges: 3 × 12", "Calf Raises: 3 × 20", "Plank: 3 × 30–45s", "Leg Raises: 3 × 12", "Masai Jumps: 3 × 12–15"], masai: true },
    Thursday: { muscle: "Training Focus: Chest / Shoulders", exercises: ["Decline Push-ups: 3 × 10", "Wide Push-ups: 3 × 12", "Standing DB Press: 3 × 10", "Lateral Raises: 3 × 12–15", "Front Raises: 3 × 12"], masai: false },
    Friday: { muscle: "Training Focus: Back / Biceps (Var)", exercises: ["Towel Row / Band Pull: 3 × 12", "DB Reverse Fly: 3 × 12", "Superman Hold: 3 × 25s", "Concentration Curl: 3 × 10", "Reverse Curl: 3 × 12"], masai: false },
    Saturday: { muscle: "Training Focus: Posture / Flow", exercises: ["Hanging: 5 × 30s", "Wall Posture Hold: 5 × 5m", "Cobra Stretch: 3 × 30s", "Cat–Cow: 3 × 15", "Child’s Pose: 3 × 3m", "Masai Jumps: 4 × 15"], masai: true },
    Sunday: { muscle: "Active Recovery", exercises: ["Walk: 45 min", "Light Stretching: 15 min"], masai: false }
};

const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mealsList = [
    { id: "bf", label: "Breakfast", detail: "3 eggs, Oatmeal (60g), 2 bananas" },
    { id: "sn", label: "Snack", detail: "Fruit / Peanuts / Curd" },
    { id: "ln", label: "Lunch", detail: "Rice/Roti, Protein 100g, Dal, Salad" },
    { id: "pr", label: "Pre-Work", detail: "Banana + Peanuts" },
    { id: "po", label: "Post-Work", detail: "Milk / 2 Eggs" },
    { id: "dn", label: "Dinner", detail: "Roti, Veg Curry, Protein" },
    { id: "sl", label: "Sleep", detail: "Warm Milk + Turmeric" }
];

const postureList = [
    { id: "h", label: "Dead Hang" }, { id: "w", label: "Wall Hold" },
    { id: "c", label: "Cobra" }, { id: "cc", label: "Cat-Cow" }, { id: "cp", label: "Child's Pose" }
];

const RANK_TIERS = [
    { minXP: 0, rom: "I", name: "INITIATE", subtitle: "Initialization sequence active.", tooltip: "Entry recorded. No pattern established.", color: "#94a3b8", shape: "shape-circle", anim: "anim-foundation" },
    { minXP: 40, rom: "II", name: "CONSISTENT", subtitle: "Routine establishment detected.", tooltip: "Repeated action detected. Variability remains.", color: "#4ade80", shape: "shape-hexagon", anim: "anim-habit" },
    { minXP: 120, rom: "III", name: "CONDITIONED", subtitle: "Automated behavioral pattern.", tooltip: "Action occurs with reduced resistance.", color: "#2dd4bf", shape: "shape-sharp-hex", anim: "anim-habit" },
    { minXP: 260, rom: "IV", name: "FOCUSED", subtitle: "Resource allocation optimized.", tooltip: "Distractions show declining influence.", color: "#60a5fa", shape: "shape-diamond", anim: "anim-focused" },
    { minXP: 450, rom: "V", name: "RELENTLESS", subtitle: "Negotiation protocols disabled.", tooltip: "Comfort avoidance observed. Negotiation absent.", color: "#f472b6", shape: "shape-crest", anim: "anim-disciplined" },
    { minXP: 700, rom: "VI", name: "ELITE", subtitle: "External impact confirmed.", tooltip: "Performance maintained without reinforcement.", color: "#fbbf24", shape: "shape-star", anim: "anim-elite" },
    { minXP: 1000, rom: "VII", name: "ASCENDED", subtitle: "Integration complete.", tooltip: "Behavior fully internalized. Monitoring reduced.", color: "#ffffff", shape: "shape-crown", anim: "anim-ascended" }
];

let allData = [];
let todayData = null;
let dateOffset = 0;
let timerInterval = null;
let saveTimer = null;

// --- UNDO SYSTEM ---
const UNDO_KEY = STORAGE_KEY + "_undo"; // session-only key

// load/save undo stack (sessionStorage)
function loadUndo() {
    try { undoStack = JSON.parse(sessionStorage.getItem(UNDO_KEY)) || []; }
    catch { undoStack = []; }
}
function saveUndo() {
    try { sessionStorage.setItem(UNDO_KEY, JSON.stringify(undoStack)); }
    catch { }
}

function pushUndo() {
    undoStack.push(JSON.stringify(allData));
    if (undoStack.length > 5) undoStack.shift();
    saveUndo();
}

window.undoOnce = () => {
    if (!undoStack.length) return showToast('Nothing to undo');
    allData = JSON.parse(undoStack.pop());
    saveUndo();
    safeStorage.set(allData);
    renderApp();
    showToast('Reverted');
};

// --- 1. ISO Validation & Sanitization (with 2yr Purge) ---
function isISODateString(s) {
    return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function sanitizeData(raw) {
    if (!Array.isArray(raw)) return [];
    const valid = [];
    const manual = [];
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    raw.forEach(item => {
        if (!item || !item.date) return;
        if (isISODateString(item.date)) {
            // Check date age (2yr retention policy)
            const d = new Date(item.date);
            if (d < twoYearsAgo) return;

            item.daily_xp = Number(item.daily_xp) || 0;
            valid.push(item);
        } else {
            manual.push(item);
        }
    });
    valid.sort((a, b) => new Date(a.date) - new Date(b.date));
    return valid.concat(manual);
}

// --- Helper: Merge Imported Data ---
function mergeImported(newArr) {
    const incoming = sanitizeData(newArr);
    const map = new Map();
    // seed with existing (by date key)
    allData.forEach(e => map.set(e.date, Object.assign({}, map.get(e.date) || {}, e)));
    // merge incoming (incoming wins)
    incoming.forEach(e => map.set(e.date, Object.assign({}, map.get(e.date) || {}, e)));
    // produce sorted array with ISO-dates first then manual tail
    const merged = Array.from(map.values()).sort((a, b) => {
        if (isISODateString(a.date) && isISODateString(b.date)) return new Date(a.date) - new Date(b.date);
        if (isISODateString(a.date)) return -1;
        if (isISODateString(b.date)) return 1;
        return 0;
    });
    allData = merged;
    safeStorage.set(allData);
}

// --- 4. Storage Debounce ---
const safeStorage = {
    get: () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return window.memStorage || []; } },
    set: (data) => {
        window.memStorage = data;
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { /* ignore */ }
            saveTimer = null;
        }, 800); // batch up to 800ms
    },
    clear: () => {
        window.memStorage = [];
        if (saveTimer) clearTimeout(saveTimer);
        try { localStorage.removeItem(STORAGE_KEY); } catch { }
    }
};

function getLocalISODate() {
    const d = new Date(); d.setDate(d.getDate() + dateOffset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// --- 5. Context Calculation fix ---
function getTimeContext() {
    let firstDate = new Date();
    // Optimization: Assume allData sorted ascending by date
    const firstValid = allData.find(e => isISODateString(e.date));
    if (firstValid) {
        firstDate = new Date(firstValid.date);
    }
    const currentSimulated = new Date(getLocalISODate());
    const diffTime = Math.max(0, currentSimulated - firstDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const season = Math.ceil(diffDays / 90);
    const chapter = Math.ceil(diffDays / 7);
    const dayInChapter = ((diffDays - 1) % 7) + 1;
    return { season, chapter, dayInChapter, totalDays: diffDays };
}

function checkRecoveryDebt(history) {
    // Optimization: avoid sort. history is ascending.
    const valid = history.filter(d => isISODateString(d.date));
    const last3 = valid.slice(-3).reverse();
    if (last3.length < 3) return false;
    return last3.every(d => !d.sleep_planned);
}

function checkPartialStreak(history) {
    // Optimization: avoid sort. history is ascending.
    const valid = history.filter(d => isISODateString(d.date));
    const pastDays = valid.filter(d => d.date !== todayData.date);
    let partialCount = 0;
    const len = pastDays.length;
    for (let i = 0; i < 3; i++) {
        const entry = pastDays[len - 1 - i];
        if (entry && entry.daily_xp === 5) partialCount++;
    }
    return partialCount >= 3;
}

// --- UPDATED: checkLongAbsence accepts optional reference date (ISO string) ---
function checkLongAbsence(history, refDate) {
    // refDate: ISO date string (e.g. entry.date) or undefined => fallback to todayData.date
    if (history.length < 1) return false;
    // Optimization: avoid sort. history is ascending.
    const valid = history.filter(d => isISODateString(d.date));
    const targetDate = refDate || (todayData && todayData.date);
    const pastEntries = valid.filter(d => d.date !== targetDate);
    if (pastEntries.length === 0) return false;
    // Last entry is the latest one (sorted ascending)
    const lastEntryDate = new Date(pastEntries[pastEntries.length - 1].date);
    const todayDate = new Date(targetDate);
    const diffTime = Math.abs(todayDate - lastEntryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 14;
}

// --- 2. Optimized Streak Calculation (O(n)) ---
let _dateMapCache = null;
let _dateMapSource = null;
let _dateMapLen = 0;

function getDateMap(source) {
    if (_dateMapCache && _dateMapSource === source && _dateMapLen === source.length) {
        return _dateMapCache;
    }
    const map = new Map();
    for (const e of source) {
        if (isISODateString(e.date)) map.set(e.date, e);
    }
    _dateMapCache = map;
    _dateMapSource = source;
    _dateMapLen = source.length;
    return map;
}

function calculateStreak(historyOrMap) {
    // OPTIMIZATION: Use array iteration if possible (avoid Date creation/string formatting)
    if (Array.isArray(historyOrMap)) {
        const history = historyOrMap;
        const today = getLocalISODate();
        const todayTs = Date.parse(today);

        let i = history.length - 1;
        // Skip future dates if any
        while(i >= 0 && Date.parse(history[i].date) > todayTs) i--;

        let streak = 0;
        let expectedTs = todayTs;

        while (i >= 0) {
            const entry = history[i];
            if (!isISODateString(entry.date)) { i--; continue; }

            const ts = Date.parse(entry.date);

            if (ts > expectedTs) { i--; continue; }

            if (ts === expectedTs) {
                if ((entry.daily_xp || 0) > 0) {
                    streak++;
                    expectedTs -= 86400000;
                } else {
                    // If today has 0 XP, we can try yesterday.
                    if (streak === 0 && expectedTs === todayTs) {
                        expectedTs -= 86400000;
                    } else {
                        break;
                    }
                }
            } else {
                // ts < expectedTs -> Gap detected
                // If checking today and failed (missing), try yesterday
                if (streak === 0 && expectedTs === todayTs) {
                    expectedTs -= 86400000;
                    continue; // Re-evaluate current entry against yesterday
                } else {
                    break;
                }
            }
            i--;
            if (streak > 3650) break;
        }
        return streak;
    }

    let map;
    if (historyOrMap instanceof Map) {
        map = historyOrMap;
    } else {
        map = getDateMap(historyOrMap);
    }

    const anchor = new Date(getLocalISODate());
    let streak = 0;

    const todayIso = `${anchor.getFullYear()}-${String(anchor.getMonth() + 1).padStart(2, '0')}-${String(anchor.getDate()).padStart(2, '0')}`;
    const todayEntry = map.get(todayIso);
    let offset = (todayEntry && todayEntry.daily_xp > 0) ? 0 : 1;

    const d = new Date(anchor);
    d.setDate(d.getDate() - offset);

    while (true) {
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const entry = map.get(iso);
        if (entry && entry.daily_xp > 0) streak++;
        else break;
        if (streak > 3650) break;
        d.setDate(d.getDate() - 1);
    }
    return streak;
}

function totalActiveDays(history) {
    return history.filter(d => isISODateString(d.date) && (d.daily_xp || 0) > 0).length;
}

function calculateDailyXP(entry, history, rankIndex) {
    if (entry.manual) return entry.daily_xp;
    if (!entry) return 0;

    const fuelScore = calculateFuelScore(entry);
    if (entry.workout_done && fuelScore < 50) return 5;
    const isReturning = checkLongAbsence(history, entry.date);

    if (!isReturning && checkRecoveryDebt(history) && rankIndex >= 4) return 5;

    const workout = entry.workout_done ? 1 : 0;
    // Fix: Explicit filter for meals excluding sleep
    const mealCount = mealsList.filter(m => m.id !== 'sl').filter(m => entry.meals && entry.meals[m.id]).length;
    const postCount = Object.values(entry.posture || {}).filter(Boolean).length;
    // Fix: Explicit totalItems count
    const totalItems = mealsList.filter(m => m.id !== 'sl').length + postureList.length;
    const habitPercent = (mealCount + postCount) / totalItems;
    if (workout && habitPercent > 0.75) return 10;
    if (workout || habitPercent > 0.40) {
        if (checkPartialStreak(history)) return 3;
        return 5;
    }
    return 0;
}

function calculateFuelScore(entry) {
    if (!entry || !entry.meals) return 0;
    // exclude sleep ('sl') explicitly so denominator matches totalItems logic
    const posMeals = mealsList.filter(m => m.id !== 'sl' && !m.negative);
    const done = posMeals.filter(m => entry.meals[m.id]).length;
    return Math.round((done / posMeals.length) * 100) || 0;
}

function checkMondayKeeper(history) {
    let mondaysHit = 0;
    history.forEach(d => {
        if (!isISODateString(d.date)) return;
        const date = new Date(d.date);
        if (date.getDay() === 1 && d.daily_xp > 0) mondaysHit++;
    });
    return mondaysHit >= 3;
}

function analyzeIdentity(history, today, streak) {
    const tags = [];
    const fuelScore = calculateFuelScore(today);

    if (today.workout_done && fuelScore < 50) tags.push({ text: "Fuel deficit detected.", priority: 5 });
    else if (streak > 7) tags.push({ text: "Momentum maintained.", priority: 4 });
    else if (!today.workout_done && today.sleep_planned) tags.push({ text: "Restructuring phase.", priority: 3 });
    else if (fuelScore >= 90) tags.push({ text: "Optimal input recorded.", priority: 3 });
    else tags.push({ text: "Action verified.", priority: 1 });

    const activeTag = tags.sort((a, b) => b.priority - a.priority)[0];

    let title = "Novice";
    if (streak >= 3) title = "Consistent";
    if (checkMondayKeeper(history)) title = "Monday Retention";
    if (calculateFuelScore(today) >= 85 && streak > 5) title = "Fuel Optimization";
    if (streak >= 14) title = "High Continuity";

    const totalXP = history.reduce((acc, curr) => acc + (curr.daily_xp || 0), 0);
    if (totalXP >= 1000) title = "Integration";

    return { tag: activeTag.text, title: title };
}

function getMomentumState(history) {
    // Optimization: avoid sort. history is ascending.
    const valid = history.filter(d => isISODateString(d.date));
    let perfectStreak = 0;
    let missStreak = 0;
    const len = valid.length;
    for (let i = 0; i < 3; i++) {
        const entry = valid[len - 1 - i];
        if (!entry) continue;
        const xp = entry.daily_xp;
        if (xp >= 10) perfectStreak++;
        if (i < 2 && xp === 0) missStreak++;
    }
    if (perfectStreak >= 3) return "Momentum";
    if (missStreak >= 2) return "Friction";
    return "Neutral";
}

// --- GLOBAL SILENCE PRINCIPLE ---
function shouldSystemSpeak(rankIndex, eventType) {
    if (rankIndex >= 6) return false;
    if (rankIndex === 5) return eventType === 'system';
    if (rankIndex === 4) return eventType === 'warning' || eventType === 'system';
    if (rankIndex === 3) return eventType !== 'routine';
    if (rankIndex === 2) return eventType === 'exception' || eventType === 'completion';
    if (rankIndex === 1) return eventType !== 'repeated';
    return true;
}

// --- TOAST HELPER ---
function showToast(msg, ms = 1800) {
    const t = document.getElementById('toast') || (() => {
        const el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); return el;
    })();
    t.innerText = msg;
    t.style.display = 'block';
    t.style.opacity = '1';
    clearTimeout(t._hide);
    t._hide = setTimeout(() => { t.style.opacity = '0'; t.style.display = 'none'; }, ms);
}

// --- 7. Render Guard ---
let rendering = false;
function renderApp() {
    if (rendering) return;
    rendering = true;

    try {
        const dateMap = getDateMap(allData);
        const todayStr = getLocalISODate();
        todayData = allData.find(d => d.date === todayStr);
        if (!todayData) {
            todayData = { date: todayStr, workout_done: false, sleep_planned: false, meals: {}, posture: {}, exercises: {}, daily_xp: 0 };
            allData.push(todayData);
            // Ensure sorted (handle dateOffset cases)
            if (allData.length > 1 && allData[allData.length - 2].date > todayStr) {
                allData.sort((a, b) => (a.date < b.date ? -1 : 1));
            }
            safeStorage.set(allData);
        }

        const totalXP = allData.reduce((acc, curr) => acc + (curr.daily_xp || 0), 0);
        let currentRank = RANK_TIERS[0];
        let nextRank = null;
        let rankIndex = 0;
        for (let i = 0; i < RANK_TIERS.length; i++) {
            if (totalXP >= RANK_TIERS[i].minXP) {
                currentRank = RANK_TIERS[i];
                nextRank = RANK_TIERS[i + 1] || null;
                rankIndex = i;
            } else { break; }
        }

        const newXP = calculateDailyXP(todayData, allData, rankIndex);
        if (todayData.daily_xp !== newXP) { todayData.daily_xp = newXP; safeStorage.set(allData); }
        const xp = todayData.daily_xp;

        const timeCtx = getTimeContext();
        UI.timePill.innerText = `S${timeCtx.season} : CH ${timeCtx.chapter}`;
        const chapterName = CHAPTER_NAMES[(timeCtx.chapter - 1) % CHAPTER_NAMES.length] || "Uncharted";
        UI.weeklyTitle.innerText = `CHAPTER ${timeCtx.chapter}: ${chapterName}`;

        const fuelScore = calculateFuelScore(todayData);
        let momentumState = getMomentumState(allData);
        const isDebt = checkRecoveryDebt(allData);
        const isElitePlus = rankIndex >= 5;
        const isReturning = checkLongAbsence(allData, todayData.date);

        // Fix: True consecutive streak calculation
        const streak = calculateStreak(allData);
        const activeDays = totalActiveDays(allData);

        let dopaScale = 1.15;
        let spring = "cubic-bezier(0.34, 1.56, 0.64, 1)";
        if (streak > 14) { dopaScale = 1.0; spring = "cubic-bezier(0, 0, 0.2, 1)"; }
        else if (streak > 5) { dopaScale = 1.05; }

        document.documentElement.style.setProperty('--check-scale', dopaScale);
        document.documentElement.style.setProperty('--check-spring', spring);

        let appFilter = 'grayscale(0) brightness(1)';
        let glowOp = 1;
        let transitionSpeed = '0.4s';

        // CSS Class Assignments for Layout Engine
        document.body.className = ''; // Reset
        document.body.classList.add(`season-${(timeCtx.season - 1) % 4 + 1}`);
        document.body.classList.add(`tier-${rankIndex}`); // Key for layout engine
        if (isElitePlus) document.body.classList.add('elite-mode');

        if (fuelScore >= 85) { appFilter = 'grayscale(0) contrast(1.1) brightness(1.1)'; glowOp = 1; }
        else if (fuelScore < 50) { appFilter = 'grayscale(0.4) brightness(0.8)'; glowOp = 0.4; }

        if (isReturning) {
            momentumState = "Neutral";
            UI.status.innerText = "System Resumed";
            UI.status.style.color = "#fff";
        } else {
            if (momentumState === "Momentum") { transitionSpeed = '0.2s'; appFilter += ' saturate(1.2)'; }
            else if (momentumState === "Friction") { transitionSpeed = '0.6s'; appFilter = 'grayscale(0.8) contrast(1.2) brightness(0.7)'; glowOp = 0.2; }

            // Debt Logic active only at higher ranks
            if (isDebt && rankIndex >= 4) {
                appFilter = 'grayscale(1) brightness(0.5)'; glowOp = 0.1;
                UI.sBtn.classList.add('pulse-debt');
                UI.status.innerText = "RECOVERY DEBT DETECTED";
                UI.status.classList.add('debt-active');
            } else {
                UI.sBtn.classList.remove('pulse-debt');
                UI.status.classList.remove('debt-active');

                // STATUS TEXT LOGIC (SILENCE APPLIED)
                if (!shouldSystemSpeak(rankIndex, 'completion')) {
                    UI.status.innerText = "";
                } else {
                    if (xp === 10) { UI.status.innerText = "Day Recorded"; UI.status.style.color = currentRank.color; }
                    else if (xp === 5) { UI.status.innerText = "Partial Entry"; UI.status.style.color = "#fff"; }
                    else if (xp === 3) { UI.status.innerText = "Diminished Entry"; UI.status.style.color = "#94a3b8"; }
                    else { UI.status.innerText = "No Record"; UI.status.style.color = "var(--text-secondary)"; }
                }
            }
        }

        const root = document.documentElement;
        root.style.setProperty('--app-filter', appFilter);
        root.style.setProperty('--glow-opacity', glowOp);
        root.style.setProperty('--transition-speed', transitionSpeed);
        root.style.setProperty('--rank-color', currentRank.color);
        root.style.setProperty('--rank-glow', nextRank ? `0 0 30px ${currentRank.color}` : `0 0 60px ${currentRank.color}`);

        if (dateOffset !== 0) {
            UI.day.innerText = "YESTERDAY"; UI.day.style.display = "block";
            UI.day.style.color = "var(--accent-amber)"; UI.day.style.borderColor = "var(--accent-amber)";
        } else { UI.day.style.display = "none"; }

        UI.xpDisplay.innerText = xp;

        if (isElitePlus) {
            const streakSym = momentumState === "Momentum" ? "↑" : (momentumState === "Friction" ? "↓" : "—");
            UI.streak.innerText = streakSym; UI.streak.classList.add("ghost");
        } else {
            UI.streak.innerText = `${activeDays} Entries`; UI.streak.classList.remove("ghost");
        }

        const nowHour = new Date().getHours();
        if (dateOffset === 0 && nowHour >= 20) {
            const d = new Date(); d.setDate(d.getDate() + 1);
            const tmrwDay = daysMap[d.getDay()];
            const rawMuscle = workoutPlans[tmrwDay].muscle.replace("Training Focus: ", "");
            UI.forecast.innerText = `TOMORROW EXPECTS: ${rawMuscle}`;
            UI.forecast.classList.add('visible');
        } else { UI.forecast.classList.remove('visible'); }

        const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        // OPTIMIZATION: Build map for week rendering
        const entryMap = dateMap;
        UI.weekRow.innerHTML = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(); d.setDate(d.getDate() + dateOffset - (6 - i));
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const entry = entryMap.get(iso);
            const dxp = entry ? entry.daily_xp : 0;
            const barClass = dxp >= 10 ? 'perfect' : (dxp >= 3 ? 'partial' : 'missed');
            return `<div class="day-col ${6 - i === 0 ? 'today' : ''}"><div class="day-bar ${barClass}"></div><div class="day-text">${dayLabels[d.getDay()]}</div></div>`;
        }).join('');

        const dObj = new Date(); dObj.setDate(dObj.getDate() + dateOffset);
        const plan = workoutPlans[daysMap[dObj.getDay()]] || workoutPlans.Monday;

        UI.muscle.innerText = plan.muscle;
        UI.masai.innerHTML = plan.masai ? `<div style="background:rgba(245,158,11,0.1); color:var(--accent-amber); padding:10px; border-radius:12px; font-size:12px; font-weight:700; text-align:center; margin-bottom:16px; border:1px solid rgba(245,158,11,0.2);">High Impact Session<div style="font-size:10px; opacity:0.7; margin-top:4px;">Joints and recovery expected.</div></div>` : '';

        UI.exList.innerHTML = plan.exercises.map((ex, i) => {
            const [name, reps] = ex.split(':');
            const isIndividuallyDone = todayData.exercises && todayData.exercises[i];
            const done = (todayData.workout_done || isIndividuallyDone) ? 'checked' : '';
            return `<div class="list-row exercise-row ${done}" onclick="toggleExercise(${i})"><div class="check-ring"></div><div class="ex-info"><div class="ex-name">${name}</div><div class="ex-reps">${reps}</div></div></div>`;
        }).join('');

        if (todayData.workout_done) {
            UI.wBtn.classList.add('completed');
            UI.wBtn.innerText = shouldSystemSpeak(rankIndex, 'completion') ? "Session Logged" : "Recorded";
        } else {
            UI.wBtn.classList.remove('completed');
            UI.wBtn.innerText = "Log Session";
        }

        const makeList = (list, key) => list.map(item => {
            if (item.tier && rankIndex < item.tier) return '';
            const isDone = todayData[key] && todayData[key][item.id] ? 'checked' : '';
            const negClass = item.negative ? 'negative' : '';
            return `<div class="checklist-row ${negClass} ${isDone}" onclick="toggleCheck('${key}','${item.id}')"><div class="check-circle"><svg viewBox="0 0 24 24" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg></div><div class="checklist-content"><div class="checklist-label">${item.label}</div>${item.detail ? `<div class="checklist-detail">${item.detail}</div>` : ''}</div></div>`;
        }).join('');

        UI.nutList.innerHTML = makeList(mealsList, 'meals');
        UI.posList.innerHTML = makeList(postureList, 'posture');

        if (todayData.sleep_planned) {
            UI.sBtn.classList.add('completed');
            UI.sBtn.innerText = shouldSystemSpeak(rankIndex, 'completion') ? "Recovery Logged" : "Recorded";
            UI.sleepCard.style.borderColor = currentRank.color;
        } else {
            UI.sBtn.classList.remove('completed');
            UI.sBtn.innerText = "Log Sleep Intent";
            UI.sleepCard.style.borderColor = 'var(--border-subtle)';
        }

        const identity = analyzeIdentity(allData, todayData, streak);
        UI.tierName.innerText = "CURRENT STANDING: " + currentRank.name;
        UI.userTitle.innerText = identity.title;
        UI.rankStreak.innerText = `${streak} DAY STREAK`;
        UI.tierName.style.color = currentRank.color;
        UI.rankSub.innerText = currentRank.subtitle;

        // Silence Tooltip Logic
        if (!shouldSystemSpeak(rankIndex, 'tooltip') || isElitePlus) {
            // Remove text, add icon
            UI.rankTool.innerHTML = '';
            const icon = document.createElement('span');
            icon.className = 'silence-icon';
            icon.innerText = '?';
            icon.setAttribute('data-tooltip', 'Silence Protocol: Distractions removed to optimize cognitive load for high-tier performance.');
            UI.rankTool.appendChild(icon);
        } else {
            let tooltipText = currentRank.tooltip;
            if (identity.tag === "Fuel deficit detected." || identity.tag === "Restructuring phase.") {
                tooltipText = identity.tag;
            }
            UI.rankTool.innerText = tooltipText;
        }

        // METRICS: STATS
        UI.statTotal.innerText = totalXP;
        UI.statPerf.innerText = allData.filter(d => d.daily_xp === 10).length;

        const monthCount = Math.floor(timeCtx.totalDays / 30);
        UI.statTime.innerText = monthCount < 1 ? (timeCtx.totalDays + " Days") : (monthCount + " Months");

        if (rankIndex >= 5) {
            UI.xpCont.style.display = 'none'; UI.xpText.style.display = 'none';
        } else {
            UI.xpCont.style.display = 'block'; UI.xpText.style.display = 'flex';
            const xpInTier = totalXP - currentRank.minXP;
            const xpNeeded = nextRank ? (nextRank.minXP - currentRank.minXP) : 1;
            UI.curXP.innerText = Math.floor(xpInTier) + " XP";
            UI.nextXP.innerText = "Distance to next standing";
            UI.xpBar.style.width = Math.min(100, (xpInTier / xpNeeded) * 100) + "%";
        }

        UI.animCont.className = `badge-container ${currentRank.anim}`;
        UI.badgeShape.className = `badge-shape ${currentRank.shape}`;
        UI.badgeShape.style.boxShadow = `0 0 40px ${currentRank.color}`;
    } finally {
        rendering = false;
    }
}

function allowAction() {
    const now = Date.now();
    if (now - lastActionTime < 300) return false;
    lastActionTime = now;
    return true;
}

window.toggleCheck = (cat, id) => {
    if (!allowAction()) return;
    pushUndo();
    if (!todayData[cat]) todayData[cat] = {};
    todayData[cat][id] = !todayData[cat][id];
    setTimeout(renderApp, 300);
};

window.toggleExercise = (index) => {
    if (!allowAction()) return;
    pushUndo();
    if (!todayData.exercises) todayData.exercises = {};
    todayData.exercises[index] = !todayData.exercises[index];
    setTimeout(renderApp, 300);
};

window.switchTab = (id, el) => {
    UI.screens.forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + id).classList.add('active');
    UI.navItems.forEach(n => n.classList.remove('active'));
    el.classList.add('active');
};

window.toggleWorkout = () => { if (allowAction()) { pushUndo(); todayData.workout_done = !todayData.workout_done; setTimeout(renderApp, 300); } };
window.toggleSleep = () => { if (allowAction()) { pushUndo(); todayData.sleep_planned = !todayData.sleep_planned; setTimeout(renderApp, 300); } };

window.startTimer = (sec) => {
    if (timerInterval) clearInterval(timerInterval);
    let rem = sec;
    UI.timer.innerText = `00:${rem}`;
    timerInterval = setInterval(() => {
        rem--;
        UI.timer.innerText = rem < 10 ? `00:0${rem}` : `00:${rem}`;
        if (rem <= 0) { clearInterval(timerInterval); UI.timer.innerText = "DONE"; }
    }, 1000);
};
window.stopTimer = () => { if (timerInterval) clearInterval(timerInterval); UI.timer.innerText = "00:00"; };

window.addTestXP = () => {
    pushUndo(); // allow revert if user hits this by mistake
    const today = getLocalISODate();
    let entry = allData.find(d => d.date === today);
    if (!entry) {
        entry = { date: today, workout_done: true, sleep_planned: false, meals: {}, posture: {}, exercises: {}, daily_xp: 0, manual: true };
        allData.push(entry);
    }
    entry.workout_done = true;
    // cap so you don't overflow unrealistic XP
    entry.daily_xp = Math.min(100, (entry.daily_xp || 0) + 50);
    safeStorage.set(allData);
    renderApp();
};

let resetTimer;
window.confirmReset = (btn) => {
    if (btn.innerText === "Reset") {
        btn.innerText = "Confirm?";
        btn.style.color = "#ef4444";
        btn.style.borderColor = "#ef4444";
        resetTimer = setTimeout(() => {
            btn.innerText = "Reset";
            btn.style.color = "#555";
            btn.style.borderColor = "#333";
        }, 3000);
    } else {
        clearTimeout(resetTimer);
        pushUndo();      // <-- snapshot before destructive reset
        safeStorage.clear();
        allData = [];
        renderApp();
        showToast("All data reset."); // Updated feedback
        btn.innerText = "Reset";
        btn.style.color = "#555";
        btn.style.borderColor = "#333";
    }
};

// --- MANUAL ENTRY & EXPORT/IMPORT ---
window.openManual = () => {
    UI.manualModal.classList.add('open');
    UI.manualDate.value = getLocalISODate();
    UI.manualWorkout.checked = false;
    UI.manualSleep.checked = false;
};
window.closeManual = () => { UI.manualModal.classList.remove('open'); };
window.saveManual = () => {
    const date = UI.manualDate.value;
    if (!date) return;

    let targetEntry = allData.find(d => d.date === date);
    if (!targetEntry) {
        targetEntry = { date: date, workout_done: false, sleep_planned: false, meals: {}, posture: {}, exercises: {}, daily_xp: 0 };
        allData.push(targetEntry);
        // Ensure sorted
        allData.sort((a, b) => (a.date < b.date ? -1 : 1));
    }

    pushUndo();
    targetEntry.workout_done = UI.manualWorkout.checked;
    targetEntry.sleep_planned = UI.manualSleep.checked;
    // DO NOT mark manual yet — compute XP using the normal rules first

    // compute approximate rank index before saving (used by calc)
    const totalXPNow = allData.reduce((acc, curr) => acc + (curr.daily_xp || 0), 0);
    let rankIndexNow = 0;
    for (let i = 0; i < RANK_TIERS.length; i++) {
        if (totalXPNow >= RANK_TIERS[i].minXP) rankIndexNow = i;
        else break;
    }

    // compute daily XP using the main function (keeps consistent rules)
    targetEntry.daily_xp = calculateDailyXP(targetEntry, allData, rankIndexNow);

    // now mark as manual (if you still want to flag it)
    targetEntry.manual = true;

    safeStorage.set(allData);
    closeManual();
    renderApp();
};

window.exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "obsidian_backup_" + getLocalISODate() + ".json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
};

window.handleImport = (input) => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            if (Array.isArray(json)) {
                // allow undo of the import
                pushUndo();
                // Smart Merge
                const mergedCount = json.filter(x => isISODateString(x.date)).length;
                mergeImported(json);
                renderApp();
                showToast(`Imported ${mergedCount} day(s).`);
            } else { showToast("Invalid file format."); }
        } catch (err) { showToast("Error reading file."); }
    };
    reader.readAsText(file);
};

// Save on visibility change (close/tab switch)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') safeStorage.set(allData);
});

// Flush pending debounced save when user closes / reloads tab
window.addEventListener('beforeunload', () => {
    try {
        // force immediate write
        if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    } catch (e) { /* ignore */ }
});

// --- ROTATING AUTO-BACKUPS ---
const BACKUP_PREFIX = STORAGE_KEY + "_autobackup_";
const MAX_BACKUPS = 5;
setInterval(() => {
    try {
        const ts = Date.now();
        const key = BACKUP_PREFIX + ts;
        localStorage.setItem(key, JSON.stringify(allData));

        // prune old backups
        const keys = Object.keys(localStorage)
            .filter(k => k.startsWith(BACKUP_PREFIX))
            .sort(); // oldest → newest

        while (keys.length > MAX_BACKUPS) {
            localStorage.removeItem(keys.shift());
        }
    } catch (e) { }
}, 1000 * 60 * 60 * 6); // every 6 hours

// Optional: restore helper (call from console or wire up a dev button)
window.restoreLatestBackup = () => {
    const keys = Object.keys(localStorage)
        .filter(k => k.startsWith(BACKUP_PREFIX))
        .sort();
    if (!keys.length) return showToast("No backup found");
    pushUndo();
    allData = JSON.parse(localStorage.getItem(keys[keys.length - 1]));
    safeStorage.set(allData);
    renderApp();
    showToast("Backup restored");
};

// Accessibility: Keyboard nav
UI.navItems.forEach(n => {
    n.tabIndex = 0;
    n.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling for Space
            n.click();
        }
    });
});

// load undo stack (session) and initial data
loadUndo();
allData = sanitizeData(safeStorage.get());
renderApp();
