const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const images = document.querySelectorAll(".image");
const textBox = document.getElementById("text-box");

function themeMode(theme) {
  [img1, img2, img3] = images;

  img1.src = `assets/images/undraw_proud_coder_${theme}.svg`;
  img2.src = `assets/images/undraw_feeling_proud_${theme}.svg`;
  img3.src = `assets/images/undraw_conceptual_idea_${theme}.svg`;
}

function toggleDarkLightMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  toggleIcon.firstElementChild.textContent = isDark
    ? "Dark Mode"
    : "Light Mode";
  isDark
    ? toggleIcon.lastElementChild.classList.replace("fa-sun", "fa-moon")
    : toggleIcon.lastElementChild.classList.replace("fa-moon", "fa-sun");
  isDark ? themeMode("dark") : themeMode("light");
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleDarkLightMode(true);
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    toggleDarkLightMode(false);
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

if (currentTheme === "dark") {
  toggleSwitch.checked = true;
  toggleDarkLightMode(true);
}
