let stars = document.getElementById("stars");
let moon = document.getElementById("moon");
let intro = document.getElementById("intro");

window.addEventListener("scroll", function() {

  let value = window.scrollY;

  stars.style.left = value * 0.25 + "px";
  moon.style.top = value * 1.05 + "px";
  intro.style.marginRight = value * 4 + "px";
  intro.style.marginTop = value * 1.5 + "px";

});

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