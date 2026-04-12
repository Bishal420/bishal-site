const card = document.getElementById("clock-card");

// Hands
const hHand = document.getElementById("hand-h");
const mHand = document.getElementById("hand-m");
const sHand = document.getElementById("hand-s");

// Digital
const digTime = document.getElementById("dig-time");
const digDate = document.getElementById("dig-date");

// Rings
const ringS = document.getElementById("ring-s");
const ringM = document.getElementById("ring-m");
const ringH = document.getElementById("ring-h");
const ringText = document.getElementById("ring-time-text");

// Settings
const settingsToggle = document.getElementById("settings-toggle");
const settingsPanel = document.getElementById("settings-panel");
const bgSelect = document.getElementById("bgSelect");
const scaleSlider = document.getElementById("scale-slider");
const primaryColor = document.getElementById("set-primary");
const secondaryColor = document.getElementById("set-secondary");

// Fullscreen
const fullscreenBtn = document.getElementById("fullscreen-toggle");

let state = 0;
let holdTimer = null;

/* ---------------- CLOCK ENGINE ---------------- */
function updateClock() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    // Analog
    const hDeg = (h % 12) * 30 + m * 0.5;
    const mDeg = m * 6;
    const sDeg = s * 6;

    hHand.style.transform = `rotate(${hDeg}deg)`;
    mHand.style.transform = `rotate(${mDeg}deg)`;
    sHand.style.transform = `rotate(${sDeg}deg)`;

    // Digital
    const pad = (n) => n.toString().padStart(2, "0");
    digTime.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

    const options = { month: "short", day: "numeric" };
    digDate.textContent = now.toLocaleDateString("en-US", options);

    // Rings
    updateRing(ringS, s, 60, 90);
    updateRing(ringM, m, 60, 70);
    updateRing(ringH, h % 12, 12, 50);

    ringText.textContent = `${pad(h)}:${pad(m)}`;
}

function updateRing(el, value, max, radius) {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;

    el.style.strokeDasharray = circumference;
    el.style.strokeDashoffset = offset;
}

setInterval(updateClock, 1000);
updateClock();

/* ---------------- STATE SWITCH ---------------- */
card.addEventListener("click", () => {
    if (card.classList.contains("infinity-active")) return;

    state = (state + 1) % 3;
    card.setAttribute("data-state", state);
});

/* ---------------- INFINITY MODE (HOLD) ---------------- */
card.addEventListener("mousedown", () => {
    holdTimer = setTimeout(() => {
        card.classList.toggle("infinity-active");
    }, 800);
});

card.addEventListener("mouseup", () => clearTimeout(holdTimer));
card.addEventListener("mouseleave", () => clearTimeout(holdTimer));

/* ---------------- SETTINGS PANEL ---------------- */
settingsToggle.addEventListener("click", () => {
    settingsPanel.classList.toggle("open");
});

/* ---------------- FULLSCREEN ---------------- */
fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

/* ---------------- SCALE CONTROL ---------------- */
scaleSlider.addEventListener("input", () => {
    const scale = scaleSlider.value;
    card.style.transform = `scale(${scale})`;
    localStorage.setItem("scale", scale);
});

/* ---------------- COLOR CONTROL ---------------- */
primaryColor.addEventListener("input", () => {
    document.documentElement.style.setProperty("--neon-blue", primaryColor.value);
    localStorage.setItem("primary", primaryColor.value);
});

secondaryColor.addEventListener("input", () => {
    document.documentElement.style.setProperty("--neon-purple", secondaryColor.value);
    localStorage.setItem("secondary", secondaryColor.value);
});

/* ---------------- THEMES ---------------- */
const themes = {
    neon: ["#00f3ff", "#bc13fe"],
    midnight: ["#4facfe", "#000000"],
    emerald: ["#00ffcc", "#00695c"],
    fire: ["#ff512f", "#dd2476"],
    cyber: ["#00f0ff", "#ff00ff"],
    ocean: ["#2193b0", "#6dd5ed"],
    carbon: ["#aaaaaa", "#333333"]
};

bgSelect.addEventListener("change", () => {
    const val = bgSelect.value;

    if (themes[val]) {
        const [p, s] = themes[val];
        document.documentElement.style.setProperty("--neon-blue", p);
        document.documentElement.style.setProperty("--neon-purple", s);

        primaryColor.value = p;
        secondaryColor.value = s;

        localStorage.setItem("theme", val);
    }
});

/* ---------------- LOAD SAVED SETTINGS ---------------- */
window.addEventListener("load", () => {
    const savedScale = localStorage.getItem("scale");
    const savedPrimary = localStorage.getItem("primary");
    const savedSecondary = localStorage.getItem("secondary");
    const savedTheme = localStorage.getItem("theme");

    if (savedScale) {
        card.style.transform = `scale(${savedScale})`;
        scaleSlider.value = savedScale;
    }

    if (savedPrimary) {
        document.documentElement.style.setProperty("--neon-blue", savedPrimary);
        primaryColor.value = savedPrimary;
    }

    if (savedSecondary) {
        document.documentElement.style.setProperty("--neon-purple", savedSecondary);
        secondaryColor.value = savedSecondary;
    }

    if (savedTheme) {
        bgSelect.value = savedTheme;
    }
});
