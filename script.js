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

// The output line ships fully rendered in the HTML so it reads fine without
// JS or with reduced motion; the typing effect just replays it on load.
const typed = document.getElementById("typed");
if (typed && !prefersReducedMotion) {
  const full = typed.textContent;
  typed.textContent = "";
  let i = 0;
  const tick = () => {
    typed.textContent = full.slice(0, ++i);
    if (i < full.length) setTimeout(tick, 28);
  };
  setTimeout(tick, 400);
}
