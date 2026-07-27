const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const syncTogglePressed = () => {
  themeToggle.setAttribute("aria-pressed", String(root.getAttribute("data-theme") !== "light"));
};

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  syncTogglePressed();
});

syncTogglePressed();

document.querySelectorAll(".project-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const row = trigger.closest(".project-row");
    const isOpen = row.dataset.open === "true";
    row.dataset.open = isOpen ? "false" : "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const xp = document.querySelector(".xp");
if (xp && !prefersReducedMotion) {
  xp.classList.add("js-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  xp.querySelectorAll(".xp-row").forEach((row) => revealObserver.observe(row));

  let ticking = false;
  const updateProgress = () => {
    const rect = xp.getBoundingClientRect();
    const midpoint = window.innerHeight * 0.5;
    const visible = Math.min(Math.max(midpoint - rect.top, 0), rect.height);
    const percent = rect.height ? (visible / rect.height) * 100 : 0;
    xp.style.setProperty("--xp-progress", percent + "%");
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  });
  updateProgress();
}

// Typewriter loop: the first phrase ships fully rendered in the HTML so the
// line reads fine without JS or with reduced motion; with motion allowed, the
// phrase is deleted and retyped, cycling through the list below.
const typed = document.getElementById("typed");
if (typed && !prefersReducedMotion) {
  const phrases = [
    "backend engineer",
    "software engineer at Shopee",
    "problem solver",
    "builder of reliable, scalable systems",
    "curious tinkerer",
  ];
  const TYPE_MS = 55;
  const DELETE_MS = 30;
  const HOLD_MS = 2000;
  const GAP_MS = 350;

  let phraseIdx = 0;
  let charIdx = phrases[0].length;
  let deleting = true;
  typed.textContent = phrases[0];

  const tick = () => {
    const current = phrases[phraseIdx];
    charIdx += deleting ? -1 : 1;
    typed.textContent = current.slice(0, charIdx);
    if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(tick, GAP_MS);
    } else if (!deleting && charIdx === current.length) {
      deleting = true;
      setTimeout(tick, HOLD_MS);
    } else {
      setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
    }
  };
  setTimeout(tick, HOLD_MS);
}
