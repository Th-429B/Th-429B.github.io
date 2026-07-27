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

// The output line ships fully rendered in the HTML so it reads fine without
// JS or with reduced motion; the typing effect just replays it on load.
const typed = document.getElementById("typed");
if (typed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const full = typed.textContent;
  typed.textContent = "";
  let i = 0;
  const tick = () => {
    typed.textContent = full.slice(0, ++i);
    if (i < full.length) setTimeout(tick, 28);
  };
  setTimeout(tick, 400);
}
