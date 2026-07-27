const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navbarLinks = document.getElementsByClassName("navbar-links")[0];

toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

const timeline = document.querySelector(".timeline");
const milestones = document.querySelectorAll(".milestone");

if (timeline && milestones.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  milestones.forEach((milestone) => revealObserver.observe(milestone));

  let ticking = false;

  const updateTimelineProgress = () => {
    const rect = timeline.getBoundingClientRect();
    const midpoint = window.innerHeight * 0.5;
    const visible = Math.min(Math.max(midpoint - rect.top, 0), rect.height);
    const percent = rect.height ? (visible / rect.height) * 100 : 0;
    timeline.style.setProperty("--tl-progress", percent + "%");
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateTimelineProgress);
      ticking = true;
    }
  });

  updateTimelineProgress();
}

document.querySelectorAll(".project-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const row = trigger.closest(".project-row");
    const isOpen = row.dataset.open === "true";
    row.dataset.open = isOpen ? "false" : "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });
});
